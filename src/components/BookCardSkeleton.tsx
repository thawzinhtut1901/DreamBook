import { Skeleton } from "./ui/skeleton";

const BookCardSkeleton = ({ className = "" }) => {
  return (
    <Skeleton
      className={`rounded-[8px] mr-[21px] lg:w-[232px] min-w-[160px] max-w-[210px] h-[280px] bg-gray-200 ${className}`}
    />
  );
};

export default BookCardSkeleton;
