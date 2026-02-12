import * as cheerio from "cheerio";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanHtmlText = (html: string): string => {
  if (!html) return "";
  return cheerio.load(html).text().trim();
};
