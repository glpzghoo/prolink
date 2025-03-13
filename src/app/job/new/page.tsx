"use client";

export default function Client() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Цагаан блок (main container) */}
      <div className="max-w-screen-lg mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-background">
        {/* Дээд хэсэг */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {/* Профайл зураг */}

            <div>{/* Нэр, Байршил */}</div>
            {/* <p className="text-gray-600 text-sm">
                    {user.skill.length} мэргэжилтэй
                  </p> */}
          </div>
        </div>

        {/* Хуваалцах товч */}
        <div className="flex gap-1">
          <button className="text-gray-600 hover:text-gray-800 text-sm border cursor-pointer border-gray-300 rounded px-3 py-2">
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
          <div className="mt-2 md:mt-0 flex items-center space-x-4 text-sm text-gray-500"></div>
        </div>
        {/* /Профайл харах, статистик */}

        {/* Ажилд авах уриалга (Ready to Work) */}
        <div className="bg-green-50 border border-green-300 rounded mt-4 p-4 flex flex-col md:flex-row items-start md:items-center md:justify-between">
          <div className="mb-2 md:mb-0"></div>
        </div>
        {/* /Ажилд авах уриалга */}

        {/* Профайл ерөнхий мэдээлэл */}
        <div className="mt-6 pb-4 border-b">
          <div className="border-b border-t py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#129600]">
                Манай байгууллагын тухай
              </h2>
              {/* <p className="text-gray-600 text-sm">
                    {user.salary}/{user.salaryType === "HOUR" ? `цаг` : `сар`}
                  </p> */}
            </div>
          </div>
          <div className="mt-4">
            <div>end job posts??</div>
          </div>
        </div>
        {/* /Профайл ерөнхий мэдээлэл

            {/* Үнэлгээ (жишээ) */}
        <div className="mt-4 border-b pb-4">
          <h3 className="font-semibold text-md">Үнэлгээ</h3>
          <div className="mt-2 flex gap-3 whitespace-nowrap overflow-scroll">
            {/* Үнэлгээний зурвасын жишээ (placeholder) */}
          </div>
        </div>

        <div>
          <div>Үнэлгээ өгөх</div>
          <div></div>
          <div></div>
          <div className="flex items-center gap-2"></div>
        </div>

        {/* Ур чадвар */}
        <div className="mt-4 pb-4 border-b">
          <h3 className="font-semibold text-md mb-2">Нээлттэй ажлын байр</h3>
          <div className="flex flex-wrap gap-2"></div>
        </div>

        {/* Доод линкүүдийн хэсэг */}

        {/* 1-р багана: Бусад чадварлаг хүмүүсийг хайх */}
        <div className="w-full">
          <div className=" flex gap-14 whitespace-nowrap overflow-scroll"></div>
        </div>
        {/* /Доод линкүүдийн хэсэг */}
      </div>
    </div>
  );
}
