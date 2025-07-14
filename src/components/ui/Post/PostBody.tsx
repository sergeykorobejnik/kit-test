import React from 'react';

interface PostBodyProps extends React.HTMLProps<HTMLDivElement> {}

const PostBody: React.FC<PostBodyProps> = ({ children, ...props }) => {
  return (
    <div className={'mb-2'} {...props}>
      {children}
    </div>
  );
};

export default PostBody;
