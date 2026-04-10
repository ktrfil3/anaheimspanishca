"use client";
import { useEffect, useState } from "react";
import "./story.css";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { stories } from "@/components/StorySlides/stories";
import { notFound } from "next/navigation";
import React from "react";

const Page = ({ params }) => {
    // Unwrap params using React.use() if needed in future Next.js versions, but currently simple access or await if it were server component.
    // Since this is a client component ('use client'), params are passed as props, but in Next.js 15+ params might be a promise.
    // For safety in modern Next.js app directory usage with 'use client':
    // It's often safer to rely on props directly if they are synchronous, but recent changes suggest params might be async in server components.
    // In a client component attached to a page.js, params are available.

    // Let's assume params are available directly for now, or handle if it's a promise.
    // Note: In Next 15, params is a Promise. In Next 14, it is an object.
    // To be safe, we can use a small effect or just try to access it. given previous files didn't use `use` or async params, I'll assume standard access or handle unwrapping.

    const [slug, setSlug] = useState(null);

    useEffect(() => {
        // Handle params being a promise or object
        Promise.resolve(params).then((resolvedParams) => {
            setSlug(resolvedParams.slug);
        });
    }, [params]);

    if (!slug) return null; // or a loading spinner

    const storyIndex = stories.findIndex((s) => s.slug === slug);
    const story = stories[storyIndex];

    if (!story) {
        notFound();
        return null;
    }

    const nextStoryIndex = (storyIndex + 1) % stories.length;
    const nextStory = stories[nextStoryIndex];

    return (
        <div className="story-page">
            <section className="story-header">
                <Copy delay={0.75}>
                    <p className="lg">{story.category || "Story"}</p>
                    <h1>{story.title.join(" ")}</h1>
                </Copy>
            </section>

            <section className="story-banner-img">
                <div className="story-banner-img-wrapper">
                    <img src={story.storyImg} alt={story.title.join(" ")} />
                </div>
            </section>

            <section className="story-details">
                <Copy animateOnScroll={true}>
                    <div className="details">
                        <p>Source</p>
                        <h3>
                            {story.profileName}
                        </h3>
                    </div>

                    <div className="details">
                        <p>Date</p>
                        <h3>{story.date || "2025"}</h3>
                    </div>

                    <div className="details">
                        <p>Summary</p>
                        <h3>
                            {story.title.join(" ")} - A deep dive into the creative process.
                        </h3>
                    </div>
                </Copy>
            </section>

            <section className="story-images">
                <div className="story-images-container">
                    {/* Placeholder images as we don't have unique extra images per story yet */}
                    <div className="story-img">
                        <div className="story-img-wrapper">
                            <img src="/project/sample-project-2.jpg" alt="" />
                        </div>
                    </div>

                    <div className="story-img">
                        <div className="story-img-wrapper">
                            <img src="/project/sample-project-3.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="next-story">
                <Copy animateOnScroll={true}>
                    <p style={{ marginBottom: "1rem" }}>Next Story</p>
                    <h2>Read Next</h2>
                </Copy>

                <a href={nextStory.linkSrc} className="next-story-img">
                    <div className="next-story-img-wrapper">
                        <img src={nextStory.storyImg} alt="" />
                    </div>
                </a>

                <Copy animateOnScroll={true}>
                    <h3>{nextStory.title[0]}...</h3>
                </Copy>
            </section>

            <Footer />
        </div>
    );
};

export default Page;
