import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  oauthProvider: 'google' | 'facebook' | 'github' | 'local';
  oauthId?: string;           // ID from Google/Facebook/etc
  mobile: string;
  address?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    oauthProvider: {
      type: String,
      enum: ['google', 'facebook', 'github', 'local'],
      required: true,
    },
    oauthId: { type: String },         // Only required if using OAuth
    mobile: { type: String, required: true },
    address: { type: String },         // Optional
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
