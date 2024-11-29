export type MenuItemType = {
  label: string
  link?: string
  submenu: MenuItemType[]
}

export const FormTypes = Object.freeze({ ADD: 'add', EDIT: 'edit' })
type FormTypesKeys = keyof typeof FormTypes
export type FormType = (typeof FormTypes)[FormTypesKeys]
