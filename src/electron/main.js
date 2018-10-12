const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  // dialog
} = require('electron');
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const projectsFile = path.join(cwd, 'data.json');
let DATA = {};

// 读取data
if (fs.existsSync(projectsFile)) {
  DATA = JSON.parse(fs.readFileSync(projectsFile, {
    encoding: 'utf8'
  }));
}

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win;

const createWindow = () => {
  // 隐藏菜单
  Menu.setApplicationMenu(null);

  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 450,
    height: 600,
    // frame: false
  });

  // 然后加载应用的 index.html。
  win.loadFile(path.join(__dirname, 'home/home.html'));

  // 打开开发者工具。
  win.webContents.openDevTools();

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null;
  });
};

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow();
  }
});

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。

ipcMain.on('getData', (event, arg) => {
  const res = {};
  arg.forEach(attr => {
    res[attr] = DATA[arg];
  });
  event.returnValue = res;
});

ipcMain.on('setData', (event, arg) => {
  Object.assign(DATA, arg);
  fs.writeFileSync(projectsFile, JSON.stringify(DATA), {
    encoding: 'utf8'
  });
  event.returnValue = true;
});