"use server";

import "server-only";
import { eventFormSchema } from "@/schema/events";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { EventTable } from "@/db/schema";
import { db } from "@/db/drizzle";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";

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

export async function updateEvent(
  id: string,
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { userId } = await auth();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || userId === null) {
    return { error: true };
  }

  const { rowCount } = await db
    .update(EventTable)
    .set({ ...data })
    .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)));

    // if rowCount is 0 that means there was no event to update
  if (rowCount === 0) {
    return { error: true };
  }

  redirect("/events");
}
