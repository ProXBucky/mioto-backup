import { useNavigate } from "react-router-dom"
import Slider from "react-slick"


function CarList({ ava, city, cityName, isHiddenTitle, carArray, menu }) {
    const navigate = useNavigate()

    const navigateDetailCar = (carId) => {
        navigate(`/car/${carId}`)
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
    }

    return (
        <div className={`sm:px-5 md:px-5 lg:px-16 xl:px-32 md:py-14 lg:py-14 xl:py-14 
        ${menu === true ? "sm:py-5" : "sm:py-16"} 
        ${city === "city" ? "" : "bg-gray-100"}`}>
            {
                !isHiddenTitle ?
                    <div className='text-center sm:mb-6 md:mb-8 lg:mb-20 xl:mb-20'>
                        {
                            city === "city" ?
                                <>
                                    <h1 className='h-12 sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>Xe Dành Cho Bạn tại</h1>
                                    <h1 className='h-12 sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>{cityName}</h1>
                                </>
                                :
                                <h1 className='h-12 sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>Xe Dành Cho Bạn</h1>

                        }
                    </div>
                    :
                    ''
            }
            <div className="flex flex-wrap sm:hidden md:gap-2 lg:gap-3 xl:gap-3">
                {
                    carArray && carArray.length > 0 ?
                        carArray.map((car, index) => {
                            return (
                                <div className="md:w-[49%] lg:w-[32%] xl:w-[24%] bg-white p-3 rounded-xl border-2 cursor-pointer" key={index} onClick={() => navigateDetailCar(car.carId)}>
                                    <div className="relative">
                                        {
                                            car.mortgage === 0 &&
                                            <span className="rent flex flex-row items-center gap-1 text-[10px] rounded-full px-2 py-1 text-white absolute top-[5%] left-[5%]" style={{ background: "rgba(12, 12, 12, .5)" }}>Miễn thế chấp <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.06654 3.41201L3.30916 4.68289C3.50222 4.88033 3.81878 4.88389 4.01622 4.69084C4.21367 4.49778 4.21723 4.18122 4.02417 3.98378L2.73171 2.66192C4.08658 1.32458 5.9467 0.5 7.99999 0.5C12.1421 0.5 15.5 3.8579 15.5 8.00004C15.5 10.0709 14.6612 11.9454 13.3035 13.3031L11.9871 11.9806C11.7923 11.7849 11.4757 11.7842 11.28 11.979C11.0843 12.1738 11.0836 12.4904 11.2784 12.6861L12.5495 13.9631C11.2875 14.9276 9.71111 15.5001 7.99999 15.5001C3.85785 15.5001 0.5 12.1422 0.5 8.00004C0.5 6.27151 1.08422 4.68039 2.06654 3.41201Z" stroke="#5FCF86" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.3364 5.92398H10.1909C10.0678 5.21142 9.48584 4.66675 8.78821 4.66675H5.12098C4.65092 4.66675 4.26666 5.07712 4.26666 5.57703C4.26666 5.6106 4.27412 5.64045 4.27785 5.67402C4.27412 5.68895 4.26666 5.70387 4.26666 5.72252V9.93815C4.26666 10.7067 4.89341 11.3334 5.65819 11.3334H10.3364C11.1012 11.3334 11.728 10.7067 11.728 9.93815V7.31551C11.728 6.547 11.1012 5.92398 10.3364 5.92398ZM10.1275 9.09876C9.87009 9.09876 9.65745 8.88984 9.65745 8.6287C9.65745 8.36755 9.87009 8.1549 10.1275 8.1549C10.3887 8.1549 10.6013 8.36755 10.6013 8.6287C10.6013 8.88984 10.3887 9.09876 10.1275 9.09876ZM5.12098 5.22635H8.78821C9.17992 5.22635 9.50822 5.52107 9.61641 5.92398H5.12098C4.95683 5.92398 4.82626 5.76729 4.82626 5.57703C4.82626 5.38303 4.95683 5.22635 5.12098 5.22635Z" fill="#5FCF86"></path></svg></span>
                                        }
                                        {
                                            ava &&
                                            <div className="h-10 rounded-full border w-10 absolute bottom-[-7%] left-[5%]">
                                                <img loading="lazy" src={car && car.user && car.user.avatarImage ? car.user.avatarImage : "/avaMale.png"} className="rounded-full" />
                                            </div>
                                        }
                                        <img loading="lazy" src={car.images && car.images[0].imageLink} className="rounded-xl" />
                                    </div>
                                    <div className="tag mt-4 mb-2 flex flex-wrap gap-3">
                                        <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">{car.transmission && car.transmission}</p>
                                        <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">Giao xe tận nơi</p>
                                    </div>
                                    <span className="text-base font-extrabold flex flex-row">
                                        {`${car.model && car.model} ${car.modelYear && car.modelYear}`}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.65372 3.63C9.89372 3.29813 11.2114 3 12 3C12.7886 3 14.1063 3.29813 15.3463 3.63C16.6149 3.9675 17.8937 4.36687 18.6457 4.60875C18.9601 4.71096 19.2389 4.8984 19.4499 5.14954C19.661 5.40068 19.7958 5.70533 19.8389 6.0285C20.52 11.0651 18.9394 14.7979 17.0217 17.2672C16.2085 18.3236 15.2388 19.2538 14.1451 20.0269C13.767 20.2944 13.3663 20.5296 12.9474 20.73C12.6274 20.8785 12.2834 21 12 21C11.7166 21 11.3737 20.8785 11.0526 20.73C10.6337 20.5296 10.233 20.2944 9.85486 20.0269C8.76118 19.2538 7.79153 18.3236 6.97829 17.2672C5.06058 14.7979 3.48001 11.0651 4.16115 6.0285C4.20422 5.70533 4.33903 5.40068 4.55008 5.14954C4.76114 4.8984 5.03988 4.71096 5.35429 4.60875C6.44594 4.25641 7.54607 3.93007 8.65372 3.63Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M11.3333 12.6668L9.5 10.8335" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.9997 9L11.333 12.6667" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </span>
                                    <span className="text-sm text-gray-500"><i className="fa-solid fa-location-dot mr-1 text-black"></i>{`${car.district && car.district}, ${car.city && car.city}`}</span>
                                    <div className="border-b-2 py-1"></div>
                                    <div className="footer flex flex-row justify-between pt-3 text-sm">
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
                            )
                        })
                        :
                        <div className="w-full flex flex-col items-center">
                            <img loading="lazy" src="/carNotFound.svg" />
                            <p className="text-center font-semibold md:text-2xl lg:text-2xl xl:text-3xl">Xin lỗi quý khách, chúng tôi chưa có xe tại khu vực này</p>
                        </div>
                }

            </div>
            <div className={`md:hidden lg:hidden xl:hidden sm:${menu === true ? "hidden" : "block"}`}>
                {
                    !carArray || carArray.length === 0 &&
                    <div className="w-full flex flex-col items-center">
                        <img loading="lazy" src="/carNotFound.svg" />
                        <p className="text-center font-semibold text-xl">Xin lỗi quý khách, chúng tôi chưa có xe tại khu vực này</p>
                    </div>
                }
                <Slider {...settings}>
                    {
                        carArray && carArray.length > 0 &&
                        carArray.map((car, index) => {
                            return (
                                <div className="bg-white p-3 rounded-xl border-2 cursor-pointer" key={index} onClick={() => navigateDetailCar(car.carId)}>
                                    <div className="relative">
                                        {
                                            car.mortgage === 0 &&
                                            <span className="rent flex flex-row items-center gap-1 text-[10px] rounded-full px-2 py-1 text-white absolute top-[5%] left-[5%]" style={{ background: "rgba(12, 12, 12, .5)" }}>Miễn thế chấp <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.06654 3.41201L3.30916 4.68289C3.50222 4.88033 3.81878 4.88389 4.01622 4.69084C4.21367 4.49778 4.21723 4.18122 4.02417 3.98378L2.73171 2.66192C4.08658 1.32458 5.9467 0.5 7.99999 0.5C12.1421 0.5 15.5 3.8579 15.5 8.00004C15.5 10.0709 14.6612 11.9454 13.3035 13.3031L11.9871 11.9806C11.7923 11.7849 11.4757 11.7842 11.28 11.979C11.0843 12.1738 11.0836 12.4904 11.2784 12.6861L12.5495 13.9631C11.2875 14.9276 9.71111 15.5001 7.99999 15.5001C3.85785 15.5001 0.5 12.1422 0.5 8.00004C0.5 6.27151 1.08422 4.68039 2.06654 3.41201Z" stroke="#5FCF86" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.3364 5.92398H10.1909C10.0678 5.21142 9.48584 4.66675 8.78821 4.66675H5.12098C4.65092 4.66675 4.26666 5.07712 4.26666 5.57703C4.26666 5.6106 4.27412 5.64045 4.27785 5.67402C4.27412 5.68895 4.26666 5.70387 4.26666 5.72252V9.93815C4.26666 10.7067 4.89341 11.3334 5.65819 11.3334H10.3364C11.1012 11.3334 11.728 10.7067 11.728 9.93815V7.31551C11.728 6.547 11.1012 5.92398 10.3364 5.92398ZM10.1275 9.09876C9.87009 9.09876 9.65745 8.88984 9.65745 8.6287C9.65745 8.36755 9.87009 8.1549 10.1275 8.1549C10.3887 8.1549 10.6013 8.36755 10.6013 8.6287C10.6013 8.88984 10.3887 9.09876 10.1275 9.09876ZM5.12098 5.22635H8.78821C9.17992 5.22635 9.50822 5.52107 9.61641 5.92398H5.12098C4.95683 5.92398 4.82626 5.76729 4.82626 5.57703C4.82626 5.38303 4.95683 5.22635 5.12098 5.22635Z" fill="#5FCF86"></path></svg></span>
                                        }
                                        {
                                            ava &&
                                            <div className="h-10 rounded-full border w-10 absolute bottom-[-7%] left-[5%]">
                                                <img loading="lazy" src={car && car.user && car.user.avatarImage} className="rounded-full" />
                                            </div>
                                        }
                                        <img loading="lazy" src={car.images && car.images[0].imageLink} className="rounded-xl" />
                                    </div>
                                    <div className="tag mt-4 mb-2 flex flex-wrap gap-3">
                                        <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">{car.transmission && car.transmission}</p>
                                        <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">Giao xe tận nơi</p>
                                    </div>
                                    <span className="text-base font-extrabold flex flex-row">
                                        {`${car.model && car.model} ${car.modelYear && car.modelYear}`}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.65372 3.63C9.89372 3.29813 11.2114 3 12 3C12.7886 3 14.1063 3.29813 15.3463 3.63C16.6149 3.9675 17.8937 4.36687 18.6457 4.60875C18.9601 4.71096 19.2389 4.8984 19.4499 5.14954C19.661 5.40068 19.7958 5.70533 19.8389 6.0285C20.52 11.0651 18.9394 14.7979 17.0217 17.2672C16.2085 18.3236 15.2388 19.2538 14.1451 20.0269C13.767 20.2944 13.3663 20.5296 12.9474 20.73C12.6274 20.8785 12.2834 21 12 21C11.7166 21 11.3737 20.8785 11.0526 20.73C10.6337 20.5296 10.233 20.2944 9.85486 20.0269C8.76118 19.2538 7.79153 18.3236 6.97829 17.2672C5.06058 14.7979 3.48001 11.0651 4.16115 6.0285C4.20422 5.70533 4.33903 5.40068 4.55008 5.14954C4.76114 4.8984 5.03988 4.71096 5.35429 4.60875C6.44594 4.25641 7.54607 3.93007 8.65372 3.63Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M11.3333 12.6668L9.5 10.8335" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.9997 9L11.333 12.6667" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </span>
                                    <span className="text-sm text-gray-500"><i className="fa-solid fa-location-dot mr-1 text-black"></i>{`${car.district && car.district}, ${car.city && car.city}`}</span>
                                    <div className="border-b-2 py-1"></div>
                                    <div className="footer flex flex-row justify-between pt-3 text-sm">
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
                            )
                        })
                    }
                </Slider>
            </div>
            <div className={`md:hidden lg:hidden xl:hidden sm:${menu === true ? "block" : "hidden"}`}>
                {
                    !carArray || carArray.length === 0 &&
                    <div className="w-full flex flex-col items-center">
                        <img loading="lazy" src="/carNotFound.svg" />
                        <p className="text-center font-semibold text-xl">Xin lỗi quý khách, chúng tôi chưa có xe tại khu vực này</p>
                    </div>
                }
                {
                    carArray && carArray.length > 0 &&
                    carArray.map((car, index) => {
                        return (
                            <div className="bg-white p-3 rounded-xl border-2 cursor-pointer mb-3" key={index} onClick={() => navigateDetailCar(car.carId)}>
                                <div className="relative">
                                    {
                                        car.mortgage === 0 &&
                                        <span className="rent flex flex-row items-center gap-1 text-[10px] rounded-full px-2 py-1 text-white absolute top-[5%] left-[5%]" style={{ background: "rgba(12, 12, 12, .5)" }}>Miễn thế chấp <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.06654 3.41201L3.30916 4.68289C3.50222 4.88033 3.81878 4.88389 4.01622 4.69084C4.21367 4.49778 4.21723 4.18122 4.02417 3.98378L2.73171 2.66192C4.08658 1.32458 5.9467 0.5 7.99999 0.5C12.1421 0.5 15.5 3.8579 15.5 8.00004C15.5 10.0709 14.6612 11.9454 13.3035 13.3031L11.9871 11.9806C11.7923 11.7849 11.4757 11.7842 11.28 11.979C11.0843 12.1738 11.0836 12.4904 11.2784 12.6861L12.5495 13.9631C11.2875 14.9276 9.71111 15.5001 7.99999 15.5001C3.85785 15.5001 0.5 12.1422 0.5 8.00004C0.5 6.27151 1.08422 4.68039 2.06654 3.41201Z" stroke="#5FCF86" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.3364 5.92398H10.1909C10.0678 5.21142 9.48584 4.66675 8.78821 4.66675H5.12098C4.65092 4.66675 4.26666 5.07712 4.26666 5.57703C4.26666 5.6106 4.27412 5.64045 4.27785 5.67402C4.27412 5.68895 4.26666 5.70387 4.26666 5.72252V9.93815C4.26666 10.7067 4.89341 11.3334 5.65819 11.3334H10.3364C11.1012 11.3334 11.728 10.7067 11.728 9.93815V7.31551C11.728 6.547 11.1012 5.92398 10.3364 5.92398ZM10.1275 9.09876C9.87009 9.09876 9.65745 8.88984 9.65745 8.6287C9.65745 8.36755 9.87009 8.1549 10.1275 8.1549C10.3887 8.1549 10.6013 8.36755 10.6013 8.6287C10.6013 8.88984 10.3887 9.09876 10.1275 9.09876ZM5.12098 5.22635H8.78821C9.17992 5.22635 9.50822 5.52107 9.61641 5.92398H5.12098C4.95683 5.92398 4.82626 5.76729 4.82626 5.57703C4.82626 5.38303 4.95683 5.22635 5.12098 5.22635Z" fill="#5FCF86"></path></svg></span>
                                    }
                                    {
                                        ava &&
                                        <div className="h-10 rounded-full border w-10 absolute bottom-[-7%] left-[5%]">
                                            <img loading="lazy" src={car && car.user && car.user.avatarImage ? car.user.avatarImage : "/avaMale.png"} className="rounded-full" />
                                        </div>
                                    }
                                    <img loading="lazy" src={car.images && car.images[0].imageLink} className="rounded-xl" />
                                </div>
                                <div className="tag mt-4 mb-2 flex flex-wrap gap-3">
                                    <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">{car.transmission && car.transmission}</p>
                                    <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">Giao xe tận nơi</p>
                                </div>
                                <span className="text-base font-extrabold flex flex-row">
                                    {`${car.model && car.model} ${car.modelYear && car.modelYear}`}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.65372 3.63C9.89372 3.29813 11.2114 3 12 3C12.7886 3 14.1063 3.29813 15.3463 3.63C16.6149 3.9675 17.8937 4.36687 18.6457 4.60875C18.9601 4.71096 19.2389 4.8984 19.4499 5.14954C19.661 5.40068 19.7958 5.70533 19.8389 6.0285C20.52 11.0651 18.9394 14.7979 17.0217 17.2672C16.2085 18.3236 15.2388 19.2538 14.1451 20.0269C13.767 20.2944 13.3663 20.5296 12.9474 20.73C12.6274 20.8785 12.2834 21 12 21C11.7166 21 11.3737 20.8785 11.0526 20.73C10.6337 20.5296 10.233 20.2944 9.85486 20.0269C8.76118 19.2538 7.79153 18.3236 6.97829 17.2672C5.06058 14.7979 3.48001 11.0651 4.16115 6.0285C4.20422 5.70533 4.33903 5.40068 4.55008 5.14954C4.76114 4.8984 5.03988 4.71096 5.35429 4.60875C6.44594 4.25641 7.54607 3.93007 8.65372 3.63Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M11.3333 12.6668L9.5 10.8335" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.9997 9L11.333 12.6667" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </span>
                                <span className="text-sm text-gray-500"><i className="fa-solid fa-location-dot mr-1 text-black"></i>{`${car.district && car.district}, ${car.city && car.city}`}</span>
                                <div className="border-b-2 py-1"></div>
                                <div className="footer flex flex-row justify-between pt-3 text-sm">
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
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CarList