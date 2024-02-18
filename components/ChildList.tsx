import { getChildren } from "@/actions/activity";
import Link from "next/link";

export default async function ChildList() {
  const { data: children, error } = await getChildren();

  if (error) {
    return <p className="text-xl">Something broke :(</p>;
  }

  return (
    <div className="w-full max-w-lg px-4">
      {children?.map((child) => (
        <div key={child.id} className="flex justify-between items-center mb-4">
          <p className="text-lg">{child.first_name}</p>
          <p className="text-lg font-bold text-green-500">
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
            }).format(child.balance ?? 0)}
          </p>
        </div>
      ))}
      <div className="my-4">
        <Link href="/activity">
          <button className="bg-teal-700 w-full rounded-md px-4 py-2 text-foreground mb-2 text-white">
            Add / Remove Allowance
          </button>
        </Link>
      </div>
    </div>
  );
}
