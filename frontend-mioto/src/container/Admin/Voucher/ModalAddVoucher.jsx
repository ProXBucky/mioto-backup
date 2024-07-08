import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { clearModalAddVoucher } from '../../../redux/Slice/ModalSlice';
import { setConponentLoad, setHideLoading, setShowLoading } from '../../../redux/Slice/AppSlice';
import { adminTokenSelector, modalAddVoucherSelector, } from '../../../redux/selector';
import { createNewVoucher } from '../../../api/adminAPI';
import { toast } from 'react-toastify';

function ModalAddVoucher() {
    const modalAddVoucher = useSelector(modalAddVoucherSelector)
    const adminToken = useSelector(adminTokenSelector)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        voucherCode: '',
        type: '',
        expireDate: '',
        discountPercent: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setShowLoading())
            if (!formData.voucherCode || !formData.type || !formData.expireDate || !formData.discountPercent || !formData.description) {
                toast.error("Thiếu dữ liệu")
            }
            const res = await createNewVoucher({
                voucherCode: formData.voucherCode,
                type: formData.type,
                expireDate: formData.expireDate,
                discountPercent: formData.discountPercent,
                description: formData.description
            }, adminToken)
            if (res) {
                handleCloseModal()
                toast.success("Tạo mới mã giảm giá thành công")
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
                        toast.error('Bạn không có quyền tạo mới');
                        break;
                    default:
                        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        }
        finally {
            dispatch(setHideLoading())
        }
    };

    const handleCloseModal = () => {
        dispatch(clearModalAddVoucher())
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="custom-modal"
            show={modalAddVoucher}
        >
            <Modal.Header className='border-none justify-between mt-3 px-5'>
                <h1 className='text-center sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-bold'>Tạo mã giảm giá</h1>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <Modal.Body className='p-4 px-5' >
                <Form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <div className='w-full flex sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:gap-2 justify-between items-start'>
                            <div className='sm:w-full md:w-[45%] lg:w-[45%] xl:w-[45%]'>
                                <Form.Group className='mt-2 relative' controlId="formBasicFullname">
                                    <Form.Label className='font-semibold text-gray-500'>Mã giảm giá</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3"
                                        type="text"
                                        name="voucherCode"
                                        value={formData.voucherCode}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className='mt-2 relative' controlId="formBasicDOB">
                                    <Form.Label className='font-semibold text-gray-500'>Hạn sử dụng</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3 "
                                        type="date"
                                        name="expireDate"
                                        value={formData.expireDate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className='sm:w-full md:w-[45%] lg:w-[45%] xl:w-[45%]'>
                                <Form.Label className='font-semibold text-gray-500 mt-2 relative'>Thể loại</Form.Label>
                                <Form.Select value={formData.type} name="type" onChange={handleChange}>
                                    <option value="">Hãy chọn thể loại</option>
                                    <option value="money">Giảm trực tiếp</option>
                                    <option value="percent">Giảm theo phần trăm</option>
                                </Form.Select>

                                <Form.Group className='mt-2 relative' controlId="formBasicEmail">
                                    <Form.Label className='font-semibold text-gray-500'>Giá trị</Form.Label>
                                    <Form.Control
                                        className="p-2 px-3 "
                                        type="number"
                                        name="discountPercent"
                                        value={formData.discountPercent}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className='mt-2 relative' controlId="formBasicFullname">
                            <Form.Label className='font-semibold text-gray-500'>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Nhập mô tả tại đây"
                            />
                        </Form.Group>
                    </div>

                    <button type="submit" className="rounded-md mt-4 w-full py-3 text-lg font-semibold border-none text-white bg-main hover:opacity-80">
                        Tạo mới
                    </button>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default ModalAddVoucher