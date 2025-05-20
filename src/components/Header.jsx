import React, { useContext } from 'react'
import { Context } from './Context'

const Header = () => {

    const {yes}=useContext(Context)

    console.log(yes)
  return (
    <div>
      
    </div>
  )
}

export default Header
