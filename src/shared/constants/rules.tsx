export const getRules = (t:any) => ({
  lastname: {
    required: t('lastnameRulesRequired'),
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ_]+$/,
      message: t('lastnameRulesPattern'),
    },
  },
  name: {
    required: t('nameRulesRequired'),
    pattern: {
      value: /^[a-zA-Zа-яА-ЯёЁ_]+$/,
      message: t('lastnameRulesPattern'),
    },
  },
  vy: {
    required: t('vuRulesRequired'),
    minLength: { value: 9, message: t('vuMinLength') },
    maxLength: { value: 9, message: t('vuMaxLength') },
    pattern: {
      value: /^[0-9]+$/,
      message: t('Только цифры'),
    },
  },
  issueDate: {
    required: t('issueDateRequired'),
    minLength: { value: 10, message: t('issueDateIsNotCorrect') },
    maxLength: { value: 10, message: t('issueDateIsNotCorrect') },
  },
  citizenship: {
    required: t('citizenshipRequired'),
  },
  birthday: {
    required: t('birthdayRequired'),
  },
});
