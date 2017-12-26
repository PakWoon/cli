const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: '模版名称：',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return '请输入模版名称！'
      } else if (!tplList[val]) {
        return '找不到这个模版，请使用“pakwoon list”查看当前模版列表'
      }
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '文件存放对应路径',
    default: './'
  }
]

module.exports = prompt(question).then(({ name, place }) => {
  const gitPlace = tplList[name]['owner/name']
  const gitBranch = tplList[name]['branch']
  const spinner = ora('下载模版中...')

  spinner.start()

  download(`${gitPlace}#${gitBranch}`, `${place}`, (err) => {
    console.log(`${gitPlace}#${gitBranch}`,`${place}`)
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('模版下载成功！'))
  })
})
