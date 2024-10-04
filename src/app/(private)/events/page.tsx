import { Button } from "@/components/ui/button";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";
import { db } from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// import { eq } from "drizzle-orm";

const EventsPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return (
    <>
      <div className="flex gap-4 items-baseline">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">
          Events
        </h1>
        <Button asChild>
          <Link href="/events/new">
            <CalendarPlus className="mr-4 size-6" />
            New Event
          </Link>
        </Button>
      </div>
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
          {events.map(event => (
            <EventCard key={event.id} {...events} />
          ))}          
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="size-16 mx-auto" />
          You do not have any events yet. Create your first event to get
          started!
          <Button className="text-lg" size="lg" asChild>
            <Link href="/events/new">
              <CalendarPlus className="mr-4 size-6" />
              New Event
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default EventsPage;
