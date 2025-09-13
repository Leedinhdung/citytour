import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { ChevronDown, CircleDollarSign, MapPinned, Search, Ship, Star } from 'lucide-react'

const amenities = [
    'Phòng gia đình',
    'Có bể sục',
    'Bao gồm tất cả các bữa ăn',
    'Giáp biển',
    'Quầy bar',
    'Lễ tân 24 giờ',
    'Khu vực bãi tắm riêng',
    'Nhà hàng',
    'Trung tâm thể dục',
    'Phòng có bồn tắm',
    'Wi - Fi miễn phí',
    'Miễn phí kayaking',
    'Spa & chăm sóc sức khoẻ',
    'Chỗ đỗ xe miễn phí',
    'Miễn phí xe đưa đón',
    'Có bể bơi ngoài trời',
    'Đi tuyến Lan Hạ',
    'Phòng không hút thuốc',
    'Bể bơi ngoài trời',
    'Du thuyền 5 sao',
    'Chỗ đỗ xe',
    'Trà / cà phê',
    'Nhìn ra biển',
    'Điều hòa',
    'Cửa sổ từ sàn đến trần',
    'Sạc điện thoại',
    'Hồ bơi có tầm nhìn',
    'Ban công riêng',
    'Wi - Fi',
    'Két an toàn'
]

