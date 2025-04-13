import { render } from "@testing-library/react";
import { Footer } from "@/components/footer";
import {describe, it, expect} from "vitest"
describe("Footer", () => {
  it("should match snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});