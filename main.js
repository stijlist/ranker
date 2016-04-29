'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
var tempbuffer = []

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.send('stdin', tempbuffer.join(''))
    tempbuffer = []
  })

  mainWindow.on('closed', function() {
    // Null out the window object. Usually you would store all window
    // references if your app supported multiple windows.
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
  var chunk = process.stdin.read();
  if (chunk != null) {
    if (mainWindow != null) {
      mainWindow.webContents.send('stdin', chunk)
    } else {
      tempbuffer.push(chunk)
    }
  }
});
