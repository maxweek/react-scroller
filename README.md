# React-scroller

Make your blocks scrolling easy, with a custom scroll-bar, based on native browser scroll.
It is for simple and progressive applications, works on all modern browsers.
It has a minimal load on the system, and has maximum performance, expandable and updatable

## Features

- Default scroll
- Horizontal scroll
- Vertical scroll
- Both vertical and horizontal scroll
- Grab content
- Grab cursor
- Interactive scrollbar
- Variation of scrollbar positions
- Trackpad detecting
- Border padding and fading
- Horizontal scroll by mouse wheel
- Minimal processing
- Based on original browser scroll
- Extendable
- Auto updating on child changes
- Base Events
- Base Methods
- Ref with methods and properties (with interface)
- Observing self size and reiniting automatically

## Todo

- [x] Base scroll
- [x] Horizontal scroll
- [x] Vertical scroll
- [x] Both vertical and horizontal scroll
- [x] Grab content
- [x] Grab cursors and other visual features
- [x] Class extending
- [x] Base Methods
- [x] Base Events
- [x] Required styles
- [x] Trackpad detect
- [x] ResizeObserver
- [x] Scrolling Duration
- [ ] More Methods
- [ ] More Events
- [ ] Inertia (custom scroll engine)

## Installation

```sh
npm i @maxweek/react-scroller
```

## First Usage

```tsx
import Scroller from "@maxweek/react-scroller";
import "@maxweek/react-scroller/css";

const YourComponent = () => (
  <Scroller>
    {/* Your content */}
  </Scroller>
);
```

## Usage

```tsx
import Scroller, { IScrollerRef, IScroller, IScrollerProperties } from "@maxweek/react-scroller";
import "@maxweek/react-scroller/css";
import { useRef } from "react";

const YourComponent = () => {
  // Ref
  const scrollerRef = useRef<IScrollerRef>(null);

  // Methods
  const scrollToStart = () => {
    scrollerRef.current?.scrollToStart(); // scroll to start
  };
  const scrollToEnd = () => {
    scrollerRef.current?.scrollToEnd(); // scroll to end
  };
  const scrollTo = () => {
    scrollerRef.current?.scrollTo(100); // scroll to 100px
  };
  const update = () => {
    scrollerRef.current?.update(); // update scroll calculations
  };
  const getScrollerRef = () => {
    let ref = scrollerRef.current?.scrollRef; // get ref of main scroller box to control manually
  };
  const getProperties = () => {
    if (!scrollerRef.current) return;
    let properties: IScrollerProperties = scrollerRef.current?.getProperties(); // get properties of scroller object
  };

  // Scroller
  return (
    <Scroller
      ref={scrollerRef}
      needBar={true}
      barAltPosition={false}
      vertical={true}
      horizontal={true}
      grab={true}
      borderFade={true}
      autoHide={false}
      borderPadding={true}
      grabCursor={true}
      showWhenMinimal={true}
      className={'your-scroller-class'}
      barClassName={'your-scroller-bar-class'}
      barRollerClassName={'your-scroller-bar-roller-class'}
      contentClassName={'your-scroller-content-class'}
      onScroll={(x, y) => console.log(`scroll progress x: ${x.progress}, y: ${y.progress}`)}
      onReachStart={(type) => console.log(`reach start ${type}`)}
      onReachEnd={(type) => console.log(`reach end ${type}`)}
    >
      {/* Your content */}
    </Scroller>
  );
};
```

Full usage you can see on https://github.com/maxweek/react-scroller

## Props

```tsx
import { IScroller } from "@maxweek/react-scroller";
import "@maxweek/react-scroller/css";

const props: Partial<IScroller> = {
  needBar: true,
  barAltPosition: false,
  vertical: true,
  horizontal: true,
  grab: true,
  autoHide: false,
  borderFade: true,
  borderPadding: true,
  grabCursor: true,
  showWhenMinimal: true,
  className: 'your-scroller-class',
  barClassName: 'your-scroller-bar-class',
  barRollerClassName: 'your-scroller-bar-roller-class',
  contentClassName: 'your-scroller-content-class',
  onScroll: (x, y) => console.log(`scroll progress x: ${x.progress}, y: ${y.progress}`),
  onReachStart: (type) => console.log(`reach start ${type}`),
  onReachEnd: (type) => console.log(`reach end ${type}`)
};
```

## Configuration

