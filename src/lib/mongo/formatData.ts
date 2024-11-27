import { PageType } from "../utils/enums";
import { Page } from "../utils/interfaces";

interface Data {
  page: Page;
  current: number;
}

interface FormatColorData extends Data {
  bgColor: string;
  color: string;
}
interface FormatTextData extends Data {
  title: string;
  content: string;
  type?: string;
}
interface FormatTextArrayData extends Data {
  title: string;
  itemTitles: string[];
  itemContents: string[];
}
interface FormatImageData extends Data {
  imageURL: string | undefined;
}
interface FormatImageArrayData extends Data {
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
  const { page, current, title, content, type } = props;

  let data = {};
  if (page.title !== title && title !== "")
    if (type && type === PageType.TITLE) {
      data = {
        ...data,
        title: title,
      };
    } else {
      data = {
        ...data,
        [`pages.${current}.title`]: title,
      };
    }
  if (page.content !== content && content !== "")
    data = {
      ...data,
      [`pages.${current}.content`]: content,
    };

  return data;
};

export const formatTextArrayData = (props: FormatTextArrayData) => {
  const { page, current, title, itemTitles, itemContents } = props;

  let data = {};
  if (page.title !== title && title !== "")
    data = {
      ...data,
      [`pages.${current}.title`]: title,
    };

  itemTitles.forEach((itemTitle, i) => {
    if (page.items && page.items[i].title !== itemTitle) {
      data = {
        ...data,
        [`pages.${current}.items.${i}.title`]: itemTitle,
      };
    }
  });

  itemContents.forEach((itemContent, i) => {
    if (page.items && page.items[i].content !== itemContent) {
      data = {
        ...data,
        [`pages.${current}.items.${i}.content`]: itemContent,
      };
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
