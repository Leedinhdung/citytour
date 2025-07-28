import CruisesList from "@/components/admin/cruise/CruiseList"
import { Button } from "@/components/ui/button"
import PageHeader from "@/layouts/admin/Page-header"
import routes from "@/routes/routes"
import { Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CruisesPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 md:ml-56">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <PageHeader title="Du thuyền" description="Quản lý các du thuyền" />
        <div className="flex gap-2 justify-end">
          <Button size="sm" onClick={() => navigate(routes.addCruise)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm du thuyền
          </Button>
          <div>
            <Button size="sm" variant="destructive" onClick={() => navigate(routes.trashCruise)}><Trash2 /></Button>
          </div>
        </div>
      </div>
      <CruisesList />
    </div>
  )
}