import React from 'react';
import Image from "next/image";
import {appleImg, bagImg, searchImg} from "@/utils";
import {navLists} from "@/constants";

const Navbar = () => {
    return (
        <header className={"w-full py-5 sm:px-10 px-5 flex justify-around items-center"}>
            <nav className={"flex w-full "}>
                <Image src={appleImg} alt={"logo"} width={18} height={14}/>
                <div className="flex flex-1 justify-center max-sm:hidden items-center">
                    {navLists.map((nav)=>(
                        <div key={nav} className={"px-5 w-1/11 text-sm cursor-pointer text-gray hover:text-white  duration-200 transition-all "}>
                            {nav}
                        </div>
                    ))}
                </div>
                <div className={"flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1"}>
                    <Image src={searchImg} alt={"search"} width={18} height={18}/>
                    <Image src={bagImg} alt={"bag"} width={18} height={18}/>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;