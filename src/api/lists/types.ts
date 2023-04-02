import IItemData from '../../models/item/ItemData';

export type TFilters = {};

export type TListResponse = {
  id: number;
  value: string;
};

export type TListLevelAccessResponse = {
  id: number;
  name: string;
  access: string;
};

export function MakeDataFromResponse(r: TListResponse): IItemData {
  return {
    id: r.id,
    value: r.value,
  };
}

export function MakeDataFromLAResponse(r: TListLevelAccessResponse): IItemData {
  return {
    id: r.id,
    value: r.name,
  };
}
