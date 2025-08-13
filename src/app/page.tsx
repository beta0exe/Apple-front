import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Model from "@/components/Model";

export default function Home() {
    return (
        <main className={"bg-black"}>
            <Navbar />
            <Hero/>
            <Highlights/>
            <Model />
        </main>
    );
}