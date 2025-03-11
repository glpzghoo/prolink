"use client";
export default function Category() {
  return (
    <div>
      <div className=" flex justify-center items-center p-8">
        <div className="w-[1200px] flex justify-center items-center p-8 gap-4">
          <div className="flex flex-col w-[50%] p-2">
            <div className="font-bold text-5xl p-8">
              Dev and IT experts to scale your org
            </div>
            <div className="p-6 flex flex-col gap-4">
              Hire independent professionals to shorten development cycles, bury
              backlogs, and drive product growth.
              <button className="bg-green-600 p-4 rounded-md text-white">
                Get started
              </button>
            </div>
          </div>
          <div className="w-[50%]">
            <img src="dev.jpg" alt="" className="w-120 h-90" />
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
      <div className="bg-gray-200 h-[1200px] px-auto py-auto gap-4 p-4 flex justify-center">
        <div className="p-4">
          <p className="font-bold text-4xl mb-8">
            Trusted remote development and IT experts
          </p>
          <div className="flex gap-6">
            <div className="">
              <p className="font-bold text-2xl">4.91</p>
              <p>Average rating for work with tech talent.</p>
            </div>
            <div>
              <p className="font-bold text-2xl">211K+ contracts</p>
              <p>Involving development and IT work in the past year.</p>
            </div>
            <div>
              <p className="font-bold text-2xl">1,665 skills</p>
              <p>Represented by talent on Upwork.</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
