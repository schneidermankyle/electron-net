const electron = require("electron");
const path = require ("path");
const url = require ("url");
const os = require ("os");

const { app, BrowserWindow} = electron;

var apiProcess = null;
let mainWindow;

function createWindow() {
  // Creat a new window with width = 800px, height = 600px
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // Point the new window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../view/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Go ahead and register the closed event to destroying main window
  // This is because if we should hit a snag, we don't want to leave artifacts in memory
  mainWindow.on('closed', _ => {
    mainWindow = null;
  });
};

// One of the first things we do is call our C# asp.net service
function startApi() {
  // Bring in child_process https://nodejs.org/api/child_process.html
  var proc = require('child_process').spawn;

  // Create our process path based on system
  var apipath = (os.platform() == "darwin") ? path.join(__dirname, "..//..//api//bin//dist//osx//Api") : path.join(__dirname,"..\\..\\api\\bin\\dist\\win\\api.exe");

  // And call the process
  apiProcess = proc(apipath);

  // Log output of app to console.
  apiProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    if (mainWindow == null) {
      createWindow();
    }
  })
};

// This is our main entry point. calling NPM start will open this scripts
// and when the app is ready, will call startApi()
app.on("ready", startApi);

// If we detect an exit condition, kill the child process and log to console.
process.on('exit', _ => {
  console.log("exit");
  apiProcess.kill();
})

// If we exit in a less than clean way, properly quit
app.on('windows-all-closed', _ => {
  if (process.platform != 'darwin'){
    app.quit();
  }
});


app.on('activate', _ => {
  if (mainWindow == null) {
    createWindow();
  }
});
