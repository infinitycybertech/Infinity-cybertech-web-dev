import { useState, useEffect, useRef } from "react";
import Filter from "bad-words";
import toast, { Toaster } from "react-hot-toast";
import Fade from "react-reveal/Fade";
import gsap, { Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Contact.module.scss";
import { MENULINKS } from "../../constants";

const filter = new Filter();
filter.removeWords("hell", "god", "shit");

const toastOptions = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
    fontFamily: "sans-serif",
  },
};

const empty = () =>
  toast.error("Please fill the required fields", {
    id: "error",
  });

const error = () =>
  toast.error("Error sending your message", {
    id: "error",
  });

const success = () =>
  toast.success("Message sent successfully", {
    id: "success",
  });

const Contact = () => {
  const initialState = { name: "", email: "", subject: "", message: "" };
  const [formData, setFormData] = useState(initialState);
  const [mailerResponse, setMailerResponse] = useState("not initiated");
  const [isSending, setIsSending] = useState(false);
  const buttonEl = useRef(null);
  const targetSection = useRef(null);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    value.length === 0 ? setIsSending(false) : setIsSending(true);
    setFormData((prevVal) => {
      if (
        value.trim() !== prevVal[id] &&
        value.trim().length > prevVal[id].trim().length
      ) {
        return { ...prevVal, [id]: filter.clean(value.trim()) };
      } else {
        return { ...prevVal, [id]: value };
      }
    });
  };

  const emptyForm = () => {
    setFormData(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    if (name === "" || email === "" || subject === "" || message === "") {
      empty();
      return setMailerResponse("empty");
    }

    setIsSending(true);

    // Using SMTP.js to send email
    window.Email.send({
      Host: "smtp.yourisp.com",
      Username: "username",
      Password: "password",
      To: "admin@infinitycybertech.com",
      From: email,
      Subject: subject,
      Body: `Name: ${name}<br>Email: ${email}<br>Message: ${message}`,
    }).then((message) => {
      if (message === "OK") {
        setMailerResponse("success");
        emptyForm();
      } else {
        setMailerResponse("error");
        console.error(message);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setMailerResponse("not initiated");
    }, 10000);
  }, [mailerResponse]);

  useEffect(() => {
    buttonEl.current.addEventListener("click", (e) => {
      if (!buttonEl.current.classList.contains("active")) {
        buttonEl.current.classList.add("active");

        gsap.to(buttonEl.current, {
          keyframes: [
            {
              "--left-wing-first-x": 50,
              "--left-wing-first-y": 100,
              "--right-wing-second-x": 50,
              "--right-wing-second-y": 100,
              duration: 0.2,
              onComplete() {
                gsap.set(buttonEl.current, {
                  "--left-wing-first-y": 0,
                  "--left-wing-second-x": 40,
                  "--left-wing-second-y": 100,
                  "--left-wing-third-x": 0,
                  "--left-wing-third-y": 100,
                  "--left-body-third-x": 40,
                  "--right-wing-first-x": 50,
                  "--right-wing-first-y": 0,
                  "--right-wing-second-x": 60,
                  "--right-wing-second-y": 100,
                  "--right-wing-third-x": 100,
                  "--right-wing-third-y": 100,
                  "--right-body-third-x": 60,
                });
              },
            },
            {
              "--left-wing-third-x": 20,
              "--left-wing-third-y": 90,
              "--left-wing-second-y": 90,
              "--left-body-third-y": 90,
              "--right-wing-third-x": 80,
              "--right-wing-third-y": 90,
              "--right-body-third-y": 90,
              "--right-wing-second-y": 90,
              duration: 0.2,
            },
            {
              "--rotate": 50,
              "--left-wing-third-y": 95,
              "--left-wing-third-x": 27,
              "--right-body-third-x": 45,
              "--right-wing-second-x": 45,
              "--right-wing-third-x": 60,
              "--right-wing-third-y": 83,
              duration: 0.25,
            },
            {
              "--rotate": 60,
              "--plane-x": -8,
              "--plane-y": 40,
              duration: 0.2,
            },
            {
              "--rotate": 40,
              "--plane-x": 45,
              "--plane-y": -300,
              "--plane-opacity": 0,
              duration: 0.375,
              onComplete() {
                setTimeout(() => {
                  buttonEl.current.removeAttribute("style");
                  gsap.fromTo(
                    buttonEl.current,
                    {
                      opacity: 0,
                      y: -8,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: 0.3,
                      onComplete() {
                        buttonEl.current.classList.remove("active");
                      },
                    }
                  );
                }, 1800);
              },
            },
          ],
        });

        gsap.to(buttonEl.current, {
          keyframes: [
            {
              "--text-opacity": 0,
              "--border-radius": 0,
              "--left-wing-background": "#9f55ff",
              "--right-wing-background": "#9f55ff",
              duration: 0.11,
            },
            {
              "--left-wing-background": "#8b31ff",
              "--right-wing-background": "#8b31ff",
              duration: 0.14,
            },
            {
              "--left-body-background": "#9f55ff",
              "--right-body-background": "#9f55ff",
              duration: 0.25,
              delay: 0.1,
            },
            {
              "--trails-stroke": 171,
              duration: 0.22,
              delay: 0.22,
            },
            {
              "--success-opacity": 1,
              "--success-x": 0,
              duration: 0.2,
              delay: 0.15,
            },
            {
              "--success-stroke": 0,
              duration: 0.15,
            },
          ],
        });
      }
    });
  }, [buttonEl]);

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    ScrollTrigger.create({
      trigger: targetSection.current.querySelector(".contact-wrapper"),
      start: "100px bottom",
      end: `center center`,
      animation: revealTl,
      scrub: 0,
    });
  }, [targetSection]);

  return (
    <section
      className="mt-30 w-full relative select-none bg-black pt-20 sm:pt-10 md:pt-5 lg:pt-1 pb-20"
      id={MENULINKS[4].ref}
      ref={targetSection}
    >
      <div>
        <Toaster toastOptions={toastOptions} />
      </div>
      <div className="section-container flex flex-col justify-center">
        <div className="flex flex-col contact-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 seq">
              CONTACT
            </p>
            <h1 className="text-6xl mt-2 font-medium text-gradient w-fit seq">
              Contact
            </h1>
          </div>
          <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 seq">
            Request a website or ask anything{" "}
          </h2>
        </div>

        <form className="pt-10 sm:mx-auto sm:w-[30rem] md:w-[38rem]">
          <div className="flex flex-col">
            <div className="flex flex-col w-full mt-5">
              <label
                className="text-gray-light-2 text-[0.9rem] tracking-widest"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={styles.formField}
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className="flex flex-col w-full mt-5">
              <label
                className="text-gray-light-2 text-[0.9rem] tracking-widest"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={styles.formField}
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="flex flex-col w-full mt-5">
              <label
                className="text-gray-light-2 text-[0.9rem] tracking-widest"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                className={styles.formField}
                id="subject"
                name="subject"
                type="text"
                onChange={handleChange}
                value={formData.subject}
                required
              />
            </div>
            <div className="flex flex-col w-full mt-5">
              <label
                className="text-gray-light-2 text-[0.9rem] tracking-widest"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className={styles.formField}
                id="message"
                name="message"
                rows="4"
                onChange={handleChange}
                value={formData.message}
                required
              ></textarea>
            </div>
            <button
              className="relative w-full h-[50px] mt-7 seq"
              ref={buttonEl}
              onClick={handleSubmit}
              disabled={isSending}
            >
              <p className="text-gradient text-lg font-medium relative z-10">
                Submit
              </p>
              <div className="left-wing"></div>
              <div className="right-wing"></div>
              <div className="left-body"></div>
              <div className="right-body"></div>
              <div className="left-wing-second"></div>
              <div className="right-wing-second"></div>
              <div className="left-wing-third"></div>
              <div className="right-wing-third"></div>
              <div className="success">
                <svg viewBox="0 0 24 24">
                  <polyline points="3 12 8 17 21 4"></polyline>
                </svg>
              </div>
              <div className="trails">
                <div className="trail">
                  <svg viewBox="0 0 24 24">
                    <line x1="0" y1="0" x2="24" y2="24"></line>
                  </svg>
                </div>
                <div className="trail">
                  <svg viewBox="0 0 24 24">
                    <line x1="0" y1="24" x2="24" y2="0"></line>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;