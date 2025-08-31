"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ClassSideBar = ({ params }: { params: Promise<{ id: string }> }) => {
  const pathname = usePathname();
  const { id } = React.use(params);

  const links = [
    { href: `/class/${id}`, label: "Stream" },
    { href: `/class/${id}/materials`, label: "Materials" },
    { href: `/class/${id}/people`, label: "People" },
    // { href: `/class/${id}/marks`, label: "Marks" },
  ];

  return (
    <div className="w-64 h-full bg-blue-50 shadow-sm p-6">
      {" "}
      <nav className="flex flex-col space-y-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "px-3 py-2 rounded-lg transition hover:bg-indigo-100 hover:translate-x-1",
              pathname === href
                ? "bg-indigo-200 text-indigo-800 font-semibold"
                : "text-gray-800 hover:text-indigo-800"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ClassSideBar;
