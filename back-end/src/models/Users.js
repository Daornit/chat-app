const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  nickName: { 
    type: String, 
    required: true,
    unique: true},
  avatar: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friends'}],
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};


UsersSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      nickName: this.nickName,
      avatar: this.avatar,
      friends: this.friends
    };
};

mongoose.model('Users', UsersSchema);
  