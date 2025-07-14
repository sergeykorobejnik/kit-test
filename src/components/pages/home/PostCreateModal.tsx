'use client'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/shadcn/alert-dialog"
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {NewPost} from "@/lib/firebase/types";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/shadcn/form";
import {Input} from "@/components/shadcn/input";
import {Textarea} from "@/components/shadcn/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {NewPostSchema} from "@/lib/schemas/posts/Post";
import {Button} from "@/components/shadcn/button";

interface PostCreateModalProps {
    onSubmit: (payload: NewPost) => any;
    isOpen: boolean;
    onOpenChange: (value: boolean) => any
}

const PostCreateModal: React.FC<PostCreateModalProps> = ({onSubmit, isOpen, onOpenChange}) => {
    const form = useForm<NewPost>({
        resolver: zodResolver(NewPostSchema),
        defaultValues: {
            title: '',
            author: '',
            body: ''
        }
    })

    useEffect(() => {
        if (!isOpen) {
            form.reset()
        }
    }, [isOpen, form]);

    return (
        <Form {...form}>
            <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ready to create your Post?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="What your topic?" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Say my name.... :)" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Post content</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button type="submit">Save</Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </Form>
    )
}

export default PostCreateModal;
