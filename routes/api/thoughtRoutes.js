const router = require("express").Router();

const {
  getThoughts, //gets all thoughts
  getSingleThought, //single thought by id,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  // getReactions,
  // updateReaction,
  deleteReaction,
} = require("../../controllers/thoughtControllers");

//  /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thought_Id
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// router
//   .route("/:thoughtId/reactions/:reactionId")
//   .put(updateReaction)
//   .delete(deleteReaction);

module.exports = router;
