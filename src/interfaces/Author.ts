import type { Optional } from "./../types/Optional";
import type Media from "./media/Media";

export default interface Author {
  slug: string;
  name: string;
  avatar: Optional<Media>;
  site: string;
  contacts: {
    type:
    | "Email"
    | "Phone"
    | "Weixin"
    | "WeChat"
    | "QQ"
    | "Skype"
    | "Telegram"
    | "Line";
    value: string;
  }[];
  publicKey: string;
}
