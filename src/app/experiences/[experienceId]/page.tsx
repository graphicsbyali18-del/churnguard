export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3">Welcome to the community 👋</h1>
        <p className="text-zinc-400 mb-6">
          ChurnGuard is running behind the scenes to make sure you get the most out of your membership.
        </p>
        <p className="text-sm text-zinc-500">Experience ID: {experienceId}</p>
      </div>
    </div>
  );
}