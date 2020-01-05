Page({
  data: {
    range: '',
    filter: ['2020/01/07'],
    active: ''
  },
  change(event) {
    this.setData({
      range: event.detail
    })
  },
  click(event) {
    this.setData({
      active: event.detail
    })
  }
})
