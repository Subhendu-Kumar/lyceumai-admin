import Link from "next/link";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Plus, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const AccountDropDown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold cursor-pointer uppercase">
        {user?.name.split("")[0]}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 rounded-md shadow-lg border bg-white"
        align="end"
      >
        <DropdownMenuLabel className="font-semibold text-sm">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-50">
          <User className="w-4 h-4 text-gray-600" /> Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center gap-2 text-red-600 hover:bg-red-100"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="w-full h-16 bg-white lg:px-10 md:px-8 sm:px-6 px-4 border-b border-gray-200">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={"/logo.png"} height={45} width={45} alt="Logo" />
            <span className="text-lg font-semibold font-serif text-gray-800">
              Lyceum AI
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/create_class"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Plus className="h-6 w-6 text-gray-700" />
          </Link>
          <AccountDropDown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
