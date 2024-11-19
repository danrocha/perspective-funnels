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
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          prev
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
        >
          next
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="font-bold">{funnel.name}</span>
        <button
          type="button"
          className="flex items-center gap-2 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => setFunnel(null)}
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span>Replace funnel</span>
        </button>
      </div>
    </div>
  );
}
