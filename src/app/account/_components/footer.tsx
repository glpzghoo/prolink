"use client";
import { useState } from "react";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const socialIcons = [
  { Icon: IoLogoFacebook, hoverColor: "hover:text-blue-500" },
  { Icon: IoLogoTwitter, hoverColor: "hover:text-blue-400" },
  { Icon: IoLogoInstagram, hoverColor: "hover:text-pink-500" },
];

const footerLinks = [
  {
    title: "Талентуудад",
    items: [
      {
        trigger: "Хэрхэн байгууллагатай хамтран ажиллах вэ?",
        content:
          "Та манай платформыг ашиглан ажилд орох боломжтой. Бүртгүүлээд, өөрийн ур чадвар, туршлагаа оруулснаар тохирох ажлын байрыг хялбархан олоорой.",
      },
      {
        trigger: "Цалингийн баталгаа, уян хатан байдал",
        content:
          "Манай систем цалингийн уян хатан баталгааг хангана. Та ажлын цагийг өөрийн хэрэгцээнд тохируулан сонгох боломжтой бөгөөд тогтмол орлоготой байх болно.",
      },
      {
        trigger: "Ажил хайх үйл явц хэрхэн явагддаг вэ?",
        content:
          "Ажил хайгчид манай сайтад бүртгүүлж, профайлаа бөглөсний дараа компаниудын саналыг хүлээн авна. Та хүссэн ажлаа сонгон, шууд холбогдох боломжтой.",
      },
    ],
  },
  {
    title: "Компаниудад",
    items: [
      {
        trigger: "Ажил санал болгох",
        content:
          "Та өөрийн ажил санал болгож, өндөр чанартай ажиллах хүчин олох боломжтой. Манай платформ танд хамгийн тохиромжтой ажилчдыг хурдан холбох болно.",
      },
      {
        trigger: "Хэрхэн чанартай үйлчилгээ авах вэ?",
        content:
          "Манай платформоор дамжуулан хамгийн тохиромжтой ажилчдыг олоорой. Ажилчдын ур чадвар, туршлагыг шалгаж, таны шаардлагад нийцүүлэн сонгоно уу.",
      },
      {
        trigger: "Яагаад манай платформыг сонгох вэ?",
        content:
          "Бид танд цаг хэмнэх, найдвартай ажиллах хүчийг олоход тусална. Манай систем нь компани болон талентуудыг үр дүнтэй холбодог.",
      },
    ],
  },
  {
    title: "Бидэнтэй холбогдох",
    items: [
      {
        trigger: "Шинэ боломжуудын талаар мэдэх",
        content:
          "Манай платформын шинэ боломжууд, ажлын байрны талаарх мэдээллийг тогтмол хүлээн авч, ажил хайх болон санал болгох үйл явцыг сайжруулаарай.",
      },
      {
        trigger: "Манай үүсгэн байгуулагчдын захиас",
        content:
          "Бид компани болон талентуудыг холбох найдвартай гүүр байхыг зорьдог. Манай платформ таны амжилтын төлөө ажиллана.",
      },
      {
        trigger: "Тусламж, дэмжлэг",
        content:
          "Хэрэв танд асуулт байвал бидэнтэй имэйл, утас эсвэл чатаар холбогдоорой. Бид 24/7 танд туслахад бэлэн байна.",
      },
    ],
  },
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const hoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export default function Footer() {
  const [isMode, setIsMode] = useState(false);
  return (
    <footer className="w-full bg-secondary text-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              className="space-y-3 sm:space-y-4"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              viewport={{ once: true }}
            >
              <h1 className="font-semibold text-lg sm:text-xl tracking-tight">
                {section.title}
              </h1>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-1 sm:space-y-2"
              >
                {section.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="border-b border-gray-400"
                  >
                    <AccordionTrigger className="text-sm sm:text-base hover:text-gray-700 py-2 sm:py-3 transition-colors duration-200">
                      {item.trigger}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm text-gray-800 pb-3 sm:pb-4">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 sm:mt-8 lg:mt-10 pt-4 sm:pt-6 border-t border-gray-400"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <span>© 2025 ProLink, Inc.</span>
              <span className="text-gray-400">·</span>
              <motion.a
                href="#"
                className="hover:text-gray-700 transition-colors duration-200"
                variants={hoverVariants}
                whileHover="hover"
              >
                Хувийн нууцлалын бодлого
              </motion.a>
              <span className="text-gray-400">·</span>
              <motion.a
                href="#"
                className="hover:text-gray-700 transition-colors duration-200"
                variants={hoverVariants}
                whileHover="hover"
              >
                Үйлчилгээний нөхцөл
              </motion.a>
              <span className="text-gray-400">·</span>
              <motion.a
                href="#"
                className="hover:text-gray-700 transition-colors duration-200"
                variants={hoverVariants}
                whileHover="hover"
              >
                Холбоо барих
              </motion.a>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <motion.button
                className="text-xs sm:text-sm hover:text-gray-700 transition-colors duration-200"
                variants={hoverVariants}
                whileHover="hover"
              >
                Харанхуй/Гэрэлтэй
              </motion.button>
              <div className="flex items-center gap-3 sm:gap-4">
                {socialIcons.map(({ Icon, hoverColor }, index) => (
                  <motion.div
                    key={index}
                    variants={hoverVariants}
                    whileHover="hover"
                  >
                    <Icon
                      className={`text-base sm:text-lg cursor-pointer ${hoverColor} transition-colors duration-200`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
