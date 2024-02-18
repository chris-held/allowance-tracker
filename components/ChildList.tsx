import { createClient } from "@/utils/supabase/server";
import { Database } from "../types/supabase";

export default async function ChildList() {
  const supabase = createClient();

  let { data: children, error } = await supabase
    .from("children_for_logged_in_user")
    .select("*");

  if (error) {
    return <p className="text-xl">Something broke :(</p>;
  }

  return (
    <div className="w-full max-w-lg px-4">
      {children?.map((child) => (
        <div key={child.id} className="flex justify-between items-center">
          <p className="text-lg">{child.first_name}</p>
          <p className="text-lg font-bold text-green-500">
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
            }).format(child.balance ?? 0)}
          </p>
        </div>
      ))}
    </div>
  );
}
