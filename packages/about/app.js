'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var About = new Module('About');

 // About.aggregateAsset('css','about.css', {global:true});


/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
About.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    About.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    About.menus.add({
        title: 'About',
        link: 'about',
        roles: ['authenticated'],
        menu: 'main'
    });

    // //Uncomment to use. Requires meanio@0.3.7 or above
    // // Save settings with callback
    // // Use this for saving data from administration pages
    // About.settings({
    //     'someSetting': 'some value'
    // }, function (err, settings) {
    //     //you now have the settings object
    // });

    // // Another save settings example this time with no callback
    // // This writes over the last settings.
    // About.settings({
    //     'anotherSettings': 'some value'
    // });

    // // Get settings. Retrieves latest saved settigns
    // About.settings(function(err, settings) {
    // //you now have the settings object
    // });



    return About;
});

