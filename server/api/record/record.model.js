'use strict';

import mongoose from 'mongoose';

var RecordSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Record', RecordSchema);
