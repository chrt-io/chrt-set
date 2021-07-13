import * as chrt from 'chrt';
import chrtGroup from '~/charts/chrtGroup'

const data = [
  {
    y: 'a',
    x: 10
  },
  {
    y: 'b',
    x: 14
  },
  {
    y: 'c',
    x: 14
  },
  {
    y: 'd',
    x: 22
  }
];

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .y({scale:'ordinal'})
    .x({scale:'linear'})
    // .y({domain:[1,10000], scale:'log'})
    .add(chrt.xAxis().hideAxis())
    .add(chrt.yAxis().zero(0))
    .add(
      chrtGroup()
        .width(0.5)
        //.orientation('left')
        .add(
          chrt.chrtBars()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .width(1)
            .stroke('#333')
            .strokeWidth(2)
            .strokeOpacity(0.8)
            .fill('#f00')
            .fillOpacity(0.5)
        )
        .add(
          chrt.chrtBars()
            .data(data, d => ({
              x: d.x,
              y: d.y,
            }))
            .width(1)
            .stroke('#333')
            .strokeWidth(2)
            .strokeOpacity(0.8)
            .fill('#0f0')
            .fillOpacity(0.5)
        )
        .add(
          chrt.chrtBars()
            .data(data, d => ({
              x: -d.x,
              y: d.y,
            }))
            .width(1)
            .stroke('#333')
            .strokeWidth(2)
            .strokeOpacity(0.8)
            .fill('#00f')
            .fillOpacity(0.5)
        )
    );
}
