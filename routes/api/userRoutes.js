const router = require("express").Router();

const {
  getUsers, //get all users
  getSingleUser, //get by user _id
  createUser, //post including username and email
  updateUser, //put user by its id
  deleteUser, //remove user by its id
  addFriend, //add new friend from user's friend list
  removeFriend, //deletes a friend from same list
} = require("../../controllers/userControllers");

// /api/users --> gets all users + creates new user
router.route("/").get(getUsers).post(createUser);

// /api/users/:user_Id --> gets single user + update/modify user info + delete user
router.route("/:user_Id").get(getSingleUser).put(updateUser).delete(deleteUser);

router
  .route("/:user_Id/friends/:friendId")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
