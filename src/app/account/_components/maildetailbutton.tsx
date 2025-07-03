'use client';

import { responseData } from '@/lib/types';
import { Snackbar } from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ImSpinner10 } from 'react-icons/im';
type Props = {
  id: string;
  setChange: Dispatch<SetStateAction<boolean>>;
  change: boolean;
};
export default function MailDetail({ id, setChange, change }: Props) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [sentMail, setSentMail] = useState(false);
  const [res, setResponse] = useState<responseData>();
  const sendDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/sendMail', { id });

      setResponse(res.data);
      if (res.data.success) {
        localStorage.setItem('sendMailToUser', id);
        setChange((p) => !p);
      }
      setAlert(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const sendMailToUser = localStorage.getItem('sendMailToUser');
    if (sendMailToUser === id) {
      setSentMail(true);
    } else {
      setSentMail(false);
    }
  }, [change]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);
  return (
    <button
      disabled={loading || sentMail}
      onClick={sendDetails}
      className={` ${
        loading || sentMail ? ' bg-muted' : ` hover:`
      } cursor-pointer  px-4 py-2 rounded  text-sm`}
    >
      {alert && res && (
        <Snackbar
          sx={{ color: res?.success ? 'green' : 'red' }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={res?.message ? true : false}
          message={res?.message}
        />
      )}
      {loading ? (
        <div className=" flex items-center gap-2">
          <div>
            <ImSpinner10 className=" animate-spin" />
          </div>
          <div>{sentMail ? `Урилга илгээсэн байна!` : `Урилга илгээж байна`}</div>
        </div>
      ) : sentMail ? (
        `Урилга илгээсэн байна!`
      ) : (
        ` Холбоо барих хүсэлт илгээх!`
      )}
    </button>
  );
}
