import { Footer } from "@/components/footer";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";


// Mock authentication functions
vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({ user: { role: "user" } }),
  signOut: vi.fn(),
}));

describe("Footer", () => {
  it("should match snapshot", async () => {
    // Await the Footer component to get the resolved React element.
    const footerElement = await Footer();
    const { container } = render(footerElement);
    expect(container).toMatchSnapshot();
  });
});