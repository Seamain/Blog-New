import type { Optional } from "../types/Optional";

export default interface Page<T> {
  data: T[];
  start: number;
  end: number;
  size: number;
  total: number;
  currentPage: number;
  lastPage: number;
  url: {
    current: string;
    prev: Optional<string>;
    next: Optional<string>;
  };
}
