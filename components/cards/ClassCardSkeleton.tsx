import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ClassCardSkeleton = () => {
  return (
    <Card className="rounded-2xl overflow-hidden flex flex-col justify-between h-60 shadow-sm border p-0">
      <Skeleton className="h-28 w-full" />
      <div className="flex items-center justify-between border-t bg-white p-6">
        <div className="flex space-x-4">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>
        <Skeleton className="h-5 w-5 rounded-md" />
      </div>
    </Card>
  );
};

export default ClassCardSkeleton;
