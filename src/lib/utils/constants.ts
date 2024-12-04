// import { Wrap } from "./interfaces";

export const baseURL = (
  process.env.NODE_ENV === "production"
    ? "https://getwrapped.vercel.app"
    : "http://localhost:3000"
) as string;

const bgColor = "#121c22";
const color = "#9fb9d0";

export const newWrap = {
  title: "New Wrap",
  user: "",
  pages: [
    {
      type: "title",
      bgColor: bgColor,
      color: color,
      content: "This is content",
    },
    {
      type: "single",
      bgColor: bgColor,
      color: color,
      title: "This is a title",
      content: "This is content",
      imageURL: "",
    },
    {
      type: "credits",
      bgColor: bgColor,
      color: color,
      title: "This is a title",
      content: "This is content",
    },
  ],
};
