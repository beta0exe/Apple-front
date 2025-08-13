import React from 'react';
import {Html} from "@react-three/drei";

const MyComponent = () => {
    return (
        <Html>
            <div className={"absolute top-0 left-0 w-full h-full flex justify-center items-center "}>
                <div className={"w-[10vw] h-[10vw] rounded-full text-5xl"}>Loading...</div>
            </div>
        </Html>
    );
};

export default MyComponent;
