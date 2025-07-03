import Loading from './loading';

export default function CustomSkeleton() {
  return (
    <div className="flex gap-20 justify-center items-center">
      <Loading />
      {/* <Skeleton
          variant="rectangular"
          width={700}
          height={700}
          sx={{ borderRadius: "30px" }}
        /> */}
      {/* <Skeleton
          variant="rectangular"
          width={700}
          height={260}
          sx={{ borderRadius: "30px" }}
        />

        <Skeleton
          variant="rectangular"
          width={700}
          height={260}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={700}
          height={260}
          sx={{ borderRadius: "30px" }}
        />

        <Skeleton
          variant="rectangular"
          width={700}
          height={260}
          sx={{ borderRadius: "30px" }}
        />
        <Skeleton
          variant="rectangular"
          width={700}
          height={260}
          sx={{ borderRadius: "30px" }}
        /> */}
    </div>
  );
}
