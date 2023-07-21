import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', required: true },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
