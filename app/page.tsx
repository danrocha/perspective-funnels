"use client";

import { FileUploader } from "@/components/FileUploader";
import { FunnelContext } from "@/lib/contexts";
import { useState, useEffect } from "react";
import { Funnel } from "@/types";
import { Toaster } from "react-hot-toast";
import FunnelPreview from "@/components/FunnelPreview";
import Header from "@/components/ui/Header";

export default function Home() {
  const [funnel, setFunnel] = useState<Funnel | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const savedFunnel = localStorage.getItem("funnel");
      if (savedFunnel) {
        setFunnel(JSON.parse(savedFunnel));
      }
    } catch (error) {
      console.error("Error loading funnel from localStorage:", error);
    }
  }, []);

  function handleClear() {
    setFunnel(null);
    localStorage.removeItem("funnel");
  }

  return (
    <div className="grid grid-rows-[1fr_auto_1fr]  justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-inter)] bg-gray-50">
      <header className="justify-items-center">
        <Header />
      </header>
      <main className=" row-start-2 h-full">
        <FunnelContext.Provider value={[funnel, setFunnel]}>
          {funnel ? <FunnelPreview /> : <FileUploader />}
        </FunnelContext.Provider>
      </main>
      <div>
        {funnel && (
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg">{funnel.name}</h2>
            <button
              className="text-slate-500 flex items-center gap-1 text-sm hover:text-slate-800 transition-colors"
              onClick={handleClear}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>
      <footer>
        <Toaster />
      </footer>
    </div>
  );
}
