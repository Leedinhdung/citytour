import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Trash2, Ship, Sofa, RefreshCcw, ArrowLeft } from "lucide-react"
import { useDeleteCruise, useGetListTrashCruises, useRestoreCruise } from "@/hooks/admin/cruise/useCruise"
import { priceFormat } from "@/helpers/formatHelper"
import { useNavigate } from "react-router-dom"

import PageHeader from "@/layouts/admin/Page-header"
import routes from "@/routes/routes"

const TrashCruise = () => {
    const { data: cruisesData, isLoading } = useGetListTrashCruises()
    const { mutateAsync: restoreCruise } = useRestoreCruise();
    const { mutateAsync: deleteCruise } = useDeleteCruise();
    const navigate = useNavigate()

    const handleRestore = async (slug: string) => {
        await restoreCruise(slug)
    }
    const handleDelete = async (slug: string) => {
        await deleteCruise(slug)
    }
    if (isLoading) return <div>...Loading</div>
    return (
        <div className="flex flex-col gap-6 p-6 md:p-8 md:ml-56">
            <div className="flex justify-between gap-2 items-center">
                <PageHeader title="Thùng rác" description="Quản lý các du thuyền" />
                <div onClick={() => navigate(routes.cruiseList)} className="flex items-center"> <ArrowLeft /> <span>Trở về</span></div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
                {cruisesData && cruisesData.map((cruise) => (
                    <Card key={cruise._id} className="overflow-hidden">
                        <div className="relative">
                            <img src={cruise?.thumbnail} alt={cruise.name} className="h-48 w-full object-cover" />
                            {/* <Badge className="absolute right-2 top-2" variant={cruise.status === "Active" ? "default" : "secondary"}>
                            {cruise.status}
                        </Badge> */}
                        </div>

                        <CardHeader>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold flex gap-2">
                                    <Ship className="h-5 w-5 mt-1" />
                                    {cruise.name}
                                </h3>
                                <div className="flex text-muted-foreground text-xs items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {cruise.location}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-2 flex justify-between items-center">
                            <p className="text-lg font-bold">{priceFormat(cruise.base_price)}</p>
                            <p className="flex items-center gap-1 text-base">
                                <Sofa size={16} />
                                <span className="font-medium">{cruise.cabin_count}</span>
                            </p>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Button onClick={() => handleRestore(cruise.slug)} variant="outline" size="sm" >
                                <RefreshCcw className="h-4 w-4 mr-2" />
                                Khôi phục
                            </Button>
                            <Button onClick={() => handleDelete(cruise.slug)} variant="outline" size="sm" className="text-destructive" >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Xóa
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default TrashCruise