"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HistoryIcon, HomeIcon, LightbulbIcon, TestTubeIcon } from "lucide-react";

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

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[240px] p-4 flex flex-col h-full">
      <Link className="flex items-center justify-start gap-4 pl-4 mb-12" href={"/"}>
        <Image src="/favicon.ico" alt="MedHelper AI Logo" width={32} height={32} className="h-8 w-8" />
        <span className="text-xl font-bold bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] bg-clip-text text-transparent">
          MedHelper
        </span>
      </Link>

      <nav className="flex-1 flex flex-col justify-between space-y-2">
        <div className="flex flex-col space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`group relative flex items-center p-3 rounded-lg transition-all duration-300 ${
                pathname === item.link
                  ? "bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] text-white shadow-md shadow-[#39ae9f]/30"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-[#39ae9f]/20 hover:to-[#2c8c80]/20 hover:shadow-lg hover:shadow-[#39ae9f]/20 hover:scale-105"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        <SignOutButton />
      </nav>
    </div>
  );
};

export default SideBar;
