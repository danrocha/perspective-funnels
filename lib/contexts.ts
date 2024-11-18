import { createContext } from "react";
import { Funnel } from "@/types";
import { Dispatch, SetStateAction } from "react";

export const FunnelContext = createContext<
  [Funnel | null, Dispatch<SetStateAction<Funnel | null>>]
>([null, function () {}]);
