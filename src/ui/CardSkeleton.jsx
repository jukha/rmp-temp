import { Skeleton } from "primereact/skeleton";

function CardSkeleton() {
  return (
    <div className="bg-white">
      <Skeleton
        shape="rectangle"
        width="full"
        height="15rem"
        className="mb-8 bg-blue-200 after:bg-blue-300"
      />

      {Array.from({ length: 5 }).map((_, i) => (
        <div className="mb-8">
          <div className="grid justify-center grid-cols-[repeat(5,57px)] grid-rows-[18px] gap-2">
            <Skeleton className=" bg-blue-200 after:bg-blue-300"></Skeleton>
            <Skeleton className=" bg-blue-200 after:bg-blue-300"></Skeleton>
            <Skeleton className=" bg-blue-200 after:bg-blue-300"></Skeleton>
            <Skeleton className=" bg-blue-200 after:bg-blue-300"></Skeleton>
            <Skeleton className=" bg-blue-200 after:bg-blue-300"></Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton;
