import EventForm from "@/components/forms/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { notFound } from "next/navigation";

type Props = {
  params: { eventId: string };
};

// revalidate = 0
// The page will never be statically regenerated after the initial request.
// Every request will result in a new server-side rendering (SSR) of the page.
// The page will always be dynamically rendered, not served from the cache.

export const revalidate = 0;

async function EditEventPage({ params: { eventId } }: Props) {
  const { userId, redirectToSignIn } = auth();
  if (!userId) return redirectToSignIn();

  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(clerkUserId, userId), eq(id, eventId)),
  });

  if (event == null) return notFound();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm
          event={{ ...event, description: event.description || undefined }}
        />
      </CardContent>
    </Card>
  );
}

export default EditEventPage;
