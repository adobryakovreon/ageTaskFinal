/**
 * Основной модуль приложения - точка входа. 
 */

const express = require("express");
const api = require("./api");
const logger = require("./logger");
const config = require("./config");
const utils = require("./utils");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AGE_FIELD_ID = 400839;
const BIRTHDAY_FIELD_ID = 438899;

app.post("/create", async (req, res) => {
		const [{id}] = req.body.contacts.add;
		const [{custom_fields}] = req.body.contacts.add;
		const birthday = new Date(utils.getFieldValue(custom_fields, BIRTHDAY_FIELD_ID));
		const ageValue = utils.getAge(birthday);
		const ageField = utils.makeField(AGE_FIELD_ID, ageValue);
		const updatedContact = {
			id,
			"custom_fields_values": [
				ageField,
			]
		};
		await api.updateContact(updatedContact);
		res.send("OK");
	});
app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
