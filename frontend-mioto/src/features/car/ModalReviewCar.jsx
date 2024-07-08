import Modal from 'react-bootstrap/Modal';
import Rating from 'react-rating';


function ModalReviewCar({ showModalReview, handleCloseModalReview, handleRatingChange, handleChange, rating, text, handleReviewCar }) {

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalReview} onHide={handleCloseModalReview}
        >
            <Modal.Header className='mt-3 flex justify-between'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={() => handleCloseModalReview()}></i>
                <h2 className='font-semibold text-2xl text-center'>Đánh giá xe</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleCloseModalReview()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-4 flex flex-col items-center gap-3' >
                <Rating
                    initialRating={rating}
                    onChange={handleRatingChange}
                    fractions={2}
                    emptySymbol={<i className="far fa-star" style={{ color: '#dcdcdc', fontSize: '40px' }}></i>}
                    fullSymbol={<i className="fas fa-star" style={{ color: '#ffd700', fontSize: '40px' }}></i>}
                    readonly={false}
                    direction="ltr"
                />
                <textarea
                    id="fullWidthTextarea"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={text}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Nhập đánh giá của bạn..."
                />
            </Modal.Body>
            <Modal.Footer>
                <button className='p-3 bg-main rounded-lg text-white font-semibold px-4' onClick={handleReviewCar}>Đánh giá</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalReviewCar