import DressfairFriday from "@/components/homePageComponent/DressFairFriday";
import HeroSection from "@/components/homePageComponent/heroSection";
import LightingDeals from "@/components/homePageComponent/lightingDeals";
import WhyChooseDressfair from "@/components/homePageComponent/whyChooseDressfair";
import TopTabsSection from "@/components/homePageMobile/topTabSection";

const Home = () => {
  return (
    <>
      <div className="homePage-disktop hidden xl:block">
        <HeroSection />
        <WhyChooseDressfair />
        <LightingDeals />
        <DressfairFriday />
      </div>

      <div className="homepage-mobile block xl:hidden lg:px-16">
        <TopTabsSection />
      </div>
    </>
  );
};

export default Home;
