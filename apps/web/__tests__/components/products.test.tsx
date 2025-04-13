import Products from "@/components/products";
import { render } from "@testing-library/react";
import { useProducts } from "api";
import { describe, expect, it, vi } from "vitest";

// Mock next-auth session provider and hooks
vi.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock API module
vi.mock("api", () => ({
  useProducts: vi.fn(),
}));

// Mock child components that might use session
vi.mock("./single-product", () => ({
  default: ({ product }: any) => (
    <div data-testid="single-product">{product.name}</div>
  ),
}));

// Mock cart component if it uses session
vi.mock("./cart", () => ({
  default: () => <div data-testid="cart" />,
}));

// Mock skeleton component
vi.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div className={className} data-testid="skeleton" />
  ),
}));

describe("Products", () => {
  const mockUseProducts = useProducts as vi.Mock;

  it("renders loading state correctly", () => {
    mockUseProducts.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { container } = render(<Products />);
    expect(container).toMatchSnapshot();
  });

  it("renders error state correctly", () => {
    mockUseProducts.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Failed to load products" },
    });

    const { container } = render(<Products />);
    expect(container).toMatchSnapshot();
  });

  it("renders products correctly", () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100 },
      { id: 2, title: "Product 2", price: 200 },
    ];

    mockUseProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    const { container } = render(<Products />);
    expect(container).toMatchSnapshot();
  });
});
