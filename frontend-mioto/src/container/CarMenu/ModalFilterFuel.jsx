import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { modalFilterFuelSelector } from '../../redux/selector';
import { clearModalFilterFuel } from '../../redux/Slice/ModalSlice';


function ModalFilterFuel({ selectedFuel, handleRadioChangeFuel, handleApplyFilterFuel }) {
    const dispatch = useDispatch()
    const modalFilterFuel = useSelector(modalFilterFuelSelector)

    const handleCloseModal = () => {
        dispatch(clearModalFilterFuel())
    }

    return (
        <Modal
            size='md'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalFilterFuel} onHide={handleCloseModal}
        >
            <Modal.Header className='mt-2 flex justify-between'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={handleCloseModal}></i>
                <h2 className='font-semibold text-2xl text-center'>Loại nhiên liệu</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <Modal.Body className='p-4 flex flex-col gap-2' >
                <div>
                    <label htmlFor={`radio-1`} className='flex flex-row items-center gap-2 cursor-pointer'>
                        <input
                            type="radio"
                            id={`radio-1`}
                            value={"Tất cả"}
                            checked={selectedFuel === "Tất cả"}
                            onChange={handleRadioChangeFuel}
                            className="form-radio h-4 w-4 hidden"
                        />
                        {
                            selectedFuel === "Tất cả" ?
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
                            value={"Xăng"}
                            checked={selectedFuel === "Xăng"}
                            onChange={handleRadioChangeFuel}
                            className="form-radio h-4 w-4 hidden"
                        />
                        {
                            selectedFuel === "Xăng" ?
                                <i className={`fa-solid fa-circle-dot text-green-400`}></i>
                                :
                                <i className="fa-regular fa-circle text-gray-300"></i>
                        }
                        <p className='text-lg'>
                            Xăng
                        </p>
                    </label>
                </div>
                <div>
                    <label htmlFor={`radio-3`} className='flex flex-row items-center gap-2 cursor-pointer'>
                        <input
                            type="radio"
                            id={`radio-3`}
                            value={"Dầu diesel"}
                            checked={selectedFuel === "Dầu diesel"}
                            onChange={handleRadioChangeFuel}
                            className="form-radio h-4 w-4 hidden"
                        />
                        {
                            selectedFuel === "Dầu diesel" ?
                                <i className={`fa-solid fa-circle-dot text-green-400`}></i>
                                :
                                <i className="fa-regular fa-circle text-gray-300"></i>
                        }
                        <p className='text-lg'>
                            Dầu diesel
                        </p>
                    </label>
                </div >
                <div>
                    <label htmlFor={`radio-4`} className='flex flex-row items-center gap-2 cursor-pointer'>
                        <input
                            type="radio"
                            id={`radio-4`}
                            value={"Điện"}
                            checked={selectedFuel === "Điện"}
                            onChange={handleRadioChangeFuel}
                            className="form-radio h-4 w-4 hidden"
                        />
                        {
                            selectedFuel === "Điện" ?
                                <i className={`fa-solid fa-circle-dot text-green-400`}></i>
                                :
                                <i className="fa-regular fa-circle text-gray-300"></i>
                        }
                        <p className='text-lg'>
                            Điện
                        </p>
                    </label>
                </div >
            </Modal.Body>
            <Modal.Footer>
                <button className="w-full p-3 bg-main text-white rounded-md font-semibold text-lg" onClick={handleApplyFilterFuel}>Áp dụng</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalFilterFuel