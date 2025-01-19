const { app, BrowserWindow, ipcMain, dialog } = require('electron');
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,  // Make sure this is true for security
      nodeIntegration: false,  // Make sure nodeIntegration is false
      preload: `${__dirname}/preload.js`,  // Set path for preload script
    },
  });

  mainWindow.loadFile('index.html');

  // Listen for an event from the renderer (main window)
  ipcMain.on('message-from-renderer', (event, arg) => {
    console.log('Received from renderer:', arg);

    // Send a response back to the renderer
    event.reply('message-from-main', 'Hello from main process!');
  });

  // Example: Trigger a file dialog and send the result back
  ipcMain.handle('dialog:openFile', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
    });

    // Return the selected file path
    return result.filePaths[0];
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
