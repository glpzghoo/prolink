import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Account() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="">
        <div className="w-[468px] h-[522px] px-3 flex flex-col gap-6">
          <div className="flex justify-center h-16 items-center border-b-2 font-bold">
            Нэвтрэх эсвэл бүртгүүлэх
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xl">Тавтай морил</div>
            <div>
              <Input className="" placeholder="Email" />
            </div>
            <div>
              <Button className="w-full bg-[#FF385C]">Үргэлжлүүлэх</Button>
            </div>
          </div>
          <div className="flex justify-evenly items-center">
            <div className="border-b w-1/3"></div>
            <div className="flex text-xs">Эсвэл</div>
            <div className="border-b w-1/3"></div>
          </div>
          <div>
            <Button className="w-full border bg-background text-foreground hover:bg-secondary  flex justify-around">
              <Image
                src={`/img/facebook.svg`}
                alt="facebook logo"
                width={20}
                height={20}
              />
              <div>Facebook -ээр нэвтрэх</div>
              <div></div>
            </Button>
          </div>
          <div>
            <Button className="w-full border bg-background text-foreground hover:bg-secondary flex justify-around">
              <Image
                src={`/img/foogle.svg`}
                alt="google logo"
                width={20}
                height={20}
              />
              <div>Google -р нэвтрэх</div>
              <div></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
