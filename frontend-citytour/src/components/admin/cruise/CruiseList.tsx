import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, MapPin, Trash2, Ship, Sofa } from "lucide-react"
import { useGetAllCruises, useSoftDeleteCruise } from "@/hooks/admin/cruise/useCruise"
import { priceFormat } from "@/helpers/formatHelper"
import { useNavigate } from "react-router-dom"
import routes from "@/routes/routes"

const CruisesList = () => {
    const { data: cruisesData, isLoading } = useGetAllCruises()
    const { mutateAsync: softDelete } = useSoftDeleteCruise();
    const navigate = useNavigate()

    const handleSoftDelete = async (slug: string) => {
        await softDelete(slug)
    }
    if (isLoading) return <div>...Loading</div>
    return (
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
                        <Button onClick={() => navigate(routes.editCruise.replace(':slug', cruise.slug))} variant="outline" size="sm" >
                            <Edit className="h-4 w-4 mr-2" />
                            Sửa
                        </Button>
                        <Button onClick={() => handleSoftDelete(cruise.slug)} variant="outline" size="sm" className="text-destructive" >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default CruisesList