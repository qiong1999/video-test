import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} from "agora-access-token";

import styles from "./meeting.module.css";
function Meeting({ user }) {
  let [uid, setUid] = useState("");
 
  

  var rtc = {
    client: null,
    localAudioTrack: null,
    localVideoTrack: null,
  };

  var options = {
    // 替换成你自己项目的 App ID。
    appId: user.appId,
    // 传入目标频道名。
    channel: user.channel,
    // 如果你的项目开启了 App 证书进行 Token 鉴权，这里填写生成的 Token 值。
    token: user.token,
  };
  console.log(options.token);
  async function startBasicCall() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    const uid = await rtc.client.join(
      options.appId,
      options.channel,
      options.token,
      null,
    );
    console.log(uid);
    setUid(uid);
    rtc.client.on("user-published", async (user, mediaType) => {
      // 开始订阅远端用户。
      await rtc.client.subscribe(user, mediaType);
      console.log("subscribe success");

      // 表示本次订阅的是视频。
      if (mediaType === "video") {
        // 订阅完成后，从 `user` 中获取远端视频轨道对象。
        const remoteVideoTrack = user.videoTrack;
        // 动态插入一个 DIV 节点作为播放远端视频轨道的容器。
        const playerContainer = document.createElement("div");
        // 给这个 DIV 节点指定一个 ID，这里指定的是远端用户的 UID。
        playerContainer.id = user.uid.toString();
        playerContainer.style.width = "300px";
        playerContainer.style.height = "300px";
        document.body.append(playerContainer);

        // 订阅完成，播放远端音视频。
        // 传入 DIV 节点，让 SDK 在这个节点下创建相应的播放器播放远端视频。
        remoteVideoTrack.play(playerContainer);

        // 也可以只传入该 DIV 节点的 ID。
        // remoteVideoTrack.play(playerContainer.id);
      }

      // 表示本次订阅的是音频。
      if (mediaType === "audio") {
        // 订阅完成后，从 `user` 中获取远端音频轨道对象。
        const remoteAudioTrack = user.audioTrack;
        // 播放音频因为不会有画面，不需要提供 DOM 元素的信息。
        remoteAudioTrack.play();
      }
    });
    rtc.client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "video") {
        // 获取刚刚动态创建的 DIV 节点。
        const playerContainer = document.getElementById(user.uid.toString());
        // 销毁这个节点。
        playerContainer.remove();
      }
    });
    // 通过麦克风采集的音频创建本地音频轨道对象。
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // 通过摄像头采集的视频创建本地视频轨道对象。
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // 将这些音视频轨道对象发布到频道中。
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
  }
  async function leaveCall() {
    // 销毁本地音视频轨道。
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    
    // 遍历远端用户。
    rtc.client.remoteUsers.forEach((user) => {
      // 销毁动态创建的 DIV 节点。
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });

    // 离开频道。
    await rtc.client.leave();
  }
  if (options.token) {
    startBasicCall();
  }
  useEffect(() => {
    if (uid) {
      console.log(uid);
    }
  }, [uid]);

  return (
    <div id="meet">
      <div>欢迎进入视频会议,加载缓慢稍等片刻</div>
    
    </div>
  );
}
export default Meeting;
