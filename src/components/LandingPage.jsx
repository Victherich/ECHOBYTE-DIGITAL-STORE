
import React from 'react'
import HeroSection from './Hero'
// import AllProducts from './AllProducts'
import LatestProducts from './LatestProducts'
// import Categories from './CategoryComponent'
// import YouTube from 'react-youtube'
// import CourseVideo from './CourseVideo'
import AccountInfoPage from './AccountInfoPage'
import AccessCoursesCTA from './AccessCoursesCTA'

// const Section = styled.section`
//   background-color: #111827;
//   padding: 5rem 1.5rem;
// `;


const LandingPage = () => {
  return (
    <div style={{backgroundColor:"#111827"}}>
      <HeroSection/>
      {/* <Categories/> */}
    <AccessCoursesCTA/>
      <LatestProducts/>
        <AccountInfoPage/>
      {/* <CourseVideo/> */}
        <p style={{textAlign:"center",padding:"10px", fontSize: "0.95rem", color: "white", lineHeight: "1.5" }}>
  DO YOU WANT TO BUILD YOUR PORTFOLIO?{" "}
  <a 
    href="https://myportfolioechobyte.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ color: "#6366f1", fontWeight: "700", textDecoration: "underline" }}
  >
    CLICK HERE TO START
  </a>
</p>
 <p style={{textAlign:"center",padding:"10px", fontSize: "0.95rem", color: "white", lineHeight: "1.5" }}>
  TO START SELLING DIGITAL PRODUCTS AND SERVICES?{" "}
  <a 
    href="https://echobytedigitalmarketplace.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ color: "#6366f1", fontWeight: "700", textDecoration: "underline" }}
  >
    CLICK HERE TO START
  </a>
</p>
    </div>
  )
}

export default LandingPage
