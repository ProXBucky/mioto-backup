import { useEffect, useState } from "react"
import { getAllBlogs } from "../../../api/appAPI"
import { useDispatch, useSelector } from "react-redux"
import { adminTokenSelector, componentLoadSelector } from "../../../redux/selector"
import { setModalAddBlog, setModalBlogId, setModalViewBlog } from "../../../redux/Slice/ModalSlice"
import { format } from "date-fns"
import { deleteBlog } from "../../../api/adminAPI"
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";
import { toast } from "react-toastify"

function ManageBlog() {
    const [blogs, setBlogs] = useState([])
    const dispatch = useDispatch()

    const fetchAllBlogs = async () => {
        let res = await getAllBlogs()
        if (res && res.length > 0) {
            setBlogs(res)
        } else {
            setBlogs([])
        }
    }

    const adminToken = useSelector(adminTokenSelector)
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const handleOpenModalCreate = () => {
        dispatch(setModalAddBlog())
    }

    const handleOpenModalView = (blogId, index) => {
        toggleDropdown(index)
        dispatch(setModalBlogId(blogId))
        dispatch(setModalViewBlog())

    }


    const handleDeleteBlog = async (blogId, index) => {
        try {
            toggleDropdown(index)
            if (window.confirm("Bạn có xóa bài viết này không?")) {
                dispatch(setShowLoading())
                let res = await deleteBlog(blogId, adminToken)
                if (res) {
                    toast.success("Xóa thành công")
                    fetchAllBlogs()
                }
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Bạn chưa được cấp quyền');
                        break;
                    case 403:
                        toast.error('Bạn không có quyền xóa');
                        break;
                    default:
                        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        } finally {
            dispatch(setHideLoading())
        }
    }

    useEffect(() => {
        fetchAllBlogs()
    }, [])

    const load = useSelector(componentLoadSelector)

    useEffect(() => {
        fetchAllBlogs()
    }, [load])

    return (
        <div className="w-full">
            <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:gap-4 justify-between">
                <h2 className="font-bold text-xl">Blog</h2>
                <button className="py-2 px-3 bg-black text-white font-semibold rounded-md" onClick={handleOpenModalCreate}><i className="fa-solid fa-plus mr-2"></i>Tạo Blog</button>
            </div>
            <div className="w-full h-40 bg-white mt-10">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th className="py-3 px-6 text-left sm:hidden">Tác giả</th>
                            <th className="py-3 px-6 text-left">Tiêu đề</th>
                            <th className="py-3 px-6 text-center sm:hidden">Ngày xuất bản</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-normal">
                        {
                            blogs && blogs.length > 0 &&
                            blogs.map((blog, index) => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap sm:hidden">
                                            <div className="flex items-center gap-2">
                                                <img loading="lazy" className="h-10 rounded-full border" src={blog.admin && blog.admin.avatarImage ? blog.admin && blog.admin.avatarImage : "/avaMale.png"} />
                                                <span className="font-medium">{blog.admin && blog.admin.fullname}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span className="text-sm">{blog.title}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center sm:hidden">
                                            <span className="bg-green-200 text-gray-700 py-1 px-3 rounded-full text-sm sm:hidden">{format(blog.publishDate, "dd/MM/yyyy")}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="relative w-full">
                                                <i
                                                    className="fa-solid fa-ellipsis fa-xl cursor-pointer"
                                                    onClick={() => toggleDropdown(index)}
                                                ></i>
                                                {openDropdownIndex === index && (
                                                    <div
                                                        className="absolute right-16 top-[-40px] transform transition-transform duration-300 
                                                                w-36 scale-100 
                                                                overflow-hidden bg-gray-100 text-black mt-2 rounded shadow-lg"
                                                    >
                                                        <ul>
                                                            <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleOpenModalView(blog.blogId, index)}>
                                                                <i className="fa-solid fa-eye"></i>
                                                                <p>Xem</p>
                                                            </li>
                                                            <li className="hover:bg-gray-200 px-3 text-sm font-semibold py-2 cursor-pointer transition-colors duration-200 flex gap-2 items-center" onClick={() => handleDeleteBlog(blog.blogId, index)}>
                                                                <i className="fa-solid fa-trash-can"></i>
                                                                <p>Xóa</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageBlog