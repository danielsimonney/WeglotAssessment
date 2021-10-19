const getSchedule = require('../src/index');
const fs = require('fs');

describe('Test that input equal to output', () => {
  console.log(getSchedule.getSchedule)
  test('mon premier test', () => {
    for (let i = 1; i < 5; i++) {
      var output = fs.readFileSync(`./data/output${i}.txt`,'utf8')
      console.log(output,"output")
      expect(getSchedule(`input${i}.txt`)).toBe(output)
    }
  })
})

