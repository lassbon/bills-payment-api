const express = require('express');
const router = express.Router();
const paymentPaystackController = require('../controllers/paymentPaystack.controllers');

router.post('/paymentPaystack/page', paymentPaystackController.createPage);
router.get('/paymentPaystack/page', paymentPaystackController.listPage);
router.get('/paymentPaystack/page/:id', paymentPaystackController.fetchPage);
router.get(
	'/paymentPaystack/page/check_slug_availability/:slug',
	paymentPaystackController.CheckSlugAvailability
);
router.put('/paymentPaystack/page/:slug', paymentPaystackController.updatePage);
router.get('/paymentPaystack/test', paymentPaystackController.test);

module.exports = router;
