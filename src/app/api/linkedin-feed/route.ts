import { NextResponse } from "next/server";

// Minimal LinkedIn feed fetcher: requires
// - LINKEDIN_ACCESS_TOKEN: a personal access token with r_member_social
// - LINKEDIN_MEMBER_URN: like 'urn:li:person:xxxxxxxx'
// If not provided, returns configured:false and [] to allow UI fallback.

type LinkedInUGC = {
  id?: string;
  urn?: string;
  lastModified?: { time?: number };
  created?: { time?: number };
  specificContent?: {
    [key: string]: { shareCommentary?: { text?: string } } | undefined;
  };
  message?: { text?: string };
};

export async function GET() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const memberUrn = process.env.LINKEDIN_MEMBER_URN;

  if (!token || !memberUrn) {
    return NextResponse.json({ configured: false, posts: [] }, { status: 200 });
  }

  try {
    // Basic fetch for recent UGC posts. LinkedIn API varies by account/app.
    const res = await fetch(
      `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodeURIComponent(
        memberUrn
      )})&sortBy=LAST_MODIFIED&count=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json({ configured: true, posts: [] }, { status: 200 });
    }

    const data = await res.json();
    const elements: LinkedInUGC[] = Array.isArray(data.elements) ? data.elements : [];

    const posts = elements.map((e: LinkedInUGC) => {
      const shareContent = e?.specificContent?.["com.linkedin.ugc.ShareContent"];
      const text = shareContent?.shareCommentary?.text || e?.message?.text || "";
      const createdAt = e?.lastModified?.time || e?.created?.time || Date.now();
      const id = e?.id || e?.urn || Math.random().toString(36).slice(2);
      const permalink = `https://www.linkedin.com/in/sudhagarjb/`;
      return { id, text, createdAt, permalink };
    });

    return NextResponse.json({ configured: true, posts }, { status: 200 });
  } catch (_e) {
    return NextResponse.json({ configured: true, posts: [] }, { status: 200 });
  }
} 