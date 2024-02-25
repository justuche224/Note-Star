import Note from "@/models/note";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params: { id } }) => {
  try {
    await connectToDB();

    const note = await Note.findById(id).populate("creator");
    if (!note) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify({ success: true, note: note }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  console.log("recieved request");
  const post = await request.json();
  try {
    await connectToDB();
    console.log("connected to database");
    let existingNote = await Note.findById(params.id);

    if (!existingNote) {
      return new Response("Note not found", { status: 404 });
    }

    console.log("found note");
    existingNote.title = post.title;
    existingNote.body = post.body;
    console.log("equated");

    await existingNote.save();
    console.log("saved note");
    return new Response("Successfully updated the Note", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Note", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  console.log("delete request");
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Note.findByIdAndDelete(params.id);

    return new Response("Note deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(`Error deleting note: ${error}`, { status: 500 });
  }
};
