import { ObjectId } from "mongodb";

export interface Wrap {
  _id: ObjectId;
  title: string;
  pages: Page[];
  user: string;
}

export interface Page {
  type: string;
  bgColor: string;
  color: string;
  title?: string;
  content?: string;
  imageURL?: string;
  items?: Cell[];
}
interface Cell {
  title: string;
  content: string;
  imageURL?: string;
}

export interface Template {
  wrap: Wrap;
  current: number;
  editing: boolean;
  bgColor: string;
  color: string;
  setWrap: React.Dispatch<React.SetStateAction<Wrap>>;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
