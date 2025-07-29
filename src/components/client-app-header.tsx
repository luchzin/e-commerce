"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AppHeader from "./app-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientAppHeader() {
  const { status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading skeleton while component is mounting or session is loading
  if (!isMounted || status === "loading") {
    return (
      <header className="border-b px-4 md:px-6 bg-white dark:bg-[#060606] shadow-sm">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <Skeleton className="h-8 w-8 md:hidden" />
            <div className="flex items-center gap-10">
              <Skeleton className="h-8 w-20" />
              <div className="hidden md:flex items-center gap-6">
                {[1, 2, 3, 4].map((index) => (
                  <Skeleton key={index} className="h-4 w-16" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <div className="hidden sm:flex items-center gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return <AppHeader />;
} 