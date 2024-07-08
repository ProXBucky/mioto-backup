import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import AvatarEditor from 'react-avatar-editor';
import { editInformationUserById } from "../../api/userAPI"
import { getInformationUserById } from "../../api/appAPI"
import { tokenSelector, userIdSelector } from '../../redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import { setHideLoading, setShowLoading } from '../../redux/Slice/AppSlice';

function ModalEditComponent({ showModalEdit, handleCloseEdit }) {
    const userId = useSelector(userIdSelector);
    const token = useSelector(tokenSelector)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        email: '',
        dob: '',
        gender: ''
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
            let res = await editInformationUserById(userId, formData, token)              //FIX-DATA
            setFormData({ fullname: '', phone: '', email: '', dob: '', gender: '' });
            handleCloseEdit();
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setHideLoading())
        }
    };

    const fetchInfoData = async () => {
        if (userId) {
            let resData = await getInformationUserById(userId, token);
            if (resData) {
                setFormData({
                    fullname: resData.fullname,
                    phone: resData.phone,
                    email: resData.email,
                    dob: resData.dob,
                    gender: resData.gender
                })
                // setSelectedFile(resData.avatarImage)
            }
        }
    }

    useEffect(() => {
        fetchInfoData()
    }, [])

    useEffect(() => {
        fetchInfoData()
    }, [userId, showModalEdit])

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalEdit} onHide={handleCloseEdit}
            responsive
        >
            <Modal.Header className='border-none justify-end mt-3'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleCloseEdit()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <Form onSubmit={handleSubmit}>
                    <h1 className='text-center text-2xl font-semibold mb-5'>Cập nhật thông tin</h1>
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

                            <Form.Label className='font-semibold text-gray-500'>Giới tính</Form.Label>
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
                        </div>
                        <div className='text-center sm:w-full md:w-full lg:w-1/2 xl:w-1/2'>
                            <label htmlFor="avaInput" className="rounded-2xl bg-main p-3 mb-2 text-white font-semibold">
                                Chọn ảnh
                            </label>
                            <input type="file" id="avaInput" className='hidden' onChange={handleFileChange} />
                            <div className='flex justify-center w-full border-2'>
                                {selectedFile && (
                                    <div className='sm:h-1/2 md:h-1/2 lg:w-full xl:w-full'>
                                        <AvatarEditor
                                            ref={setEditor}
                                            image={selectedFile}
                                            width={250}
                                            height={250}
                                            border={50}
                                            color={[0, 0, 0, 0.5]} // Màu nền của khung cắt
                                            scale={1}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="rounded-md mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        Cập nhật
                    </button>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default ModalEditComponent