- `vertical`: Enables vertical scrolling. Default is `false`.
- `horizontal`: Enables horizontal scrolling. Default is `false`.
- `both`: Enables both vertical and horizontal scrolling. Default is `false`.

```tsx
const config = {
  // ...existing config options...
  vertical: true, // Enable vertical scrolling
  horizontal: true, // Enable horizontal scrolling
  both: true, // Enable both axis scrolling
};
```

<table>
  <thead>
    <tr>
      <th>PropName</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>children</td><td>ReactNode</td><td></td><td>React child</td></tr>
    <tr><td>ref?</td><td>IScrollerRef</td><td></td><td>Ref to control the element</td></tr>
    <tr><td>needBar?</td><td>boolean</td><td>false</td><td>Enables scrollbar</td></tr>
    <tr><td>barAltPosition?</td><td>boolean</td><td>false</td><td>Changes scrollbar position, default at right - changes to left, when horizontal enabled - changes bottom to top</td></tr>
    <tr><td>vertical?</td><td>boolean</td><td>false</td><td>Enables vertical scrolling</td></tr>
    <tr><td>horizontal?</td><td>boolean</td><td>false</td><td>Enables horizontal scrolling</td></tr>
    <tr><td>grab?</td><td>boolean</td><td>false</td><td>Enables grabbing your scroll content</td></tr>
    <tr><td>borderFade?</td><td>boolean</td><td>false</td><td>Adds fading in directions of scroll by masking</td></tr>
    <tr><td>borderPadding?</td><td>boolean</td><td>false</td><td>Adds padding in directions of scroll</td></tr>
    <tr><td>autoHide?</td><td>boolean</td><td>false</td><td>Hides scrollbar if it is not hovered</td></tr>
    <tr><td>grabCursor?</td><td>boolean</td><td>false</td><td>Enables grab cursor on hover</td></tr>
    <tr><td>showWhenMinimal?</td><td>boolean</td><td>true</td><td>Enables bar on hover, when the scroll height is smaller than box height</td></tr>
    <tr><td>className?</td><td>string</td><td>''</td><td>CSS Class for scroller box</td></tr>
    <tr><td>barClassName?</td><td>string</td><td>''</td><td>CSS Class for scrollbar</td></tr>
    <tr><td>barRollerClassName?</td><td>string</td><td>''</td><td>CSS Class for scrollbar roller</td></tr>
    <tr><td>contentClassName?</td><td>string</td><td>''</td><td>CSS Class for content wrapper</td></tr>
    <tr><td>onScroll?</td><td>event</td><td>(x: IScrollerProgress, y: IScrollerProgress) => {}</td><td>Event on 'scroll', `x` and `y` props are the interpolation of scroll progress from 0 to 1</td></tr>
    <tr><td>onReachStart?</td><td>event</td><td>(type: 'x' | 'y') => {}</td><td>Event on 'scroll' reaches start</td></tr>
    <tr><td>onReachEnd?</td><td>event</td><td>(type: 'x' | 'y') => {}</td><td>Event on 'scroll' reaches end</td></tr>
  </tbody>
</table>

## Methods

```tsx
import { IScrollerRef, IScroller, IScrollerProperties } from "@maxweek/react-scroller";
import { useRef } from "react";

const scrollerRef = useRef<IScrollerRef>(null);

// Methods
const scrollToStart = () => {
  scrollerRef.current?.scrollToStart(2000); // scroll to start
};
const scrollToEnd = () => {
  scrollerRef.current?.scrollToEnd(2000); // scroll to end
};
const scrollTo = () => {
  scrollerRef.current?.scrollTo(100, 2000); // scroll to 100px
};
const update = () => {
  scrollerRef.current?.update(); // update scroll calculations
};
const getScrollerRef = () => {
  let ref = scrollerRef.current?.scrollRef; // get ref of main scroller box to control manually
};
const getProperties = () => {
  if (!scrollerRef.current) return;
  let properties: IScrollerProperties = scrollerRef.current?.getProperties(); // get properties of scroller object
};
```

### More

Your issues on GitHub

GitHub: https://github.com/maxweek/react-scroller

Thank you for using my package!

Max Nedelko 2024

### Keywords 
"touch", "scrollbar", "horizontal", "scroller", "scroll", "react"

### License
- React Scroll is licensed under the MIT License. Explore this to understand terms and conditions of the license- https://opensource.org/licenses/MIT