import { vi } from "vitest";

global.$fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ value: "mocked data" }),
  })
);
