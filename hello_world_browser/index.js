const electron = require('electron');
const { app } = electron;
app.on('ready', () => {
   const mainWindow = new electron.BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false },
   });
   mainWindow.loadURL(`file:${__dirname}/index.html`);
}
);
