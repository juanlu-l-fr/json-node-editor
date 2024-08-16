import { JsonNodeParser } from '../JsonNodeParser';
import { EditorHandler } from '../EditorHandler';

export async function removeNodes(editorHandler: EditorHandler, parser: JsonNodeParser) {

    const key = await editorHandler.askForInputAsync();
    let result = parser.process(editorHandler.getDocument(), (jsonObject: any) => {
        key.split(',').map(k => k.trim())
            .forEach(k => {
                deleteNodeByPath(jsonObject, k.split("."));
            });
            return jsonObject;
    });
    editorHandler.replaceContent(result);
}


function deleteNodeByPath(obj: any, keys: string[]): void {
    let currentObj = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
            return; // Si la ruta no existe, salir
        } else if (currentObj instanceof Array) {
            currentObj.forEach(innerObject => {
                deleteNodeByPath(innerObject, keys.slice(i + 1, keys.length));
            });
        }
    }
    delete currentObj[keys[keys.length - 1]];

}
