import Link from "next/link";
import { BrandMark } from "@/components/Brand";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div
          className="absolute inset-0 hero-band"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='0.18'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16 text-[#f4f7f5]">
          <div className="animate-rise flex items-center gap-4">
            <BrandMark size="lg" />
            <p className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-gold-soft">
              Computerized Price Checking System
            </p>
          </div>

          <h1 className="animate-rise-delay mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Hauwa Mohammed
            <span className="mt-2 block text-gold-soft">Price Checker</span>
          </h1>

          <p className="animate-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[#d7e6dd]">
            Official store prices across Hauwa Mohammed companies and shops — scan, verify, and
            manage with confidence.
          </p>

          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/check"
              className="rounded-2xl bg-gold px-6 py-3.5 text-base font-bold text-forest-deep no-underline shadow-[0_12px_30px_rgba(201,162,39,0.35)] transition hover:brightness-105"
            >
              Check a price
            </Link>
            <Link
              href="/login"
              className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-base font-semibold text-[#f4f7f5] no-underline backdrop-blur-sm transition hover:bg-white/18"
            >
              Staff sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="m-0 font-display text-3xl font-bold text-forest">Built for every level</h2>
        <p className="mt-2 max-w-2xl text-muted">
          One system for organization oversight, company operations, shop floor pricing, and public
          verification.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Organization admin",
              body: "Oversee companies, shops, and staff accounts across the Hauwa Mohammed network.",
            },
            {
              title: "Company & shop desks",
              body: "Company dashboards manage outlets. Shop managers keep catalogs and prices current.",
            },
            {
              title: "Public price check",
              body: "Customers and cashiers scan barcodes or search products for the official Naira price.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t-2 border-gold pt-4">
              <h3 className="m-0 font-display text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line px-6 py-6 text-center text-sm text-muted">
        Hauwa Mohammed Price Checker · Official store prices
      </footer>
    </div>
  );
}
