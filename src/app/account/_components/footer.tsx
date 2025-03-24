import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Footer() {
  return (
    <footer className="mx-auto w-full p-6 lg:p-10 bg-secondary">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {/* Section 1 */}
        <div className="text-sm">
          <h1 className="font-semibold text-lg mb-3">Ажил горилогч</h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Хэрхэн байгууллагатай хамтран ажиллах вэ?
              </AccordionTrigger>
              <AccordionContent>
                Та манай платформыг ашиглан ажилд орох боломжтой.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Цалингийн баталгаа, уян хатан байдал
              </AccordionTrigger>
              <AccordionContent>
                Манай систем цалингийн уян хатан баталгааг хангана.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Section 2 */}
        <div className="text-sm">
          <h1 className="font-semibold text-lg mb-3">Компани</h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Ажил санал болгох</AccordionTrigger>
              <AccordionContent>
                Та өөрийн ажил санал болгож, өндөр чанартай ажиллах хүчин олох
                боломжтой.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Хэрхэн чанартай үйлчилгээ авах вэ?
              </AccordionTrigger>
              <AccordionContent>
                Манай платформоор дамжуулан хамгийн тохиромжтой ажилчдыг
                олоорой.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Section 3 */}
        <div className="text-sm">
          <h1 className="font-semibold text-lg mb-3">Бидэнтэй холбогдох</h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Learn about new features</AccordionTrigger>
              <AccordionContent>
                Та өөрийн ажил санал болгож, өндөр чанартай ажиллах хүчин олох
                боломжтой.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Letter from our founders</AccordionTrigger>
              <AccordionContent>
                Манай платформоор дамжуулан хамгийн тохиромжтой ажилчдыг
                олоорой.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-500 w-[85%] mx-auto py-5 flex flex-col sm:flex-row justify-between items-center text-sm">
        <div className="flex gap-3">
          <span>© 2025 ProLink, Inc.</span>
          <span>·</span>
          <span className="hover:text-white cursor-pointer">Хувийн нууц</span>
          <span>·</span>
          <span className="hover:text-white cursor-pointer">
            Үйлчилгээний нөхцөл
          </span>
        </div>

        <div className="flex items-center gap-5 mt-4 sm:mt-0">
          <div className="cursor-pointer hover:text-white">Dark/Light</div>
          <div className="flex gap-4 text-lg">
            <IoLogoFacebook className="hover:text-blue-500 cursor-pointer" />
            <IoLogoTwitter className="hover:text-blue-400 cursor-pointer" />
            <IoLogoInstagram className="hover:text-pink-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
