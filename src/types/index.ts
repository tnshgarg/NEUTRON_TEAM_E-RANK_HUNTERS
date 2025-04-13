export type User = {
  id: number;
  clerkId: string;
  name: string | null;
  email: string;
  profileImage: string | null;
  tier: string | null;
  credits: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Workflow = {
  id: string;
  nodes: string | null;
  edges: string | null;
  name: string;
  discordTemplate: string | null;
  notionTemplate: string | null;
  slackTemplate: string | null;
  slackChannels: string[];
  slackAccessToken: string | null;
  notionAccessToken: string | null;
  notionDbId: string | null;
  flowPath: string | null;
  cronPath: string | null;
  publish: boolean | null;
  description: string;
  userId: string;
};

export type ConnectedApp = "notion" | "discord" | "slack" | "gdrive";

export type WorkflowWithApps = Workflow & {
  apps: ConnectedApp[];
  status: "Active" | "Paused";
  date: string;
};
