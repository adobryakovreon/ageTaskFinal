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
const BIRTHDAY_FIELD_ID = 376795;

app.post("/create", async (req, res) => {
		const {id} = req.body.contacts.add[0].id;
		const custom_fields = req.body.contacts.add[0].custom_fields;
		const birthday = utils.getFieldValue(custom_fields, BIRTHDAY_FIELD_ID);
		const age_value = utils.getAge(birthday);
		const age_field = utils.makeField(AGE_FIELD_ID, age_value);
		req.body = {
			id,
			"custom_fields_values": [
				age_field,
			]
		};
		await api.updateContact(req.body);
		res.send("OK");
	});
app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));
