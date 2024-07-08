import { useDispatch, useSelector } from "react-redux"
import { clearModalAddBlog, clearModalViewBlog } from "../../../redux/Slice/ModalSlice"
import { adminIdSelector, adminTokenSelector, modalAddBlogSelector, modalBlogIdSelector, modalViewBlogSelector } from "../../../redux/selector"
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";
import { useEffect, useState } from "react";
import { createBlog } from "../../../api/adminAPI";
import { getOneBlogByBlogId } from "../../../api/appAPI";
import ReactMarkdown from 'react-markdown';


function ModalViewBlog() {
    const modalViewBlog = useSelector(modalViewBlogSelector)
    const modalBlogId = useSelector(modalBlogIdSelector)
    const dispatch = useDispatch()

    const handleCloseCreate = () => {
        dispatch(clearModalViewBlog())
    }

    const [blog, setBlog] = useState({});

    const getBlog = async () => {
        let res = await getOneBlogByBlogId(modalBlogId)
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
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="custom-modal"
            show={modalViewBlog}
        >
            <Modal.Header className='border-none justify-between mt-3 px-5'>
                <h1 className='text-center text-2xl font-bold'>Chi tiết blog</h1>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseCreate}></i>
            </Modal.Header>
            <Modal.Body className='sm:px-4 md:px-5 lg:mx-5 xl:mx-5' >
                <div className="flex w-full flex-col gap-5 justify-between items-center mb-5">
                    <h1 className="font-bold sm:text-2xl text-3xl">{blog.title}</h1>
                    <img loading="lazy" className="sm:w-full w-5/6 rounded-lg" src={blog.imageTitle} />
                </div>
                <ReactMarkdown className="text-lg">{blog.content}</ReactMarkdown>
            </Modal.Body>

        </Modal>
    )
}

export default ModalViewBlog