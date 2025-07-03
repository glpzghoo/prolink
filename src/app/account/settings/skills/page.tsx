'use client';
import { FeaturedSkillsetup } from '../../_components/featuredSkillChange';
import { FeaturedSkillNewButton } from '../../_components/featuredSkillNewButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/app/_component/loading';
import { responseData } from '@/lib/types';
import { CustomFeaturedSkill } from '@/app/freelancer/[id]/ProfileClient';

export default function Settings() {
  const [featured, setFeatured] = useState<CustomFeaturedSkill[]>([]);
  const [response, setResponse] = useState<responseData>();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [deletingItem, setDeletingItem] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/skills/featured`);
        if (res.data.success && res.data.data?.user?.featuredSkills) {
          setFeatured(res.data.data.user.featuredSkills);
        } else {
          setResponse(res.data);
          setFeatured([]);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setResponse({
          success: false,
          message: 'Сервертэй холбогдож чадсангүй',
        });
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const deleteSkill = async (id: string) => {
    try {
      setLoading2(true);
      setDeletingItem(id);
      const res = await axios.delete(`/api/skills/featured?id=${id}`);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      } else {
        setResponse(res.data);
      }
    } catch (err) {
      console.error('Delete Error:', err);
      setResponse({ success: false, message: 'Устгахад алдаа гарлаа' });
    } finally {
      setLoading2(false);
      setDeletingItem('');
    }
  };

  return (
    <div className="bg-white flex items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-6xl mx-auto py-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Ур чадварын тохиргоо
            </h2>
            <div className="flex flex-col gap-6">
              <FeaturedSkillNewButton
                setRefresh={setRefresh}
                refresh={refresh}
                setLoading={setLoading2}
                featured={featured}
              />
              <div className="flex flex-col gap-4">
                <div className="text-lg font-semibold text-gray-800 border-b pb-4 text-center">
                  Таны онцолсон ур чадварууд
                </div>
                {featured.length > 0 ? (
                  featured.map((skill) => (
                    <FeaturedSkillsetup
                      key={skill.id}
                      skill={skill}
                      deleteSkill={deleteSkill}
                      loading2={loading2}
                      setdeletingItem={setDeletingItem}
                      deletingItem={deletingItem}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center">
                    Одоогоор онцолсон ур чадварууд алга
                  </p>
                )}
              </div>
            </div>
          </div>
          {response?.message && (
            <div className="mt-4 text-center text-sm text-red-600">{response.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
