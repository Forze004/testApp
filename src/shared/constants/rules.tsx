const lastname = { 
    required: 'Фамилия обязателена к заполнению',
    minLength: { value: 1, message: 'Фамилия слишком короткая' },
    pattern: {
        value: /^[a-zA-Zа-яА-ЯёЁ_]+$/,
        message: 'Только буквы (латинские или русские) и подчёркивания, без цифр',
    },
} 

const name = { 
    required: 'Имя обязателено к заполнению',
    minLength: { value: 1, message: 'Имя слишком короткое' },
    pattern: {
        value: /^[a-zA-Zа-яА-ЯёЁ_]+$/,
        message: 'Только буквы (латинские или русские) и подчёркивания, без цифр',
    },
} 

const vy = { 
    required: 'ВУ обязателено к заполнению',
    minLength: { value: 9, message: 'ВУ минимальное кол-во цифр 9' },
    maxLength: { value: 9, message: 'ВУ максимальное кол-во цифр 9' },
    pattern: {
        value: /^[0-9]+$/,
        message: 'Только цифры',
    },
}

const issueDate = { 
    required: 'Дата выдачи обязателено к заполнению',
    minLength: { value: 10, message: 'не корректная дата' },
    maxLength: { value: 10, message: 'не корректная дата' },
}

const citizenship = { 
    required: 'Дата рождения обязателено к заполнению',
} 

const birthday = { 
    required: 'Дата рождения обязателено к заполнению',
} 

export const rules = { lastname, name, birthday, vy, issueDate, citizenship }
