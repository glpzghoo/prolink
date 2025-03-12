"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ImSpinner10 } from "react-icons/im";
type Props = {
  id: string;
};
export default function MailDetail({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const sendDetails = async () => {
    setLoading(true);
    const res = await axios.post("/api/sendMail", { id });
    console.log(res.data);
    setLoading(false);
  };
  return (
    <button
      disabled={loading}
      onClick={sendDetails}
      className={` ${
        loading ? " bg-muted" : `bg-green-600 hover:bg-green-700`
      } cursor-pointer  px-4 py-2 rounded  text-sm`}
    >
      {loading ? (
        <div className=" flex items-center gap-2">
          <div>
            <ImSpinner10 className=" animate-spin" />
          </div>
          <div>Урилга илгээж байна</div>
        </div>
      ) : (
        ` Ажилд урь`
      )}
    </button>
  );
}
