'use strict';

// The Package is past automatically as first parameter
module.exports = function(About, app, auth, database) {

    app.get('/about/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/about/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/about/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/about/example/render', function(req, res, next) {
        About.render('index', {
            package: 'about'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
