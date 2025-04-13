import { Footer } from "@/components/footer";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Footer", () => {
  it("should match snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
