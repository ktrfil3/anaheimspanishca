"use client";
import "./departamentos.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { departamentos } from "@/data/departamentos";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

const DepartamentosPage = () => {
  const { navigateWithTransition } = useViewTransition();

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

  return (
    <div className="departamentos-page">
      <section className="departamentos-header">
        <div className="container">
          <div className="departamentos-header-row">
            <Copy delay={0.8}>
              <h1>Departamentos</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="departamentos-grid-section">
        <div className="container">
          <div className="departamentos-grid">
            {departamentos.map((dept, index) => (
              <div 
                key={dept.slug} 
                className="departamento-card"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(`/departamentos/${dept.slug}`);
                }}
              >
                <div className="departamento-card-img-wrapper">
                  <img src={dept.leaderPhoto} alt={dept.leaderName} />
                </div>
                <div className="departamento-card-info">
                  <h3>{dept.name}</h3>
                  <p>{dept.leaderName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DepartamentosPage;
