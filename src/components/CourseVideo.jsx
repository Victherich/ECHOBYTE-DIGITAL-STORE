


// import React, { useRef, useState, useEffect } from "react";
// import YouTube from "react-youtube";
// import styled from "styled-components";

// const VideoContainer = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 800px;
//   margin: 0 auto;
// `;

// const PlayerWrapper = styled.div`
//   position: relative;
//   padding-bottom: 56.25%;
//   height: 0;
//   overflow: hidden;

//   iframe {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     border: none;
//   }
// `;

// const Overlay = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 10000;
//   background-color: rgba(0, 0, 0, 0.0);
// `;

// const Controls = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   background: #111;
//   color: #fff;
//   padding: 15px;
//   border-radius: 0 0 10px 10px;
// `;

// const ButtonsRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const PlayButton = styled.button`
//   background: ${(props) => (props.playing ? "#e53935" : "#1e88e5")};
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   font-weight: bold;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: 0.3s ease;
//   &:hover {
//     opacity: 0.85;
//   }
// `;

// const SmallButton = styled.button`
//   background: #444;
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: 0.3s ease;
//   &:hover {
//     background: #666;
//   }
// `;

// const ProgressBar = styled.input.attrs({ type: "range" })`
//   width: 100%;
//   cursor: pointer;
//   accent-color: #1e88e5;
// `;

// const TimeDisplay = styled.span`
//   font-size: 14px;
//   color: #ccc;
//   user-select: none;
// `;

// const SpeedSelect = styled.select`
//   background: #222;
//   color: white;
//   border: 1px solid #555;
//   border-radius: 6px;
//   padding: 8px 12px;
//   cursor: pointer;
//   font-size: 14px;
//   outline: none;
// `;

// function formatTime(seconds) {
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
// }

// function CourseVideo({ videoId, onNext, onPrevious }) {
//   const playerRef = useRef(null);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   const opts = {
//     width: "100%",
//     playerVars: {
//       autoplay: 0,
//       controls: 0,
//       rel: 0,
//       modestbranding: 1,
//     },
//   };

//   const onReady = (event) => {
//     playerRef.current = event.target;
//     setDuration(event.target.getDuration());
//   };

//   useEffect(() => {
//     let interval;
//     if (isPlaying && playerRef.current) {
//       interval = setInterval(() => {
//         setCurrentTime(playerRef.current.getCurrentTime());
//       }, 500);
//     }
//     return () => clearInterval(interval);
//   }, [isPlaying]);



//   // With this:
// const handlePlay = () => {
//   if (!playerRef.current) return;
//   playerRef.current.playVideo();
//   setIsPlaying(true);
// };

// const handlePause = () => {
//   if (!playerRef.current) return;
//   playerRef.current.pauseVideo();
//   setIsPlaying(false);
// };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     playerRef.current.seekTo(newTime, true);
//   };

//   const handleSpeedChange = (e) => {
//     const newRate = parseFloat(e.target.value);
//     setPlaybackRate(newRate);
//     if (playerRef.current) {
//       playerRef.current.setPlaybackRate(newRate);
//     }
//   };

//   return (
//     <VideoContainer>
//       <PlayerWrapper>
//         <YouTube videoId={videoId} opts={opts} onReady={onReady} />
//         <Overlay />
//       </PlayerWrapper>

//       <Controls>
//         <ProgressBar
//           min="0"
//           max={duration}
//           step="0.1"
//           value={currentTime}
//           onChange={handleSeek}
//         />

//         <ButtonsRow>
//           <SmallButton onClick={onPrevious}>⏮ Prev</SmallButton>

    

//           <div style={{ display: "flex", gap: "10px" }}>
//   <PlayButton onClick={handlePlay} playing={false}>
//     ▶ Play
//   </PlayButton>
//   <PlayButton onClick={handlePause} playing={true}>
//     ⏸ Pause
//   </PlayButton>
// </div>


//           <SmallButton onClick={onNext}>Next ⏭</SmallButton>
//         </ButtonsRow>

//         <ButtonsRow>
//           <SpeedSelect value={playbackRate} onChange={handleSpeedChange}>
//             <option value="0.5">0.5×</option>
//             <option value="1">1×</option>
//             <option value="1.5">1.5×</option>
//             <option value="2">2×</option>
       
//           </SpeedSelect>
//           <TimeDisplay>
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </TimeDisplay>
//         </ButtonsRow>
//       </Controls>
//     </VideoContainer>
//   );
// }

// export default CourseVideo;




