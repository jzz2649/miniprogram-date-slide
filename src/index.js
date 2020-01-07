
const ut = require('./utils')

Component({
  options: {
    pureDataPattern: /^_/
  },
  properties: {
    active: {
      type: String,
      value: ut.getCurrTime(),
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    filter: {
      type: Array,
      value: [],
    },
    label: {
      type: String,
      value: 'month',
    },
    timeOut: {
      type: Boolean,
      value: false
    },
    title: {
      type: Array,
      value: [{
        key: 0,
        text: '日'
      }, {
        key: 1,
        text: '一'
      }, {
        key: 2,
        text: '二'
      }, {
        key: 3,
        text: '三'
      }, {
        key: 4,
        text: '四'
      }, {
        key: 5,
        text: '五'
      }, {
        key: 6,
        text: '六'
      }]
    },
  },
  data: {
    activeTime: ut.getCurrTime(),
    filters: {},
    list: [],
    labelValue: {month: '', range: []},
    _current: 0,
    _count: 2
  },
  lifetimes: {
    attached() {
      this.update()
    }
  },
  methods: {
    change(event) {
      const {source, current} = event.detail
      if (source === 'touch') {
        const {_count, _current, list} = this.data
        const gap = this.getDistance(current, _current) * _count
        const idx = this.getIdx(current + gap)
        const cIdx = this.getIdx(_current + gap)
        const timeList = list[cIdx].list
        this.data._current = current
        const newList = list.map((item, index) => {
          if (index === idx) {
            const date = gap > 0 ? ut.getNextDate(timeList) : ut.getPrevDate(timeList)
            return ut.createItem(date, idx)
          }
          return item
        })
        this.setData({
          list: newList,
          labelValue: ut.getLabel(list[current].key)
        })
        this.triggerEvent('change', list[current].key)
      }
    },
    click(event) {
      const {disabled, timeOut, filters} = this.data
      const {time, status} = event.target.dataset
      if (disabled || (timeOut && status === -1) || filters[time]) {
        return
      }
      if (time) {
        this.setData({
          activeTime: time
        })
        this.triggerEvent('click', time)
      }
    },
    getDistance(a, b) {
      const max = this.data._count * 2
      if (b === 0) {
        if (a === max) {
          return -1
        }
        return 1
      }
      if (b === max) {
        if (a === 0) {
          return 1
        }
        return -1
      }
      return a > b ? 1 : -1
    },
    getIdx(current) {
      const max = this.data._count * 2 + 1
      if (current < 0) {
        return current + max
      }
      if (current >= max) {
        return current - max
      }
      return current
    },
    update(time) {
      const {activeTime, _count, _current} = this.data
      time = time || activeTime
      const list = ut.getList(time, _count, _current)
      this.setData({
        activeTime: time,
        labelValue: ut.getLabel(list[_current].key),
        list
      })
    }
  },
  observers: {
    filter(list) {
      const filters = this.data.filters
      const len = Object.keys(filters).length
      let isUpdate = false
      const set = {}
      list.forEach(time => {
        set[time] = true
        if (!filters[time]) {
          isUpdate = true
        }
      })
      if (!isUpdate && len !== list.length) {
        isUpdate = true
      }
      if (isUpdate) {
        this.setData({
          filters: set
        })
      }
    },
    active(time) {
      if (time && time !== this.data.activeTime) {
        this.update(time)
      }
    }
  },
})
