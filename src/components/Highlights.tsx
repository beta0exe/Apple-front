"use client"
import React from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { rightImg, watchImg } from "@/utils";
import VideoCarousel from "@/components/VideoCarousel";

const Highlights = () => {
    useGSAP(() => {
        gsap.to("#title", {
            opacity: 1,
            y: 0
        });
        gsap.to(".link", {
            opacity: 1,
            y: 0,
            duration: 1.3,
            stagger: 0.25,
        });
    }, []);

    return (
            <section
                id="highlights"
                className="w-screen overflow-hidden h-full sm:py-32 py-20 sm:px-10 px-5 bg-zinc"
            >
                <div className={"someextrapaddings "}>
                <div className="screen-max-width sm:py-32 py-20 sm:px-10 px-5">
                    <div className="someextramargins w-full flex flex-col md:flex-row items-end justify-between  somegap">
                        <h1 id="title" className="section-heading">Some Fancy Highlights :)</h1>

                        <div className="flex flex-wrap items-end gap-6">
                            <p className="link flex items-center gap-2">
                                Watch the film
                                <Image
                                    src={watchImg}
                                    alt="watch-icon"
                                    width={22}
                                    height={22}
                                    className=""
                                />
                            </p>
                            <p className="link flex items-center gap-2">
                                Watch the event
                                <Image
                                    src={rightImg}
                                    alt="right-icon"
                                    width={12}
                                    height={12}
                                    className="ml-2"
                                />
                            </p>
                        </div>
                    </div>

                    <VideoCarousel />
                </div>
                </div>
            </section>
    );
};

export default Highlights;
