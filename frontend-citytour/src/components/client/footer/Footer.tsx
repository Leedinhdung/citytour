const Footer = () => {
    return (
        <footer className="bg-[#1a2b3c] text-white py-8 mt-12 w-full">
            <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-start">
                    <img
                        src="https://mixivivu.com/_next/image?url=%2Fwhite-logo.png&w=640&q=75"
                        alt="MixiVivu Logo"
                        className="h-12 mb-4"
                    />
                    <p className="text-sm text-gray-300">Công ty TNHH Du lịch và Dịch vụ MixiVivu</p>
                    <p className="text-sm text-gray-300">Tầng 7, số nhà 25, ngõ 38 phố Vĩnh Lăng,
                        phường Láng Hạ, quận Đống Đa, TP. Hà Nội</p>
                    <p className="text-sm text-gray-300">Mã số doanh nghiệp: 0110376372 do Sở Kế
                        hoạch và Đầu tư TP. Hà Nội cấp ngày 05/06/2023</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">GIỚI THIỆU</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>Về chúng tôi</li>
                        <li>Điệu khỏe và điệu kiện</li>
                        <li>Chính sách riêng tư</li>
                        <li>Hướng dẫn sử dụng</li>
                        <li>Hình thức thanh toán</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">ĐIỂM ĐẾN</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>Vịnh Hạ Long</li>
                        <li>Vịnh Lạn Hạ</li>
                        <li>Đảo Cát Bà</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">DU THUYỀN</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>Blog</li>
                        <li>Câu hỏi thường gặp</li>
                        <li>Câu hỏi thú vị</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer