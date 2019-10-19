'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String
    },
    displayName: {
        type: String
    },
    twitterProvider: {
        type: {
            id: String,
            token: String,
            tokenSecret: String
        },
        select: false
    }
});

UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
    const self = this;
    return this.findOne({
        'twitterProvider.id': profile.id
    }, function (err, user){
        if(!user) {
            const newUser = new self({
                username: profile['username'],
                image: profile._json.profile_image_url,
                displayName: profile['displayName'],
                twitterProvider: {
                    id: profile.id,
                    token: token,
                    tokenSecret: tokenSecret
                }
            });
            newUser.save(function(error, savedUser) {
                if (error) {
                  console.log(error);
                }
                return cb(error, savedUser);
              });
            } else {
              return cb(err, user);
            }
    });
}

export default new mongoose.model('users', UserSchema);
