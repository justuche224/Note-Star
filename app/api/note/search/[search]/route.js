import { connectToDB } from "@/utils/database";
import Note from "@/models/note";

export const GET = async (request, { params: { search } }) => {
  try {
    await connectToDB();

    const userId = request.headers.get("user-id");

    const searchRegex = new RegExp(search, "i");
    const notes = await Note.find({
      creator: userId,
      $or: [
        { title: { $regex: searchRegex } },
        { body: { $regex: searchRegex } },
      ],
    })
      .sort({ creationDateTime: -1 })
      .populate("creator");
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch notes", { status: 500 });
  }
};
