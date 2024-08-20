import { JsonNodeParser } from '../JsonNodeParser';
import { EditorHandler } from '../EditorHandler';

export async function selectNodes(editorHandler: EditorHandler, parser: JsonNodeParser) {
    const key = await editorHandler.askForInputAsync();
    let result = parser.process(editorHandler.getDocument(), (jsonObject: any) => {
        let innerSelected = {};
        key.split(',').map(k => k.trim())
            .forEach(k => {
                keepKeys(jsonObject, parser.splitKey(k), innerSelected);
            });
        return innerSelected;
    });
    editorHandler.replaceContent(result);
}


function keepKeys(obj: any, keys: string[], selected: any): void {
    let currentObj = obj;
    let currentSelected = selected;

    for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
            return; // Si la ruta no existe, salir
        } else if (!currentSelected[keys[i]]) {
            currentSelected[keys[i]] = (currentObj instanceof Array) ? [] : {};
        }
        currentSelected = currentSelected[keys[i]];
        if (currentObj instanceof Array) {
            for (let j = 0; j < currentObj.length; j++) {
                currentObj.forEach(innerObject => {
                let innerSelected = {};
                keepKeys(innerObject, keys.slice(i + 1, keys.length), innerSelected);
                currentSelected.push(innerSelected);
                });
            }

        }
    }
    if (!(currentSelected instanceof Array)) {

        currentSelected[keys[keys.length - 1]] = currentObj[keys[keys.length - 1]];
    }

}
