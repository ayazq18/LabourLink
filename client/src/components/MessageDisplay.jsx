import React from "react";
import useFetch from "../hooks/useFetch";

const MessageDisplay = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/api/test");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading message</p>;

  return <p>Backend says: {data.message}</p>;
};

export default MessageDisplay;
