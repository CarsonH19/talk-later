"use client";

import { CalendarRange } from "lucide-react";
import { NavLink } from "./NavLink";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();
  const isActive = pathName === "/events" || pathName === "/schedule";

  return (
    // <div className="absolute top-0 w-full">
    <header className="z-10 items-start flex py-2 border-b bg-card w-full">
      <nav className="font-medium flex items-center text-sm gap-6 container">
        <div className="flex items-center gap-2 font-semibold mr-auto">
          <CalendarRange className="size-6" />
          <span className="sr-only md:not-sr-only">
            Talk<span className="text-blue-400">Later</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          {isActive && <NavLink href="/events">Events</NavLink>}
          {isActive && <NavLink href="/schedule">Schedule</NavLink>}
          {isActive && (
            <div className="ml-auto size-10">
              <UserButton
                appearance={{
                  elements: { userButtonAvatarBox: "size-full" },
                }}
              />
            </div>
          )}
        </div>
      </nav>
    </header>
    // </div>
  );
};

export default Header;
