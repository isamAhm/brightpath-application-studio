import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — ApplyPilot" },
      { name: "description", content: "Sign up to ApplyPilot, your AI job application assistant." },
      { property: "og:title", content: "Sign up — ApplyPilot" },
      { property: "og:description", content: "Sign up to ApplyPilot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
