import { Metadata } from "next";
import ListClient from "./ListClient";

export const metadata: Metadata = {
  title: "Freelancers | ProLink",
  description: "Freelancer listing",
};

async function getData() {
  const res = await fetch("http://localhost:3000/api/account/user/all", { cache: "no-store" });
  const json = await res.json();
  return json.data.users.filter((u: any) => !u.companyName);
}

export default async function Page({ searchParams }: { searchParams: { filter?: string } }) {
  const users = await getData();
  return <ListClient initialUsers={users} />;
}
