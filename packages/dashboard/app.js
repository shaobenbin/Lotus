'use strict';


var Module = require('meanio').Module;

/**
 * 包名
 */
var Dashboard = new Module('Dashboard');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Dashboard.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Dashboard.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Dashboard.menus.add({
        title: 'dashboard',
        link: 'dashboard example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    /*
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Dashboard.settings({
     'someSetting': 'some value'
     }, function(err, settings) {
     //you now have the settings object
     });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Dashboard.settings({
     'anotherSettings': 'some value'
     });

     // Get settings. Retrieves latest saved settigns
     Dashboard.settings(function(err, settings) {
     //you now have the settings object
     });
     */

    return Dashboard;
});
