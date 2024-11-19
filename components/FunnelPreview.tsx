import { useContext, useState, useRef, useEffect } from "react";
import PhoneFrame from "./PhoneFrame";
import { FunnelContext } from "@/lib/contexts";
import FunnelBlock from "./FunnelBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function FunnelPreview() {
  const [funnel, setFunnel] = useContext(FunnelContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);
  const [blocks] = useAutoAnimate();

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current;
        setIsOverflowing(scrollHeight > clientHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [funnel, currentPage]);

  if (!funnel) {
    return;
  }

  const page = funnel.pages[currentPage];
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="px-4 -mx-4 disabled:text-slate-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <PhoneFrame bgColor={funnel.bgColor}>
          <div
            ref={contentRef}
            className={`w-full h-full pl-4 pt-12 mt-12 pb-24 font-[family-name:var(--font-nunito)] overflow-y-auto ${
              isOverflowing ? "" : "pr-4"
            }`}
            style={{ backgroundColor: funnel.bgColor || "white" }}
          >
            <div className="space-y-8" ref={blocks}>
              {page.blocks.map((block) => (
                <FunnelBlock key={block.id} block={block} />
              ))}
            </div>
          </div>
        </PhoneFrame>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(funnel.pages.length - 1, prev + 1),
            )
          }
          disabled={currentPage === funnel.pages.length - 1}
          className="px-4 -mx-4 disabled:text-slate-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
