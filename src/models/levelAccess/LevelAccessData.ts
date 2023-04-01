interface ILevelAccessData {
  id: number;
  name: string;
  access?: string;
}

export function NewEmptyLevelAccess(): ILevelAccessData {
  return { id: 0, name: '', access: '' };
}

export default ILevelAccessData;
