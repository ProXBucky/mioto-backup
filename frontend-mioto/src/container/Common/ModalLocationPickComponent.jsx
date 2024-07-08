// import { Modal } from "bootstrap"
import Modal from 'react-bootstrap/Modal';
import { setLocation, setLocationCode } from '../../redux/Slice/SearchSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { convertCityName } from '../../utils/convertCityName';

function ModalLocationPickComponent({ showLocationModal, handleCloseLocationModal }) {
    const dispatch = useDispatch()
    const [locationPick, setLocationPick] = useState('');

    const handleLocationChange = (event) => {
        setLocationPick(event.target.value);
    };

    const handleLocationClick = (label) => {
        dispatch(setLocation(label))
        dispatch(setLocationCode(convertCityName(label)))
        handleCloseLocationModal()
    };

    const handlePickLocation = () => {
        dispatch(setLocation(locationPick))
        dispatch(setLocationCode(convertCityName(locationPick)))

        handleCloseLocationModal()
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showLocationModal} onHide={handleCloseLocationModal}
        >
            <Modal.Header className='mt-3 mx-3 flex justify-between'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer invisible" onClick={() => handleCloseLocationModal()}></i>
                <h2 className='font-semibold text-2xl text-center'>Địa điểm</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleCloseLocationModal()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 pt-4 relative' >
                <select className="cursor-pointer text-lg font-semibold py-2 pl-12 pr-12 w-full border-2 rounded-lg outline-none"
                    value={locationPick}
                    onChange={handleLocationChange}>
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="An Giang">An Giang</option>
                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                    <option value="Bạc Liêu">Bạc Liêu</option>
                    <option value="Bắc Kạn">Bắc Kạn</option>
                    <option value="Bắc Giang">Bắc Giang</option>
                    <option value="Bến Tre">Bến Tre</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Bình Định">Bình Định</option>
                    <option value="Bình Phước">Bình Phước</option>
                    <option value="Bình Thuận">Bình Thuận</option>
                    <option value="Cà Mau">Cà Mau</option>
                    <option value="Cao Bằng">Cao Bằng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Đắk Lắk">Đắk Lắk</option>
                    <option value="Đắk Nông">Đắk Nông</option>
                    <option value="Điện Biên">Điện Biên</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Đồng Tháp">Đồng Tháp</option>
                    <option value="Gia Lai">Gia Lai</option>
                    <option value="Hà Giang">Hà Giang</option>
                    <option value="Hà Nam">Hà Nam</option>
                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                    <option value="Hải Dương">Hải Dương</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Hậu Giang">Hậu Giang</option>
                    <option value="Hòa Bình">Hòa Bình</option>
                    <option value="Hưng Yên">Hưng Yên</option>
                    <option value="Khánh Hòa">Khánh Hòa</option>
                    <option value="Kiên Giang">Kiên Giang</option>
                    <option value="Kon Tum">Kon Tum</option>
                    <option value="Lai Châu">Lai Châu</option>
                    <option value="Lâm Đồng">Lâm Đồng</option>
                    <option value="Lạng Sơn">Lạng Sơn</option>
                    <option value="Lào Cai">Lào Cai</option>
                    <option value="Long An">Long An</option>
                    <option value="Nam Định">Nam Định</option>
                    <option value="Nghệ An">Nghệ An</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                    <option value="Ninh Thuận">Ninh Thuận</option>
                    <option value="Phú Thọ">Phú Thọ</option>
                    <option value="Phú Yên">Phú Yên</option>
                    <option value="Quảng Bình">Quảng Bình</option>
                    <option value="Quảng Nam">Quảng Nam</option>
                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Quảng Trị">Quảng Trị</option>
                    <option value="Sóc Trăng">Sóc Trăng</option>
                    <option value="Sơn La">Sơn La</option>
                    <option value="Tây Ninh">Tây Ninh</option>
                    <option value="Thái Bình">Thái Bình</option>
                    <option value="Thái Nguyên">Thái Nguyên</option>
                    <option value="Thanh Hóa">Thanh Hóa</option>
                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                    <option value="Tiền Giang">Tiền Giang</option>
                    <option value="Trà Vinh">Trà Vinh</option>
                    <option value="Tuyên Quang">Tuyên Quang</option>
                    <option value="Vĩnh Long">Vĩnh Long</option>
                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                    <option value="Yên Bái">Yên Bái</option>
                </select>

                <div className='absolute left-10 top-9'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9989 14.1714C9.86891 14.1714 8.12891 12.4414 8.12891 10.3014C8.12891 8.16141 9.86891 6.44141 11.9989 6.44141C14.1289 6.44141 15.8689 8.17141 15.8689 10.3114C15.8689 12.4514 14.1289 14.1714 11.9989 14.1714ZM11.9989 7.94141C10.6989 7.94141 9.62891 9.00141 9.62891 10.3114C9.62891 11.6214 10.6889 12.6814 11.9989 12.6814C13.3089 12.6814 14.3689 11.6214 14.3689 10.3114C14.3689 9.00141 13.2989 7.94141 11.9989 7.94141Z" fill="black"></path><path d="M12.0016 22.76C10.5216 22.76 9.03164 22.2 7.87164 21.09C4.92164 18.25 1.66164 13.72 2.89164 8.33C4.00164 3.44 8.27164 1.25 12.0016 1.25C12.0016 1.25 12.0016 1.25 12.0116 1.25C15.7416 1.25 20.0116 3.44 21.1216 8.34C22.3416 13.73 19.0816 18.25 16.1316 21.09C14.9716 22.2 13.4816 22.76 12.0016 22.76ZM12.0016 2.75C9.09164 2.75 5.35164 4.3 4.36164 8.66C3.28164 13.37 6.24164 17.43 8.92164 20C10.6516 21.67 13.3616 21.67 15.0916 20C17.7616 17.43 20.7216 13.37 19.6616 8.66C18.6616 4.3 14.9116 2.75 12.0016 2.75Z" fill="black"></path></svg>
                </div>
                <div className='h-0 border my-4'></div>
                <div className='flex flex-wrap gap-3'>
                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300' onClick={() => handleLocationClick('Hà Nội')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Hà Nội</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300' onClick={() => handleLocationClick('Hồ Chí Minh')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>TP.HCM</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300' onClick={() => handleLocationClick('Đà Nẵng')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Đà Nẵng</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300' onClick={() => handleLocationClick('Bắc Ninh')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Bắc Ninh</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300' onClick={() => handleLocationClick('Lâm Đồng')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Đà Lạt</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300' onClick={() => handleLocationClick('Kiên Giang')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Phú Quốc</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300' onClick={() => handleLocationClick('Khánh Hòa')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Nha Trang</label>
                    </div>

                    <div className='rounded-3xl border border-gray-400 p-2 px-3 flex flex-row gap-2 justify-center items-center cursor-pointer hover:bg-gray-300' onClick={() => handleLocationClick('Hải Phòng')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2748 2.72494C16.6831 2.13327 15.7248 2.14161 15.1498 2.74994L11.9915 6.04161L4.28314 3.49161L2.66647 5.10827L9.09147 9.06661L5.84147 12.4499L3.75814 12.1083L2.2998 13.5666L5.36647 14.6416L6.44147 17.7083L7.89981 16.2499L7.55814 14.1666L10.9415 10.9166L14.8998 17.3416L16.5165 15.7249L13.9665 8.01661L17.2581 4.85828C17.8498 4.27494 17.8581 3.31661 17.2748 2.72494Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <label className='font-medium text-lg cursor-pointer'>Hải Phòng</label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='p-3 bg-main rounded-lg text-white font-semibold px-4' onClick={handlePickLocation}>Tiếp tục</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLocationPickComponent