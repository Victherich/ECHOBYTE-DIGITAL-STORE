import React, { useContext, useEffect, useState } from 'react'
import CategoryHero from './CategoryHero'
import CategoryProducts from './CategoryProducts'
import { use } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from './Context'

const CategoryPage = () => {
    const {id}=useParams();
    const {categories}=useContext(Context);
    const [selectedCategory, setSelectedCategory]=useState({});

    useEffect(()=>{
        const obj = categories.find((e)=>e.id===id);
        setSelectedCategory(obj);
    },[id])

  return (
    <div>
      <CategoryHero selectedCategory={selectedCategory}/>
      <CategoryProducts id={id} selectedCategory={selectedCategory}/>
    </div>
  )
}

export default CategoryPage
