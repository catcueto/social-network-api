const { User, Thought } = require("../models");

module.exports = {
  // Gets ALL users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get a SINGLE user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      // populate allows us to get a list of friends and thoughts
      .populate({ path: "friends", select: "-__v" }) //versionKey (when document was first created by mongoose)
      .populate({ path: "thoughts", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(400).json({ message: "User does not exist" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((userDb) => res.json(userDb))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.updateOne({ _id: req.params.userId }, req.body)
      .then((user) =>
        !user
          ? res.status(400).json({
              message: "Cannot update user because user does not exist",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Cannot delete user because user does not exist",
            })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts/reactions deleted!" })
      )

      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friend_id } }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
