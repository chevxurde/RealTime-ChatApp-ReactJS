import { auth, provider } from '../firebase-config.js'; 
import { signInWithPopup } from 'firebase/auth';
import '../styles/Auth.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const Auth = (props) => {
  const { setIsAuth } = props;
  const SignInWithGoogle = async ()=> {
    try{
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
        // const profilePic = result.user.photoURL;
        // localStorage.setItem("profilePic", profilePic);
    }catch(err){
        console.error(err);
    }
  }
  return (
    <div className='auth'>
        <p> Sign In With Google To Continue </p>
        <button className='login-with-google-btn' onClick={SignInWithGoogle}> Sign In With Google </button>
    </div>
  )
}

export default Auth