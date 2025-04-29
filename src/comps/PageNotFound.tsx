import { useNavigate } from "react-router"
import '../styles/NotFound.css'

export default function NotFound(){
    const navi =  useNavigate();
    return (
        <div className="NotFound">
            <h1>404 Page Not Found :(</h1>
            <p>How did u get here ?!</p>
            <button onClick={() => navi("/")}>Teleport</button>
            <p> click this button ⤴️ </p>
        </div>
    )
}