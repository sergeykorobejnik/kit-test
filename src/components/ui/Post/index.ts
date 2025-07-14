import PostBody from './PostBody'
import PostContainer from './PostContainer'
import PostHeader from './PostHeader'
import {MAX_POST_LENGTH, MAX_TITLE_LENGTH} from "@/components/ui/Post/_util/constants";
import {postContentFormater} from "@/components/ui/Post/_util/contentTransformers";
import PostComment from "@/components/ui/Post/PostComment";
import PostCommentsSection from "@/components/ui/Post/PostCommentsSection";
import PostCommentCounter from "@/components/ui/Post/PostCommentCounter";
import PostEmptyComments from "@/components/ui/Post/PostEmptyComments";


export const Post = {
    Body: PostBody,
    Container: PostContainer,
    Header: PostHeader,
    EmptyComments: PostEmptyComments,
    Comment: PostComment,
    CommentCounter: PostCommentCounter,
    CommentsSection: PostCommentsSection,
    constants: {
        MAX_POST_LENGTH,
        MAX_TITLE_LENGTH,
    },
    util: {
        postContentFormater,
    }
}