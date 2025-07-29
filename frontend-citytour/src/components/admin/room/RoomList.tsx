import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, House, User, BedDouble } from "lucide-react"
import { priceFormat } from "@/helpers/formatHelper"
import { useGetAllRooms, useGetRoomCruiseSlug, useSoftDeleteRoom } from "@/hooks/admin/room/useRoom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetAllCruises } from "@/hooks/admin/cruise/useCruise"
import { useNavigate } from "react-router-dom"
import { useGetSlugParams } from "@/hooks/common/useGetSlugParams"
import routes from "@/routes/routes"

const RoomList = () => {
    const slug = useGetSlugParams('tab')
    const navigate = useNavigate()
    const { data: roomData, isLoading } = useGetAllRooms()
    const { data: cruiseData } = useGetAllCruises()
    const { data: roomByCruise } = useGetRoomCruiseSlug(slug!)
    const { mutateAsync: softDelete } = useSoftDeleteRoom()
    
    const handleSoftDelete = async (slug: string) => {
        await softDelete(slug)
    }

    const handleTabChange = (value: string) => {
        navigate(`?tab=${value}`)
    }

    if (isLoading) return <div>...Loading</div>
    return (
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
                                <Button onClick={() => navigate(routes.editRoom.replace(':slug', room.slug))} variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Sửa
                                </Button>
                                <Button onClick={() => handleSoftDelete(room.slug)} variant="outline" size="sm" className="text-destructive">
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
                                            <Button onClick={() => handleSoftDelete(room.slug)} variant="outline" size="sm" className="text-destructive">
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

    )
}

export default RoomList;