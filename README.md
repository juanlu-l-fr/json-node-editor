# Json Node Editor
This extension allows you to easily manipulate a json file, being able to add new nodes, remove, edit, etc..

## Features

### Remove nodes
Open the command palette and type for `Json Editor Nodes | Remove node`. 
Once selected it will ask for a key to delete on the json provided.
If the json is an array of object, the key will be deleted on every object.
More than one key can be selected, and nesting is applied using `.` operator, examples:
- `key1, key2, key3`.
- `key1.nested, key2`.

It will also show pre-configured keys stored in configuration. See [Settings section](#Settings)

### Select nodes
Open the command palette and type for `Json Editor Nodes |  Select only specific keys`. 
Once selected it will ask for a key to select on the json provided. Returning a json containing only the specified key and its value. Any other property is removed.
If the json is an array of object, it will return the same array with only the key filled.
More than one key can be selected, and nesting is applied using `.` operator, examples:
- `key1, key2, key3`.
- `key1.nested, key2`.

It will also show pre-configured keys stored in configuration. See [Settings section](#Settings)

### Create/Edit nodes
Open the command palette and type for `Json Editor Nodes | Create/Edit node`. 
Once selected it will ask for a key and value to either create or edit in the json provided. Only one pair can be specified.
Will either add or edit the key as specified in the input.
Examples are:
- `key="value"`
- `key={"nestedKey": "value"}`
- `key=[{"nestedKey": "value"}]`.

It will also show pre-configured keys stored in configuration. See [Settings section](#Settings)

### Sort nodes
Open the command palette and type for `Json Editor Nodes | Sort by keys`. 
This operation will order the keys on the json in alphabetic order.


## Settings

Configuration can be applied to store commonly used operations.
To edit them go to Settings > Extensions > Json Node Extension

Example configuration:
```json
"json-node-editor.config.remove": [
    {
        "name": "commonly-removed-keys",
        "value": "key1, key2.nested.object, key3"
    }
],
"json-node-editor.config.select": [
    {
        "name": "commonly-selected-keys",
        "value": "key1, key2.nested.object, key3"
    }
],
"json-node-editor.config.create": [
    {
        "name": "commonly-created-keys",
        "value": "newKey=\"value\""
    }
]
```
