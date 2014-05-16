'use strict';

var mongoose = require('mongoose'),
    Company = mongoose.model('Company');

exports.create = function (req, res) {
    var user_name = req.user.username;
    var user_id = req.user._id
    var company_name = req.company_name;

    if (!user_name) {
        res.redirect('#!/login');
    }

    if (!hasCompany(user_name, company_name)) {
        //var company = new Company(req.body);
        var company = new Company({"name": "mogujie", "description": "啥", "logo_url": "http://www.mogujie.com", "user_name": user_name, "user_id": user_id})
        company.provider = 'local';

        company.save(function (err, result) {
            if (err) {
                switch (err.code) {
                    case 11000:
                    case 11001:
                        res.status(400).send('Username already taken');
                        break;
                    default:
                        res.status(400).send('Please fill all the required fields');
                }

                return res.status(400);
            }
            res.jsonp(result || null);
        });

    } else {
        //你已经申请过
        var result = new Array();
        result['fail'] = '已经生产过!';
        res.jsonp(result || null);
    }
}

var hasCompany = function (user_name, company_name) {
        Company.findOne({'user_name': user_name, "name": company_name})
            .exec( function (err, result) {
                if (err) {

                } else {
                    return (result && result.name == company_name);
                }
            });
}