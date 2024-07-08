import { useState } from "react";
import { getOneBlogByBlogId } from "../../api/appAPI";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { useEffect } from "react";

function DetailBlog() {
    const [blogs, setBlog] = useState({});
    const { blog } = useParams()

    const getBlog = async () => {
        let res = await getOneBlogByBlogId(blog)
        if (res) {
            setBlog(res)
        } else {
            setBlog({})
        }
    }

    useEffect(() => {
        getBlog()
    }, [])


    return (
        <div className="w-full sm:px-5 md:px-5 lg:px-16 xl:px-32 sm:pt-2 md:pt-3 lg:pt-3 xl:pt-3 sm:pb-16 md:mb-16 lg:mb-16 xl:mb-16">
            <div className="flex w-full flex-col sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 justify-between items-center mb-5">
                <img loading="lazy" className="rounded-lg sm:h-auto md:h-auto lg:h-[calc(100vh-100px)] xl:h-[calc(100vh-100px)] w-full object-cover" src={blogs.imageTitle} />
                <h1 className="lg:mt-4 xl:mt-4 font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{blogs.title}</h1>
                <h2 className="font-semibold sm:text-base md:text-lg lg:text-xl xl:text-xl">
                    Tác giả:
                    <span className="ml-2">{blogs.admin && blogs.admin.fullname}</span>
                </h2>
            </div>
            <ReactMarkdown className="sm:text-lg md:text-xl lg:text-xl xl:text-xl">{blogs.content}</ReactMarkdown>
        </div>

    )

}

export default DetailBlog