import { JsonNodeParser } from './JsonNodeParser';
import { EditorHandler } from './EditorHandler';
import { removeNodes } from './commands/remove.command';
import { upsertNode } from './commands/create.command';
import { selectNodes } from './commands/select.command';
import { sortNodes } from './commands/sort.command';
import * as vscode from 'vscode';

export class CommandFacade {
    private config: vscode.WorkspaceConfiguration
    private parser: JsonNodeParser

    constructor() {
        this.config = vscode.workspace.getConfiguration('json-node-editor.config');
        this.parser = new JsonNodeParser();
    }

    public async remove() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const editorHandler: EditorHandler = new EditorHandler(editor, this.config);
            editorHandler.operation = 'remove';
            removeNodes(editorHandler, this.parser);
        }

    }

    public async create() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const editorHandler: EditorHandler = new EditorHandler(editor, this.config);
            editorHandler.operation = 'create';
            upsertNode(editorHandler, this.parser);
        }

    }
    public async sort() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const editorHandler: EditorHandler = new EditorHandler(editor, this.config);
            sortNodes(editorHandler, this.parser);
        }

    }
    public async select() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const editorHandler: EditorHandler = new EditorHandler(editor, this.config);
            editorHandler.operation = 'select';
            selectNodes(editorHandler, this.parser);
        }

    }
}

