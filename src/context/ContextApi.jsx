import React, { useCallback } from "react";
import { createContext, useState, useEffect } from "react";

export const CommentContextAPI = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Memoize fetch function to prevent unnecessary recreations
  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await fetch(
        `https://server-5-oy95.onrender.com/api/comments`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // You could add AbortController here for cleanup
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { success, testimonials } = await response.json();

      if (!success || !Array.isArray(testimonials)) {
        throw new Error("Invalid API response structure");
      }

      // console.log("API testimonials:", testimonials);

      // More robust duplicate removal using id if available
      const uniqueTestimonials = testimonials.reduce((acc, current) => {
        const exists = acc.some(
          (item) =>
            item.id === current.id || // First try matching by ID
            (item.name === current.name && item.comment === current.comment) // Fallback to name+comment
        );
        return exists ? acc : [...acc, current];
      }, []);

      // console.log("Unique testimonials:", uniqueTestimonials);
      setComments(uniqueTestimonials);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      // Keep existing comments if we have them, rather than resetting
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this is created once

  useEffect(() => {
    const abortController = new AbortController();

    fetchComments();

    return () => {
      abortController.abort(); // Cleanup on unmount
    };
  }, [fetchComments, refresh]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      comments,
      error,
      isLoading,
      refreshComments: () => setRefresh((prev) => !prev),
    }),
    [comments, error, isLoading]
  );

  return (
    <CommentContextAPI.Provider value={contextValue}>
      {children}
    </CommentContextAPI.Provider>
  );
};
