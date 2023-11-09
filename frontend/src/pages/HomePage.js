import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePostContext } from "../contexts/post_context";
import { useState, useEffect } from "react";
export default function HomePage() {
  const {
    posts,
    posts_loading: loading,
    posts_error: error,
    fetchPosts,
  } = usePostContext();

  console.log(posts);

  const [postList, setPostList] = useState([]);
  return <div></div>;
}
