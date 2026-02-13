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
export const parseDate = (dateStr: string) => {
  if (!dateStr) return 0;
  const [datePart, timePart] = dateStr.split(" ");
  if (!datePart) return 0;
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute] = timePart ? timePart.split(":").map(Number) : [0, 0];
  const fullYear = year < 100 ? 2000 + year : year;
  return new Date(fullYear, month - 1, day, hour, minute).getTime();
};

export const parseDateTime = (dateStr: string, timeStr: string) => {
  if (!dateStr) return 0;
  const parts = dateStr.split("/");
  if (parts.length < 3) return 0;
  const [day, month, year] = parts.map(Number);

  const [hour, minute] = timeStr ? timeStr.split(":").map(Number) : [0, 0];

  const fullYear = year < 100 ? 2000 + year : year;

  return new Date(fullYear, month - 1, day, hour || 0, minute || 0).getTime();
};
