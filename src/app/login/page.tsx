"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/Brand";
import { Field, inputClass, Panel, primaryBtn } from "@/components/Dashboard";
import { useAuth } from "@/context/AppProviders";
import { dashboardPath } from "@/lib/format";

const demos = [
  { label: "Organization Admin", email: "org@hauwa.ng", password: "admin123" },
  { label: "Company Admin", email: "company@hauwa.ng", password: "company123" },
  { label: "Shop Manager", email: "shop@hauwa.ng", password: "shop123" },
];

export default function LoginPage() {
  const { user, ready, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("org@hauwa.ng");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) router.replace(dashboardPath(user.role));
  }, [ready, user, router]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center gap-6 px-4 py-10">
      <BrandLockup />
      <Panel className="animate-rise">
        <h1 className="m-0 font-display text-3xl font-bold text-forest">Staff sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Access organization, company, or shop dashboards for Hauwa Mohammed Price Checker.
        </p>

        <form
          className="mt-5 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const result = login(email, password);
            if (!result.ok) {
              setError(result.error);
              return;
            }
            setError("");
          }}
        >
          <Field label="Email">
            <input
              type="email"
              required
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              required
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {error && <p className="m-0 text-sm text-danger">{error}</p>}
          <button type="submit" className={primaryBtn}>
            Sign in
          </button>
        </form>

        <div className="mt-6 border-t border-line pt-4">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
            Demo accounts
          </p>
          <div className="mt-3 grid gap-2">
            {demos.map((d) => (
              <button
                key={d.email}
                type="button"
                className="cursor-pointer rounded-xl border border-line bg-paper px-3 py-2.5 text-left text-sm transition hover:bg-paper-2"
                onClick={() => {
                  setEmail(d.email);
                  setPassword(d.password);
                  setError("");
                }}
              >
                <span className="font-semibold text-ink">{d.label}</span>
                <span className="mt-0.5 block text-xs text-muted">
                  {d.email} · {d.password}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Panel>
      <p className="text-center text-sm text-muted">
        Need the public tool?{" "}
        <Link href="/check" className="font-semibold text-forest">
          Open price checker
        </Link>
      </p>
    </div>
  );
}
