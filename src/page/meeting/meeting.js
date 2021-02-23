import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";

import styles from "./meeting.module.css";
function Meeting({ user }) {
  let [options,setOptions] = useState({...user,token:""});

  

  const [client, setClient] = useState(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );
  const [av, setAv] = useState({
    localAudioTrack: null,
    localVideoTrack: null,
  });
  const [remoteVideoTracks, setRemoteVideoTracks] = useState([]);
  useEffect(()=>{
    console.log(options)
  if(options.appId){
    console.log(options.appId)
    const uid = 0;
    const role = RtcRole.PUBLISHER;
  
    const expirationTimeInSeconds = 3600;
  
    const currentTimestamp = Math.floor(Date.now() / 1000);
  
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  
    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.
  
    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(
      options.appId,
      options.appCf,
      options.channel,
      uid,
      role,
      privilegeExpiredTs
    );
    setOptions({
      ...options,
      token:tokenA
    })
  }
 
  },[])
  useEffect(() => {
    // 注册事件
    console.log(options.token,"hei")
   if(options.token&&options.token){
    (async function () {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");

        if (mediaType === "video") {
          const remoteVideoTrack = user.videoTrack;
          setRemoteVideoTracks([
            ...remoteVideoTracks,
            { uid: user.uid.toString(), remoteVideoTrack },
          ]);

          const playerContainer = document.createElement("div");
          playerContainer.id = user.uid.toString();
          playerContainer.style.width = "640px";
          playerContainer.style.height = "480px";
          document.body.append(playerContainer);

          remoteVideoTrack.play(playerContainer);
        }

        if (mediaType === "audio") {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "video") {
          setRemoteVideoTracks((prev) =>
            prev.filter((item) => item.uid !== user.uid.toString())
          );
        }
      });
      // 加入频道
      const uid = await client.join(
        options.appId,
        options.channel,
        options.token,
        0
      );
      const _localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const _localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      setAv({
        localAudioTrack: _localAudioTrack,
        localVideoTrack: _localVideoTrack,
      });
      await client.publish([_localAudioTrack, _localVideoTrack]);
    })();
   }
  }, [options]);

  return (
    <div id="meet">
      <div>欢迎进入视频会议,加载缓慢稍等片刻</div>
    </div>
  );
}
export default Meeting;
