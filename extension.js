const vscode = require('vscode');
const path = require('path');

// This is a copy of the web/index.html file
const getHTML = scriptUrl => {
    return `
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'self';
              script-src vscode-resource: 'self' 'unsafe-inline' 'unsafe-eval' https:;
              style-src vscode-resource: 'self' 'unsafe-inline';
              img-src vscode-resource: 'self' "/>
      <title>web</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="${scriptUrl}"></script>
    </body>
  </html>  
    `;
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let currentPanel = undefined;

    function createLottieData() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const text = editor.document.getText();
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error(e);
                vscode.window.showErrorMessage('Could not parse this lottie file.');
            }
        }
	}

    vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.document === vscode.window.activeTextEditor.document && currentPanel) {
			const data = createLottieData();
			currentPanel.webview.postMessage({type: 'update', data});
        }
	});

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.lottieView', function () {
        // console.log('command called');
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        if (currentPanel) {
            // Focus webview
            currentPanel.reveal(vscode.ViewColumn.One);
        } else {
            // Setup webview
            currentPanel = vscode.window.createWebviewPanel(
                'vscode.previewHtml',
                'Lottie Viewer',
                vscode.ViewColumn.Two,
                { enableScripts: true }
            );
            // Load app
            const scriptPath = vscode.Uri.file(path.join(context.extensionPath, 'web/dist', 'build.js'));
            const scriptUri = currentPanel.webview.asWebviewUri(scriptPath);
            currentPanel.webview.html = getHTML(scriptUri);
            currentPanel.onDidDispose(
                () => { currentPanel = undefined; },
                undefined,
                context.subscriptions
            );
        }

        const data = createLottieData();
        currentPanel.webview.postMessage({type: 'init', data});
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;