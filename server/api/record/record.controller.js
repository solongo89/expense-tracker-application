/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/records              ->  index
 * POST    /api/records              ->  create
 * GET     /api/records/:id          ->  show
 * PUT     /api/records/:id          ->  update
 * DELETE  /api/records/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import Record from './record.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Records
export function index(req, res) {
    var query = Record.find();
    if (req.user.role !== 'admin') {
        query.where('user', req.user._id)
    }
    return query.populate('user', '_id email name role')
        .sort({ datetime: -1 }).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a list of Records
export function stats(req, res) {
    Record.aggregate([{
        $match: {
            user: new mongoose.Types.ObjectId(req.user._id)
        }
    }, {
        $group: {
            _id: { month: { $month: "$datetime" }, week: { $week: "$datetime" }, year: { $year: "$datetime" } },
            totalAmount: { $sum: "$amount" },
            averageAmount: { $sum: { $divide: ["$amount", 7] } },
            count: { $sum: 1 }
        }
    }], function(err, result) {
        if (err) {
            console.error(err);
            res.send(501);
        } else {
            res.json(result);
        }
    });
}

// Gets a single Record from the DB
export function show(req, res) {
    return Record.findById(req.params.id).populate('user', '_id email name role').exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Record in the DB
export function create(req, res) {
    return Record.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Record in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Record.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Record from the DB
export function destroy(req, res) {
    return Record.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
