"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export const onPaymentDetails = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  try {
    const connection = await db.user.findFirst({
      where: {
        clerkId: userId,
      },
      select: {
        tier: true,
        credits: true,
      },
    });

    return connection;
  } catch (error) {
    console.error("Payment details error:", error);
    return null;
  }
};
