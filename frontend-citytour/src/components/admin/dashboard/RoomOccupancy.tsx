import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
    { name: "Occupied", value: 65, color: "hsl(var(--primary))" },
    { name: "Reserved", value: 20, color: "#f59e0b" },
    { name: "Available", value: 10, color: "#10b981" },
    { name: "Maintenance", value: 5, color: "#6b7280" },
]

const RoomOccupancy = () => {
    return (
        <div className="flex flex-col items-center justify-center md:flex-row">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => [`${value}%`, ""]}
                        contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col gap-2 md:w-48">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                        <span className="ml-auto text-sm font-medium">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RoomOccupancy