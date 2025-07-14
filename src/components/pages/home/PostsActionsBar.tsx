import React from 'react';
import {Button} from "@/components/shadcn/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu";

const PostsActionsBar = () => {
    return (
        <div className="flex flex-row items-center justify-between gap-4 w-full">
            <Button>Create Post</Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Sort by</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuItem>
                        Date ↑
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Date ↓
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default PostsActionsBar;