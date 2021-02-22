import React,{useState,useEffect} from "react";


import styles from "./joinVideo.module.css";

function Join({handleLogin=()=>{}}) {
  let [user,setUser] = useState({
    userName:"",
    meetingRoom:""
  });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titler}>欢迎加入视频会议</div>
        <img className={styles.image} src="meeting.png" alt="会议插图"></img>
      </div>
      <div className={styles.bodyer}>
        <div className={styles.form}>
          <div className={styles.meeting} >会议号:</div>
          <input className={styles.inp}onChange={(e)=>{setUser({
            ...user,
            meetingRoom:e.target.value
          })}}></input>
          <div className = {styles.userName} >您的名称:</div>
          <input className={styles.inp}onChange={(e)=>{setUser(
            {
              ...user,
              userName:e.target.value
            }
          )}}></input>
          <button className={styles.join} onClick={()=>{
            handleLogin(user)
          }}>加入会议</button>
        </div>
      </div>
    </div>
  );
}

export default Join;
