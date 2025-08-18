import React from "react";
import { createContext, useState, useEffect } from "react";

// create context
export const CommentContextAPI = createContext();

//  Create provider component

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        ` https://server-5-oy95.onrender.com/api/comments`
      );

      if (!response.ok) {
        throw new Error(`Error fetching comments: ${response.status}`);
      }

      const result = await response.json();
      // console.log(result);

      // remove duplicates

      const uniqueTestimonials = result.testimonials.filter(
        (v, i, a) =>
          a.findIndex(
            (t) =>
              t.comment === v.comment &&
              t.name === v.name &&
              t.profile_img === v.profile_img
          ) === i
      );

      setComments(uniqueTestimonials);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    console.log("Raw API response:", result);
    console.log("Filtered testimonials:", uniqueTestimonials);
    setComments(uniqueTestimonials);
  }, [refresh]);

  useEffect(() => {
    fetchComments();
  }, [refresh]);

  return (
    <CommentContextAPI.Provider
      value={{
        comments,
        error,
        refreshComments: () => setRefresh((prev) => !prev),
      }}
    >
      {children}
    </CommentContextAPI.Provider>
  );
};
