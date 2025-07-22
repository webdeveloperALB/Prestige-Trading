import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (!session.isLoggedIn)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const q = query(
      collection(db, "submissions"),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        timestamp: d.timestamp.toDate().toISOString(),
        referralCode: d.referralCode,
        fullName: d.fullName,
        email: d.email,
        phone: d.phone,
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions." },
      { status: 500 }
    );
  }
}
