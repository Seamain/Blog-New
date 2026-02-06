import type { Optional } from "../types/Optional";
import type Meta from "./Meta";

export default interface Data<T> {
  data: T;
  meta?: Meta;
}
