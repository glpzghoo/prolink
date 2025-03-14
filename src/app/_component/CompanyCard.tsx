import Link from "next/link";

export default function CompanyCard() {
  return (
    <div className="border border-solid max-w-4xl rounded-3xl pl-5 mx-auto">
      <p className="font-bold p-5">Веб хөгжүүлэгч ажилд авна</p>
      <p className="text-gray-400 text-sm">13 цагийн өмнө орсон зар</p>
      <div className="flex p-6 gap-6">
        {[
          { title: "2'500'000 сарын", subtitle: "Сараар" },
          { title: "анхан шатны ажилтан", subtitle: "Шаардагдах чадвар" },
        ].map(({ title, subtitle }, i) => (
          <div key={i}>
            <p>{title}</p>
            <h2 className="text-sm text-gray-400">{subtitle}</h2>
          </div>
        ))}
      </div>
      <Link href={"home"}>
        <p className="text-center line-clamp-2 text-wrap max-w-4/6">
          Бидний хөдөлмөрийн зах зээл дээр бусдаас ялгарах бас давуу тал нь
          манай ажилтнууд цалин буух өдрөө хүлээх шаардлагагүйгээр урьдчилгаагаа
          цалингаа ямар ч хүү, шимтгэлгүйгээр авах боломжтой цоо шинэ
          E-цалингийн системийг нэвтрүүлж эхэлсэн.
        </p>
      </Link>

      <div className="flex gap-4 p-4">
        {["Программ хангамж", "Англи хэл"].map((skill, i) => (
          <button
            key={i}
            className="bg-gray-300 p-2 rounded-3xl text-sm text-gray-500"
          >
            {skill}
          </button>
        ))}
      </div>
      <div className="pb-6 pl-4">
        <button className="bg-[#108a00] p-3 text-white rounded-lg">
          Дэлгэрэнгүй
        </button>
      </div>
    </div>
  );
}
