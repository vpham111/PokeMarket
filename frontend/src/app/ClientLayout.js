"use client";

import { usePathname } from "next/navigation";
import Header from "./header/header";

const hideHeaderOnPaths = ["/login", "/register"];

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const showHeader = !hideHeaderOnPaths.includes(pathname);

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}
