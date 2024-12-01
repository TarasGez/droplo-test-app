export type MenuItemType = {
  label: string
  link?: string
  submenu: MenuItemType[]
}

export const FormTypes = Object.freeze({ ADD: 'add', EDIT: 'edit' })
type FormTypesKeys = keyof typeof FormTypes
export type FormType = (typeof FormTypes)[FormTypesKeys]

export const MenuTypes = Object.freeze({ MENU: 'menu', SUBMENU: 'submenu' })
type MenuTypesKeys = keyof typeof MenuTypes
export type MenuType = (typeof MenuTypes)[MenuTypesKeys]
