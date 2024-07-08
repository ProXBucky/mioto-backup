import Modal from 'react-bootstrap/Modal';


function ModalReportCar({ showModalReport, handleCloseModalReport, handleChangeReason, reason, handleReportCar }) {

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalReport} onHide={handleCloseModalReport}
        >
            <Modal.Header className='mt-3 flex justify-between'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={() => handleCloseModalReport()}></i>
                <h2 className='font-semibold text-2xl text-center'>Báo xấu</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleCloseModalReport()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-4 flex flex-col items-center gap-3' >
                <textarea
                    id="fullWidthTextarea"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={reason}
                    onChange={handleChangeReason}
                    rows="5"
                    placeholder="Nhập lý do báo cáo của bạn..."
                />
            </Modal.Body>
            <Modal.Footer>
                <button className='p-3 bg-main rounded-lg text-white font-semibold px-4 w-full' onClick={handleReportCar}>Báo cáo</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalReportCar