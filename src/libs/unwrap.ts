import type { Optional } from "../types/Optional";

export default function unWrap<T>(data: Optional<T>): T {
  if (data == undefined || data == null) {
    throw new Error("Data cannot be unwarpped");
  }

  return data;
}
