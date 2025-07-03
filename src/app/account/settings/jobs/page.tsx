'use client';
import Loading from '@/app/_component/loading';
import { Textarea } from '@/components/ui/textarea';
import { calculateTime } from '@/lib/helper';
import { responseData } from '@/lib/types';
import { Button, Input, Snackbar, ThemeProvider } from '@mui/material';
import { job } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { theme } from '@/lib/theme';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type CustomJob = job & {
  postedAt: string;
};

type CustomUser = {
  role: string;
  jobpost: CustomJob[];
};

export default function AboutSettings() {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [response, setResponse] = useState<responseData>();
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState('');

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setPostId(id);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const sendChanges = async (id: string) => {
    setOpen(false);
    if (!title && !description) {
      return;
    }
    try {
      setWaiting(true);
      const res = await axios.post(`/api/job/post?id=${id}`, {
        description,
        title,
      });
      setResponse(res.data);
      if (res.data.success) {
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWaiting(false);
    }
  };
  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await axios.get('/api/account');
        if (res.data.success) {
          setUser(res.data.data.informations);
        }
      } catch (err) {
        console.error('Сервертэй холбогдож чадсангүй!', err);
      } finally {
        setLoading(false);
      }
    };
    getInfo();
  }, [refresh]);

  const deActivate = async (id: string) => {
    try {
      setWaiting(true);

      const res = await axios.delete(`/api/job/post?id=${id}`);
      setResponse(res.data);

      if (res.data.success) {
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err, 'Сервертэй холбогдож чадсангүй!');
    } finally {
      setWaiting(false);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [response]);

  return !loading && user ? (
    <div className="bg-secondary flex flex-col items-center">
      {user?.role === 'CLIENT' ? (
        <>
          <Snackbar
            sx={{ color: response?.success ? 'green' : 'red' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(response?.message)}
            message={response?.message}
          />
          {waiting && <Loading />}
          <div className="bg-background w-1/2 shadow-lg p-4">
            <h2 className="font-bold mb-4">Таны оруулсан ажлын саналууд:</h2>
            {user.jobpost.length > 0 ? (
              <div className="flex justify-center flex-col p-2 py-2 gap-1">
                {user.jobpost.map((post, i) => (
                  <div
                    className={`${
                      user.jobpost.length > i + 1 && `border-b border-gray-200`
                    } py-5 relative flex flex-col gap-1`}
                    key={post.id}
                  >
                    <div className=" flex justify-between">
                      <Link target="blank" href={`/job/${post.id}`}>
                        <div className="font-bold">{post.title}</div>
                      </Link>
                      <div className="flex justify-end font-semibold text-green-700  absolute top-0 right-0">
                        <div>Таны амласан цалин: {post.salary}</div>/
                        <div>
                          {post.salaryRate === 'MONTH'
                            ? `сар`
                            : post.salaryRate === 'DAY'
                            ? 'өдөр'
                            : `цаг`}
                        </div>
                      </div>
                    </div>
                    <ThemeProvider theme={theme}>
                      <React.Fragment>
                        <Button
                          sx={{
                            justifyContent: 'start',
                            textTransform: 'none',
                          }}
                          className="flex justify-start text-start"
                          color="inherit"
                          onClick={() => handleClickOpen(post.id)}
                        >
                          <div className=" whitespace-pre-wrap"> {post.description}</div>
                        </Button>
                        <Dialog
                          open={open && post.id === postId}
                          TransitionComponent={Transition}
                          keepMounted
                          onClose={handleClickClose}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogTitle>
                            Гарчиг
                            <Input
                              className="w-full"
                              defaultValue={post.title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText
                              className="text-start"
                              id="alert-dialog-slide-description"
                            >
                              Дэлгэрэнгүй
                              <Textarea
                                onChange={(e) => setDescription(e.target.value)}
                                rows={100}
                                defaultValue={post.description}
                              />
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClickClose}>Болих</Button>
                            <Button onClick={() => sendChanges(post.id)}>Засах</Button>
                          </DialogActions>
                        </Dialog>
                      </React.Fragment>
                    </ThemeProvider>

                    <div>Байршил: {post.jobLocation}</div>
                    <div className="flex justify-between">
                      <div className="text-gray-400/70 text-xs absolute bottom-2 left-0">
                        Зар үүссэн огноо: {post.postedAt.split('T')[0]} (
                        {calculateTime(post.postedAt)})
                      </div>
                      <div className="flex  absolute bottom-2 right-0">
                        <div>харсан: </div>
                        <div>{post.jobPostView}</div>
                      </div>
                    </div>
                    <div>{post.experienced}</div>
                    <div>
                      {post.status === 'ACTIVE' ? (
                        <div className=" text-[#14A800] text-sm font-semibold absolute top-0 left-0 flex items-center gap-1">
                          <GoDotFill className="animate-ping duration-4000" />
                          <p>идэвхитэй пост</p>
                        </div>
                      ) : post.status === 'CLOSED' ? (
                        <div className=" text-pink-400/70 text-sm font-semibold absolute top-0 left-0 flex items-center gap-1">
                          <p>идэвхигүй пост</p>
                        </div>
                      ) : (
                        <div className=" text-gray-400/70 text-sm font-semibold absolute top-0 left-0 flex items-center gap-1">
                          <p>Ноорог пост</p>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        deActivate(post.id);
                      }}
                      sx={{
                        color: post.status === 'CLOSED' ? 'green' : 'red',
                      }}
                      className={` ${
                        post.status === 'ACTIVE' ? ' text-green-500' : 'text-red-500'
                      }`}
                    >
                      {post.status == 'ACTIVE' ? 'Идэвхигүй болгох' : 'Идэвхитэй болгох'}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Таньд оруулсан ажлын санал алга!</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center min-h-screen content-center">Холбоос буруу байна!</div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
