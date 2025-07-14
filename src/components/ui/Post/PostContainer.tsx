import React from 'react';

interface PostContainerProps extends React.HTMLProps<HTMLDivElement> {

}

const PostContainer: React.FC<PostContainerProps> = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default PostContainer;