import React, { useRef, useState, useEffect } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding-bottom: 0;
    z-index: 99999;
    background-color: black;

    iframe {
      width: 100vw;
      height: 100vh;
    }
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0);
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #111;
  color: #fff;
  padding: 15px;
  border-radius: 0 0 10px 10px;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:5px;
`;

const PlayButton = styled.button`
  background: ${(props) => (props.playing ? "#e53935" : "#1e88e5")};
  color: white;
  border: none;
  padding: 3px 6px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.85;
  }
`;

const SmallButton = styled.button`
  background: #444;
  color: white;
  border: none;
  padding: 3px 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background: #666;
  }
`;

const ProgressBar = styled.input.attrs({ type: "range" })`
  width: 100%;
  cursor: pointer;
  accent-color: #1e88e5;
`;

const TimeDisplay = styled.span`
  font-size: 14px;
  color: #ccc;
  user-select: none;
`;

const SpeedSelect = styled.select`
  background: #222;
  color: white;
  border: 1px solid #555;
  border-radius: 6px;
  padding: 3px 6px;
  cursor: pointer;
  font-size: 14px;
  outline: none;
`;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function CourseVideo({ videoId, onNext, onPrevious }) {
  const playerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  useEffect(() => {
    let interval;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        setCurrentTime(playerRef.current.getCurrentTime());
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    playerRef.current?.playVideo();
    setIsPlaying(true);
  };

  const handlePause = () => {
    playerRef.current?.pauseVideo();
    setIsPlaying(false);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime, true);
  };

  const handleSpeedChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    playerRef.current?.setPlaybackRate(newRate);
  };

  // ✅ Fullscreen toggle logic
  // ✅ Fullscreen toggle logic
// ✅ Fullscreen toggle logic (accepts orientation argument)
const handleFullScreen = async (orientation = "landscape") => {
  const el = wrapperRef.current;
  if (!el) return;

  if (!isFullscreen) {
    // Request fullscreen
    if (el.requestFullscreen) await el.requestFullscreen();
    else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) await el.msRequestFullscreen();

    // ✅ Try to lock orientation
    if (window.screen.orientation && window.screen.orientation.lock) {
      try {
        await window.screen.orientation.lock(orientation);
      } catch (err) {
        console.warn("Orientation lock failed:", err);
      }
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) await document.exitFullscreen();
    else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
    else if (document.msExitFullscreen) await document.msExitFullscreen();

    // ✅ Unlock orientation if available
    if (window.screen.orientation && window.screen.orientation.unlock) {
      window.screen.orientation.unlock();
    }
  }

  setIsFullscreen(!isFullscreen);
};



  // ✅ Detect exit from fullscreen manually
  useEffect(() => {
    const handleFsChange = () => {
      const fsElement = document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(!!fsElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, []);

  return (
    <VideoContainer>
      <PlayerWrapper ref={wrapperRef} className={isFullscreen ? "fullscreen" : ""}>
        <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        <Overlay />
      </PlayerWrapper>

      <Controls>
        <ProgressBar
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
        />
    <TimeDisplay>
            {formatTime(currentTime)} / {formatTime(duration)}
          </TimeDisplay>
        <ButtonsRow>
          <SmallButton onClick={onPrevious}>⏮ Prev</SmallButton>

          <div style={{ display: "flex", gap: "10px" }}>
            <PlayButton onClick={handlePlay}>▶ Play</PlayButton>
            <PlayButton onClick={handlePause}>⏸ Pause</PlayButton>
            {/* <SmallButton onClick={handleFullScreen}>
              {isFullscreen ? "⤢ Exit Fullscreen" : "⤢ Fullscreen"}
            </SmallButton> */}
          </div>

          <SmallButton onClick={onNext}>Next ⏭</SmallButton>
        </ButtonsRow>

        <ButtonsRow>
          <SpeedSelect value={playbackRate} onChange={handleSpeedChange}>
            <option value="0.5">0.5×</option>
            <option value="1">1×</option>
            <option value="1.5">1.5×</option>
            <option value="2">2×</option>
          </SpeedSelect>
      

          <SmallButton onClick={() => handleFullScreen("landscape")}>
    ⤢ Fullscreen Landscape
  </SmallButton>

  <SmallButton onClick={() => handleFullScreen("portrait")}>
    ⤢ Fullscreen Portrait
  </SmallButton>
        </ButtonsRow>
      </Controls>
    </VideoContainer>
  );
}

export default CourseVideo;
