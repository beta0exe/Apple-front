"use client"
import React, {useEffect, useState} from 'react';
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {heroVideo,smallHeroVideo} from "@/utils";

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(heroVideo);

    useEffect(() => {
        // Function to set video source based on window width
        const handleVideoSrcSet = () => {
            if (window.innerWidth < 760) {
                setVideoSrc(smallHeroVideo);
            } else {
                setVideoSrc(heroVideo);
            }
        };

        // Run once on mount
        handleVideoSrcSet();

        // Optional: update on window resize
        window.addEventListener("resize", handleVideoSrcSet);

        // Cleanup listener on unmount
        return () => window.removeEventListener("resize", handleVideoSrcSet);
    }, []);

    useGSAP(()=>{
         gsap.to("#hero",{
             opacity: 1,
             delay: 2,
         }),
         gsap.to("#cta",
             {opacity: 1,
             delay: 2,
             y:-50,
             ease:"bounce.out",
             })
    },[]);
    return (
        <section className={"w-full nav-height bg-black relative "}>
            <div className={"h-5/6 w-full flex-center flex-col gap-5"}>
                <p id={"hero"} className={"hero-title"}>iPhone shop</p>
                <div className={"md:w-10/12 w-9/12"}>
                    <video className={"pointer-event-none"} autoPlay muted  playsInline={true} key={videoSrc}>
                        <source src={videoSrc} type={"video/mp4"}/>
                    </video>
                </div>
            </div>
            <div id={"cta"} className={"flex flex-col items-center opacity-0 translate-y-20 gap-5 "}>
                <a href={"#hightli eghts"}   className="duration-150 inline-block min-w-[4rem] min-h-[2rem] text-center
                text-xl bg-blue-500 hover:bg-[#000000] hover:text-[#64605A] hover:border-1 hover:border-[#64605A] mb-2 rounded-full py-4 px-8"
                >Buy</a>
                <p className={"font-normal text-xl"}>From $199/month or $999</p>
            </div>
        </section>
    );
};

export default Hero;