import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const admins_id = [1, 10]; // Keep in sync with your auth.ts

export async function POST(req: NextRequest) {
  // Extract JWT from Authorization header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized - Missing or invalid token" },
      { status: 401 },
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token with your JWT secret
    const decoded = verify(token, process.env.AUTH_SECRET!) as unknown as {
      sub: number;
    };

    // Determine role
    const role = admins_id.includes(decoded.sub) ? "admin" : "user";

    return NextResponse.json({ role });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json(
      { error: "Unauthorized - Invalid token" },
      { status: 401 },
    );
  }
}

// Optional: Add GET method if needed
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
