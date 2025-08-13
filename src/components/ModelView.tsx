import React, { Suspense } from "react";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import Lights from "@/components/Lights";
import Iphone from "@/components/Iphone";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Loader from "@/components/Loader";

interface ModelViewProps {
    index: number;
    groupRef: React.RefObject<THREE.Group | null>;
    gsapType: string;
    controlRef: React.RefObject<OrbitControlsImpl | null>;
    setRotationState: React.Dispatch<React.SetStateAction<number>>;
    size: string;
    item: {
        title: string;
        color: string[];
        img: string;
    };
    active: boolean;
}

const ModelView: React.FC<ModelViewProps> = ({
                                                 index,
                                                 groupRef,
                                                 controlRef,
                                                 setRotationState,
                                                 size,
                                                 item,
                                                 active
                                             }) => {
    return (
        <>
            {active && (
                <>
                    <ambientLight intensity={0.3} />
                    <Lights />

                    <PerspectiveCamera
                        makeDefault
                        position={[0,0,4]}
                    />

                    <OrbitControls
                        makeDefault
                        ref={controlRef}
                        enableZoom={false}
                        enablePan={false}
                        rotateSpeed={0.4}
                        target={new THREE.Vector3(0, 0, 0)}
                        onChange={() => {
                            if (controlRef.current) {
                                setRotationState(controlRef.current.getAzimuthalAngle());
                            }
                        }}
                    />

                    <group
                        ref={groupRef}
                        position={[0, 0, 0]}
                    >
                        <Suspense fallback={<Loader/>}>
                            <Iphone
                                scale={size === "small" ? [15, 15, 15] : [17, 17, 17]}
                                item={item}
                                size={size}
                            />
                        </Suspense>
                    </group>
                </>
            )}
        </>
    );
};

export default ModelView;