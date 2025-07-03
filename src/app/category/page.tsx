export default function Category() {
  return (
    <div>
      <div className=" flex justify-center items-center p-8">
        <div className="max-w-[1200px] flex justify-center items-center p-8 gap-4">
          <div className="flex flex-col w-[50%] p-2">
            <div className="font-bold text-4xl p-7">
              Танай байгууллагыг өргөжүүлэн хөгжүүлэгч болон мэдээллийн технологийн мэргэжилтнүүд.
            </div>
            <div className="p-6 flex flex-col gap-3">
              Хөгжүүлэлтийн хугацааг богиносгож, бүтээгдэхүүний өсөлтийг хурдасгахын тулд бие даасан
              мэргэжилтнүүдийг хөлслөөрэй.
              <button className="bg-green-600 p-4 rounded-md text-white">Бүртгүүлэх</button>
            </div>
          </div>
          <div className="w-[50%]">
            <img src="dev.png" alt="" className="w-120 h-90" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-12 p-4">
        <p>Trusted by</p>
        <p>Microsoft</p>
        <p>airbnb</p>
        <p>automattic</p>
        <p>Bissell</p>
        <p>CLOUDCLARE</p>
      </div>
      <div className="bg-gray-200 px-auto py-auto gap-4 p-4 flex justify-center">
        <div className="p-4">
          <p className="font-bold text-4xl mb-8">
            Алсын зайны итгэлтэй хөгжүүлэлт болон IT мэргэжилтнүүд
          </p>
          <div className="flex gap-6">
            <div className="border-r">
              <p className="font-bold text-2xl">4.91</p>
              <p>Технологийн авъяастнуудын дундаж үнэлгээ.</p>
            </div>
            <div>
              <p className="font-bold text-2xl">211K+ гэрээ</p>
              <p>Өнгөрсөн жил хөгжүүлэлт, IT-тэй холбоотой хийгдсэн гэрээнүүд.</p>
            </div>
            <div>
              <p className="font-bold text-2xl">1,665 ур чадвар</p>
              <p> ProLink платформ дээр бүртгэгдсэн.</p>
            </div>
          </div>
          <div>{/* <ClientCard /> */}</div>
        </div>
      </div>
      <div>
        {' '}
        <section className="bg-white py-10 px-4 md:px-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Хөгжүүлэлт ба IT чиглэлийн хамгийн чухал төслүүд
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ul className="space-y-4 p-8 text-2xl">
              <li className="text-gray-700"> Mobile App Development</li>
              <li className="text-gray-700"> Shopify Development</li>
              <li className="text-gray-700"> WordPress Development</li>
              <li className="text-gray-700"> Data Visualization</li>
              <li className="text-gray-700"> Machine Learning</li>
              <li className="text-gray-700"> Cybersecurity & Data Protection</li>
            </ul>
            <img src="div.png" alt="Mobile Development" className="rounded-lg shadow-lg" />
          </div>
        </section>
      </div>

      <div className=" min-h-screen p-6">
        <div className="bg-black text-white p-8 rounded-lg flex justify-between items-center">
          <div className="w-1/2">
            <div>Enterprice Suite</div>
            <h1 className="text-3xl font-bold">Одоо IT мэргэжилтнүүд ингэж ажиллаж байна</h1>
            <p className="mt-2 text-gray-300">
              Бизнесийн хурдаас илүү хурдан хөдлөх уян хатан ажиллах хүчийг бий болгоорой.
            </p>
            <button className="bg-green-500 text-black px-4 py-2 rounded-lg mt-4">
              Илүү ихийг мэдэх
            </button>
          </div>
          <div className="w-1/2">
            <img src="ITimage.png" alt="IT Experts" />
          </div>
        </div>
        <div className="mt-10 flex justify-between items-center p-4">
          <div className="w-1/2">
            <h2 className="text-4xl font-bold text-black">
              Гар тань хүрэх төдийд хөгжүүлэгч мэргэжилтнүүд
            </h2>
            <p className="mt-4 text-gray-600">
              iOS/Android хөгжүүлэгч нь үйлчлүүлэгчийнхээ мөнгө, цаг хугацаа, стрессийг хэмнэв
            </p>
            <p className="text-gray-500 mt-2">
              "Igor гар утасны апп хөгжүүлэлтийн өндөр мэдлэгтэй бөгөөд үргэлж илүү хэмнэлттэй, үр
              дүнтэй шийдэл санал болгодог."
            </p>
            <div className="mt-4 flex gap-2 items-center">
              <span className="text-2xl">⭐⭐⭐⭐⭐ 5.0</span>
              <span className="text-gray-700 text-lg font-semibold">Төсвийн хэмжээ: $14,520</span>
            </div>
            <div className="mt-4 flex gap-3">
              <p className="font-bold text-lg">Ур чадвар:</p>
              <span className="bg-gray-200 px-3 py-1 rounded-full">Sketch</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">Swift</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">iOS Development</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">Cocoa</span>
            </div>
          </div>
          <div className="w-1/2">
            <img src="AppPreview.png" alt="Mobile App Preview" />
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <div className="w-1/2">
            <img src="Study.png" alt="" />
          </div>
          <div className="w-1/2 p-4 gap-4">
            <h3 className="text-4xl font-semibold">
              PGA of America шинэ санааг туршихдаа бие даасан хөгжүүлэгчдийг ашиглаж байна
            </h3>
            <p className="text-gray-600 mt-2">
              Upwork makes it easy for PGA of America to find devs with in-demand skills such as
              AWS, CSS, and ReactJS. When the team has a new idea, independent devs test proof of
              concept while the team remains focused on higher-value projects. “When employees
              aren’t limited by internal skill sets and resources, they can leverage their time to
              create bigger improvements and change,” said Head of Technology Kevin Scott.
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">
              Read case study
            </button>
          </div>
        </div>
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md flex">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold p-4">Түгээмэл асуултууд</h2>
          </div>
          <div className="w-1/2">
            <div className="border-b-2 p-4 ">
              <p className="font-semibold text-2xl gap-4">
                What is the first step to hiring development and IT talent and determining the
                project cost?
              </p>
              <p className="mt-2">
                One of the first steps in hiring any talent is to determine which skills you need
                for your project. Upwork matches you with proven remote talent who can help you with
                all your development and IT needs, including:
              </p>
            </div>
            <div className="border-b-2 p-4">
              <p className="font-semibold text-2xl">
                What are the various ways I can connect with development and IT talent through
                Upwork?
              </p>
              <p className="mt-2">
                Upwork gives you the flexibility you need to find the right talent for your
                development and IT projects.
              </p>
            </div>
            <div className="border-b-2 p-4">
              <p className="font-semibold text-2xl">
                Why should I use Upwork to find talent for development and IT services?
              </p>
              <p className="mt-2">
                When it comes to development and IT, you may need a multidisciplinary team to handle
                the various components of your project. Examples of professionals you might need for
                development and IT projects include:
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
