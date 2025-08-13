"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "@/components/ModelView";
import { yellowImg } from "@/utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { models, sizes } from "@/constants";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

function Model() {
    const [size, setSize] = useState<"small" | "large">("small");
    const [model, setModel] = useState({
        title: "iPhone 15 Pro in Natural Titanium",
        color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
        img: yellowImg,
    });

    const cameraControlSmall = useRef<OrbitControlsImpl | null>(null);
    const cameraControlLarge = useRef<OrbitControlsImpl | null>(null);
    const small = useRef<THREE.Group>(null);
    const large = useRef<THREE.Group>(null);

    useGSAP(() => {
        gsap.to("#heading", { y: 0, opacity: 1, duration: 1 });
    }, []);

    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading someextrapaddings">
                    Take a look At this Giga chad Iphone :D
                </h1>

                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[75vh] md:h-[90vh] relative">
                        <Canvas
                            gl={{ antialias: true }}
                            camera={{ position: [0, 0, 4], fov: 45 }}
                        >
                            <ModelView
                                index={1}
                                groupRef={small}
                                gsapType="view1"
                                controlRef={cameraControlSmall}
                                setRotationState={() => {}}
                                item={model}
                                size={size}
                                active={size === "small"}
                            />
                            <ModelView
                                index={2}
                                groupRef={large}
                                gsapType="view2"
                                controlRef={cameraControlLarge}
                                setRotationState={() => {}}
                                item={model}
                                size={size}
                                active={size === "large"}
                            />
                        </Canvas>
                    </div>

                    <div className="model-controls">
                        <p className="text-sm font-light text-center mb-4">
                            {model.title}
                        </p>
                        <div className="flex-center">
                            <ul className="color-container">
                                {models.map((item, i) => (
                                    <li
                                        key={i}
                                        className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                                        style={{ backgroundColor: item.color[0] }}
                                        onClick={() => setModel(item)}
                                    />
                                ))}
                            </ul>
                            <div className="size-btn-container">
                                {sizes.map(({ label, value }) => (
                                    <button
                                        key={label}
                                        className={`size-btn ${size === value ? 'bg-white text-black' : 'bg-transparent text-white'}`}
                                        onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Model;