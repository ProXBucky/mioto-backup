import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { modalFilterTransSelector } from '../../redux/selector';
import { clearModalFilterTrans } from '../../redux/Slice/ModalSlice';


function ModalFilterTrans({ selectedTrans, handleRadioChangeTrans, handleApplyFilterTrans }) {
    const dispatch = useDispatch()
    const modalFilterTrans = useSelector(modalFilterTransSelector)

    const handleCloseModal = () => {
        dispatch(clearModalFilterTrans())
    }

    return (
        <Modal
            size='md'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalFilterTrans} onHide={handleCloseModal}
        >
            <Modal.Header className='mt-2 flex justify-between'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={handleCloseModal}></i>
                <h2 className='font-semibold text-2xl text-center'>Truyền động</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <Modal.Body className='p-4 flex flex-col gap-2' >
                <div>
                    <label htmlFor={`radio-1`} className='flex flex-row items-center gap-2 cursor-pointer'>
                        <input
                            type="radio"
                            id={`radio-1`}
                            value={"Tất cả"}
                            checked={selectedTrans === "Tất cả"}
                            onChange={handleRadioChangeTrans}
                            className="form-radio h-4 w-4 hidden"
                        />
                        {
                            selectedTrans === "Tất cả" ?
                                <i className={`fa-solid fa-circle-dot text-green-400`}></i>
                                :
                                <i className="fa-regular fa-circle text-gray-300"></i>
                        }
                        <p className='text-lg'>
                            Tất cả
                        </p>
                    </label>
                </div>
                <div>
                    <label htmlFor={`radio-2`} className='flex flex-row items-center gap-2 cursor-pointer'>
                        <input
                            type="radio"
                            id={`radio-2`}
                            value={"Số tự động"}
                            checked={selectedTrans === "Số tự động"}
                            onChange={handleRadioChangeTrans}
                            className="form-radio h-4 w-4 hidden"
                        />
                        {
                            selectedTrans === "Số tự động" ?
                                <i className={`fa-solid fa-circle-dot text-green-400`}></i>
                                :
                                <i className="fa-regular fa-circle text-gray-300"></i>
                        }
                        <p className='text-lg'>
                            Số tự động
                        </p>
                    </label>
                </div>
                <div>
                    <label htmlFor={`radio-3`} className='flex flex-row items-center gap-2 cursor-pointer'>
                        <input
                            type="radio"
                            id={`radio-3`}
                            value={"Số sàn"}
                            checked={selectedTrans === "Số sàn"}
                            onChange={handleRadioChangeTrans}
                            className="form-radio h-4 w-4 hidden"
                        />
                        {
                            selectedTrans === "Số sàn" ?
                                <i className={`fa-solid fa-circle-dot text-green-400`}></i>
                                :
                                <i className="fa-regular fa-circle text-gray-300"></i>
                        }
                        <p className='text-lg'>
                            Số sàn
                        </p>
                    </label>
                </div >
            </Modal.Body >
            <Modal.Footer>
                <button className="w-full p-3 bg-main text-white rounded-md font-semibold text-lg" onClick={handleApplyFilterTrans}>Áp dụng</button>
            </Modal.Footer>
        </Modal >
    )
}

export default ModalFilterTrans