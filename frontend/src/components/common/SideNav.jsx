import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaTicket } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { IoIosSettings } from "react-icons/io";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";

export const SideNav = () => {
    const [open, setOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`;

    return (
        <>
            <div className="md:hidden flex items-center justify-between px-4 py-3 shadow">
                <h1 className="font-bold text-lg">Grievance System</h1>
                <button onClick={() => setOpen(!open)}>
                    {open ? <HiX size={28} /> : <HiMenuAlt2 size={28} />}
                </button>
            </div>

            <aside
                className={`fixed md:static top-0 left-0 h-screen w-64 bg-white shadow-lg
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <div className="p-5 border-b">
                    <h1 className="text-xl font-bold">Grievance System</h1>
                    <p className="text-sm text-gray-500">Admin Portal</p>
                </div>

                <nav className="p-4 space-y-2">
                    <NavLink to="/admin/dashboard" className={navLinkClass}>
                        <MdSpaceDashboard size={22} />
                        Dashboard
                    </NavLink>

                    <NavLink to="tickets" className={navLinkClass}>
                        <FaTicket size={22} />
                        Tickets
                    </NavLink>

                    <NavLink to="reports" className={navLinkClass}>
                        <GoGraph size={22} />
                        Reports & Analysis
                    </NavLink>

                    <NavLink to="users" className={navLinkClass}>
                        <FaUserFriends size={22} />
                        User Management
                    </NavLink>

                    <NavLink to="settings" className={navLinkClass}>
                        <IoIosSettings size={22} />
                        Settings
                    </NavLink>
                </nav>
            </aside>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};
