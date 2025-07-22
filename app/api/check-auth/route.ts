import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await getIronSession<SessionData>(
    req,
    new Response(),
    sessionOptions
  );

  return NextResponse.json(
    { ok: session.isLoggedIn || false },
    {
      status: session.isLoggedIn ? 200 : 401,
    }
  );
}
