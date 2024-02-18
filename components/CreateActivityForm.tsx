import { createActivity } from "@/actions/activity";
import { Database } from "@/types/supabase";

export default async function CreateActivityForm({
  message,
  user_profiles = [],
}: {
  message?: string;
  user_profiles?:
    | Database["public"]["Views"]["children_for_logged_in_user"]["Row"][]
    | null;
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={createActivity}
      >
        <label className="text-md" htmlFor="userProfileId">
          Pick a kid
        </label>
        <select
          name="userProfileId"
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          required
        >
          {user_profiles?.map((up) => (
            <option key={up.id} value={up.id!}>
              {up.first_name}
            </option>
          ))}
        </select>
        <label className="text-md" htmlFor="name">
          Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="Chores, Reading, Spend, etc"
          required
        />
        <label className="text-md" htmlFor="description">
          Description
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="description"
          placeholder="Anything specific"
        />
        <label className="text-md" htmlFor="amount">
          Amount in Dollars
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="amount"
          placeholder=""
          type="number"
          required
        />
        <button className="bg-teal-700 rounded-md px-4 py-2 text-foreground mb-2 text-white">
          Create
        </button>
        {message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
