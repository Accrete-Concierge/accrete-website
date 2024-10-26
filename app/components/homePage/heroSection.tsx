"use client";

import VerticleCard from "../card/verticleCard";

interface HeroSectionProps {
  mainText: string;
  subText: string;
  mainImage: string;
  animateAsset?: JSX.Element;
  extraAnimateAsset?: JSX.Element;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  mainText,
  subText,
  mainImage,
  animateAsset,
  extraAnimateAsset,
  backgroundImage,
}) => {
  return (
    <>
      <section
        className=" relative bg-cover opacity-100 bg-no-repeat"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        }}
      >
        <div className="h-[600px]">
          <div className="md:px-28 px-10 p-12 flex md:flex-row flex-col">
            <div className="flex flex-col mt-5 md:mt-14 w-full">
              <h1 className="text-ellipsis hover-border font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl w-[100%] md:w-[100%]">
                <span style={{ color: "black" }}>
                  {mainText.split(" ")[0]}{" "}
                </span>
                <span style={{ color: "orange" }}>
                  {mainText.split(" ")[1]}{" "}
                </span>
                <span style={{ color: "black" }}>
                  {mainText.split(" ")[2]}{" "}
                </span>
                <span style={{ color: "black" }}>
                  {mainText.split(" ")[3]}{" "}
                </span>
                <span style={{ color: "black" }}>
                  {mainText.split(" ")[4]}{" "}
                </span>
                <span style={{ color: "black" }}>
                  {mainText.split(" ")[5]}{" "}
                </span>
                <span style={{ color: "orange" }}>
                  {mainText.split(" ")[6]}{" "}
                </span>
              </h1>
              <p className="color-changing font-medium mt-8 w-[100%] md:w-[70%] xl:w-[100%] xl:text-lg">
                {subText}
              </p>
            </div>
            <div className="animate-bounce-slow relative mt-2 md:mt-0 z-auto ml-1 md:ml-auto">
              <img
                className="w-[100%] md:w-[40rem] lg:w-[50rem]"
                src={mainImage}
                alt="Main"
              />

              {extraAnimateAsset && (
                <>
                  <div className="absolute w-full">{animateAsset}</div>

                  <div className="absolute top-5 -right-4 md:right-10">
                    {extraAnimateAsset}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="relative">
          <VerticleCard />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
