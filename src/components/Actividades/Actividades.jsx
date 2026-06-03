"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Actividades.css";

const Actividades = ({ data }) => {
    const [activeCategory, setActiveCategory] = useState("todos");
    const [selectedActivity, setSelectedActivity] = useState(null);
    const containerRef = useRef(null);
    const gridRef = useRef(null);

    const categories = [
        { id: "todos", name: "Todos" },
        { id: "adultos", name: "Adultos" },
        { id: "familias", name: "Familias" },
        { id: "jovenes", name: "Jóvenes" },
        { id: "ninos-infantes", name: "Niños e Infantes" }
    ];

    const filteredActivities = activeCategory === "todos"
        ? data
        : data.filter(act => act.category === activeCategory);

    // Animate grid cards on activeCategory changes
    useGSAP(
        () => {
            const cards = gsap.utils.toArray(".activity-card");
            if (cards.length > 0) {
                gsap.killTweensOf(cards);
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 30, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.08,
                        overwrite: "auto"
                    }
                );
            }
        },
        { dependencies: [activeCategory], scope: gridRef }
    );

    // Animate title and intro text on initial load
    useGSAP(
        () => {
            gsap.from(".actividades-header p", {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".actividades-header h2", {
                opacity: 0,
                y: 30,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.15
            });
            gsap.from(".actividades-intro", {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out",
                delay: 0.25
            });
            gsap.from(".categories-nav", {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out",
                delay: 0.35
            });
        },
        { scope: containerRef }
    );

    const openModal = (activity) => {
        setSelectedActivity(activity);
        // Prevent body scroll
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedActivity(null);
        // Restore body scroll
        document.body.style.overflow = "";
    };

    return (
        <section className="actividades-section" ref={containerRef}>
            <div className="container">
                <div className="actividades-header">
                    <p className="sm">Vida e Integración de la Iglesia</p>
                    <h2>Nuestras Actividades</h2>
                    <p className="actividades-intro">
                        Participa en las diferentes actividades y ministerios pensados para cada etapa de la vida. En la Iglesia Adventista de Anaheim Spanish nos apoyamos mutuamente, crecemos en fe y servimos con amor en la comunidad.
                    </p>
                </div>

                <div className="categories-nav">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                <div className="actividades-grid" ref={gridRef}>
                    {filteredActivities.map((act) => (
                        <div
                            key={act.id}
                            className="activity-card"
                            onClick={() => openModal(act)}
                        >
                            <div className="activity-card__img-wrapper">
                                <img src={act.image} alt={act.title} loading="lazy" />
                                <div className="activity-card__overlay" />
                                <div className="activity-card__category-pill">
                                    {act.categoryName}
                                </div>
                            </div>
                            <div className="activity-card__content">
                                <span className="activity-card__schedule">{act.schedule}</span>
                                <h3 className="activity-card__title">{act.title}</h3>
                                <p className="activity-card__description">{act.description}</p>
                                <div className="activity-card__footer">
                                    <span className="activity-card__more-btn">
                                        Ver detalles 
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedActivity && (
                <div className="activity-modal-overlay" onClick={closeModal}>
                    <div
                        className="activity-modal-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="activity-modal__close-btn" onClick={closeModal} aria-label="Cerrar modal">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <div className="activity-modal__image-side">
                            <img src={selectedActivity.image} alt={selectedActivity.title} />
                        </div>
                        <div className="activity-modal__info-side">
                            <span className="activity-modal__category">{selectedActivity.categoryName}</span>
                            <h2 className="activity-modal__title">{selectedActivity.title}</h2>
                            <div className="activity-modal__schedule-box">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span>{selectedActivity.schedule}</span>
                            </div>
                            <p className="activity-modal__description">{selectedActivity.description}</p>
                            <div className="activity-modal__invite">
                                <h3>¿Cómo participar?</h3>
                                <p>Todos son bienvenidos a unirse a esta actividad. No se requiere inscripción previa. Te invitamos a asistir en el horario indicado o ponerte en contacto con nosotros para mayor información.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Actividades;
