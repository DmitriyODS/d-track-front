import * as yup from 'yup';

export function GetEmployeeValidation(isCreate: boolean): yup.ObjectSchema<any> {
  return yup.object().shape({
    fio: yup.string().required('Укажите ФИО'),
    login: yup.string().required('Укажите Логин'),
    password: isCreate ? yup.string().required('Укажите пароль') : yup.string(),
    phoneNumber: yup.string().required('Введите телефон'),
    emailAddress: yup.string().email('Неверный формат Email').required('Email обязателен'),
    addressOfResidence: yup.string().required('Укажите адрес'),
    position: yup.string().required('Укажите должность'),
    levelAccess: yup.string().required('Укажите уровень доступа'),
    freedomType: yup.string().required('Укажите текущее состояние'),
    dateAppointments: yup.mixed().required('Укажите дату назначения сотрудника'),
    dateOfDismissal: yup.mixed().notRequired(),
  });
}
