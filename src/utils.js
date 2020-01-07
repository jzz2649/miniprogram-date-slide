function getDate(date) {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return {y, m, d}
}

function time2str(date) {
  const d = getDate(date)
  return d.y + '/' + String(d.m).padStart(2, '0') + '/' + String(d.d).padStart(2, '0')
}

function getCurrTime() {
  return time2str(new Date())
}

function createKey(list) {
  const start = list[0].time
  const end = list[6].time
  return start + ' ' + end
}

function isOutDated(a, b) {
  if (a.y > b.y) {
    return -1
  } else if (a.y === b.y) {
    if (a.m > b.m) {
      return -1
    } else if (a.m === b.m) {
      if (a.d > b.d) {
        return -1
      } else if (a.d === b.d) {
        return 0
      }
    }
  }
  return 1
}

function createItem(date, idx) {
  const today = getDate(new Date())
  date.setDate(date.getDate() - date.getDay())
  const set = {idx}
  const list = []
  let cd = date.getDate()
  let i = 7
  while (i--) {
    const status = isOutDated(today, getDate(date))
    const dd = {
      day: status ? cd : '今',
      time: time2str(date),
      status
    }
    list.push(dd)
    date.setDate(cd + 1)
    cd = date.getDate()
  }
  set.list = list
  set.key = createKey(list)
  return set
}

function getPrevDate(list) {
  const time = list[0].time
  const date = new Date(time)
  date.setDate(date.getDate() - 1)
  return date
}

function getNextDate(list) {
  const time = list[6].time
  const date = new Date(time)
  date.setDate(date.getDate() + 1)
  return date
}

function getCurrent(max, current) {
  if (current < 0) {
    return max
  }
  if (current > max) {
    return 0
  }
  return current
}

function apendList(list, count, current, add) {
  const max = count * 2
  while (count--) {
    const item = list[current]
    current = add ? getCurrent(max, current + 1) : getCurrent(max, current - 1)
    const date = add ? getNextDate(item.list) : getPrevDate(item.list)
    list[current] = createItem(date, current)
  }
}

function getList(time, count, current) {
  const list = []
  const item = createItem(new Date(time), current)
  list[current] = item
  apendList(list, count, current, true)
  apendList(list, count, current)
  return list
}

function getFT(time, full) {
  const d = time.split('/')
  const t = d[0] + '年' + Number(d[1]) + '月'
  return full ? t + Number(d[2]) + '日' : t
}

function getLabel(key) {
  const time = key.split(' ')
  return {
    month: getFT(time[0]),
    range: [getFT(time[0], true), getFT(time[1], true)]
  }
}

module.exports = {
  createItem,
  getList,
  getCurrTime,
  getNextDate,
  getPrevDate,
  getLabel
}
