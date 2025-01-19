const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Send message to main process
  sendMessageToMain: (message) => ipcRenderer.send('message-from-renderer', message),

  // Receive message from main process
  onMessageFromMain: (callback) => ipcRenderer.on('message-from-main', (event, response) => callback(response)),

  // Open file dialog and get the selected file path
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
});
    