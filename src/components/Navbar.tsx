import React from 'react';
import Image from "next/image";
import {appleImg, bagImg, searchImg} from "@/utils";

const Navbar = () => {
    return (
        <header className={"w-full py-5 sm:px-10 px-5 flex justify-between items-center"}>
            <nav className={"flex w-full "}>
                <Image src={appleImg} alt={"logo"} width={18} height={14}/>
                <div className=" flex flex-1 justify-center ">
                    {["one", "two", "three"].map((nav)=>(
                        <div key={nav}>
                            {nav}
                        </div>
                    ))}
                </div>
                <div>
                    <Image src={searchImg} alt={"search"} width={18} height={18}/>
                    <Image src={bagImg} alt={"bag"} width={18} height={18}/>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;