import Header from "@/components/admin/header/Header"
import Navbar from "@/components/admin/navbar/Navbar"

import React from "react"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
                <Navbar />
                <main className="flex-1 overflow-auto mt-16 md:ml-50">{children}</main>
            </div>
        </div>
    )
}
export default AdminLayout