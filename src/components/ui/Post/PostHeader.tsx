import React from 'react';
import {Timer, User} from "lucide-react";
import Link from "next/link";

interface PostTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    href: string;
    title: string;
    author: string;
    createdAt: string;
}

const PostHeader: React.FC<PostTitleProps> = ({title, author, createdAt, href, ...props}) => {
    return (
        <div className={"mb-2"} {...props}>
            <Link className="text-xl bold mb-1" href={href}>
                {title}
            </Link>
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