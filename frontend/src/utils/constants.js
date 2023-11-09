import React from "react";
export const domain = process.env.REACT_APP_BACKEND_HOST;

export const posts_url = `${domain}api/post/`;
export const create_new_post = `${domain}api/post/new`;
export const update_post_url = `${domain}api/post/`;
