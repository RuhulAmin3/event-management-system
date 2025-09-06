import { StaticImageData } from "next/image";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  image: string | StaticImageData;
  categoryColor: string;
  createdBy: string;
  rsvps: string[];
  createdAt: string;
}
