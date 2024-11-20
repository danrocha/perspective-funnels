import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cl(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLightColor(color: string) {
  if (!color) return true;

  let r, g, b;
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  } else if (color.startsWith("rgb")) {
    [r, g, b] = color.match(/\d+/g)!.map(Number);
  } else {
    return true; // Default to light for unknown formats
  }

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}
