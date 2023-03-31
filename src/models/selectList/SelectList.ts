type SelectList = {
  id: number;
  value: string;
};

export function CreateEmptySelectList(): SelectList {
  return { id: 0, value: '' };
}

export default SelectList;
