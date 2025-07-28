// src/components/layout/navbar.tsx
import { Link, useLocation } from 'react-router-dom'

import { BarChart3, BedDouble, Calendar, CreditCard, Home, Hotel, Settings, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
    className?: string
}

const items = [
    {
        title: "Dashboard",
        href: "/quan-tri",
        icon: Home,
    },
    {
        title: "Quản lý du thuyền",
        href: "/quan-tri/du-thuyen",
        icon: Hotel,
    },
    {
        title: "Quản lý phòng",
        href: "/quan-tri/phong",
        icon: BedDouble,
    },
    {
        title: "Quản lý đặt lịch",
        href: "/quan-tri/dat-lich",
        icon: Calendar,
    },
    {
        title: "Quản lý khách hàng",
        href: "/quan-tri/khach-hang",
        icon: Users,
    },
    {
        title: "Payments",
        href: "/payments",
        icon: CreditCard,
    },
    {
        title: "Reports",
        href: "/reports",
        icon: BarChart3,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
]

const Navbar = ({ className }: NavbarProps) => {
    const location = useLocation()
    const pathname = location.pathname

    return (
        <nav className={cn("fixed bottom-0 top-0 hidden w-56 flex-col border-r bg-muted/40 p-4 md:flex mt-16", className)}>
            <div className="flex flex-col gap-2 py-2">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
export default Navbar