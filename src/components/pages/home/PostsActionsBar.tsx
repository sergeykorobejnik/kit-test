'use client'
import React from 'react';
import {Button} from "@/components/shadcn/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu";
import PostCreateModal from "@/components/pages/home/PostCreateModal";
import {NewPost} from "@/lib/firebase/types";
import {useDisclosure} from "@/lib/hooks/util";


interface PostsActionsBarProps {
    onPostCreate: (payload: NewPost) => void;
    creationModalControls: ReturnType<typeof useDisclosure>;
}

const PostsActionsBar: React.FC<PostsActionsBarProps> = ({onPostCreate, creationModalControls}) => {
    const modalControl = useDisclosure(false);

    return (
        <>
            <div className="flex flex-row items-center justify-between gap-4 w-full">
                <Button onClick={creationModalControls.onOpen}>Create Post</Button>
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
            <PostCreateModal isOpen={creationModalControls.isOpen} onOpenChange={creationModalControls.onChange}
                             onSubmit={onPostCreate}/>
        </>
    );
};

export default PostsActionsBar;