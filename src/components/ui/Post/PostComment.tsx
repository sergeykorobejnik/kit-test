import React from 'react';
import {Timer, User} from "lucide-react";

interface PostCommentProps extends React.HTMLProps<HTMLDivElement> {
    id: string;
    parentId: string;
    author: string;
    body: string;
    createdAt: string;
}

const PostComment: React.FC<PostCommentProps> = ({author, body, createdAt, ...props}) => {
    return (
        <div {...props}>
            <div className={"flex items-center mb-1 gap-4"}>
                <div className={'flex items-center gap-1'}>
                    <User size={16}/>
                    <span>{author}</span>
                </div>
                <div className="flex items-center">
                    <Timer size={16}/>
                    <span>{createdAt}</span>
                </div>
            </div>
            <p>
                {body}
            </p>
        </div>
    );
};

export default PostComment;