'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';
import { skill } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';

import _ from 'lodash';
import { Badge } from '@mui/material';
import { CustomUser } from '../freelancer/FreelancerListClient';
type CustomSkill = skill & {
  user: CustomUser[];
};
export default function SkillBadge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const divRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<CustomSkill[]>([]);
  const fetchSkills = async () => {
    let res;
    try {
      res = await axios.get(`/api/skills`);
      if (res.data.success) {
        setSkills(res.data.data.skills);
      }
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSkills();
  }, []);
  const handleLeftScroll = () => {
    if (divRef.current) {
      divRef.current.scrollBy({ left: -800, behavior: 'smooth' });
    }
  };
  const handleRightScroll = () => {
    if (divRef.current) {
      divRef.current.scrollBy({ left: 800, behavior: 'smooth' });
    }
  };
  if (skills.length > 0) {
  }

  const filtered = () => {
    const find = skills.find((sk) => sk.id === filter);
    return find?.name ? find?.name : '';
  };
  const uniqUsers = (data: CustomSkill): { freelancerLength: number; clientLength: number } => {
    const users = data.user;
    const uniqUsers = _.uniqBy(users, 'id');
    const group = _.groupBy(uniqUsers, 'role');
    const freelancerLength = group.FREELANCER ? group.FREELANCER.length : 0;
    const clientLength = group.CLIENT ? group.CLIENT.length : 0;
    return { freelancerLength, clientLength };
  };
  return (
    <div className="">
      {loading ? (
        <div className="flex items-center justify-center p-5 gap-3">
          <ImSpinner9 className="animate-spin" />
        </div>
      ) : skills.length > 0 ? (
        <>
          <div className="flex items-center gap-2 justify-center ">
            <Button
              onClick={handleLeftScroll}
              className="bg-background text-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
            >
              <ArrowLeftIcon />
            </Button>

            <div ref={divRef} className="flex w-3/4 overflow-hidden gap-3.5  py-5 text-background ">
              {skills.map((skill) => (
                <Link className="" key={skill.id} href={`${pathname + `?filter=${skill.id}`}`}>
                  <Badge
                    badgeContent={
                      pathname === '/client'
                        ? uniqUsers(skill).clientLength
                        : uniqUsers(skill).freelancerLength
                    }
                    color="success"
                  >
                    <Button
                      className={`bg-background ${
                        filter === skill.id ? `bg-[#199500] text-background` : `text-foreground`
                      } border-green-500 border hover:text-background shadow-lg hover:bg-[#199500] text-xs rounded-full whitespace-nowrap px-3 cursor-pointer`}
                    >
                      {skill.name}
                    </Button>
                  </Badge>
                </Link>
              ))}
            </div>
            <Button
              onClick={handleRightScroll}
              className="bg-background text-foreground hover:bg-secondary hover:text-foreground cursor-pointer"
            >
              <ArrowRightIcon />
            </Button>
          </div>
          {filter && (
            <div className=" flex  justify-center items-center pb-5 gap-10">
              <div>Шүүлтүүр: {filtered()}</div>
              <Link href={pathname} className=" cursor-pointer">
                <Button className=" cursor-pointer">Арилгах</Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-3">Skill татаж чадсангүй</div>
      )}
    </div>
  );
}
