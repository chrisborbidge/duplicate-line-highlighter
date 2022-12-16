# Duplicate Line Highlighter

This is a Visual Studio Code (VS Code) extension that highlights duplicate lines in a source code file when it is saved. 

## How it works

This code is a Visual Studio Code (VS Code) extension written in JavaScript that highlights duplicate lines in a text file and displays a hover message with the count of duplicate lines.

The extension is activated when the command to execute it is called, and it listens for a willSaveTextDocument event on the vscode.workspace object. When this event is emitted, the extension retrieves the currently open text editor and passes it to the decorate function.

The decorate function does the following:

1. It retrieves the text from the editor's document and splits it into an array of lines.
2. It creates a Map to store duplicate lines and their counts.
3. It iterates through the lines of the text and checks if any of them are duplicates. If a line is a duplicate, it updates the count for that line in the Map and adds a decoration (highlight) for that line in the editor. It also adds a hover message for that line that displays the count of duplicate lines.
4. Finally, it sets the decorations for the editor using the setDecorations method on the editor object.

The decorations added by the extension are defined by the decorationType constant, which is created using the createTextEditorDecorationType method on the vscode.window object. This method takes an object that defines the appearance of the decoration (in this case, a background color of rgba(255, 0, 0, 0.5)).

# Building .vsix file

To build the .vsix file:

1. Install the vsce package globally using `npm install -g vsce`
2. Run `vsce package`

# Installing the extension

To install the extension, right-click on the generated .vsix file and select "Install Extension".
