import chrtObject, { utils, cssDisplay } from 'chrt-object';
const { isNull, add } = utils;

function chrtGroup() {
  chrtObject.call(this);
  this.type = 'group';
  this.attr('width', 1);

  this._classNames = ['chrt-group'];

  this.width = (width) => {
    if(isNull(width)) {
      return this.attr('width')();
    }
    this.attr('width', Math.min(Math.max(width, 0), 1))

    return this;
  }

  this.add = (chart) => {
    // console.log('chrtGroup','add',chart)
    add.call(this, chart);

    chart._groupIndex = this.objects.length - 1;
    this.objects.forEach(obj => {
      obj._group = this;
      obj._grouped = this.objects.length
    })

    return this;
  }

  this.snap = this.add;

  this.draw = () => {
    this.objects.forEach(obj => {
      if(this.parentNode.objects.map(d => d._id).indexOf(obj._id) === -1) {
        this.parentNode.add(obj);
      }
      // console.log('--->', obj)
    })

    this.objects.forEach(obj => obj.draw())

    cssDisplay.call(this, this.attr('display')());
    this.g.classList.remove(...this.g.classList)
    this.g.classList.add(...this._classNames);

    return this;
  }
}

chrtGroup.prototype = Object.create(chrtObject.prototype);
chrtGroup.prototype.constructor = chrtGroup;
chrtGroup.parent = chrtObject.prototype;

chrtGroup.prototype = Object.assign(chrtGroup.prototype, {
  snap: add,
});

export default function() {
  return new chrtGroup();
}
