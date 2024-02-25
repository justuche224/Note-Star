import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Note title is required"],
  },
  body: {
    type: String,
    required: [true, "Note body is required"],
  },
  creationDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  deletionDateTime: {
    type: Date,
    default: null,
  },
});

NoteSchema.index({ creationDateTime: 1 });

const Note = models?.Note || model("Note", NoteSchema);

export default Note;
