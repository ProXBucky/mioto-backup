import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminTokenSelector, modalChangePasswordUserSelector, modalObjectSelector, modalUserIdSelector } from "../../../redux/selector";
import { ModalBody } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { clearModalChangePasswordUser, clearModalUserId, setModalObject } from "../../../redux/Slice/ModalSlice";
import { changePasswordAdmin, changePasswordUser } from "../../../api/adminAPI";
import Form from 'react-bootstrap/Form';
import { setConponentLoad, setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";
import { toast } from "react-toastify";

function ModalChangePassword() {
    const dispatch = useDispatch()
    const token = useSelector(adminTokenSelector)
    const userId = useSelector(modalUserIdSelector);
    const modalChangePasswordUser = useSelector(modalChangePasswordUserSelector)
    const modalObject = useSelector(modalObjectSelector)

    const [formData, setFormData] = useState({
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCloseModal = () => {
        dispatch(clearModalUserId())
        dispatch(clearModalChangePasswordUser())
        dispatch(setModalObject(null))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setShowLoading())
            if (modalObject === "user") {
                let res = await changePasswordUser(userId, formData.password, token)
                if (res) {
                    handleCloseModal()
                    dispatch(setConponentLoad())
                }
            }
            else if (modalObject === "admin") {
                let res = await changePasswordAdmin(userId, formData.password, token)
                if (res) {
                    handleCloseModal()
                    dispatch(setConponentLoad())
                }
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

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalChangePasswordUser}
        >
            <Modal.Header className='border-none justify-between mt-3 px-10'>
                <h2 className="text-2xl font-bold">Thay đổi mật khẩu</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <ModalBody className="px-10">
                <Form onSubmit={handleSubmit}>
                    <div className='w-full'>
                        <Form.Group className='' controlId="formBasicFullname">
                            <Form.Label className='font-semibold text-gray-500'>Mật khẩu mới</Form.Label>
                            <Form.Control
                                className="p-2 px-3"
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                    <button type="submit" className="rounded-md mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        Cập nhật
                    </button>
                </Form>
            </ModalBody>
        </Modal>
    )

}

export default ModalChangePassword