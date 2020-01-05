const path = require('path')
const simulate = require('miniprogram-simulate')

const config = require('../tools/config')

test('components/index', () => {
  const id = simulate.load(path.join(config.srcPath, 'index'))
  const active = '2020/01/05'
  const comp = simulate.render(id, {
    active
  })

  comp.triggerLifeTime('attached')

  expect(comp.data.list[0].list[0].time === active).toBe(true)
})
