'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const mobileImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileImgRef.current) {
      gsap.fromTo(
        mobileImgRef.current,
        { rotateX: -90, opacity: 0, transformPerspective: 1000 },
        { rotateX: 0, opacity: 1, duration: 2, ease: 'power2.out' }
      );
    }
  }, []);
  return (
    <div>
      <div
        ref={mobileImgRef}
        className="max-w-[1280px]  w-full min-h-[548px] my-20 mx-auto flex flex-col lg:flex-row items-center justify-between border rounded-2xl p-3"
      >
        <div className=" lg:hidden w-full flex justify-center">
          <img
            alt="Connecting people"
            src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/uma-hero/image-mobile.png"
            loading="lazy"
            className="w-[90%] max-w-[400px]"
          />
        </div>

        <div className="hidden lg:block">
          <img
            alt="Connecting people"
            src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/uma-hero/image-left.png"
            loading="lazy"
            className="w-[177px] h-[500px] object-cover"
          />
        </div>

        <div className="relative text-center lg:text-left">
          <h1 className="text-[36px] lg:text-[46px] leading-tight lg:leading-[58px] w-[90%] lg:w-[600px] mx-auto font-bold text-center">
            Бид хүмүүсийг хооронд нь холбож, бүтээлч байдлыг цэцэглүүлдэг
          </h1>
          <h4 className="w-[90%] lg:w-[400px] font-bold text-[#181818] my-6 mx-auto text-center">
            Шинэ эрин үеийн ажиллах хэв маяг, ажлын зах зээлд чөлөөтэй нэгд
          </h4>

          <div className="text-center mx-auto mt-8 lg:mt-[45%] w-full lg:w-[20vw]">
            <h4 className="text-sm font-semibold uppercase text-foreground">TRUSTED BY</h4>
            <div className="flex justify-center gap-6 mt-2">
              <figure>
                <img
                  data-qa="microsoft"
                  src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_fit/brontes/uma-hero/logo-microsoft-grey.svg"
                  alt="Microsoft"
                />
              </figure>
              <figure>
                <img
                  data-qa="airbnb"
                  src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_fit/brontes/uma-hero/logo-airbnb-grey.svg"
                  alt="Airbnb"
                />
              </figure>
              <figure>
                <img
                  data-qa="bissell"
                  src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_fit/brontes/uma-hero/logo-bissell-grey.svg"
                  alt="Bissell"
                />
              </figure>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <img
            alt="Connecting people"
            src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/uma-hero/image-right.png"
            className="w-[177px] h-[500px] object-cover"
          />
        </div>
      </div>

      <div className="max-w-[1280px] w-full mx-auto mb-20  p-6 md:p-10 rounded-2xl flex flex-col lg:flex-row items-center shadow-lg">
        <img src="./mainPageJoin.png" className="w-full lg:w-1/2 max-w-[500px] lg:max-w-none" />

        <div className="w-full lg:w-1/2 lg:pl-10 mt-6 lg:mt-0 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">Маш хялбараар ажлын үр дүнгээ дээшлүүл</h2>

          <div className="mt-6 space-y-4">
            {[
              {
                title: 'Та үнэ төлбөргүй нэгдээрэй.',
                description:
                  'Бүртгүүлж нэвтэрснээр мэргэжилтнүүдийн профайлыг үзэх, төслүүдийг судлах, эсвэл зөвлөгөө авах боломжтой.',
              },
              {
                title: 'Ажлын байрны зар тавьж, шилдэг мэргэжилтнүүдийг ажилд ав.',
                description: 'Талент хайх нь маш амархан. Та ажлын зараа оруулаахад л хангалттай',
              },
              {
                title: 'Санхүүгийн хүндрэлгүйгээр хамгийн сайн мэргэжилтнүүдтэй ажилла',
                description: 'Өөрийн төсөлдөө хамгийн тохиромжтой гүйцэтгэгчийг сонгоорой.',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href={'/account'}>
              <button className=" text-background px-6 py-3 rounded-lg font-semibold w-full sm:w-auto">
                Бүртгүүлэх
              </button>
            </Link>
            <Link href={'/account'}>
              <button className="border-2 border-green-600 text-foreground px-6 py-3 rounded-lg font-semibold w-full sm:w-auto">
                Нэвтрэх
              </button>
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-[#13544E] text-white py-16 px-6 sm:px-10 lg:px-16 max-w-[1280px] w-full mx-auto rounded-2xl mb-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="text-center md:text-left">
            <h4 className="text-sm uppercase font-semibold">Бизнесүүдэд</h4>
            <h1 className="text-3xl sm:text-4xl font-bold mt-4 leading-snug">
              Энд <br />
              <span className="text-foreground">сайн компаниуд</span> <br />
              <span className="text-foreground">сайн хамтрагчаа олдог.</span>
            </h1>
            <p className="text-foreground mt-4 text-base sm:text-lg">
              ProLink-ийн шилдэг авъяастнуудад хандаж, холимог ажлын хүчний удирдлагын иж бүрэн
              хэрэгслүүдийг ашиглаарай. Энэ бол инноваци хэрхэн ажилладаг шинэ арга зам юм.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Чадварын зөрүүгээ нөхөхийн тулд экспертүүдтэй холбогдоорой',
                'Ажлын урсгалаа хяна: ажилтантай холбогдох, ангилах, хөлслөх',
                'Бүрэн үйлчилгээний дэмжлэг авахын тулд ProLink-тэй хамтар',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-foreground text-xl">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href={'/freelancer'}>
              <button className="mt-6 bg-background text-foreground px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
                Дэлгэрэнгүй үзэх
              </button>
            </Link>
          </div>

          <div className="relative flex justify-center w-full md:w-1/2">
            <Image
              src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/enterprise-2023.jpg"
              alt="Enterprise Suite Image"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full max-w-md md:max-w-full"
            />
          </div>
        </div>
      </section>

      <div className="relative max-w-[1280px] w-full mx-auto mb-20 rounded-2xl overflow-hidden shadow-lg h-fit">
        <div
          style={{
            backgroundImage:
              'url(https://res.cloudinary.com/dv7ytfkgc/image/upload/v1741937891/x9obm4rzd7h0jb67ql84.jpg)',
          }}
          className="relative min-h-[700px] lg:min-h-[600] sm:max-h-[600px] bg-no-repeat bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-background/50 flex flex-col justify-center items-center md:items-start px-6 sm:px-12 py-12 text-white text-center md:text-left">
            <p className="text-sm uppercase mt-3 font-medium">Үйлчлүүлэгчдэд</p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-[-10px] sm:mt-[10px]">
              Авъяас чадвараа <br className="hidden md:block" /> хүссэнээрээ ол
            </h1>
            <p className="mt-4 text-lg max-w-lg">
              Хамгийн том бие даасан мэргэжилтнүүдийн сүлжээг ашиглаж, ажлаа
              <br className="hidden sm:block" />
              хурдан хугацаанд эсвэл томоохон өөрчлөлтөөр амжуул.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
              {[
                {
                  title: 'Ажлын зар нийтэлж талент хөлслөх',
                  subtitle: 'Мэргэжилтнүүдийн Платформ →',
                },
                {
                  title: 'Талент хайж, хөлслөх',
                  subtitle: 'Мэргэжилтнүүдийн каталоги →',
                },
                {
                  title: 'Салбарын мэргэжилтнээс зөвлөгөө авах',
                  subtitle: 'Мэргэжилтнүүдтэй холбогдох →',
                },
              ].map((item, index) => (
                <Link key={index} href={'/freelancer'} className="flex">
                  <button className="flex-1 bg-transparent border border-gray-300 text-white py-6 px-4 text-left rounded-lg shadow-lg hover:bg-foreground transition w-full">
                    <span className="text-lg font-semibold block">{item.title}</span>
                    <span className="text-sm opacity-80">{item.subtitle}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1280px] w-full mx-auto mb-20 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">
        <div
          style={{
            backgroundImage:
              'url(https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload//q_auto,dpr_2.0,f_auto/brontes/for-talents/find-great-work@2x.jpg)',
          }}
          className="w-full md:w-1/2 h-[400px] md:h-[600px] bg-cover bg-center"
        ></div>

        <div className="relative w-full md:w-1/2 h-auto md:h-[600px] bg-blue-600 bg-opacity-90 flex flex-col justify-center px-6 sm:px-12 py-12 text-white">
          <p className="text-sm uppercase font-bold">Мэргэжилтнүүдэд</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4">
            Хүссэн ажлаа <br className="hidden md:block" /> олоорой
          </h1>
          <p className="mt-4 text-lg max-w-lg">
            Таныг бүтээлчээр ажиллахад түлхэц өгөх үйлчлүүлэгчидтэй хамтран ажиллаж,
            <br className="hidden sm:block" /> карьер эсвэл бизнесийнхээ хөгжлийг шинэ түвшинд
            гаргаарай.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto px-4">
            {[
              'Карьерынаа ахиулахад тохирох боломжуудыг олоорой',
              'Хэзээ, хаана, хэрхэн ажиллахаа өөрөө шийд',
              'Орлого олох шинэ арга замуудыг туршиж үзээрэй',
            ].map((text, index) => (
              <Link key={index} href={'/job'} className="flex">
                <button className="flex-1 bg-transparent border border-gray-300 text-white py-6 px-4 text-left rounded-lg shadow-lg hover:bg-blue-700 transition w-full">
                  <span className="text-lg font-semibold block">{text}</span>
                </button>
              </Link>
            ))}
          </div>
          <Link href={'/job'} className="flex">
            <button className="mt-6 bg-background text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200">
              Ажил хайх →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
