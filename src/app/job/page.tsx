import { Metadata } from "next";
import ListClient from "./ListClient";
import { CustomJob } from "./[id]/page";

export const metadata: Metadata = {
  title: "Jobs | ProLink",
  description: "Job listings",
};

async function getData(): Promise<CustomJob[]> {
  const res = await fetch("http://localhost:3000/api/job/allposts", { cache: "no-store" });
  const json = await res.json();
  return json.data.posts;
}

export default async function Page() {
  const posts = await getData();
  return <ListClient initialPosts={posts} />;
}
