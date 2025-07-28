import {
  ChevronDown,
  CircleDollarSign,
  MapPinned,
  Search
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const BannerSection = () => {
  return (
    <div className="max-w-screen-xl mx-auto relative rounded-3xl shadow-lg border border-gray-100">
      {/* Video background */}
      <video
        src="https://minio.fares.vn/mixivivu-dev/video/Mixivivuduthuyen.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover rounded-3xl"
      />

      {/* Overlay content */}
      <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 w-full px-4 sm:px-6 md:px-10 xl:px-32 max-w-screen-xl">
        <div className="bg-white rounded-3xl shadow-md w-full">
          {/* Title */}
          <div className="p-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Bạn lựa chọn điểm đến du lịch nào
            </h2>
            <p className="text-gray-600">
              Hơn 100 tour hạng sang giá tốt đang chờ bạn
            </p>
          </div>

          {/* Form controls */}
          <div className="p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4">
            {/* Search input */}
            <div className="relative w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Nhập tên khách sạn"
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
      </div>
    </div>
  );
};

export default BannerSection;
