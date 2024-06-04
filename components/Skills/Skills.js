/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef,useState } from "react";
import Image from "next/image";
import { MENULINKS, SKILLS } from "../../constants";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
//import lottie from "lottie-web";

const Skills = () => {
  const targetSection = useRef(null);
  const [lottie, setLottie] = useState();

  
  const lottieRef = useRef(null);

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    ScrollTrigger.create({
      trigger: targetSection.current.querySelector(".skills-wrapper"),
      start: "100px bottom",
      end: `center center`,
      animation: revealTl,
      scrub: 0,
    });
  }, [targetSection]);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && lottieRef.current) {
      const animation = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../public/lottie/web.json"),
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <section
      className="w-full relative select-none mt-44"
      id={MENULINKS[1].ref}
      ref={targetSection}
    >
      <div className="section-container py-16 flex flex-col justify-center">
        <img
          src="/right-pattern.svg"
          alt=""
          className="absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block"
          loading="lazy"
          height={700}
          width={320}
        />
        <div className="flex flex-col skills-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 seq">
              Tools and skills
            </p>
            <h1 className="text-6xl mt-2 font-medium text-gradient w-fit seq">
              Our tools and skills
            </h1>
            <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 seq">
              We like to take responsibility to craft aesthetic user experience
              using modern website architecture. While offering tools to make it easier to manage your website.{" "}
            </h2>
          </div>
          <div className="mt-10">
            <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 seq">
              LANGUAGES AND TOOLS
            </h3>
            <div className="flex items-center flex-wrap gap-6 seq">
              {SKILLS.languagesAndTools.map((skill) => (
                <Image
                  key={skill}
                  src={`/skills/${skill}.svg`}
                  alt={skill}
                  width={50}
                  height={50}
                />
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 seq">
              PLUGINS AND PAYMENTS
            </h3>
            <div className="flex flex-wrap gap-6 transform-gpu seq">
              {SKILLS.librariesAndFrameworks.map((skill) => (
                <Image
                  key={skill}
                  src={`/skills/${skill}.svg`}
                  alt={skill}
                  width={50}
                  height={50}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap mt-10">
            <div className="mr-16 xs:mr-20 mb-6">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 seq">
                DATABASES
              </h3>
              <div className="flex flex-wrap gap-6 transform-gpu seq">
                {SKILLS.databases.map((skill) => (
                  <Image
                    key={skill}
                    src={`/skills/${skill}.svg`}
                    alt={skill}
                    width={50}
                    height={50}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 seq">
                Other
              </h3>
              <div className="flex flex-wrap gap-6 transform-gpu seq">
                {SKILLS.other.map((skill) => (
                  <Image
                    key={skill}
                    src={`/skills/${skill}.svg`}
                    alt={skill}
                    width={50}
                    height={50}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute invisible w-4/12 bottom-1.5 lg:visible lg:right-12 2xl:right-16"
        ref={lottieRef}
      />
    </section>
  );
};

export default Skills;
