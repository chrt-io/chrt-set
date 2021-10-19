// import * as chrt from 'chrt';
// import chrtBars from '~/chrtBars/chrtBars'
//
// describe('Testing chrtBars', () => {
//   test('Test getXScale', () => {
//     const chart = chrt.Chrt()
//                     .data([0,1,2,3,4,5])
//     let bars;
//     chart.add(bars = chrtBars())
//
//     const scale = bars.getXScale();
//
//     expect(scale).toBeDefined();
//     expect(scale.getName()).toBeDefined();
//     expect(scale.getName()).toBe('x');
//
//   });
// });

import * as chrt from 'chrt';
import {chrtStack} from '~/'

describe('Testing chrtStack', () => {
  it('Testing orientation getter', () => {
    const stack = chrtStack();

    expect(stack.orientation()).toEqual('bottom');
  })
})
