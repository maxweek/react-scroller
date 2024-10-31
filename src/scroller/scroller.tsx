import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import "./styles.scss"
import { getCl, getClR } from "./helper";
import { IScroller, IScrollerProperties, IScrollerRef } from ".";


interface _CustomWheelEvent extends WheelEvent {
  wheelDeltaY: number
}

export const Scroller = forwardRef<IScrollerRef, IScroller>((props: IScroller, ref) => {
  const SCROLL = useRef<IScrollerProperties>({
    height: 0,
    top: 0,
    boxHeight: 0,
    progress: 0,
    grab: false,
    grabOffset: 0,
    grabStart: 0,
    grabDelta: 0,
    scrollStart: 0,
    hovered: false,
    inited: false,
    bar: {
      height: 0,
      offset: 0,
      offsetStart: 0,
      offsetDelta: 0,
      clicked: false
    }
  }).current
  const mainRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);


  useEffect(() => {
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('touchmove', handleTouch, { passive: false })

    const resizeObserver = new ResizeObserver((entries) => {
      if (SCROLL.inited) {
        set()
        checkRoller()
      }
    })
    if (!mainRef.current) return;
    resizeObserver.observe(mainRef.current);
    return () => {
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('touchmove', handleTouch)
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    let mainRefCur = mainRef.current
    if (!mainRefCur) return
    if (props.horizontal) {
      mainRefCur.addEventListener('wheel', handleWheel)
    }
    mainRefCur.addEventListener('scroll', handleScroll)
    if (props.grab) {
      mainRefCur.addEventListener('pointerdown', handleRefDown)
    }
    return () => {
      if (!mainRefCur) return
      mainRefCur.removeEventListener('scroll', handleScroll)
      if (props.horizontal) {
        mainRefCur.removeEventListener('wheel', handleWheel)
      }
      if (props.grab) {
        mainRefCur.removeEventListener('pointerdown', handleRefDown)
      }
    }
  }, [mainRef.current])

  useEffect(() => {
    let mainRefCur = rollerRef.current
    if (!mainRefCur) return
    mainRefCur.addEventListener('pointerdown', handleRollerDown)
    return () => {
      if (!mainRefCur) return
      mainRefCur.removeEventListener('pointerdown', handleRollerDown)
    }
  }, [rollerRef.current])

  useEffect(() => {
    let mainRefCur = barRef.current
    if (!mainRefCur) return
    mainRefCur.addEventListener('wheel', handleBarScroll)
    return () => {
      if (!mainRefCur) return
      mainRefCur.removeEventListener('wheel', handleBarScroll)
    }
  }, [barRef.current])

  useEffect(() => {
    set()
    checkRoller();
  }, [props.children])


  const update = () => {
    set()
    checkRoller();
  }

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
        scrollTo(0, duration)
      },
      scrollToEnd: (duration?: number) => {
        scrollTo(SCROLL.height, duration)
      },
      update: () => {
        update();
      },
      getProperties: () => {
        return SCROLL
      },
      scrollRef: mainRef,
    }
  });


  const handleUp = (e: PointerEvent) => {
    SCROLL.bar.clicked = false
    SCROLL.grab = false
    setHovered(SCROLL.hovered)

    mainRef.current?.classList.remove('__grabbing')
  }
  const handleTouch = (e: TouchEvent) => {

    if (e.cancelable && SCROLL.bar.clicked) {
      e.preventDefault();
    }
  }
  const handleMove = (e: PointerEvent | TouchEvent) => {
    if (!mainRef.current) return
    if (SCROLL.bar.clicked) {
      SCROLL.bar.offset = getOffset(e);
      SCROLL.bar.offsetDelta = SCROLL.bar.offsetStart - SCROLL.bar.offset;

      if (props.horizontal) {
        mainRef.current.scrollLeft = SCROLL.scrollStart + (-SCROLL.bar.offsetDelta / SCROLL.boxHeight * SCROLL.height)
      } else {
        mainRef.current.scrollTop = SCROLL.scrollStart + (-SCROLL.bar.offsetDelta / SCROLL.boxHeight * SCROLL.height)
      }
    }
    if (SCROLL.grab) {
      SCROLL.grabOffset = getOffset(e);
      SCROLL.grabDelta = SCROLL.grabStart - SCROLL.grabOffset;

      if (props.horizontal) {
        mainRef.current.scrollLeft = SCROLL.scrollStart + (SCROLL.grabDelta)
      } else {
        mainRef.current.scrollTop = SCROLL.scrollStart + (SCROLL.grabDelta)
      }
    }
  }

  const handleRefDown = (e: PointerEvent) => {
    if (!mainRef.current) return;
    if (SCROLL.bar.clicked) return
    SCROLL.grab = true
    SCROLL.grabStart = getOffset(e)
    if (props.horizontal) {
      SCROLL.scrollStart = mainRef.current.scrollLeft
    } else {
      SCROLL.scrollStart = mainRef.current.scrollTop
    }
    mainRef.current.classList.add('__grabbing')
  }

  const handleRollerDown = (e: PointerEvent) => {
    if (!mainRef.current) return;
    SCROLL.bar.clicked = true
    SCROLL.bar.offsetStart = getOffset(e)
    if (props.horizontal) {
      SCROLL.scrollStart = mainRef.current.scrollLeft
    } else {
      SCROLL.scrollStart = mainRef.current.scrollTop
    }
  }
  const handleBarScroll = (e: WheelEvent) => {
    e.preventDefault();
    if (!mainRef.current) return;
    if (props.horizontal) {
      mainRef.current.scrollLeft += e.deltaX
    } else {
      mainRef.current.scrollTop += e.deltaY
    }
  }
  const handleWheel = (ev: WheelEvent) => {
    let e = ev as _CustomWheelEvent;
    if (e.shiftKey) return;
    if (!mainRef.current) return;
    if (props.horizontal && !props.horizontalScroll) return

    let wheelDeltaY = e.wheelDeltaY as any
    let isTrackpad = false;

    if (wheelDeltaY) {
      if (wheelDeltaY === (e.deltaY * -3)) {
        isTrackpad = true;
      }
    } else if (e.deltaMode === 0) {
      isTrackpad = true;
    }

    if (!isTrackpad) {
      e.preventDefault()
      mainRef.current.scrollLeft += e.deltaY / 4;
    }
    set()
    checkRoller();
  }
  const handleScroll = (e: Event) => {
    // if(props.horizontal && !props.horizontalScroll) return
    e.stopPropagation();

    set()
    checkRoller();
  }

  const handlePointerEnter = () => {
    if (!props.showWhenMinimal) {
      if (SCROLL.height > SCROLL.boxHeight) {
        SCROLL.hovered = true
        setHovered(true)
      }
    } else {
      SCROLL.hovered = true
      setHovered(true)
    }
  }
  const handlePointerLeave = () => {
    SCROLL.hovered = false
    if (SCROLL.grab) return
    if (SCROLL.bar.clicked) return
    setHovered(false)
  }

  const set = () => {
    if (!mainRef.current) return;
    if (props.horizontal) {
      SCROLL.height = mainRef.current.scrollWidth
      SCROLL.top = mainRef.current.scrollLeft
      SCROLL.boxHeight = mainRef.current.clientWidth
    } else {
      SCROLL.height = mainRef.current.scrollHeight
      SCROLL.top = mainRef.current.scrollTop
      SCROLL.boxHeight = mainRef.current.clientHeight
    }
    SCROLL.progress = SCROLL.top / (SCROLL.height - SCROLL.boxHeight)
    SCROLL.inited = true
  }

  const getOffset = (e: PointerEvent | TouchEvent) => {
    if ('x' in e) {
      return props.horizontal ? e.x : e.y;
    } else {
      const touch = e.touches[0];
      return props.horizontal ? touch.clientX : touch.clientY;
    }
  }

  const checkRoller = () => {
    if (!rollerRef.current) return
    SCROLL.bar.height = 100 / (SCROLL.height / SCROLL.boxHeight);

    if (props.horizontal) {
      rollerRef.current.style.width = `${SCROLL.bar.height}%`
      rollerRef.current.style.left = `${SCROLL.progress * 100 - SCROLL.progress * SCROLL.bar.height}%`
    } else {
      rollerRef.current.style.height = `${SCROLL.bar.height}%`
      rollerRef.current.style.top = `${SCROLL.progress * 100 - SCROLL.progress * SCROLL.bar.height}%`
    }

    if (SCROLL.progress === 0) {
      props.onReachStart?.()
    }
    if (SCROLL.progress === 1) {
      props.onReachEnd?.()
    }
    props.onScroll?.(SCROLL.progress)
  }


  const cl = [
    'scroller',
    getClR(props.className),
    getCl(props.horizontal, 'horizontal'),
    getCl(props.needBar, 'bar'),
    getCl(props.grabCursor, 'grab'),
    getCl(props.autoHide, 'autoHide'),
    getCl(props.barAltPosition, 'barAlt'),
    getCl(props.borderPadding, 'borderPadding'),
    getCl(props.borderFade, 'borderFade'),
    getCl(hovered, 'hovered'),
  ].join(' ')

  return (
    <div className={cl} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
      {props.needBar &&
        <div className={`scroller__bar ${getClR(props.barClassName)}`} ref={barRef}>
          <div className={`scroller__bar_roller ${getClR(props.barRollerClassName)}`} ref={rollerRef} />
        </div>
      }
      <div className={`scroller__content ${getClR(props.contentClassName)}`} ref={mainRef}>
        {props.children}
      </div>
    </div>
  )
})