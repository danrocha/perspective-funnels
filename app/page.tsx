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
    <FunnelContext.Provider value={[funnel, setFunnel]}>
      <div className="grid grid-rows-[1fr_auto_1fr]  justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-inter)] bg-gray-50">
        <header className="justify-items-center">
        <Header />
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-6"
                >
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-8 row-start-2 items-center justify-center h-full">
          <div className="flex flex-col items-center min-h-[600px]">
            {funnel ? <FunnelPreview /> : <FileUploader />}
          </div>
        </main>
        <footer className="flex flex-col items-center">
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
        </footer>
      </div>
      <Toaster />
    </FunnelContext.Provider>
  );
}
