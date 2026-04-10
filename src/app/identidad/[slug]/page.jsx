"use client";
import React from "react";
import { useParams } from "next/navigation";
import { articles } from "@/data/identityArticles";
import { projects } from "@/components/FeaturedWork/project";
import "./../identidad.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";

const Page = () => {
    const params = useParams();
    const { slug } = params;

    // Find project metadata and article content
    const project = projects.find((p) => p.slug === slug);
    const article = articles[slug];

    if (!project || !article) {
        return (
            <div className="identity-page">
                <div className="project-header">
                    <h1>Artículo no encontrado</h1>
                    <p>El contenido que buscas no está disponible.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="identity-page">
            <section className="project-header">
                <Copy delay={0.75}>
                    <p className="lg">{article.subtitle}</p>
                    <h1>{article.title}</h1>
                </Copy>
            </section>

            <section className="project-banner-img">
                <div className="project-banner-img-wrapper">
                    <img src={project.img} alt={project.name} />
                </div>
            </section>

            <section className="project-details">
                <Copy animateOnScroll={true}>
                    <div className="details">
                        <p>Artículo</p>
                        <h3 className="main-content">
                            {article.content}
                        </h3>
                    </div>

                    {article.details && Object.entries(article.details).map(([key, value]) => (
                        <div className="details" key={key}>
                            <p>{key}</p>
                            <h3>{value}</h3>
                        </div>
                    ))}
                </Copy>
            </section>

            <Footer />
        </div>
    );
};

export default Page;
