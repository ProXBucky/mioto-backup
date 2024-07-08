import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch, useSelector } from 'react-redux';
import { clearModalEditUser, clearModalUserId, setModalObject } from '../../../redux/Slice/ModalSlice';
import { setConponentLoad, setHideLoading, setShowLoading } from '../../../redux/Slice/AppSlice';
import { editInformationUserById } from '../../../api/userAPI';
import { getInformationUserById } from '../../../api/appAPI';
import { adminTokenSelector, modalEditUserSelector, modalObjectSelector, modalUserIdSelector } from '../../../redux/selector';
import { editInformationAdminById, findInformationAdminById } from '../../../api/adminAPI';
import { toast } from 'react-toastify';

function ModalEditUser() {
    const userId = useSelector(modalUserIdSelector)
    const token = useSelector(adminTokenSelector)
    const modalEditUser = useSelector(modalEditUserSelector)
    const modalObject = useSelector(modalObjectSelector)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        email: '',
        dob: '',
        gender: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [editor, setEditor] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setShowLoading())
            if (editor) {
                const canvas = editor.getImageScaledToCanvas();
                const dataURL = canvas.toDataURL();
                formData['avatarImage'] = dataURL;
            }
            if (modalObject === "user") {
                let res = await editInformationUserById(userId, formData, token)
                setFormData({ fullname: '', phone: '', email: '', dob: '', gender: '', role: '' });
                handleCloseEdit();
                dispatch(setConponentLoad())
            }
            else if (modalObject === "admin") {
                let res = await editInformationAdminById(userId, formData, token)
                setFormData({ fullname: '', phone: '', email: '', dob: '', gender: '', role: '' });
                handleCloseEdit();
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
                        toast.error('Bạn không có quyền thay đổi mật khẩu');
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

    const fetchInfoData = async () => {
        if (userId) {
            if (modalObject === "user") {
                let resData = await getInformationUserById(userId, token);
                if (resData) {
                    setFormData({
                        fullname: resData.fullname,
                        phone: resData.phone,
                        email: resData.email,
                        dob: resData.dob,
                        gender: resData.gender
                    })
                }
            }

            else if (modalObject === "admin") {
                let resData = await findInformationAdminById(userId, token);
                if (resData) {
                    setFormData({
                        fullname: resData.fullname,
                        phone: resData.phone,
                        email: resData.email,
                        dob: resData.dob,
                        gender: resData.gender,
                        role: resData.role
                    })
                }
            }
        }
    }

    const handleCloseEdit = () => {
        dispatch(clearModalUserId())
        dispatch(clearModalEditUser())
        dispatch(setModalObject(null))
    }

    useEffect(() => {
        fetchInfoData()
    }, [])

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalEditUser}
        >
            <Modal.Header className='border-none justify-between mt-3 px-5'>
                <h1 className='text-center text-2xl font-bold'>Cập nhật thông tin</h1>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseEdit}></i>
            </Modal.Header>
            <Modal.Body className='p-4 px-5' >
                <Form onSubmit={handleSubmit}>
                    <div className='flex sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-5'>
                        <div className='sm:w-full md:w-full lg:w-1/2 xl:w-1/2'>
                            <Form.Group className='' controlId="formBasicFullname">
                                <Form.Label className='font-semibold text-gray-500'>Họ và tên</Form.Label>
                                <Form.Control
                                    className="p-2 px-3"
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className='mt-2 relative' controlId="formBasicPhone">
                                <Form.Label className='font-semibold text-gray-500'>Điện thoại</Form.Label>
                                <Form.Control
                                    className="p-2 px-3 "
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className='mt-2 relative' controlId="formBasicEmail">
                                <Form.Label className='font-semibold text-gray-500'>Email</Form.Label>
                                <Form.Control
                                    className="p-2 px-3 "
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Label className='mt-2 font-semibold text-gray-500'>Giới tính</Form.Label>
                            <Form.Select value={formData.gender} name="gender" onChange={handleChange}>
                                <option value="">Hãy chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </Form.Select>

                            <Form.Group className='mt-2 relative' controlId="formBasicDOB">
                                <Form.Label className='font-semibold text-gray-500'>Ngày sinh</Form.Label>
                                <Form.Control
                                    className="p-2 px-3 "
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {
                                modalObject === "admin" &&
                                <>
                                    <Form.Label className='mt-2 font-semibold text-gray-500'>Chức vụ</Form.Label>
                                    <Form.Select value={formData.role} name="role" onChange={handleChange}>
                                        <option value="">Hãy chọn chức vụ</option>
                                        <option value="Admin">Quản trị viên</option>
                                        <option value="Staff">Nhân viên</option>
                                    </Form.Select>
                                </>
                            }
                        </div>
                        <div className='text-center sm:w-full md:w-full lg:w-1/2 xl:w-1/2'>
                            <label htmlFor="avaInput" className="rounded-2xl bg-main p-3 mb-2 text-white font-semibold">
                                Chọn ảnh
                            </label>
                            <input type="file" id="avaInput" className='hidden' onChange={handleFileChange} />
                            <div className='w-full flex justify-center'>
                                {selectedFile && (
                                    <div className='sm:h-1/2 md:h-1/2 lg:w-full xl:w-full'>
                                        <AvatarEditor
                                            ref={setEditor}
                                            image={selectedFile}
                                            width={250}
                                            height={250}
                                            border={50}
                                            color={[0, 0, 0, 0.3]} // Màu nền của khung cắt
                                            scale={1}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button variant="primary" type="submit" className="rounded-md mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        Cập nhật
                    </button>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default ModalEditUser