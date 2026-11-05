export type Region = "international" | "ethiopia";
export type Tone = "Formal" | "Concise" | "Warm";
export type Seniority = "Junior" | "Mid" | "Senior" | "Lead";

export interface Experience { id: string; role: string; company: string; start: string; end: string; description: string }
export interface Education { id: string; school: string; degree: string; year: string }
export interface Profile {
  name: string; email: string; phone: string; location: string; headline: string;
  summary: string; experience: Experience[]; education: Education[]; skills: string[];
  links: { linkedin: string; github: string; portfolio: string };
}
export interface Preferences {
  targetRoles: string[]; remoteOnly: boolean; locations: string[]; seniority: Seniority[];
  salaryMin: number; salaryMax: number; excludedKeywords: string[];
}
export interface Job {
  id: string; title: string; company: string; location: string; remote: boolean;
  seniority: Seniority; postedDaysAgo: number; matchScore: number; whyMatch: string;
  salary: string; applyUrl: string; description: string; requirements: string[];
}
export interface GeneratedDocuments { resume: string; coverLetter: string; answers: string }
export type TrackerStatus = "Saved" | "Prepared" | "Applied" | "Interview" | "Offer" | "Rejected";
export interface TrackerCard { jobId: string; status: TrackerStatus; notes: string; followUp: string }
export interface Plan { id: "free" | "pro" | "premium"; name: string; applications: number | "Unlimited"; features: string[] }
export type PaymentStatus = "Pending" | "Approved" | "Rejected";
export interface Payment { id: string; user: string; plan: string; amountEtb: number; reference: string; date: string; status: PaymentStatus }
