import { jwtDecode } from "jwt-decode"; // Changed from verify
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const admins_id = [1, 10];
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized - Missing or invalid token" },
      { status: 401, headers },
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwtDecode<{ sub: number }>(token);

    if (typeof decoded.sub !== "number") {
      throw new Error("Invalid token payload");
    }

    const role = admins_id.includes(decoded.sub) ? "admin" : "user";

    return NextResponse.json({ role }, { status: 200, headers });
  } catch (error) {
    console.error("JWT Decoding Error:", error);
    return NextResponse.json(
      { error: "Unauthorized - Invalid token format" },
      { status: 401, headers },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...headers,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
