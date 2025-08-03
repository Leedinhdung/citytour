import RoomDetailModal from "@/components/client/room/RoomDetailModal";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { priceFormat } from "@/helpers/formatHelper";

import { useGetDetailCruise } from "@/hooks/client/detail/useDetail";
import { useGetSlugParams } from "@/hooks/common/useGetSlugParams";
import { Anchor, ArrowRight, BriefcaseBusiness, House, MapPinned, MoveLeft, MoveRight, Sofa, Star, User, X } from "lucide-react"
import { useRef, useState } from "react";

const DetailTour = () => {
    const slug = useGetSlugParams('slug')
    const [currentIndex, setCurrentIndex] = useState(0);
    const [roomCount, setRoomCounts] = useState<{ [roomId: string]: number }>({});

    const { data: cruise, isLoading } = useGetDetailCruise(slug!);
    const galleryLength = cruise?.gallery?.length || 0;

    const goToPrev = () => {
        if (!galleryLength) return;
        setCurrentIndex((prev) => (prev === 0 ? galleryLength - 1 : prev - 1));
    };

    const goToNext = () => {
        if (!galleryLength) return;
        setCurrentIndex((prev) => (prev === galleryLength - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        if (!galleryLength || index < 0 || index >= galleryLength) return;
        setCurrentIndex(index);
    };

    const prevIndex = galleryLength ? (currentIndex - 1 + galleryLength) % galleryLength : 0;
    const nextIndex = galleryLength ? (currentIndex + 1) % galleryLength : 0;


    const dacDiemRef = useRef(null)
    const phongGiaRef = useRef(null)
    const gioiThieuRef = useRef(null)
    const danhGiaRef = useRef(null)

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    const increaseCount = (roomId: string) => {
        setRoomCounts(prev => ({
            ...prev,
            [roomId]: (prev[roomId] || 0) + 1
        }));
    };

    const decreaseCount = (roomId: string) => {
        setRoomCounts(prev => ({
            ...prev,
            [roomId]: Math.max((prev[roomId] || 0) - 1, 0)
        }));
    };
    const totalPrice = cruise?.rooms.reduce((total, room) => {
        const count = roomCount[room._id] || 0;
        return total + room.price * count;
    }, 0) || 0;

    if (isLoading) return <div>...Loading</div>
    return (
        <div className="max-w-screen-xl mx-auto">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/"><House size={16} /></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Chi tiết</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{cruise?.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="py-20">
                <div className="grid grid-cols-12">
                    <div className="col-span-8 flex flex-col gap-3">
                        <h1 className="text-4xl font-bold">{cruise?.name}</h1>
                        <div className="flex gap-2">
                            <div className="bg-[#FEDF89] flex items-center gap-2 rounded-full px-2">
                                <Star size={12} />
                                <span className="text-sm">4.9 (12 đánh giá)</span>
                            </div>
                            <div className="bg-[#F2F4F7] flex items-center gap-2 rounded-full px-2">
                                <Anchor size={12} />
                                <span className="text-sm">{cruise?.location}</span>
                            </div>
                        </div>
                        <div>
                            <img src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75" alt="" />
                        </div>

                    </div>
                    <div className="col-span-4 text-end">
                        <h4 className="text-4xl text-[#0E4F4F] font-bold">{priceFormat(cruise?.base_price || 0)}/ khách</h4>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto p-4 relative  mt-20">
                    <div className="absolute left-0 top-0 w-1/5 h-80 transform -translate-x-1/2 translate-y-4 overflow-hidden">
                        <img
                            src={cruise?.gallery[prevIndex]}
                            alt={`Prev ${currentIndex - 1}`}
                            className="w-full h-80 object-cover rounded-l-3xl "
                        />
                    </div>

                    <div className="relative w-3/4 mx-auto h-80 flex justify-center">
                        <img
                            src={cruise?.gallery[currentIndex]}
                            alt={`Current ${currentIndex + 1}`}
                            className="w-full h-80 object-cover shadow-md"
                        />
                    </div>

                    <div className="absolute right-0 top-0 w-1/5 h-80 transform translate-x-1/2 translate-y-4 rounded-r-3xl">
                        <img
                            src={cruise?.gallery[nextIndex]}
                            alt={`Next ${currentIndex + 1}`}
                            className="w-full h-80 object-cover rounded-r-3xl"
                        />
                    </div>

                    <button
                        onClick={goToPrev}
                        className="absolute -left-24 top-1/3 transform translate-y-10 z-30 bg-white hover:text-white p-3 rounded-full hover:bg-gray-600 shadow-md"
                    >
                        <MoveLeft />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute -right-24 top-1/3 transform translate-y-10 z-30 p-3 rounded-full bg-white hover:bg-gray-600 hover:text-white shadow-md"
                    >
                        <MoveRight />
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 p-2 rounded-lg shadow">
                        {cruise?.gallery.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-14 h-14 object-cover rounded cursor-pointer ${currentIndex === index ? 'border-4 border-white' : ''
                                    }`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex gap-4 border bg-[#F9FAFB] border-gray-200 py-4 px-5 rounded-xl ">
                        <button onClick={() => scrollToSection(dacDiemRef)} className="font-medium hover:text-blue-600">Đặc điểm</button>
                        <button onClick={() => scrollToSection(phongGiaRef)} className="font-medium hover:text-blue-600">Phòng & Giá</button>
                        <button onClick={() => scrollToSection(gioiThieuRef)} className="font-medium hover:text-blue-600">Giới thiệu</button>
                        <button onClick={() => scrollToSection(danhGiaRef)} className="font-medium hover:text-blue-600">Đánh giá (12)</button>
                    </div>
                    <div ref={dacDiemRef} className="flex flex-col lg:flex-row gap-10 py-10">
                        <div className="w-full lg:w-2/3">
                            <h3 className="text-4xl font-bold">Đặc điểm nổi bật</h3>
                            <div className="mt-4">
                                <img
                                    src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75"
                                    alt=""
                                />
                            </div>

                            {cruise?.features && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                                    {[0, 1].map((col) => (
                                        <div key={col} className="space-y-4">
                                            {cruise.features
                                                .filter((_, idx) => idx % 2 === col)
                                                .map((feature, idx) => (
                                                    <div key={idx} className="flex gap-2 items-center">
                                                        <img
                                                            src="https://minio.fares.vn/mixivivu-dev/icons/Jacuzzi-tub.svg"
                                                            alt=""
                                                            width={24}
                                                        />
                                                        <p className="text-base font-medium">{feature}</p>
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div
                                className="text-base text-start font-medium"
                                dangerouslySetInnerHTML={{ __html: cruise?.introduction || '' }}
                            />
                        </div>

                        <div className="w-full lg:w-1/3 self-start shadow border-2 border-gray-200 rounded-3xl">
                            <div className="border-b p-4">
                                <span className="text-lg font-semibold">Thông tin du thuyền</span>
                            </div>
                            <div className="p-5 flex flex-col gap-5">
                                <div className="grid grid-cols-3">
                                    <p className="flex text-base gap-2 items-center text-[#475467]">
                                        <Anchor size={20} />
                                        Hạ thủy
                                    </p>
                                    <p className="col-span-2 font-medium">{cruise?.launch_year}</p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="flex text-base gap-2 items-center text-[#475467]">
                                        <Sofa size={20} />
                                        Cabin
                                    </p>
                                    <p className="col-span-2 font-medium">{cruise?.cabin_count}</p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="flex text-base gap-2 items-center text-[#475467]">
                                        <MapPinned size={20} />
                                        Hành trình
                                    </p>
                                    <p className="col-span-2 font-medium">
                                        {cruise?.trip}
                                    </p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="flex text-base gap-2 items-center text-[#475467]">
                                        <BriefcaseBusiness size={20} />
                                        Điều hành
                                    </p>
                                    <p className="col-span-2 font-medium">
                                        {cruise?.operator}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION: Phòng & Giá */}
                    <div ref={phongGiaRef} className="py-10 w-2/3">
                        <div className="py-10">
                            <h2 className="text-3xl font-bold">Phòng & Giá</h2>
                            <div className="mt-4">
                                <img
                                    src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="relative w-full  border rounded-3xl shadow">
                            {/* Ảnh nền */}
                            <img
                                src="https://mixivivu.com/section-background.png"
                                alt="background"
                                width={76}
                                className="absolute inset-0 w-full h-full object-cover rounded-3xl z-0 bg-[#F2F4F7] "
                            />

                            {/* Nội dung nằm đè lên ảnh */}
                            <div className="relative z-10 px-10 py-10">
                                <Button variant="ghost" className="rounded-full py-6 px-7 border text-base font-medium bg-white shadow">
                                    <X size={24} />
                                    Xoá lựa chọn
                                </Button>

                                {cruise && cruise.rooms.map((room) => (
                                    <div key={room._id} className="mt-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow">
                                        <div className="flex flex-wrap gap-5 justify-between items-center">
                                            <img
                                                src={room.image}
                                                alt=""
                                                className="w-[76px] h-[76px] object-cover rounded-lg"
                                            />


                                            <div className="flex-1">
                                                <RoomDetailModal room={room} />
                                                <div className="flex gap-5 mt-1 text-sm text-[#475467]">
                                                    <div className="flex items-center gap-2">
                                                        <Sofa size={20} />
                                                        <p>{room.area}m²</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <p>Tối đa:</p>
                                                        <p>{room.max_guests}</p>
                                                        <User size={14} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-lg font-bold">{priceFormat(room.price)} đ</p>
                                                <p className="text-sm">/KHÁCH</p>
                                            </div>

                                            <div className="flex items-center justify-between w-32 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                                                <button
                                                    onClick={() => decreaseCount(room._id)}
                                                    className="text-xl text-gray-800 hover:text-blue-600"
                                                >
                                                    –
                                                </button>
                                                <span className="text-base font-medium text-gray-800">{roomCount[room._id] || 0}</span>
                                                <button
                                                    onClick={() => increaseCount(room._id)}
                                                    className="text-xl text-gray-800 hover:text-blue-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between mt-5">
                                    <div>
                                        <span>Tổng tiền:</span>
                                        <p className="text-lg font-medium text-[#0e4f4f]">{priceFormat(totalPrice)}</p>
                                    </div>
                                    <Button className=" px-8 py-7 rounded-full" variant="outline">Đặt ngay <ArrowRight /></Button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SECTION: Giới thiệu */}
                    <div ref={gioiThieuRef} className="py-10 w-2/3 leading-8">
                        <h2 className="text-3xl font-bold">Giới thiệu</h2>
                        <div className="mt-4">
                            <img
                                src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75"
                                alt=""
                            />
                        </div>
                        <div className="py-10" dangerouslySetInnerHTML={{ __html: cruise?.description || '' }} />


                    </div>

                    {/* SECTION: Đánh giá */}
                    <div ref={danhGiaRef} className="py-10">
                        <h2 className="text-3xl font-bold">Đánh giá (12)</h2>
                        <div className="mt-4">
                            <img
                                src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default DetailTour