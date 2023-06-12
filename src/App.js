import { useState, useRef } from 'react';
import './App.css';
import Auth from './components/Auth';
import Chat from './components/Chat';
import Cookies from 'universal-cookie';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
const cookies = new Cookies();

function App() {
  const [user] = useAuthState(auth);
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const SignUserOut = async ()=> {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }
  if(!isAuth){
    return (
      <>
        <div className="title">
          <h1>Chat App</h1>
        </div>
        <div className="App">
          <Auth setIsAuth={setIsAuth}/>
        </div>
    </>  
    );
  }

  return (
    <>
      <div className="title">
        <h1>Chat App</h1>
      </div>
      {
        room ? (<Chat room={room} />) : (
          <div className="room">
            <label>Enter Room Name : </label>
            <input ref={roomInputRef}/>
            <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
          </div>
        )
      }
      <div>
        <h3 className='userName'>{user?.displayName}</h3>
        <div className="img-box">
          <img src={user?.photoURL} alt="profilePic" />
        </div>
        <button className="sign-out" onClick={SignUserOut}>Sign Out</button>
      </div>
    </>
  )
}

export default App;
