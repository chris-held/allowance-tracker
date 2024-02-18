import { getChildren } from "@/actions/activity";
import CreateActivityForm from "@/components/CreateActivityForm";

export default async function Activity({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const { data: children, error } = await getChildren();
  if (error) {
    return <p className="text-xl">Something broke :(</p>;
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <CreateActivityForm
        message={searchParams.message}
        user_profiles={children}
      />
    </div>
  );
}
