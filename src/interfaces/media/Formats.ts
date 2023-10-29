import type { Optional } from "../../types/Optional";
import type Format from "./Format";

export default interface Formats {
  thumbnail: Optional<Format>;
  medium: Optional<Format>;
  small: Optional<Format>;
  large: Optional<Format>;
}
