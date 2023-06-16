#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1', '-v, --version') // 버전
  .usage('[options]'); // 설명서 (commander는 설명서를 자동 생성해줌)

program
  .command('template <type>')
  .usage('--name <name> --path [path]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-n, --name <name>', '파일명을 입력하세요', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요', '.') // 현재 경로
  .action((type, options) => {
    console.log(type, options.name, options.directory);
  });

program
  .command('*', { noHelp: true }) // 도움말을 띄우지 말고,
  .action(() => {
    console.log('해당 명령어를 찾을 수 없습니다.');
    program.help();
  });

program.parse(process.argv);

if (!program.args.length) {
  const inquirer = require('inquirer');
  const chalk = require('chalk');

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message: '템플릿 종류를 선택하세요.',
        choices: ['html', 'express-router'],
      },
      {
        type: 'input',
        name: 'name',
        message: '파일의 이름을 입력하세요.',
        default: 'index',
      },
      {
        type: 'input',
        name: 'directory',
        message: '파일이 위치할 폴더의 경로를 입력하세요.',
        default: '.',
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: '생성하시겠습니까?',
      },
    ])
    .then((answers) => {
      if (answers.confirm) {
        makeTemplate(answers.type, answers.name, answers.directory);
        console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'));
      }
    });
}
