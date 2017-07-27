var mongoose = require('mongoose'),
	crypto = require('crypto'),

	Schema = mongoose.Schema,

	User = new Schema({
		username: {
			type: String,
			unique: true,
			required: true
		},
		hashedPassword: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			required: true
		},
		created: {
			type: Date,
			default: Date.now
		}
	});
User.set('toJSON', { getters: true,virtuals: true });
//User.set('toObject', { virtuals: true })
// Execute before each user.save() call
User.pre('save', function(callback) {
  var user = this;
  console.log('pre model')
  // Break out if the password hasn't changed
  if (!user.isModified('hashedPassword')) return callback();

  // Password changed so we need to hash it
  this.salt = crypto.randomBytes(32).toString('hex');
  //more secure - this.salt = crypto.randomBytes(128).toString('hex');
  this.hashedPassword = this.encryptPassword(user.hashedPassword);
  callback();
});

User.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('hex');
};

User.virtual('userId')
.get(function () {
	return this.id;
});

User.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = crypto.randomBytes(32).toString('hex');
		        //more secure - this.salt = crypto.randomBytes(128).toString('hex');
		        this.hashedPassword = this.encryptPassword(password);
		    })
	.get(function() { return this._plainPassword; });


User.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', User);
