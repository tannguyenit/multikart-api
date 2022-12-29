const express = require('express');
const validate = require('../../middlewares/validate');
const { orderValidation } = require('../../validations');
const { orderController } = require('../../controllers/admin');

const router = express.Router();
router
  .route('/')
  .post(validate(orderValidation.createOrder), orderController.createOrder)
  .get(validate(orderValidation.getOrders), orderController.getOrders);

router
  .route(`/:orderId`)
  .get(validate(orderValidation.getOrder), orderController.getOrder)
  .put(validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(validate(orderValidation.deleteOrder), orderController.deleteOrder);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management and retrieval
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a order
 *     description: Only admins can create other orders.
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Fashion
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Brand'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
