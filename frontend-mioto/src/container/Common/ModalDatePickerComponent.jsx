import Modal from 'react-bootstrap/Modal';
import DatePicker from '../Common/DatePicker';
import { useDispatch } from 'react-redux';
import { setBeginDate, setEndDate } from '../../redux/Slice/SearchSlice';
import { useState } from 'react';


function ModalDatePickerComponent({ showDateModal, handleCloseDateModal }) {
    const dispatch = useDispatch()
    const [beDate, setBeDate] = useState('');
    const [enDate, setEnDate] = useState('');


    const handlePickDate = () => {
        dispatch(setBeginDate(beDate))
        dispatch(setEndDate(enDate))
        handleCloseDateModal()
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showDateModal} onHide={handleCloseDateModal}
        >
            <Modal.Header className='mt-3 flex justify-between mx-3'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={() => handleCloseDateModal()}></i>
                <h2 className='font-semibold text-2xl text-center'>Thời gian</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleCloseDateModal()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-2' >
                <div className='border-2 rounded-md p-4 flex justify-center'>
                    <DatePicker setBeDate={setBeDate} setEnDate={setEnDate} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='p-3 bg-main rounded-lg text-white font-semibold px-4' onClick={handlePickDate}>Tiếp tục</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDatePickerComponent