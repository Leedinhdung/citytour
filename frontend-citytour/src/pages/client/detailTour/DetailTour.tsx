import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Anchor, Check, House, MapPinned, MoveLeft, MoveRight, Ship, Sofa, Star, User, X } from "lucide-react"
import { useRef, useState } from "react";

const DetailTour = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [count, setCount] = useState(0)
    const images = [
        'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/2l1uxvb4jp973ya1.webp',
        'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/moigs880j904a4sk.webp',
        'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/zijzcqb3u2fvl6al.webp',
    ];

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;

    const dacDiemRef = useRef(null)
    const phongGiaRef = useRef(null)
    const gioiThieuRef = useRef(null)
    const danhGiaRef = useRef(null)

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    return (
        <div className="max-w-screen-xl mx-auto">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/"><House size={16} /></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Tìm tour</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Du thuyền Heritage Bình Chuẩn Cát Bà</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="py-20">
                <div className="grid grid-cols-12">
                    <div className="col-span-9 flex flex-col gap-3">
                        <h1 className="text-4xl font-bold">Du thuyền Heritage Bình Chuẩn Cát Bà</h1>
                        <div className="flex gap-2">
                            <div className="bg-[#FEDF89] flex items-center gap-2 rounded-full px-2">
                                <Star size={12} />
                                <span className="text-sm">4.9 (12 đánh giá)</span>
                            </div>
                            <div className="bg-[#F2F4F7] flex items-center gap-2 rounded-full px-2">
                                <Anchor size={12} />
                                <span className="text-sm">Lux Cruises, Lô 28 Cảng Quốc Tế Tuần Châu</span>
                            </div>
                        </div>
                        <div>
                            <img src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75" alt="" />
                        </div>

                    </div>
                    <div className="col-span-3">
                        <h4 className="text-4xl text-[#0E4F4F] font-bold">4,150,000đ/ khách</h4>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto p-4 relative  mt-20">
                    <div className="absolute left-0 top-0 w-1/5 h-80 transform -translate-x-1/2 translate-y-4 overflow-hidden">
                        <img
                            src={images[prevIndex]}
                            alt={`Prev ${currentIndex - 1}`}
                            className="w-full h-80 object-cover rounded-l-3xl "
                        />
                    </div>

                    <div className="relative w-3/4 mx-auto h-80 flex justify-center">
                        <img
                            src={images[currentIndex]}
                            alt={`Current ${currentIndex + 1}`}
                            className="w-full h-80 object-cover shadow-md"
                        />
                    </div>

                    <div className="absolute right-0 top-0 w-1/5 h-80 transform translate-x-1/2 translate-y-4 rounded-r-3xl">
                        <img
                            src={images[nextIndex]}
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
                        {images.map((img, index) => (
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
                                {[...Array(2)].map((_, colIdx) => (
                                    <div key={colIdx} className="space-y-4">
                                        {[...Array(3)].map((_, idx) => (
                                            <div key={idx} className="flex gap-2 items-center">
                                                <img
                                                    src="https://minio.fares.vn/mixivivu-dev/icons/Jacuzzi-tub.svg"
                                                    alt=""
                                                    width={24}
                                                />
                                                <p className="text-base font-medium">Có bể sục</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <Check className="text-[#77DADA]" />
                                    <span className="text-base font-medium">
                                        Du thuyền được thiết kế với phong cách sang trọng và truyền thống
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Check className="text-[#77DADA]" />
                                    <span className="text-base font-medium">
                                        Phòng ngủ tiện nghi sang trọng mang phong cách Á Đông đều có bồn tắm
                                        cạnh cửa kính lớn view vịnh
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Check className="text-[#77DADA]" />
                                    <span className="text-base font-medium">
                                        Đặc biệt hơn, du thuyền thiết kế bể bơi 4 mùa to rộng là địa điểm
                                        checkin yêu thích của mọi du khách
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Check className="text-[#77DADA]" />
                                    <span className="text-base font-medium">
                                        Du thuyền có nhiều lịch trình 2 ngày 1 đêm, 3 ngày 2 đêm và 4 ngày 3
                                        đêm cho những ai muốn 1 lịch trình dài hơn trên vịnh Lan Hạ
                                    </span>
                                </div>
                            </div>
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
                                    <p className="col-span-2 font-medium">2019</p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="flex text-base gap-2 items-center text-[#475467]">
                                        <Sofa size={20} />
                                        Cabin
                                    </p>
                                    <p className="col-span-2 font-medium">20</p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="flex text-base gap-2 items-center text-[#475467]">
                                        <Ship size={20} />
                                        Thân vỏ
                                    </p>
                                    <p className="col-span-2 font-medium">Kim loại</p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="flex text-base gap-2 items-center text-[#475467]">
                                        <MapPinned size={20} />
                                        Hành trình
                                    </p>
                                    <p className="col-span-2 font-medium">
                                        Vịnh Lan Hạ - Bãi tắm Ba Trái Đào - Hang Sáng Tối
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

                                <div className="mt-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow">
                                    <div className="flex flex-wrap gap-5 justify-between items-center">
                                        <img
                                            src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/Phòng Regal Suite/zkzkyobaulxx5m2j.webp"
                                            alt=""
                                            className="w-[76px] h-[76px] object-cover rounded-lg"
                                        />


                                        <div className="flex-1">
                                            <span className="text-lg font-bold block">Phòng Regal Suite</span>
                                            <div className="flex gap-5 mt-1 text-sm text-[#475467]">
                                                <div className="flex items-center gap-2">
                                                    <Sofa size={20} />
                                                    <p>46m²</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p>Tối đa:</p>
                                                    <p>2</p>
                                                    <User size={14} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-lg font-bold">4,620,000 đ</p>
                                            <p className="text-sm">/KHÁCH</p>
                                        </div>

                                        <div className="flex items-center justify-between w-32 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                                            <button
                                                onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                                                className="text-xl text-gray-800 hover:text-blue-600"
                                            >
                                                –
                                            </button>
                                            <span className="text-base font-medium text-gray-800">{count}</span>
                                            <button
                                                onClick={() => setCount((prev) => prev + 1)}
                                                className="text-xl text-gray-800 hover:text-blue-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow">
                                    <div className="flex flex-wrap gap-5 justify-between items-center">
                                        <img
                                            src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/Phòng Regal Suite/zkzkyobaulxx5m2j.webp"
                                            alt=""
                                            className="w-[76px] h-[76px] object-cover rounded-lg"
                                        />


                                        <div className="flex-1">
                                            <span className="text-lg font-bold block">Phòng Regal Suite</span>
                                            <div className="flex gap-5 mt-1 text-sm text-[#475467]">
                                                <div className="flex items-center gap-1">
                                                    <Sofa size={20} />
                                                    <p>46m²</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <p>Tối đa:</p>
                                                    <p>2</p>
                                                    <User size={14} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-lg font-bold">4,620,000 đ</p>
                                            <p className="text-sm">/KHÁCH</p>
                                        </div>

                                        <div className="flex items-center justify-between w-32 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                                            <button
                                                onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                                                className="text-xl text-gray-800 hover:text-blue-600"
                                            >
                                                –
                                            </button>
                                            <span className="text-base font-medium text-gray-800">{count}</span>
                                            <button
                                                onClick={() => setCount((prev) => prev + 1)}
                                                className="text-xl text-gray-800 hover:text-blue-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow">
                                    <div className="flex flex-wrap gap-5 justify-between items-center">
                                        <img
                                            src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/Phòng Regal Suite/zkzkyobaulxx5m2j.webp"
                                            alt=""
                                            className="w-[76px] h-[76px] object-cover rounded-lg"
                                        />


                                        <div className="flex-1">
                                            <span className="text-lg font-bold block">Phòng Regal Suite</span>
                                            <div className="flex gap-5 mt-1 text-sm text-[#475467]">
                                                <div className="flex items-center gap-1">
                                                    <Sofa size={20} />
                                                    <p>46m²</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <p>Tối đa:</p>
                                                    <p>2</p>
                                                    <User size={14} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-lg font-bold">4,620,000 đ</p>
                                            <p className="text-sm">/KHÁCH</p>
                                        </div>

                                        <div className="flex items-center justify-between w-32 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                                            <button
                                                onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                                                className="text-xl text-gray-800 hover:text-blue-600"
                                            >
                                                –
                                            </button>
                                            <span className="text-base font-medium text-gray-800">{count}</span>
                                            <button
                                                onClick={() => setCount((prev) => prev + 1)}
                                                className="text-xl text-gray-800 hover:text-blue-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-end mt-5">
                                    <span className="font-medium ">Tổng tiền: 0đ</span>
                                    <Button className="py-7 px-8 rounded-full text-base font-medium border shadow bg-white" variant="secondary">Đặt ngay <MoveRight /></Button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SECTION: Giới thiệu */}
                    <div ref={gioiThieuRef} className="py-10">
                        <h2 className="text-3xl font-bold">Giới thiệu</h2>
                        <div className="mt-4">
                            <img
                                src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75"
                                alt=""
                            />
                        </div>
                        <div className="py-10">
                            Du thuyền Heritage Cruises Bình Chuẩn có kiến trúc độc đáo, thiết kế mang đậm nét truyền thống và lịch sử. Với 20 phòng rộng rãi và tất cả các cabin có bồn tắm cạnh cửa kính lớn,có ban công với tầm nhìn toàn cảnh vịnh Lan Hạ. Trên du thuyền nhiều tiện nghi nổi bật mà du thuyền thường không có như phòng tranh, thư viện, gian hàng bán đồ lưu niệm, quầy bar liền kề hồ bơi..

                            Du thuyền tuyệt đẹp về đêmDu thuyền tuyệt đẹp về đêm
                            Đặc biệt, du thuyền có bể bơi bốn mùa mang lại cảm giác hài lòng cho những du khách đi vào mùa lạnh. Đây chính là điểm thú vị của du thuyền và hoàn toàn phù hợp với những gia đình có trẻ nhỏ. Bên cạnh đó là quầy bar với rất nhiều đồ uống ngon miệng và được trang trí đẹp mắt. Thật tuyệt vời khi bạn vừa nhâm nhi 1 ly cocktail, vừa ngâm mình trong nước ấm.

                            Bể bơi bốn mùa của du thuyền&nbsp;Bể bơi bốn mùa của du thuyền
                            Nhà hàng Tonkin của du thuyền thiết kế theo lối kiến trúc Đông Dương và đậm tính nghệ thuật sẽ phục vụ du khách các bữa ăn tươi ngon trong chuyến đi. Bên cạnh sự nổi trội về phòng nghỉ và tiện ích thì lịch trình tàu cũng rất thú vị. Những điểm tham quan như: làng chài Việt Hải,  hang Sáng Tối hay đảo Ba Trái Đào đều rất nổi tiếng và không thể bỏ qua.....

                            Nhà hàng Tonkin
                        </div>
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
        </div>
    )
}
export default DetailTour