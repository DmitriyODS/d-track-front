type LevelAccess = {
  id: number;
  name: string;
  access: string;
};

export function CreateEmptyLevelAccess(): LevelAccess {
  return { id: 0, name: '', access: '' };
}

export default LevelAccess;
