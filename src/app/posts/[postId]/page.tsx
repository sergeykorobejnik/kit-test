import React from "react";
import {getPost} from "@/lib/firebase/api";
import {redirect} from "next/navigation";
import {Post} from "@/components/ui/Post";


export default async function PostPage({params}: { params: Promise<{ postId: string }> }) {

    const {postId} = await params;

    const post = await getPost({
        id: postId,
    });

    if (post === null) {
        redirect('/404')
    }

    return (
        <div
            className="bg-slate-200 flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
            <div className="w-full">
                <Post.Container key={post.id}>
                    <Post.Header
                        href={`/posts/${post.id}`}
                        title={
                            post.title
                        }
                        author={post.author}
                        createdAt={post.createdAt}/>
                    <Post.Body className="mb-6">
                        {
                            post.body
                        }
                    </Post.Body>
                    <p className={'text-lg font-bold mb-4'}>Comments</p>
                    {
                        !post.userComments?.length && (
                            <Post.EmptyComments className="flex gap-4 items-center text-neutral-600">
                                Looks like comments section is empty ;(
                            </Post.EmptyComments>
                        )
                    }
                    {
                        post.userComments.map((comment) => {
                            return (<Post.Comment key={comment.id} {...comment}/>)
                        })
                    }
                </Post.Container>
            </div>
        </div>
    );
}
