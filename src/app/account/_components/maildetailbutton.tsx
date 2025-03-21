"use client";

import { responseData } from "@/lib/types";
import { Snackbar } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
type Props = {
  id: string;
};
export default function MailDetail({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [res, setResponse] = useState<responseData>();
  const sendDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/sendMail", { id });

      setResponse(res.data);
      setAlert(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);
  console.log(res);
  return (
    <button
      disabled={loading}
      onClick={sendDetails}
      className={` ${
        loading ? " bg-muted" : `bg-green-600 hover:bg-green-700`
      } cursor-pointer  px-4 py-2 rounded  text-sm`}
    >
      {alert && res && (
        <Snackbar
          sx={{ color: res?.success ? "green" : "red" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={res?.message ? true : false}
          message={res?.message}
        />
      )}
      {loading ? (
        <div className=" flex items-center gap-2">
          <div>
            <ImSpinner10 className=" animate-spin" />
          </div>
          <div>Урилга илгээж байна</div>
        </div>
      ) : (
        ` Холбоо барих хүсэлт илгээх!`
      )}
    </button>
  );
}
