import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, House, User, BedDouble, ArrowLeft, RefreshCw } from "lucide-react"
import { priceFormat } from "@/helpers/formatHelper"
import { useDeleteRoom, useGetListTrashRoom, useGetRoomCruiseSlug, useRestoreRoom } from "@/hooks/admin/room/useRoom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetAllCruises } from "@/hooks/admin/cruise/useCruise"
import { useNavigate } from "react-router-dom"
import { useGetSlugParams } from "@/hooks/common/useGetSlugParams"
import routes from "@/routes/routes"
import PageHeader from "@/layouts/admin/Page-header"

const TrashRoom = () => {
    const slug = useGetSlugParams('tab')
    const navigate = useNavigate()
    const { data: roomData, isLoading } = useGetListTrashRoom()
    const { data: cruiseData } = useGetAllCruises()
    const { data: roomByCruise } = useGetRoomCruiseSlug(slug!)
    const { mutateAsync: deleteRoom } = useDeleteRoom()
    const { mutateAsync: restoreRoom } = useRestoreRoom()

    const handleDeleteRoom = async (slug: string) => {
        await deleteRoom(slug)
    }

    const handleRestore = async (slug: string) => {
        await restoreRoom(slug)
    }

    const handleTabChange = (value: string) => {
        navigate(`?tab=${value}`)
    }

    if (isLoading) return <div>...Loading</div>
    return (
        <div className="flex flex-col gap-6 p-6 md:p-8 md:ml-56">
            <div className="flex justify-between gap-2 items-center">
                <PageHeader title="Thùng rác" description="Quản lý các phòng" />
                <div onClick={() => navigate(routes.roomList)} className="flex items-center"> <ArrowLeft /> <span>Trở về</span></div>
            </div>
            <Tabs defaultValue="all" onValueChange={handleTabChange}>
                <TabsList className="mb-4">
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    {cruiseData && cruiseData.map((cruise) => (
                        <TabsTrigger key={cruise._id} value={cruise.slug}>{cruise.name}</TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="all">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {roomData && roomData.map((room) => (
                            <Card key={room._id} className="overflow-hidden">
                                <div className="relative">
                                    <img src={room?.image} alt={room.name} className="h-48 w-full object-cover" />
                                    <Badge className="absolute right-2 top-2" variant={{
                                        available: "default",
                                        booked: "warning",
                                        maintenance: "secondary",
                                    }[room.status] ?? "default"}>
                                        {room.status}
                                    </Badge>
                                </div>

                                <CardHeader>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold flex gap-2">
                                            <House className="h-5 w-5 mt-1" />
                                            {room.name}
                                        </h3>
                                        <div className="flex gap-5">
                                            <p className="flex items-center gap-1 text-base">
                                                <User size={16} />
                                                <span className="font-medium">{room.max_guests}</span>
                                            </p>
                                            <p className="flex items-center gap-1 text-base">
                                                <BedDouble size={16} />
                                                <span className="font-medium">{room.area} m²</span>
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex justify-between items-center">
                                    <p className="text-lg font-bold">{priceFormat(room.price)}</p>
                                </CardContent>

                                <CardFooter className="flex justify-between">
                                    <Button onClick={() => handleRestore(room.slug)} variant="outline" size="sm">
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Khôi phục
                                    </Button>
                                    <Button onClick={() => handleDeleteRoom(room.slug)} variant="outline" size="sm" className="text-destructive">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Xóa
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {cruiseData?.map((cruise) => (
                    <TabsContent key={cruise._id} value={cruise.slug}>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {roomByCruise
                                ?.filter((room) => room.cruise_id === cruise._id)
                                .map((room) => (
                                    <Card key={room._id} className="overflow-hidden">
                                        <Card key={room._id} className="overflow-hidden">
                                            <div className="relative">
                                                <img src={room?.image} alt={room.name} className="h-48 w-full object-cover" />
                                                <Badge className="absolute right-2 top-2" variant={{
                                                    available: "default",
                                                    booked: "warning",
                                                    maintenance: "secondary",
                                                }[room.status] ?? "default"}>
                                                    {room.status}
                                                </Badge>
                                            </div>

                                            <CardHeader>
                                                <div className="space-y-1">
                                                    <h3 className="text-xl font-bold flex gap-2">
                                                        <House className="h-5 w-5 mt-1" />
                                                        {room.name}
                                                    </h3>
                                                    <div className="flex gap-5">
                                                        <p className="flex items-center gap-1 text-base">
                                                            <User size={16} />
                                                            <span className="font-medium">{room.max_guests}</span>
                                                        </p>
                                                        <p className="flex items-center gap-1 text-base">
                                                            <BedDouble size={16} />
                                                            <span className="font-medium">{room.area} m²</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="flex justify-between items-center">
                                                <p className="text-lg font-bold">{priceFormat(room.price)}</p>
                                            </CardContent>

                                            <CardFooter className="flex justify-between">
                                                <Button onClick={() => navigate(routes.editRoom.replace(":slug", room.slug))} variant="outline" size="sm">
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Sửa
                                                </Button>
                                                <Button onClick={() => handleDeleteRoom(room.slug)} variant="outline" size="sm" className="text-destructive">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Xóa
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>

    )
}

export default TrashRoom;