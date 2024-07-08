import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalCarIdSelector, modalViewCarSelector } from "../../../redux/selector";
import { ModalBody } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { clearModalCarId, clearModalViewCar } from "../../../redux/Slice/ModalSlice";
import { getDetailCar } from "../../../api/carAPI";
import { formatMoney } from "../../../utils/formatMoney";
import { format } from "date-fns";

function ModalViewCar() {
    const dispatch = useDispatch()
    const carId = useSelector(modalCarIdSelector);
    const modalViewCar = useSelector(modalViewCarSelector)
    const [car, setCar] = useState({})
    const [userInfo, setUserInfo] = useState({})

    const fetchDataCar = async () => {
        if (carId) {
            let res = await getDetailCar(carId)
            if (res) {
                setCar(res)
                if (res.user) {
                    setUserInfo(res.user)
                }
            } else {
                setCar({})
            }
        }
    }


    const handleCloseModal = () => {
        dispatch(clearModalCarId())
        dispatch(clearModalViewCar())
    }

    useEffect(() => {
        fetchDataCar()
    }, [])

    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="custom-modal"
            centered
            show={modalViewCar}
        >
            <Modal.Header className='border-none justify-between mt-3 px-10'>
                <h2 className="sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-bold">Thông tin phương tiện</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <ModalBody>
                <div className='px-3' >
                    <div className={"w-full bg-white"} >
                        <div className="bg-white sm:px-0 md:px-4 lg:px-4 xl:px-4" >
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-full flex justify-center items-center p-3">
                                    <div className="rounded-full overflow-hidden border-2">
                                        <img loading="lazy" className="sm:h-24 md:h-48 lg:h-48 xl:h-48" src={userInfo && userInfo.avatarImage ? userInfo.avatarImage : '/avaMale.png'} />
                                    </div>
                                </div>
                                <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 text-gray-500">
                                    <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-3">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-sm">Họ và tên</p>
                                            <span className="text-black text-base font-semibold">{userInfo && userInfo.fullname && userInfo.fullname}</span>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p className="text-sm">Ngày sinh</p>
                                            <span className="text-black text-base font-semibold">{userInfo && userInfo.dob ? format(userInfo.dob, 'dd-MM-yyyy') : '----/----/--------'}</span>
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <p className="text-sm">Giới tính</p>
                                            <span className="text-black text-base font-semibold">{userInfo && userInfo.gender ? userInfo.gender : 'Chưa cập nhật'}</span>
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <p className="text-sm">Số điện thoại</p>
                                            <span className="text-black text-base font-semibold">{userInfo && userInfo.phone ? userInfo.phone : 'Chưa cập nhật'}</span>
                                        </div>

                                        <div className="flex flex-row justify-between">
                                            <p className="text-sm">Email</p>
                                            <span className="text-black text-base font-semibold">{userInfo && userInfo.email ? userInfo.email : 'Chưa cập nhật'}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div >

                        <div className='mt-5'>
                            <div className="flex flex-row gap-3 w-full">
                                <label className='font-bold text-xl'>Biển số xe</label>
                                <span className="text-xl font-semibold">{car.plateNumber}</span>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className="flex flex-col gap-3 w-full">
                                <label className='font-bold text-xl'>Thông tin cơ bản</label>
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex-row gap-2 items-center flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label htmlFor="brand">Hãng xe</label>
                                        <span className="sm:text-sm md:text-base lg:text-base xl:text-base font-semibold">{car.brand}</span>
                                    </div>

                                    <div className="flex-row gap-2 items-center flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label htmlFor="model">Mẫu xe</label>
                                        <span className="sm:text-sm md:text-base lg:text-base xl:text-base font-semibold">{car.model}</span>
                                    </div>
                                    <div className="flex-row gap-2 items-center flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label htmlFor="year">Năm sản xuất</label>
                                        <span className="sm:text-sm md:text-base lg:text-base xl:text-base font-semibold">{car.modelYear}</span>
                                    </div>


                                    <div className="flex-row gap-2 items-center flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label>Truyền động</label>
                                        <span className="sm:text-sm md:text-base lg:text-base xl:text-base font-semibold">{car.transmission}</span>
                                    </div>

                                    <div className="flex-row gap-2 items-center flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label>Loại nhiên liệu</label>
                                        <span className="sm:text-sm md:text-base lg:text-base xl:text-base font-semibold">{car.fuelType}</span>
                                    </div>

                                    <div className="flex-row gap-2 items-center flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label htmlFor="capacity">Số ghế</label>
                                        <span className="sm:text-sm md:text-base lg:text-base xl:text-base font-semibold">{car.capacity}</span>
                                    </div>


                                </div>

                            </div>
                        </div>

                        <div className='mt-3'>
                            <div className="flex flex-col gap-1 w-full">
                                <label className='font-bold text-xl'>Mô tả</label>
                                <p>{car.description}</p>
                            </div>
                        </div>



                        <div className='mt-3'>
                            <div className="flex flex-col gap-3 w-full">
                                <label className='font-bold text-xl'>Tính năng</label>
                                <div className="mt-3 flex flex-wrap gap-5 w-full">
                                    <div className="list-feature flex flex-wrap gap-3 w-full">
                                        {
                                            car && car.carFeatures && car.carFeatures.length > 0 &&
                                            car.carFeatures.map((item, index) => {
                                                return (
                                                    <div className="squaredThree have-label cursor-pointer border sm:w-[calc(50%-10px)] md:w-[calc(24%-10px)] lg:w-[calc(16%-10px)] xl:w-[calc(16%-10px)]" key={index}>
                                                        <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                            <img loading="lazy" className="img-fluid h-7" src={item.feature.featureIcon}
                                                                alt={item.feature.featureName} />
                                                            <span>{item.feature.featureName}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div >

                            </div >
                        </div >


                        <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:gap-4 justify-between mt-5">
                            <div className='sm:w-full md:w-[45%] lg:w-[45%] xl:w-[45%]'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Đơn giá thuê mặc định</label>
                                    {/* <p className="text-sm text-gray-600">Đơn giá áp dụng cho tất cả các ngày. Bạn có thuể tuỳ chỉnh giá khác cho các ngày đặc biệt (cuối tuần, lễ, tết...) trong mục quản lý xe sau khi đăng kí.</p> */}
                                    <div className="flex flex-row items-center gap-2">
                                        <span className="text-xl font-normal">{formatMoney(car.pricePerDay * 1000)}</span>
                                        <label>(VND)</label>
                                    </div>
                                </div>
                            </div>

                            <div className='sm:w-full md:w-[45%] lg:w-[45%] xl:w-[45%]'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Giá cọc khi thuê xe</label>
                                    {/* <p className="text-sm text-gray-600">Nếu không cần cọc thì để trống.</p> */}
                                    <div className="flex flex-row items-center gap-2">
                                        <span className="text-xl font-normal">{car.mortgage ? formatMoney(car.mortgage * 1000) : "Không cần cọc"}</span>
                                        {!car.mortgage ? formatMoney(car.mortgage * 1000) : <label>(VND)</label>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <label className='font-bold text-xl mb-2'>Địa chỉ giao xe</label>
                            <span className="text-lg block font-normal">{car.streetAddress} - {car.ward} - {car.district} - {car.city}</span>
                        </div>

                        <div className='mt-5'>
                            <label className='font-bold text-xl mb-2 block'>Hình ảnh xe</label>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {
                                    car && car.images && car.images.length > 0
                                    && car.images.map((image, index) => {
                                        return (
                                            <img loading="lazy"
                                                className="cursor-pointer rounded-md"
                                                key={index}
                                                src={image.imageLink}
                                                alt={`Image ${index}`}
                                                style={{ maxWidth: '200px', maxHeight: '150px', margin: '25px' }}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div >
                </div >
            </ModalBody>
        </Modal>
    )

}

export default ModalViewCar