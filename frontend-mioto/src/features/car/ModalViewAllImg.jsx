import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from 'react-bootstrap/Modal';

function ModalViewAllImg({ showModalViewImg, handleCloseModalViewImg, allImgCar }) {

    return (
        <>
            <Modal
                size="lg"
                className="bg-gray-200"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalViewImg} onHide={handleCloseModalViewImg}
                fullscreen
            >
                <Modal.Header className='border-none justify-end mt-3'>
                    <i className="fa-solid fa-x fa-2xl cursor-pointer" onClick={handleCloseModalViewImg}></i>
                </Modal.Header>
                <ImageGallery showIndex={true} showFullscreenButton={false} showThumbnails={false} items={allImgCar && allImgCar.length > 0 && allImgCar}></ImageGallery>
            </Modal>
        </>
    )
}

export default ModalViewAllImg