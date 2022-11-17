import { test, expect } from "vitest";
import { getFutureDate } from "./get-future-date.ts";

test("increase date with more one year", () => {
  const year = new Date().getFullYear();

  expect(getFutureDate(`${year}-09-23`).getFullYear()).toEqual(2023);
});
