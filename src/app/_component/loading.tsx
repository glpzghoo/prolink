"use client";

import { LinearProgress, ThemeProvider } from "@mui/material";
import { LoaderCircle } from "lucide-react";
import { theme } from "@/lib/theme";
import { motion, Variants, easeOut, easeInOut } from "framer-motion";

const loadingVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: easeInOut },
  },
};

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center w-full h-screen bg-gray-100/50 backdrop-blur-sm z-[99]">
      <div className="w-full max-w-md px-4 mb-6">
        <ThemeProvider theme={theme}>
          <LinearProgress
            color="secondary"
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#14A800",
                transition: "transform 0.5s ease-in-out",
              },
            }}
          />
        </ThemeProvider>
      </div>

      <motion.div
        className="flex flex-col items-center gap-4"
        variants={loadingVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="text-4xl font-extrabold text-[#14A800] drop-shadow-md"
          variants={pulseVariants}
          animate="animate"
        >
          ProLink
        </motion.div>
        <div className="flex items-center gap-3 text-gray-700">
          <span className="text-lg font-medium">Түр хүлээнэ үү!</span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <LoaderCircle className="w-6 h-6 text-[#14A800]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
