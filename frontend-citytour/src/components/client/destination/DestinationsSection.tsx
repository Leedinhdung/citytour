import { Button } from "@/components/ui/button";

const DestinationsSection = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col py-20 w-[460px] mx-auto items-center text-center">
                <h3 className="font-bold text-4xl mb-4">Các điểm đến của Mixivivu</h3>
                <p className="mb-4 text-lg">Khám phá vẻ đẹp tuyệt vời của Du thuyền Hạ Long: Hành trình đến thiên đường thiên nhiên</p>
                <img
                    src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=256&q=75"
                    alt="heading border"
                    className="w-20"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex flex-col gap-5 shadow border w-96 p-5 rounded-3xl text-center">
                        <img
                            src="https://minio.fares.vn/mixivivu-dev/home-page/547b7d230cacd9f280bd3.jpg"
                            alt="Vịnh Hạ Long"
                        />
                        <h3 className="text-2xl font-bold">Vịnh Hạ Long</h3>
                        <div>
                            <Button variant="ghost" className="rounded-full border px-8 py-5">Xem ngay</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DestinationsSection;