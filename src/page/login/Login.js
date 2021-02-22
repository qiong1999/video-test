import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

import styles from "./login.module.css";
function Login({handleClick=()=>{}}) {
 

  return (
    <div className={styles.container} id="container">
      <button className={styles.btn} onClick={() => {handleClick("create")}}>
        创建会议
      </button>
      <button className={styles.btn} onClick={() => {handleClick("join")}}>
        加入会议
      </button>
    </div>
  );
}

export default Login;
