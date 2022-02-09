require('dotenv').config();
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

// create page
const createPage = async (data) => {
	return axios({
		method: 'post',
		url: `${process.env.PAYSTACK_BASE_URL}/page`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
		data: {
			name: 'bills_payment',
			description: 'payment inventory',
			slug: 'bills_payments',
			redirect_url: 'https://www.zulfahgroup.com/',
			amount: parseFloat(data.amount) * 100,
		},
	});
};

// list page
const listPage = async (page, perPage, from, to) => {
	return axios({
		method: 'get',
		url: `${process.env.PAYSTACK_BASE_URL}/page`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
	});
};

// fetch page

const fetchPage = (page_identifier) => {
	return axios({
		method: 'get',
		url: `${process.env.PAYSTACK_BASE_URL}/payment_page/fetchPage/${page_identifier}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
	});
};
// slug Avalability

const CheckSlugAvailability = (id_or_slug) => {
	return axios({
		method: 'get',
		url: `${process.env.PAYSTACK_BASE_URL}/payment_page/fetchPage/${id_or_slug}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
	});
};
// test
const test = async (data) => {
	return 'hello world';
};

module.exports = {
	createPage,
	test,
	listPage,
	fetchPage,
};