const AllCruise = () => {
    return (
        <section
            className="relative w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://mixivivu.com/section-background.png')" }}
        >
            {/* Nội dung nổi trên ảnh */}
            <div className="relative z-10 px-4 sm:px-6 md:px-10 xl:px-36 max-w-screen-2xl mx-auto py-20">
                {/* Form tìm kiếm */}
                <div className="bg-white rounded-3xl shadow-md w-full border">
                    {/* Title */}
                    <div className="p-6 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Bạn lựa chọn điểm đến du lịch nào?
                        </h2>
                        <p className="text-gray-600">Hơn 100 tour hạng sang giá tốt đang chờ bạn</p>
                    </div>

                    {/* Form controls */}
                    <div className="p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4">
                        {/* Search input */}
                        <div className="relative w-full md:w-1/2">
                            <Input
                                type="text"
                                placeholder="Nhập tên du thuyền"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-gray-500 h-12"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search size={16} />
                            </span>
                        </div>

                        {/* Location select */}
                        <div className="relative w-full md:w-1/4">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <MapPinned size={16} />
                            </span>
                            <Select>
                                <SelectTrigger
                                    hideIcon
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full bg-white text-gray-500 h-12 focus:outline-none focus:ring-2 focus:ring-[#77dada] focus:border-transparent"
                                >
                                    <SelectValue placeholder="Tất cả địa điểm" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả địa điểm</SelectItem>
                                    <SelectItem value="halong">Hạ Long</SelectItem>
                                    <SelectItem value="danang">Đà Nẵng</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <ChevronDown size={16} />
                            </span>
                        </div>

                        {/* Price select */}
                        <div className="relative w-full md:w-1/4">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <CircleDollarSign size={16} />
                            </span>
                            <Select>
                                <SelectTrigger
                                    hideIcon
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full bg-white text-gray-500 h-12 focus:outline-none focus:ring-2 focus:ring-[#77dada] focus:border-transparent"
                                >
                                    <SelectValue placeholder="Tất cả mức giá" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả mức giá</SelectItem>
                                    <SelectItem value="low">Dưới 1 triệu</SelectItem>
                                    <SelectItem value="medium">1-3 triệu</SelectItem>
                                    <SelectItem value="high">Trên 3 triệu</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <ChevronDown size={16} />
                            </span>
                        </div>

                        {/* Submit button */}
                        <button className="w-full md:w-[12rem] bg-[#77dada] text-white py-3 rounded-full hover:bg-[#0e4f4f] transition-colors">
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Kết quả */}
                <div className="flex justify-between mt-16">
                    <div>
                        <p className="text-3xl font-bold mb-2">Tìm thấy 73 kết quả</p>
                        <img
                            src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75"
                            alt=""
                        />
                    </div>
                    <div className="relative">
                        <Select>
                            <SelectTrigger
                                hideIcon
                                className="w-full px-10 py-3 border border-gray-300 rounded-full bg-white text-gray-500 h-12 focus:outline-none focus:ring-2 focus:ring-[#77dada] focus:border-transparent"
                            >
                                <SelectValue placeholder="Không sắp xếp" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả mức giá</SelectItem>
                                <SelectItem value="low">Giá thấp đến cao</SelectItem>
                                <SelectItem value="medium">Giá cao đến thấp</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <ChevronDown size={16} />
                        </span>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-12 gap-10 mt-10 items-start">
                    {/* Sidebar */}
                    <div className="bg-white col-span-12 md:col-span-3 rounded-3xl shadow border">
                        <div className="flex justify-between items-center p-6">
                            <span className="font-semibold text-base">Lọc kết quả</span>
                            <p className="text-sm">Đặt lại</p>
                        </div>
                        <div className="border-t py-3"></div>
                        <div className="flex flex-col gap-6">
                            <div className="px-6">
                                <span className="font-medium text-base">Xếp hạng sao</span>
                                <div className="flex items-center gap-5 mt-4">
                                    <Input type="checkbox" className="w-4 h-4" />
                                    <p>3 sao</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Input type="checkbox" className="w-4 h-4" />
                                    <p>4 sao</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Input type="checkbox" className="w-4 h-4" />
                                    <p>5 sao</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="font-medium text-base">Tiện ích</span>
                                {amenities.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 mt-4">
                                        <Input type="checkbox" className="w-4 h-4" />
                                        <p className='text-sm'>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-12 md:col-span-9">
                        <div className="bg-white rounded-3xl p-6 shadow border mb-6">
                            <div className="flex gap-8">
                                {/* Ảnh + badge */}
                                <div className="relative ">
                                    <img
                                        src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/thumbnail/no53ab0y526yl825.webp"
                                        alt="Du thuyền Indochine"
                                        height={296}
                                        width={384}
                                        className=" object-cover rounded-3xl"
                                    />
                                    <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 shadow">
                                        <Star size={14} />
                                        <span className="text-xs">4.9 (12) đánh giá</span>
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div>
                                    {/* Địa điểm */}
                                    <div className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit">
                                        <MapPinned size={14} />
                                        <p>Vịnh Hạ Long</p>
                                    </div>

                                    {/* Tiêu đề */}
                                    <h2 className="text-2xl font-bold mt-2">Du thuyền Indochine</h2>

                                    {/* Năm + phòng */}
                                    <div className="flex items-center gap-1 mt-1 text-gray-600">
                                        <Ship size={16} />
                                        <p className="text-sm">Hạ thủy 2019 - 20 phòng</p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {["Hồ bơi", "Spa", "Ẩm thực", "Kayak", "Bar", "Phòng gym", "Wi-Fi"].map(
                                            (item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit"
                                                >
                                                    <MapPinned size={14} />
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t my-5" />

                                    {/* Giá + button */}
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-lg">4,125,000đ / khách</p>
                                        <button className="px-4 bg-[#77dada] py-2 rounded-full text-sm hover:bg-[#0e4f4f] hover:text-white transition-colors">
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 shadow border mb-6">
                            <div className="flex gap-8">
                                {/* Ảnh + badge */}
                                <div className="relative ">
                                    <img
                                        src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/thumbnail/no53ab0y526yl825.webp"
                                        alt="Du thuyền Indochine"
                                        height={296}
                                        width={384}
                                        className=" object-cover rounded-3xl"
                                    />
                                    <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 shadow">
                                        <Star size={14} />
                                        <span className="text-xs">4.9 (12) đánh giá</span>
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div>
                                    {/* Địa điểm */}
                                    <div className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit">
                                        <MapPinned size={14} />
                                        <p>Vịnh Hạ Long</p>
                                    </div>

                                    {/* Tiêu đề */}
                                    <h2 className="text-2xl font-bold mt-2">Du thuyền Indochine</h2>

                                    {/* Năm + phòng */}
                                    <div className="flex items-center gap-1 mt-1 text-gray-600">
                                        <Ship size={16} />
                                        <p className="text-sm">Hạ thủy 2019 - 20 phòng</p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {["Hồ bơi", "Spa", "Ẩm thực", "Kayak", "Bar", "Phòng gym", "Wi-Fi"].map(
                                            (item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit"
                                                >
                                                    <MapPinned size={14} />
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t my-5" />

                                    {/* Giá + button */}
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-lg">4,125,000đ / khách</p>
                                        <button className="px-4 bg-[#77dada] py-2 rounded-full text-sm hover:bg-[#0e4f4f] hover:text-white transition-colors">
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 shadow border mb-6">
                            <div className="flex gap-8">
                                {/* Ảnh + badge */}
                                <div className="relative ">
                                    <img
                                        src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/thumbnail/no53ab0y526yl825.webp"
                                        alt="Du thuyền Indochine"
                                        height={296}
                                        width={384}
                                        className=" object-cover rounded-3xl"
                                    />
                                    <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 shadow">
                                        <Star size={14} />
                                        <span className="text-xs">4.9 (12) đánh giá</span>
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div>
                                    {/* Địa điểm */}
                                    <div className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit">
                                        <MapPinned size={14} />
                                        <p>Vịnh Hạ Long</p>
                                    </div>

                                    {/* Tiêu đề */}
                                    <h2 className="text-2xl font-bold mt-2">Du thuyền Indochine</h2>

                                    {/* Năm + phòng */}
                                    <div className="flex items-center gap-1 mt-1 text-gray-600">
                                        <Ship size={16} />
                                        <p className="text-sm">Hạ thủy 2019 - 20 phòng</p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {["Hồ bơi", "Spa", "Ẩm thực", "Kayak", "Bar", "Phòng gym", "Wi-Fi"].map(
                                            (item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit"
                                                >
                                                    <MapPinned size={14} />
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t my-5" />

                                    {/* Giá + button */}
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-lg">4,125,000đ / khách</p>
                                        <button className="px-4 bg-[#77dada] py-2 rounded-full text-sm hover:bg-[#0e4f4f] hover:text-white transition-colors">
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 shadow border mb-6">
                            <div className="flex gap-8">
                                {/* Ảnh + badge */}
                                <div className="relative ">
                                    <img
                                        src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/thumbnail/no53ab0y526yl825.webp"
                                        alt="Du thuyền Indochine"
                                        height={296}
                                        width={384}
                                        className=" object-cover rounded-3xl"
                                    />
                                    <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 shadow">
                                        <Star size={14} />
                                        <span className="text-xs">4.9 (12) đánh giá</span>
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div>
                                    {/* Địa điểm */}
                                    <div className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit">
                                        <MapPinned size={14} />
                                        <p>Vịnh Hạ Long</p>
                                    </div>

                                    {/* Tiêu đề */}
                                    <h2 className="text-2xl font-bold mt-2">Du thuyền Indochine</h2>

                                    {/* Năm + phòng */}
                                    <div className="flex items-center gap-1 mt-1 text-gray-600">
                                        <Ship size={16} />
                                        <p className="text-sm">Hạ thủy 2019 - 20 phòng</p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {["Hồ bơi", "Spa", "Ẩm thực", "Kayak", "Bar", "Phòng gym", "Wi-Fi"].map(
                                            (item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit"
                                                >
                                                    <MapPinned size={14} />
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t my-5" />

                                    {/* Giá + button */}
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-lg">4,125,000đ / khách</p>
                                        <button className="px-4 bg-[#77dada] py-2 rounded-full text-sm hover:bg-[#0e4f4f] hover:text-white transition-colors">
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-6 shadow border mb-6">
                            <div className="flex gap-8">
                                {/* Ảnh + badge */}
                                <div className="relative ">
                                    <img
                                        src="https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/thumbnail/no53ab0y526yl825.webp"
                                        alt="Du thuyền Indochine"
                                        height={296}
                                        width={384}
                                        className=" object-cover rounded-3xl"
                                    />
                                    <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full flex items-center gap-1 shadow">
                                        <Star size={14} />
                                        <span className="text-xs">4.9 (12) đánh giá</span>
                                    </div>
                                </div>

                                {/* Nội dung */}
                                <div>
                                    {/* Địa điểm */}
                                    <div className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit">
                                        <MapPinned size={14} />
                                        <p>Vịnh Hạ Long</p>
                                    </div>

                                    {/* Tiêu đề */}
                                    <h2 className="text-2xl font-bold mt-2">Du thuyền Indochine</h2>

                                    {/* Năm + phòng */}
                                    <div className="flex items-center gap-1 mt-1 text-gray-600">
                                        <Ship size={16} />
                                        <p className="text-sm">Hạ thủy 2019 - 20 phòng</p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {["Hồ bơi", "Spa", "Ẩm thực", "Kayak", "Bar", "Phòng gym", "Wi-Fi"].map(
                                            (item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full w-fit"
                                                >
                                                    <MapPinned size={14} />
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t my-5" />

                                    {/* Giá + button */}
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-lg">4,125,000đ / khách</p>
                                        <button className="px-4 bg-[#77dada] py-2 rounded-full text-sm hover:bg-[#0e4f4f] hover:text-white transition-colors">
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default AllCruise
