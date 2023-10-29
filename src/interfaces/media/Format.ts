import type { Optional } from "../../types/Optional";
import type ProviderMetadata from "./ProviderMetadata";

export default interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: Optional<string>;
  width: Optional<number>;
  height: Optional<number>;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}
