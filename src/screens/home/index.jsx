import { signOut } from "../../store/auth";
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    return (<div> 
        <h1>Home</h1>
        <button onClick = {() => {
            console.log("Clicked...");
            dispatch(signOut());
        }}>Log Out</button>
    </div> );
}
 
export default Home;