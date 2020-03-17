const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Friends = mongoose.model('Friends');

const { ObjectId } = mongoose.Types;

const getUserById = (id) => {
    return Users.findById(id).select('nickName avatar');
}

const requestFriend = (userId, friendId) => {
    return new Promise(async function(resolve, reject) {
        try{
            const docA = await Friends.findOneAndUpdate(
                { requester: userId, recipient: friendId },
                { $set: { status: 1 }},
                { upsert: true, new: true }
            )
                
            const docB = await Friends.findOneAndUpdate(
                { recipient: userId, requester: friendId },
                { $set: { status: 2 }},
                { upsert: true, new: true }
            )
            const updateUserA = await Users.findOneAndUpdate(
                { _id: userId },
                { $push: { friends: docA._id }}
            )
            const updateUserB = await Users.findOneAndUpdate(
                { _id: friendId },
                { $push: { friends: docB._id }}
            )
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
}

const acceptFriend = (userId, friendId) => {
    return new Promise(async function(resolve, reject) {
        try{
            await Friends.findOneAndUpdate(
                { requester: friendId, recipient: userId },
                { $set: { status: 3 }}
            )
            await Friends.findOneAndUpdate(
                { recipient: friendId, requester: userId },
                { $set: { status: 3 }}
            )
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
}

const rejectFriend = (userId, friendId) => {
    return new Promise(async function(resolve, reject) {
        try{
            const docA = await Friends.findOneAndRemove(
                { requester: friendId, recipient: userId }
            )
            const docB = await Friends.findOneAndRemove(
                { recipient: friendId, requester: userId }
            )
            const updateUserA = await Users.findOneAndUpdate(
                { _id: friendId },
                { $pull: { friends: docA._id }}
            )
            const updateUserB = await Users.findOneAndUpdate(
                { _id: userId },
                { $pull: { friends: docB._id }}
            )
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
}

const getAllUserByID = (userId) => {
    return Users.aggregate([
        { "$lookup": {
          "from": Friends.collection.name,
          "let": { "friends": "$friends" },
          "pipeline": [
            { "$match": {
              "recipient": ObjectId(userId),
              "$expr": { "$in": [ "$_id", "$$friends" ] }
            }},
            { "$project": { "status": 1 } }
          ],
          "as": "friends"
        }},
        { "$addFields": {
          "friendsStatus": {
            "$ifNull": [ { "$min": "$friends.status" }, 0 ]
          }
        }}
      ])
}

module.exports = {
    getUserById,
    requestFriend,
    getAllUserByID,
    acceptFriend,
    rejectFriend,
}