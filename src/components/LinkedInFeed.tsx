"use client";

import useSWR from "swr";
import { motion } from "framer-motion";
import Link from "next/link";

type LinkedInPost = {
  id: string;
  author?: string;
  text?: string;
  createdAt?: string;
  permalink?: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function LinkedInFeed() {
  const { data, error, isLoading } = useSWR<{ posts: LinkedInPost[]; configured: boolean }>(
    "/api/linkedin-feed",
    fetcher,
    { revalidateOnFocus: false }
  );

  const posts = data?.posts || [];
  const configured = data?.configured ?? false;

  // If not configured, hide the feed entirely (no noisy messaging)
  if (!isLoading && !configured) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {isLoading && null}

      {!isLoading && configured && posts.length === 0 && (
        <div className="card-gradient rounded-xl p-6">
          <p className="text-purple-200/80">No recent posts.</p>
        </div>
      )}

      {posts.map((p, i) => (
        <motion.div
          key={p.id}
          className="rounded-xl p-5 card-gradient hover:glow transition"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="text-xs text-purple-300/80 mb-2">
            {new Date(p.createdAt || Date.now()).toLocaleString()}
          </div>
          <div className="whitespace-pre-wrap text-purple-100/90">
            {p.text || "(no text)"}
          </div>
          {p.permalink && (
            <Link
              href={p.permalink}
              target="_blank"
              className="inline-block mt-3 text-sm underline text-purple-300"
            >
              Open on LinkedIn
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
} 