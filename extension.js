const vscode = require('vscode');

// Get the value of the 'duplicateLineHighlightColor' configuration option
let highlightColor = vscode.workspace.getConfiguration().get('duplicateLineHighlightColor');

let toggle = true;
let decorationType;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let decorateDuplicateLines = vscode.commands.registerCommand('duplicateLineHighlighter.decorateDuplicateLines', () => {
		if (toggle) {
			// Use the value of 'duplicateLineHighlightColor' as the background color for the decoration type
			decorationType = vscode.window.createTextEditorDecorationType({
				backgroundColor: highlightColor,
			});
			decorate(vscode.window.activeTextEditor, decorationType);
			toggle = !toggle;
		} else {
			decorationType.dispose();
			toggle = !toggle;
		}
	});

	// Add the command to the context
	context.subscriptions.push(decorateDuplicateLines);
}

function decorate(editor, decorationType) {

	let sourceCode = editor.document.getText();
	let decorationsArray = [];

	// Split source code into an array of lines
	const sourceCodeLines = sourceCode.split("\n");

	// Create a Map to store duplicate lines and their counts
	let duplicateLines = new Map();

	// Trim each line in sourceCodeLines
	sourceCodeLines.forEach((line, index) => {
		sourceCodeLines[index] = line.trim();
	});

	// Iterate through the source code lines
	for (let index = 0; index < sourceCodeLines.length; index++) {
		const trimmedLine = sourceCodeLines[index].trim();
		// Trim the current line

		// Ignore lines that don't contain alphanumeric characters
		if (!trimmedLine.match(/[a-z0-9]/i)) {
			continue;
		}

		// Check if the current line exists in the sourceCodeLines array more than once
		if (sourceCodeLines.indexOf(trimmedLine) !== index || sourceCodeLines.lastIndexOf(trimmedLine) !== index) {
			// Update the count for the current line in the duplicateLines Map
			if (duplicateLines.has(trimmedLine)) {
				duplicateLines.set(trimmedLine, duplicateLines.get(trimmedLine) + 1);
			} else {
				duplicateLines.set(trimmedLine, 1);
			}

			// Add a decoration for the current line
			const startPos = new vscode.Position(index, 0);
			const endPos = new vscode.
				Position(index + 1, 0);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			decorationsArray.push(decoration);
		}
	}

	// Iterate through the duplicateLines Map
	for (let index = 0; index < sourceCodeLines.length; index++) {
		const trimmedLine = sourceCodeLines[index].trim();
		if (!duplicateLines.get(trimmedLine) || duplicateLines.get(trimmedLine) === 0) {
			continue;
		}
		// Set the hover message for the current line to show the duplicate count
		const hoverStartPos = new vscode.Position(index, 0);
		const hoverEndPos = new vscode.Position(index + 1, 0);
		const hoverDecoration = {
			range: new vscode.Range(hoverStartPos, hoverEndPos),
			hoverMessage: `Duplicate line count: ${duplicateLines.get(trimmedLine)}`
		};
		decorationsArray.push(hoverDecoration);
	}

	// Set the decorations for the editor
	editor.setDecorations(decorationType, decorationsArray)
}

module.exports = {
	activate
}