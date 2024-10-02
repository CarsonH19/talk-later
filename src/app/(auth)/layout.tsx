import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
};

function AuthLayout({ children }: Props) {
  const { userId } = auth();
  if (userId !== null) redirect("/");
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default AuthLayout;
