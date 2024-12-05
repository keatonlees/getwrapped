import { Page } from "../utils/interfaces";

interface FormatColorData {
  page: Page;
  current: number;
  bgColor: string;
  color: string;
}
interface FormatTextData {
  current: number;
  pageData: {
    title?: string;
    content?: string;
    items?: {
      [key: string]: string;
    }[];
  };
}
interface FormatImageData {
  page: Page;
  current: number;
  imageURL: string | undefined;
}
interface FormatImageArrayData {
  page: Page;
  current: number;
  fileURLs: (string | undefined)[];
}

export const formatColorData = (props: FormatColorData) => {
  const { page, current, bgColor, color } = props;

  let data = {};
  if (page.bgColor !== bgColor && bgColor !== "")
    data = {
      ...data,
      [`pages.${current}.bgColor`]: bgColor,
    };
  if (page.color !== color && color !== "")
    data = {
      ...data,
      [`pages.${current}.color`]: color,
    };

  return data;
};

export const formatTextData = (props: FormatTextData) => {
  const { current, pageData } = props;

  let data = {};
  Object.keys(pageData).forEach((key: string) => {
    if (key === "items") {
      const items = pageData[key] as { [key: string]: string }[];
      items.forEach((item, i) => {
        data = {
          ...data,
          [`pages.${current}.items.${i}.title`]: item.title,
          [`pages.${current}.items.${i}.content`]: item.content,
        };
      });
    } else if (key === "title" || key === "content") {
      data = { ...data, [`pages.${current}.${key}`]: pageData[key] };
    }
  });

  return data;
};

export const formatImageData = (props: FormatImageData) => {
  const { page, current, imageURL } = props;

  if (!imageURL) return {};

  let data = {};
  if (page.imageURL !== imageURL && imageURL !== "")
    data = {
      ...data,
      [`pages.${current}.imageURL`]: imageURL,
    };

  return data;
};

export const formatImageArrayData = (props: FormatImageArrayData) => {
  const { page, current, fileURLs } = props;

  if (fileURLs.length === 0) return {};

  let data = {};
  for (let i = 0; i < fileURLs.length; i++) {
    if (
      page.items &&
      fileURLs[i] !== "" &&
      page.items[i].imageURL !== fileURLs[i]
    ) {
      data = {
        ...data,
        [`pages.${current}.items.${i}.imageURL`]: fileURLs[i],
      };
    }
  }

  return data;
};
