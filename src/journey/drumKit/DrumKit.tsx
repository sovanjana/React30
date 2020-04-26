import React from "react";
import openhatSound from "../../asset/sound/openhat.wav";
import hihatSound from "../../asset/sound/hihat.wav";
import snareSound from "../../asset/sound/snare.wav";
import boomSound from "../../asset/sound/boom.wav";
import clapSound from "../../asset/sound/clap.wav";
import kickSound from "../../asset/sound/kick.wav";
import rideSound from "../../asset/sound/ride.wav";
import tinkSound from "../../asset/sound/tink.wav";
import tomSound from "../../asset/sound/tom.wav";
import DrumButton from "./DrumButton";

import "./drumkit.css";

const keys: Array<{
  key: number;
  keyCode: number;
  title: string;
  subtitle: string;
  audioSrc: string;
}> = [
  {
    key: 0,
    keyCode: 65,
    title: "A",
    subtitle: "clap",
    audioSrc: clapSound
  },
  {
    key: 1,
    keyCode: 83,
    title: "S",
    subtitle: "hihat",
    audioSrc: hihatSound
  },
  {
    key: 2,
    keyCode: 68,
    title: "D",
    subtitle: "kick",
    audioSrc: kickSound
  },
  {
    key: 3,
    keyCode: 70,
    title: "F",
    subtitle: "openhat",
    audioSrc: openhatSound
  },
  {
    key: 4,
    keyCode: 71,
    title: "G",
    subtitle: "boom",
    audioSrc: boomSound
  },
  {
    key: 5,
    keyCode: 72,
    title: "H",
    subtitle: "ride",
    audioSrc: rideSound
  },
  {
    key: 6,
    keyCode: 74,
    title: "J",
    subtitle: "snare",
    audioSrc: snareSound
  },
  {
    key: 7,
    keyCode: 75,
    title: "K",
    subtitle: "tom",
    audioSrc: tomSound
  },
  {
    key: 8,
    keyCode: 76,
    title: "L",
    subtitle: "tink",
    audioSrc: tinkSound
  }
];

function DrumKit() {
  const [activeKey, setActiveKey] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    window.addEventListener("keydown", e => handleKeydown(e));
    window.addEventListener("keyup", e => handleKeyup(e));
    return () => {
      window.removeEventListener("keydown", e => handleKeydown(e));
      window.removeEventListener("keyup", e => handleKeyup(e));
    };
  }, [anchorEl]);

  function handleKeydown(event: KeyboardEvent) {
    setActiveKey(event.keyCode);
    const el = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if (el !== null) {
      el.play();
    }
    console.log(">>", el);
    // setAnchorEl(el);
  }

  function handleKeyup(event: KeyboardEvent) {
    setActiveKey(null);
    // setAnchorEl(null);
  }

  // console.log(activeKey, anchorEl);

  return (
    <div className="container">
      <div className="drum-kit">
        {keys.map(btn => {
          const { key, audioSrc, ...rest } = btn;
          return (
            <DrumButton
              key={key}
              active={activeKey === btn.keyCode}
              handleKeydown={handleKeydown}
              handleKeyup={handleKeyup}
              {...rest}
            />
          );
        })}

        {keys.map(k => {
          return (
            <audio
              key={k.key}
              ref={audioRef}
              data-key={k.keyCode.toString()}
              src={k.audioSrc}
            />
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(DrumKit);
