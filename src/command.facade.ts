import { JsonNodeParser } from './JsonNodeParser';
import { EditorHandler } from './EditorHandler';
import { removeNodes } from './commands/remove.command';
import { upsertNode } from './commands/create.command';
import { selectNodes } from './commands/select.command';
import { sortNodes } from './commands/sort.command';


export async function remove(editorHandler: EditorHandler) {
    const parser = new JsonNodeParser();
    editorHandler.operation = 'remove';
    removeNodes(editorHandler, parser);
}

export async function create(editorHandler: EditorHandler) {
    const parser = new JsonNodeParser();
    editorHandler.operation = 'create';
    upsertNode(editorHandler, parser);
}
export async function sort(editorHandler: EditorHandler) {
    const parser = new JsonNodeParser();
    sortNodes(editorHandler, parser);
}
export async function select(editorHandler: EditorHandler) {
    const parser = new JsonNodeParser();
    editorHandler.operation = 'select';
    selectNodes(editorHandler, parser);
}

