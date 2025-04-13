import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";

async function getConnectedApps(userId: string) {
  // Check which apps the user has connected
  const notion = await prisma.notion.findFirst({
    where: { userId },
  });

  const discord = await prisma.discordWebhook.findFirst({
    where: { userId },
  });

  const slack = await prisma.slack.findFirst({
    where: { userId },
  });

  const googleCreds = await prisma.localGoogleCredential.findFirst({
    where: {
      user: {
        clerkId: userId,
      },
    },
  });

  return {
    notion: !!notion,
    discord: !!discord,
    slack: !!slack,
    gdrive: !!googleCreds,
  };
}

async function getWorkflows(userId: string) {
  const workflows = await prisma.workflows.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  const workflowsWithApps = await Promise.all(
    workflows.map(async (workflow) => {
      // Determine connected apps for this workflow based on templates and tokens
      const apps: ConnectedApp[] = [];

      if (workflow.notionTemplate || workflow.notionAccessToken) {
        apps.push("notion");
      }

      if (workflow.discordTemplate) {
        apps.push("discord");
      }

      if (workflow.slackTemplate || workflow.slackAccessToken) {
        apps.push("slack");
      }

      // Check if Google Drive is used in this workflow
      // This is a simplification - you might need to adjust based on your actual data model
      if (
        workflow.flowPath?.includes("google") ||
        workflow.cronPath?.includes("google")
      ) {
        apps.push("gdrive");
      }

      // Format the date from the createdAt field
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Determine the status based on publish field
      const status = workflow.publish ? "Active" : "Paused";

      return {
        ...workflow,
        apps,
        status,
        date,
      };
    })
  );

  return workflowsWithApps;
}

async function getDashboardStats(userId: string) {
  const totalWorkflows = await prisma.workflows.count({
    where: { userId },
  });

  const activeWorkflows = await prisma.workflows.count({
    where: {
      userId,
      publish: true,
    },
  });

  // Count connected app types
  const connectedApps = await getConnectedApps(userId);
  const connectedAppsCount =
    Object.values(connectedApps).filter(Boolean).length;

  return {
    totalWorkflows,
    activeWorkflows,
    connectedAppsCount,
  };
}

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/signin");
  }

  const connectedApps = await getConnectedApps(userId);
  const workflows = await getWorkflows(userId);
  const stats = await getDashboardStats(userId);

  // Get the most recent workflows
  const recentWorkflows = [...workflows]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <Suspense fallback={<Loading />}>
      <DashboardClient
        connectedApps={connectedApps}
        recentWorkflows={recentWorkflows}
        stats={stats}
      />
    </Suspense>
  );
}
