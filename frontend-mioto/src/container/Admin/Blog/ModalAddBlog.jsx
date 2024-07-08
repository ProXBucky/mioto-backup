import { useDispatch, useSelector } from "react-redux"
import { clearModalAddBlog } from "../../../redux/Slice/ModalSlice"
import { adminIdSelector, adminTokenSelector, modalAddBlogSelector } from "../../../redux/selector"
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { setConponentLoad, setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";
import { useState } from "react";
import { createBlog } from "../../../api/adminAPI";
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function ModalAddBlog() {
    const modalAddBlog = useSelector(modalAddBlogSelector)
    const adminToken = useSelector(adminTokenSelector)
    const adminId = useSelector(adminIdSelector)
    const dispatch = useDispatch()

    const handleCloseCreate = () => {
        dispatch(clearModalAddBlog())
    }

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [filePath, setFilePath] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePath(reader.result);  // Đường dẫn tạm thời của ảnh
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng URL tạm thời
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setShowLoading())
            let res = await createBlog({
                title: title,
                content: content,
                imageTitle: filePath,
                adminId: adminId
            }, adminToken)
            if (res) {
                toast.success("Tạo blog thành công")
                handleCloseCreate();
                dispatch(setConponentLoad())
            }
        } catch (error) {
            console.log(error)
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Bạn chưa được cấp quyền');
                        break;
                    case 403:
                        toast.error('Bạn không có quyền tạo');
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
    };

    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="custom-modal"
            show={modalAddBlog}
        >
            <Modal.Header className='border-none justify-between mt-3 px-5'>
                <h1 className='text-center text-2xl font-bold'>Tạo blog</h1>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseCreate}></i>
            </Modal.Header>
            <Modal.Body className='p-4 sm:px-2 md:px-5 lg:px-5 xl:px-5' >
                <Form onSubmit={handleSubmit}>
                    <div className="flex w-full sm:flex-col md:flex-col lg:flex-row xl:flex-row sm:gap-3 md:gap-5 justify-between items-center">
                        <div className="sm:w-full md:w-full lg:w-4/5 xl:w-4/5">
                            <h3 className="font-semibold text-xl">Tiêu đề</h3>
                            <input className="mt-2 border-2 p-2 sm:w-full md:w-full lg:w-2/3 xl:w-2/3 rounded-md outline-none" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className='sm:w-full md:w-full lg:w-1/5 xl:w-1/5 flex flex-col gap-2 justify-center items-center'>
                            <label htmlFor="avaInput" className="rounded-md bg-main p-2 mb-2 text-white font-semibold cursor-pointer">
                                Chọn ảnh tiêu đề
                            </label>
                            <input type="file" id="avaInput" className='hidden' required onChange={handleFileChange} />
                            <div className="sm:h-44 xl:h-24 w-full border-2">
                                {
                                    filePath && <img loading="lazy" className="" src={filePath} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-3">
                        <h3 className="font-semibold text-xl mb-2">Nội dung</h3>
                        <div className='markdown w-full'>
                            <SimpleMDE style={{ height: "auto" }}
                                value={content} onChange={setContent}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="submit" className="w-1/3 hover:opacity-80 rounded-md bg-main p-2 mb-2 text-white font-semibold">Tạo mới</button>
                    </div>
                </Form>
            </Modal.Body>

        </Modal>
    )
}

export default ModalAddBlog