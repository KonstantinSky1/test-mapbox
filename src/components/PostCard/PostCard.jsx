import React from 'react';

import './PostCard.css';

function PostCard({ post }) {
  return (
    <tr>
      <td className="posts__list-number">
        {post.id}
      </td>
      <td>
        {post.title}
      </td>
      <td>
        {post.body}
      </td>
    </tr>
  );
}

export default PostCard;