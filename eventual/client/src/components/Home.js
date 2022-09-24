import React from 'react'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <div className="homeWrapper">
        <Sidebar/>
        <div className="homeContent">
            <h1>Home</h1>
        </div>
    </div>
  )
}

export default Home