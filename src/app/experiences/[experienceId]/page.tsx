export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-lg mb-5">
          CG
        </div>
        <h1 className="text-2xl font-bold mb-3">You're all set</h1>
        <p className="text-zinc-400 mb-6 leading-relaxed">
          ChurnGuard is running in the background for this community. New members get
          automatic onboarding. Quiet members get re-engaged before they cancel.
        </p>
        <p className="text-xs text-zinc-600">Experience · {experienceId}</p>
      </div>
    </div>
  );
}