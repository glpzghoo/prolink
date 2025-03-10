import { CiLocationOn } from "react-icons/ci";
import { RxShare2 } from "react-icons/rx";
export default function Client() {
  return (
    <>
      {/* Үндсэн Background */}
      <div className="bg-gray-100 min-h-screen">
        {/* Цагаан блок (main container) */}
        <div className="max-w-screen-lg mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-white">
          {/* Дээд хэсэг */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {/* Профайл зураг */}
              <img
                src="images.jpeg"
                alt="Profile"
                className="rounded-full w-14 h-14 object-cover"
              />
              <div>
                {/* Нэр, Байршил */}
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-semibold">Andriy S.</h1>
                  {/* Badge жишээ */}
                  <span className="px-2 py-1 text-xs text-white bg-green-600 rounded-full">
                    Шилдэг үнэлгээтэй
                  </span>
                </div>
                <p className="text-gray-600 text-sm">Харьков, Украин</p>
              </div>
            </div>

            {/* Хуваалцах товч */}
            <button className="text-gray-600 hover:text-gray-800 text-sm border border-gray-300 rounded px-3 py-2">
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
              <div>Нийт ажлын зар: 10</div>
              <div>Авсан хүний тоо: 4/74</div>
              <div>Үнэлгээ: 4.7/5</div>
              <div>7 хоногт ажиллах цаг: 10</div>
            </div>
          </div>
          {/* /Профайл харах, статистик */}

          {/* Ажилд авах уриалга (Ready to Work) */}
          <div className="bg-green-50 border border-green-300 rounded mt-4 p-4 flex flex-col md:flex-row items-start md:items-center md:justify-between">
            <div className="mb-2 md:mb-0">
              <p className="font-semibold text-green-800">
                Andriy S.-тэй хамтран ажиллахад бэлэн үү?
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                Ажилд урь
              </button>
            </div>
          </div>
          {/* /Ажилд авах уриалга */}

          {/* Профайл ерөнхий мэдээлэл */}
          <div className="mt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Back-End хөгжүүлэгч</h2>
              <p className="text-gray-600 text-sm">40.00$/цаг</p>
            </div>
            <p className="text-gray-700 mt-2">
              Орчин үеийн технологи ашиглан шинэлэг, үр дүнтэй шийдлүүдийг
              бүтээдэг туршлагатай back-end хөгжүүлэгч. Микросервис, SQL болон
              NoSQL мэдээллийн сан, үүлэн технологи, тасралтгүй интеграцчлалын
              чиглэлээр ажиллаж байсан туршлагатай.
            </p>

            {/* Ашигладаг технологиуд */}
            <div className="mt-4">
              <h3 className="font-semibold text-md">Ашигладаг технологиуд:</h3>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                <li>Java, Kotlin, Spring, Hibernate</li>
                <li>Maven, Git, Jenkins</li>
                <li>MySQL, MongoDB, AWS DynamoDB</li>
                <li>Amazon Web Services</li>
              </ul>
            </div>
          </div>
          {/* /Профайл ерөнхий мэдээлэл */}

          {/* Үнэлгээ (жишээ) */}
          <div className="mt-4 border-b pb-4">
            <h3 className="font-semibold text-md">Үнэлгээ</h3>
            <div className="mt-2">
              {/* Үнэлгээний зурвасын жишээ (placeholder) */}
              <img
                src="https://via.placeholder.com/158x24"
                alt="Үнэлгээний зурвас"
              />
            </div>
          </div>

          {/* Ажлын түүх */}
          <div className="mt-4 pb-4 border-b">
            <h3 className="font-semibold text-md mb-1">Ажлын түүх</h3>
            <p className="text-gray-700 text-sm">
              Дууссан ажлууд (9) | Явагдаж буй ажлууд (1)
            </p>
          </div>

          {/* Ур чадвар */}
          <div className="mt-4 pb-4 border-b">
            <h3 className="font-semibold text-md mb-2">Ур чадвар</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Java
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Kotlin
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Spring
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Node.js
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                TypeScript
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                MongoDB
              </span>
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
              <h4 className="font-semibold mb-2">Төстэй фрилансеруудыг үзэх</h4>
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
    </>
  );
}
