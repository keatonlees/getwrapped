// import { Wrap } from "./interfaces";

export const baseURL = (
  process.env.NODE_ENV === "production"
    ? "https://getwrapped.vercel.app"
    : "http://localhost:3000"
) as string;

const bgColor = "#ffd2c1";
const color = "#6d89b0";

const item = {
  title: "This is a title",
  content: "This is content",
  imageURL: "",
};
const titlePage = {
  type: "title",
  bgColor: bgColor,
  color: color,
  title: "New Wrap!",
  content: "This is content",
};
const creditsPage = {
  type: "credits",
  bgColor: bgColor,
  color: color,
  title: "Thank you!",
  content: "This is content",
};

export const singlePage = {
  type: "single",
  bgColor: bgColor,
  color: color,
  items: [item],
};
export const splitPage = {
  type: "split",
  bgColor: bgColor,
  color: color,
  title: "Split Page",
  items: [item, item],
};
export const alternatingPage = {
  type: "alternating",
  bgColor: bgColor,
  color: color,
  title: "Alternating Page",
  items: [item, item, item, item],
};
export const newWrap = {
  user: "",
  pages: [titlePage, singlePage, creditsPage],
};
