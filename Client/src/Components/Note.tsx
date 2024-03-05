import LeftNavbar from "./LeftNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import Button from "./Button";
const Note = () => {
  const { noteId } = useParams();
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const notes = async () => {
      const response = await fetch("http://localhost:3000/todo/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Pre Response");
      if (!response.ok) {
        console.error("Failed to fetch notes");
        return;
      }
      console.log("Post ");
      const data = await response.json();
      setAllNotes(data);
    };
    notes();
  }, []);
  console.log(allNotes);
  const particularNote = allNotes.find((note) => note._id == noteId);

  if (!particularNote) {
    // Handle the case where the note with the specified noteId is not found
    return (
      <div className="flex flex-row bg-[#f5f5fc]">
        <LeftNavbar />
        <div className="w-3/4 p-20 ">
          <h1>Note not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row  bg-[#f5f5fc]">
      <LeftNavbar />
      <div className="w-3/4 p-20 h-screen overflow-y-auto">
        <div className="flex flex-row bg-white py-4 px-3 my-10">
          <span>Share with : </span>
          <span className=" mx-2 my-5 px-5 py-2 rounded-md text-white font-bold bg-blue-700">
            Twitter
          </span>
          <span className="px-5 mx-2 py-2 my-5  rounded-md text-white font-bold bg-blue-700 ">
            LinkedIn
          </span>
          <span className="px-5 mx-2 py-2 my-5  rounded-md text-white font-bold bg-blue-700 ">
            Facebook
          </span>
          <span className="px-5 mx-2 py-2 my-5  rounded-md text-white font-bold bg-red-700 ">
            Youtube
          </span>
          <span className="px-5 mx-2 py-2 my-5  rounded-md text-white font-bold bg-black ">
            Medium
          </span>
          <span className="px-5 mx-2 py-2 my-5  rounded-md text-white font-bold bg-blue-700">
            Hashnode
          </span>
          <span className="px-5 mx-2 py-2 my-5  rounded-md text-white font-bold bg-blue-700">
            Dev
          </span>
        </div>
        <h1 className="text-3xl font-bold">{particularNote.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: particularNote.description }} />
        <button
          className="bg-blue-700 text-white my-5 px-5 py-2 rounded-md"
          onClick={() => {
            alert("Converting current Journal to Tweet");
            navigate("/twitteroption", {
              state: { journal: particularNote.description },
            });
          }}
        >
          Convert To Tweet
        </button>
      </div>
    </div>
  );
};
export default Note;
