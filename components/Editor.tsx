import { Tldraw, TLUiOverrides, menuItem, findMenuItem, TLUiTranslationKey} from '@tldraw/tldraw'


const myOverrides: TLUiOverrides = {
    actions(editor, actions) {
		actions['export-shape-IDs'] = {
			id: 'export-shape-IDs',
			label: 'Export Shape IDs' as unknown as TLUiTranslationKey,
			readonlyOk: true,
			kbd: '$u',
			onSelect(source: any) {
				const shapeIDs = editor.currentPageShapeIds
				const shapeIDsArray = Array.from(shapeIDs)
                
                fetch('http://localhost:5000/extract_ids', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ shapeIDsArray }),
            })             
            .then(response => response.blob())
            .then(blob => {
                // creating a new URL for the blob
				const url = window.URL.createObjectURL(blob);
				// creating a new anchor element
				const a = document.createElement('a');
				a.href = url;
				a.download = 'ids.json'; // setting the file name for download
				document.body.appendChild(a); // appending the anchor to the body
				a.click(); // triggering a click on the anchor
				window.URL.revokeObjectURL(url); // cleaning up the URL
				document.body.removeChild(a); // removing the anchor from the body
            })
            .catch((error) => {
                console.error('Error:', error);
            });
			},
		}
		return actions
	},
	menu(editor, menu, { actions }) {
		// using the findMenuItem helper
		const fileMenu = findMenuItem(menu, ['menu', 'file'])
		if (fileMenu.type === 'submenu') {
			// add the new item to the file menu's children
			const newMenuItem = menuItem(actions['export-shape-IDs'])
			fileMenu.children.unshift(newMenuItem)
		}
		return menu
	},
}

const CustomTldrawEditor = () => {
    // rendering the Editor with overrides
    return <Tldraw overrides={myOverrides} />
}

export default CustomTldrawEditor