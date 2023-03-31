type ResponseData<T> = {
  ok: boolean;
  code_err: number;
  description: string;
  data?: T;
};

export default ResponseData;
