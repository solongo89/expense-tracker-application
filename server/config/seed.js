/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Record from '../api/record/record.model';
import User from '../api/user/user.model';

// Record.find({}).remove()
//     .then(() => {

//     });

User.find({}).remove()
    .then(() => {
        User.create({
                provider: 'local',
                name: 'Test User',
                email: 'test@example.com',
                password: 'test'
            }, {
                provider: 'local',
                role: 'manager',
                name: 'Test Manager',
                email: 'manager@example.com',
                password: 'manager'
            }, {
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin'
            })
            .then(() => {
                console.log('finished populating users');
            });
    });
