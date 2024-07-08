import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userIdSelector } from "../../../redux/selector"
import { getAllCarLiked } from "../../../api/appAPI"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { dislikeCar } from "../../../api/userAPI"
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice"

function FavoriteCar() {
    const dispatch = useDispatch()
    let [listCarLiked, setListCarLiked] = useState([])
    const userId = useSelector(userIdSelector)
    const navigate = useNavigate()

    const navigateDetailCar = (carId) => {
        navigate(`/car/${carId}`)
    }

    const fetchListCarLiked = async () => {
        let res = await getAllCarLiked(userId)
        if (res && res.length > 0) {
            setListCarLiked(res)
        }
        else {
            setListCarLiked([])
        }
    }

    const dislikeCarAction = async (carId) => {
        try {
            dispatch(setShowLoading())
            if (userId && carId) {
                let res = await dislikeCar(userId, carId)
                if (res) {
                    toast.success('Đã xóa xe khỏi danh sách ưa thích')
                    fetchListCarLiked()
                }
            }
        } catch (err) {
            toast.error('Lỗi hệ thống')
        } finally {
            dispatch(setHideLoading())
        }
    }

    useEffect(() => {
        if (userId) {
            fetchListCarLiked()
        }
    }, [])

    return (
        <>
            <h1 className="sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl font-bold">Xe yêu thích của tôi</h1>
            {
                listCarLiked && listCarLiked.length > 0 ?
                    listCarLiked.map((item, index) => {
                        return (
                            <div className="flex sm:flex-col md:flex-col lg:flex-row xl:flex-row border bg-white rounded-lg p-3 mt-3" key={index}>
                                <div className="sm:flex sm:justify-center md:flex md:justify-center sm:w-full md:w-full lg:w-[calc(25%+40px)] xl:w-[calc(25%+40px)]">
                                    <img loading="lazy" className="sm:w-3/4 md:w-3/4 rounded-lg cursor-pointer" src={item.car && item.car.images && item.car.images[3].imageLink} onClick={() => navigateDetailCar(item.car.carId)} />
                                </div>
                                <div className="sm:mt-2 md:mt-2 sm:w-full md:w-full lg:w-1/2 xl:w-1/2 px-6 flex flex-col justify-center sm:items-center md:items-center">
                                    <h2 className="font-black md:text-2xl">{`${item.car && item.car.model && item.car.model} ${item.car && item.car.modelYear && item.car.modelYear}`}</h2>
                                    <div className="flex flex-row items-center gap-2 mt-2">
                                        <i className="fa-solid fa-location-dot"></i>
                                        <span className="text-sm text-gray-500">{`${item.car && item.car.district && item.car.district} ${item.car && item.car.city && item.car.city}`}</span>
                                    </div>
                                    <div className="tag py-3 flex flex-wrap gap-3">
                                        <p className="p-1 px-2 bg-[#eef7ff] text-sm rounded-xl"> {item.car && item.car.transmission && item.car.transmission}   </p>
                                        <p className="p-1 px-2 bg-[#eef7ff] text-sm rounded-xl">Giao xe tận nơi</p>
                                    </div>
                                </div>
                                <div className="sm:w-full md:w-full lg:w-[calc(25%-40px)] xl:w-[calc(25%-40px)] lg:border-l-2 xl:border-l-2 flex flex-col justify-center items-center gap-3 pl-4">
                                    <div className="flex flex-col items-center gap-2">
                                        <img loading="lazy" src={item.car && item.car && item.car.user && item.car.user.avatarImage ? item.car.user.avatarImage : "/avaMale.png"} className="rounded-full border border-gray-600 sm:h-14 md:h-10 lg:h-10 xl:h-10" />
                                    </div>
                                    <p><label className="font-bold text-xl">{item.car && item.car.pricePerDay && item.car.pricePerDay}K </label><label className="font-normal text-md">/Ngày</label></p>
                                    <button className="py-[10px] sm:px-[10px] md:px-[10px] lg:px-[20px] xl:px-[40px] rounded-md text-white font-bold bg-main hover:opacity-85" onClick={() => dislikeCarAction(item.car.carId)}>Bỏ thích</button>
                                    <button className="rounded-md  font-bold hover:text-main" onClick={() => navigateDetailCar(item.car.carId)} >Xem chi tiết</button>

                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="flex w-full flex-col justify-center items-center mt-10">
                        <img loading="lazy" src="/favoCar.svg" />
                        <h3 className="font-bold text-xl text-gray-500">Không có xe yêu thích</h3>
                    </div>
            }
        </>
    )
}

export default FavoriteCar