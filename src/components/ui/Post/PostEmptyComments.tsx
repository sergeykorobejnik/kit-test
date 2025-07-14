import React from 'react';
import { MessageCircleOff } from 'lucide-react';

interface PostEmptyCommentsProps extends React.HTMLProps<HTMLDivElement> {}

const PostEmptyComments: React.FC<PostEmptyCommentsProps> = ({ children, ...props }) => {
  return (
    <div className={'flex h-full w-full items-center justify-center'} {...props}>
      <MessageCircleOff />
      {children}
    </div>
  );
};

export default PostEmptyComments;
