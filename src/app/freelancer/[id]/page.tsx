"use client";
import Loading from "@/app/_component/loading";
import { review, skill, user } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type CustomUser = user & {
  skill: skill[];
  reviewee: review[];
  reviewer: review[];
};
export default function Client() {
  const [user, setUser] = useState<CustomUser>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`/api/account/user?id=${id}`);
        const res2 = await axios.post(`/api/account/profileViews?id=${id}`);
        setUser(res1.data.data.user);
        setLoading(false);
      } catch (err) {
        console.error(err, "Сервертэй холбогдож чадсангүй!");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const avgRating = (): number => {
    if (!user?.reviewer || user.reviewee.length === 0) return 0;

    const total = user.reviewee.reduce((prev, acc) => prev + acc.rating, 0);
    return total / user.reviewee.length;
  };
  const copyURL = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => console.log("URL copied!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <>
      {/* Үндсэн Background */}
      {loading ? (
        <Loading />
      ) : user ? (
        <div className="bg-gray-100 min-h-screen">
          {/* Цагаан блок (main container) */}
          <div className="max-w-screen-lg mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-background">
            {/* Дээд хэсэг */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {/* Профайл зураг */}
                {user.pfp ? (
                  <Image src={`${user.pfp}`} width={56} height={56} alt="pfp" />
                ) : (
                  <img
                    src="images.jpeg"
                    alt="Profile"
                    className="rounded-full w-14 h-14 object-cover"
                  />
                )}

                <div>
                  {/* Нэр, Байршил */}
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-semibold">
                      {user.firstName}, {user.lastName}
                    </h1>
                    {/* Badge жишээ */}
                    <span className="px-2 py-1 text-xs text-white bg-green-600 rounded-full">
                      Шилдэг үнэлгээтэй
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {user.skill.length} мэргэжилтэй
                  </p>
                </div>
              </div>

              {/* Хуваалцах товч */}
              <button
                onClick={copyURL}
                className="text-gray-600 hover:text-gray-800 text-sm border cursor-pointer border-gray-300 rounded px-3 py-2"
              >
                Хуваалцах
              </button>
            </div>
            {/* /Дээд хэсэг */}

            {/* Профайл харах, статистик */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-3">
                {/* Шаардлагатай бол нэмэлт значок, тэмдэглэгээ оруулж болно */}
              </div>
              {/* Статистик */}
              <div className="mt-2 md:mt-0 flex items-center space-x-4 text-sm text-gray-500">
                <div>
                  Энэ хүний profile -ыг нийт {user.profileViews} хүн харсан
                  байна!
                </div>
                <div>-</div>
                <div>{user.reviewee.length} удаа үнэлгээ авсан байна.</div>
                <div>-</div>
                <div>Дундаж үнэлгээ: {avgRating()}/100</div>
              </div>
            </div>
            {/* /Профайл харах, статистик */}

            {/* Ажилд авах уриалга (Ready to Work) */}
            <div className="bg-green-50 border border-green-300 rounded mt-4 p-4 flex flex-col md:flex-row items-start md:items-center md:justify-between">
              <div className="mb-2 md:mb-0">
                <p className="font-semibold text-green-800">
                  {user.firstName} -тэй хамтран ажиллахад бэлэн үү?
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                  Ажилд урь
                </button>
              </div>
            </div>
            {/* /Ажилд авах уриалга */}

            {/* Профайл ерөнхий мэдээлэл */}
            <div className="mt-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{user.skill[0].name}</h2>
                <p className="text-gray-600 text-sm">
                  {user.salary}/{user.salaryType === "ONETIME" ? `цаг` : `сар`}
                </p>
              </div>
              <p className="text-gray-700 mt-2">{user.about}</p>

              {/* Ашигладаг технологиуд */}
              {/* <div className="mt-4">
                <h3 className="font-semibold text-md">
                  Ашигладаг технологиуд:
                </h3>
                <ul className="list-disc list-inside text-gray-700 mt-1">
                  <li>Java, Kotlin, Spring, Hibernate</li>
                  <li>Maven, Git, Jenkins</li>
                  <li>MySQL, MongoDB, AWS DynamoDB</li>
                  <li>Amazon Web Services</li>
                </ul>
              </div> */}
            </div>
            {/* /Профайл ерөнхий мэдээлэл */}

            {/* Үнэлгээ (жишээ) */}
            <div className="mt-4 border-b pb-4">
              <h3 className="font-semibold text-md">Үнэлгээ</h3>
              <div className="mt-2">
                {/* Үнэлгээний зурвасын жишээ (placeholder) */}
                {user.reviewer.length > 0 ? (
                  <Image
                    width={40}
                    height={40}
                    src="https://res.cloudinary.com/de1g2bwml/image/upload/v1741700987/31747695_s4k6_pdjv_220810_gfnpo2.jpg"
                    alt="Үнэлгээний зурвас"
                  />
                ) : (
                  <div>Үнэлгээ одоогоор алга байна!</div>
                )}
              </div>
            </div>

            {/* Ажлын түүх */}
            {/* <div className="mt-4 pb-4 border-b">
              <h3 className="font-semibold text-md mb-1">Ажлын түүх</h3>
              <p className="text-gray-700 text-sm">
                Дууссан ажлууд (9) | Явагдаж буй ажлууд (1)
              </p>
            </div> */}

            {/* Ур чадвар */}
            <div className="mt-4 pb-4 border-b">
              <h3 className="font-semibold text-md mb-2">Ур чадвар</h3>
              <div className="flex flex-wrap gap-2">
                {user.skill &&
                  user.skill.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>

            {/* Доод линкүүдийн хэсэг */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              {/* 1-р багана: Бусад чадварлаг хүмүүсийг хайх */}
              <div>
                <h4 className="font-semibold mb-2">
                  Бусад чадварлаг хүмүүсийг хайх
                </h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="hover:underline">
                      Өгүүлэл & Блог бичигчид
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Гар утасны апп хөгжүүлэгчид
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Android апп хөгжүүлэх үйлчилгээ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Android систем хөгжүүлэгчид
                    </a>
                  </li>
                </ul>
              </div>

              {/* 2-р багана: Төстэй фрилансеруудыг үзэх */}
              <div>
                <h4 className="font-semibold mb-2">
                  Төстэй фрилансеруудыг үзэх
                </h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="hover:underline">
                      Amazon KDP хөгжүүлэгчид
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Ном & eBook-ийн нүүрний дизайн үйлчилгээ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Лого зохиох үйлчилгээ
                    </a>
                  </li>
                </ul>
              </div>

              {/* 3-р багана: Холбогдох төслүүдийг үзэж худалдан авах */}
              <div>
                <h4 className="font-semibold mb-2">
                  Холбогдох төслүүдийг үзэж худалдан авах
                </h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="hover:underline">
                      Android & iOS апп хөгжүүлэх үйлчилгээ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Бизнес болон брэндийн бусад дизайн үйлчилгээ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Доод линкүүдийн хэсэг */}
          </div>
        </div>
      ) : (
        <div>user not found!</div>
      )}
    </>
  );
}
