// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { remove, create, sort, select } from './command.facade';
import { EditorHandler } from './EditorHandler';



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	if (vscode.window.activeTextEditor) {
		const config = vscode.workspace.getConfiguration('json-node-editor.config');
		const editorHandler: EditorHandler = new EditorHandler(vscode.window.activeTextEditor, config);
		const removeCmd = vscode.commands.registerCommand('json-node-editor.removeNode', () => remove(editorHandler));
		const createCmd = vscode.commands.registerCommand('json-node-editor.upsertNode', () => create(editorHandler));
		const sortCmd = vscode.commands.registerCommand('json-node-editor.sortKeys', () => sort(editorHandler));
		const selectCmd = vscode.commands.registerCommand('json-node-editor.select', () => select(editorHandler));
		context.subscriptions.push(removeCmd, createCmd, sortCmd, selectCmd);
	}

}

// This method is called when your extension is deactivated
export function deactivate() { }
