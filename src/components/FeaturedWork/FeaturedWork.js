"use client";
import "./FeaturedWork.css";
import { useRef } from "react";
import { projects } from "./project.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FeaturedWork() {
  const featuredWorkContainerRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();

  useGSAP(
    () => {
      const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const regExp =
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11
          ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&controls=1`
          : null;
      };

      const createFeaturedWorkItem = (project) => {
        const featuredWorkItem = document.createElement("div");
        featuredWorkItem.className = "featured-work-item";
        const embedUrl = getYouTubeEmbedUrl(project.img);

        if (embedUrl) {
          featuredWorkItem.innerHTML = `
          <div class="featured-work-item-link video-item">
            <div class="featured-work-item-img">
             <div class="featured-work-item-copy">
              <h3>${project.name}</h3>
            </div>
               <iframe 
                src="${embedUrl}" 
                title="${project.name}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen
                style="width: 100%; height: 100%; object-fit: cover; pointer-events: auto; position: relative; z-index: 2;">
              </iframe>
            </div>
          </div>
        `;
        } else {
          featuredWorkItem.innerHTML = `
          <a href="${project.route}" class="featured-work-item-link">
            <div class="featured-work-item-img">
             <div class="featured-work-item-copy">
              <h3>${project.name}</h3>
            </div>
              <img src="${project.img}" alt="${project.name}" />
            </div>
          </a>
        `;
        }
        return featuredWorkItem;
      };

      const workContainer = featuredWorkContainerRef.current;

      workContainer.innerHTML = "";

      for (let i = 0; i < projects.length; i += 2) {
        const row = document.createElement("div");
        row.className = "row";

        const leftItemIndex = i % projects.length;
        const rightItemIndex = (i + 1) % projects.length;

        row.appendChild(createFeaturedWorkItem(projects[leftItemIndex]));

        if (i + 1 < projects.length * 2) {
          row.appendChild(createFeaturedWorkItem(projects[rightItemIndex]));
        }

        workContainer.appendChild(row);
      }

      gsap.set(".featured-work-item", {
        y: 1000,
      });

      document.querySelectorAll(".row").forEach((row) => {
        const featuredWorkItems = row.querySelectorAll(".featured-work-item");

        featuredWorkItems.forEach((item, itemIndex) => {
          const isLeftProjectItem = itemIndex === 0;
          gsap.set(item, {
            rotation: isLeftProjectItem ? -60 : 60,
            transformOrigin: "center center",
          });
        });

        ScrollTrigger.create({
          trigger: row,
          start: "top 70%",
          onEnter: () => {
            gsap.to(featuredWorkItems, {
              y: 0,
              rotation: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.25,
            });
          },
        });
      });

      const links = workContainer.querySelectorAll(".featured-work-item-link");
      const handleClick = (e) => {
        const anchor = e.currentTarget;
        if (!anchor) return;
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (!href) return;
        navigateWithTransition(href);
      };
      links.forEach((a) => a.addEventListener("click", handleClick));

      return () => {
        links.forEach((a) => a.removeEventListener("click", handleClick));
      };
    },
    { scope: featuredWorkContainerRef }
  );

  return (
    <>
      <div className="featured-work-list" ref={featuredWorkContainerRef}></div>
    </>
  );
}
