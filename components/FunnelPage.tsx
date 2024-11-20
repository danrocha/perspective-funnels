import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cl } from "@/lib/utils";
import { FunnelPage as FunnelPageType } from "@/types";
import FunnelBlock from "@/components/FunnelBlock";

export default function FunnelPage({
  page,
  isBackgroundLight,
}: {
  page?: FunnelPageType | undefined;
  isBackgroundLight: boolean;
}) {
  const [blocks] = useAutoAnimate();

  if (!page) {
    return (
      <div
        className={cl([
          "flex flex-col items-center justify-center h-full",
          `${isBackgroundLight ? "text-slate-900" : "text-white"}`,
        ])}
      >
        <span className="font-bold">
          Ops, there are no pages in this funnel!
        </span>
        <span>Add some pages and try again.</span>
      </div>
    );
  }

  if (!page.blocks.length) {
    return (
      <div
        className={cl([
          "flex flex-col items-center justify-center h-full",
          `${isBackgroundLight ? "text-slate-900" : "text-white"}`,
        ])}
      >
        <span className="font-bold">Ops, this page has no content!</span>
        <span>Add some blocks and try again.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pointer-events-none select-none" ref={blocks}>
      {page.blocks.map((block) => (
        <FunnelBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
