import { LinearProgress } from "@mui/material";
import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <div className="w-full">
        <LinearProgress color="secondary" sx={{ color: "green" }} />
      </div>
      {/* <div className="flex items-center gap-2">
        <div>Түр хүлээнэ үү!</div>
        <div>
          <ImSpinner2 className="animate-spin" />
        </div>
      </div> */}
    </div>
  );
}
