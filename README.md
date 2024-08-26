# React-scroller

Make your blocks scrolling easy, with a custom scroll-bar, based on native browser scroll.
It is for simple and progressive applications, works on all modern browsers.
It has a minimal load on the system, and has maximum performance, expandable and updatable

## Features

- Default scroll
- Horizontal scroll
- Grab content
- Grab cursor
- Interactive scrollbar
- Variation of scrollbar positions
- Border padding and fading
- Horizontal scroll by mouse wheel
- Minimal processing
- Based on original browser scroll
- Extendable
- Auto updating on child changes
- Base Events
- Base Methods
- Ref with methods and properties (with interface)

## Todo

- [x] Base scroll
- [x] Horizonal scroll
- [x] Grab content
- [x] Grab cursors and other visual features
- [x] Class extending
- [x] Base Methods
- [x] Base Events
- [ ] More Methods
- [ ] More Events
- [ ] Inertia (custom scroll engine)

## Installation

```ts
npm i @maxweek/react-scroller
```

## First Usage

```ts
import { Scroller } from "@maxweek/react-scroller";

const YourComponent = () => {
  <Scroller>
    {/* Your content */}
  </Scroller>
}
```


## Usage

```ts
import { IScrollerRef, Scroller, IScroller, IScrollerProperties } from "@maxweek/react-scroller";

const YourComponent = () => {
  // Ref
  const scrollerRef = useRef<IScrollerRef>(null);

  // Methods
  const scrollToStart = () => {
    scrollerRef.current?.scrollToStart()          // scroll to start
  }
  const scrollToEnd = () => {
    scrollerRef.current?.scrollToEnd()            // scroll to end
  }
  const scrollTo = () => {
    scrollerRef.current?.scrollTo(100)            // scroll to 100px
  }
  const update = () => {
    scrollerRef.current?.update()                 // update scroll calculations
  }
  const getScrollerRef = () => {
    let ref = scrollerRef.current?.scrollRef      // get ref of main scroller box to contol manualy
  }
  const getProperties = () => {
    if (!scrollerRef.current) return
    let properties: IScrollerProperties = scrollerRef.current?.getProperties() // get properties of scroller object
  }

  // Scroller
  <Scroller
    ref={scrollerRef}
    needBar={true}
    barAltPosition={false}
    horizontal={false}
    grab={true}
    borderFade={true}
    borderPadding={true}
    grabCursor={true}
    showWhenMinimal={true}
    className={'your-scroller-class'}
    barClassName={'your-scroller-bar-class'}
    barRollerClassName={'your-scroller-bar-roller-class'}
    contentClassName={'your-scroller-content-class'}
    onScroll={() => console.log('reach end')}
    onReachStart={() => console.log('reach start')}
    onReachEnd={() => console.log('scroll')}
  >
    {/* Your content */}
  </Scroller>
}
```

Full usage you can see on https://github.com/maxweek/react-scroller

## Props

```js
  import { IScroller } from "./scroller/scroller"

  const props: Partial<IScroller> = {
    needBar: true,
    barAltPosition: true,
    horizontal: true,
    grab: true,
    borderFade: true,
    borderPadding: true,
    grabCursor: true,
    showWhenMinimal: true,
    className: 'your-scroller-class',
    barClassName: 'your-scroller-bar-class',
    barRollerClassName: 'your-scroller-bar-roller-class',
    contentClassName: 'your-scroller-content-class',
    onScroll: () => console.log('reach end'),
    onReachStart: () => console.log('reach start'),
    onReachEnd: () => console.log('scroll'),
  }

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
    <tr><td>needBar?</td><td>boolean</td><td>false</td><td>enables scrollbar</td></tr>
    <tr><td>barAltPosition?</td><td>boolean</td><td>false</td><td>changes scrollbar position, default at right - changes to left, when horizontal enabled - changes bottom to top</td></tr>
    <tr><td>horizontal?</td><td>boolean</td><td>false</td><td>makes your box scrolling horizontal</td></tr>
    <tr><td>grab?</td><td>boolean</td><td>false</td><td>enables grabbing your scroll content</td></tr>
    <tr><td>borderFade?</td><td>boolean</td><td>false</td><td>add fadding in directions of scroll by masking</td></tr>
    <tr><td>borderPadding?</td><td>boolean</td><td>false</td><td>add padding in directions of scroll</td></tr>
    <tr><td>grabCursor?</td><td>boolean</td><td>false</td><td>enables grab cursor on hover</td></tr>
    <tr><td>showWhenMinimal??</td><td>boolean</td><td>true</td><td>enables bar on hover, when the scroll height smaller than box height</td></tr>
    <tr><td>className?</td><td>string</td><td>''</td><td>class for scroller box</td></tr>
    <tr><td>barClassName?</td><td>string</td><td>''</td><td>class for scrollbar</td></tr>
    <tr><td>barRollerClassName?</td><td>string</td><td>''</td><td>class for scrollbar roller</td></tr>
    <tr><td>contentClassName?</td><td>string</td><td>''</td><td>class for content wrapper</td></tr>
    <tr><td>onScroll?</td><td>event</td><td>() => {}</td><td>Event on 'scroll'</td></tr>
    <tr><td>onReachStart?</td><td>event</td><td>() => {}</td><td>Event on 'scroll' reaches start</td></tr>
    <tr><td>onReachEnd?</td><td>event</td><td>() => {}</td><td>Event on 'scroll' reaches end</td></tr>
  </tbody>
</table>


## Methods

```js

  import { IScrollerRef, Scroller, IScroller, IScrollerProperties } from "./scroller/scroller"

  const scrollerRef = useRef<IScrollerRef>(null) 

  // Methods
  const scrollToStart = () => {
    scrollerRef.current?.scrollToStart()          // scroll to start
  }
  const scrollToEnd = () => {
    scrollerRef.current?.scrollToEnd()            // scroll to end
  }
  const scrollTo = () => {
    scrollerRef.current?.scrollTo(100)            // scroll to 100px
  }
  const update = () => {
    scrollerRef.current?.update()                 // update scroll calculations
  }
  const getScrollerRef = () => {
    let ref = scrollerRef.current?.scrollRef      // get ref of main scroller box to contol manualy
  }
  const getProperties = () => {
    if (!scrollerRef.current) return
    let properties: IScrollerProperties = scrollerRef.current?.getProperties() // get properties of scroller object
  }


```

### License
- React Scroll is licensed under the MIT License. Explore this to understand terms and conditions of the license- https://opensource.org/licenses/MIT

### More

Your issues on github

Github https://github.com/maxweek/react-scroller

Thank you for using my package!

Max Nedelko 2024