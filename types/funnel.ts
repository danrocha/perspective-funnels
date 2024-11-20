type TextBlock = {
  id: string;
  type: "text";
  text: string;
  color: string;
  align: "left" | "center" | "right";
};

type ImageBlock = {
  id: string;
  type: "image";
  src: string;
  alt?: string;
};

type ListItem = {
  id: string;
  title: string;
  description: string;
  src: string;
};

type ListBlock = {
  id: string;
  type: "list";
  items: ListItem[];
};

type ButtonBlock = {
  id: string;
  type: "button";
  text: string;
  color: string;
  bgColor: string;
};

export type Block = TextBlock | ImageBlock | ListBlock | ButtonBlock;

export type FunnelPage = {
  id: string;
  blocks: Block[];
};

export type Funnel = {
  id: string;
  name: string;
  bgColor: string;
  pages: FunnelPage[];
};
