import { Page } from "../utils/interfaces";

interface formatColorData {
  page: Page;
  current: number;
  bgColor: string;
  color: string;
}

export const formatColorData = (props: formatColorData) => {
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
