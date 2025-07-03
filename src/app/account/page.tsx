'use client';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import GoogleSession from './_components/google';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

const emailSchema = z.string().email();
export default function Account() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const LoginButtonEvent = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem('email');
    if (emailFromLocalStorage) {
      setEmail(emailFromLocalStorage);
    }
  }, []);
  useEffect(() => {
    const result = emailSchema.safeParse(email);
    if (result.success) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email]);

  const onClick = async () => {
    setLoading(true);
    const res = await axios.post(`/api/account`, { email });
    setLoading(false);

    localStorage.setItem('email', email);
    if (res.data.userExist) {
      localStorage.setItem('firstName', res.data.data.name);
      router.push(`/account/login`);
    } else {
      router.push('/account/register');
    }
  };
  const handleLoginEvent = () => {
    if (LoginButtonEvent.current) {
      LoginButtonEvent.current.click();
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          exit={{ opacity: 0, y: 50 }}
          viewport={{ once: false }}
          className="p-10 rounded-lg shadow-xl"
        >
          <div className="">
            <div className="w-[468px] h-[522px] px-3 flex flex-col gap-6">
              <div className="flex justify-center h-16 items-center border-b-2 font-bold">
                Нэвтрэх эсвэл бүртгүүлэх
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xl">Тавтай морил</div>
                <div>
                  <Input
                    defaultValue={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLoginEvent();
                      }
                    }}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <Button
                    sx={{ color: 'green' }}
                    onClick={onClick}
                    disabled={isValid || loading}
                    ref={LoginButtonEvent}
                    type="submit"
                    className={`w-full  ${isValid ? `bg-foreground` : `bg-[#108A00]`}`}
                  >
                    {loading ? <>Түр хүлээнэ үү!</> : 'Үргэлжлүүлэх'}
                  </Button>
                </div>
              </div>
              <div className="flex justify-evenly items-center">
                <div className="border-b w-1/3"></div>
                <div className="flex text-xs">Эсвэл</div>
                <div className="border-b w-1/3"></div>
              </div>
              {/* <div>
                <Button
                  sx={{ color: "green" }}
                  className="w-full border bg-background text-foreground hover:bg-secondary gap-5 flex justify-around"
                >
                  <Image
                    src={`/img/facebook.svg`}
                    alt="facebook logo"
                    width={20}
                    height={20}
                  />
                  <div>Facebook -ээр нэвтрэх</div>
                </Button>
              </div> */}
              <div>
                <SessionProvider>
                  <GoogleSession />
                </SessionProvider>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
