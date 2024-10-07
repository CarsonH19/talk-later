import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Calendar } from "@/components/ui/calendar";
import { redirect } from "next/navigation";
import { CalendarRange } from "lucide-react";
// import Image from "next/image";

export default function HomePage() {
  const { userId } = auth();
  if (userId != null) redirect("/events");

  return (
    <div className="flex flex-col">
      <CalendarRange
        height={700}
        width={700}
        className="hidden md:block absolute bottom-[10%] left-[5%] z-0 text-slate-200/40"
      />
      {/* <CalendarRange
        height={500}
        width={500}
        className="hidden md:block absolute top-[-20%] right-[0%] z-0 text-slate-200/70"
      /> */}
      <div className="z-10 mt-24 text-center h-full container mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="w-[28rem] flex flex-col justify-center items-center">
          <h1 className="text-7xl mb-4">
            Talk<span className="text-blue-400">Later</span>
          </h1>
          <p className="mb-2 text-muted-foreground uppercase text-sm">
            Scheduling has never been easier.
          </p>
          <div className="flex flex-col gap-2 justify-center w-[20rem]">
            <Button asChild variant="default">
              <SignInButton />
            </Button>
            <Button asChild variant="ghost">
              <SignUpButton />
            </Button>
          </div>
        </div>
        <Calendar mode="single" className="bg-blue-100 border rounded-md" />
      </div>
      {/* <div className="flex flex-col items-center justify-center mt-16 h-[10rem]">
        <div className="flex flex-col items-center  justify-center px-2 py-1 bg-blue-100 rounded-md text-center">
          <p>
            Automatically sync & schedule meetings with Google Calendar
          </p>
          <Image
            src="/google_calendar.svg"
            alt="Google Calendar"
            height={60}
            width={60}
          />
        </div>
      </div> */}
    </div>
  );
}
