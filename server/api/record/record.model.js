'use strict';

import mongoose from 'mongoose';

var RecordSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    datetime: Date,
    description: String,
    amount: Number,
    comment: String
});

/**
 * Pre-save hook
 */
RecordSchema
    .pre('save', function(next) {
        if (this.error) {
            return next(new Error('Invalid records'));
        }
        //At this point, this.user holds the string value of the Object ID
    	this.user = new mongoose.Schema.ObjectId(this.user);
        next();
    });

export default mongoose.model('Record', RecordSchema);
