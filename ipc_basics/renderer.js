// Example: Send a message to the main process
document.getElementById('sendMessage').addEventListener('click', () => {
    window.api.sendMessageToMain('Hello from renderer!');
  });
  
  // Example: Receive message from main process
  window.api.onMessageFromMain((message) => {
    console.log('Received from main process:', message);
    document.getElementById('response').textContent = message;
  });
  
  // Example: Open file dialog and display the selected file path
  document.getElementById('openFile').addEventListener('click', async () => {
    const filePath = await window.api.openFileDialog();
    console.log('File selected:', filePath);
    document.getElementById('filePath').textContent = filePath || 'No file selected';
  });
  