const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: '模版名称:',
    validate (val) {
      if (tplList[val]) {
        return '此模版名称已经存在!'
      } else if (val === '') {
        return '请输入模版名称!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '代码所有者名称／模版项目名称：',
    validate (val) {
      if (val !== '') {
        return true
      }
      return '请填写 代码所有者名称／模版项目名称!'
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: '拉取分支（默认master）:',
    default: 'master'
  }
]

module.exports = prompt(question).then(({ name, place, branch }) => {
  tplList[name] = {}
  tplList[name]['owner/name'] = place
  tplList[name]['branch'] = branch

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, '模版添加成功！')
  })
})
