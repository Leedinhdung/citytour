import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const NewsSection = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-12 py-20 px-5">
                <div className="col-span-6">
                    <h3 className="font-bold text-4xl mb-4">
                        Hạ Long: Khám phá Sự đặc sắc và Cập nhật tin tức mới nhất
                    </h3>
                    <img
                        src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75"
                        alt="heading border"
                        className="w-20"
                    />
                </div>
                <div className="col-span-6">
                    <p className="mb-4 text-lg">
                        Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex flex-col gap-3 shadow border w-96 p-5 rounded-3xl">
                        <img
                            src="https://minio.fares.vn/mixivivu-dev/tour/blog/images/7qv81cynt6kodvwo.webp"
                            alt="Quy Nhơn Island"
                            className="rounded-3xl"
                        />
                        <h3 className="text-lg text-[#475467] font-bold">
                            3 hòn đảo đẹp tại Quy Nhơn mà du khách không thể bỏ qua
                        </h3>
                        <p className="line-clamp-2 text-sm text-[#475467]">
                            Không chỉ sở hữu bờ biển dài thơ mộng, Quy Nhơn còn có nhiều hòn đảo hoang sơ và quyến rũ, rất thích hợp cho những chuyến du lịch thiên nhiên, khám phá hoặc nghỉ dưỡng ngắn ngày. Trong số đó, ba cái tên nổi bật và đáng đến nhất là Hòn Khô, Cù Lao Xanh và Hòn Sẹo. Mỗi đảo mang một nét đẹp riêng biệt về địa hình, cảnh quan và trải nghiệm du lịch.
                        </p>
                        <span className="text-sm text-[#475467]">21/07/2025</span>
                    </div>
                ))}
            </div>
            <div className="text-center py-10">
                <Button variant="ghost" className="border rounded-full py-5 px-8 text-base">
                    Xem tất cả <MoveRight />
                </Button>
            </div>
        </div>
    );
};

export default NewsSection;