export interface Wrap {
  _id: string;
  title: string;
  pages: Page[];
}

export interface Page {
  type: string;
  bgColor: string;
  color: string;
}
