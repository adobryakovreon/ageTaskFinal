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
		const CUSTOM_FIELDS = req.body.contacts.add[0].custom_fields;
		const BIRTHDAY = utils.getFieldValue(CUSTOM_FIELDS, BIRTHDAY_FIELD_ID);
		const AGE_VALUE = utils.getAge(BIRTHDAY);
		const AGE_FIELD = utils.makeField(AGE_FIELD_ID, AGE_VALUE);
		req.body = {
			id,
			"custom_fields_values": [
				AGE_FIELD,
			]
		};
		await api.updateContact(req.body);
		res.send("OK");
	});
app.listen(config.PORT, () => logger.debug("Server started on ", config.PORT));

