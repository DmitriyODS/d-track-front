export type TBaseResponse<T> = {
  ok: boolean;
  code_err: number;
  description: string;
  data?: T;
};
