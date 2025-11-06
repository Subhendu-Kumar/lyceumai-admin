"use client";

import clsx from "clsx";
import Link from "next/link";

import { ReactNode, use } from "react";
import { usePathname } from "next/navigation";

const ClassMeetingsLayout = ({
  params,
  children,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const pathname = usePathname();

  const links = [
    { href: `/class/${id}/meetings`, label: "Ended Meetings" },
    { href: `/class/${id}/meetings/upcoming`, label: "Upcoming Meetings" },
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full h-12 bg-purple-50 rounded-lg py-2 flex items-center justify-center space-x-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "px-3 py-0.5 rounded-lg transition hover:bg-purple-100 hover:translate-x-1",
              pathname === href
                ? "bg-purple-200 text-purple-800 font-semibold"
                : "text-gray-800 hover:text-purple-800"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="w-full h-[calc(100%-3rem)] overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default ClassMeetingsLayout;
