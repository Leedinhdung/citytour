import React from "react";
import Header from "@/components/client/header/Header";
import Footer from "@/components/client/footer/Footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-4 pt-[130px] sm:pt-[100px]">{children}</main>
            <Footer />
        </div>
    )
}
export default ClientLayout;