import React from "react";
import NavBar from "../components/NavBar";
import AboutUs from "../components/AboutUs";
import Menu from "../components/Menu";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

export default function Home(){
    return (
        <div>
            <NavBar />
            <AboutUs />
            <Menu />
            <Reviews />
            <Footer />
        </div>
    );
}