import { JsonNodeParser } from '../JsonNodeParser';
import { EditorHandler } from '../EditorHandler';

export async function unwrapNodes(editorHandler: EditorHandler, parser: JsonNodeParser) {
    const key = await editorHandler.askForInputAsync();
    let result = parser.process(editorHandler.getDocument(), (jsonObject: any) => {
        return unwrapKeys(jsonObject, parser.splitKey(key))
    });
    editorHandler.replaceContent(result);
}

function unwrapKeys(obj: any, keys: string[]): any {
    let currentObj = obj;
    let result: any = {};
    console.log('currentObj', currentObj, ' all keys ', keys);

    for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
            return; // Si la ruta no existe, salir
        }
        if (currentObj instanceof Array) {
            result = []
            for (let j = 0; j < currentObj.length; j++) {
                const innerObject = currentObj[j];
                let innerSelected = unwrapKeys(innerObject, keys.slice(i + 1, keys.length));
                result.push(innerSelected);
            }
            break;
        }
    }
    if (!(currentObj instanceof Array)) {
        result = currentObj[keys[keys.length - 1]]
    }
    return result;
    // selected = currentObj[keys[keys.length - 1]]

    // if (!(currentObj instanceof Array)) {

    //     currentSelected = currentObj[keys[keys.length - 1]];
    // }

}
