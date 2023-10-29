import type { Optional } from "../types/Optional";

export default interface Attribute<T> {
  id: number;
  attributes: T;
}
