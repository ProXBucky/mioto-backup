import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { modalFilterBrandSelector } from '../../redux/selector';
import { clearModalFilterBrand } from '../../redux/Slice/ModalSlice';
import carBrands from '../../features/car/brandCar.json';

function ModalFilterBrand({ selectedBrand, handleRadioChange, handleApplyFilter }) {
    const dispatch = useDispatch();
    const modalFilterBrand = useSelector(modalFilterBrandSelector);

    const handleCloseModal = () => {
        dispatch(clearModalFilterBrand());
    };

    // Chia danh sách hãng xe thành hai mảng con cho hai cột
    const halfLength = Math.ceil(carBrands.brands.length / 2);
    const brandsLeftColumn = carBrands.brands.slice(0, halfLength);
    const brandsRightColumn = carBrands.brands.slice(halfLength);

    return (
        <Modal
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalFilterBrand}
            onHide={handleCloseModal}
        >
            <Modal.Header className='mt-2 flex justify-between'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={handleCloseModal}></i>
                <h2 className='font-semibold text-2xl text-center'>Hãng xe</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <Modal.Body className='sm:p-2 md:p-4 lg:p-4 xl:p-4 flex justify-between'>
                <div className='w-1/2 px-6'>
                    {brandsLeftColumn.map((brand, index) => (
                        <div key={index} className='mt-2'>
                            <label htmlFor={`radio-${index}`} className='flex flex-row items-center gap-2 cursor-pointer'>
                                <input
                                    type="radio"
                                    id={`radio-${index}`}
                                    value={brand.name}
                                    checked={selectedBrand === brand.name}
                                    onChange={handleRadioChange}
                                    className="form-radio h-4 w-4 hidden"
                                />
                                {
                                    selectedBrand === brand.name ?
                                        <i className={`fa-solid fa-circle-dot text-green-400`}></i>
                                        :
                                        <i className="fa-regular fa-circle text-gray-300"></i>
                                }
                                {
                                    brand.logo &&
                                    <img loading="lazy" className='h-6' src={brand.logo} />
                                }
                                <p className='text-lg'>
                                    {brand.name}
                                </p>
                            </label>
                        </div>
                    ))}
                </div>
                <div className='w-1/2'>
                    {brandsRightColumn.map((brand, index) => (
                        <div key={index} className='mt-2'>
                            <label htmlFor={`radio-${halfLength + index}`} className='flex flex-row items-center gap-2 cursor-pointer'>
                                <input
                                    type="radio"
                                    id={`radio-${halfLength + index}`}
                                    value={brand.name}
                                    checked={selectedBrand === brand.name}
                                    onChange={handleRadioChange}
                                    className="form-radio h-4 w-4 hidden"
                                />
                                {
                                    selectedBrand === brand.name ?
                                        <i className={`fa-solid fa-circle-dot text-green-400`}></i>
                                        :
                                        <i className="fa-regular fa-circle text-gray-300"></i>
                                }
                                <img loading="lazy" className='h-6' src={brand.logo} />
                                <p className='text-lg'>
                                    {brand.name}
                                </p>
                            </label>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="w-full p-3 bg-main text-white rounded-md font-semibold text-lg" onClick={handleApplyFilter}>Áp dụng</button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalFilterBrand;
