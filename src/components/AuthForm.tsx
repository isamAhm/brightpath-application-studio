import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "./GoogleButton";
import { Logo, ThemeToggle } from "./AppHeader";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const isUp = mode === "signup";
  return (
    <div className="grid min-h-screen place-items-center bg-hero px-4">
      <div className="absolute right-4 top-4"><ThemeToggle /></div>
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-elegant">
        <Logo />
        <h1 className="mt-6 text-2xl font-bold">{isUp ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{isUp ? "5 free prepared applications every month." : "Sign in to continue applying."}</p>
        <div className="mt-6"><GoogleButton label={isUp ? "Sign up with Google" : "Sign in with Google"} /></div>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" />or<div className="h-px flex-1 bg-border" /></div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate({ to: isUp ? "/onboarding" : "/jobs" }); }}>
          {isUp && <div className="space-y-1.5"><Label htmlFor="name">Full name</Label><Input id="name" required /></div>}
          <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></div>
          <div className="space-y-1.5"><Label htmlFor="pw">Password</Label><Input id="pw" type="password" required /></div>
          <Button className="w-full" type="submit">{isUp ? "Create account" : "Sign in"}</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isUp ? <>Already have an account? <Link to="/signin" className="text-primary underline">Sign in</Link></> : <>New here? <Link to="/signup" className="text-primary underline">Create an account</Link></>}
        </p>
      </div>
    </div>
  );
}
