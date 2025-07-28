import DashboardStats from "@/components/admin/dashboard/Dashboard-stats"
import RecentActivity from "@/components/admin/dashboard/RecentActivity"
import RevenueChart from "@/components/admin/dashboard/RevenueChart"
import RoomOccupancy from "@/components/admin/dashboard/RoomOccupancy"
import PageHeader from "@/layouts/admin/Page-header"

const Dashboard = () => {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6 md:p-8 md:ml-60">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <PageHeader
                    title="Dashboard"
                    description="Hotel management overview and statistics"
                />
                {/* <HotelSelector /> */}
            </div>

            <DashboardStats />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-medium">Revenue Overview</h3>
                    <RevenueChart />
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-medium">Room Occupancy</h3>
                    <RoomOccupancy />
                </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-medium">Recent Activity</h3>
                <RecentActivity />
            </div>
        </div>
    )
}
export default Dashboard