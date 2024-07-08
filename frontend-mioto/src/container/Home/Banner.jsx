import { useDispatch, useSelector } from "react-redux"
import { beginDateSelector, endDateSelector, locationCodeSelector, locationSelector, userIdSelector } from "../../redux/selector"
import { setHideLoading, setShowLoading } from "../../redux/Slice/AppSlice"
import { useNavigate } from "react-router-dom"

function Banner({ city, cityName, handleOpenDateModal, handleOpenLocationModal }) {
    const dispatch = useDispatch()
    let location = useSelector(locationSelector)
    let beginDate = useSelector(beginDateSelector)
    let endDate = useSelector(endDateSelector)
    let locationCode = useSelector(locationCodeSelector)
    let userId = useSelector(userIdSelector)
    const navigate = useNavigate()


    const cityBackgrounds = {
        default: '/backBanner.png',
        haNoi: '/HaNoi_back.jpg',
        hoChiMinh: '/HoChiMinh_back.jpg',
        binhDuong: '/BinhDuong_back.jpg',
        lamDong: '/DaLat_back.jpg',
        haiPhong: '/HaiPhong_back.jpg',
        khanhHoa: '/NhaTrang_back.jpg',
        kienGiang: '/PhuQuoc_back.jpg',
        daNang: '/DaNang_back.jpg'
    };
    const backgroundImage = cityBackgrounds[cityName] || cityBackgrounds['default'];

    const handleSearchCar = () => {
        // Hiển thị loading
        dispatch(setShowLoading());
        // navigate(`/find`)
        navigate(`/find`)

        // Đặt hẹn giờ để ẩn loading sau 1 giây
        setTimeout(() => {
            dispatch(setHideLoading());
        }, 1000); // 1 giây
    }

    return (
        <div>
            <div className="sm:h-[450px] lg:h-[650px] xl:h-[650px] sm:px-5 md:px-5 lg:px-16 xl:px-32">
                <div className="relative w-full sm:h-[450px] lg:h-[600px] xl:h-[600px] rounded-2xl" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}>
                    <div className="w-full h-[500px] flex flex-col sm:pt-4 md:pt-10 lg:pt-32 xl:pt-32">
                        <div className="w-full text-center sm:pt-10 md:pt-10 lg:py-5 xl:py-5 sm:pb-5 md:pb-5 lg:pb-5 xl:pb-5">
                            {
                                city === "common" ?
                                    <>
                                        <h1 className="font-bold text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-6xl">Mioto - Cùng Bạn</h1>
                                        <h1 className="font-bold text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-6xl sm:mt-1 md:mt-2 lg:mt-3 xl:mt-3">Đến Mọi Hành Trình</h1>
                                    </>
                                    :
                                    <>
                                        <h1 className="font-bold text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-6xl">Thuê xe tự lái tại</h1>
                                        <h1 className="font-bold text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-6xl mt-3"> {location}</h1>
                                    </>
                            }
                        </div>
                        {
                            city === "common" &&
                            <>
                                <div className="border-t-[.5px] border-white sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 mx-auto sm:py-1 md:py-2 lg:py-3 xl:py-3"></div>
                                <div className="w-full text-center sm:px-5">
                                    <p className="font-semibold text-white sm:text-base md:text-xl lg:text-xl xl:text-xl">Trải nghiệm sự khác biệt từ <label className="text-main">hơn 8000</label> xe gia đình đời mới khắp Việt Nam</p>
                                </div>
                            </>

                        }
                        <div className={`absolute md:bottom-[-100px] lg:bottom-[-50px] xl:bottom-[-50px] sm:right-[5%] md:right-[5%] lg:right-[11%] xl:right-[17%] 
                            sm:w-[90%] md:w-[90%] lg:w-4/5 xl:w-2/3 ${city === "common" ? "sm:bottom-[-130px]" : "sm:bottom-[20px]"} `}>
                            {
                                city === "common" &&
                                <div className="h-14 sm:px-16 md:px-52 lg:px-72 xl:px-72">
                                    <div className="rounded-tr-2xl rounded-tl-2xl w-full h-full bg-main flex justify-center items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.5 19.1538H18.1283C18.9357 19.1538 19.6639 18.6684 19.9744 17.923L20.691 16.2031C20.8893 15.7272 20.8961 15.1931 20.7101 14.7123L18.9946 10.2783C18.6965 9.50789 17.9554 9 17.1293 9H6.87067C6.04458 9 5.30349 9.50789 5.00541 10.2783L3.28991 14.7122C3.10386 15.1931 3.11071 15.7272 3.30903 16.2032L4.0257 17.9231C4.33625 18.6684 5.06446 19.1538 5.87184 19.1538H7.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.5 18.7857L12 16.5M12 16.5L16.5 18.7857M12 16.5V22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path><circle cx="12" cy="17" r="5" stroke="#fff" strokeWidth="1.5"></circle><circle cx="12" cy="17" r="1" stroke="#fff" strokeWidth="2"></circle></svg>
                                        <p className="text-white font-semibold sm:text-sm md:text-lg lg:text-lg xl:text-lg">Xe tự lái</p>
                                    </div>
                                </div>

                            }
                            <div className="sm:h-60 md:h-52 lg:h-32 xl:h-32">
                                <div className="bg-white rounded-2xl w-full h-full shadow-xl sm:p-1 md:p-6 lg:p-6 xl:p-6">
                                    <div className="h-20 flex sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                                        <div className="sm:w-full md:w-full lg:w-2/6 xl:w-2/6 p-2">
                                            <div className="flex flex-row sm:gap-2 md:gap-4 lg:gap-4 xl:gap-4 items-center mb-2">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.75C8.31 2.75 5.3 5.76 5.3 9.45C5.3 14.03 11.3 20.77 11.55 21.05C11.79 21.32 12.21 21.32 12.45 21.05C12.71 20.77 18.7 14.03 18.7 9.45C18.7 5.76 15.69 2.75 12 2.75Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.3849 11.7852C13.6776 11.5795 14.5587 10.3647 14.3529 9.07204C14.1472 7.77936 12.9325 6.89824 11.6398 7.104C10.3471 7.30976 9.46597 8.52449 9.67173 9.81717C9.87749 11.1099 11.0922 11.991 12.3849 11.7852Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                <h2 className="sm:text-sm md:text-base lg:text-base xl:text-base text-gray-500">
                                                    Địa điểm
                                                </h2>
                                            </div>
                                            <div className="sm:pl-8 md:pl-10 md:pr-5 lg:pl-10 xl:pl-10 lg:pr-5 xl:pr-5 flex flex-row items-center justify-between cursor-pointer" onClick={() => handleOpenLocationModal()}>
                                                <p className="sm:text-base md:text-xl lg:text-xl xl:text-xl font-semibold">{location}</p>
                                                <i className="fa-solid fa-chevron-down sm:hidden"></i>
                                            </div>
                                        </div>
                                        <div className="sm:w-full md:w-full lg:w-4/6 xl:w-4/6 p-2 pl-4 flex sm:gap-4 md:gap-0 lg:gap-0 xl:gap-0 sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between lg:border-l-2 xl:border-l-2">
                                            <div className="sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5">
                                                <div className="flex flex-row sm:gap-2 md:gap-4 lg:gap-4 xl:gap-4 mb-2 items-center">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.86 4.81V2.75" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.14 4.81V2.75" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.05 3.78003H5.95C4.18 3.78003 2.75 5.21003 2.75 6.98003V18.06C2.75 19.83 4.18 21.26 5.95 21.26H18.06C19.83 21.26 21.26 19.83 21.26 18.06V6.98003C21.25 5.21003 19.82 3.78003 18.05 3.78003Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 7.8999H21.25" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12Z" fill="#767676"></path><path d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z" fill="#767676"></path><path d="M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z" fill="#767676"></path><path d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z" fill="#767676"></path><path d="M18 15.49C18.5523 15.49 19 15.0423 19 14.49C19 13.9377 18.5523 13.49 18 13.49C17.4477 13.49 17 13.9377 17 14.49C17 15.0423 17.4477 15.49 18 15.49Z" fill="#767676"></path><path d="M14 15.49C14.5523 15.49 15 15.0423 15 14.49C15 13.9377 14.5523 13.49 14 13.49C13.4477 13.49 13 13.9377 13 14.49C13 15.0423 13.4477 15.49 14 15.49Z" fill="#767676"></path><path d="M10 15.49C10.5523 15.49 11 15.0423 11 14.49C11 13.9377 10.5523 13.49 10 13.49C9.44772 13.49 9 13.9377 9 14.49C9 15.0423 9.44772 15.49 10 15.49Z" fill="#767676"></path><path d="M6 15.49C6.55228 15.49 7 15.0423 7 14.49C7 13.9377 6.55228 13.49 6 13.49C5.44772 13.49 5 13.9377 5 14.49C5 15.0423 5.44772 15.49 6 15.49Z" fill="#767676"></path><path d="M14 18.97C14.5523 18.97 15 18.5223 15 17.97C15 17.4177 14.5523 16.97 14 16.97C13.4477 16.97 13 17.4177 13 17.97C13 18.5223 13.4477 18.97 14 18.97Z" fill="#767676"></path><path d="M10 18.97C10.5523 18.97 11 18.5223 11 17.97C11 17.4177 10.5523 16.97 10 16.97C9.44772 16.97 9 17.4177 9 17.97C9 18.5223 9.44772 18.97 10 18.97Z" fill="#767676"></path><path d="M6 18.97C6.55228 18.97 7 18.5223 7 17.97C7 17.4177 6.55228 16.97 6 16.97C5.44772 16.97 5 17.4177 5 17.97C5 18.5223 5.44772 18.97 6 18.97Z" fill="#767676"></path></svg>
                                                    <h2 className="sm:text-sm md:text-base lg:text-base xl:text-base text-gray-500">
                                                        Thời gian thuê
                                                    </h2>
                                                </div>
                                                <div className="sm:pl-8 md:pl-10 md:pr-5 lg:pl-10 xl:pl-10 lg:pr-5 xl:pr-5 flex flex-row items-center justify-between w-full cursor-pointer" onClick={() => handleOpenDateModal()}>
                                                    <p className="sm:text-base md:text-xl lg:text-xl xl:text-xl font-semibold">{beginDate} đến {endDate}</p>
                                                    <i className="fa-solid fa-chevron-down sm:hidden"></i>
                                                </div>
                                            </div>
                                            <button type="button" className="px-4 py-3 font-bold bg-main text-white rounded-lg text-base hover:bg-[#79d799]" onClick={handleSearchCar}>Tìm xe</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )

}

export default Banner