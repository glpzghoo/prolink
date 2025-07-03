'use client';
import { CustomFeaturedSkill } from '@/app/freelancer/[id]/ProfileClient';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { responseData } from '@/lib/types';
import { Button, Input, Snackbar, Switch } from '@mui/material';
import { skill } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import z from 'zod';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  featured: CustomFeaturedSkill[];
};

const formSchema = z
  .object({
    skill: z.string().min(1, 'Skill is required'),
    detail: z.string().min(1, 'Detail is required'),
    startedAt: z.date({ required_error: 'Start date is required' }),
    present: z.boolean(),
    endedAt: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.present && !data.endedAt) {
      ctx.addIssue({
        path: ['endedAt'],
        code: 'custom',
        message: 'Хүртэл огноо шаардлагатай (одоог хүртэл ажиллаагүй бол)',
      });
    }
  });

export const FeaturedSkillNewButton = ({ setRefresh, setLoading, refresh, featured }: Props) => {
  const [form, setForm] = useState({
    skill: '',
    detail: '',
    startedAt: undefined as Date | undefined,
    present: false,
    endedAt: undefined as Date | undefined,
  });
  const [formValid, setFormValid] = useState(false);
  const [response, setResponse] = useState<responseData>();
  const [skills, setSkills] = useState<skill[]>([]);

  useEffect(() => {
    const result = formSchema.safeParse(form);
    setFormValid(result.success);
  }, [form]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/account`);
        if (res.data.success && res.data.data?.informations?.skill) {
          const filterSkills = res.data.data.informations.skill.filter(
            (skill: skill) => !featured.some((f) => f.skillId === skill.id)
          );
          setSkills(filterSkills);
        } else {
          setResponse(res.data);
        }
      } catch (err) {
        console.error('Хүсэлт илгээгээгүй', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh, featured, setLoading]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [response]);

  const handleForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendData = async () => {
    if (!formValid) return;
    try {
      setLoading(true);
      const res = await axios.post(`/api/skills/featured`, form);
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
        setForm({
          skill: '',
          detail: '',
          startedAt: undefined,
          present: false,
          endedAt: undefined,
        });
      }
    } catch (err) {
      console.error('Сервер дээр алдаа гарлаа!', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="skill" className="text-sm font-medium text-gray-700">
          Ур чадвар
        </Label>
        {skills?.length === 0 ? (
          <p className="text-sm text-gray-600">
            Skill харагдахгүй байна уу?{' '}
            <Link href="/account/settings/about" className="text-green-600 hover:underline">
              Энд дарж
            </Link>{' '}
            skill нэмээрэй!
          </p>
        ) : (
          <select
            value={form.skill}
            onChange={handleForm}
            name="skill"
            id="skill"
            className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-green-600 focus:outline-none"
          >
            <option value="" disabled>
              Ур чадвар сонгоно уу
            </option>
            {skills?.map((skill) => (
              <option value={skill.id} key={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="detail" className="text-sm font-medium text-gray-700">
          Дэлгэрэнгүй
        </Label>
        <Textarea
          value={form.detail}
          onChange={handleForm}
          name="detail"
          id="detail"
          className="w-full mt-1 rounded-md border border-gray-300 px-4 py-3 text-gray-700 focus:border-green-600 focus:outline-none"
          rows={4}
          placeholder="Энд ур чадварынхаа талаар дэлгэрэнгүй бичнэ үү"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="startedAt" className="text-sm font-medium text-gray-700">
            Эхлэсэн
          </Label>
          <Input
            id="startedAt"
            type="date"
            name="startedAt"
            value={form.startedAt ? form.startedAt.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const date = new Date(e.target.value);
              setForm((prev) => ({ ...prev, startedAt: date }));
            }}
            className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-green-600 focus:outline-none"
            sx={{ '& input': { padding: '8px 12px' } }}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="endedAt" className="text-sm font-medium text-gray-700">
              Хүртэл
            </Label>
            <Input
              id="endedAt"
              name="endedAt"
              type="date"
              value={form.endedAt ? form.endedAt.toISOString().split('T')[0] : ''}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setForm((prev) => ({ ...prev, endedAt: date }));
              }}
              disabled={form.present}
              className="w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-green-600 focus:outline-none disabled:bg-gray-100"
              sx={{ '& input': { padding: '8px 12px' } }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={form.present}
              onChange={(e) => setForm((prev) => ({ ...prev, present: e.target.checked }))}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#16a34a' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#16a34a',
                },
              }}
            />
            <Label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Одоог хүртэл
            </Label>
          </div>
        </div>
      </div>

      <Button
        onClick={sendData}
        disabled={!formValid}
        sx={{
          width: '100%',
          backgroundColor: formValid ? '#16a34a' : '#d1d5db',
          color: 'white',
          fontWeight: 500,
          padding: '12px 0',
          borderRadius: '8px',
          textTransform: 'none',
          '&:hover': { backgroundColor: formValid ? '#15803d' : '#d1d5db' },
          '&:disabled': { backgroundColor: '#d1d5db', cursor: 'not-allowed' },
        }}
      >
        Нэмэх
      </Button>

      {response?.message && (
        <Snackbar
          sx={{ color: response.success ? 'green' : 'red' }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={Boolean(response.message)}
          message={response.message}
        />
      )}
    </div>
  );
};
