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
  const [autoOpenFileInput, setAutoOpenFileInput] = useState(false);

  function handleReplace() {
    setAutoOpenFileInput(true);
    setFunnel(null);
  }

  function onOpenFileInputDialog() {
    setAutoOpenFileInput(true);
  }

  return (
    <FunnelContext.Provider value={[funnel, setFunnel]}>
      <div className="grid grid-rows-[1fr_auto_1fr]  justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-inter)] bg-gray-50">
        <header className="justify-items-center">
          <Image
            src={perspectiveLogo}
            alt="Perspective Logo"
            className="w-6 h-6"
          />
        </header>
        <main className="flex flex-col gap-8 row-start-2 items-center justify-center h-full">
          <div className="flex flex-col items-center min-h-[600px]">
            {funnel ? (
              <FunnelPreview />
            ) : (
              <FileUploader
                autoOpenFileInput={autoOpenFileInput}
                onOpenFileInputDialog={onOpenFileInputDialog}
              />
            )}
          </div>
        </main>
        <footer className="flex flex-col items-center">
          {funnel && (
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-lg">{funnel.name}</h2>

              <button
                className="text-slate-500 flex items-center gap-1 text-sm hover:text-slate-800 transition-colors"
                onClick={handleReplace}
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span>Replace</span>
              </button>
            </div>
          )}
        </footer>
      </div>
      <Toaster />
    </FunnelContext.Provider>
  );
}
