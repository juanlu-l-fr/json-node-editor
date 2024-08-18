// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CommandFacade } from './command.facade';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	if (vscode.window.activeTextEditor) {
		const facade = new CommandFacade();

		const removeCmd = vscode.commands.registerCommand('json-node-editor.removeNode', () => facade.remove());
		const createCmd = vscode.commands.registerCommand('json-node-editor.upsertNode', () => facade.create());
		const sortCmd = vscode.commands.registerCommand('json-node-editor.sortKeys', () => facade.sort());
		const selectCmd = vscode.commands.registerCommand('json-node-editor.select', () => facade.select());
		context.subscriptions.push(removeCmd, createCmd, sortCmd, selectCmd);
	}

}

// This method is called when your extension is deactivated
export function deactivate() { }
