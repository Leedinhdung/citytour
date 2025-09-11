import BannerSection from "@/components/client/banner/BannerSection";
import PopularCruiseSection from "@/components/client/cruise/PopularCruiseSection";
import DestinationsSection from "@/components/client/destination/DestinationsSection";
import NewsSection from "@/components/client/news/NewsSection";
import TestimonialSection from "@/components/client/testimonial/TestimonialSection";


const Home = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <BannerSection />
            <PopularCruiseSection />
            <TestimonialSection />
            <DestinationsSection />
            <NewsSection />
        </div>
    );
};

export default Home;