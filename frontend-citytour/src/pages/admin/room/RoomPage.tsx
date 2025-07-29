import RoomList from "@/components/admin/room/RoomList"
import { Button } from "@/components/ui/button"
import PageHeader from "@/layouts/admin/Page-header"
import routes from "@/routes/routes"
import { Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RoomPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 md:ml-56">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <PageHeader title="Phòng" description="Quản lý các phòng" />

        <div className="flex gap-2 justify-end">
          <Button size="sm" onClick={() => navigate(routes.addRoom)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm phòng
          </Button>
          <div>
            <Button size="sm" variant="destructive" onClick={() => navigate(routes.trashRoom)}><Trash2 /></Button>
          </div>
        </div>
      </div>
      <RoomList />
    </div>
  )
}
export default RoomPage