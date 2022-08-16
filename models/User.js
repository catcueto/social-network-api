const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");
const mongoose = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      // removes white space
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // array of _id values referencing to the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        // array of _id values self-referencing to the User model
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
