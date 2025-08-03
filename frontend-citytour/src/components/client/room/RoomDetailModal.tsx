import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IRoom } from "@/types/room"
import { Check, Sofa, UserRound } from "lucide-react"
import { priceFormat } from "@/helpers/formatHelper"
import { useState } from "react"

const RoomDetailModal = ({ room }: { room: IRoom }) => {
    const [mainImage, setMainImage] = useState(room.image);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-lg font-bold hover:underline">{room.name}</button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl">
                    {/* Left: Ảnh chính + ảnh nhỏ */}
                    <div>
                        <img
                            src={mainImage}
                            alt={room.name}
                            className="rounded-2xl w-full h-[400px] object-cover"
                        />
                        <div className="flex justify-center gap-2 mt-4 overflow-x-auto">
                            {room.thumbnail?.map((img: string, index: number) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Ảnh ${index}`}
                                    className={`w-16 h-16 object-cover rounded cursor-pointer transition duration-200 ${mainImage === img ? "ring-2" : ""
                                        }`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Thông tin phòng */}
                    <div className="flex flex-col justify-between h-[400px] gap-5 p-5">
                        <div className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">{room.name}</DialogTitle>
                            </DialogHeader>

                            <div className="text-gray-600 text-sm flex items-center gap-3">
                                <span className="flex items-center gap-1"><Sofa size={16} />{room.area} m²</span>
                                <span>|</span>
                                <span className="flex items-center gap-1">Tối đa: {room.max_guests} <UserRound size={16} /></span>
                            </div>

                            <ul className="grid grid-cols-2 gap-3">
                                {room.features?.map((f: string, idx: number) => (
                                    <li key={idx} className="text-lg flex items-center gap-2">
                                        <Check size={20} className="text-[#77dada]" /> <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Giá + nút chọn phòng */}
                        <div className="flex items-center justify-between pt-4">
                            <p className="font-bold text-2xl">{priceFormat(room.price)} / khách</p>
                            <Button variant="outline" className="py-5 px-5 rounded-full">Chọn phòng</Button>
                        </div>
                    </div>

                </div>

            </DialogContent>
        </Dialog>
    )
}
export default RoomDetailModal
