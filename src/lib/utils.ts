import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    conference: "bg-blue-100 text-blue-800",
    workshop: "bg-green-100 text-green-800",
    networking: "bg-purple-100 text-purple-800",
    social: "bg-pink-100 text-pink-800",
    sports: "bg-orange-100 text-orange-800",
    arts: "bg-red-100 text-red-800",
    food: "bg-yellow-100 text-yellow-800",
    music: "bg-indigo-100 text-indigo-800",
    tech: "bg-blue-100 text-blue-800",
    business: "bg-gray-100 text-gray-800",
  };
  return colorMap[category] || "bg-gray-100 text-gray-800";
};

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
