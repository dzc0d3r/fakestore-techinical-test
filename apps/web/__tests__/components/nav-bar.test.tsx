// __tests__/components/nav-bar.test.tsx
import NaVBar from "@/components/navbar";
import { act, render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

// Mock authentication functions
vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({ user: { role: "user" } }),
  signOut: vi.fn(),
}));

// Mock Next.js Image to prevent issues with Next/Image
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || "mocked image"} />,
}));

// Mock the Cart component to avoid internal hook errors
vi.mock("@/components/navbar/cart", () => ({
  default: () => <div data-testid="cart">Cart Component</div>,
}));

// Mock shadcn / Radix UI based components with simple wrappers
vi.mock("@/components/ui/button", () => ({
  Button: (props: any) => <button {...props}>{props.children}</button>,
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuSeparator: () => <div />,
}));

vi.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

// Mock LoginButton if needed
vi.mock("@/components/navbar/login-button", () => ({
  default: () => <div data-testid="login-button">Login Button</div>,
}));

describe("NaVBar Snapshot", () => {
  it("should render correctly and match snapshot", async () => {
    let element: JSX.Element | null = null;

    // Resolve the async component using act
    await act(async () => {
      element = await NaVBar();
    });

    const { container } = render(element!);

    // Remove the invalid "action" attribute from any <form> elements to avoid warnings
    container.querySelectorAll("form[action]").forEach((form) => {
      form.removeAttribute("action");
    });

    expect(container).toMatchSnapshot();
  });
});
