import { sum } from "../sum";

test("Sum function should calculate the sum of two numbers", () => {
  const result = sum(16, 9);
  // Assertion
  expect(result).toBe(25);
});
