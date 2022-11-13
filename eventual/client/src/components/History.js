import { useContext } from 'react'
import SidebarPro from './SidebarPro'
import { ThemeContext } from "./ThemeContext";

const History = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <div className="historyWrapper">
        <SidebarPro/>
        <div className="historyContent" data-theme={theme}>
            <h1>History</h1>
        </div>
    </div>
  )
}

export default History