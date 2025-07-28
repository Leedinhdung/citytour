const TestimonialSection = () => {
    return (
        <div className="relative py-20 overflow-hidden mt-20">
            <img
                src="https://mixivivu.com/section-background.png"
                alt="background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            <div className="absolute top-0 left-0 w-full h-full z-5"></div>
            <div className="relative z-10 px-4 md:px-20 flex flex-col items-center justify-center h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full py-10">
                    <div>
                        <h3 className="text-4xl font-bold">
                            Đánh giá từ những <br /> người đã trải nghiệm
                        </h3>
                    </div>
                    <div>
                        <p className="text-lg font-medium">
                            Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 bg-white p-6 rounded-xl w-full">
                    <img
                        src="https://mixivivu.com/quote.svg"
                        alt="quote"
                        className="self-start w-6 h-6"
                    />
                    <div>
                        <p className="text-lg font-normal text-[#101828]">
                            Cảm ơn team đã cho mình trải nghiệm quá ưng ý.
                            Đi đúng hôm thời tiết đẹp, ngắm cảnh vịnh Hạ Long đẹp tuyệt vời.
                            Nhân viên tư vấn nhiệt tình còn note lại khách dị ứng món gì, phục vụ chu đáo, buffet hải sản tươi ngon, phòng ốc đẹp.
                            Tuyệt vời lắm!!!
                        </p>
                        <span className="block mt-2 font-medium text-xl">- Bạn Minh Hoàng -</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;