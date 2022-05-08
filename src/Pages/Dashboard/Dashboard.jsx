import React from "react";
import "./Dashboard.css";
import {useTheme} from "../../Context/Theme-Context";
import {LeaderBoard} from "./LeaderBoard";
import { useAuth } from "../../Context/Auth-Context";
import {GithubChart} from "./GithubChart";

const Dashboard = () => {
  const { themeObject } = useTheme();
  const { user } = useAuth();
  console.log(user)
  return (
    <section className="dashboard-ctn">
      <div className="dashboard-left-ctn">
        <div className="user-profile">
          <div className="user-img" >
            <img src={user.photoURL} alt="user image" />
          </div>
          <div className="user-detail">
            <h3 className="user-name" style={{color: themeObject.text}}>
              {user.displayName}
            </h3>
            <p className="user-email" style={{color: themeObject.text}}>
              {user.email}
            </p>
          </div>
        </div>
        <div
          className="project-data"
          style={{
            backgroundColor: themeObject.primary,
            color: themeObject.text,
          }}
        >
          <div className="project-data-item">
            <span className="material-icons pr-2">rocket_launch</span>
            Projects Completed
          </div>
          <div className="project-count">2/3</div>
        </div>
       
        <GithubChart />
      </div>
      <div className="leaderboard-ctn">
        <LeaderBoard />
      </div>
    </section>
  );
};

export default Dashboard;
