"use server";

import "server-only";
import { scheduleFormSchema } from "@/schema/schedule";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { ScheduleAvailabilityTable, ScheduleTable } from "@/db/schema";
import { db } from "@/db/drizzle";
import { BatchItem } from "drizzle-orm/batch";
import { eq } from "drizzle-orm";

export async function saveSchedule(
  unsafeData: z.infer<typeof scheduleFormSchema>
) {
  const { userId } = await auth();
  const { success, data } = scheduleFormSchema.safeParse(unsafeData);

  if (!success || userId === null) {
    return { error: true };
  }

  const { availabilities, ...scheduledData } = data;

  const [{ id: scheduleId }] = await db
    .insert(ScheduleTable)
    .values({ ...scheduledData, clerkUserId: userId })
    .onConflictDoUpdate({
      target: ScheduleTable.clerkUserId,
      set: scheduledData,
    })
    .returning({ id: ScheduleTable.id });

  const statements: [BatchItem<"pg">] = [
    db
      .delete(ScheduleAvailabilityTable)
      .where(eq(ScheduleAvailabilityTable.scheduleId, scheduleId)),
  ];

  if (availabilities.length > 0) {
    statements.push(
      db.insert(ScheduleAvailabilityTable).values(
        availabilities.map((availability) => ({
          ...availability,
          scheduleId,
        }))
      )
    );
  }

  await db.batch(statements);
}
