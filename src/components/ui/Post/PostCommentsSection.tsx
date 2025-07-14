import React from 'react';

interface PostCommentContainerProps extends React.HTMLProps<HTMLDivElement> {

}

const PostCommentsSection: React.FC<PostCommentContainerProps> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default PostCommentsSection;