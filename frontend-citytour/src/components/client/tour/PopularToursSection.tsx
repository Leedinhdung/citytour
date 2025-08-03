import CruiseCard from "@/components/client/tour/CruiseCard";
import { Button } from "@/components/ui/button";
import { useGetAllCruises } from "@/hooks/admin/cruise/useCruise";
import { MoveRight } from "lucide-react";

const PopularToursSection = () => {
    const { data: cruiseData } = useGetAllCruises()
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-12 pt-44 pb-28">
                <div className="col-span-6">
                    <h3 className="text-4xl font-bold">
                        Du thuyền mới <br /> và phổ biến nhất
                    </h3>
                </div>
                <div className="col-span-6">
                    <p className="text-lg font-medium text-gray-600">
                        Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất. Khám phá một hành trình tuyệt vời đưa bạn vào thế giới của sự sang trọng, tiện nghi và trải nghiệm không thể quên
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
                {cruiseData && cruiseData.map((value, index) => (
                    <CruiseCard key={index} cruise={value} />
                ))}
                <div className="col-span-full flex justify-center">
                    <Button variant="ghost" className="rounded-full border px-10 py-5 text-base">
                        Xem tất cả <MoveRight />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PopularToursSection;