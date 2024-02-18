import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const createActivity = async (formData: FormData) => {
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

export const getChildren = async () => {
  const supabase = createClient();

  return supabase.from("children_for_logged_in_user").select("*");
};
