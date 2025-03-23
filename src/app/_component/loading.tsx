import { theme } from "@/lib/theme";
import { LinearProgress, ThemeProvider } from "@mui/material";
import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <div className="w-full">
        <ThemeProvider theme={theme}>
          <LinearProgress color="secondary" sx={{ color: "green" }} />
        </ThemeProvider>
      </div>
      <div className="text-3xl font-extrabold text-green-600/40 animate-pulse fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-50 backdrop-blur-2xl">
        ProLink
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
