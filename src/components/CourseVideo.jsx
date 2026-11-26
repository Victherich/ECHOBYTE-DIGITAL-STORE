


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

//   &.fullscreen {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     padding-bottom: 0;
//     z-index: 99999;
//     background-color: black;

//     iframe {
//       width: 100vw;
//       height: 100vh;
//     }
//   }
// `;

// const Overlay = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 10000;
//   background-color: rgba(0, 0, 0, 0);
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
//   justify-content: center;
//   align-items: center;
//   gap:5px;
// `;

// const PlayButton = styled.button`
//   background: ${(props) => (props.playing ? "#e53935" : "#1e88e5")};
//   color: white;
//   border: none;
//   padding: 3px 6px;
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
//   padding: 3px 6px;
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
//   padding: 3px 6px;
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
//   const wrapperRef = useRef(null);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);

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

//   const handlePlay = () => {
//     playerRef.current?.playVideo();
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     playerRef.current?.pauseVideo();
//     setIsPlaying(false);
//   };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     playerRef.current.seekTo(newTime, true);
//   };

//   const handleSpeedChange = (e) => {
//     const newRate = parseFloat(e.target.value);
//     setPlaybackRate(newRate);
//     playerRef.current?.setPlaybackRate(newRate);
//   };

//   // ✅ Fullscreen toggle logic
//   // ✅ Fullscreen toggle logic
// // ✅ Fullscreen toggle logic (accepts orientation argument)
// const handleFullScreen = async (orientation = "landscape") => {
//   const el = wrapperRef.current;
//   if (!el) return;

//   if (!isFullscreen) {
//     // Request fullscreen
//     if (el.requestFullscreen) await el.requestFullscreen();
//     else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
//     else if (el.msRequestFullscreen) await el.msRequestFullscreen();

//     // ✅ Try to lock orientation
//     if (window.screen.orientation && window.screen.orientation.lock) {
//       try {
//         await window.screen.orientation.lock(orientation);
//       } catch (err) {
//         console.warn("Orientation lock failed:", err);
//       }
//     }
//   } else {
//     // Exit fullscreen
//     if (document.exitFullscreen) await document.exitFullscreen();
//     else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
//     else if (document.msExitFullscreen) await document.msExitFullscreen();

//     // ✅ Unlock orientation if available
//     if (window.screen.orientation && window.screen.orientation.unlock) {
//       window.screen.orientation.unlock();
//     }
//   }

//   setIsFullscreen(!isFullscreen);
// };



//   // ✅ Detect exit from fullscreen manually
//   useEffect(() => {
//     const handleFsChange = () => {
//       const fsElement = document.fullscreenElement || document.webkitFullscreenElement;
//       setIsFullscreen(!!fsElement);
//     };
//     document.addEventListener("fullscreenchange", handleFsChange);
//     document.addEventListener("webkitfullscreenchange", handleFsChange);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleFsChange);
//       document.removeEventListener("webkitfullscreenchange", handleFsChange);
//     };
//   }, []);

//   return (
//     <VideoContainer>
//       <PlayerWrapper ref={wrapperRef} className={isFullscreen ? "fullscreen" : ""}>
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
//     <TimeDisplay>
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </TimeDisplay>
//         <ButtonsRow>
//           <SmallButton onClick={onPrevious}>⏮ Prev</SmallButton>

//           <div style={{ display: "flex", gap: "10px" }}>
//             <PlayButton onClick={handlePlay}>▶ Play</PlayButton>
//             <PlayButton onClick={handlePause}>⏸ Pause</PlayButton>
//             {/* <SmallButton onClick={handleFullScreen}>
//               {isFullscreen ? "⤢ Exit Fullscreen" : "⤢ Fullscreen"}
//             </SmallButton> */}
//           </div>

//           <SmallButton onClick={onNext}>Next ⏭</SmallButton>
//         </ButtonsRow>

//         <ButtonsRow>
//           <SpeedSelect value={playbackRate} onChange={handleSpeedChange}>
//             <option value="0.5">0.5×</option>
//             <option value="1">1×</option>
//             <option value="1.5">1.5×</option>
//             <option value="2">2×</option>
//           </SpeedSelect>
      

//           <SmallButton onClick={() => handleFullScreen("landscape")}>
//     ⤢ Fullscreen Landscape
//   </SmallButton>

//   <SmallButton onClick={() => handleFullScreen("portrait")}>
//     ⤢ Fullscreen Portrait
//   </SmallButton>
//         </ButtonsRow>
//       </Controls>
//     </VideoContainer>
//   );
// }

