import React, { FC, ReactNode, WheelEventHandler, useEffect, useRef, useState } from "react";
import "./styles.scss"
import { getCl, getClR } from "./helper";

interface Props {
  children: ReactNode,
  needBar?: boolean,
  barAltPosition?: boolean
  horizontal?: boolean
  grab?: boolean
  borderFade?: boolean,
  borderPadding?: boolean,
  grabCursor?: boolean
  className?: string,
  barClassName?: string,
  barRollerClassName?: string,
  contentClassName?: string,
}

export const Scroller: FC<Props> = (props: Props) => {
  const SCROLL = useRef({
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
    bar: {
      height: 0,
      offset: 0,
      offsetStart: 0,
      offsetDelta: 0,
      clicked: false
    }
  }).current
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);


  useEffect(() => {
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointermove', handleMove)
    init()
    return () => {
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointermove', handleMove)
    }
  }, [])

  useEffect(() => {
    let refCur = ref.current
    if (!refCur) return
    if (props.horizontal) {
      refCur.addEventListener('wheel', handleWheel)
    }
    refCur.addEventListener('scroll', handleScroll)
    if (props.grab) {
      refCur.addEventListener('pointerdown', handleRefDown)
    }
    return () => {
      if (!refCur) return
      if (props.horizontal) {
        refCur.removeEventListener('wheel', handleWheel)
      }
      refCur.removeEventListener('scroll', handleScroll)
      if (props.grab) {
        refCur.removeEventListener('pointerdown', handleRefDown)
      }
    }
  }, [ref.current])

  useEffect(() => {
    let refCur = rollerRef.current
    if (!refCur) return
    refCur.addEventListener('pointerdown', handleRollerDown)
    return () => {
      if (!refCur) return
      refCur.removeEventListener('pointerdown', handleRollerDown)
    }
  }, [rollerRef.current])

  useEffect(() => {
    let refCur = barRef.current
    if (!refCur) return
    refCur.addEventListener('wheel', handleBarScroll)
    return () => {
      if (!refCur) return
      refCur.removeEventListener('wheel', handleBarScroll)
    }
  }, [barRef.current])

  // const handleDown = (e: PointerEvent) => { }
  const handleUp = (e: PointerEvent) => {
    SCROLL.bar.clicked = false
    SCROLL.grab = false
    setHovered(SCROLL.hovered)

    ref.current?.classList.remove('__grabbing')
  }
  const handleMove = (e: PointerEvent) => {
    if (!ref.current) return
    if (SCROLL.bar.clicked) {
      SCROLL.bar.offset = getOffset(e);
      SCROLL.bar.offsetDelta = SCROLL.bar.offsetStart - SCROLL.bar.offset;

      if (props.horizontal) {
        ref.current.scrollLeft = SCROLL.scrollStart + (-SCROLL.bar.offsetDelta / SCROLL.boxHeight * SCROLL.height)
      } else {
        ref.current.scrollTop = SCROLL.scrollStart + (-SCROLL.bar.offsetDelta / SCROLL.boxHeight * SCROLL.height)
      }
    }
    if (SCROLL.grab) {
      SCROLL.grabOffset = getOffset(e);
      SCROLL.grabDelta = SCROLL.grabStart - SCROLL.grabOffset;

      if (props.horizontal) {
        ref.current.scrollLeft = SCROLL.scrollStart + (SCROLL.grabDelta)
      } else {
        ref.current.scrollTop = SCROLL.scrollStart + (SCROLL.grabDelta)
      }
    }
  }

  const handleRefDown = (e: PointerEvent) => {
    if (!ref.current) return;
    if (SCROLL.bar.clicked) return
    SCROLL.grab = true
    SCROLL.grabStart = getOffset(e)
    if (props.horizontal) {
      SCROLL.scrollStart = ref.current.scrollLeft
    } else {
      SCROLL.scrollStart = ref.current.scrollTop
    }
    ref.current.classList.add('__grabbing')
  }

  const handleRollerDown = (e: PointerEvent) => {
    if (!ref.current) return;
    SCROLL.bar.clicked = true
    SCROLL.bar.offsetStart = getOffset(e)
    if (props.horizontal) {
      SCROLL.scrollStart = ref.current.scrollLeft
    } else {
      SCROLL.scrollStart = ref.current.scrollTop
    }
  }
  const handleBarScroll = (e: WheelEvent) => {
    e.preventDefault();
    if (!ref.current) return;
    if (props.horizontal) {
      ref.current.scrollLeft += e.deltaX
    } else {
      ref.current.scrollTop += e.deltaY
    }
  }
  const handleWheel = (e: WheelEvent) => {
    if(e.shiftKey) return;
    if (!ref.current) return;
    e.preventDefault()
    ref.current.scrollLeft += e.deltaY / 4;

    set()
    checkRoller();
  }
  const handleScroll = (e: Event) => {
    e.stopPropagation();

    set()
    checkRoller();
  }

  const handlePointerEnter = () => {
    SCROLL.hovered = true
    setHovered(true)
  }
  const handlePointerLeave = () => {
    SCROLL.hovered = false
    if (SCROLL.grab) return
    if (SCROLL.bar.clicked) return
    setHovered(false)
  }

  const init = () => {
    set();
    checkRoller()
  }

  const set = () => {
    if (!ref.current) return;
    if (props.horizontal) {
      SCROLL.height = ref.current.scrollWidth
      SCROLL.top = ref.current.scrollLeft
      SCROLL.boxHeight = ref.current.clientWidth
    } else {
      SCROLL.height = ref.current.scrollHeight
      SCROLL.top = ref.current.scrollTop
      SCROLL.boxHeight = ref.current.clientHeight
    }
    SCROLL.progress = SCROLL.top / (SCROLL.height - SCROLL.boxHeight)
  }

  const getOffset = (e: PointerEvent) => {
    return props.horizontal ? e.x : e.y
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
  }


  const cl = [
    'scroller',
    getClR(props.className),
    getCl(props.horizontal, 'horizontal'),
    getCl(props.needBar, 'bar'),
    getCl(props.grabCursor, 'grab'),
    getCl(props.barAltPosition, 'barAlt'),
    getCl(props.borderPadding, 'borderPadding'),
    getCl(props.borderFade, 'borderFade'),
    getCl(hovered, 'hovered'),
  ].join(' ')

  return (
    <div className={cl} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
      {props.needBar &&
        <div className={`scroller__bar ${props.barClassName}`} ref={barRef}>
          <div className={`scroller__bar_roller ${props.barRollerClassName}`} ref={rollerRef} />
        </div>
      }
      <div className={`scroller__content ${props.contentClassName}`} ref={ref}>
        {props.children}
      </div>
    </div>
  )
}