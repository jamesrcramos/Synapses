import { Tldraw, TLUiOverrides, menuItem, findMenuItem, TLUiTranslationKey } from '@tldraw/tldraw'


const myOverrides: TLUiOverrides = {
    actions(editor, actions) {
		// Create a new action or replace an existing one
		actions['export-shape-IDs'] = {
			id: 'export-shape-IDs',
			label: 'Export Shape IDs' as unknown as TLUiTranslationKey,
			readonlyOk: true,
			kbd: '$u',
			onSelect(source: any) {
				window.alert('My new action just happened!')
			},
		}
		return actions
	},
	contextMenu(editor, contextMenu, { actions }) {
         // creating a new menu item linked to 'export-shape-IDs' action
        const exportShapeIDsMenuItem = menuItem(actions['export-shape-IDs']);

        // adding the new menu item to the context
		contextMenu.unshift(exportShapeIDsMenuItem)
		return contextMenu
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