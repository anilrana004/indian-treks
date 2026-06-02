import { getTrekBySlug } from "../data/treks";
import type { Trek } from "../types";

export function useTrek(slug: string | undefined): Trek | undefined {
  if (!slug) return undefined;
  return getTrekBySlug(slug);
}
