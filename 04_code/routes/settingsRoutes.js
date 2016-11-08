var express = require('express');
var router = express.Router();
var settingsController = require('../controllers/settingsController.js');

/*
 * GET
 */
router.get('/', settingsController.list);

/*
 * GET
 */
router.get('/:id', settingsController.show);

/*
 * POST
 */
router.post('/', settingsController.create);

/*
 * PUT
 */
router.put('/:id', settingsController.update);

/*
 * DELETE
 */
router.delete('/:id', settingsController.remove);

module.exports = router;
