var settingsModel = require('../models/settingsModel.js');

/**
 * settingsController.js
 *
 * @description :: Server-side logic for managing settingss.
 */
module.exports = {

    /**
     * settingsController.list()
     */
    list: function (req, res) {
        settingsModel.find(function (err, settingss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting settings.',
                    error: err
                });
            }
            return res.json(settingss);
        });
    },

    /**
     * settingsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        settingsModel.findOne({id: id}, function (err, settings) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting settings.',
                    error: err
                });
            }
            if (!settings) {
                return res.status(404).json({
                    message: 'No such settings'
                });
            }
            return res.json(settings);
        });
    },

    /**
     * settingsController.create()
     */
    create: function (req, res) {
        var settings = new settingsModel({
        });

        settings.save(function (err, settings) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating settings',
                    error: err
                });
            }
            return res.status(201).json(settings);
        });
    },

    /**
     * settingsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        settingsModel.findOne({id: id}, function (err, settings) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting settings',
                    error: err
                });
            }
            if (!settings) {
                return res.status(404).json({
                    message: 'No such settings'
                });
            }

			settings.webName = req.body.webName ? req.body.webName : settings.webName;
            settings.save(function (err, settings) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating settings.',
                        error: err
                    });
                }

                return res.json(settings);
            });
        });
    },

    /**
     * settingsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        settingsModel.findByIdAndRemove(id, function (err, settings) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the settings.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};