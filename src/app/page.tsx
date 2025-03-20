"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ClientCard } from "./_component/ ClientPostCard";
import { Check, FilePlus, Wallet } from "lucide-react";

export default function Home() {
	const mobileImgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (mobileImgRef.current) {
			gsap.fromTo(
				mobileImgRef.current,
				{ rotateX: -90, opacity: 0, transformPerspective: 1000 },
				{ rotateX: 0, opacity: 1, duration: 2, ease: "power2.out" }
			);
		}
	}, []);
	return (
		<div>
			<div
				ref={mobileImgRef}
				className="max-w-[1280px] bg-[#fff] w-full min-h-[548px] my-20 mx-auto flex flex-col lg:flex-row items-center justify-between border rounded-2xl p-6"
			>
				{/* Mobile Image */}
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
					<h1 className="text-[36px] lg:text-[56px] leading-tight lg:leading-[58px] w-[90%] lg:w-[600px] mx-auto font-medium">
						We connect people to bring projects to life
					</h1>
					<h4 className="w-[90%] lg:w-[400px] font-medium text-[#181818] my-4 mx-auto">
						Find high-quality talent or open jobs with the help of AI tools that
						keep you in control.
					</h4>

					<div className="text-center mx-auto mt-8 lg:mt-[45%] w-full lg:w-[20vw]">
						<h4 className="text-sm font-semibold uppercase text-gray-600">
							TRUSTED BY
						</h4>
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

			<div className="max-w-[1280px] w-full mx-auto mb-20 bg-green-50 p-6 md:p-10 rounded-2xl flex flex-col lg:flex-row items-center shadow-lg">
				<img
					src="./mainPageJoin.png"
					className="w-full lg:w-1/2 max-w-[500px] lg:max-w-none"
				/>

				<div className="w-full lg:w-1/2 lg:pl-10 mt-6 lg:mt-0 text-center lg:text-left">
					<h2 className="text-2xl md:text-3xl font-bold">
						Up your work game, it’s easy
					</h2>

					<div className="mt-6 space-y-4">
						{[
							{
								title: "No cost to join",
								description:
									"Register and browse talent profiles, explore projects, or even book a consultation.",
							},
							{
								title: "Post a job and hire top talent",
								description:
									"Finding talent doesn’t have to be a chore. Post a job or we can search for you!",
							},
							{
								title: "Work with the best—without breaking the bank",
								description:
									"Upwork makes it affordable to up your work and take advantage of low transaction rates.",
							},
						].map((item, index) => (
							<div key={index} className="flex items-start space-x-3">
								<Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
								<div>
									<p className="font-semibold">{item.title}</p>
									<p className="text-gray-600">{item.description}</p>
								</div>
							</div>
						))}
					</div>

					<div className="mt-6 flex flex-col sm:flex-row sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
						<button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold w-full sm:w-auto">
							Sign up for free
						</button>
						<button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold w-full sm:w-auto">
							Learn how to hire
						</button>
					</div>
				</div>
			</div>

			<section className="bg-[#13544E] text-white py-16 px-6 sm:px-10 lg:px-16 max-w-[1280px] w-full mx-auto rounded-2xl mb-20">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
					<div className="text-center md:text-left">
						<h4 className="text-lg font-semibold">Enterprise Suite</h4>
						<h1 className="text-3xl sm:text-4xl font-bold mt-4 leading-snug">
							Энд <br />
							<span className="text-green-300">сайн компаниуд</span> <br />
							<span className="text-green-300">сайн хамтрагчаа олдог.</span>
						</h1>
						<p className="text-gray-300 mt-4 text-base sm:text-lg">
							ProLink-ийн шилдэг авъяастнуудад хандаж, холимог ажлын хүчний
							удирдлагын иж бүрэн хэрэгслүүдийг ашиглаарай. Энэ бол инноваци
							хэрхэн ажилладаг шинэ арга зам юм.
						</p>

						<ul className="mt-6 space-y-3">
							{[
								"Чадварын зөрүүгээ нөхөхийн тулд экспертүүдтэй холбогдоорой",
								"Ажлын урсгалаа хяна: ажилтан хөлслөх, ангилах, төлбөр хийх",
								"Бүрэн үйлчилгээний дэмжлэг авахын тулд ProLink-тэй хамтар",
							].map((item, index) => (
								<li key={index} className="flex items-start gap-2">
									<span className="text-green-300 text-xl">✔</span>
									<span>{item}</span>
								</li>
							))}
						</ul>

						<button className="mt-6 bg-white text-green-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
							Дэлгэрэнгүй үзэх
						</button>
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

			<div className="relative max-w-[1280px] w-full mx-auto mb-20 rounded-2xl overflow-hidden shadow-lg">
				<div
					style={{
						backgroundImage:
							"url(https://res.cloudinary.com/dv7ytfkgc/image/upload/v1741937891/x9obm4rzd7h0jb67ql84.jpg)",
					}}
					className="relative h-[600px] bg-no-repeat bg-cover bg-center"
				>
					<div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center md:items-start px-6 sm:px-12 py-12 text-white">
						<p className="text-sm uppercase font-medium">Үйлчлүүлэгчдэд</p>
						<h1 className="text-3xl sm:text-4xl font-bold mt-2 text-center md:text-left">
							Авъяас чадвараа <br className="hidden md:block" /> хүссэнээрээ ол
						</h1>
						<p className="mt-4 text-lg text-center md:text-left max-w-lg">
							Хамгийн том бие даасан мэргэжилтнүүдийн сүлжээг ашиглаж, ажлаа
							<br className="hidden sm:block" />
							хурдан хугацаанд эсвэл томоохон өөрчлөлтөөр амжуул.
						</p>

						{/* Buttons Grid */}
						<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
							{[
								{
									title: "Ажлын зар нийтэлж мэргэжилтэн хөлслөх",
									subtitle: "Talent Marketplace™ →",
								},
								{
									title: "Төсөл хайж худалдан авах",
									subtitle: "Project Catalog™ →",
								},
								{
									title: "Салбарын мэргэжилтнээс зөвлөгөө авах",
									subtitle: "Consultations →",
								},
							].map((item, index) => (
								<button
									key={index}
									className="bg-transparent backdrop-opacity-90 border-[1px] text-white py-6 px-4 text-left rounded-lg shadow-lg hover:bg-green-700 transition w-full"
								>
									<span className="text-lg font-semibold block">
										{item.title}
									</span>
									<span className="text-sm opacity-80">{item.subtitle}</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="relative max-w-[1280px] w-full mx-auto mb-20 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">
				<div
					style={{
						backgroundImage:
							"url(https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload//q_auto,dpr_2.0,f_auto/brontes/for-talents/find-great-work@2x.jpg)",
					}}
					className="w-full md:w-1/2 h-[400px] md:h-[600px] bg-cover bg-center"
				></div>

				<div className="relative w-full md:w-1/2 h-auto md:h-[600px] bg-blue-600 bg-opacity-90 flex flex-col justify-center px-6 sm:px-12 py-12 text-white">
					<p className="text-sm uppercase font-bold">For talent</p>
					<h1 className="text-3xl sm:text-4xl font-bold mt-2">
						Find great <br className="hidden md:block" /> work
					</h1>
					<p className="mt-4 text-lg max-w-lg">
						Meet clients you’re excited to work with and take your
						<br className="hidden sm:block" /> career or business to new
						heights.
					</p>

					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
						{[
							"Find opportunities for every stage of your career",
							"Control when, where, and how you work",
							"Explore different ways to earn",
						].map((text, index) => (
							<button
								key={index}
								className="bg-transparent backdrop-opacity-90 border-[1px] text-white py-6 px-4 text-left rounded-lg shadow-lg hover:bg-blue-700 transition w-full"
							>
								<span className="text-lg font-semibold block">{text}</span>
							</button>
						))}
					</div>

					<button className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200">
						Find opportunities →
					</button>
				</div>
			</div>
		</div>
	);
}
