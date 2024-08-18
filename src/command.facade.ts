import { JsonNodeParser } from './JsonNodeParser';
import { EditorHandler } from './EditorHandler';
import { removeNodes } from './commands/remove.command';
import { upsertNode } from './commands/create.command';
import { selectNodes } from './commands/select.command';
import { sortNodes } from './commands/sort.command';
import * as vscode from 'vscode';

export class CommandFacade {
    private parser: JsonNodeParser

    constructor() {
        this.parser = new JsonNodeParser();
    }

    public async remove() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const editorHandler: EditorHandler = new EditorHandler(editor, 'remove');
            removeNodes(editorHandler, this.parser);
        }

    }

    public async create() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const editorHandler: EditorHandler = new EditorHandler(editor, 'create');
            upsertNode(editorHandler, this.parser);
        }

    }
    public async sort() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const editorHandler: EditorHandler = new EditorHandler(editor, undefined);
            sortNodes(editorHandler, this.parser);
        }

    }
    public async select() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const editorHandler: EditorHandler = new EditorHandler(editor, 'select');
            selectNodes(editorHandler, this.parser);
        }

    }
}

