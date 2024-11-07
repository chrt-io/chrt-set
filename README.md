# chrt-set

Component for creating grouped and stacked visualizations in chrt. This module provides two main ways to combine multiple chart elements:

- `chrtGroup`: Groups elements side by side (e.g., grouped bar charts)
- `chrtStack`: Stacks elements on top of each other (e.g., stacked area charts)

These components are essential for creating complex comparisons and showing part-to-whole relationships.

### Observable Examples and Documentation:

- [Chrt Sets - Observable](https://observablehq.com/d/0f320339acb47e75?collection=@chrt/chrt)
- [Introducing Chrt - Observable](https://observablehq.com/@chrt/introducing-chrt?collection=@chrt/chrt)

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, `chrt-set` can be installed as a standalone module via a package manager such as Yarn or npm.

```bash
npm install chrt-set chrt-core
```

`chrt-set` can be used as part of the `chrt` package:

```bash
npm install chrt
```

## Usage

### ES6 / Bundlers (Webpack, Rollup, etc.)

````js
import Chrt from "chrt-core";
import { chrtColumns } from "chrt-bars";
import { chrtGroup, chrtStack } from "chrt-set";

// Create grouped columns
Chrt().add(
  chrtGroup()
    .add(chrtColumns().data(data1))
    .add(chrtColumns().data(data2)),
);

## API Reference

### chrtGroup

Groups multiple chart elements side by side, useful for comparing values across categories.

#### Creation

```js
// Create a group
chrtGroup().add(chrt.columns()).add(chrt.columns());
````

#### `.width([value])`

Sets the relative width of the grouped elements. Value should be between 0 and 1.

```js
chrtGroup()
  .width(0.8) // 80% of available space
  .add(chrt.columns());
```

#### `.add(chart)`

Adds a chart element to the group. Elements are positioned side by side.

```js
chrtGroup()
  .add(chrt.columns().fill("#ff0000"))
  .add(chrt.columns().fill("#00ff00"));
```

### chrtStack

Stacks multiple chart elements on top of each other, useful for showing part-to-whole relationships.

#### Creation

```js
// Create a stacked bar chart
chrtStack().add(chrt.columns()).add(chrt.columns());
```

#### `.orientation([value])`

Sets the stacking orientation. Available options:

- `"bottom"` (default): Stack vertically from bottom
- `"left"`: Stack horizontally from left

```js
// Stack bars from left to right
chrtStack().orientation("left").add(chrt.bars());
```

#### `.add(chart)` / `.snap(chart)`

Adds a chart element to the stack. Both methods are aliases.

```js
chrtStack()
  .add(chrt.columns().fill("#ff0000"))
  .snap(chrt.columns().fill("#00ff00"));
```

### Examples

#### Grouped Column Chart

```js
Chrt().add(
  chrtGroup()
    .width(0.8)
    .add(chrt.columns().data(data).fill("#ff0000"))
    .add(chrt.columns().data(data).fill("#00ff00")),
);
```

#### Stacked Area Chart

```js
Chrt().add(
  chrtStack()
    .add(chrt.line().data(data1).area().fill("#ff0000").fillOpacity(0.5))
    .add(chrt.line().data(data2).area().fill("#00ff00").fillOpacity(0.5)),
);
```

#### Stacked Bars with Negative Values

```js
Chrt().add(
  chrtStack()
    .orientation("left")
    .add(chrt.bars().data(positiveData).fill("#00ff00"))
    .add(chrt.bars().data(negativeData).fill("#ff0000")),
);
```

#### Combined Grouping and Stacking

```js
Chrt().add(
  chrtGroup()
    .width(0.9)
    .add(
      chrtStack()
        .add(chrt.columns().data(group1Data1))
        .add(chrt.columns().data(group1Data2)),
    )
    .add(
      chrtStack()
        .add(chrt.columns().data(group2Data1))
        .add(chrt.columns().data(group2Data2)),
    ),
);
```
