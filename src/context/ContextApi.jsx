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
      const response = await fetch(`http://localhost:3000/api/comments`);

      if (!response.ok) {
        throw new Error(`Error fetching comments: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      setComments(result.testimonials);
    } catch (error) {
      setError(error.message);
    }
  };

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
