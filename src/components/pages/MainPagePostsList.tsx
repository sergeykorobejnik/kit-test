import React from 'react';
import {Posts} from "@/lib/firebase/schemas";
import {Post} from "@/components/ui/Post";

interface MainPagePostsListProps {
    posts: Posts[];
}

const MainPagePostsList: React.FC<MainPagePostsListProps> = ({posts}) => {
    return (
        <div>
            <h1 className={'text-3xl font-bold mb-8'}>Posts</h1>
            <div className="flex flex-col items-center justify-center gap-4">
                {
                    posts.map((post) => (
                        <Post.Container key={post.id}>
                            <Post.Header
                                title={
                                    Post
                                        .util
                                        .postContentFormater(
                                            post.title,
                                            {maxLength: Post.constants.MAX_TITLE_LENGTH.Default}
                                        )
                                }
                                author={post.author}
                                createdAt={post.createdAt}/>
                            <Post.Body>
                                {
                                    Post
                                        .util
                                        .postContentFormater(
                                            post.body,
                                            {maxLength: Post.constants.MAX_POST_LENGTH.Default}
                                        )
                                }
                            </Post.Body>
                            <Post.CommentCounter count={post.userComments.length}/>
                        </Post.Container>
                    ))
                }
            </div>
        </div>
    );
};

export default MainPagePostsList;