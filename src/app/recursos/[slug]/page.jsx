"use client";
import React from "react";
import { useParams } from "next/navigation";
import { resources } from "@/data/resources";
import "./resource.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";

const Page = () => {
    const params = useParams();
    const { slug } = params;
    const resource = resources[slug];

    if (!resource) {
        return (
            <div className="resource-page">
                <div className="project-header">
                    <h1>Recurso no encontrado</h1>
                    <p>La sección que buscas no existe o está en construcción.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="resource-page">
            <section className="project-header">
                <Copy delay={0.75}>
                    <p>Biblioteca de Recursos</p>
                    <h1>{resource.title}</h1>
                </Copy>
            </section>

            <section className="project-details">
                <Copy animateOnScroll={true}>
                    <div className="details">
                        <p>Descripción</p>
                        <h3>{resource.description}</h3>
                    </div>
                </Copy>
            </section>

            <section className="resource-library">
                <div className="library-header">
                    <Copy animateOnScroll={true}>
                        <h2>Archivos Disponibles</h2>
                    </Copy>
                </div>

                <div className="file-grid">
                    {resource.files.map((file, index) => (
                        <a
                            key={index}
                            href={file.link}
                            className="file-card"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="file-info">
                                <h4>{file.name}</h4>
                                <div className="file-meta">
                                    <span className="file-type">{file.type}</span>
                                    <span className="file-size">{file.size}</span>
                                </div>
                            </div>
                            <div className="download-icon">
                                📥
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Page;
