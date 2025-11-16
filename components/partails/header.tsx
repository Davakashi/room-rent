"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HistoryIcon, HomeIcon, LightbulbIcon, Menu, TestTubeIcon, X } from "lucide-react";

import SignOutButton from "@/app/auth/_components/button/signout-button";

const sidebarItems = [
  {
    id: 1,
    link: "/",
    name: "Нүүр хуудас",
    icon: <HomeIcon className="h-5 w-5 text-gray-700 group-hover:text-[#39ae9f] transition-colors duration-300" />,
  },
  {
    id: 2,
    link: "/labtest",
    name: "Шинжилгээ",
    icon: <TestTubeIcon className="h-5 w-5 text-gray-700 group-hover:text-[#39ae9f] transition-colors duration-300" />,
  },
  {
    id: 3,
    link: "/advice",
    name: "Зөвлөгөө",
    icon: <LightbulbIcon className="h-5 w-5 text-gray-700 group-hover:text-[#39ae9f] transition-colors duration-300" />,
  },
  {
    id: 4,
    link: "/history",
    name: "Түүх",
    icon: <HistoryIcon className="h-5 w-5 text-gray-700 group-hover:text-[#39ae9f] transition-colors duration-300" />,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sm:hidden bg-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <Link className="flex items-center gap-3" href="/">
          <Image src="/favicon.ico" alt="MedHelper AI Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-xl font-bold bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] bg-clip-text text-transparent">
            MedHelper
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute z-20 w-full bg-white">
          <nav className="flex flex-col space-y-2 px-4 pb-4 bg-gradient-to-b from-white to-[#39ae9f]/10">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                onClick={() => setIsMenuOpen(false)}
                className={`group flex items-center p-3 rounded-lg transition-all duration-300 ${
                  pathname === item.link
                    ? "bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] text-white shadow-md shadow-[#39ae9f]/30"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-[#39ae9f]/20 hover:to-[#2c8c80]/20 hover:shadow-lg hover:shadow-[#39ae9f]/20"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            <div className="pt-2">
              <SignOutButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
