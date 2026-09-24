export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
              CG
            </div>
            <span className="font-semibold tracking-tight">ChurnGuard</span>
          </div>
          <a
            href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition"
          >
            Start free trial →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <p className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-6">
          Built for Whop creators
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Stop losing members.
          <br />
          <span className="text-emerald-400">Keep more revenue.</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ChurnGuard automatically welcomes new members, tracks who is about to
          cancel, and sends the right message before they leave — so you keep more
          of the people who already paid you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3.5 rounded-xl transition text-base"
          >
            Start 7-Day Free Trial — $15/mo
          </a>
          <p className="text-sm text-zinc-500">No credit card required for trial · Cancel anytime</p>
        </div>
      </section>

      {/* Problem */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-4">
            Your members are leaving. Most of them never say why.
          </h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
            New members join, get confused, go quiet, and cancel. You only notice when the
            payment stops. By then it is too late.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "No onboarding",
                desc: "They join and have no idea what to do next. Most never open the community again.",
              },
              {
                title: "Silent churn",
                desc: "Members go inactive for days or weeks. You only find out when they cancel.",
              },
              {
                title: "Manual follow-up",
                desc: "You cannot personally message every new and quiet member. The work never scales.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / How it works */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-4">
          How ChurnGuard works
        </h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-14">
          Set it up once. It runs automatically for every new and existing member.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Instant onboarding",
              desc: "When someone joins, they get a welcome message and a short Day 1 / Day 3 / Day 7 sequence so they feel guided instead of lost.",
            },
            {
              step: "02",
              title: "Health score",
              desc: "Every member gets a simple health score based on activity. You can see who is engaged and who is drifting away.",
            },
            {
              step: "03",
              title: "Re-engagement",
              desc: "When a score drops, ChurnGuard sends a re-engagement message before they cancel — so you get a chance to save them.",
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="text-emerald-500/30 text-4xl font-bold mb-3">{item.step}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">
            What you actually get
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              "Automatic welcome messages for every new member",
              "Day 1, Day 3 and Day 7 follow-up sequences",
              "Health score for each member (0–100)",
              "Alerts when someone is at risk of canceling",
              "Re-engagement messages before they leave",
              "Simple dashboard to see what is happening",
              "Works inside Whop — no extra logins for members",
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

      {/* Pricing CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          Simple pricing. Real results.
        </h2>
        <p className="text-zinc-400 mb-10 max-w-lg mx-auto">
          One plan. Everything included. 7 days free so you can see it work with your own members.
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
            <li>✓ Works on Whop</li>
          </ul>
          <a
            href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
            className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3.5 rounded-xl transition"
          >
            Start free trial
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800/80 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-10">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do I need technical skills?",
                a: "No. Once installed on Whop, ChurnGuard runs automatically. You do not need to write code or manage servers.",
              },
              {
                q: "Will my members notice?",
                a: "They will receive helpful welcome and follow-up messages. The goal is to make them feel supported, not spammed.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. There is a 7-day free trial and you can cancel whenever you want. No long-term lock-in.",
              },
              {
                q: "Who is this for?",
                a: "Any creator running a paid community, course, trading group, fitness program, or membership on Whop who wants to reduce cancelations.",
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
          Start the free trial today. If it does not help, cancel in one click.
        </p>
        <a
          href="https://whop.com/checkout/plan_LYJ6hLaOuBmyh"
          className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3.5 rounded-xl transition"
        >
          Start 7-Day Free Trial — $15/mo
        </a>
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