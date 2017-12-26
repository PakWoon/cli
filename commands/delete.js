const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: '要删除哪个模版:',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return '请填写模版名称：'
      } else if (!tplList[val]) {
        return '找不到这个模版，请使用“pakwoon list”查看当前模版列表'
      }
    }
  }
]

module.exports = prompt(question).then(({ name }) => {
  delete tplList[name]

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, '模版删除成功')
  })
})
