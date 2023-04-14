import * as yup from 'yup';

export function GetTaskValidation(isCreate: boolean): yup.ObjectSchema<any> {
  return yup.object().shape({
    dateEstimatedCompletion: yup.mixed().required('Укажите ор. дату завершения'),
    name: yup.string().required('Укажите заголовок задачи'),
    description: yup.string().notRequired(),
    status: yup.string().notRequired(),
    executor: yup.string().notRequired(),
  });
}
