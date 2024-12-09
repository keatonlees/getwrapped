export const baseURL = (
  process.env.NODE_ENV === "production"
    ? "https://getwrapped.vercel.app"
    : "http://localhost:3000"
) as string;

const bgColor = "#ffd2c1";
const color = "#6d89b0";

const item = {
  title: "",
  content: "",
  imageURL: "",
};
const titlePage = {
  type: "title",
  bgColor: bgColor,
  color: color,
  title: "New Wrap!",
  content: "Made by yours truly",
};
const creditsPage = {
  type: "credits",
  bgColor: bgColor,
  color: color,
  title: "Thanks for reading!",
  content: "A special thanks to everyone",
};

export const singlePage = {
  type: "single",
  bgColor: bgColor,
  color: color,
  items: [
    {
      title: "Our first memory!",
      content: "Remember when we pushed each other into the ball pit?",
      imageURL: "",
    },
  ],
};
export const splitPage = {
  type: "split",
  bgColor: bgColor,
  color: color,
  title: "Our ideas",
  items: [
    {
      title: "His Idea",
      content: "Going for late night drives",
      imageURL: "",
    },
    {
      title: "Her Idea",
      content: "Watching Netflix with popcorn",
      imageURL: "",
    },
  ],
};
export const rowsPage = {
  type: "rows",
  bgColor: bgColor,
  color: color,
  title: "Favorite Shows",
  items: [
    {
      title: "The Office",
      content: "",
      imageURL: "",
    },
    {
      title: "Breaking Bad",
      content: "",
      imageURL: "",
    },
    {
      title: "Grey's Anatomy",
      content: "",
      imageURL: "",
    },
    {
      title: "Arcane",
      content: "",
      imageURL: "",
    },
    {
      title: "The Mandalorian",
      content: "",
      imageURL: "",
    },
  ],
};
export const statsPage = {
  type: "stats",
  bgColor: bgColor,
  color: color,
  title: "Stats Page",
  items: [
    {
      title: "You spent",
      content: "150,000",
    },
    {
      title: "minutes watching Netflix",
      content: "That's a lot of shows!",
    },
  ],
};
export const summaryPage = {
  type: "summary",
  bgColor: bgColor,
  color: color,
  title: "Summary Page",
  items: [
    {
      title: "Top Food",
      content: "Top Songs",
      imageURL: "",
    },
    {
      title: "1. Sushi",
      content: "1. Enemy",
    },
    {
      title: "2. Burgers",
      content: "2. Illusion",
    },
    {
      title: "3. Pho",
      content: "3. Paradise",
    },
    {
      title: "4. Pizza",
      content: "4. Uptown Funk",
    },
    {
      title: "5. Ramen",
      content: "5. All Time Low",
    },
    {
      title: "Years Together",
      content: "Top Trip",
    },
    {
      title: "4",
      content: "Japan",
    },
  ],
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
