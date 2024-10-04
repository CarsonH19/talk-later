import React, { ReactNode } from "react";

function PublicLayout({ children }: { children: ReactNode }) {
  return <main className="container my-6">{children}</main>;
}

export default PublicLayout;
