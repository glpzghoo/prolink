'use client';

import Loading from '@/app/_component/loading';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { responseData } from '@/lib/types';
import { Button, Checkbox, Input, Snackbar } from '@mui/material';
import { user } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function AccountSettings() {
  const [salaryType, setSalaryType] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState(0);
  const [pfp, setPfp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState<responseData>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<user>();
  const [name, setName] = useState({
    firstName: user?.firstName ? user.firstName : '',
    lastName: user?.lastName ? user.lastName : '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const clickInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/account`);
      if (res.data.success) {
        setUser(res.data.data.informations);
        setName({
          firstName: res.data.data.informations.firstName,
          lastName: res.data.data.informations.lastName,
        });
        setPhoneNumber(res.data.data.informations.phoneNumber);
        setEmail(res.data.data.informations.email);
        setSalary(res.data.data.informations.salary);
        setSalaryType(res.data.data.informations.salaryType);
      }
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [response]);
  useEffect(() => {
    fetchData();
  }, []);
  const handleNewPfp = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const response = await axios.get(`/api/sign-cloudinary`);
      const { timestamp, signature, api_key } = response.data;

      const data = new FormData();
      data.append('timestamp', timestamp.toString());
      data.append('signature', signature);
      data.append('api_key', api_key);
      data.append('file', event.target.files[0]);
      data.append('resource_type', 'image');

      const response2 = await axios.post(
        `https://api.cloudinary.com/v1_1/de1g2bwml/image/upload`,
        data
      );
      setPfp(response2.data.secure_url);
    }
  };
  const changeName = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/account/settings/name`, {
        ...name,
        password,
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    } finally {
      setLoading(false);
    }
  };
  const changePfp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/account/settings/pfp`, {
        pfp,
        password,
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    } finally {
      setLoading(false);
    }
  };
  const changePhoneNumber = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/account/settings/phoneNumber`, {
        phoneNumber,
        password,
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    } finally {
      setLoading(false);
    }
  };
  const changeEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/account/settings/email`, {
        email,
        password,
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    } finally {
      setLoading(false);
    }
  };
  const changeSalary = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/account/settings/salary`, {
        salary,
        salaryType,
        password,
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center border border-gray-200 bg-background">
      {response?.message && (
        <Snackbar
          sx={{ color: response.success ? 'green' : 'red' }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={response.message ? true : false}
          message={response.message}
        />
      )}
      {loading && <Loading />}
      <div className=" bg-background w-1/2 flex flex-col gap-12 h-screen rounded-xl shadow-md p-6 mx-auto my-10 border border-gray-200">
        {/* <Button onClick={handleOpen}>asdfasd</Button> */}
        <div className="p-20 mx-auto flex flex-col items-center justify-center gap-4">
          Хэрэглэгчийн Статус:{' '}
          {user?.role === 'CLIENT' ? 'Компани/Үйлчлүүлэгч' : 'Freelancer/Ажил горилогч/Талент'}
        </div>
        <div className="flex justify-center items-center gap-4">
          <Tabs defaultValue="pfp" className="w-full items-center">
            <TabsList>
              <TabsTrigger className=" cursor-pointer" value="pfp">
                Нүүр зураг
              </TabsTrigger>
              <TabsTrigger className=" cursor-pointer" value="name">
                Нэр
              </TabsTrigger>
              <TabsTrigger className=" cursor-pointer" value="phoneNumber">
                Утасны дугаар
              </TabsTrigger>
              <TabsTrigger className=" cursor-pointer" value="email">
                Емайл
              </TabsTrigger>
              <TabsTrigger className=" cursor-pointer" value="salary">
                Цалингийн хүлээлт
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pfp">
              <div className=" flex flex-col gap-7 items-center justify-center">
                <Image
                  onClick={clickInput}
                  src={`${pfp ? pfp : user?.pfp ? user.pfp : `/placeholder.png`}`}
                  width={100}
                  height={100}
                  alt="pfp"
                  className=" rounded-full cursor-pointer"
                />
                <input
                  disabled={loading}
                  type="file"
                  className="hidden"
                  onChange={handleNewPfp}
                  ref={inputRef}
                />
                <div>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Нууц үг"
                    type="password"
                  />
                  <Button sx={{ color: 'green' }} onClick={changePfp}>
                    Солих
                  </Button>
                  <Button
                    sx={{ color: 'green' }}
                    onClick={() => {
                      setPfp('');
                    }}
                  >
                    Болих
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="name">
              <div className="flex gap-2.5 flex-col items-center justify-center">
                <div className="flex gap-3 justify-center">
                  <div>
                    <Label className="lastName">Овог</Label>
                    <Input
                      onChange={(e) => {
                        setName((prev) => {
                          return {
                            ...prev,
                            lastName: e.target.value,
                          };
                        });
                      }}
                      id="lastName"
                      name="lastName"
                      defaultValue={name?.lastName ? name.lastName : ''}
                      disabled={loading}
                      placeholder="Овог"
                    />
                  </div>
                  <div>
                    <Label className="" htmlFor="firstName">
                      Нэр
                    </Label>
                    <Input
                      onChange={(e) => {
                        setName((prev) => {
                          return {
                            ...prev,
                            firstName: e.target.value,
                          };
                        });
                      }}
                      id="firstName"
                      name="firstName"
                      defaultValue={name?.firstName ? name.firstName : ''}
                      disabled={loading}
                      placeholder="Нэр"
                    />
                  </div>
                </div>
                <div>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Нууц үг"
                    type="password"
                  />
                  <Button sx={{ color: 'green' }} onClick={changeName}>
                    Солих
                  </Button>
                  <Button
                    sx={{ color: 'green' }}
                    onClick={() => {
                      setName({
                        firstName: '',
                        lastName: '',
                      });
                    }}
                  >
                    Болих
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="phoneNumber">
              <Input
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                value={phoneNumber ? phoneNumber : ''}
                disabled={loading}
                placeholder="Утасны дугаар"
              />
              <div>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Нууц үг"
                  type="password"
                />
                <Button sx={{ color: 'green' }} onClick={changePhoneNumber}>
                  Солих
                </Button>
                <Button
                  sx={{ color: 'green' }}
                  onClick={() => {
                    setPhoneNumber('');
                  }}
                >
                  Болих
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="email">
              <div className="flex gap-3">
                <Input
                  value={email ? email : ''}
                  disabled={loading}
                  placeholder="Емайл"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Нууц үг"
                  type="password"
                />
                <Button sx={{ color: 'green' }} onClick={changeEmail}>
                  Солих
                </Button>
                <Button
                  sx={{ color: 'green' }}
                  onClick={() => {
                    setEmail('');
                  }}
                >
                  Болих
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="salary">
              <div className="flex flex-col items-center gap-6">
                <div className="flex">
                  <Input
                    onChange={(e) => {
                      setSalary(Number(e.target.value));
                    }}
                    value={salary ? salary : 0}
                    disabled={loading}
                    placeholder="Цалингийн хүлээлт"
                    type="number"
                  />
                  <div className="flex gap-1">
                    {['MONTH', 'DAY', 'HOUR'].map((type) => (
                      <div key={type} className="flex">
                        <Checkbox
                          sx={{ color: 'green' }}
                          onChange={() => {
                            setSalaryType(type);
                          }}
                          checked={salaryType === type}
                          id={type}
                          name="SalaryType"
                        />
                        <Label htmlFor={type}>
                          {type === 'MONTH' ? 'Сар' : type === 'HOUR' ? 'Цаг' : 'Өдөр'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Нууц үг"
                    type="password"
                  />
                  <Button sx={{ color: 'green' }} onClick={changeSalary}>
                    Солих
                  </Button>
                  <Button
                    sx={{ color: 'green' }}
                    onClick={() => {
                      setSalary(user?.salary ? user.salary : 0);
                      setSalaryType(user?.salaryType ? user.salaryType : '');
                    }}
                  >
                    Болих
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className=" flex flex-col justify-around">
          <div className="flex flex-col items-center"></div>
        </div>
      </div>
    </div>
  );
}
