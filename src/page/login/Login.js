import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

import styles from "./login.module.css";
function Login({ handleClick = () => {} }) {
  let [user, setUser] = useState({
    appId: "",
    appCf: "",
    channel: "",
  });

  return (
    <div className={styles.container} id="container">
      <div className={styles.left}>
        <input
          className={styles.inp}
          placeholder="输入App ID"
          onChange={(e) => {
            setUser({ ...user, appId: e.target.value });
          }}
        ></input>
        <input
          className={styles.inp}
          placeholder="输入App 证书"
          onChange={(e) => {
            setUser({ ...user, appCf: e.target.value });
          }}
        ></input>
        <input
          className={styles.inp}
          placeholder="输入频道名称"
          onChange={(e) => {
            setUser({ ...user, channel: e.target.value });
          }}
        ></input>
        <button
          className={styles.create}
          onClick={() => {
            handleClick({state:"create",user:user});
           
          }}
        >
          创建会议
        </button>
      </div>
      <div className={styles.right}>
        <button
          className={styles.join}
          onClick={() => {
            handleClick({state:"join"});
          }}
        >
          加入会议
        </button>
      </div>
    </div>
  );
}

export default Login;