// export default CourseVideo;







// import React, { useRef, useState, useEffect } from "react";
// import YouTube from "react-youtube";
// import styled from "styled-components";

// /* The container is now the fullscreen element, so the controls go fullscreen with the video */
// const VideoContainer = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 800px;
//   margin: 0 auto;

//   ${(p) =>
//     p.$fs &&
//     `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     max-width: none;
//     margin: 0;
//     background: #000;
//     z-index: 99999;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   `}
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

//   ${(p) =>
//     p.$fs &&
//     `
//     width: 100%;
//     height: auto;
//     padding-bottom: 0;
//     aspect-ratio: 16 / 9;
//     max-height: 100%;
//     background: #000;
//   `}
// `;

// const Overlay = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 10000;
//   background-color: rgba(0, 0, 0, 0);
// `;

// const Controls = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   background: #111;
//   color: #fff;
//   padding: 15px;
//   border-radius: 0 0 10px 10px;

//   ${(p) =>
//     p.$fs &&
//     `
//     position: absolute;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     z-index: 100001;
//     border-radius: 0;
//     background: rgba(17, 17, 17, 0.85);
//     padding: 10px 15px calc(10px + env(safe-area-inset-bottom, 0px));
//   `}
// `;

// const ButtonsRow = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   gap: 5px;
// `;

// const PlayButton = styled.button`
//   background: ${(props) => (props.$playing ? "#e53935" : "#1e88e5")};
//   color: white;
//   border: none;
//   padding: 3px 6px;
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
//   padding: 3px 6px;
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
//   padding: 3px 6px;
//   cursor: pointer;
//   font-size: 14px;
//   outline: none;
// `;

// function formatTime(seconds) {
//   if (!seconds || Number.isNaN(seconds)) return "0:00";
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
// }

// function CourseVideo({ videoId, onNext, onPrevious }) {
//   const playerRef = useRef(null);
//   const containerRef = useRef(null);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const opts = {
//     width: "100%",
//     playerVars: {
//       autoplay: 0,
//       controls: 0,
//       rel: 0,
//       modestbranding: 1,
//       playsinline: 1,
//     },
//   };

//   const onReady = (event) => {
//     playerRef.current = event.target;
//     setDuration(event.target.getDuration() || 0);
//   };

//   // Keeps the play button state correct
//   const onStateChange = (event) => {
//     if (event.data === 1) setIsPlaying(true);
//     else if (event.data === 2 || event.data === 0) setIsPlaying(false);
//   };

//   useEffect(() => {
//     let interval;
//     if (isPlaying && playerRef.current) {
//       interval = setInterval(() => {
//         const t = playerRef.current.getCurrentTime();
//         if (typeof t === "number") setCurrentTime(t);
//       }, 500);
//     }
//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   const handlePlay = () => {
//     playerRef.current?.playVideo();
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     playerRef.current?.pauseVideo();
//     setIsPlaying(false);
//   };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     playerRef.current?.seekTo(newTime, true);
//   };

//   const handleSpeedChange = (e) => {
//     const newRate = parseFloat(e.target.value);
//     setPlaybackRate(newRate);
//     playerRef.current?.setPlaybackRate(newRate);
//   };

//   const enterFullscreen = async (orientation = "landscape") => {
//     const el = containerRef.current;
//     if (!el) return;

//     try {
//       if (el.requestFullscreen) await el.requestFullscreen();
//       else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
//       else if (el.msRequestFullscreen) await el.msRequestFullscreen();
//     } catch (err) {
//       console.warn("Fullscreen request failed:", err);
//     }

//     // Also set state so the CSS fallback works where native fullscreen isn't supported (e.g. iPhone Safari)
//     setIsFullscreen(true);

//     if (window.screen?.orientation?.lock) {
//       try {
//         await window.screen.orientation.lock(orientation);
//       } catch (err) {
//         console.warn("Orientation lock failed:", err);
//       }
//     }
//   };

//   const exitFullscreen = async () => {
//     try {
//       if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
//         if (document.exitFullscreen) await document.exitFullscreen();
//         else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
//         else if (document.msExitFullscreen) await document.msExitFullscreen();
//       }
//     } catch (err) {
//       console.warn("Exit fullscreen failed:", err);
//     }

//     if (window.screen?.orientation?.unlock) {
//       try {
//         window.screen.orientation.unlock();
//       } catch (e) {}
//     }

//     setIsFullscreen(false); // returns the video to normal
//   };

//   // Keep state in sync if the user exits with ESC / back gesture
//   useEffect(() => {
//     const handleFsChange = () => {
//       const fsElement =
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.msFullscreenElement;

