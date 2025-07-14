import React from 'react';
import { MessageCircle } from 'lucide-react';

interface PostCommentCounterProps {
  count: number;
}

const PostCommentCounter: React.FC<PostCommentCounterProps> = ({ count }) => {
  return (
    <div className={'flex items-center gap-2 text-neutral-700'}>
      <MessageCircle size={16} />
      <span>{count}</span>
    </div>
  );
};

export default PostCommentCounter;
