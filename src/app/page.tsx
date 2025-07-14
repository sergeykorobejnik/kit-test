import {getPosts} from "@/lib/firebase/api";
import MainPagePostsList from "@/components/pages/MainPagePostsList";


export default async function Home() {
    const posts = await getPosts();
    return (
        <div
            className="bg-slate-200 flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
            <MainPagePostsList posts={posts}/>
        </div>
    );
}
