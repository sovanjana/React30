import React from "react";
import classnames from "classnames";

import "./drumkit.css";

/**
 * Interfaces ...
 */
interface IDrumButton {
  keyCode: number;
  title: string;
  subtitle?: string;
  active: boolean;
  handleKeydown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleKeyup: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

function DrumButton(props: IDrumButton) {
  return (
    <div
      tabIndex={-1}
      data-key={props.keyCode.toString()}
      className={classnames("key", { active: props.active })}
      onKeyDown={props.handleKeydown as any}
      onKeyUp={props.handleKeyup as any}
    >
      <kbd>{props.title}</kbd>
      <span>{props.subtitle}</span>
    </div>
  );
}

export default React.memo(DrumButton);
