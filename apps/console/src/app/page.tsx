import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/server-session";

export default async function Home() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  if (!session.session?.activeOrganizationId) {
    redirect("/orgs");
  }
  redirect("/dashboard");
}
