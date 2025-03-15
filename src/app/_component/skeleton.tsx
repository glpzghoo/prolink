import { Skeleton } from "@mui/material";

export default function CustomSkeleton() {
  return (
    <div className="flex gap-20 justify-center items-center">
      <div className="w-[70%] flex gap-10 justify-center flex-wrap">
        <Skeleton
          variant="rectangular"
          width={278}
          height={260}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={278}
          height={260}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={278}
          height={260}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={278}
          height={260}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={278}
          height={260}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={278}
          height={260}
          sx={{ borderRadius: "30px" }}
        />
      </div>
    </div>
  );
}
