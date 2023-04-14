import * as yup from 'yup';

export function GetClaimValidation(isCreate: boolean): yup.ObjectSchema<any> {
  return yup.object().shape({
    subject: yup.string().required('Укажите предмет заявки'),
    description: yup.string().notRequired(),
    status: yup.string().required('Укажите статус заявки'),
    serviceType: yup.string().required('Укажите тип услуги'),
    executor: yup.string().required('Укажите исполнителя'),
    customer: yup.string().required('Укажите клиента'),
    dateEstimatedCompletion: yup.mixed().required('Укажите ор. дату завершения'),
  });
}
