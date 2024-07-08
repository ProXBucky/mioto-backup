import Modal from 'react-bootstrap/Modal';
import MapComponent from '../../container/Common/MapComponent';


function ModalViewMap({ showModalMap, handleCloseModalMap, locationName }) {
    let today = new Date()
    return (
        <Modal
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalMap} onHide={handleCloseModalMap}
        >
            <Modal.Header className='mt-3 flex justify-between'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={() => handleCloseModalMap()}></i>
                <h2 className='font-semibold text-2xl text-center'>Bản đồ</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleCloseModalMap()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 flex flex-col gap-4' >
                <MapComponent locationName={locationName} />
            </Modal.Body>
        </Modal>
    )
}

export default ModalViewMap