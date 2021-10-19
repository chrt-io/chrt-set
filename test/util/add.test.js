import * as chrt from 'chrt';
import {chrtStack} from '~/'

describe('Testing add', () => {
  it('Testing add without prepend', () => {
    const stack = chrtStack();
    const chartIDs = ['chart1', 'chart2'];
    chartIDs.map(d => stack.add(chrt.chrtLine().id(d)));

    expect(stack.objects.map(d => d.id())).toEqual(chartIDs);
  })
})
