import React from 'react';
import {Timer, User} from "lucide-react";

interface PostTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    author: string;
    createdAt: string;
}

const PostHeader: React.FC<PostTitleProps> = ({title, author, createdAt, ...props}) => {
    return (
        <div className={"mb-2"} {...props}>
            <p className="text-xl bold mb-1">
                {title}
            </p>
            <div className={"flex items-center mb-2 gap-4"}>
                <div className={'flex items-center gap-1'}>
                    <User size={16}/>
                    <span>{author}</span>
                </div>
                <div className="flex items-center">
                    <Timer size={16}/>
                    <span>{createdAt}</span>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;