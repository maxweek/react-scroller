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

## Todo

- [x] Base scroll
- [x] Horizonal scroll
- [x] Grab content
- [x] Grab cursors and other visual features
- [x] Class extending
- [ ] Methods
- [ ] Events

## Installation

```ts
npm i @maxweek/react-scroller
```

## Usage

```ts
import Scroller from "@maxweek/react-scroller";

<Scroller
  needBar={true}
  barAltPosition={false}
  horizontal={false}
  grab={true}
  borderFade={true}
  borderPadding={true}
  grabCursor={true}
  className={'your-scroller-class'}
  barClassName={'your-scroller-bar-class'}
  barRollerClassName={'your-scroller-bar-roller-class'}
  contentClassName={'your-scroller-content-class'}
>
  {/* Your content */}
</Scroller>
```

## Props

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
    <tr><td>needBar?</td><td>boolean</td><td>false</td><td>enables scrollbar</td></tr>
    <tr><td>barAltPosition?</td><td>boolean</td><td>false</td><td>changes scrollbar position, default at right - changes to left, when horizontal enabled - changes bottom to top</td></tr>
    <tr><td>horizontal?</td><td>boolean</td><td>false</td><td>makes your box scrolling horizontal</td></tr>
    <tr><td>grab?</td><td>boolean</td><td>false</td><td>enables grabbing your scroll content</td></tr>
    <tr><td>borderFade?</td><td>boolean</td><td>false</td><td>add fadding in directions of scroll by masking</td></tr>
    <tr><td>borderPadding?</td><td>boolean</td><td>false</td><td>add padding in directions of scroll</td></tr>
    <tr><td>grabCursor?</td><td>boolean</td><td>false</td><td>enables grab cursor on hover</td></tr>
    <tr><td>className?</td><td>string</td><td>''</td><td>class for scroller box</td></tr>
    <tr><td>barClassName?</td><td>string</td><td>''</td><td>class for scrollbar</td></tr>
    <tr><td>barRollerClassName?</td><td>string</td><td>''</td><td>class for scrollbar roller</td></tr>
    <tr><td>contentClassName?</td><td>string</td><td>''</td><td>class for content wrapper</td></tr>
  </tbody>
</table>

### License
- React Scroll is licensed under the MIT License. Explore this to understand terms and conditions of the license- https://opensource.org/licenses/MIT

Thank you for using my package!
Max Nedelko