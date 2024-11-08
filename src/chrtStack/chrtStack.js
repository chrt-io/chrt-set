import chrtObject, { utils, cssDisplay} from 'chrt-object';
const { isNull, add } = utils;

function chrtStack() {
  //console.log('chrtStack')

  chrtObject.call(this);
  this.type = 'stack';
  this._grouped = 1;
  this._groupIndex = 0;
  this._orientation = 'bottom';

  this._dataMap = {
    x: {},
    y: {},
  };

  this._classNames = ['chrt-stack'];

  this.orientation = (orientation) => {
    if(isNull(orientation)) {
      return this._orientation;
    }
    const orientations = ['bottom', 'left'];
    this._orientation = orientations.indexOf(orientation) > -1 ? orientation : this._orientation;

    return this;
  }

  this.add = (chart) => {
    // console.log('chrtStack','add',chart, chart._area)
    chart._stacked = this;
    add.call(this, chart);
    // console.log('add', this.parentNode)

    const dataFunction = chart.data;
    chart.data = (data, accessor) => {
      //console.log('chrtStack','data!', this._dataMap)
      if(!isNull(data)) {
          data = data.map(d => {
            const x = d.x ?? d.x0;
            const y = d.y ?? d.y0;

            if(!this._dataMap.x[x]) {
              this._dataMap.x[x] = {
                x,
                values: [],
              }
            }
            this._dataMap.x[x].values.push(d);
            const y0 = !isNull(this._dataMap.x[x].y0) ? this._dataMap.x[x].y0 : null;
            const y0_neg = !isNull(this._dataMap.x[x].y0_neg) ? this._dataMap.x[x].y0_neg : null;

            if(d.y >= 0) {
              this._dataMap.x[x].y0 = this._orientation !== 'bottom' ? null : (y0 || 0) + y;
            } else {
              this._dataMap.x[x].y0_neg = this._orientation !== 'bottom' ? null : (y0_neg || 0) + y;
            }

            if(!this._dataMap.y[y]) {
              this._dataMap.y[y] = {
                y,
                values: [],
              }
            }
            this._dataMap.y[y].values.push(d);
            const x0 = !isNull(this._dataMap.y[y].x0) ? this._dataMap.y[y].x0 : null;
            const x0_neg = !isNull(this._dataMap.y[y].x0_neg) ? this._dataMap.y[y].x0_neg : null;

            if(d.x >= 0) {
              this._dataMap.y[y].x0 = this._orientation !== 'left' ? null : (x0 || 0) + x;
            } else {
              this._dataMap.y[y].x0_neg = this._orientation !== 'left' ? null : (x0_neg || 0) + x;
            }

            // check if d.y is a number, if not then most probably it's a
            // ordinal scale, to avoid odd chaining of numbers and string
            // chrt doesn't add them but keeps only d.y
            const valueWithStack = Object.assign({}, d, {
              stacked_y: isNaN(y) ? y : (y >= 0 ? y0 : y0_neg || 0) + y,
              stacked_y0: y >= 0 ? y0 : y0_neg,
              stacked_x: isNaN(x) ? x : ((x >= 0 ? x0 : x0_neg) || 0) + x,
              stacked_x0: x >= 0 ? x0 : x0_neg,
            });

            return valueWithStack;
          })
          // console.log(this._dataMap)
      }
      // console.log('CALLING DATA ON',chart,'WITH', data)
      return dataFunction.call(chart, data, accessor);
    }

    return this;
  }

  this.snap = this.add;

  this.draw = () => {
    // console.log('chrtStack', 'draw', this.objects);
    const parentNode = this.parentNode.type === 'group' ? this.parentNode.parentNode : this.parentNode;
    this.objects.forEach(obj => {
      if(parentNode.objects.map(d => d._id).indexOf(obj._id) === -1) {
        parentNode.add(obj);
      }
      // console.log('--->', obj)
    })

    cssDisplay.call(this, this.attr('display')());

    this.g.classList.remove(...this.g.classList)
    this.g.classList.add(...this._classNames);

    this.objects.forEach(obj => obj.draw())

    return this;
  }
}

chrtStack.prototype = Object.create(chrtObject.prototype);
chrtStack.prototype.constructor = chrtStack;
chrtStack.parent = chrtObject.prototype;

chrtStack.prototype = Object.assign(chrtStack.prototype, {
});

export default function() {
  return new chrtStack();
}
