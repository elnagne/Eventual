import { useContext } from 'react'
import SidebarPro from './SidebarPro'
import { ThemeContext } from "./ThemeContext";

const Home = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <div className="homeWrapper">
        <SidebarPro/>
        <div className="homeContent" data-theme={theme}>
            <h1>Home</h1>
        </div>
    </div>
  )
}

export default Home