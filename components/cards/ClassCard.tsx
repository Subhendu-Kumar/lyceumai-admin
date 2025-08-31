import React from "react";
import { Card } from "@/components/ui/card";
import { Edit, Folder, MoreVertical, Trash2, TrendingUp } from "lucide-react";
import { ClassRoom } from "@/types/classroom";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ClassCard = ({
  classroom,
  onDelete,
}: {
  classroom: ClassRoom;
  onDelete: (id: string) => Promise<void>;
}) => {
  const ClassRoomOptions = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2.5 hover:bg-gray-100 rounded-full cursor-pointer">
          <MoreVertical className="h-5 w-5 text-gray-700" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60 rounded-md shadow-lg border bg-white"
          align="end"
        >
          <DropdownMenuLabel className="font-semibold text-sm">
            {classroom.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-50">
            <Edit className="w-4 h-4 text-gray-600" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDelete(classroom.id)}
            className="flex items-center gap-2 text-red-600 hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <Card className="rounded-2xl overflow-hidden flex flex-col justify-between h-72 shadow-sm border p-0">
      <div className="h-28 bg-[url('/Math.jpg')] bg-cover bg-center  flex items-start justify-between p-4">
        <Link
          href={`/class/${classroom.id}`}
          className="text-white font-semibold text-xl underline"
        >
          {classroom.name}
        </Link>
      </div>
      <div className="flex items-center justify-between border-t bg-white p-6">
        <div className="flex space-x-4">
          <TrendingUp className="h-5 w-5 text-gray-700" />
          <Folder className="h-5 w-5 text-gray-700" />
        </div>
        <ClassRoomOptions />
      </div>
    </Card>
  );
};

export default ClassCard;
