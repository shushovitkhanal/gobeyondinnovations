import { NextResponse } from "next/server";
import { findVerifiedTeacher } from "@/lib/verification";

export const dynamic = "force-dynamic";

const noStoreHeaders = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  let body: { query?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please enter a verification ID or email address." }, { status: 400, headers: noStoreHeaders });
  }

  const query = typeof body.query === "string" ? body.query.trim() : "";
  if (!query || query.length > 254) {
    return NextResponse.json({ error: "Please enter a valid verification ID or email address." }, { status: 400, headers: noStoreHeaders });
  }

  try {
    const teacher = await findVerifiedTeacher(query);
    return NextResponse.json({ found: Boolean(teacher), teacher }, { headers: noStoreHeaders });
  } catch (error) {
    console.error("Teacher verification lookup failed", error);
    return NextResponse.json({ error: "Verification is temporarily unavailable. Please try again later." }, { status: 503, headers: noStoreHeaders });
  }
}
