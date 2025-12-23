import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Prisma will need node runtime later

export async function GET() {
  return NextResponse.json({
    ok: true,
    env: process.env.VERCEL_ENV ?? "local",
    git: {
      branch: process.env.VERCEL_GIT_COMMIT_REF,
      sha: process.env.VERCEL_GIT_COMMIT_SHA,
    },
    time: new Date().toISOString(),
  });
}
