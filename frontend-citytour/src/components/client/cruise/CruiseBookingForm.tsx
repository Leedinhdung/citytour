import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { priceFormat } from "@/helpers/formatHelper";
import { useCreateBooking } from "@/hooks/client/booking/useBooking";
import { IBooking } from "@/types/booking";
import { ICruiseDetail } from "@/types/cruise";
import { IRoom } from "@/types/room";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface BookingFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    cruise: ICruiseDetail | null
    selectedRooms: {
        room: IRoom;
        count: number;
    }[];
}

const CruiseBookingForm = ({ open, onOpenChange, selectedRooms, cruise }: BookingFormProps) => {
    const [rooms, setRooms] = useState(selectedRooms);
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);
    const { mutateAsync: createBooking } = useCreateBooking()
    const { register, handleSubmit, formState: { errors } } = useForm<IBooking>({
    });

    useEffect(() => {
        setRooms(selectedRooms);
    }, [selectedRooms]);

    const handleRoomCountChange = (index: number, delta: number) => {
        setRooms(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, count: Math.max(1, item.count + delta) } : item
            )
        );
    };

    const totalPrice = rooms.reduce((sum, item) => sum + item.room.price * item.count, 0);

    const onSubmit: SubmitHandler<IBooking> = async (data) => {
        const payload = {
            cruiseId: cruise!._id,
            date: data.date,
            name: data.name,
            phone: data.phone,
            email: data.email,
            note: data.note,
            adults: adult,
            children: child,
            rooms: rooms.map(item => ({
                roomId: item.room._id,
                roomName: item.room.name,
                quantity: item.count,
                price: item.room.price
            })),
            totalPrice,
        };

        console.log("📌 Payload gửi API:", payload);
        await createBooking(payload)
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Đặt du thuyền</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Room summary */}
                    {rooms.map(({ room, count }, index) => (
                        <div key={index} className="flex items-start justify-between gap-4 border rounded-lg p-4">
                            <img
                                src={room?.image}
                                alt={room?.name}
                                className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold underline text-sm">{room?.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {room?.area} m² · Tối đa: {room?.max_guests} người
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">{room?.price?.toLocaleString()} đ</p>
                                <span className="text-sm text-gray-500">/khách</span>
                                <div className="flex items-center border rounded-full px-2">
                                    <button type="button" onClick={() => handleRoomCountChange(index, -1)}>
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-3">{count}</span>
                                    <button type="button" onClick={() => handleRoomCountChange(index, 1)}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Date + Guest */}
                    <div className="grid grid-cols-2 gap-4 mt-4 relative">
                        <div>
                            <Label className="block text-sm font-medium mb-1">Ngày nhận phòng</Label>
                            <div className="flex items-center border rounded px-3 py-2">
                                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                                <input type="date" {...register("date")} />
                            </div>
                            <span className="text-sm text-red-400">{errors.date?.message}</span>
                        </div>

                        <div className="relative">
                            <Label className="block text-sm font-medium mb-1">Số lượng</Label>
                            <div
                                className="relative border rounded px-3 py-2 cursor-pointer"
                                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                            >
                                <span>{adult} Người lớn - {child} Trẻ em</span>
                                {showGuestDropdown && (
                                    <div className="absolute bg-white shadow-lg rounded p-4 right-0 top-full mt-2 w-64 z-10">
                                        <div className="flex justify-between items-center mb-3">
                                            <span>Người lớn</span>
                                            <div className="flex gap-5 items-center border rounded-full px-2">
                                                <button type="button" onClick={() => setAdult(Math.max(1, adult - 1))}><Minus size={16} /></button>
                                                <span>{adult}</span>
                                                <button type="button" onClick={() => setAdult(adult + 1)}><Plus size={16} /></button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span>Trẻ em</span>
                                            <div className="flex gap-5 items-center border rounded-full px-2">
                                                <button type="button" onClick={() => setChild(Math.max(0, child - 1))}><Minus size={16} /></button>
                                                <span>{child}</span>
                                                <button type="button" onClick={() => setChild(child + 1)}><Plus size={16} /></button>
                                            </div>
                                        </div>
                                        <Button type="button" className="w-full mt-2" onClick={() => setShowGuestDropdown(false)}>Áp dụng</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User info */}
                    <div className="mt-4 space-y-4">
                        <Input placeholder="Họ và tên *" {...register("name")} />
                        <span className="text-sm text-red-400">{errors.name?.message}</span>

                        <Input placeholder="Số điện thoại *" {...register("phone")} />
                        <span className="text-sm text-red-400">{errors.phone?.message}</span>

                        <Input placeholder="Địa chỉ email *" type="email" {...register("email")} />
                        <span className="text-sm text-red-400">{errors.email?.message}</span>

                        <Textarea placeholder="Yêu cầu của bạn" rows={4} {...register("note")} />
                    </div>

                    {/* Total & buttons */}
                    <div className="flex justify-between items-center pt-4 border-t mt-6">
                        <p className="font-semibold text-lg">
                            Tổng tiền: {priceFormat(totalPrice)}
                        </p>
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" className="px-8 py-6 rounded-full">Đăng ký tư vấn</Button>
                            <Button className="px-8 py-6 rounded-full" variant="outline">Đặt ngay</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CruiseBookingForm;
