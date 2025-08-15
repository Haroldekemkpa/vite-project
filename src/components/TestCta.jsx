import React, { useState } from "react";

const CTASection = () => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Hire Me form state
  const [hireFormData, setHireFormData] = useState({
    client: "",
    email: "",
    project: "",
  });
  const [hireErrors, setHireErrors] = useState({});
  const [isSubmittingHire, setIsSubmittingHire] = useState(false);

  // Comment form state
  const [commentFormData, setCommentFormData] = useState({
    name: "",
    title: "", // ✅ changed from role
    comment: "",
  });
  const [commentErrors, setCommentErrors] = useState({});
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

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

  // ----------- Hire Me Section -----------

  const validateHireForm = () => {
    const newErrors = {};
    if (!hireFormData.client.trim()) newErrors.client = "Name is required";
    if (!hireFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(hireFormData.email)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (!hireFormData.project.trim())
      newErrors.project = "Project details are required";
    return newErrors;
  };

  const handleSubmitHire = async (e) => {
    e.preventDefault();
    const errors = validateHireForm();
    if (Object.keys(errors).length > 0) {
      setHireErrors(errors);
      return;
    }

    setHireErrors({});
    setIsSubmittingHire(true);

    try {
      const res = await fetch("http://localhost:3000/api/hires/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hireFormData),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setHireFormData({ client: "", email: "", project: "" });
    } catch (error) {
      console.error("Error submitting hire request:", error);
    } finally {
      setIsSubmittingHire(false);
    }
  };

  const handleHireChange = (e) => {
    setHireFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ----------- Comment Section -----------

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
    <section className="bg-gray-100 py-16 px-6 md:px-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Let’s Work Together
        </h2>
        <p className="text-gray-600 mt-2">
          Reach out to hire me or leave a comment below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* ----------- Hire Me Form ----------- */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
          <h3 className="text-xl font-bold mb-4 text-green-600 uppercase">
            Hire Me
          </h3>
          <form className="space-y-8 flex flex-col" onSubmit={handleSubmitHire}>
            <input
              type="text"
              name="client"
              value={hireFormData.client}
              onChange={handleHireChange}
              placeholder="Your Name"
              className="form-input bg-[#e5e7eb] focus:outline-0 p-4 rounded"
            />
            {hireErrors.client && (
              <p className="text-red-500 text-sm">{hireErrors.client}</p>
            )}

            <input
              type="email"
              name="email"
              value={hireFormData.email}
              onChange={handleHireChange}
              placeholder="Your Email"
              className="form-input bg-[#e5e7eb] focus:outline-0 p-4 rounded"
            />
            {hireErrors.email && (
              <p className="text-red-500 text-sm">{hireErrors.email}</p>
            )}

            <textarea
              name="project"
              value={hireFormData.project}
              onChange={handleHireChange}
              placeholder="Project Details"
              rows="4"
              className="form-input bg-[#e5e7eb] focus:outline-0 p-4 rounded"
            />
            {hireErrors.project && (
              <p className="text-red-500 text-sm">{hireErrors.project}</p>
            )}

            <button
              type="submit"
              disabled={isSubmittingHire}
              className={`form-button ${
                isSubmittingHire
                  ? "bg-green-400"
                  : "bg-green-600 hover:bg-green-700"
              } px-4 py-2 shadow-sm rounded text-white`}
            >
              {isSubmittingHire ? "Sending..." : "Send Request"}
            </button>
          </form>
        </div>

        {/* ----------- Comment Form ----------- */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-orange-500 font-bold">
            Leave a Comment
          </h3>
          <form
            className="space-y-4 flex flex-col"
            onSubmit={handleSubmitComment}
          >
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
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-600 file:bg-orange-100 file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
              />
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
      </div>
    </section>
  );
};

export default CTASection;
