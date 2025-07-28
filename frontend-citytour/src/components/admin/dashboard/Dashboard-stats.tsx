import { BedDouble, CalendarCheck, DollarSign, Users } from "lucide-react"

const DashboardStats = () => {
    return (
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                        <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                        <h3 className="text-2xl font-bold">$45,231</h3>
                    </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-green-500">
                    <span>↑ 12.5%</span>
                    <span className="ml-1 text-muted-foreground">vs last month</span>
                </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-500/10 p-3">
                        <CalendarCheck className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Bookings</p>
                        <h3 className="text-2xl font-bold">2,350</h3>
                    </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-green-500">
                    <span>↑ 8.2%</span>
                    <span className="ml-1 text-muted-foreground">vs last month</span>
                </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-amber-500/10 p-3">
                        <BedDouble className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Occupancy</p>
                        <h3 className="text-2xl font-bold">85%</h3>
                    </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-green-500">
                    <span>↑ 3.1%</span>
                    <span className="ml-1 text-muted-foreground">vs last month</span>
                </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-500/10 p-3">
                        <Users className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Guests</p>
                        <h3 className="text-2xl font-bold">573</h3>
                    </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-red-500">
                    <span>↓ 2.3%</span>
                    <span className="ml-1 text-muted-foreground">vs last month</span>
                </div>
            </div>
        </div>
    )
}

export default DashboardStats