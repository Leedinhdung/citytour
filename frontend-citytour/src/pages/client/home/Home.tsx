import BannerSection from "@/components/client/banner/BannerSection";
import DestinationsSection from "@/components/client/destination/DestinationsSection";
import NewsSection from "@/components/client/news/NewsSection";
import TestimonialSection from "@/components/client/testimonial/TestimonialSection";
import PopularToursSection from "@/components/client/tour/PopularToursSection";

const Home = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <BannerSection />
            <PopularToursSection />
            <TestimonialSection />
            <DestinationsSection />
            <NewsSection />
        </div>
    );
};

export default Home;