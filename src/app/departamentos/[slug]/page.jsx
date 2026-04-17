"use client";
import "./departamento.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import DriveLibrary from "@/components/DriveLibrary/DriveLibrary";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { departamentos } from "@/data/departamentos";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DepartamentoPage = () => {
  const params = useParams();
  const slug = params.slug;

  const data = departamentos.find((d) => d.slug === slug);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!data) {
    return (
      <div className="departamento-page not-found">
        <div className="container">
          <h1>Departamento no encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="departamento-page">
      <section className="departamento-hero">
        <div className="container">
          <div className="departamento-hero-row">
            <Copy delay={0.8}>
              <h1>{data.name}</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="departamento-leader-section">
        <div className="container">
          <div className="leader-info-wrapper">
            <div className="leader-photo">
              <img src={data.leaderPhoto} alt={data.leaderName} />
            </div>
            <div className="leader-name">
              <h3>{data.leaderName}</h3>
              <p className="cap">Director Departamental</p>
            </div>
          </div>
        </div>
      </section>

      <section className="departamento-description">
        <div className="container">
          <Copy animateOnScroll={true}>
            <p className="lg">
              {data.description}
            </p>
          </Copy>
        </div>
      </section>

      <section className="departamento-library-section">
        <div className="container">
          <Copy animateOnScroll={true}>
            <DriveLibrary materials={data.materials} />
          </Copy>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DepartamentoPage;
