"use client";
import "./Menu.css";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useViewTransition } from "@/hooks/useViewTransition";
import { FaYoutube } from "react-icons/fa";

gsap.registerPlugin(useGSAP, SplitText);

const Menu = ({ pageRef }) => {
  const navToggleRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuImageRef = useRef(null);
  const menuLinksRef = useRef([]);
  const menuLinkContainersRef = useRef([]);
  const openLabelRef = useRef(null);
  const closeLabelRef = useRef(null);
  const menuColsRef = useRef([]);

  const splitTextInstances = useRef([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();

  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Recursos", route: "/recursos" },
    { label: "Iglesia", route: "/Iglesia" },
    { label: "Est. Biblicos", route: "https://www.apictureofgod.com" },
    { label: "Stories", route: "/stories" },
    { label: "Contact", route: "/contact" },
  ];

  useGSAP(
    () => {
      const menuLinks = menuLinksRef.current;
      const menuOverlay = menuOverlayRef.current;
      const menuImage = menuImageRef.current;
      const menuLinkContainers = menuLinkContainersRef.current;

      splitTextInstances.current.forEach((split) => split.revert());
      splitTextInstances.current = [];

      menuLinks.forEach((link) => {
        if (!link) return;

        const chars = link.querySelectorAll("span");
        chars.forEach((char, charIndex) => {
          const split = new SplitText(char, { type: "chars" });
          splitTextInstances.current.push(split);
          split.chars.forEach((char) => {
            char.classList.add("char");
          });
          if (charIndex === 1) {
            gsap.set(split.chars, { y: "110%" });
          }
        });
      });

      gsap.set(menuImage, { y: 0, scale: 0.5, opacity: 0.25 });
      gsap.set(menuLinks, { y: "150%" });

      menuLinkContainers.forEach((link) => {
        if (!link) return;

        const handleMouseEnter = () => {
          if (window.innerWidth < 1000) return;

          const linkCopy = link.querySelectorAll("a span");
          if (!linkCopy || linkCopy.length < 2) return;

          const visibleCopy = linkCopy[0];
          const animatedCopy = linkCopy[1];

          const visibleChars = visibleCopy.querySelectorAll(".char");
          gsap.to(visibleChars, {
            y: "-110%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const animatedChars = animatedCopy.querySelectorAll(".char");
          gsap.to(animatedChars, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });
        };

        const handleMouseLeave = () => {
          if (window.innerWidth < 1000) return;

          const linkCopy = link.querySelectorAll("a span");
          if (!linkCopy || linkCopy.length < 2) return;

          const visibleCopy = linkCopy[0];
          const animatedCopy = linkCopy[1];

          const animatedChars = animatedCopy.querySelectorAll(".char");
          gsap.to(animatedChars, {
            y: "110%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const visibleChars = visibleCopy.querySelectorAll(".char");
          gsap.to(visibleChars, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);

        link._mouseEnterHandler = handleMouseEnter;
        link._mouseLeaveHandler = handleMouseLeave;
      });

      return () => {
        menuLinkContainers.forEach((link) => {
          if (!link) return;
          const mouseEnterHandler = link._mouseEnterHandler;
          const mouseLeaveHandler = link._mouseLeaveHandler;
          if (mouseEnterHandler)
            link.removeEventListener("mouseenter", mouseEnterHandler);
          if (mouseLeaveHandler)
            link.removeEventListener("mouseleave", mouseLeaveHandler);
        });

        splitTextInstances.current.forEach((split) => {
          if (split && split.revert) split.revert();
        });
        splitTextInstances.current = [];
      };
    },
    { scope: menuOverlayRef }
  );

  useEffect(() => {
    if (!lenis) return;
    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuAnimating) return;
    setIsMenuAnimating(true);

    const menuOverlay = menuOverlayRef.current;
    const menuImage = menuImageRef.current;
    const menuLinks = menuLinksRef.current;
    const openLabel = openLabelRef.current;
    const closeLabel = closeLabelRef.current;

    if (!isMenuOpen) {
      gsap.to(openLabel, {
        y: "-100%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(closeLabel, {
        y: "-100%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          setIsMenuOpen(true);
          setIsMenuAnimating(false);
          gsap.set(".menu-link", { overflow: "visible" });
        },
      });

      gsap.to(menuImage, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
      });

      gsap.to(menuLinks, {
        y: "0%",
        duration: 1.25,
        stagger: 0.1,
        delay: 0.25,
        ease: "expo.out",
      });
    } else {
      gsap.to(openLabel, {
        y: "0%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(closeLabel, {
        y: "0%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(menuImage, {
        y: "-25svh",
        opacity: 0.5,
        duration: 1.25,
        ease: "expo.out",
      });

      gsap.to(menuLinks, {
        y: "-100%",
        duration: 1,
        ease: "expo.out",
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(menuOverlay, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          gsap.set(menuLinks, { y: "150%" });
          gsap.set(menuImage, { y: "0", scale: 0.5, opacity: 0.25 });
          gsap.set(".menu-link", { overflow: "hidden" });

          setIsMenuOpen(false);
          setIsMenuAnimating(false);
        },
      });
    }
  };

  const renderMenuItems = (items, startIndex) => {
    return items.map((item, index) => {
      const globalIndex = startIndex + index;
      return (
        <div
          key={item.label}
          className="menu-link"
          ref={(el) => {
            menuLinkContainersRef.current[globalIndex] = el;
          }}
          onClick={(e) => {
            const isExternal = item.route.startsWith("http");
            if (isExternal) return;

            e.preventDefault();
            const currentPath = window.location.pathname;
            if (currentPath === item.route) {
              if (isMenuOpen) {
                toggleMenu();
              }
              return;
            }
            navigateWithTransition(
              item.route,
              isMenuOpen ? toggleMenu : null
            );
          }}
        >
          <a
            href={item.route}
            target={item.route.startsWith("http") ? "_blank" : undefined}
            rel={item.route.startsWith("http") ? "noopener noreferrer" : undefined}
            ref={(el) => {
              menuLinksRef.current[globalIndex] = el;
            }}
          >
            <span>{item.label}</span>
            <span>{item.label}</span>
          </a>
        </div>
      );
    });
  };

  return (
    <>
      <nav>
        <div className="nav-logo">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              const currentPath = window.location.pathname;
              if (currentPath === "/") {
                return;
              }
              navigateWithTransition("/", isMenuOpen ? toggleMenu : null);
            }}
          >
            <img src="/logo.svg" alt="" />
          </a>
        </div>

        <div className="nav-right">
          <a
            href="https://www.youtube.com/@iglesiaadventistahispanade6056"
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-nav-btn"
            style={{ display: "flex", alignItems: "center", color: "#cacacaff", mixBlendMode: "difference", }}
          >
            <FaYoutube size={30} />
          </a>
          <a
            href="/donaciones"
            className="donation-btn"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition("/donaciones", isMenuOpen ? toggleMenu : null);
            }}
          >
            <p className="donation-label">Donar</p>
          </a>

          <div className="nav-toggle" ref={navToggleRef} onClick={toggleMenu}>
            <div className="nav-toggle-wrapper">
              <p ref={openLabelRef} className="open-label">
                Menu
              </p>

              <p ref={closeLabelRef} className="close-label">
                Close
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-content">
          <div
            className="menu-col menu-col-left"
            ref={(el) => {
              menuColsRef.current[0] = el;
            }}
          >
            {renderMenuItems(menuItems.slice(0, 3), 0)}
          </div>
          <div
            className="menu-col menu-col-right"
            ref={(el) => {
              menuColsRef.current[1] = el;
            }}
          >
            {renderMenuItems(menuItems.slice(3, 6), 3)}
          </div>
        </div>

        <div className="menu-img">
          <img ref={menuImageRef} src="/menu/menu_img.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Menu;
