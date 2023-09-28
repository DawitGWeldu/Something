import React from "react";
import {
  useHMSActions,
  useHMSStore,
  selectScreenShareByPeerID
} from "@100mslive/hms-video-react";


const Screen = ({ peer, isLocal }) => {

  const hmsActions = useHMSActions();
  const screenRef = React.useRef(null);
  const screenTrack = useHMSStore(selectScreenShareByPeerID(peer.id));



  React.useEffect(() => {
    (async () => {
      console.log(screenRef.current);
      console.log(screenTrack);
      if (screenRef.current && screenTrack) {
        if (screenTrack.enabled) {
          await hmsActions.attachVideo(screenTrack.id, screenRef.current);
        } else {
          await hmsActions.detachVideo(screenTrack.id, screenRef.current);
        }
      }
    })();
  }, [hmsActions, screenTrack]);

  return (
    <div className="flex h-screen">
      <video
        ref={screenRef}
        autoPlay={true}
        playsInline
        muted={false}
        className={`h-screen ${isLocal ? "" : ""}`} >
      </video>
    </div>

  );

}

export default Screen;