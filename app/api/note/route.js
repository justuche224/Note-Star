import { connectToDB } from "@/utils/database";
import Note from "@/models/note";

export const GET = async (request) => {
  try {
    await connectToDB();

    const userId = request.headers.get("user-id");

    // Fetch notes and sort by creationDateTime in descending order (newest first)
    const notes = await Note.find({ creator: userId })
      .sort({ creationDateTime: -1 })
      .populate("creator");

    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch notes", { status: 500 });
  }
};
