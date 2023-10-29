import type { Optional } from "../types/Optional";

export default interface Meta {
  pagination: {
    page: Optional<number>;
    pageSize: Optional<number>;
    pageCount: Optional<number>;
    start: Optional<number>;
    limit: Optional<number>;
    total: number;
  };
}
