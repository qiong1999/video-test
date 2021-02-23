import React, { useState, useEffect } from "react";

import styles from "./joinVideo.module.css";

function Join({ handleJoin = () => {} }) {
  let [user, setUser] = useState({
    appId: "",
    appCf: "",
    channel: "",
  });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titler}>欢迎加入视频会议</div>
        <img className={styles.image} src="meeting.png" alt="会议插图"></img>
      </div>
      <div className={styles.bodyer}>
        <div className={styles.form}>
          <div className={styles.meeting}>appId:</div>
          <input
            className={styles.inp}
            onChange={(e) => {
              setUser({
                ...user,
                appId: e.target.value.trim(),
              });
            }}
          ></input>
          <div className={styles.userName}>app证书:</div>
          <input
            className={styles.inp}
            onChange={(e) => {
              setUser({
                ...user,
                appCf: e.target.value.trim(),
              });
            }}
          ></input>
          <div className={styles.channel}>频道名</div>
          <input
            className={styles.inp}
            onChange={(e) => {
              setUser({ ...user, channel: e.target.value.trim() });
            }}
          ></input>
          <button
            className={styles.join}
            onClick={() => {
              handleJoin(user);
            }}
          >
            加入会议
          </button>
        </div>
      </div>
    </div>
  );
}

export default Join;
