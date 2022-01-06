import * as chrt from 'chrt';
import {chrtGroup} from '../../../src/'

const data = [
  {
    x: 'a',
    y: 10
  },
  {
    x: 'b',
    y: 14
  },
  {
    x: 'c',
    y: 14
  },
  {
    x: 'd',
    y: 22
  }
];

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .x({scale:'ordinal'})
    .y({domain:[0,null], scale:'linear'})
    // .y({domain:[1,10000], scale:'log'})
    .add(chrt.xAxis().zero(0))
    .add(chrt.yAxis())
    .add(
      chrtGroup()
        .width(0.5)
        .class('test')
        .add(
          chrt.chrtColumns()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .width(0.9)
            .fill('#f00')
        )
        .add(
          chrt.chrtColumns()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .width(0.9)
            .fill('#0f0')
        )
        .add(
          chrt.chrtColumns()
            .data(data, d => ({
              x: d.x,
              y: -d.y,
            }))
            .width(0.9)
            .fill('#00f')
        )
    );
}
