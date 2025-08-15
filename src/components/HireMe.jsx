import React, { useState } from "react";

const HireSection = () => {
  //   const [preview, setPreview] = useState(null);
  //   const [selectedFile, setSelectedFile] = useState(null);

  // Hire Me form state
  const [hireFormData, setHireFormData] = useState({
    client: "",
    email: "",
    project: "",
  });
  const [hireErrors, setHireErrors] = useState({});
  const [isSubmittingHire, setIsSubmittingHire] = useState(false);

  // ----------- Hire Me Section -----------

  const validateHireForm = () => {
    console.log("hireFormData: ", hireFormData);
    const newErrors = {};
    if (!hireFormData.client.trim()) newErrors.client = "Name is required";
    if (!hireFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(hireFormData.email)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (!hireFormData.project?.trim())
      newErrors.project = "Project details are required";
    return newErrors;
  };

  const handleSubmitHire = async (e) => {
    e.preventDefault();
    const errors = validateHireForm();
    if (!errors || Object.keys(errors).length > 0) {
      setHireErrors(errors || {});
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
      {/* ----------- Hire Me Form ----------- */}
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
  );
};

export default HireSection;
