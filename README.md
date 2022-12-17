# Duplicate Line Highlighter

This code is a Visual Studio Code (VS Code) extension written in JavaScript that highlights duplicate lines in a text file and displays a hover message with the count of duplicate lines.

## How it works

This code is a Visual Studio Code extension that highlights and counts duplicate lines in a source code file. When activated, the extension will first get the value of the duplicateLineHighlightColor configuration option, which specifies the color to use for highlighting duplicate lines.

The extension registers a command, duplicateLineHighlighter.decorateDuplicateLines, which toggles the highlighting of duplicate lines on and off. When the command is run, the extension will:

1. Split the source code of the active editor into an array of lines
2. Trim each line
3. Ignore lines that do not contain alphanumeric characters
4. Check if a line exists in the array more than once. If it does, add a decoration for that line using the decorationType created earlier with the duplicateLineHighlightColor as the background color
5. Set the hover message for each line to show the number of times the line appears in the source code

When the command is run again, the extension disposes of the decorationType, effectively removing the highlighting and hover messages from the source code.

## How to use

1. Open a text file in VS Code
2. Press Command+U (Mac) or Ctrl+U (Windows) to highlight duplicate lines

## Building .vsix file

To build the .vsix file:

1. Install the vsce package globally using `npm install -g vsce`
2. Run `vsce package`

## Installing the extension

To install the extension, right-click on the generated .vsix file and select "Install Extension".
