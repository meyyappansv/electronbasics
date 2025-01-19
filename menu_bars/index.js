const electron = require('electron');
const { app, BrowserWindow, Menu } = electron; //This is called destructuring an object out of the electron module

let mainWindow;
let addWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: { nodeIntegration: true, contextIsolation: false },
      });

    mainWindow.loadURL(`file:${__dirname}/main.html`)
    mainWindow.on('closed', ()=> app.quit());
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
  addWindow = new BrowserWindow(
    {
        title: 'Add New ToDo',
        width: 300,
        height: 200
    }
  );
  addWindow.loadURL(`file://${__dirname}/add.html`)
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: "New Todo",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Quit",
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q' ,
        click() {
          app.quit()
        }
      }
    ]

  }
];

if (process.platform == 'darwin') {
  menuTemplate.unshift({label:""})
}

if(process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        click(item, focusedWindow) {

        }
      }
    ]
  });
}