"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";

const ClassMobileSidebar = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const pathname = usePathname();
  const { id } = use(params);

  const links = [
    { href: `/class/${id}`, label: "Stream" },
    { href: `/class/${id}/announcements`, label: "Announcements" },
    { href: `/class/${id}/assignments`, label: "Assignments" },
    { href: `/class/${id}/materials`, label: "Materials" },
    { href: `/class/${id}/quiz`, label: "Quiz" },
    { href: `/class/${id}/people`, label: "People" },
  ];

  return (
    <Sheet>
      <SheetTrigger>
        <button className="p-2 rounded-full hover:bg-gray-100 md:hidden">
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 p-6 bg-blue-50 border-r shadow-lg"
      >
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
          <p className="text-sm text-gray-500">Quick navigation</p>
        </div>
        <nav className="flex flex-col space-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200",
                pathname === href
                  ? "bg-indigo-500 text-white shadow-sm font-medium"
                  : "text-gray-700 bg-indigo-100"
              )}
            >
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default ClassMobileSidebar;
