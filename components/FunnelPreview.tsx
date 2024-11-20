import { useContext, useState, useRef, useEffect } from "react";
import PhoneFrame from "./PhoneFrame";
import { FunnelContext } from "@/lib/contexts";
import { useDragScroll } from "@/lib/hooks";
import { cl, isLightColor } from "@/lib/utils";
import FunnelPage from "@/components/FunnelPage";

export default function FunnelPreview() {
  const [funnel] = useContext(FunnelContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isBackgroundLight, setIsBackgroundLight] = useState(true);
  const contentRef = useRef(null);

  useDragScroll(contentRef);

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

  useEffect(() => {
    if (funnel?.bgColor) {
      setIsBackgroundLight(isLightColor(funnel.bgColor));
    }
  }, [funnel, setIsBackgroundLight]);

  if (!funnel) {
    return;
  }

  const page = funnel.pages[currentPage];

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4">
        {/* button prev */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="px-4 -mx-4 disabled:opacity-0 text-slate-500 hover:text-slate-900 transition-colors"
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
            className={cl([
              "w-full h-full pl-4 pt-20 pb-24 font-[family-name:var(--font-nunito)] overflow-y-auto",
              `${isOverflowing ? "-pr-4" : "pr-4"}`,
              `${isBackgroundLight ? "scrollbar-light" : "scrollbar-dark"}`,
            ])}
            style={{ backgroundColor: funnel.bgColor || "white" }}
          >
            <FunnelPage page={page} isBackgroundLight={isBackgroundLight} />
          </div>
        </PhoneFrame>
        {/* button next */}
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(funnel.pages.length - 1, prev + 1),
            )
          }
          disabled={
            !funnel.pages.length || currentPage === funnel.pages.length - 1
          }
          className="px-4 -mx-4 disabled:opacity-0 text-slate-500 hover:text-slate-900 transition-colors"
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
