import mongoose, { Schema, Document, model } from 'mongoose';

interface UserType extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic: string
}

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    trim: true,
    required : [true, "Name is required"],
  },
  username: {
    type: String,
    unique: [true, 'Username is already taken'],
    trim: true,
    required : [true, "Username is required"],
    minlength: 3,
  } ,
  email: {
    type: String,
    unique: [true, 'Email is is already taken'],
    trim: true,
    required : [true, "Email is required"],
    minlength: 3,
  }, 
  password: {
    type:String,
    required: true,
  },   profilePic: {
    type: String,
    default: "",
  },
}, {timestamps: true});

const User = mongoose.model('User', userSchema) 
export default User
