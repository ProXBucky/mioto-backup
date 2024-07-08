import { useEffect, useState } from "react"
import { getListCarByCityByAdmin } from "../../../api/carAPI"
import { setModalAddCar, setModalCarId, setModalEditCar, setModalViewCar } from "../../../redux/Slice/ModalSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { confimCarByAdmin, deleteCar } from "../../../api/adminAPI"
import { adminTokenSelector, componentLoadSelector } from "../../../redux/selector"
import { setConponentLoad, setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice"
import CitySelect from "../../../component/CitySelect"
import { convertCityName } from "../../../utils/convertCityName"


function ManageCar() {
    const [carArray, setCars] = useState([])
    const dispatch = useDispatch()
    const adminToken = useSelector(adminTokenSelector)

    const handleOpenModalCreate = () => {
        dispatch(setModalAddCar())
    }

    const handleOpenModalView = (carId) => {
        dispatch(setModalCarId(carId))
        dispatch(setModalViewCar())

    }

    const handleOpenModalEdit = (carId) => {
        dispatch(setModalCarId(carId))
        dispatch(setModalEditCar())
    }

    const handleOpenModalDelete = async (carId) => {
        try {
            if (window.confirm("Bạn có xóa phương tiện này không?")) {
                dispatch(setShowLoading())
                let res = await deleteCar(carId, adminToken)
                if (res) {
                    toast.success("Xóa thành công")
                    fetchAllCars(selectedCity)
                }
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Bạn chưa được cấp quyền');
                        break;
                    case 403:
                        toast.error('Bạn không có quyền xóa');
                        break;
                    default:
                        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        } finally {
            dispatch(setHideLoading())
        }
    }

    const handleConfirmCar = async (carId) => {
        try {
            dispatch(setShowLoading())
            let res = await confimCarByAdmin(carId, adminToken)
            if (res) {
                toast.success("Xác thực thành công")
                dispatch(setConponentLoad())
            }
        } catch (err) {
            console.log(err)
            toast.error("Lỗi hệ thống")
        } finally {
            dispatch(setHideLoading())
        }

    }

    const [selectedCity, setSelectedCity] = useState('Hà Nội');

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const fetchAllCars = async (cityCode) => {
        let res = await getListCarByCityByAdmin(convertCityName(cityCode), adminToken)
        if (res && res.length > 0) {
            setCars(res)
        } else {
            setCars([])
        }
    }


    useEffect(() => {
        fetchAllCars(selectedCity)
    }, [])

    const load = useSelector(componentLoadSelector)

    useEffect(() => {
        fetchAllCars(selectedCity)
    }, [selectedCity, load])


    return (
        <div className="w-full">
            <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:gap-4 justify-between">
                <h2 className="font-bold text-xl">Phương tiện</h2>
                <button className="py-2 px-3 bg-black text-white font-semibold rounded-md" onClick={handleOpenModalCreate}><i className="fa-solid fa-plus mr-2"></i>Thêm phương tiện</button>
            </div>
            <div className="sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
                <CitySelect value={selectedCity} onChange={handleCityChange} />
            </div>

            <div className="flex lg:flex-col xl:flex-col flex-wrap gap-3 mt-4 pb-10">
                {
                    carArray && carArray.length > 0 ?
                        carArray.map((car, index) => {
                            return (
                                <div className="sm:w-full md:w-[48%] lg:w-full xl:w-full bg-white rounded-xl border-2 flex flex-col items-center">
                                    <div className="w-full p-3 flex sm:flex-col md:flex-col lg:flex-row xl:flex-row cursor-pointer" key={index}>
                                        <div className="sm:w-full md:w-full lg:w-3/12 xl:w-3/12 relative flex justify-center">
                                            <img loading="lazy" src={car.images && car.images[0] && car.images[0].imageLink} className="rounded-xl w-full" />
                                        </div>
                                        <div className="sm:w-full md:w-full lg:w-5/12 xl:w-5/12 sm:mt-2 md:mt-2 lg:px-10 xl:px-10">
                                            <div className="flex-col flex">
                                                <span className="sm:text-xs md:text-sm lg:text-base xl:text-base font-bold">
                                                    {`${car.model && car.model} ${car.modelYear && car.modelYear}`}
                                                </span>
                                                <span className="sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold">
                                                    {`${car.plateNumber && car.plateNumber}`}
                                                </span>
                                                <div className="w-full flex gap-2 text-sm">
                                                    <div className="flex flex-row justify-center items-center gap-1">
                                                        <svg width="20" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M14.667 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.334 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path></svg>
                                                        <span className="font-semibold text-sm">{car.capacity && car.capacity} chỗ</span>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center gap-1">
                                                        <svg width="20" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.9163 7.99992C25.9163 9.05846 25.0582 9.91659 23.9997 9.91659C22.9411 9.91659 22.083 9.05846 22.083 7.99992C22.083 6.94137 22.9411 6.08325 23.9997 6.08325C25.0582 6.08325 25.9163 6.94137 25.9163 7.99992Z" stroke="#5FCF86" strokeWidth="1.5"></path><circle cx="23.9997" cy="23.9999" r="1.91667" stroke="#5FCF86" strokeWidth="1.5"></circle><path d="M17.9163 7.99992C17.9163 9.05846 17.0582 9.91659 15.9997 9.91659C14.9411 9.91659 14.083 9.05846 14.083 7.99992C14.083 6.94137 14.9411 6.08325 15.9997 6.08325C17.0582 6.08325 17.9163 6.94137 17.9163 7.99992Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.9163 23.9999C17.9163 25.0585 17.0582 25.9166 15.9997 25.9166C14.9411 25.9166 14.083 25.0585 14.083 23.9999C14.083 22.9414 14.9411 22.0833 15.9997 22.0833C17.0582 22.0833 17.9163 22.9414 17.9163 23.9999Z" stroke="#5FCF86" strokeWidth="1.5"></path><circle cx="7.99967" cy="7.99992" r="1.91667" stroke="#5FCF86" strokeWidth="1.5"></circle><path d="M10.1025 26.6666V21.3333H7.99837C7.59559 21.3333 7.25184 21.4053 6.96712 21.5494C6.68066 21.6918 6.46278 21.894 6.31348 22.1562C6.16244 22.4166 6.08691 22.723 6.08691 23.0754C6.08691 23.4296 6.1633 23.7343 6.31608 23.9895C6.46886 24.243 6.69021 24.4374 6.98014 24.5728C7.26834 24.7083 7.6173 24.776 8.02702 24.776H9.43587V23.8697H8.20931C7.99403 23.8697 7.81521 23.8402 7.67285 23.7812C7.53049 23.7221 7.42459 23.6336 7.35514 23.5155C7.28396 23.3975 7.24837 23.2508 7.24837 23.0754C7.24837 22.8984 7.28396 22.7491 7.35514 22.6275C7.42459 22.506 7.53136 22.414 7.67546 22.3515C7.81782 22.2872 7.9975 22.2551 8.21452 22.2551H8.97493V26.6666H10.1025ZM7.22233 24.2395L5.89681 26.6666H7.1416L8.43848 24.2395H7.22233Z" fill="#5FCF86"></path><path d="M24 10.6665V15.9998M24 21.3332V15.9998M16 10.6665V21.3332M8 10.6665V15.4998C8 15.776 8.22386 15.9998 8.5 15.9998H24" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                                        <span className="font-semibold text-sm">{car.transmission && car.transmission}</span>
                                                    </div>
                                                    <div className="flex flex-row justify-center items-center gap-1">
                                                        <svg width="20" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.3337 27.2499H7.66699C7.52892 27.2499 7.41699 27.138 7.41699 26.9999V12.4599C7.41699 12.3869 7.44888 12.3175 7.5043 12.27L14.652 6.14344L14.1639 5.574L14.652 6.14344C14.6973 6.1046 14.755 6.08325 14.8147 6.08325H24.3337C24.4717 6.08325 24.5837 6.19518 24.5837 6.33325V26.9999C24.5837 27.138 24.4717 27.2499 24.3337 27.2499Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M12.0001 5.33325L7.42285 9.46712" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M17.888 19.5212L16.7708 15.93C16.5378 15.1812 15.4785 15.1798 15.2436 15.928L14.1172 19.5164C13.7178 20.7889 14.6682 22.0833 16.0019 22.0833C17.3335 22.0833 18.2836 20.7927 17.888 19.5212Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M23.2503 3.66675V5.66675C23.2503 5.80482 23.1384 5.91675 23.0003 5.91675H14.667C14.5827 5.91675 14.5365 5.8916 14.5072 5.86702C14.4721 5.83755 14.44 5.78953 14.4245 5.72738C14.4089 5.66524 14.4147 5.60775 14.4318 5.56523C14.4461 5.52975 14.4749 5.48584 14.5493 5.44616L18.2993 3.44616C18.3356 3.42685 18.376 3.41675 18.417 3.41675H23.0003C23.1384 3.41675 23.2503 3.52868 23.2503 3.66675Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                                        <span className="font-semibold text-sm">{car.fuelType && car.fuelType}</span>
                                                    </div>
                                                </div>
                                                <span className="mt-2 text-xs text-gray-500"><i className="fa-solid fa-location-dot mr-1 text-black"></i>{`${car.district && car.district}, ${car.city && car.city}`}</span>
                                            </div>
                                            <div className="border-b-2 py-1 sm:hidden md:hidden"></div>
                                            <div className="flex flex-row justify-between pt-3 text-sm">
                                                {
                                                    car.stats.tripCount === 0 ?
                                                        <p className="text-gray-600">Chưa có chuyến</p>
                                                        :
                                                        <div className="flex flex-row">
                                                            <label className="flex items-center gap-1">
                                                                <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                                                <span>{car && car.stats && car.stats.star && car.stats.star}</span>
                                                            </label>
                                                            <span className="px-1">•</span>
                                                            <label className="flex items-center gap-1">
                                                                <svg width="20" height="20" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                                <span>{car && car.stats && car.stats.tripCount && car.stats.tripCount} chuyến</span>
                                                            </label>
                                                        </div>
                                                }
                                                <label>
                                                    <p><span className="text-main font-black text-base">{car.pricePerDay && car.pricePerDay}K</span> / ngày</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="sm:w-full md:w-full lg:w-1/6 xl:w-1/6 flex flex-col justify-center items-center gap-2 sm:mt-2 md:mt-2">
                                            <h2>Chủ xe</h2>
                                            <img loading="lazy" className="h-14 rounded-full" src={car && car.user && car.user.avatarImage ? car.user.avatarImage : "/avaMale.png"} />
                                            <p className="text-sm">{car.user.fullname}</p>
                                        </div>
                                        <div className="sm:w-full md:w-full lg:w-1/6 xl:w-1/6 sm:mt-2 md:mt-2 flex sm:flex-row md:flex-row lg:flex-col xl:flex-col items-center justify-center gap-2 ">
                                            {
                                                car.status === "Approving" &&
                                                <button className="sm:w-1/8 md:w-1/7 lg:w-1/3 xl:w-1/3 hover:opacity-80 p-2 text-sm bg-main text-white font-semibold rounded-md" onClick={() => handleConfirmCar(car.carId)}>Xác thực</button>
                                            }
                                            <button className="sm:w-1/8 md:w-1/7 lg:w-1/3 xl:w-1/3 hover:opacity-80 p-2 text-sm bg-main text-white font-semibold rounded-md" onClick={() => handleOpenModalView(car.carId)}>Xem</button>
                                            <button className="sm:w-1/8 md:w-1/7 lg:w-1/3 xl:w-1/3 hover:opacity-80 p-2 text-sm bg-main text-white font-semibold rounded-md" onClick={() => handleOpenModalEdit(car.carId)}>Sửa</button>
                                            <button className="sm:w-1/8 md:w-1/7 lg:w-1/3 xl:w-1/3 hover:opacity-80 p-2 text-sm bg-main text-white font-semibold rounded-md" onClick={() => handleOpenModalDelete(car.carId)}>Xóa</button>
                                        </div>
                                    </div>
                                    <div className="border-t-2 sm:px-2 md:px-3 w-[97%] py-2">
                                        {
                                            car.status === "Approving" ?
                                                <p className="text-sm font-semibold">Trạng thái: Chưa xác thực</p>
                                                :
                                                <p className="text-sm font-semibold">Trạng thái: Đã xác thực</p>
                                        }
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="w-full flex flex-col items-center">
                            <img loading="lazy" src="/carNotFound.svg" />
                            <p className="text-center font-semibold text-3xl">Xin lỗi quý khách, chúng tôi chưa có xe tại khu vực này</p>
                        </div>
                }

            </div>

        </div>
    )
}

export default ManageCar