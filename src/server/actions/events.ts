"use server";

import "server-only";
import { eventFormSchema } from "@/schema/events";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { EventTable } from "@/db/schema";
import { db } from "@/db/drizzle";
import { redirect } from "next/navigation";

export async function createEvent(
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { userId } = await auth();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || userId === null) {
    return { error: true };
  }

  await db.insert(EventTable).values({ ...data, clerkUserId: userId });

  redirect("/events");
}
