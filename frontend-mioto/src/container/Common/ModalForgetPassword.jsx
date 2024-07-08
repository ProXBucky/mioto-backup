import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { setHideLoading, setShowLoading } from '../../redux/Slice/AppSlice';
import { toast } from 'react-toastify';
import { resetPassword } from '../../api/authAPI';
import { useDispatch } from 'react-redux';

function ModalForgetPassword({ showModalForgetPassword, handleCloseModalForgetPassword }) {
    const [formData, setFormData] = useState({
        email: ''
    });
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitModalForgetPassword = async (e) => {
        e.preventDefault()
        try {
            dispatch(setShowLoading())
            let res = await resetPassword({ email: formData.email })
            if (res) {
                toast.success("Mật khẩu mới đã được gửi tới gmail của bạn.")
                handleCloseModalForgetPassword()
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 404:
                        toast.error('Gmail này chưa được đăng ký tài khoản');
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

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalForgetPassword} onHide={handleCloseModalForgetPassword}
        >
            <Modal.Header className='border-none justify-end mt-3'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleCloseModalForgetPassword()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <Form onSubmit={handleSubmitModalForgetPassword}>
                    <h1 className='text-center text-2xl font-semibold'>Quên mật khẩu</h1>
                    <Form.Group className='' controlId="formBasicUsername">
                        <Form.Label className='font-semibold text-gray-500'>Email</Form.Label>
                        <Form.Control
                            className="p-2 px-3"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <button type="submit" className="rounded-md mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        Gửi
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalForgetPassword