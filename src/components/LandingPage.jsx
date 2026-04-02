
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
      
    </div>
  )
}

export default LandingPage
