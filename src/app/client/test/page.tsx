import CompanyCard from "@/app/_component/CompanyCard";

export default function Company() {
  return (
    <div className="flex flex-wrap gap-5">
      <CompanyCard />
      <CompanyCard />
      <CompanyCard />
      <CompanyCard />
    </div>
  );
}
