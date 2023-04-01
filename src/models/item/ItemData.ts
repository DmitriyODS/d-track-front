interface IItemData {
  id: number;
  value: string;
}

export function NewEmptyItemData(): IItemData {
  return { id: 0, value: '' };
}

export default IItemData;
