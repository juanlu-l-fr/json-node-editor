import { JsonNodeParser } from '../JsonNodeParser';
import { EditorHandler } from '../EditorHandler';

export async function upsertNode(editorHandler: EditorHandler, parser: JsonNodeParser) {
    const key = await editorHandler.askForInputAsync();
    const parts = key.split('=');
    if (parts.length === 2) {
        let result = parser.process(editorHandler.getDocument(), (jsonObject: any) => {
            let newValue = JSON.parse(parts[1]);
            createNodeByPath(jsonObject, parts[0].split("."), newValue);
            return jsonObject;

        });
        editorHandler.replaceContent(result);
    }
}


function createNodeByPath(obj: any, keys: string[], newValue: any): void {
    let currentObj = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!currentObj[keys[i]]) {
            currentObj[keys[i]] = {};
        }
        currentObj = currentObj[keys[i]];
        if (currentObj instanceof Array) {
            currentObj.forEach(innerObject => {
                createNodeByPath(innerObject, keys.slice(i + 1, keys.length), newValue);
            });
        }
    }
    currentObj[keys[keys.length - 1]] = newValue;

}
