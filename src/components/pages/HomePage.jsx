import React, { useEffect } from 'react'
import Navbar from "./homepage-comps/Navbar"
import Home from "./homepage-comps/Home"
import MyProjects from "./homepage-comps/MyProjects"
import Techs from "./homepage-comps/Techs"
import Contact from "./homepage-comps/Contact"
import EducationSection from './homepage-comps/EducationSection'

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Navbar />
            <Home />
            <MyProjects />
            <Techs />
            <EducationSection/>
            <Contact />
        </>
    )
}

export default HomePage