import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const admins_id = [1, 10]; // Keep in sync with your auth.ts

export async function POST(req: NextRequest) {
  // Add CORS headers to response
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }
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

    return NextResponse.json(
      { role },
      { status: 200, // Status 200 for successful verification
        headers, // Add headers to successful response
      }
      
    );
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401, headers } // Add headers to error response
    );
  }
}

// Optional: Add GET method if needed
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
