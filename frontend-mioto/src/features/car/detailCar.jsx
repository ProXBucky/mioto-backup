import { useEffect, useState } from "react"
import { getDetailCar } from "../../api/carAPI";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { beginDateSelector, endDateSelector, tokenSelector, userIdSelector } from "../../redux/selector";
import { calculateDays } from "../../utils/calculateDays"
import { toast } from "react-toastify";
import { dislikeCar, likeCar, postReviewCar, rentCar, reportCar } from "../../api/userAPI";
import { checkLikeCar, checkStatusRent, getAllReviewOfCar, getAllVoucherByUserId, getReviewScore } from "../../api/appAPI";
import ModalReviewCar from "./ModalReviewCar";
import ModalViewAllImg from "./ModalViewAllImg";
import ModalReportCar from "./ModalReportCar";
import ModalViewVoucher from "./ModalViewVoucher";
import ModalViewMap from "./ModalViewMap";
import ModalConfirmRent from "./ModalConfirmRent";
import { setHideLoading, setShowLoading } from "../../redux/Slice/AppSlice";
import CarImage from "./CarImage";
import CarInformation from "./CarInformation";
import ListReview from "../review/ListReview";
import CarPrice from "./CarPrice";


function DetailCar({ handleOpenDateModal, handleOpenLoginModal }) {
    const dispatch = useDispatch()
    let userId = useSelector(userIdSelector)
    let beginDate = useSelector(beginDateSelector)
    let endDate = useSelector(endDateSelector)
    let token = useSelector(tokenSelector)

    const [car, setCar] = useState(null)
    const [carStatus, setCarStatus] = useState('')
    const [liked, setLiked] = useState(false)
    const [carImgs, setCarImgs] = useState([])
    const { carId } = useParams()
    const dayRent = calculateDays(beginDate, endDate)
    const [allImgCar, setAllImgCar] = useState([]);
    const [allReview, setAllReview] = useState([]);
    const [showModalViewImg, setShowModalViewImg] = useState(false);
    const [address, setAddress] = useState('');
    const [showModalConfirmRent, setShowModalConfirmRent] = useState(false)
    const [showModalMap, setShowModalMap] = useState(false)
    const [totalRentNotVoucher, setTotalRentNotVoucher] = useState(0)
    const [totalRentVoucher, setTotalRentVoucher] = useState(0)
    const [showModalReview, setShowModalReview] = useState(false)
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [showModalReport, setShowModalReport] = useState(false)
    const [reason, setReason] = useState('');
    const [allVoucher, setAllVoucher] = useState('');
    const [showModalVoucher, setShowModalVoucher] = useState(false)
    const [voucher, setVoucher] = useState({
        voucherId: 0,
        voucherCode: "",
        voucherMoney: 0
    })
    const [reviewScore, setReviewScore] = useState({
        score: 0,
        count: 0,
        tripCount: 0
    })

    const handleCloseModalViewImg = () => {
        setShowModalViewImg(false);
    };

    const handleOpenModalViewImg = (imgs) => {
        setShowModalViewImg(true);
        setAllImgCar(imgs)
    };


    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
        toast.success("Đã sao chép liên kết")
    };

    const likeCarAction = async () => {
        if (!userId) {
            handleOpenLoginModal() // Login truoc khi like xe
        }
        else {
            try {
                if (userId && carId) {
                    let res = await likeCar({
                        userId: userId,
                        carId: carId
                    }, token)
                    if (res) {
                        toast.success('Đã thêm xe vào danh sách ưa thích')
                        setLiked(true)
                    }
                }
            } catch (err) {
                toast.error('Lỗi hệ thống')
            }
        }
    }

    const dislikeCarAction = async () => {
        try {
            if (userId && carId) {
                let res = await dislikeCar(userId, carId, token)
                if (res) {
                    toast.success('Đã xóa xe khỏi danh sách ưa thích')
                    setLiked(false)
                }
            }
        } catch (err) {
            toast.error('Lỗi hệ thống')
        }
    }

    const handleCloseModalReview = () => {
        setShowModalReview(false);
    }

    const handleOpenModalReview = () => {
        setShowModalReview(true);
    }

    const handleRatingChange = (value) => {
        setRating(value);
    }

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleCloseModalReport = () => {
        setShowModalReport(false);
    }

    const handleOpenModalReport = () => {
        if (!userId) {
            handleOpenLoginModal() // Login truoc khi like xe
        }
        else {
            setShowModalReport(true);
        }
    }

    const handleChangeReason = (event) => {
        setReason(event.target.value);
    }

    const handleCloseModalVoucher = () => {
        setShowModalVoucher(false);
    }

    const handleOpenModalVoucher = () => {
        if (!userId) {
            handleOpenLoginModal() // Login truoc khi like xe
        }
        else {
            setShowModalVoucher(true);
        }
    }

    const handleChooseVoucher = (item) => {
        let voucherMoney = 0
        let totalHaveTax = totalRentNotVoucher + totalRentNotVoucher / 10
        if (item.voucher.type === "percent") {
            voucherMoney = item.voucher.discountPercent / 100 * (dayRent * totalHaveTax)
            setTotalRentVoucher(totalHaveTax * dayRent - voucherMoney)
        }
        else {
            voucherMoney = item.voucher.discountPercent * 1000
            setTotalRentVoucher(totalHaveTax * dayRent - voucherMoney)
        }
        setVoucher({
            voucherId: item.voucherOwnerId,
            voucherCode: item.voucher.voucherCode,
            voucherMoney: voucherMoney
        })
        handleCloseModalVoucher()
    }

    const handleCancelVoucher = () => {
        setVoucher({
            voucherId: 0,
            voucherCode: "",
            voucherMoney: 0
        })
    }

    const handleCloseModalMap = () => {
        setShowModalMap(false);
    }

    const handleOpenModalMap = () => {
        setShowModalMap(true);
    }


    const handleCloseModalConfirmRent = () => {
        setShowModalConfirmRent(false);
    }

    const handleOpenModalConfirmRent = () => {
        if (!userId) {
            handleOpenLoginModal()
        }
        else {
            setShowModalConfirmRent(true);
        }
    }

    const handleConfirmRent = async () => {
        if (!userId) {
            handleOpenLoginModal()
        }
        else {
            try {
                dispatch(setShowLoading())
                if (userId && carId) {
                    let res = await rentCar({
                        userId: parseInt(userId),
                        carId: parseInt(carId),
                        voucherId: voucher.voucherId,
                        rentBeginDate: beginDate,
                        rentEndDate: endDate,
                        rentDays: dayRent,
                        paymentAmount: totalRentVoucher,
                        voucherAmount: voucher.voucherMoney
                    }, token)
                    if (res) {
                        toast.success('Bạn đã đặt xe thành công, hãy chờ chủ xe xác nhận.')
                        handleCloseModalConfirmRent()
                        setVoucher({
                            voucherId: 0,
                            voucherCode: "",
                            voucherMoney: 0
                        })
                    }
                }
            } catch (err) {
                toast.error('Lỗi hệ thống, đặt xe thất bại')
            } finally {
                dispatch(setHideLoading())
            }
        }
    }

    const handleReviewCar = async () => {
        try {
            dispatch(setShowLoading())
            if (userId && carId) {
                if (car && car.location) {
                    let res = await postReviewCar({
                        userId: userId,
                        carId: parseInt(carId),
                        content: text,
                        location: car.location,
                        reviewScore: rating
                    }, token)
                    if (res) {
                        setRating(0)
                        setText('')
                        handleCloseModalReview()
                        fetchAllReviewOfCar()
                        fetchReviewScore()
                    }
                }
            }
        } catch (err) {
            toast.error('Lỗi hệ thống')
        } finally {
            dispatch(setHideLoading())
        }
    }

    const handleReportCar = async () => {
        if (!userId) {
            handleOpenLoginModal() // Login truoc khi like xe
        }
        else {
            try {
                dispatch(setShowLoading())
                if (userId && carId) {
                    let res = await reportCar({
                        userId: userId,
                        carId: parseInt(carId),
                        reason: reason
                    }, token)
                    if (res) {
                        setReason('')
                        handleCloseModalReport()
                        toast.success("Bạn đã báo cáo xe này thành công")
                    }
                }
            } catch (err) {
                toast.error('Lỗi hệ thống')
            } finally {
                dispatch(setHideLoading())
            }
        }
    }

    const fetchCarData = async () => {
        const res = await getDetailCar(carId);
        if (res) {
            setAddress(res.district + " " + res.city)
            setTotalRentNotVoucher(res.pricePerDay * 1000) // + bao hiem xe
            setTotalRentVoucher((res.pricePerDay * 1000 + res.pricePerDay * 100) * dayRent)
            setCar(res)
            const imagesFromApi = [];
            res.images.forEach(image => {
                imagesFromApi.push({
                    original: image.imageLink,
                    thumbnail: image.imageLink,
                });
            });
            setCarImgs(imagesFromApi)
        }
    }

    const chkLikeCar = async () => {
        const res = await checkLikeCar(userId, carId);
        if (res) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }

    const fetchAllReviewOfCar = async () => {
        const res = await getAllReviewOfCar(carId);
        if (res && res.length > 0) {
            setAllReview(res)
        } else {
            setAllReview([])
        }
    }

    const fetchReviewScore = async () => {
        const res = await getReviewScore(carId)
        if (res) {
            setReviewScore({
                score: res.star,
                count: res.reviewCount,
                tripCount: res.tripCount
            })
        } else {
            setReviewScore({
                score: 0,
                count: 0,
                tripCount: 0
            })
        }
    }

    const fetchAllVoucherByUserId = async () => {
        if (userId) {
            const res = await getAllVoucherByUserId(userId, token);
            if (res && res.length > 0) {
                setAllVoucher(res)
            } else {
                setAllVoucher([])
            }
        }
    }

    const checkStatusRentCar = async () => {
        const res = await checkStatusRent(carId, beginDate, endDate);
        if (res === true) {
            setCarStatus(true)
        } else {
            setCarStatus(false)
        }
    }

    const handleDeleteReview = async (reviewId) => {
        try {
            if (window.confirm("Bạn có muốn xóa bình luận này không?")) {
                let res = await deleteReviewByReviewId(reviewId, token);
                if (res) {
                    fetchAllReviewOfCar()
                    toast.success("Xóa bình luận thành công");
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi hệ thống, xóa bình luận thất bại")
        }
    }

    useEffect(() => {
        if (userId && carId) {
            chkLikeCar()
        }
        if (carId) {
            fetchCarData()
            fetchAllReviewOfCar()
            fetchReviewScore()
            fetchAllVoucherByUserId()
            checkStatusRentCar()
        }
    }, [])

    useEffect(() => {
        let totalHaveTax = totalRentNotVoucher + totalRentNotVoucher / 10
        setTotalRentVoucher(totalHaveTax * dayRent - voucher.voucherMoney)
    }, [dayRent, voucher.voucherId])

    useEffect(() => {
        checkStatusRentCar()
    }, [beginDate, endDate])

    return (
        <div className="relative">
            <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 pb-20 flex flex-col sm:gap-3 md:gap-5 lg:gap-5 xl:gap-5">
                <CarImage car={car} carImgs={carImgs} handleOpenModalViewImg={handleOpenModalViewImg} />
                <div className="flex sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                    <div className="sm:w-full md:w-full lg:w-2/3 xl:w-2/3 flex flex-col sm:pr-0 md:pr-0 lg:pr-10 xl:pr-10">
                        <div className="sm:border-none md:border-none lg:border-b-2 xl:border-b-2 flex sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between py-4">
                            <div>
                                <h1 className="sm:text-xl md:text-3xl lg:text-4xl xl:text-4xl font-bold">{`${car && car.model && car.model} ${car && car.modelYear && car.modelYear}`}</h1>
                                <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row mt-2">
                                    <label className="flex items-center gap-1">
                                        <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                        <span>{reviewScore && reviewScore.score}</span>
                                    </label>
                                    <span className="px-1 sm:hidden">•</span>
                                    <label className="flex items-center gap-1">
                                        <svg width="20" height="20" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        <span>{reviewScore && reviewScore.tripCount} chuyến</span>
                                    </label>
                                    <span className="px-1 sm:hidden">•</span>
                                    <label>{`${car && car.district && car.district} - ${car && car.city && car.city}`}</label>
                                </div>
                                <div className="tag py-3 flex flex-wrap gap-3">
                                    <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">{car && car.transmission && car.transmission}</p>
                                    <p className="p-1 bg-[#eef7ff] text-sm rounded-xl">Giao xe tận nơi</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="rounded-full p-3 h-14 border cursor-pointer" onClick={copyLink}>
                                    <i className="fa-solid fa-link fa-lg"></i>
                                </div>
                                {
                                    liked ?
                                        <div className={`rounded-full p-3 h-14 border-2 cursor-pointer border-main`} onClick={dislikeCarAction}>
                                            <i className={`fa-regular fa-heart fa-lg text-main`}></i>
                                        </div>
                                        :
                                        <div className={`rounded-full p-3 h-14 border-2 cursor-pointer`} onClick={likeCarAction}>
                                            <i className={`fa-regular fa-heart fa-lg`}></i>
                                        </div>

                                }
                            </div>
                        </div>
                        <div className="sm:w-full md:w-full lg:hidden xl:hidden">
                            <CarPrice
                                car={car} voucher={voucher} beginDate={beginDate} endDate={endDate} carStatus={carStatus}
                                totalRentNotVoucher={totalRentNotVoucher} totalRentVoucher={totalRentVoucher} dayRent={dayRent}
                                handleOpenModalMap={handleOpenModalMap}
                                handleOpenModalVoucher={handleOpenModalVoucher}
                                handleCancelVoucher={handleCancelVoucher}
                                handleOpenModalReport={handleOpenModalReport}
                                handleOpenModalConfirmRent={handleOpenModalConfirmRent}
                                handleOpenDateModal={handleOpenDateModal}
                            />
                        </div>
                        <CarInformation car={car} handleOpenModalMap={handleOpenModalMap} />

                        <div className="border-b-2 py-4">
                            <h3 className="font-semibold text-xl">Chủ xe</h3>
                            <div className="flex justify-between mt-4">
                                <div className="flex flex-row gap-3 items-center">
                                    <img loading="lazy" className="sm:h-14 md:h-20 lg:h-20 xl:h-20 rounded-full border" src={car && car && car.user && car.user.avatarImage ? car.user.avatarImage : "/avaMale.png"} />
                                    <div>
                                        <p className="font-bold text-xl">{car && car && car.user && car.user.fullname}</p>
                                        <div className="flex flex-row gap-1 font-semibold text-sm">
                                            <label className="flex items-center gap-1">
                                                <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                                <span>{reviewScore && reviewScore.score}</span>
                                            </label>
                                            <span className="px-1">•</span>
                                            <label className="flex items-center gap-1">
                                                <svg width="20" height="20" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg" className=""><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                <span>{reviewScore && reviewScore.tripCount} chuyến</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {
                            userId !== 0 &&
                            <div className="flex justify-center mt-3">
                                <button className="rounded-lg py-3 px-5 text-white font-bold bg-main" onClick={handleOpenModalReview}>Đánh giá</button>
                            </div>
                        }
                        <div className="flex flex-row gap-1 text-lg my-3">
                            <label className="flex items-center gap-1 font-black">
                                <svg className="star-rating" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 7.23331C14.7333 6.89998 14.4667 6.49998 14.1333 6.49998L10.3333 5.96665L8.59999 2.49998C8.53333 2.36665 8.46666 2.29998 8.33333 2.23331C7.99999 2.03331 7.59999 2.16665 7.39999 2.49998L5.73333 5.96665L1.93333 6.49998C1.73333 6.49998 1.59999 6.56665 1.53333 6.69998C1.26666 6.96665 1.26666 7.36665 1.53333 7.63331L4.26666 10.3L3.59999 14.1C3.59999 14.2333 3.59999 14.3666 3.66666 14.5C3.86666 14.8333 4.26666 14.9666 4.59999 14.7666L7.99999 12.9666L11.4 14.7666C11.4667 14.8333 11.6 14.8333 11.7333 14.8333C11.8 14.8333 11.8 14.8333 11.8667 14.8333C12.2 14.7666 12.4667 14.4333 12.4 14.0333L11.7333 10.2333L14.4667 7.56665C14.6 7.49998 14.6667 7.36665 14.6667 7.23331Z" fill="#FFC634"></path></svg>
                                <span>{reviewScore && reviewScore.score}</span>
                            </label>
                            <span className="px-1">•</span>
                            <label className="flex items-center gap-1">
                                <span>{reviewScore && reviewScore.count} đánh giá</span>
                            </label>
                        </div>
                        <ListReview allReview={allReview} handleRatingChange={handleRatingChange} userId={userId} handleDeleteReview={handleDeleteReview} />
                    </div>
                    <div className="sm:hidden md:hidden lg:w-1/3 xl:w-1/3">
                        <CarPrice
                            car={car} voucher={voucher} beginDate={beginDate} endDate={endDate} carStatus={carStatus}
                            totalRentNotVoucher={totalRentNotVoucher} totalRentVoucher={totalRentVoucher} dayRent={dayRent}
                            handleOpenModalMap={handleOpenModalMap}
                            handleOpenModalVoucher={handleOpenModalVoucher}
                            handleCancelVoucher={handleCancelVoucher}
                            handleOpenModalReport={handleOpenModalReport}
                            handleOpenModalConfirmRent={handleOpenModalConfirmRent}
                            handleOpenDateModal={handleOpenDateModal}
                        />
                    </div>

                </div>
            </div>
            <ModalConfirmRent
                showModalConfirmRent={showModalConfirmRent}
                handleCloseModalConfirmRent={handleCloseModalConfirmRent}
                handleConfirmRent={handleConfirmRent}
                car={car && car}
                voucher={voucher && voucher}
                totalRentNotVoucher={totalRentNotVoucher}
                totalRentVoucher={totalRentVoucher}
                carImg={carImgs && carImgs.length > 0 && carImgs[0].original}
                locationName={address}
            />
            <ModalViewMap
                showModalMap={showModalMap}
                handleCloseModalMap={handleCloseModalMap}
                locationName={address}
            />
            <ModalViewVoucher
                showModalVoucher={showModalVoucher}
                handleCloseModalVoucher={handleCloseModalVoucher}
                allVoucher={allVoucher}
                handleChooseVoucher={handleChooseVoucher}
            />
            <ModalReviewCar showModalReview={showModalReview}
                handleCloseModalReview={handleCloseModalReview}
                rating={rating} text={text}
                handleRatingChange={handleRatingChange} handleChange={handleChange}
                handleReviewCar={handleReviewCar}
            />
            <ModalReportCar
                showModalReport={showModalReport}
                handleCloseModalReport={handleCloseModalReport}
                reason={reason}
                handleChangeReason={handleChangeReason}
                handleReportCar={handleReportCar}
            />
            <ModalViewAllImg
                showModalViewImg={showModalViewImg}
                handleCloseModalViewImg={handleCloseModalViewImg}
                allImgCar={allImgCar}
            />
        </div>
    )
}

export default DetailCar