//       if (!fsElement) {
//         setIsFullscreen(false);
//         if (window.screen?.orientation?.unlock) {
//           try {
//             window.screen.orientation.unlock();
//           } catch (e) {}
//         }
//       }
//     };
//     document.addEventListener("fullscreenchange", handleFsChange);
//     document.addEventListener("webkitfullscreenchange", handleFsChange);
//     document.addEventListener("msfullscreenchange", handleFsChange);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleFsChange);
//       document.removeEventListener("webkitfullscreenchange", handleFsChange);
//       document.removeEventListener("msfullscreenchange", handleFsChange);
//     };
//   }, []);

//   return (
//     <VideoContainer ref={containerRef} $fs={isFullscreen}>
//       <PlayerWrapper $fs={isFullscreen}>
//         <YouTube
//           videoId={videoId}
//           opts={opts}
//           onReady={onReady}
//           onStateChange={onStateChange}
//         />
//         <Overlay />
//       </PlayerWrapper>

//       <Controls $fs={isFullscreen}>
//         <ProgressBar
//           min="0"
//           max={duration || 0}
//           step="0.1"
//           value={currentTime}
//           onChange={handleSeek}
//         />
//         <TimeDisplay>
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </TimeDisplay>

//         <ButtonsRow>
//           <SmallButton onClick={onPrevious}>⏮ Prev</SmallButton>

//           <PlayButton $playing={isPlaying} onClick={handlePlay}>
//             ▶ Play
//           </PlayButton>
//           <PlayButton $playing={false} onClick={handlePause}>
//             ⏸ Pause
//           </PlayButton>

//           <SmallButton onClick={onNext}>Next ⏭</SmallButton>
//         </ButtonsRow>

//         <ButtonsRow>
//           <SpeedSelect value={playbackRate} onChange={handleSpeedChange}>
//             <option value="0.5">0.5×</option>
//             <option value="1">1×</option>
//             <option value="1.5">1.5×</option>
//             <option value="2">2×</option>
//           </SpeedSelect>

//           {!isFullscreen ? (
//             <>
//               <SmallButton onClick={() => enterFullscreen("landscape")}>
//                 ⤢ Fullscreen Landscape
//               </SmallButton>
//               <SmallButton onClick={() => enterFullscreen("portrait")}>
//                 ⤢ Fullscreen Portrait
//               </SmallButton>
//             </>
//           ) : (
//             <SmallButton onClick={exitFullscreen}>✕ Exit Fullscreen</SmallButton>
//           )}
//         </ButtonsRow>
//       </Controls>
//     </VideoContainer>
//   );
// }

// export default CourseVideo;








import React, { useRef, useState, useEffect, useCallback } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";

