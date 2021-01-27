const { spawn } = require('child_process');
const { join } = require('path')
const { app, BrowserWindow } = require('electron');

let frontend;

function loadUI() {
	return new Promise((resolve, reject) => {
		console.log('run UI');
		frontend = spawn('npm', [ 'run', 'dev' ], {
			cwd: join(__dirname, 'installer-ui'),
		});

		frontend.stderr.on('data', () => {
			reject();
		});

		frontend.stdout.on('data', (data) => {
			console.log(data.toString());
			if (data.includes('> Local:')) {
				resolve();
			}
			return data;
		});
	})
}

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})

	win.loadURL('http://localhost:3000');
}

Promise.all([
	loadUI(),
	app.whenReady(),
]).then(createWindow);

app.on('window-all-closed', () => {
	frontend.kill();
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
