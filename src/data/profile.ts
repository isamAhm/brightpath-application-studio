import type { Preferences, Profile } from "@/types";

export const sampleProfile: Profile = {
  name: "Selam Tesfaye", email: "selam.tesfaye@example.com", phone: "+251 91 123 4567",
  location: "Addis Ababa, Ethiopia", headline: "Frontend Engineer",
  summary: "Frontend engineer with 5 years of experience building fast, accessible React applications for fintech and e-commerce teams.",
  experience: [
    { id: "e1", role: "Senior Frontend Engineer", company: "Kifiya Financial Technology", start: "2022", end: "Present", description: "Led migration of the merchant dashboard to React and TypeScript, cutting load time by 40%. Mentored 4 engineers." },
    { id: "e2", role: "Frontend Developer", company: "Gebeya", start: "2019", end: "2022", description: "Built reusable UI components and talent marketplace features used by 20k+ freelancers." },
  ],
  education: [{ id: "ed1", school: "Addis Ababa University", degree: "BSc Computer Science", year: "2019" }],
  skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Testing Library", "GraphQL", "Accessibility"],
  links: { linkedin: "linkedin.com/in/selamt", github: "github.com/selamt", portfolio: "selam.dev" },
};

export const samplePreferences: Preferences = {
  targetRoles: ["Frontend Engineer", "Full-stack Engineer"], remoteOnly: true,
  locations: ["Remote", "Addis Ababa"], seniority: ["Mid", "Senior"],
  salaryMin: 40000, salaryMax: 90000, excludedKeywords: ["PHP", "unpaid"],
};
