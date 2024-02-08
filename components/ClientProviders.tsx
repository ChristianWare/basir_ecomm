"use client";

import { Toaster } from "react-hot-toast";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
