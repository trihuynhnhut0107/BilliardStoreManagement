import { useLogin } from "../composables/useLogin";

vi.mock("#app", () => ({
  useFetch: vi.fn(() => Promise.resolve({ data: { value: "mocked data" } })),
}));

describe("login", () => {
  it("should return loginInfo if login is successful", async () => {
    expect(
      await useLogin({ username: "customertest", password: "customertest" })
    ).toBe(true);
  });
});
