const express = require('express');

const router = express.Router();

/**
 * @api {get} / Health checking
 * @apiGroup API
 * @apiName HealthCheck
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} CURL Example:
 *    curl -i http://worker:3000/
 *
 * @apiSuccess {String} status  always answer "OK"
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK"
 *    }
 */
router.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

// Authorization Token
if (process.env.NODE_ENV !== 'test') {
  if (!process.env.AUTH_TOKEN) {
    logger.error('require env: AUTH_TOKEN');
    process.exit(9);
  }

  router.use((req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(/\s+/)[1];
      if (token === process.env.AUTH_TOKEN) {
        return next();
      }
    }

    return res.status(401).json({ message: 'unauthorized' });
  });
}

/**
 * @api {get} /status Status of worker
 * @apiGroup API
 * @apiName Status
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization Authorization Value
 * @apiExample {curl} CURL Example:
 *    curl -i \
 *      -H 'Authorization: Bearer xxxxxxxx' \
 *      http://worker:3000/status
 *
 * @apiSuccess {String} status  status of worker, e.g. available, accepted, wait_for_worker, finished...
 * @apiSuccessExample Success-available
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "available"
 *    }
 * @apiSuccessExample Success-transfering
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "wait_for_worker"
 *    }
 *
 */
router.get('/status', (req, res) => {
  const result = {
    status: req.app.get('status'),
  };

  return res.json(result);
});

/**
 * @api {post} /order Accept work order
 * @apiGroup API
 * @apiName Order
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization Authorization Value
 * @apiExample {curl} CURL Example:
 *    curl -i -X POST \
 *      -H 'Content-type: application/json' \
 *      -H 'Authorization: Bearer xxxxxxxx' \
 *      -d '{
 *        "order_id": "123456",
 *        "message": "ABCD",
 *        "amount": "123.45",
 *      }' \
 *      http://worker:3000/order
 *
 * @apiParam {String} order_id        Order ID
 * @apiParam {String} message         Message
 * @apiParam {String} amount          Amount of the order, e.g. '123.45'
 *
 * @apiSuccess {String} status        status of worker, e.g. available, accepted, wait:...
 * @apiSuccess {String} message       message for displaying to user
 * @apiSuccessExample Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "accepted",
 *      "message": "order 123456 accepted"
 *    }
 *
 * @apiError {String} error  Error message
 * @apiErrorExample Invalid input
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "invalid input (order_id=undefined)"
 *    }
 *
 */
router.post('/order', (req, res) => {
  return res.json({
    status: 'accepted',
    message: 'order 123456 accepted',
  });
});

module.exports = router;
