import { SideNav } from "@/components/common/SideNav";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="flex h-screen w-full">
            <aside className="hidden md:block w-64  text-white">
                <SideNav />
            </aside>

            <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
