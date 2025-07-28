import { Link } from "react-router-dom";
import routes from "@/routes/routes";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
    return (
        <header className="fixed top-0 right-16 left-16 bg-white border-b border-b-gray-50 z-50">
            <div className="flex items-center justify-between p-4 border-b-gray-200">
                <Link to={routes.home}>
                    <img src="https://mixivivu.com/_next/image?url=%2Fblack-logo.png&w=256&q=75" alt=""
                        className="w-40 h-10" />
                </Link>
                <nav className="flex items-center gap-10 justify-around p-4 border-b-gray-200">
                    <Link to={routes.home} className="text-base font-medium">
                        Trang chủ
                    </Link>
                    <Link to={routes.home} className="text-base font-medium">
                        Tours
                    </Link>
                    <Link to={routes.home} className="text-base font-medium">
                        Liên hệ
                    </Link>
                    <Link to={routes.home} className="text-base font-medium">
                        Doanh nghiệp
                    </Link>
                    <Link to={routes.home} className="text-base font-medium">
                        Bài viết
                    </Link>

                </nav>
                <div className="flex items-center space-x-4 font-medium">
                    <PhoneCall />
                    <span className="text-gray-800">Hotline: 0922222016</span>
                    <Button
                        className="bg-[#77dada] text-gray-500 text-sm px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors hover:bg-[#0e4f4f] hover:text-white"
                    >
                        Liên hệ MixiVivu
                    </Button>
                </div>
            </div>
        </header>
    )
}
export default Header