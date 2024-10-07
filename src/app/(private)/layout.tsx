import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { userId } = auth();
  if (userId === null) redirect("/");

  return (
    <>
      <main className="container my-6 flex-none">{children}</main>
    </>
  );
}
