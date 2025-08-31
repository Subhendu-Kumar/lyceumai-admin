import React from "react";
import { Card } from "@/components/ui/card";
import { Folder, MoreVertical, TrendingUp } from "lucide-react";

interface ClassCardProps {
  title: string;
  color?: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  color = "bg-rose-600",
}) => {
  return (
    <Card className="rounded-2xl overflow-hidden flex flex-col justify-between h-72 shadow-sm border p-0">
      {/* Header */}
      <div className={`h-28 ${color} flex items-start justify-between p-4`}>
        <h2 className="text-white font-semibold text-lg underline">{title}</h2>
      </div>
      <div className="flex items-center justify-between border-t bg-white p-6">
        <div className="flex space-x-4">
          <TrendingUp className="h-5 w-5 text-gray-700" />
          <Folder className="h-5 w-5 text-gray-700" />
        </div>
        <MoreVertical className="h-5 w-5 text-gray-700" />
      </div>
    </Card>
  );
};

export default ClassCard;
