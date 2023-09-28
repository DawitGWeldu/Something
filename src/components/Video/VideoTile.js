import React from "react";
import {
  useHMSActions,
  useHMSStore,
  selectLocalPeer,
  selectCameraStreamByPeerID
} from "@100mslive/hms-video-react";


const VideoTile = ({ peer, isLocal }) => {

  const hmsActions = useHMSActions();
  const videoRef = React.useRef(null);
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  const localPeer = useHMSStore(selectLocalPeer);
  const isModerator = localPeer.roleName === "stage";



  React.useEffect(() => {
    (async () => {
      console.log(videoRef.current);
      console.log(videoTrack);
      if (videoRef.current && videoTrack) {
        if (videoTrack.enabled) {
          await hmsActions.attachVideo(videoTrack.id, videoRef.current);
        } else {
          await hmsActions.detachVideo(videoTrack.id, videoRef.current);
        }
      }
    })();
  }, [hmsActions, videoTrack]);


  return (
    <div className="flex m-1">
      {
        isModerator ? (
          <video
            ref={videoRef}
            autoPlay={true}
            playsInline
            muted={false}
            style={{ width: 'calc(85vw - 100px)' }}
            className={`object-cover h-70 -ml-3 mt-10-h h-auto w-24 shadow-lg" ${isLocal ? 'mirror' : ''}`}
          ></video>
        ) : (
          <video
            ref={videoRef}
            autoPlay={true}
            playsInline
            muted={false}
            className={`object-cover h-40 w-40 rounded-lg mt-12 shadow-lg ${isLocal ? 'mirror' : ''}`}
          ></video>
        )
      }
    </div>

  );

}

export default VideoTile;