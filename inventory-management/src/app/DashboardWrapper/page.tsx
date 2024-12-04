"use client";
import NavBar from "@/app/(components)/NavBar";
import SideBar from "@/app/(components)/SideBar";
import StoreProvider, { useAppSelector } from "../redux";
import { use, useEffect } from "react";
import { setIsDarkMode } from "@/state";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark"); // Dark mode
    }else {
      document.documentElement.classList.add("light"); // Light mode
    }
  });

  return (
    <div className={`${isDarkMode? "dark" : "light"} flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <SideBar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}
      >
        <NavBar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
