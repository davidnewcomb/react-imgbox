# react-imgbox

React component that draws a styled box over an image; react version of [jquery-imgbox](https://github.com/davidnewcomb/jquery-imgbox).

## Project parts

This repo contains 2 projects:

1. imgbox - NPM module
2. NextJs - Demo application

### Build and run locally

```bash
cd imgbox
yarn install
yarn run build
yarn link
cd ../next-app
yarn install
yarn link react-imgbox
yarn run dev
```

Then goto [http://localhost:3000/]

## Overview

ImgBox uses coordinates bases on the real size of the `src` image to draw a box over the same area no matter the size of the picture. There is an edit option for you to draw the box yourself and save the coordinates for latter.

See the [demo page](https://cdn.bigsoft.co.uk/projects/react-imgbox/) for examples.

This plugin can be used as a drop in replacement for &lt;img&gt; tag and will behave similarly.

## Dependencies

1. [ReactJs 18](https://react.dev/)

## Size

After gzip compression `react-imgbox.babel.min.js` is 3.2K.

## Usage

### Passing props

What I think is a default may not be a default for others so `props` may be passed as `props` or as part of a `props.defaultSettings`.

```jsx
<ImgBox src="/img/pic.jpg" x="20" y="30" w="50" h="75"
    defaultSettings={{
    debug: true,
    name: 'my pic',
    markStyle: {
        border: '10px outset white'
    }
    }}
/>
```

is equivlient to

```jsx
<ImgBox debug={true} name="my pic" markStyle={{border: '10px outset white'}}
    defaultSettings={{
        src: "/img/pic.jpg",
        x: 20,
        y: 30,
        w: 50,
        h: 75
    }}
/>
```

### Coordinate system

The coordinate numbers are pixels across the original image.
Coordinate may be passed in 2 forms:

1. x,y with width (w) and height (h)
1. x,y with x2, y2
1. If you include w,h,x2,y2 they should be internally consistant as x2,y2 will take priority.
x and y are effectiviely left and top and the other 2 forms are positive numbers.

### Modes

If `edit` is `false`, then the component is read-only and the marker may only be changed via `props`.
If `edit` is `true`, then click to start drawing and click again to stop drawing. `saveBox` will be called and passed an object containing `x`, `y`, `x2`, `y2`, `w` and `h`. After editing has finished the marker will return to the `props` position. So if you want the changes to be permanant you must update the `props` to reflect the new `state`.

```js
const [coords, setCoords] = useState({{x: 10, y: 10, x2: 20, y2: 20}})

return <ImgBox x={coords.x} .... edit={true} saveBox={(newCoords) => setCoords(newCoords)}>
```

## Options

Here's the list of available settings.

### Settings

To be used in `IMG` tags.

Attribute       | Type      | Default                                   | Description
---             | ---       | ---                                       | ---
id              | *string*  | null                                      | Proxied to underlining &lt;img&gt; tag.
className       | *string*  | null, space separated list of class names | Proxied to underlining &lt;img&gt; tag.
src             | *string*  | null                                      | Proxied to underlining &lt;img&gt; tag.
alt             | *string*  | ''                                        | Proxied to underlining &lt;img&gt; tag.
onClick         | *(e) => {}*  | null                                   | Proxied to underlining &lt;img&gt; tag, except when edit=true.
onMouseMove     | *(e) => {}*  | null                                   | Proxied to underlining &lt;img&gt; tag.
x               | *number*  |  undefined                                | Start CSS left (pixels)
y               | *number*  |  undefined                                | Start CSS top (pixels)
x2              | *number*  | undefined                                 | End CSS left (pixels)
y2              | *number*  | undefined                                 | End CSS top (pixels)
w               | *number*  |  undefined                                | CSS width (pixels)
h               | *number*  |  undefined                                | CSS height (pixels)
defaultSettings | *object*  |                                           | see [Passing Props section](#passing-props)
debug           | *boolean* | false                                     | Switch on logging to the console
name            | *string*  | ''                                        | used component debug
markStyle       | *object*  | {}                                        | CSS Style of marker
markClass       | *string*  | ''                                        | CSS class to describe mark
edit            | *boolean* | false                                     | Click on image to start drawing
saveBox         | *(coord) => {}* |                                     | Stub implementation

## License

[LICENCE](LICENCE) Copyright (c) 2024 David Newcomb https://www.bigsoft.co.uk/
