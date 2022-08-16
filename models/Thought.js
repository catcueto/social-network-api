const { Schema, model } = require("mongoose");

// THOUGHT SCHEMA
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
      default: "No thoughts to add at the moment",
    },

    createdAt: {
      type: Date,
      // current timestamp
      default: Date.now,
      // using getter method to format the timestamp on query
      get: () => Date.now,
    },
    // Person who created this thought
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// REACTION SCHEMA
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectID,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  // getter for current date format
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
