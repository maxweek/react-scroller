import React, { ReactNode } from "react";
import { Scroller } from "./scroller";


export interface IScroller {
  children?: ReactNode,
  needBar?: boolean,
  barAltPosition?: boolean
  horizontal?: boolean
  grab?: boolean
  borderFade?: boolean,
  borderPadding?: boolean,
  autoHide?: boolean,
  grabCursor?: boolean
  className?: string,
  barClassName?: string,
  barRollerClassName?: string,
  contentClassName?: string,
  showWhenMinimal?: boolean
  onReachStart?: () => void;
  onReachEnd?: () => void;
  onScroll?: (progress: number) => void;
}

export interface IScrollerProperties {
  height: number,
  top: number,
  boxHeight: number,
  progress: number,
  grab: boolean,
  grabOffset: number,
  grabStart: number,
  grabDelta: number,
  scrollStart: number,
  hovered: boolean,
  inited: boolean,
  bar: {
    height: number,
    offset: number,
    offsetStart: number,
    offsetDelta: number,
    clicked: boolean
  }
}

export interface IScrollerRef {
  scrollTo: (offset: number) => void;
  scrollToStart: () => void;
  scrollToEnd: () => void;
  update: () => void;
  getProperties: () => IScrollerProperties;
  scrollRef: React.RefObject<HTMLDivElement>;
}


export default Scroller