const HIDE_DELAY = 3000; // 3 seconds

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  ${(p) =>
    p.$fs &&
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    max-width: none;
    margin: 0;
    background: #000;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `}

  ${(p) => p.$fs && p.$idle && `cursor: none;`}
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

  ${(p) =>
    p.$fs &&
    `
    width: 100%;
    height: auto;
    padding-bottom: 0;
    aspect-ratio: 16 / 9;
    max-height: 100%;
    background: #000;
  `}
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

  ${(p) =>
    p.$fs &&
    `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100001;
    border-radius: 0;
    background: rgba(17, 17, 17, 0.85);
    padding: 10px 15px calc(10px + env(safe-area-inset-bottom, 0px));
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: ${p.$hidden ? 0 : 1};
    transform: translateY(${p.$hidden ? "100%" : "0"});
    pointer-events: ${p.$hidden ? "none" : "auto"};
  `}
`;

/* Open / close button for the controls (fullscreen only) */
const ToggleControlsButton = styled.button`
  position: absolute;
  top: calc(10px + env(safe-area-inset-top, 0px));
  right: 10px;
  z-index: 100002;
  background: rgba(17, 17, 17, 0.8);
  color: #fff;
  border: 1px solid #555;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};

  &:hover {
    background: rgba(60, 60, 60, 0.95);
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const PlayButton = styled.button`
  background: ${(props) => (props.$playing ? "#e53935" : "#1e88e5")};
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
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function CourseVideo({ videoId, onNext, onPrevious }) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fullscreen UI state
  const [controlsOpen, setControlsOpen] = useState(true); // user's open/close choice
  const [recentlyActive, setRecentlyActive] = useState(true); // false after 3s idle

  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration() || 0);
  };

  const onStateChange = (event) => {
    if (event.data === 1) setIsPlaying(true);
    else if (event.data === 2 || event.data === 0) setIsPlaying(false);
  };

  useEffect(() => {
    let interval;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        const t = playerRef.current.getCurrentTime();
        if (typeof t === "number") setCurrentTime(t);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  /* ---------- Auto-hide logic ---------- */
  const wakeUI = useCallback(() => {
    setRecentlyActive(true);
    clearTimeout(hideTimerRef.current);
    if (isFullscreen) {
      hideTimerRef.current = setTimeout(() => {
        setRecentlyActive(false);
      }, HIDE_DELAY);
    }
  }, [isFullscreen]);

  // Start / stop the timer when fullscreen changes
  useEffect(() => {
    if (isFullscreen) {
      wakeUI();
    } else {
      clearTimeout(hideTimerRef.current);
      setRecentlyActive(true);
      setControlsOpen(true); // reset for next time
    }
    return () => clearTimeout(hideTimerRef.current);
  }, [isFullscreen, wakeUI]);

  /* ---------- Player handlers ---------- */
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
    playerRef.current?.seekTo(newTime, true);
  };

  const handleSpeedChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    playerRef.current?.setPlaybackRate(newRate);
  };

  /* ---------- Fullscreen ---------- */
  const enterFullscreen = async (orientation = "landscape") => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
    } catch (err) {
      console.warn("Fullscreen request failed:", err);
    }

    setIsFullscreen(true);

    if (window.screen?.orientation?.lock) {
      try {
        await window.screen.orientation.lock(orientation);
      } catch (err) {
        console.warn("Orientation lock failed:", err);
      }
    }
  };

  const exitFullscreen = async () => {
    try {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        else if (document.msExitFullscreen) await document.msExitFullscreen();
      }
    } catch (err) {
      console.warn("Exit fullscreen failed:", err);
    }

    if (window.screen?.orientation?.unlock) {
      try {
        window.screen.orientation.unlock();
      } catch (e) {}
    }

    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleFsChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      if (!fsElement) {
        setIsFullscreen(false);
        if (window.screen?.orientation?.unlock) {
          try {
            window.screen.orientation.unlock();
          } catch (e) {}
        }
      }
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    document.addEventListener("msfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
      document.removeEventListener("msfullscreenchange", handleFsChange);
    };
  }, []);

  const controlsHidden = isFullscreen && (!controlsOpen || !recentlyActive);

  return (
    <VideoContainer
      ref={containerRef}
      $fs={isFullscreen}
      $idle={!recentlyActive}
      onMouseMove={wakeUI}
      onTouchStart={wakeUI}
      onTouchMove={wakeUI}
      onClick={wakeUI}
    >
      <PlayerWrapper $fs={isFullscreen}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
        <Overlay />
      </PlayerWrapper>

      {/* Open / close controls button (fullscreen only) */}
      {isFullscreen && (
        <ToggleControlsButton
          $visible={recentlyActive}
          onClick={() => setControlsOpen((o) => !o)}
        >
          {controlsOpen ? "▼ Hide Controls" : "▲ Show Controls"}
        </ToggleControlsButton>
      )}

      <Controls $fs={isFullscreen} $hidden={controlsHidden}>
        <ProgressBar
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
        />
        <TimeDisplay>
          {formatTime(currentTime)} / {formatTime(duration)}
        </TimeDisplay>

        <ButtonsRow>
          <SmallButton onClick={onPrevious}>⏮ Prev</SmallButton>

          <PlayButton $playing={isPlaying} onClick={handlePlay}>
            ▶ Play
          </PlayButton>
          <PlayButton $playing={false} onClick={handlePause}>
            ⏸ Pause
          </PlayButton>

          <SmallButton onClick={onNext}>Next ⏭</SmallButton>
        </ButtonsRow>

        <ButtonsRow>
          <SpeedSelect value={playbackRate} onChange={handleSpeedChange}>
            <option value="0.5">0.5×</option>
            <option value="1">1×</option>
            <option value="1.5">1.5×</option>
            <option value="2">2×</option>
          </SpeedSelect>

          {!isFullscreen ? (
            <>
              <SmallButton onClick={() => enterFullscreen("landscape")}>
                ⤢ Fullscreen Landscape
              </SmallButton>
              <SmallButton onClick={() => enterFullscreen("portrait")}>
                ⤢ Fullscreen Portrait
              </SmallButton>
            </>
          ) : (
            <SmallButton onClick={exitFullscreen}>✕ Exit Fullscreen</SmallButton>
          )}
        </ButtonsRow>
      </Controls>
    </VideoContainer>
  );
}

export default CourseVideo;