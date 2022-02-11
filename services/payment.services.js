require('dotenv').config();
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const initalizePayment = async (data) => {
	return axios({
		method: 'post',
		url: `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
		data: {
			email: data.email,
			amount: parseFloat(data.amount) * 100,
			currency: 'NGN',
			ref: uuidv4(),
		},
	});
};

const verifyPayment = async (payment_ref) => {
	return axios({
		method: 'get',
		url: `${process.env.PAYSTACK_BASE_URL}/transaction/verify/${payment_ref}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
	});
};

const createPageServices = async (data) => {
	return axios({
		method: 'post',
		url: `${process.env.PAYSTACK_BASE_URL}/page`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
		data: {
			name: data.name,
			description: data.description,
			slug: data.slug,
			redirect_url: data.redirect_url,
			amount: parseFloat(data.amount) * 100,
			custom_fields: data.custom_fields,
			metadata: data.metadata,
		},
	});
};

// list page
const listPageServices = async (page, perPage) => {
	return axios({
		method: 'get',
		url: `${process.env.PAYSTACK_BASE_URL}/page?page=${page}&perPage=${perPage}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
	});
};

// fetch page

const fetchPageServices = (slug) => {
	return axios({
		method: 'get',
		url: `${process.env.PAYSTACK_BASE_URL}/page/:${slug}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
	});
};
//update page ***rosh help me with this :id_or_slug***
const updatePageServices = async (data) => {
	return axios({
		method: 'put',
		url: `${process.env.PAYSTACK_BASE_URL}/page/:${slug}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
		data: {
			name: data.name,
			description: data.description,
			amount: parseFloat(data.amount) * 100,
			active: 'false',
		},
	});
};

// slug Avalability

const CheckSlugAvailabilityServices = (slug) => {
	return axios({
		method: 'get',
		url: `${process.env.PAYSTACK_BASE_URL}/page/check_slug_availability/:${slug}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
	});
};
// test
const testServices = async (data) => {
	return 'hello world';
};

module.exports = {
	createPageServices,
	testServices,
	listPageServices,
	fetchPageServices,
	CheckSlugAvailabilityServices,
	updatePageServices,
};
