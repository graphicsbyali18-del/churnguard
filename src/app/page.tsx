export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800/80 sticky top-0 z-50 bg-zinc-950/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
              CG
            </div>
            <span className="font-semibold tracking-tight">ChurnGuard</span>
          </div>
          <a
            href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
            className="text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-lg transition"
          >
            Start free trial
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-12 text-center">
        <p className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-6">
          Built exclusively for Whop creators
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Stop losing members.
          <br />
          <span className="text-emerald-400">Keep more of the revenue</span>
          <br />
          you already earned.
        </h1>
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Most paid communities lose members in the first 7–14 days because no one guides them.
          ChurnGuard automatically onboards every new member and re-engages the ones going quiet —
          before they cancel.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
          <a
            href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3.5 rounded-xl transition text-base"
          >
            Start 7-Day Free Trial — $15/mo
          </a>
        </div>
        <p className="text-sm text-zinc-500">
          No credit card required for trial · Cancel in one click · Works inside Whop
        </p>
      </section>

      {/* Product mockup */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-zinc-700/80 bg-zinc-900/80 overflow-hidden shadow-2xl shadow-emerald-500/5">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950/80">
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <span className="ml-3 text-xs text-zinc-500">ChurnGuard Dashboard</span>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                CG
              </div>
              <div>
                <p className="font-semibold">ChurnGuard</p>
                <p className="text-xs text-zinc-500">Automated onboarding & retention</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Members tracked", value: "248" },
                { label: "Active now", value: "191" },
                { label: "Avg health score", value: "74" },
                { label: "Onboarding", value: "ON" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-4"
                >
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                    {s.label}
                  </p>
                  <p
                    className={`text-xl font-semibold ${
                      s.value === "ON" ? "text-emerald-400" : ""
                    }`}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <p className="text-xs text-zinc-500 mb-3">Default onboarding sequence</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3 items-center">
                  <span className="text-emerald-400 text-xs font-medium w-10">Now</span>
                  <span className="text-zinc-300">Welcome message sent</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-emerald-400 text-xs font-medium w-10">+24h</span>
                  <span className="text-zinc-300">Day 1 tip + introduce yourself</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-emerald-400 text-xs font-medium w-10">+72h</span>
                  <span className="text-zinc-300">Check-in: how is everything going?</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-emerald-400 text-xs font-medium w-10">+7d</span>
                  <span className="text-zinc-300">Week 1 feedback request</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-zinc-500 mt-4">
          Example dashboard — real numbers appear after you connect your community
        </p>
      </section>

      {/* Who it's for */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-3">
            Built for creators who run paid communities on Whop
          </h2>
          <p className="text-zinc-400 text-center max-w-xl mx-auto mb-10">
            If you sell monthly access and members keep canceling in the first weeks, this is for you.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Trading / signal groups",
              "Courses & cohorts",
              "Fitness & coaching",
              "Discord / chat communities",
              "Newsletter memberships",
              "Software or tool access",
              "Masterminds",
              "Any monthly Whop product",
            ].map((item) => (
              <div
                key={item}
                className="bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 text-center"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-4">
          Why members leave (and you only notice too late)
        </h2>
        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
          New members join excited, get lost, go silent, and cancel. You find out when the payment stops.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "No clear first steps",
              desc: "They join and have no idea what to do. Most never open the community again.",
            },
            {
              title: "Silent inactivity",
              desc: "Members go quiet for days or weeks. You only discover it when they cancel.",
            },
            {
              title: "You can't message everyone",
              desc: "Personal follow-up does not scale. The members who need help the most get none.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-4">
            How ChurnGuard works
          </h2>
          <p className="text-zinc-400 text-center max-w-xl mx-auto mb-12">
            Set it up once. It runs automatically for every member.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Instant onboarding",
                desc: "When someone joins, they get a welcome message plus Day 1, Day 3 and Day 7 follow-ups so they feel guided instead of lost.",
              },
              {
                step: "02",
                title: "Health score",
                desc: "Every member gets a score from 0–100 based on activity. You can see who is engaged and who is drifting away.",
              },
              {
                step: "03",
                title: "Re-engagement",
                desc: "When a score drops, ChurnGuard sends a re-engagement message before they cancel — so you get a chance to save them.",
              },
            ].map((item) => (
              <div key={item.step}>
                <div className="text-emerald-500/40 text-4xl font-bold mb-3">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-4">
          What changes when you use it
        </h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-12">
          The goal is simple: fewer early cancelations and more members who stick around long enough to get value.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            {
              title: "Fewer day-1 drop-offs",
              desc: "New members get guided from the first message instead of being left alone.",
            },
            {
              title: "Catch quiet members early",
              desc: "Health scores surface people going inactive before they hit cancel.",
            },
            {
              title: "Less manual work",
              desc: "You stop chasing every new join and every silent member yourself.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 text-center"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10">
            Everything included
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "Automatic welcome for every new member",
              "Day 1, Day 3 and Day 7 sequences",
              "Health score for each member (0–100)",
              "Alerts when someone is at risk",
              "Re-engagement messages before cancel",
              "Simple creator dashboard",
              "Works inside Whop — no extra logins",
              "Runs by itself after one-time setup",
            ].map((text) => (
              <div key={text} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                  ✓
                </span>
                <span className="text-zinc-300 text-sm sm:text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Simple pricing
        </h2>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">
          One plan. Everything included. Try it free for 7 days on your real members.
        </p>
        <div className="inline-block bg-zinc-900 border border-zinc-700 rounded-2xl p-8 sm:p-10 text-left max-w-sm w-full">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl font-bold">$15</span>
            <span className="text-zinc-400">/month</span>
          </div>
          <p className="text-sm text-emerald-400 mb-6">7-day free trial · Cancel anytime</p>
          <ul className="space-y-2.5 mb-8 text-sm text-zinc-300">
            <li>✓ Unlimited members</li>
            <li>✓ Full onboarding sequences</li>
            <li>✓ Health scores + re-engagement</li>
            <li>✓ Creator dashboard</li>
            <li>✓ Built for Whop</li>
          </ul>
          <a
            href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
            className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3.5 rounded-xl transition"
          >
            Start free trial
          </a>
          <p className="text-xs text-zinc-500 text-center mt-4">
            If it does not help, cancel before the trial ends. No charge.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800/80 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-10">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do I need technical skills?",
                a: "No. Once connected on Whop, ChurnGuard runs automatically. You do not write code or manage servers.",
              },
              {
                q: "Will my members feel spammed?",
                a: "Messages are short and helpful (welcome + a few check-ins). The goal is support, not noise. You control the sequences.",
              },
              {
                q: "What if it does not work for me?",
                a: "Use the 7-day free trial. If you do not see value, cancel before it ends and you pay nothing.",
              },
              {
                q: "Who is this for?",
                a: "Any creator running a paid community, course, trading group, fitness program, or membership on Whop who wants fewer early cancelations.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold mb-1.5">{item.q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          Keep more of the members who already paid you
        </h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Start the free trial. Run it on your real community. Cancel in one click if it is not useful.
        </p>
        <a
          href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
          className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3.5 rounded-xl transition"
        >
          Start 7-Day Free Trial — $15/mo
        </a>
        <p className="text-xs text-zinc-500 mt-4">No credit card required for trial</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
              CG
            </div>
            <span>ChurnGuard</span>
          </div>
          <p>Automated retention for Whop communities</p>
        </div>
      </footer>
    </div>
  );
}