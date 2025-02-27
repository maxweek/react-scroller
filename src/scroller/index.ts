import React, { ReactNode } from "react";
import { Scroller } from "./scroller";

interface IScrollerProgress {
  progress: number,
  offset: number
}

export interface IScroller {
  children?: ReactNode,
  needBar?: boolean,
  barAltPosition?: boolean,
  vertical?: boolean,
  horizontal?: boolean,
  grab?: boolean,
  borderFade?: boolean,
  borderPadding?: boolean,
  autoHide?: boolean,
  grabCursor?: boolean,
  className?: string,
  barClassName?: string,
  barRollerClassName?: string,
  contentClassName?: string,
  showWhenMinimal?: boolean,
  onReachStart?: (type: 'x' | 'y') => void;
  onReachEnd?: (type: 'x' | 'y') => void;
  onScroll?: (x: IScrollerProgress, y: IScrollerProgress) => void;
}

export interface IScrollerProperties {
  height: number,
  width: number,
  top: number,
  left: number,
  boxHeight: number,
  boxWidth: number,
  progressX: number,
  progressY: number,
  grab: boolean,
  grabOffset: number,
  grabStartX: number,
  grabStartY: number,
  hovered: boolean,
  inited: boolean,
  scrollStartX: number,
  scrollStartY: number,
  grabDeltaX: number,
  grabDeltaY: number,
  barX: {
    size: number,
    offset: number,
    offsetStart: number,
    offsetDelta: number,
    clicked: boolean
  }
  barY: {
    size: number,
    offset: number,
    offsetStart: number,
    offsetDelta: number,
    clicked: boolean
  }
}

export interface IScrollerRef {
  scrollTo: (offset: number, duration?: number) => void;
  scrollToStart: (duration?: number) => void;
  scrollToEnd: (duration?: number) => void;
  update: () => void;
  getProperties: () => IScrollerProperties;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export default Scroller;