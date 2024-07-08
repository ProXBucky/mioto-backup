import { useEffect, useState } from "react"
import { getAllTripByUserId } from "../../../api/appAPI"
import { useDispatch, useSelector } from "react-redux"
import { tokenSelector, userIdSelector } from "../../../redux/selector"
import { formatMoney } from "../../../utils/formatMoney"
import { format } from "date-fns"
import viLocale from 'date-fns/locale/vi';
import { useNavigate } from "react-router-dom"

function MyTrip() {
    const dispatch = useDispatch()
    const [allTrip, setAllTrip] = useState([])
    const userId = useSelector(userIdSelector)
    const token = useSelector(tokenSelector)
    const navigate = useNavigate()

    const fetchAllTripByUserId = async () => {
        let res = await getAllTripByUserId(userId, token)
        if (res) {
            setAllTrip(res)
        } else {
            setAllTrip([])
        }
    }

    const navigateDetailRent = (rentId) => {
        navigate(`/account/mytrip/detail-trip/${rentId}`)
    }

    const handleCancelTrip = async (rentId) => {
        try {
            dispatch(setShowLoading())
            let res = await cancelTrip(rentId, token)
            if (res) {
                toast.success("Hủy chuyến thành công")
                fetchListOrders()
            }
        } catch (e) {
            toast.error("Lỗi hệ thống")
        } finally {
            dispatch(setHideLoading())
        }
    }

    useEffect(() => {
        if (userId !== 0) {
            fetchAllTripByUserId()
        }
    }, [])

    return (
        <>
            <h1 className="sm:text-xl md:text-3xl lg:text-4xl xl:text-4xl font-bold">Chuyến của tôi</h1>
            {
                allTrip && allTrip.length > 0 ?
                    allTrip.map((item, index) => {
                        return (
                            <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row border bg-white rounded-lg p-3 mt-3" key={index}>
                                <div className="sm:w-full md:w-[calc(25%+40px)] lg:w-[calc(25%+40px)] xl:w-[calc(25%+40px)]">
                                    <img loading="lazy" className="rounded-lg cursor-pointer" src={item.car && item.car.images && item.car.images[0].imageLink} />
                                </div>
                                <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:px-2 md:px-6 lg:px-6 xl:px-6 flex flex-col justify-center">
                                    <h2 className="font-bold text-xl">{`${item.car && item.car.model && item.car.model} ${item.car && item.car.modelYear && item.car.modelYear}`}</h2>
                                    <h2 className="font-bold text-lg">{`${item.car && item.car.plateNumber && item.car.plateNumber}`}</h2>
                                    <div className="footer flex flex-col pt-2 text-sm font-normal">
                                        <p>Bắt đầu: {format(item.rentBeginDate, 'PPP', { locale: viLocale })}</p>
                                        <p>Kết thúc: {format(item.rentEndDate, 'PPP', { locale: viLocale })}</p>
                                    </div>
                                    <div className="mt-3 text-sm font-semibold">
                                        {item.rentStatus === 'pending' && <p>Trạng thái:  <i className="fa-solid fa-circle mr-1 text-yellow-400"></i> <label>Đang chờ xác nhận từ chủ xe</label></p>}
                                        {item.rentStatus === 'cancel' && <p>Trạng thái:  <i className="fa-solid fa-circle mr-1 text-red-500"></i> <label>Chuyến xe đã hủy</label></p>}
                                        {item.rentStatus === 'ongoing' && <p>Trạng thái:  <i className="fa-solid fa-circle mr-1 text-green-500"></i> <label>Chuyến xe đang diễn ra</label></p>}
                                        {item.rentStatus === 'finish' && <p>Trạng thái:  <i className="fa-solid fa-circle mr-1 text-blue-600"></i> <label>Chuyến xe đã hoàn thành</label></p>}
                                        {item.rentStatus === "ready" &&
                                            <div>
                                                Trạng thái:
                                                <i className="fa-solid fa-circle ml-1 text-pink-300"></i>
                                                <span className="ml-1">Chuyến xe đã sẵn sàng</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="sm:w-full md:w-[calc(25%-40px)] lg:w-[calc(25%-40px)] xl:w-[calc(25%-40px)] sm:border-none md:border-l-2 lg:border-l-2 xl:border-l-2 flex flex-col justify-center items-center gap-3 pl-4">
                                    <h2 className="font-semibold sm:mt-5">Tổng tiền</h2>
                                    <p><label className="font-bold text-xl">{formatMoney(item.payment && item.payment.paymentAmount)}</label></p>
                                    <button className="rounded-md  font-semibold bg-main p-2 px-4 text-sm text-white hover:opacity-75" onClick={() => navigateDetailRent(item.rentId)} >Xem</button>
                                    <button className="rounded-md  font-semibold bg-main p-2 px-4 text-sm text-white hover:opacity-75" onClick={() => handleCancelTrip(item.rentId)} >Hủy</button>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="flex w-full flex-col justify-center items-center mt-10">
                        <img loading="lazy" src="/noTrip.svg" />
                        <h3 className="font-bold text-xl text-gray-500">Bạn chưa có chuyến</h3>
                    </div>
            }
        </>
    )
}

export default MyTrip