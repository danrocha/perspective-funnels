"use client";

import { FileUploader } from "@/components/FileUploader";
import Image from "next/image";
import { FunnelContext } from "@/lib/contexts";
import { useState } from "react";
import { Funnel } from "@/types";
import { Toaster } from "react-hot-toast";
import FunnelPreview from "@/components/FunnelPreview";
import perspectiveLogo from "../public/logo.png";

export default function Home() {
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  return (
    <FunnelContext.Provider value={[funnel, setFunnel]}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-inter)] bg-gray-50">
        <header>
          <div className="flex gap-2 items-center">
            <Image
              src={perspectiveLogo}
              alt="Perspective Logo"
              className="w-6 h-6"
            />
            Perspective Funnel Viewer
          </div>
        </header>
        <main className="flex flex-col gap-8 row-start-2 items-center justify-center h-full">
          {funnel ? <FunnelPreview /> : <FileUploader />}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap justify-center"></footer>
      </div>
      <Toaster />
    </FunnelContext.Provider>
  );
}
