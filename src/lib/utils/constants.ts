import { Wrap } from "./interfaces";

export const baseURL = (
  process.env.NODE_ENV === "production"
    ? "https://getwrapped.vercel.app"
    : "http://localhost:3000"
) as string;

// TODO: update this
const defaultBGColor: string = "#FAF9F6";
const defaultColor: string = "#202020";
export const newWrap: Wrap = {
  title: "New Wrap",
  pages: [
    {
      type: "title",
      bgColor: defaultBGColor,
      color: defaultColor,
      content: "Made by Name",
    },
    { type: "default", bgColor: defaultBGColor, color: defaultColor },
    { type: "credits", bgColor: defaultBGColor, color: defaultColor },
  ],
};
