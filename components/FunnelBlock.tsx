import { cl } from "@/lib/utils";
import { Block } from "@/types";

export default function FunnelBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <p
          className={cl(
            "text-2xl font-bold",
            block.align === "center" && "text-center",
            block.align === "left" && "text-left",
            block.align === "right" && "text-right",
          )}
          style={{ color: block.color }}
        >
          {block.text}
        </p>
      );
    case "image":
      return (
        <div className="rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt || ""}
            className="w-full h-auto"
          />
        </div>
      );
    case "button":
      return (
        <button
          type="button"
          className="rounded-xl px-6 py-4 font-bold shadow-sm w-full"
          style={{
            backgroundColor: block.bgColor,
            color: block.color,
          }}
        >
          {block.text}
        </button>
      );

    case "list":
      return (
        <ul className="grid grid-cols-1 gap-4">
          {block.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt="" className="w-12 h-12" />
              <div>
                <h3 className="font-semibold text-gray-900 ">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}
