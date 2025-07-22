import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  const { username, password } = await req.json();

  if (
    username === process.env.DASHBOARD_USER &&
    password === process.env.DASHBOARD_PASS
  ) {
    session.isLoggedIn = true;
    await session.save();
    return res;
  }

  return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
}
