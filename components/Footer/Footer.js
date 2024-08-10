/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { Fade } from "react-reveal";
import { gsap, Linear } from "gsap";
import { Howl } from "howler";
import Button from "../Button/Button";
import FooterBg from "./FooterBg/FooterBg";
import Profiles from "../Profiles/Profiles";
import { theme } from "tailwind.config";
import { MENULINKS } from "../../constants";

const Footer = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const targetSection = useRef(null);

  const heartClickSound = new Howl({
    src: ["/sounds/glug-a.mp3"],
    rate: playbackRate,
    volume: 0.5,
  });

  const handleClick = () => {
    setPlaybackRate((rate) => rate + 0.1);
    heartClickSound.play();
  };

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });

    revealTl
      .to(targetSection.current, { opacity: 1, duration: 2 })
      .from(
        targetSection.current.querySelectorAll(".seq"),
        { opacity: 0, duration: 0.5, stagger: 0.5 },
        "<"
      );
  }, [targetSection]);

  return (
    <footer
      ref={targetSection}
      className="w-full relative select-none bg-cover"
      style={{
        backgroundImage: `linear-gradient(to right, ${theme.colors.indigo.light}, ${theme.colors.indigo.dark})`,
      }}
    >
      <div className="section-container flex flex-col h-full justify-end z-10 items-center py-12">
       <p className="text-center text-black text-sm sm:text-base font-medium tracking-wide mt-6">
      <h1 className="font-small text-2xl md:text-3xl text-center seq">
              Not sure yet? We still offer free consulting and website/software advice regardless if you using us or not 
            </h1>
            <h1 className="font-small text-1xl md:text-2xl text-center seq">
              You can ask anything and we'll reach you (We promise we won’t hold you to it...) 
            </h1>
            </p>
            </div>
      <FooterBg />
      <Fade bottom distance={"4rem"}>
        <div className="w-full h-full pt-32">
          <div className="section-container flex flex-col h-full justify-end z-10 items-center py-12">
            <h1 className="font-medium text-3xl md:text-4xl text-center seq">
              Feel free to connect on social media.
            </h1>
            <div className="text-center seq">
              <Profiles />
            </div>
            <div className="seq pt-4 text-center">
              <Button
                href={`#${MENULINKS[4].ref}`}
                classes="link"
                type="secondary"
              >
                Let&apos;s Talk
              </Button>
            </div>
            <p className="text-center text-white text-sm sm:text-base font-medium tracking-wide mt-8">
              Developed with{" "}
              <button onClick={handleClick} className="link cursor-none">
                <span className="block animate-bounce">care</span>
              </button>{" "}
              by <span className="text-white">Infinity cybertech</span>
            </p>
          </div>
        </div>
      </Fade>
      <img
        src="/footer-curve.svg"
        className="w-full rotate-180"
        alt=""
        loading="eager"
        height={180}
      />
    </footer>
  );
};

export default Footer;
