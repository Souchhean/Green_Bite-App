import React from "react";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection/CategoriesSection";
import { ImageSection } from "./components/ImageSection/ImageSection.jsx";
import { HeroVideo } from "./components/HeroVideo/HeroVideo";
import { useData } from "../../contexts/DataProvider";

export const Home = () => {
  const { loading } = useData();
  return (
    !loading && (
      <div className="home-page">
        <div className="hero">
          <HeroVideo />
          <HeroSection />
          <ImageSection />
          <CategoriesSection />
          <Footer />
        </div>
      </div>
    )
  );
};
