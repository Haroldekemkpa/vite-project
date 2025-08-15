import React from "react";
import { useState, useContext } from "react";
import { CommentContextAPI } from "../context/ContextApi";

const Comment = () => {
  const [preview, setPreview] = useState(null);
  //   const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [commentErrors, setCommentErrors] = useState({});
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentFormData, setCommentFormData] = useState({
    name: "",
    title: "", // ✅ changed from role
    comment: "",
  });
  const { refreshComments } = useContext(CommentContextAPI);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    } else {
      setPreview(null);
      setSelectedFile(null);
    }
  };

  const validateCommentForm = () => {
    const newErrors = {};
    if (!commentFormData.name.trim()) newErrors.name = "Name is required";
    if (!commentFormData.title.trim())
      newErrors.title = "Role/Company is required"; // ✅
    if (!commentFormData.comment.trim())
      newErrors.comment = "Comment is required";
    return newErrors;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const errors = validateCommentForm();
    if (Object.keys(errors).length > 0) {
      setCommentErrors(errors);
      return;
    }

    setCommentErrors({});
    setIsSubmittingComment(true);

    try {
      const formData = new FormData();
      formData.append("name", commentFormData.name);
      formData.append("title", commentFormData.title); // ✅
      formData.append("comment", commentFormData.comment);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await fetch("http://localhost:3000/api/comments/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setCommentFormData({ name: "", title: "", comment: "" }); // ✅
      setPreview(null);
      setSelectedFile(null);
      refreshComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleCommentChange = (e) => {
    setCommentFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-orange-500 font-bold">
        Leave a Comment
      </h3>
      <form className="space-y-4 flex flex-col" onSubmit={handleSubmitComment}>
        <input
          type="text"
          name="name"
          value={commentFormData.name}
          onChange={handleCommentChange}
          placeholder="Your Name"
          className="form-input bg-[#e5e7eb] focus:outline-0 rounded p-2"
        />
        {commentErrors.name && (
          <p className="text-red-500 text-sm">{commentErrors.name}</p>
        )}

        <input
          type="text"
          name="title" // ✅ fixed this
          value={commentFormData.title}
          onChange={handleCommentChange}
          placeholder="Role / Company"
          className="form-input bg-[#e5e7eb] focus:outline-0 rounded p-2"
        />
        {commentErrors.title && (
          <p className="text-red-500 text-sm">{commentErrors.title}</p>
        )}

        <textarea
          name="comment"
          value={commentFormData.comment}
          onChange={handleCommentChange}
          placeholder="Your Comment"
          rows="4"
          className="form-input bg-[#e5e7eb] focus:outline-0 rounded p-2"
        />
        {commentErrors.comment && (
          <p className="text-red-500 text-sm">{commentErrors.comment}</p>
        )}

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Looking sharp? Upload image. 😁
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full hidden text-sm text-gray-600 file:bg-orange-100 file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
          />

          <label
            id="file"
            htmlFor="file"
            className="inline-block font-semibold bg-orange-100 text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-orange-200"
          >
            upload image
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 w-20 h-20 object-cover rounded-full border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmittingComment}
          className={`form-button ${
            isSubmittingComment
              ? "bg-orange-400"
              : "bg-orange-500 hover:bg-orange-600"
          } px-4 py-2 rounded shadow-sm text-white`}
        >
          {isSubmittingComment ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default Comment;
