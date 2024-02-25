import Note from "@/models/note";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";

export const POST = async (req) => {
  const newNoteData = await req.json();
  newNoteData.creationDateTime = new Date();
  console.log(newNoteData); // Log newNoteData before creating the Note instance

  // Add _id field to the newNoteData object
  newNoteData._id = new mongoose.Types.ObjectId();

  try {
    await connectToDB();
    const newNote = new Note(newNoteData);

    // Log the newNote object before saving
    console.log(newNote);

    // Save the newNote
    await newNote.save();

    // Log confirmation message after successful save
    console.log("Note saved successfully");

    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    // Log any errors that occur during Note creation or saving
    console.log("Error creating or saving Note:", error);

    // Return an appropriate error response
    return new Response("Failed to create a new Note", { status: 500 });
  }
};
