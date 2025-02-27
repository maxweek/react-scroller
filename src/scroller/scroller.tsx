import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./styles.scss";
import { getCl, getClR } from "./helper";
import { IScroller, IScrollerProperties, IScrollerRef } from ".";

interface _CustomWheelEvent extends WheelEvent {
  wheelDeltaY: number;
}

export const Scroller = forwardRef<IScrollerRef, IScroller>((props: IScroller, ref) => {
  const SCROLL = useRef<IScrollerProperties>({
    height: 0,
    width: 0,
    top: 0,
    left: 0,
    boxHeight: 0,
    boxWidth: 0,
    progressX: 0,
    progressY: 0,
    grab: false,
    grabOffset: 0,
    grabStartX: 0,
    grabStartY: 0,
    grabDeltaX: 0,
    grabDeltaY: 0,
    scrollStartX: 0,
    scrollStartY: 0,
    hovered: false,
    inited: false,
    barX: {
      size: 0,
      offset: 0,
      offsetStart: 0,
      offsetDelta: 0,
      clicked: false,
    },
    barY: {
      size: 0,
      offset: 0,
      offsetStart: 0,
      offsetDelta: 0,
      clicked: false,
    },
  }).current;
  const mainRef = useRef<HTMLDivElement>(null);
  const verticalBarRef = useRef<HTMLDivElement>(null);
  const horizontalBarRef = useRef<HTMLDivElement>(null);
  const verticalRollerRef = useRef<HTMLDivElement>(null);
  const horizontalRollerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleUp = (e: PointerEvent) => {
      SCROLL.barX.clicked = false;
      SCROLL.barY.clicked = false;
      SCROLL.grab = false;
      setHovered(SCROLL.hovered);
      mainRef.current?.classList.remove("__grabbing");
    };

    const handleMove = (e: PointerEvent | TouchEvent) => {
      if (!mainRef.current) return;
      if (SCROLL.barX.clicked || SCROLL.barY.clicked) {
        const offset = getOffset(e);
        if (SCROLL.barX.clicked) {
          SCROLL.barX.offset = offset.x;
          SCROLL.barX.offsetDelta = SCROLL.barX.offsetStart - SCROLL.barX.offset;
          mainRef.current.scrollLeft = SCROLL.scrollStartX + (-SCROLL.barX.offsetDelta / SCROLL.boxWidth) * (SCROLL.width - SCROLL.boxWidth);
        }
        if (SCROLL.barY.clicked) {
          SCROLL.barY.offset = offset.y;
          SCROLL.barY.offsetDelta = SCROLL.barY.offsetStart - SCROLL.barY.offset;
          mainRef.current.scrollTop = SCROLL.scrollStartY + (-SCROLL.barY.offsetDelta / SCROLL.boxHeight) * (SCROLL.height - SCROLL.boxHeight);
        }
      }
      if (SCROLL.grab) {
        const offset = getOffset(e);
        if (props.horizontal) {
          SCROLL.grabDeltaX = SCROLL.grabStartX - offset.x;
          mainRef.current.scrollLeft = SCROLL.scrollStartX + SCROLL.grabDeltaX;
        }
        if (props.vertical) {
          SCROLL.grabDeltaY = SCROLL.grabStartY - offset.y;
          mainRef.current.scrollTop = SCROLL.scrollStartY + SCROLL.grabDeltaY;
        }
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.cancelable && (SCROLL.barX.clicked || SCROLL.barY.clicked)) {
        e.preventDefault();
      }
    };

    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchmove", handleTouch, { passive: false });

    const resizeObserver = new ResizeObserver((entries) => {
      if (SCROLL.inited) {
        set();
        checkRoller();
      }
    });
    if (!mainRef.current) return;
    resizeObserver.observe(mainRef.current);
    return () => {
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let mainRefCur = mainRef.current;
    if (!mainRefCur) return;
    if (props.horizontal) {
      mainRefCur.addEventListener("wheel", handleWheel);
    }
    mainRefCur.addEventListener("scroll", handleScroll);
    if (props.grab) {
      mainRefCur.addEventListener("pointerdown", handleRefDown);
    }
    return () => {
      if (!mainRefCur) return;
      mainRefCur.removeEventListener("scroll", handleScroll);
      if (props.horizontal) {
        mainRefCur.removeEventListener("wheel", handleWheel);
      }
      if (props.grab) {
        mainRefCur.removeEventListener("pointerdown", handleRefDown);
      }
    };
  }, [mainRef.current]);

  useEffect(() => {
    let mainRefCur = verticalRollerRef.current;
    if (!mainRefCur) return;
    mainRefCur.addEventListener("pointerdown", handleVerticalRollerDown);
    return () => {
      if (!mainRefCur) return;
      mainRefCur.removeEventListener("pointerdown", handleVerticalRollerDown);
    };
  }, [verticalRollerRef.current]);

  useEffect(() => {
    let mainRefCur = horizontalRollerRef.current;
    if (!mainRefCur) return;
    mainRefCur.addEventListener("pointerdown", handleHorizontalRollerDown);
    return () => {
      if (!mainRefCur) return;
      mainRefCur.removeEventListener("pointerdown", handleHorizontalRollerDown);
    };
  }, [horizontalRollerRef.current]);

  useEffect(() => {
    let mainRefCur = verticalBarRef.current;
    if (!mainRefCur) return;
    mainRefCur.addEventListener("wheel", handleBarScroll);
    return () => {
      if (!mainRefCur) return;
      mainRefCur.removeEventListener("wheel", handleBarScroll);
    };
  }, [verticalBarRef.current]);

  useEffect(() => {
    let mainRefCur = horizontalBarRef.current;
    if (!mainRefCur) return;
    mainRefCur.addEventListener("wheel", handleBarScroll);
    return () => {
      if (!mainRefCur) return;
      mainRefCur.removeEventListener("wheel", handleBarScroll);
    };
  }, [horizontalBarRef.current]);

  useEffect(() => {
    set();
    checkRoller();
  }, [props.children]);

  const update = () => {
    set();
    checkRoller();
  };

  const scrollTo = (offset: number, duration = 300) => {
    if (!mainRef.current) return;

    const isHorizontal = props.horizontal;
    const start = isHorizontal ? mainRef.current.scrollLeft : mainRef.current.scrollTop;
    const distance = offset - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      if (!mainRef.current) return;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Линейная интерполяция для плавной прокрутки
      const newPosition = start + distance * progress;

      if (isHorizontal) {
        mainRef.current.scrollLeft = newPosition;
      } else {
        mainRef.current.scrollTop = newPosition;
      }

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useImperativeHandle(ref, () => {
    return {
      scrollTo: (offset: number, duration?: number) => {
        scrollTo(offset, duration);
      },
      scrollToStart: (duration?: number) => {
        scrollTo(0, duration);
      },
      scrollToEnd: (duration?: number) => {
        scrollTo(SCROLL.height, duration);
      },
      update: () => {
        update();
      },
      getProperties: () => {
        return SCROLL;
      },
      scrollRef: mainRef,
    };
  });

  const handleRefDown = (e: PointerEvent) => {
    if (!mainRef.current) return;
    if (SCROLL.barX.clicked || SCROLL.barY.clicked) return;
    SCROLL.grab = true;
    const offset = getOffset(e);
    SCROLL.grabStartX = offset.x;
    SCROLL.grabStartY = offset.y;
    if (props.horizontal) {
      SCROLL.scrollStartX = mainRef.current.scrollLeft;
    }
    if (props.vertical) {
      SCROLL.scrollStartY = mainRef.current.scrollTop;
    }
    mainRef.current.classList.add("__grabbing");
  };

  const handleVerticalRollerDown = (e: PointerEvent) => {
    if (!mainRef.current) return;
    SCROLL.barY.clicked = true;
    SCROLL.barY.offsetStart = getOffset(e).y;
    SCROLL.scrollStartY = mainRef.current.scrollTop;
  };

  const handleHorizontalRollerDown = (e: PointerEvent) => {
    if (!mainRef.current) return;
    SCROLL.barX.clicked = true;
    SCROLL.barX.offsetStart = getOffset(e).x;
    SCROLL.scrollStartX = mainRef.current.scrollLeft;
  };

  const handleBarScroll = (e: WheelEvent) => {
    e.preventDefault();
    // console.log('scroll')
    if (!mainRef.current) return;
    if (props.horizontal) {
      mainRef.current.scrollLeft += e.deltaX;
    }
    if (props.vertical) {
      mainRef.current.scrollTop += e.deltaY;
    }
  };

  const handleWheel = (ev: WheelEvent) => {
    let e = ev as _CustomWheelEvent;
    if (e.shiftKey) return;
    if (!mainRef.current) return;
    if (props.horizontal) return;

    let wheelDeltaY = e.wheelDeltaY as any;
    let isTrackpad = false;

    if (wheelDeltaY) {
      if (wheelDeltaY === e.deltaY * -3) {
        isTrackpad = true;
      }
    } else if (e.deltaMode === 0) {
      isTrackpad = true;
    }

    if (!isTrackpad) {
      e.preventDefault();
      mainRef.current.scrollLeft += e.deltaY / 4;
    }
    set();
    checkRoller();
  };

  const handleScroll = (e: Event) => {
    e.stopPropagation();

    set();
    checkRoller();
  };

  const handlePointerEnter = () => {
    if (!props.showWhenMinimal) {
      if (SCROLL.height > SCROLL.boxHeight) {
        SCROLL.hovered = true;
        setHovered(true);
      }
    } else {
      SCROLL.hovered = true;
      setHovered(true);
    }
  };

  const handlePointerLeave = () => {
    SCROLL.hovered = false;
    if (SCROLL.grab) return;
    if (SCROLL.barX.clicked || SCROLL.barY.clicked) return;
    setHovered(false);
  };

  const set = () => {
    if (!mainRef.current) return;
    if (props.vertical && props.horizontal) {
      SCROLL.height = mainRef.current.scrollHeight;
      SCROLL.top = mainRef.current.scrollTop;
      SCROLL.boxHeight = mainRef.current.clientHeight;
      SCROLL.width = mainRef.current.scrollWidth;
      SCROLL.left = mainRef.current.scrollLeft;
      SCROLL.boxWidth = mainRef.current.clientWidth;
    } else if (props.horizontal) {
      SCROLL.width = mainRef.current.scrollWidth;
      SCROLL.left = mainRef.current.scrollLeft;
      SCROLL.boxWidth = mainRef.current.clientWidth;
    } else {
      SCROLL.height = mainRef.current.scrollHeight;
      SCROLL.top = mainRef.current.scrollTop;
      SCROLL.boxHeight = mainRef.current.clientHeight;
    }
    SCROLL.progressY = SCROLL.top / (SCROLL.height - SCROLL.boxHeight);
    SCROLL.progressX = SCROLL.left / (SCROLL.width - SCROLL.boxWidth);
    SCROLL.inited = true;
  };

  const getOffset = (e: PointerEvent | TouchEvent) => {
    if ("x" in e) {
      return { x: e.x, y: e.y };
    } else {
      const touch = e.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
  };

  const checkRoller = () => {
    SCROLL.barX.size = 100 / (SCROLL.width / SCROLL.boxWidth);
    SCROLL.barY.size = 100 / (SCROLL.height / SCROLL.boxHeight);
    if (props.vertical && props.horizontal) {
      if (verticalRollerRef.current) {
        verticalRollerRef.current.style.height = `${SCROLL.barY.size}%`;
        verticalRollerRef.current.style.top = `${SCROLL.progressY * 100 - SCROLL.progressY * SCROLL.barY.size}%`;
      }

      if (horizontalRollerRef.current) {
        horizontalRollerRef.current.style.width = `${SCROLL.barX.size}%`;
        horizontalRollerRef.current.style.left = `${SCROLL.progressX * 100 - SCROLL.progressX * SCROLL.barX.size}%`;
      }
    } else if (props.horizontal) {
      if (horizontalRollerRef.current) {
        horizontalRollerRef.current.style.width = `${SCROLL.barX.size}%`;
        horizontalRollerRef.current.style.left = `${SCROLL.progressX * 100 - SCROLL.progressX * SCROLL.barX.size}%`;
      }
    } else {
      if (verticalRollerRef.current) {
        verticalRollerRef.current.style.height = `${SCROLL.barY.size}%`;
        verticalRollerRef.current.style.top = `${SCROLL.progressY * 100 - SCROLL.progressY * SCROLL.barY.size}%`;
      }
    }

    if (SCROLL.progressX === 0) props.onReachStart?.("x");
    if (SCROLL.progressY === 0) props.onReachStart?.("y");
    if (SCROLL.progressX === 1) props.onReachEnd?.("x");
    if (SCROLL.progressY === 1) props.onReachEnd?.("y");

    props.onScroll?.(
      { progress: SCROLL.progressX, offset: SCROLL.left },
      { progress: SCROLL.progressY, offset: SCROLL.top }
    );
  };

  const cl = [
    "scroller",
    getClR(props.className),
    getCl(props.horizontal, "horizontal"),
    getCl(props.vertical, "vertical"),
    getCl(props.needBar, "bar"),
    getCl(props.grabCursor, "grab"),
    getCl(props.autoHide, "autoHide"),
    getCl(props.barAltPosition, "barAlt"),
    getCl(props.borderPadding, "borderPadding"),
    getCl(props.borderFade, "borderFade"),
    getCl(hovered, "hovered"),
  ].join(" ");

  return (
    <div
      className={cl}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {props.needBar && (
        <>
          {props.vertical && (
            <div className={`scroller__bar scroller__bar_vertical ${getClR(props.barClassName)}`} ref={verticalBarRef}>
              <div className={`scroller__bar_roller scroller__bar_roller_vertical ${getClR(props.barRollerClassName)}`} ref={verticalRollerRef} />
            </div>
          )}
          {props.horizontal && (
            <div className={`scroller__bar scroller__bar_horizontal ${getClR(props.barClassName)}`} ref={horizontalBarRef}>
              <div className={`scroller__bar_roller scroller__bar_roller_horizontal ${getClR(props.barRollerClassName)}`} ref={horizontalRollerRef} />
            </div>
          )}
        </>
      )}
      <div
        className={`scroller__content ${getClR(props.contentClassName)}`}
        ref={mainRef}
      >
        {props.children}
      </div>
    </div>
  );
});