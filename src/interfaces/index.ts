
export interface IItem {
  id: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  src?: string
}

export interface IImageItem extends IItem {
  src: string;
}

export type TMenuOptionName = 'lion' | ''

export type TMenuOptionType = 'image' | ''

export interface IMenuOption {
  name: TMenuOptionName,
  type: TMenuOptionType,
  src?: string // if type is 'image'
}

export const defaultMenuOption: IMenuOption = {
  name: '',
  type: ''
}