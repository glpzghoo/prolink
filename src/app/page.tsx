import Image from "next/image";
import { ClientCard } from "./_component/ ClientPostCard";

export default function Home() {
	return (
		<div>
			<div className="w-[1280px] min-h-[548px] my-20 mx-auto flex justify-between border-[1px] rounded-2xl p-6">
				{/* <div className="mobile-image" data-v-190154c8="">
				<img
					alt="Connecting people"
					src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/uma-hero/image-mobile.png"
					loading="lazy"
					className=""
				/>
			</div> */}
				<div className="left-image">
					<img
						alt="Connecting people"
						src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/uma-hero/image-left.png"
						loading="lazy"
						className="w-[177px] h-[500px]"
					/>
				</div>
				<div className="relative">
					<h1 className="text-[56px]/[58px] w-[600px] m-auto font-medium text-center">
						We connect people to bring projects to life
					</h1>
					<h4 className="w-[400px] font-medium text-[#181818] text-center my-4 mx-auto">
						Find high-quality talent or open jobs with the help of AI tools that
						keep you in control.
					</h4>
					<div className="logobar-desktop text-center mx-auto mt-[45%] w-[20vw]">
						<h4 className="logobar-title">TRUSTED BY</h4>{" "}
						<div className="logobar-logos mt-2 flex justify-between ">
							<figure>
								<img
									data-qa="microsoft"
									src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_fit/brontes/uma-hero/logo-microsoft-grey.svg"
									alt="acq_Logobar_Microsoft"
								/>
							</figure>
							<figure>
								<img
									data-qa="airbnb"
									src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_fit/brontes/uma-hero/logo-airbnb-grey.svg"
									alt="acq_Logobar_Airbnb"
								/>
							</figure>
							<figure>
								<img
									data-qa="bissell"
									src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_fit/brontes/uma-hero/logo-bissell-grey.svg"
									alt="acq_Logobar_Bissell"
								/>
							</figure>
						</div>
					</div>
				</div>
				<div className="right-image text-right">
					<img
						alt="Connecting people"
						src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/uma-hero/image-right.png"
						className="w-[177px] h-[500px]"
					/>
				</div>
			</div>
			<div className="flex justify-between w-[1280px] mx-auto">
				<div>
					<img className="w-[500px] h-[370px]" src="./mainPageJoin.png" />
				</div>
				<div
					className="span-12 span-md-6 span-lg-7 how-to-hire-details"
					data-v-2e189b8a=""
				>
					<h4 className="h4 display-lg" data-v-2e189b8a="">
						Up your work game, it’s easy
					</h4>{" "}
					<div className="how-to-hire-list d-flex" data-v-2e189b8a="">
						<div className="air3-icon md w-[24px] h-[24px]" data-v-2e189b8a="">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								aria-hidden="true"
								viewBox="0 0 24 24"
								role="img"
							>
								<path
									vectorEffect="non-scaling-stroke"
									stroke="var(--icon-color, #001e00)"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M20.981 13.7v3.287a2.997 2.997 0 01-2.997 2.997H5.998A2.997 2.997 0 013 16.986v-9.99A2.997 2.997 0 015.997 4h4.995m5.25 2.059l2.737 2.757"
								></path>
								<path
									vectorEffect="non-scaling-stroke"
									stroke="var(--icon-color, #001e00)"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M11.99 15.358l-1.489.29a.999.999 0 01-.49 0 1.119 1.119 0 01-.42-.25 1 1 0 01-.249-.41.909.909 0 010-.489l.28-1.508c.085-.38.28-.728.56-1l7.362-7.362a1.85 1.85 0 01.649-.44c.247-.116.516-.18.79-.189.264.002.525.056.768.16.247.1.471.25.66.44a2 2 0 01.44.649 2.082 2.082 0 010 1.548 1.998 1.998 0 01-.44.65l-7.423 7.352c-.27.28-.618.474-.999.56z"
								></path>
							</svg>
						</div>{" "}
						<div data-v-2e189b8a="">
							<h5 className="mb-0" data-v-2e189b8a="">
								No cost to join
							</h5>{" "}
							<p className="how-to-hire-list-subtitle" data-v-2e189b8a="">
								Register and browse talent profiles, explore projects, or even
								book a consultation.
							</p>
						</div>
					</div>
					<div className="how-to-hire-list d-flex" data-v-2e189b8a="">
						<div className="air3-icon md size-[24px]" data-v-2e189b8a="">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								aria-hidden="true"
								viewBox="0 0 24 24"
								role="img"
							>
								<path
									vectorEffect="non-scaling-stroke"
									stroke="var(--icon-color, #001e00)"
									strokeLinecap="round"
									strokeLinejoin="round"
									stroke-witerlimit="10"
									strokeWidth="1.5"
									d="M15 19l.3-.3c2.8-2.8 2.8-7.2 0-10C12.5 6 8 6 5.3 8.8L5 9l10 10z"
								></path>
								<path
									vectorEffect="non-scaling-stroke"
									stroke="var(--icon-color, #001e00)"
									strokeLinecap="round"
									strokeLinejoin="round"
									stroke-witerlimit="10"
									strokeWidth="1.5"
									d="M17 11.5l3.3-3.3c.4-.4.4-1 0-1.4l-3.1-3.1c-.4-.4-1-.4-1.4 0L12.5 7M10 14l-7 7"
								></path>
							</svg>
						</div>{" "}
						<div data-v-2e189b8a="">
							<h5 className="mb-0" data-v-2e189b8a="">
								Post a job and hire top talent
							</h5>{" "}
							<p className="how-to-hire-list-subtitle" data-v-2e189b8a="">
								Finding talent doesn’t have to be a chore. Post a job or we can
								search for you!
							</p>
						</div>
					</div>
					<div className="how-to-hire-list d-flex" data-v-2e189b8a="">
						<div className="air3-icon md size-[24px]" data-v-2e189b8a="">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								aria-hidden="true"
								viewBox="0 0 24 24"
								role="img"
							>
								<path
									vectorEffect="non-scaling-stroke"
									stroke="var(--icon-color, #001e00)"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M20.015 16.114l-7.039 4.578a1.908 1.908 0 01-2.079 0l-7.039-4.578A1.908 1.908 0 013 14.512V4.907A1.907 1.907 0 014.907 3h14.059a1.908 1.908 0 011.907 1.907v9.605a1.908 1.908 0 01-.858 1.602z"
									clipRule="evenodd"
								></path>
								<path
									vectorEffect="non-scaling-stroke"
									stroke="var(--icon-color, #001e00)"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M11.939 5.33l1.392 3.596 3.854.21-2.995 2.441.992 3.73-3.243-2.1-3.243 2.1 1.002-3.73-3.005-2.442 3.863-.21 1.383-3.595z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>{" "}
						<div>
							<h5 className="mb-0">
								Work with the best—without breaking the bank
							</h5>{" "}
							<p className="">
								Upwork makes it affordable to up your work and take advantage of
								low transaction rates.
							</p>
						</div>
					</div>{" "}
					<div className="">
						<a className="">Sign up for free</a>{" "}
						<a className="">Learn how to hire</a>
					</div>
				</div>
			</div>
			<section className="bg-[#13544E] text-white py-16 px-6 sm:px-10 lg:px-16 w-[1280px] mx-auto rounded-2xl">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div>
						<h4 className="text-lg font-semibold">Enterprise Suite</h4>
						<h1 className="text-3xl sm:text-4xl font-bold mt-4 leading-snug">
							Энэ бол <br />
							<span className="text-green-300">сайн компаниуд</span> <br />
							<span className="text-green-300">
								сайн хамтрагчаа олдог эндээс олдог.
							</span>
						</h1>
						<p className="text-gray-300 mt-4 text-base sm:text-lg">
							ProLink-ийн шилдэг авъяастнуудад хандаж, холимог ажлын хүчний
							удирдлагын иж бүрэн хэрэгслүүдийг ашиглаарай. Энэ бол инноваци
							хэрхэн ажилладаг шинэ арга зам юм.
						</p>
						<ul className="mt-6 space-y-3">
							<li className="flex items-start gap-2">
								<span className="text-green-300 text-xl">✔</span>
								<span>
									Чадварын зөрүүгээ нөхөхийн тулд экспертүүдтэй холбогдоорой
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-300 text-xl">✔</span>
								<span>
									Ажлын урсгалаа хяна: ажилтан хөлслөх, ангилах, төлбөр хийх
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-300 text-xl">✔</span>
								<span>
									Бүрэн үйлчилгээний дэмжлэг авахын тулд ProLink-тэй хамтар
								</span>
							</li>
						</ul>

						{/* <button className="mt-6 bg-white text-green-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
    Дэлгэрэнгүй үзэх
  </button> */}
					</div>

					<div className="relative flex justify-center">
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
			<div className="relative w-[1280px] mt-[50px] mx-auto rounded-2xl overflow-hidden shadow-lg">
				<div
					style={{
						backgroundImage:
							"url(https://res.cloudinary.com/dv7ytfkgc/image/upload/v1741937891/x9obm4rzd7h0jb67ql84.jpg)",
					}}
					className="relative h-[600px] bg-no-repeat bg-cover bg-blend-color-dodge"
				>
					<div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center px-8 py-12 text-white">
						<p className="text-sm mt-[-100px] uppercase font-medium">
							Үйлчлүүлэгчдэд
						</p>
						<h1 className="text-4xl font-bold mt-2">
							Авъяас чадвараа <br /> хүссэнээрээ ол
						</h1>
						<p className="mt-4 text-lg">
							Хамгийн том бие даасан мэргэжилтнүүдийн сүлжээг ашиглаж, ажлаа
							<br />
							хурдан хугацаанд эсвэл томоохон өөрчлөлтөөр амжуул.
						</p>
						<div className="mt-[100px] grid grid-cols-3 gap-4">
							<button className=" bg-transparent backdrop-opacity-90 border-[1px] text-white py-6 px-4 text-left rounded-lg shadow-lg hover:bg-green-700">
								<span className="text-lg font-semibold block">
									Ажлын зар нийтэлж мэргэжилтэн хөлслөх
								</span>
								<span className="text-sm opacity-80">
									Talent Marketplace™ →
								</span>
							</button>
							<button className=" bg-transparent backdrop-opacity-90 border-[1px] text-white py-6 px-4 text-left rounded-lg shadow-lg hover:bg-green-700">
								<span className="text-lg font-semibold block">
									Төсөл хайж худалдан авах
								</span>
								<span className="text-sm opacity-80">Project Catalog™ →</span>
							</button>
							<button className=" bg-transparent backdrop-opacity-90 border-[1px] text-white py-6 px-4 text-left rounded-lg shadow-lg hover:bg-green-700">
								<span className="text-lg font-semibold block">
									Салбарын мэргэжилтнээс зөвлөгөө авах
								</span>
								<span className="text-sm opacity-80">Consultations →</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
