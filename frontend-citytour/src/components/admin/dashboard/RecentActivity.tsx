import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
    {
        id: 1,
        user: {
            name: "John Smith",
            image: "/placeholder.svg?height=32&width=32",
            initials: "JS",
        },
        action: "checked in",
        target: "Room 101",
        time: "10 minutes ago",
        status: "success",
    },
    {
        id: 2,
        user: {
            name: "Sarah Johnson",
            image: "/placeholder.svg?height=32&width=32",
            initials: "SJ",
        },
        action: "made a reservation",
        target: "Room 205",
        time: "30 minutes ago",
        status: "info",
    },
    {
        id: 3,
        user: {
            name: "Michael Brown",
            image: "/placeholder.svg?height=32&width=32",
            initials: "MB",
        },
        action: "cancelled reservation",
        target: "Room 310",
        time: "1 hour ago",
        status: "warning",
    },
    {
        id: 4,
        user: {
            name: "Emily Davis",
            image: "/placeholder.svg?height=32&width=32",
            initials: "ED",
        },
        action: "checked out",
        target: "Room 402",
        time: "2 hours ago",
        status: "secondary",
    },
    {
        id: 5,
        user: {
            name: "David Wilson",
            image: "/placeholder.svg?height=32&width=32",
            initials: "DW",
        },
        action: "requested room service",
        target: "Room 115",
        time: "3 hours ago",
        status: "info",
    },
]

const RecentActivity = () => {
    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 rounded-lg border p-3">
                    <Avatar>
                        <AvatarImage src={activity.user.image} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.initials}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
                            <span className="font-semibold">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>

                    <Badge
                        variant={
                            activity.status === "success"
                                ? "default"
                                : activity.status === "warning"
                                    ? "destructive"
                                    : activity.status === "info"
                                        ? "outline"
                                        : "secondary"
                        }
                    >
                        {activity.status === "success"
                            ? "Completed"
                            : activity.status === "warning"
                                ? "Cancelled"
                                : activity.status === "info"
                                    ? "In Progress"
                                    : "Finished"}
                    </Badge>
                </div>
            ))}
        </div>
    )
}

export default RecentActivity