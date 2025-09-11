import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { priceFormat } from "@/helpers/formatHelper"
import routes from "@/routes/routes"
import { ICruise } from "@/types/cruise"
import { MapPinned, Ship, Star } from "lucide-react"
import { Link } from "react-router-dom"

const CruiseCard = ({ cruise }: { cruise: ICruise }) => {
    return (
        <Link to={routes.detaiCruise.replace(':slug', cruise.slug)}>
            <div className="shadow border rounded-3xl w-96 p-5">
                <div className="relative w-[350px] h-[216px]">
                    <img
                        src={cruise.thumbnail}
                        alt=""
                        className="rounded-3xl w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 shadow">
                        <Star size={14} />
                        <span className="text-xs">4.9 (12) đánh giá</span>
                    </div>
                </div>

                <Badge variant="secondary" className="rounded-full items-center gap-2 text-gray-600 mt-2 font-normal"><MapPinned size={13} />Vịnh hạ long</Badge>
                <div className="flex flex-col gap-2 px-1 h-full">
                    <h2 className="text-lg font-bold text-[#475467]">{cruise.name}</h2>
                    <div className="flex items-center text-sm gap-2 text-gray-600">
                        <Ship size={16} />
                        <span> Hạ thuỷ {cruise.launch_year} - {cruise.cabin_count} phòng</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between mt-4">
                        <p className="font-bold">{priceFormat(cruise.base_price)} / khách</p>
                        <Button variant="secondary" className="rounded-full hover:bg-[#0e4f4f] hover:text-white">Đặt ngay</Button>
                    </div>
                </div>
            </div>
        </Link >
    )
}
export default CruiseCard