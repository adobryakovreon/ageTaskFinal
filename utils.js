/**
 * Модуль утилитарных функций:
 *  - для обработки данных из amoCRM;
 *  - общего назначения; 
 */

const fs = require("fs");
const logger = require("./logger");

/**
 * Функция извлекает значение из id поля, массива полей custom_fields сущности amoCRM
 * 
 * @param {*} customFields - массив полей сущности;
 * @param {*} fieldId - id поля из которого нужно получить значение;
 * @returns значение поля
 */
const getFieldValue = (customFields, fieldId) => {
	const field = customFields
		? customFields.find((item) => String(item.field_id || item.id) === String(fieldId))
		: undefined;
	const value = field ? field.values[0].value : undefined;
	return value;
};

/**
 * Функция заполнения поля в amoCRM
 * @param {*} field_id - id поля, которое планируется заполнить. Поле должно быть заранее создано в amoCRM, id копируется из amo; 
 * @param {*} value - значение поля, тип данных должен быть идентичным с типом поля в amoCRM;
 * @param {*} enum_id - В случае, если поле списковое или мультисписковое, то для указания нужного значения указывается данный параметр, т.е. id - варианта списка;
 * @returns типовой объект с данными о поле, который необходимо передать в amoCRM.  
 */
const makeField = (field_id, value, enum_id) => {
	if (!value) {
		return undefined;
	}
	return {
		field_id,
		values: [
			{
				value,
				enum_id,
			},
		],
	};
};

const getAge = (birthday) => {
	if (!birthday) return undefined
	const today = new Date();
	const day = today.getDate() - birthday.getDate();
	const month = day <0 ? today.getMonth() - birthday.getMonth() -1 : today.getMonth() - birthday.getMonth();
	const year = month < 0 ? today.getFullYear() - birthday.getFullYear() -1 : today.getFullYear() - birthday.getFullYear(); 
	return year < 0 ? 0 : year;
};

module.exports = {
	getFieldValue,
	makeField,
	getAge,
};
