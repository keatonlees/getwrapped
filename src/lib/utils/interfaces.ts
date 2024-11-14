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
  columns?: Column[];
}
interface Column {
  title: string;
  content: string;
}

export interface Template {
  wrap: Wrap;
  current: number;
}
