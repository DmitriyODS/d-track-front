import * as yup from 'yup';

export function GetCustomerValidation(isCreate: boolean): yup.ObjectSchema<any> {
  return yup.object().shape({
    fio: yup.string().required('Укажите ФИО клиента'),
    phone: yup.string().required('Укажите телефон'),
    email: yup.string().required('Укажите email'),
    address: yup.string().required('Укажите адресс'),
  });
}
