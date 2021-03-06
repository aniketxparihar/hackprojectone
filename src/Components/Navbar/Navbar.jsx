
import { signOut } from 'firebase/auth';
import React,{useState} from 'react'
import { useAuth } from '../../Context/Auth-Context';
import { useTheme } from '../../Context/Theme-Context';
import { auth } from '../../firebase/config';
import "./Navbar.css"


const Navbar = () => {
  const { theme, themeHandler, themeObject } = useTheme();
  const { user } = useAuth();
  const colors = [
    "#22d3ee",
    "#38bdf8",
    "#60a5fa",
    "#818cf8",
    "#a78bfa",
    "#9333ea",
    "#e879f9",
    "#14b8a6",
  ];
  const [bgColorIndex, setBgColorIndex] = useState(0);
  setTimeout(() => {
    bgColorIndex < 7 ? setBgColorIndex(bgColorIndex + 1) : setBgColorIndex(0);
  }, 1000);
  const logoutHandler=()=>{
    signOut(auth).then(()=>{
      localStorage.setItem("token","")
      console.log("logout success")
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  const date = new Date();
  return (
    <div
      className="navbar__container bg-gray-400 m-8 h-20 rounded-2xl flex border-l-8 border-r-8 border-cyan-500"
      style={{ backgroundColor: themeObject.secondary }}
    >
      <div
        className="navbar__container--heading ml-8 text-2xl  font-bold"
        style={{ color: `${colors[bgColorIndex]}`, transition: "2s" }}
      >
         Tabfi
      </div>

      <div className="soundcloud-container ml-8">
        <iframe
          width="60%"
          height={74}
          scrolling="yes"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1143199600&color=%23070909&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        />
      </div>

      <div className="navbar__container--right m-8 flex justify-content items-center">
        <div className="navbar__container--theme mr-6 flex justify-content items-center">
          <span
            className="material-symbols-outlined rounded-full p-2 cursor-pointer"
            style={{
              color: themeObject.text,
              backgroundColor: themeObject.primary,
            }}
            onClick={logoutHandler}
          >
            logout
          </span>
        </div>
        <div
          className="navbar__container--date  p-2 rounded-xl"
          style={{
            color: themeObject.text,
            backgroundColor: themeObject.primary,
          }}
        >
          {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}
        </div>
        <div className="navbar__container--theme ml-6 flex justify-content items-center">
          <span
            className="material-symbols-outlined rounded-full p-2 cursor-pointer"
            style={{
              color: themeObject.text,
              backgroundColor: themeObject.primary,
            }}
            onClick={themeHandler}
          >
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
        </div>
        <div
          className="username-navbar ml-6 mr-6 flex justify-content items-center  "
          style={{
            color: themeObject.text,
          }}
        >
          Hi , {user?.displayName}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
