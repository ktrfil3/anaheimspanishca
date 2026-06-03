"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./OrgChart.css";

gsap.registerPlugin(ScrollTrigger);

const OrgNode = ({ node, level = 0, isFirst = false }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`org-node-container level-${level}`}>
      {/* Node itself */}
      <div
        className={`org-node ${isFirst ? "org-node--root" : ""} ${hasChildren ? "org-node--expandable" : ""}`}
        onClick={() => hasChildren && setExpanded(!expanded)}
        role={hasChildren ? "button" : undefined}
        aria-expanded={hasChildren ? expanded : undefined}
      >
        <div className={`org-node__avatar ${isFirst ? "org-node__avatar--root" : ""}`}>
          <img src={node.photo} alt={node.name} />
          {hasChildren && (
            <span className={`org-node__toggle ${expanded ? "org-node__toggle--open" : ""}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          )}
        </div>
        <div className="org-node__info">
          <span className="org-node__name">{node.name}</span>
          <span className="org-node__title">{node.title}</span>
        </div>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="org-children">
          <div className="org-children__line-v" />
          <div className="org-children__row">
            {node.children.map((child, i) => (
              <div key={child.id} className="org-children__branch">
                <div className="org-children__line-h" />
                <OrgNode node={child} level={level + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const OrgChart = ({ data }) => {
  const sectionRef = useRef(null);
  const descRef = useRef(null);
  const chartRef = useRef(null);

  useGSAP(
    () => {
      // Animate description
      if (descRef.current) {
        gsap.from(descRef.current, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Animate chart
      if (chartRef.current) {
        gsap.from(chartRef.current, {
          opacity: 0,
          y: 80,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section className="org-chart-section" ref={sectionRef}>
      <div className="container">
        {/* Description */}
        <div className="org-chart-desc" ref={descRef}>
          <p className="sm">Estructura Organizacional</p>
          <h2 className="org-chart-desc__heading">Nuestra Estructura</h2>
          <p className="org-chart-desc__body">
            La Iglesia Adventista del Séptimo Día de Anaheim Spanish se organiza como un cuerpo vivo, donde cada líder y ministerio trabaja en armonía bajo la guía del Espíritu Santo. Nuestra estructura refleja los principios bíblicos de servicio, orden y comunidad.
          </p>
        </div>

        {/* Org Chart */}
        <div className="org-chart-wrapper" ref={chartRef}>
          <OrgNode node={data} level={0} isFirst={true} />
        </div>
      </div>
    </section>
  );
};

export default OrgChart;
