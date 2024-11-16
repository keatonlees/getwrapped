import { ObjectId } from "mongodb";

export interface Wrap {
  _id?: ObjectId;
  title: string;
  pages: Page[];
}

export interface Page {
  type: string;
  bgColor: string;
  color: string;
  title?: string;
  subtitle?: string;
  content?: string;
  imageURL?: string;
  columns?: Cell[];
  rows?: Cell[];
}
interface Cell {
  title: string;
  content: string;
  imageURL?: string;
}

export interface Template {
  wrap: Wrap;
  current: number;
}
