import type { GeneratedDocuments, Job, Profile, Tone } from "@/types";

/**
 * Single entry point for document generation. Currently returns fake text after a delay.
 * Markup convention for highlights: [[text]] = changed vs master profile, {{text}} = emphasized.
 * Swap this body for a real AI call later; keep the signature.
 */
export async function generateDocuments(profile: Profile, job: Job, tone: Tone): Promise<GeneratedDocuments> {
  await new Promise((r) => setTimeout(r, 1400));
  const opener = { Formal: "Dear Hiring Team,", Concise: "Hello,", Warm: `Hi ${job.company} team,` }[tone];
  const matched = profile.skills.filter((s) => job.requirements.some((r) => r.toLowerCase().includes(s.toLowerCase())));
  const top = matched.length ? matched : profile.skills.slice(0, 3);
  const exp = profile.experience
    .map((e) => `${e.role} — ${e.company} (${e.start}–${e.end})\n• ${e.description}\n• [[Applied ${top[0] ?? "core skills"} to deliver work directly relevant to ${job.title} responsibilities.]]`)
    .join("\n\n");

  const resume = `${profile.name}
${profile.email} · ${profile.phone} · ${profile.location}

[[${job.title} candidate]] — ${profile.headline}

SUMMARY
${profile.summary} [[Excited to bring this experience to ${job.company}, with a focus on ${top.slice(0, 2).join(" and ")}.]]

KEY SKILLS
${top.map((s) => `{{${s}}}`).join(" · ")}${profile.skills.filter((s) => !top.includes(s)).length ? " · " + profile.skills.filter((s) => !top.includes(s)).join(" · ") : ""}

EXPERIENCE
${exp}

EDUCATION
${profile.education.map((e) => `${e.degree}, ${e.school} (${e.year})`).join("\n")}`;

  const body = {
    Formal: `I am writing to apply for the ${job.title} position at ${job.company}. With ${profile.experience.length * 2 + 1} years of relevant experience, I believe my background in {{${top.join(", ")}}} aligns closely with your requirements.`,
    Concise: `I'd like to apply for the ${job.title} role. My strengths: {{${top.join(", ")}}}.`,
    Warm: `I've followed ${job.company}'s work for a while, and the ${job.title} role feels like a natural next step for me. I love working with {{${top.join(", ")}}}.`,
  }[tone];

  const coverLetter = `${opener}

${body}

[[In my current role at ${profile.experience[0]?.company ?? "my company"}, ${profile.experience[0]?.description.charAt(0).toLowerCase()}${profile.experience[0]?.description.slice(1) ?? ""}]] I'd bring the same ownership to ${job.company}.

[[I'm particularly drawn to ${job.description.split(".")[0].toLowerCase()}.]]

Thank you for your consideration.

${tone === "Warm" ? "Warmly" : "Best regards"},
${profile.name}`;

  const answers = `Why do you want to work at ${job.company}?
[[${job.company}'s mission and the scope of this ${job.title} role match where I want to grow next.]]

What relevant experience do you have?
${profile.experience[0]?.role} at ${profile.experience[0]?.company}: {{${profile.experience[0]?.description}}}

Are you open to ${job.remote ? "remote work across time zones" : `working from ${job.location}`}?
[[Yes. I have collaborated with distributed teams and am comfortable with async communication.]]

Expected salary?
${job.salary}, flexible depending on the full package.`;

  return { resume, coverLetter, answers };
}

export const stripMarkup = (s: string) => s.replace(/\[\[|\]\]|\{\{|\}\}/g, "");
