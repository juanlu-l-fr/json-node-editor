import { TextDocument, TextEditor } from "vscode";
import * as vscode from 'vscode';

export class EditorHandler {

    private editor: TextEditor;
    private document: TextDocument;
    public operation: string;
    private config: vscode.WorkspaceConfiguration;

    constructor(editor: TextEditor, config: vscode.WorkspaceConfiguration) {

        this.editor = editor;
        this.document = editor?.document;
        this.operation = '';
        this.config = config;
    }

    public replaceContent(newContent: any): void {
        const fullRange = new vscode.Range(
            this.document.positionAt(0),
            this.document.positionAt(this.document.getText().length)
        );
        const prettyStringify = JSON.stringify(newContent, null, 2);
        this.editor.edit(builder => builder.replace(fullRange, prettyStringify));
    }

    public async askForInput(): Promise<string | number | symbol> {
        const keyInput = await this.askForInputAsync();

        const key = keyInput as keyof any;
        return key;
    }

    public async askForInputAsync(): Promise<string> {
        return await new Promise<string>((resolve, reject) => {
            let result = "";
            let quickPick = vscode.window.createQuickPick();
            quickPick.ignoreFocusOut = true;
            let items = this.getConfig().map(val => ({ label: val.name, description: val.value }));
            quickPick.items = items;
            quickPick.onDidChangeValue(value => {
                items.push({ label: value, description: value });
                quickPick.items = items;
            });
            quickPick.onDidChangeSelection((items) => {
                if (items.length > 0) {
                    result = items[0].description ?? '';
                    resolve(result);
                    quickPick.hide();
                }
            });
            quickPick.show();
        });
    }

    public getConfig(): any[] {
        const result: any[] | undefined = this.config.get(this.operation);
        return result ?? [];
    }


    // const result = await vscode.window.showQuickPick(["value1", "value2"], {

    // });
    // showInputBox({
    //     value: "",
    //     placeHolder: "",
    //     ignoreFocusOut: true
    // });
    // if (!result) {
    //     return '';
    // }
    // return result ?? '';

    public getDocument(): TextDocument {
        return this.document;
    }
    public getText(): string {
        return this.document.getText();
    }

}