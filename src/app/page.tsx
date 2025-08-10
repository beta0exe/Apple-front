import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function Home() {
    return (
        <main className={"bg-black"}>
            <Navbar />
            <Hero />
            <Highlights/>
        </main>
    );
}