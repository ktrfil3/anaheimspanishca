"use client";
import React from "react";
import "./donations.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";

const Page = () => {
    return (
        <div className="donations-page">
            <section className="project-header">
                <Copy delay={0.75}>
                    <p>Tu ofrenda hace la diferencia</p>
                    <h1>Apoya Nuestra Misión</h1>
                </Copy>
            </section>

            <section className="donation-content">
                <Copy animateOnScroll={true}>
                    <p className="lg">
                        A través de tus donaciones voluntarias, podemos continuar llevando el mensaje de esperanza y salvación. Cada contribución ayuda a mantener nuestros ministerios y alcanzar a más personas.
                    </p>
                </Copy>

                <Copy animateOnScroll={true} delay={0.2}>
                    <a href="https://adventistgiving.org/donate/ANPMBB" target="_blank" rel="noopener noreferrer" className="paypal-btn">
                        Donar vía Adventist Giving
                    </a>
                </Copy>
            </section>

            <Footer />
        </div>
    );
};

export default Page;
