"use client";
import { useState } from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoXing,
} from "react-icons/io";

export default function Footer() {
  const [isMode, setIsMode] = useState(false);
  return (
    <div className="w-full flex flex-col items-center h-screen justify-around bg-secondary">
      <div className="flex w-[80%] justify-between text-sm gap-4">
        <div className=" flex flex-col gap-3">
          <h1 className="font-semibold">Ажил горилогч</h1>

          <div>Хэрхэн байгууллагатай хамтран ажиллах вэ?</div>
          <div>Цалингийн баталгаа, уян хатан байдал</div>
        </div>
        <div className=" flex flex-col gap-3">
          <h1 className="font-semibold">Ажил олгогч</h1>
          <div>Ажил санал болгох</div>
          <div>Ажил олгогчдын баталгаа</div>
          <div>Хүний нөөц</div>
          <div>Хэрхэн чанартай үйлчилгээ авах вэ?</div>
        </div>
        <div className=" flex flex-col gap-3">
          <h1 className="font-semibold">Бидэнтэй холбогдох</h1>
          <div>Learn about new features</div>
          <div>Letter from our founders</div>
          <div>Careers</div>
          <div>Investors</div>
          <div>Airbnb Luxe</div>
        </div>
      </div>
      <div className="border-t w-[80%] py-7 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2.5">
          <div>© 2025 ProLink, Inc.</div>
          <div>&#xB7;</div>
          <div>Хувийн нууц</div>
          <div>&#xB7;</div>
          <div>Үйлчилгээний нөхцөл</div>
        </div>
        <div className="flex gap-4">
          <div>Dark/Light</div>
          <div className="flex gap-3">
            <IoLogoFacebook />
            <IoLogoTwitter />
            <IoLogoInstagram />
          </div>
        </div>
      </div>
    </div>
  );
}
