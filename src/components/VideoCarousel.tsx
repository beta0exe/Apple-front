"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap, { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

interface VideoState {
    isEnd: boolean;
    startPlay: boolean;
    videoId: number;
    isLastVideo: boolean;
    isPlaying: boolean;
}

type VideoAction = "video-end" | "video-last" | "video-reset" | "play";

const VideoCarousel: React.FC = () => {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
    const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

    const [video, setVideo] = useState<VideoState>({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const { isLastVideo, isPlaying, startPlay, videoId } = video;
    const [loadedData, setLoadedData] = useState<boolean[]>([]);

    useEffect(() => {
        if (loadedData.filter(Boolean).length === hightlightsSlides.length) {
            const currentVideo = videoRef.current[videoId];
            if (!isPlaying) {
                currentVideo?.pause();
            } else if (startPlay) {
                currentVideo?.play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleLoadedMetaData = (i: number) => {
        setLoadedData((prev) => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
        });
    };

    useGSAP(
        () => {
            gsap.to("#slider", {
                transform: `translateX(${-100 * videoId}%)`,
                duration: 2,
                ease: Power2.easeInOut,
            });

            gsap.to(`#video-${videoId}`, {
                scrollTrigger: {
                    trigger: `#video-${videoId}`,
                    toggleActions: "restart none none none",
                },
                onComplete: () => {
                    setVideo((prev) => ({
                        ...prev,
                        startPlay: true,
                        isPlaying: true,
                    }));
                },
            });
        },
        [video.isEnd, videoId]
    );

    useEffect(() => {
        let currentProgress = 0;
        const span = videoSpanRef.current;

        if (span[videoId]) {
            const anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    if (typeof window !== "undefined") {
                        const progress = Math.ceil(anim.progress() * 100);
                        if (progress !== currentProgress) {
                            currentProgress = progress;
                            gsap.to(videoDivRef.current[videoId], {
                                width:
                                    window.innerWidth < 760
                                        ? "10vw"
                                        : window.innerWidth < 1200
                                            ? "10vw"
                                            : "4vw",
                            });
                        }
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white",
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], { width: "12px" });
                        gsap.to(span[videoId], { background: "#afafaf" });
                    }
                },
            });

            if (videoId === 0) {
                anim.restart();
            }

            const animUpdate = () => {
                const vid = videoRef.current[videoId];
                if (vid) {
                    anim.progress(
                        vid.currentTime / hightlightsSlides[videoId].videoDuration
                    );
                }
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay, isPlaying]);

    const handleProcess = (type: VideoAction, i?: number) => {
        switch (type) {
            case "video-end":
                if (typeof i === "number") {
                    setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
                }
                break;
            case "video-last":
                setVideo((prev) => ({ ...prev, isLastVideo: true }));
                break;
            case "video-reset":
                setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
                break;
            case "play":
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
                break;
        }
    };

    return (
        <>
            <div className="flex items-center  extragaps">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10 someextramargins flex gap-1">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black ">
                                <video
                                    id={`video-${i}`}
                                    playsInline
                                    preload="auto"
                                    muted
                                    ref={(el) => {
                                        if (el) videoRef.current[i] = el;
                                    }}
                                    onPlay={() =>
                                        setVideo((prevVideo) => ({
                                            ...prevVideo,
                                            isPlaying: true,
                                        }))
                                    }
                                    onEnded={() =>
                                        i === hightlightsSlides.length - 1
                                            ? handleProcess("video-last")
                                            : handleProcess("video-end", i)
                                    }
                                    onLoadedMetadata={() => handleLoadedMetaData(i)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text) => (
                                    <p key={text} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10 ">
                <div className="color-container">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => {
                                if (el) videoDivRef.current[i] = el;
                            }}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >
              <span
                  className="absolute h-full w-0 bg-blue-500 rounded-full"
                  ref={(el) => {
                      if (el) videoSpanRef.current[i] = el;
                  }}
              />
            </span>
                    ))}
                </div>
                <button className="control-btn color-container">
                    <Image
                        width={20}
                        height={20}
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={
                            isLastVideo
                                ? () => handleProcess("video-reset")
                                : () => handleProcess("play")
                        }
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;
