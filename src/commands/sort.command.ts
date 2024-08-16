import { JsonNodeParser } from '../JsonNodeParser';
import { EditorHandler } from '../EditorHandler';

export async function sortNodes(editorHandler: EditorHandler, parser: JsonNodeParser) {
    let result = parser.process(editorHandler.getDocument(), (jsonObject: any) => {

        return sortObjectKeys(jsonObject);
    });

    editorHandler.replaceContent(result);
}


function sortObjectKeys(obj: any): any {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj: any = {};

    sortedKeys.forEach(key => {
        sortedObj[key] = (obj as any)[key];
    });

    return sortedObj;
}
