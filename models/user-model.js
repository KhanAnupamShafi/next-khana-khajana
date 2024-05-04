const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  favourites: {
    type: [String],
    default: [],
  },
});

// This '??' is used to prevent overwrite model once compiled Mongoose

export const User =
  mongoose.models.users ?? mongoose.model("users", UserSchema);
