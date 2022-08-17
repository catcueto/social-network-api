const { User, Thought } = require("../models");

module.exports = {
  // GET ALL users
  async getUsers(req, res) {
    const users = await User.find()
      .select("-__v") ////versionKey (when document was first created by mongoose)
      .populate("thoughts")
      .populate({
        path: "friends",
      });
    res.status(200).json(users);
  },

  // GET a SINGLE user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.user_Id })
      .populate({ path: "friends", select: "-__v" })
      .populate({ path: "thoughts", select: "-__v" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // CREATE a user
  createUser(req, res) {
    User.create(req.body)
      .then((userDb) => res.json(userDb))
      .catch((err) => res.status(500).json(err));
  },
  // UPDATE USER
  updateUser(req, res) {
    User.updateOne({ _id: req.params.user_Id }, req.body)
      .then((user) =>
        !user
          ? res.status(400).json({
              message: "Cannot update user because user does not exist",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE USER
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.user_Id })
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

  // ADD A FRIEND
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.user_Id },
      { $addToSet: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // REMOVE FRIEND
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.user_Id },
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
