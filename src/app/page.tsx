"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ArrowDown, Sparkles, Star } from "lucide-react";
import useSWR from "swr";
import Link from "next/link";


type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SECTION_TITLE = (title: string, subtitle?: string) => (
  <div className="mb-10">
    <motion.h2
      className="text-3xl md:text-4xl font-semibold neon-text"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        className="text-sm/relaxed text-purple-200/80 mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function Home() {
  const { data: repos } = useSWR<GithubRepo[]>(
    "https://api.github.com/users/sudhagarjb/repos?sort=updated&per_page=12",
    fetcher
  );

  return (
    <main className="relative">
      {/* Hero */}
      <section className="section pt-32 md:pt-40">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="uppercase tracking-[0.3em] text-xs text-purple-300/70">Software Engineer</p>
              <h1 className="text-5xl md:text-7xl font-bold mt-4 leading-tight">
                <span className="neon-text">Sudhagar</span> Babuchockalingam
              </h1>
              <p className="text-purple-100/80 mt-6 max-w-xl">
                Delivering innovative full‑stack solutions across diverse requirements — with a focus on performance, resilience, and delightful user experience.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <Link href="mailto:sudhagarjb@gmail.com" className="card-gradient px-4 py-2 rounded-md glow inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Contact
                </Link>
                <Link href="https://www.linkedin.com/in/sudhagarjb" target="_blank" className="px-4 py-2 rounded-md border border-purple-500/40 hover:bg-purple-500/10 transition inline-flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </Link>
                <Link href="https://github.com/sudhagarjb" target="_blank" className="px-4 py-2 rounded-md border border-purple-500/40 hover:bg-purple-500/10 transition inline-flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-6 text-sm text-purple-200/70">
                <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4"/> +91 90803 27580</span>
                <span>Chennai, Tamil Nadu</span>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              <div className="rounded-2xl card-gradient glow p-6">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-700/30 via-purple-500/10 to-transparent border border-purple-400/20 flex items-center justify-center">
                  <Sparkles className="w-24 h-24 text-purple-300" />
                </div>
                <p className="mt-4 text-purple-200/80 text-sm">
                  Delivering innovative full‑stack solutions across diverse requirements.
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div className="flex justify-center mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <ArrowDown className="w-6 h-6 text-purple-300 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="section" id="experience">
        <div className="max-w-6xl mx-auto">
          {SECTION_TITLE("Experience", "Impactful wins across high-traffic systems")}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                role: "Senior Software Engineer I",
                company: "CaratLane - A TATA Product",
                when: "Apr 2025 – Present • Chennai",
                bullets: [
                  "Led CL Echo survey app from prototype to production, saving 40 lakhs annually.",
                  "Architected ERP migration with seamless integration.",
                  "Mentored engineers across fulfillment, finance, dispatch; improved code quality by 30%.",
                ],
              },
              {
                role: "Software Engineer II",
                company: "CaratLane - A TATA Product",
                when: "Apr 2023 – Apr 2025 • Chennai",
                bullets: [
                  "Reduced Order Fulfillment incremental sync TAT from 5m to 3.8m (24%).",
                  "Circuit breakers with Circuitbox cutting downtime by 40% during peaks.",
                  "Invoice PDF generation time down from 30s to 10s; CI/CD for services at 2M req/day.",
                ],
              },
              {
                role: "Software Engineer I",
                company: "CaratLane - A TATA Product",
                when: "Jun 2021 – Mar 2023 • Chennai",
                bullets: [
                  "Back-end APIs for invoice module, 4K+ daily transactions at 99.9% accuracy.",
                  "Integrated Clickpost for AWB; cut manual errors by 35%.",
                  "Vue.js picklist pages and query optimizations; load times from 5s to <1s.",
                ],
              },
            ].map((job, i) => (
              <motion.div
                key={job.role}
                className="rounded-xl p-6 card-gradient hover:glow transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <span className="text-xs text-purple-200/70">{job.when}</span>
                </div>
                <p className="text-purple-200/80 mt-1">{job.company}</p>
                <ul className="mt-4 space-y-2 text-sm text-purple-100/80">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-2"><Star className="w-4 h-4 text-purple-300 flex-shrink-0"/>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Learning */}
      <section className="section" id="learning">
        <div className="max-w-6xl mx-auto">
          {SECTION_TITLE("Tools & Learning", "Focused on DX, system design, observability, and cloud tooling")}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Observability", list: "Datadog, Rollbar, CloudWatch, Logs, Dashboards" },
              { title: "Cloud & Storage", list: "AWS, S3, Docker" },
              { title: "Messaging", list: "Kafka, Redis" },
              { title: "APIs", list: "GraphQL, REST, Microservices" },
              { title: "CI/CD", list: "Pipelines, Vercel, GitHub Actions" },
              { title: "Frontend DX", list: "Next.js, Animations, Framer Motion, R3F" },
            ].map((s, i) => (
              <motion.div key={s.title} className="card-gradient rounded-xl p-5" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                <h4 className="font-semibold text-purple-100">{s.title}</h4>
                <p className="text-sm text-purple-200/80 mt-2">{s.list}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects from GitHub */}
      <section className="section" id="projects">
        <div className="max-w-6xl mx-auto">
          {SECTION_TITLE("Projects", "Live from GitHub profile")}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(repos || []).map((r: GithubRepo) => (
              <motion.a
                key={r.id}
                href={r.html_url}
                target="_blank"
                className="block rounded-xl p-5 card-gradient hover:glow transition"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{r.name}</h4>
                  <span className="text-xs text-purple-200/70">★ {r.stargazers_count}</span>
                </div>
                <p className="text-sm text-purple-200/80 mt-2 line-clamp-3 min-h-[48px]">
                  {r.description || "No description"}
                </p>
                <div className="text-xs text-purple-300/70 mt-3">
                  {r.language}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section" id="achievements">
        <div className="max-w-6xl mx-auto">
          {SECTION_TITLE("Achievements & Awards")}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Won CaratLane Hackathon 2024 (1st place) – CL Echo for survey analytics.",
              "Hustler Award (Q1 2023) – managed modules and 24/7 Bridge Team support.",
              "Spot Award (Q3 2022, Q1 2023-24) – fulfillment optimization.",
              "Dazzler Award (2023-2024) – engineering excellence and innovation.",
            ].map((a, i) => (
              <motion.div key={a} className="card-gradient rounded-xl p-5" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                <p className="text-purple-100/90">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section" id="education">
        <div className="max-w-6xl mx-auto">
          {SECTION_TITLE("Education")}
          <div className="card-gradient rounded-xl p-6">
            <h4 className="font-semibold">SSN College of Engineering</h4>
            <p className="text-sm text-purple-200/80 mt-1">B.Tech, Information Technology — CGPA 8.49/10</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section pb-32" id="contact">
        <div className="max-w-6xl mx-auto">
          {SECTION_TITLE("Contact")}
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="mailto:sudhagarjb@gmail.com" className="card-gradient rounded-xl p-5 inline-flex items-center gap-3"><Mail className="w-4 h-4"/> sudhagarjb@gmail.com</Link>
            <Link href="tel:+919080327580" className="card-gradient rounded-xl p-5 inline-flex items-center gap-3"><Phone className="w-4 h-4"/> +91 90803 27580</Link>
            <Link href="https://www.linkedin.com/in/sudhagarjb" target="_blank" className="card-gradient rounded-xl p-5 inline-flex items-center gap-3"><Linkedin className="w-4 h-4"/> linkedin.com/in/sudhagarjb</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
