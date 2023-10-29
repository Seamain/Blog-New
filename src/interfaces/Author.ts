import type { Optional } from "./../types/Optional";
import type Attribute from "./Attribute";
import type Data from "./Data";
import type Media from "./media/Media";

export default interface Author {
  slug: string;
  name: string;
  avatar: Optional<Data<Attribute<Media>>>;
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
