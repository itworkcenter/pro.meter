var articleModel = require('../models/articleModel.js');

/**
 * articleController.js
 *
 * @description :: Server-side logic for managing articles.
 */
module.exports = {

    /**
     * articleController.list()
     */
    list: function (req, res) {
        articleModel.find(function (err, articles) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting article.',
                    error: err
                });
            }
            return res.json(articles);
        });
    },

    /**
     * articleController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        articleModel.findOne({_id: id}, function (err, article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting article.',
                    error: err
                });
            }
            if (!article) {
                return res.status(404).json({
                    message: 'No such article'
                });
            }
            return res.json(article);
        });
    },

    /**
     * articleController.create()
     */
    create: function (req, res) {
        var article = new articleModel({			title : req.body.title,			auther : req.body.auther,			content : req.body.content,			type : req.body.type,			create_time : req.body.create_time,			update_time : req.body.update_time,			create_time : req.body.create_time
        });

        article.save(function (err, article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating article',
                    error: err
                });
            }
            return res.status(201).json(article);
        });
    },

    /**
     * articleController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        articleModel.findOne({_id: id}, function (err, article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting article',
                    error: err
                });
            }
            if (!article) {
                return res.status(404).json({
                    message: 'No such article'
                });
            }

            article.title = req.body.title ? req.body.title : article.title;			article.auther = req.body.auther ? req.body.auther : article.auther;			article.content = req.body.content ? req.body.content : article.content;			article.type = req.body.type ? req.body.type : article.type;			article.create_time = req.body.create_time ? req.body.create_time : article.create_time;			article.update_time = req.body.update_time ? req.body.update_time : article.update_time;			article.create_time = req.body.create_time ? req.body.create_time : article.create_time;
            article.save(function (err, article) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating article.',
                        error: err
                    });
                }

                return res.json(article);
            });
        });
    },

    /**
     * articleController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        articleModel.findByIdAndRemove(id, function (err, article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the article.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
