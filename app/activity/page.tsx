import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Activity({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const createActivity = async (formData: FormData) => {
    "use server";
    const supabase = createClient();

    const activity = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      amount_in_dollars: Number(formData.get("amount") as string),
      user_profile_id: formData.get("userProfileId") as string,
    };

    const { error } = await supabase
      .from("user_profile_activities")
      .insert([activity])
      .select();

    if (error) {
      return redirect("/activity?message=Unable to create activity.");
    }

    return redirect("/");
  };

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
          <option value="10f678db-6a3a-4cb3-83a1-4e35ff0f4ef3">Violet</option>
          <option value="7bbbf128-22b0-4f06-be52-3c9a19c616fd">Dottie</option>
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
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
