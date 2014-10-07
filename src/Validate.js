"use strict";

/*
 * Multipurpose validator
 *
 * Usage:
 * var Validate = require('./Validate');
 * Validate($('element').get('value'), 'not-empty')
 * Validate($('element').get('value'), ['alphanumeric', 'no-space']);
 */

module.exports = function (data, validtype) {
	var err = 0;

	if (typeOf(validtype) === 'array') {
		validtype.each(function (type) {
			if (!checkRegex(data, type)) err++;
		});
	} else if (typeOf(validtype) === 'string') {
		if (!checkRegex(data, validtype)) err++;
	} else {
		console.log('Validation type not found: ' + validtype);
		return false;
	}

	return (err < 1);
};

function checkRegex(data, type) {
	var types = {
		'url'          : '^((ht|f)tp(s?)\:\/\/)?[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-‌​\.\?\,\'\/\\\+&amp;%\$#_=]*)?$', // Accepts valid urls
		'email'        : '^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$', // Accepts valid email addresses
		'string'       : '^([a-zA-Z ]+)$', // Accepts strings of letters and spaces
		'alphanumeric' : '^([a-zA-Z0-9]+)$', // Accepts alphanumeric strings
		'username'     : '^([a-zA-Z0-9\-_]+)$', // Accepts usernames of letters, numbers, - and _
		'no-space'     : '^([^ \t\r\n]+)$', // Accepts no spaces
		'password'     : '^.*(?=.{6,255})(?=.*[0-9])(?=.*[a-zA-Z]).*$', // Accepts string of minimal 6 characters, containing letters and numbers
		'not-empty'    : '^.+$', // Accepts non-empty strings
		'date-yyyymmdd': '((19[7-9][0-9])|(20[0-1][0-9]))[/-]?(0([0-9])|1([0-2]))[/-]?((0[1-9])|((1|2)[0-9])|(3(0|1)))', // Accepts date in format YYYY/MM/DD, YYYY-MM-DD and YYYYMMDD
		'date-ddmmyyyy': '((0[1-9])|((1|2)[0-9])|(3(0|1)))[/-]?(0([0-9])|1([0-2]))[/-]?((19[7-9][0-9])|(20[0-1][0-9]))', // Accepts date in format DD/MM/YYYY, DD-MM-YYYY and DDMMYYYY
		'ip'           : '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$' // Accepts IPv4 addresses
	};

	if (types[type]) {
		var regex = new RegExp(types[type]);
		if (!data.match(regex) || data.match(regex).length < 1) {
			return false;
		}
	} else {
		console.log('Validation type not found: ' + type);
		return false;
	}

	return true;
}