
import { useEffect, useState } from 'react';
import { getAllBlogsWithLimit } from '../../api/appAPI';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

function Blog() {

    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    const fetchAllBlogs = async () => {
        let res = await getAllBlogsWithLimit(3)
        if (res && res.length > 0) {
            setBlogs(res)
        } else {
            setBlogs([])
        }
    }

    const handleClick = (blogId) => {
        navigate(`/blog/${blogId}`)
    }

    const formatDate = (date) => {
        if (!date) return ''; // Handle null or undefined date
        try {
            return format(new Date(date), "dd/MM/yyyy");
        } catch (error) {
            console.error('Error formatting date:', error);
            return ''; // Return empty string or handle gracefully
        }
    };

    useEffect(() => {
        fetchAllBlogs()
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
    }

    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 py-20">
            <div className='text-center sm:mb-5 md:mb-20 lg:mb-20 xl:mb-20'>
                <h1 className='h-12 sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>MIOTO Blog</h1>
            </div>
            <div className="flex flex-row gap-5 sm:hidden md:hidden">
                <div className="flex flex-col w-1/3 gap-4">
                    <div className="relative cursor-pointer" onClick={() => handleClick(blogs[0].blogId)}>
                        <img loading="lazy" src={blogs && blogs[0] && blogs[0].imageTitle} className="h-[250px] w-full rounded-3xl object-cover" />
                        <div className="text-white absolute bottom-5 left-5 pr-2">
                            <p className='font-semibold text-lg'>{formatDate(blogs && blogs[0] && blogs[0].publishDate)}</p>
                            <h2 className="font-bold text-xl">{blogs && blogs[0] && blogs[0].title}</h2>
                        </div>
                    </div>
                    <div className="relative cursor-pointer" onClick={() => handleClick(blogs[1].blogId)}>
                        <img loading="lazy" src={blogs && blogs[1] && blogs[1].imageTitle} className="h-[250px] w-full rounded-3xl object-cover" />
                        <div className="text-white absolute bottom-5 left-5 pr-2">
                            <p className='font-semibold text-lg'>{formatDate(blogs && blogs[1] && blogs[1].publishDate)}</p>
                            <h2 className="font-bold text-xl">{blogs && blogs[1] && blogs[1].title}</h2>
                        </div>
                    </div>

                </div>
                <div className="w-2/3 relative cursor-pointer" onClick={() => handleClick(blogs[2].blogId)}>
                    <img loading="lazy" src={blogs && blogs[2] && blogs[2].imageTitle} className="h-[520px] w-full rounded-3xl object-cover" />
                    <div className="text-white absolute bottom-10 left-5 pr-2">
                        <p className='font-semibold text-2xl'>{formatDate(blogs && blogs[2] && blogs[2].publishDate)}</p>
                        <h2 className="font-bold text-4xl">{blogs && blogs[2] && blogs[2].title}</h2>
                    </div>
                </div>
            </div>
            <div className="sm:block md:block lg:hidden xl:hidden">
                <Slider {...settings}>
                    {
                        blogs && blogs.length > 0 &&
                        blogs.map((blog, index) => {
                            return (
                                <div className="w-full relative cursor-pointer" onClick={() => handleClick(blog.blogId)} key={index}>
                                    <img loading="lazy" src={blog.imageTitle} className="sm:h-[250px] md:h-[520px] w-full rounded-3xl object-cover" />
                                    <div className="text-white absolute sm:bottom-3 md:bottom-10 sm:left-3 md:left-5 sm:pr-1 md:pr-2">
                                        <p className='font-semibold sm:text-base md:text-2xl'>{formatDate(blog.publishDate)}</p>
                                        <h2 className="font-bold sm:text-lg md:text-4xl">{blog.title}</h2>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div >
    )

}

export default Blog