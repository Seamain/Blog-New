import type { Default } from "./../default/Default";
import type { Optional } from "../../types/Optional";
import type Formats from "./Formats";
import type ProviderMetadata from "./ProviderMetadata";

export default interface Media extends Default {
  name: string;
  alternativeText: Optional<string>;
  caption: Optional<string>;
  width: Optional<number>;
  height: Optional<number>;
  formats: Optional<Formats>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: Optional<string>;
  provider: string;
  provider_metadata: ProviderMetadata;
  placeholder: Optional<string>;
  blurhash: Optional<string>;
}
