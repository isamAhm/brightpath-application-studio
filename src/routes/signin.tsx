import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — ApplyPilot" },
      { name: "description", content: "Sign in to ApplyPilot, your AI job application assistant." },
      { property: "og:title", content: "Sign in — ApplyPilot" },
      { property: "og:description", content: "Sign in to ApplyPilot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <AuthForm mode="signin" />,
});
