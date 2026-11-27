import { afterEach, expect, it, vi } from "vite-plus/test";
import { randomInt } from "./utils";

afterEach(() => {
  vi.restoreAllMocks();
});

it("generates integers across the inclusive chart range", () => {
  const random = vi.spyOn(Math, "random");
  random
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(1 - Number.EPSILON);

  expect(randomInt(-1000, 1000)).toBe(-1000);
  expect(randomInt(-1000, 1000)).toBe(0);
  expect(randomInt(-1000, 1000)).toBe(1000);
});
