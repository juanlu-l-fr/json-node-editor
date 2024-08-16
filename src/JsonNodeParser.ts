import * as vscode from 'vscode';
import { TextDocument } from "vscode";
export class JsonNodeParser {


    public readjsonObject(document: TextDocument | undefined): any {

        if (!document) {
            return;
        }
        const text = document.getText();
        return JSON.parse(text);
    }

    public process(document: TextDocument | undefined, callback: Function): any {
        let parsed = this.readjsonObject(document);
        const isArray = parsed instanceof Array;
        if (isArray) {
            return parsed.map(innerObject => callback(innerObject));
        } else {
            return callback(parsed);
        }
    }

    public keySplitter(key: string): string[] {
        return key.split('.');
    }

    public isLeaf(jsonObject: any): boolean {
        return !(jsonObject instanceof Array || jsonObject instanceof Object);
    }


}