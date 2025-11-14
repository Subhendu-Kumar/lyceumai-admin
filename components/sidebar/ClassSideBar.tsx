"use client";

import Link from "next/link";

import {
  Users,
  Megaphone,
  FolderOpen,
  NotebookPen,
  ClipboardList,
  CalendarClock,
  LayoutDashboard,
} from "lucide-react";
import { use } from "react";
import { usePathname } from "next/navigation";
import { ClassNavLinks } from "@/types/miscellaneous";

const ClassSideBar = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const pathname = usePathname();

  const classNavLinks: ClassNavLinks[] = [
    { href: `/class/${id}`, label: "Dashboard", icon: LayoutDashboard },
    {
      href: `/class/${id}/announcements`,
      label: "Announcements",
      icon: Megaphone,
    },
    {
      href: `/class/${id}/meetings`,
      label: "Meetings",
      icon: CalendarClock,
    },
    {
      href: `/class/${id}/assignments`,
      label: "Assignments",
      icon: NotebookPen,
    },
    { href: `/class/${id}/materials`, label: "Materials", icon: FolderOpen },
    { href: `/class/${id}/quiz`, label: "Quiz", icon: ClipboardList },
    { href: `/class/${id}/people`, label: "Peoples", icon: Users },
  ];

  return (
    <div className="w-72 h-full bg-white border-r border-gray-200 p-6 hidden md:block">
      <nav className="flex flex-col space-y-2">
        {classNavLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              px-3 py-2 rounded-lg transition hover:bg-blue-100 flex items-center justify-start gap-3
              ${
                pathname === href
                  ? "bg-blue-200 text-blue-800 font-semibold"
                  : "text-gray-800 hover:text-blue-800"
              }
            `}
          >
            <Icon />
            <p>{label}</p>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ClassSideBar;
