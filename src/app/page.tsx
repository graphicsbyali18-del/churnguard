export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">CG</div>
          <span className="text-2xl font-bold tracking-tight">ChurnGuard</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Stop Losing Members
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Automated onboarding + health scores + re-engagement for Whop communities.
          Runs by itself after a one-time setup.
        </p>
        <a
          href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
          className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition"
        >
          Start 7-Day Free Trial — $15/mo
        </a>
        <p className="text-sm text-zinc-500 mt-6">
          Built for creators who run paid communities, courses, trading groups, and memberships on Whop.
        </p>
      </div>
    </div>
  );
}