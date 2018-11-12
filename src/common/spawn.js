// 简单封装spawn
const childProcess = require('child_process');

module.exports = ({
  cwd = '',
  env = {},
  begin,
  stdout,
  stderr,
  error,
  close
}) => {
  return command => {
    // let file = '';
    // let args = [];
    // if (process.platform === 'win32') {
    //   file = process.env.comspec || 'cmd.exe';
    //   args = ['/s', '/c', command];
    // } else {
    //   file = '/bin/sh';
    //   args = ['-c', command];
    // }

    typeof begin === 'function' && begin();

    // const spawn = childProcess.spawn(file, args, {
    //   cwd: cwd,
    //   env: Object.assign({}, process.env, env)
    // });

    const spawn = childProcess.spawn(command, {
      cwd: cwd,
      env: Object.assign({}, process.env, env),
      shell: true
    });

    spawn.stdout.on('data', data => {
      typeof stdout === 'function' && stdout(data);
    });

    spawn.stderr.on('data', data => {
      typeof stderr === 'function' && stderr(data);
    });

    spawn.on('error', err => {
      typeof error === 'function' && error(err);
    });

    spawn.on('close', code => {
      typeof close === 'function' && close(code);
    });

    return spawn;
  };
};