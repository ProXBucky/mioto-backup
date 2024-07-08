import MapComponent from '../../container/Common/MapComponent';
import { formatMoney } from '../../utils/formatMoney';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTripByRentId } from '../../api/appAPI';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { cancelTrip } from '../../api/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { tokenSelector, userIdSelector } from '../../redux/selector';
import { toast } from 'react-toastify';
import { setHideLoading, setShowLoading } from '../../redux/Slice/AppSlice';


function DetailRent() {
    // const userId = useSelector(userIdSelector)
    let { rentId } = useParams('rentId')
    const [rent, setRent] = useState({})
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)

    const fetchTripInfo = async () => {
        let res = await getTripByRentId(rentId)
        if (res) {
            setRent(res)
        }
        else {
            setRent({})
        }
    }

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);  // Go back to the previous page
    };

    const handleCancelTrip = async (rentId) => {
        try {
            dispatch(setShowLoading())
            let res = await cancelTrip(rentId, token)
            if (res) {
                toast.success("Hủy chuyến thành công")
                navigate("/account/mytrip")
            }
        } catch (e) {
            toast.error("Lỗi hệ thống")
        } finally {
            dispatch(setHideLoading())
        }
    }

    useEffect(() => {
        if (rentId) {
            fetchTripInfo()
        }
    }, [])



    return (
        <>
            <div className='border-none justify-start mb-3 flex flex-row items-center gap-2 cursor-pointer font-bold' onClick={handleBack}>
                <i className="fa-solid fa-chevron-left fa-xl"></i>
                <p>Quay lại</p>
            </div>
            <div className='p-4 bg-white rounded-lg border-2'>
                <div className='flex sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between'>
                    <h2 className='font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mb-2'>{`${rent.car && rent.car.model && rent.car.model} ${rent.car && rent.car.modelYear && rent.car.modelYear}`}</h2>
                    <label className='font-semibold mb-2'>
                        {rent.rentStatus === "cancel" &&
                            <>
                                <i className="fa-solid fa-circle ml-1 text-red-500"></i>
                                <span className="ml-1">Chuyến xe đã bị hủy</span>
                            </>
                        }
                        {rent.rentStatus === "finish" &&
                            <>
                                <i className="fa-solid fa-circle ml-1 text-blue-500"></i>
                                <span className="ml-1">Chuyến xe đã hoàn thành</span>
                            </>
                        }
                        {rent.rentStatus === "pending" &&
                            <>
                                <i className="fa-solid fa-circle ml-1 text-yellow-400"></i>
                                <span className="ml-1"> Đang chờ xác nhận từ chủ xe</span>
                            </>
                        }
                        {rent.rentStatus === "ongoing" &&
                            <>
                                <i className="fa-solid fa-circle ml-1 text-green-400"></i>
                                <span className="ml-1">Chuyến xe đang diễn ra</span>
                            </>
                        }
                        {rent.rentStatus === "ready" &&
                            <div>
                                <i className="fa-solid fa-circle ml-1 text-pink-300"></i>
                                <span className="ml-1">Chuyến xe đã sẵn sàng</span>
                            </div>
                        }

                    </label>
                </div>
                <div className='flex sm:flex-col md:flex-row lg:flex-row xl:flex-row w-full border-t-2 pt-4'>
                    <div className='sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2'>
                        <img loading="lazy" src={rent.car && rent.car.images && rent.car.images[0].imageLink} className='rounded-xl' />
                    </div>
                    <div className='sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:pl-0 md:pl-10 lg:pl-10 xl:pl-10'>
                        <h3 className='font-semibold text-lg'>Thời gian thuê xe</h3>
                        <div className='flex flex-col gap-2 w-full mt-2'>
                            {rent && rent.rentBeginDate && <p>Bắt đầu: {format(rent.rentBeginDate, 'PPP', { locale: viLocale })}</p>}
                            {rent && rent.rentBeginDate && <p>Kết thúc: {format(rent.rentEndDate, 'PPP', { locale: viLocale })}</p>}

                        </div>

                        <h3 className='font-semibold text-lg mt-2'>Chủ xe</h3>
                        <div className="flex flex-col gap-3 mt-2">
                            <div className="flex sm:flex-col md:flex-col lg:flex-col xl:flex-row gap-3 items-center">
                                <img loading="lazy" className="sm:h-14 md:h-16 lg:h-16 xl:h-20 rounded-full border" src={rent && rent.car && rent.car && rent.car.user.avatarImage ? rent.car.user.avatarImage : "/avaMale.png"} />
                                <div>
                                    <p className="font-semibold text-lg">{rent && rent.car && rent.car && rent.car.user && rent.car.user.fullname}</p>
                                    <p className='font-normal'>Số điện thoại: {rent && rent.car && rent.car && rent.car.user && rent.car.user.phone}</p>
                                    <p className='font-normal'>Email: {rent && rent.car && rent.car && rent.car.user && rent.car.user.email}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-3 w-full'>
                    <h3 className='font-semibold text-lg mb-2'>Địa chỉ nhận xe</h3>
                    <p className='my-2 text-lg font-normal'>{rent.car && rent.car.streetAddress + " - " + rent.car.ward + " - " + rent.car.district + " - " + rent.car.city}</p>
                    <MapComponent locationName={rent.car && rent.car.district + " - " + rent.car.city} />
                </div>

                <div className='mt-3 w-full'>
                    <h3 className='font-semibold text-lg mb-2'>Bảng giá</h3>
                    <div className='flex sm:flex-col md:flex-row lg:flex-row xl:flex-row items-end'>
                        <div className="sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5">
                            <div className=" bg-gray-100 flex flex-col p-3 gap-3 border">
                                <div>
                                    <div className="flex justify-between">
                                        <p>Đơn giá thuê</p>
                                        <span className="font-semibold">{formatMoney(rent.car && rent.car.pricePerDay * 1000)} / ngày</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Bảo hiểm xe</p>
                                        <span className="font-semibold">{formatMoney(rent.car && rent.car.pricePerDay / 10 * 1000)}/ ngày</span>
                                    </div>
                                </div>

                                <div className="my-1 border"></div>

                                <div>
                                    <div className="flex justify-between">
                                        <p>Tổng cộng</p>
                                        <span className="font-semibold">{formatMoney(rent.car && rent.car.pricePerDay * 1.1 * 1000)} x {rent && rent.rentDays} ngày</span>
                                    </div>
                                </div>

                                <div className="my-1 border"></div>

                                <div className="flex justify-between items-center">
                                    <div className="flex flex-row items-center w-3/4 gap-3">
                                        <p>Mã giảm giá</p>
                                        {
                                            rent.voucherOwner && rent.voucherOwner.voucher && rent.voucherOwner.voucher.voucherCode &&
                                            <>
                                                <p className="text-black font-bold text-lg">{rent.voucherOwner.voucher.voucherCode}</p>
                                            </>
                                        }
                                    </div>
                                    <span className="font-semibold">
                                        {!rent.voucherOwner && formatMoney(0)}
                                        {rent.voucherOwner && rent.voucherOwner.voucher && rent.voucherOwner.voucher.discountPercent === 0 && formatMoney(0)}
                                        {rent.voucherOwner && rent.voucherOwner.voucher && rent.voucherOwner.voucher.discountPercent !== 0 && formatMoney(-rent.voucherOwner.voucher.discountPercent * 1000)}

                                    </span>
                                </div>
                                <div className="my-1 border"></div>
                                <div className="flex justify-between font-bold text-lg">
                                    <p>Thành tiền</p>
                                    <span className="font-bold">{formatMoney(rent.payment && rent.payment.paymentAmount)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 sm:pl-0 md:pl-5 lg:pl-5 xl:pl-5 sm:mt-3'>
                            <div className="rounded-lg flex flex-col gap-3 text-center">
                                <div className="flex flex-col font-semibold text-lg w-full bg-gray-100 p-3">
                                    <p className='text-gray-400 uppercase text-sm font-bold mb-2'>Tiền cọc</p>
                                    <span className="font-semibold text-green-500">{formatMoney(rent.payment && rent.payment.paymentAmount * 30 / 100)}</span>
                                </div>

                                <div className="flex flex-col font-semibold text-lg w-full bg-gray-100 p-3">
                                    <p className='text-gray-400 uppercase text-sm font-bold mb-2'>Thanh toán cho chủ xe sau khi nhận xe</p>
                                    <span className="font-bold">{formatMoney(rent.payment && rent.payment.paymentAmount * 70 / 100)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-2 w-full">
                    <h3 className="font-semibold text-xl">Giấy tờ thuê xe</h3>
                    <div className="my-4 rounded-2xl bg-[#fef7f4] p-4 border-l-8 border-[#f26a2b]">
                        <p className="text-gray-500">Chọn 1 trong 2 hình thức:</p>
                        <div className="flex flex-row gap-4 items-center font-semibold mt-3">
                            <img loading="lazy" className="h-6" src="/gplx_cccd.png" />
                            <p>GPLX & CCCD gắn chip (đối chiếu) </p>
                        </div>
                        <div className="flex flex-row gap-4 items-center font-semibold mt-2">
                            <img loading="lazy" className="h-6" src="/passport.png" />
                            <p>GPLX (đối chiếu) & Passport (giữ lại) </p>
                        </div>
                    </div>

                    <h3 className="font-semibold text-xl">Tài sản thế chấp</h3>
                    <div className="my-4 rounded-2xl bg-[#fef7f4] p-4 border-l-8 border-[#f26a2b]">
                        {
                            rent.car && !rent.car.mortgage ?
                                <p className="text-black">Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy</p>
                                :
                                <p className="text-black">{formatMoney(rent.car && rent.car.mortgage && rent.car.mortgage * 1000)} (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc Xe máy (kèm cà vẹt gốc) giá trị {formatMoney(rent.car && rent.car.mortgage && rent.car.mortgage * 1000)}</p>
                        }
                    </div>


                    <h3 className="font-semibold text-xl">Điều khoản</h3>
                    <div className="text-gray-500 my-4">
                        <p>Quy định khi sử dụng xe thuê:</p>

                        <ul className="list-disc">
                            <li className="ml-4">Sử dụng xe đúng mục đích.</li>
                            <li className="ml-4">Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</li>
                            <li className="ml-4">Không sử dụng xe thuê để cầm cố, thế chấp.</li>
                            <li className="ml-4">Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
                            <li className="ml-4">Không chở hoa quả, thực phẩm nặng mùi trong xe.</li>
                            <li className="ml-4">Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.</li>
                        </ul>

                        <p>Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời!</p>
                    </div>


                    <h3 className="font-semibold text-xl">Chính sách huỷ chuyến</h3>
                    <p>Miễn phí hủy chuyến trong vòng 1 giờ sau khi đặt cọc</p>
                    <table className="w-full my-3 text-sm">
                        <thead>
                            <tr>
                                <th className="border px-4 py-3">Thời Điểm Hủy Chuyến</th>
                                <th className="border px-4 py-3 text-center">Khách Thuê Hủy Chuyến</th>
                                <th className="border px-4 py-3 text-center">Chủ Xe Hủy Chuyến</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-3">Trong Vòng 1h Sau Giữ Chỗ</td>
                                <td className="border px-4 py-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z" fill="#12B76A"></path></svg>
                                        <p>Hoàn tiền giữ chỗ 100%</p>
                                    </div>
                                </td>
                                <td className="border px-4 py-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z" fill="#12B76A"></path></svg>
                                        <p>Không tốn phí</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-3">Trước Chuyến Đi hơn 7 Ngày</td>
                                <td className="border px-4 py-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z" fill="#12B76A"></path></svg>
                                        <p>Hoàn tiền giữ chỗ 70%</p>
                                    </div>
                                </td>
                                <td className="border px-4 py-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z" fill="#12B76A"></path></svg>
                                        <p>Đền tiền 30%</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-3">Trong Vòng 7 Ngày Trước Chuyến Đi</td>
                                <td className="border px-4 py-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM14.67 13.39C14.97 13.69 14.96 14.16 14.67 14.45C14.52 14.59 14.33 14.67 14.14 14.67C13.95 14.67 13.75 14.59 13.61 14.44L12.25 13.07L10.9 14.44C10.75 14.59 10.56 14.67 10.36 14.67C10.17 14.67 9.98 14.59 9.84 14.45C9.54 14.16 9.53999 13.69 9.82999 13.39L11.2 12L9.82999 10.61C9.53999 10.31 9.54 9.84 9.84 9.55C10.13 9.26 10.61 9.26 10.9 9.56L12.25 10.93L13.61 9.56C13.9 9.26 14.37 9.26 14.67 9.55C14.96 9.84 14.97 10.31 14.67 10.61L13.3 12L14.67 13.39Z" fill="#F04438"></path></svg>
                                        <p>Không hoàn tiền</p>
                                    </div>
                                </td>
                                <td className="border px-4 py-3">
                                    <div className="flex flex-col justify-center items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM14.67 13.39C14.97 13.69 14.96 14.16 14.67 14.45C14.52 14.59 14.33 14.67 14.14 14.67C13.95 14.67 13.75 14.59 13.61 14.44L12.25 13.07L10.9 14.44C10.75 14.59 10.56 14.67 10.36 14.67C10.17 14.67 9.98 14.59 9.84 14.45C9.54 14.16 9.53999 13.69 9.82999 13.39L11.2 12L9.82999 10.61C9.53999 10.31 9.54 9.84 9.84 9.55C10.13 9.26 10.61 9.26 10.9 9.56L12.25 10.93L13.61 9.56C13.9 9.26 14.37 9.26 14.67 9.55C14.96 9.84 14.97 10.31 14.67 10.61L13.3 12L14.67 13.39Z" fill="#F04438"></path></svg>
                                        <p>Đền tiền 100%</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <ul className="list-disc pl-6 text-gray-500 text-sm">
                        <li className="">Khách thuê không nhận xe sẽ không được hoàn tiền giữ chỗ.</li>
                        <li className="">Chủ xe không giao xe sẽ hoàn & đền 100% tiền giữ chỗ cho bạn.</li>
                        <li className="">Tiền giữ chỗ & bồi thường cho chủ xe hủy chuyến (nếu có) sẽ được Mioto hoàn trả đến bạn bằng chuyển khoản ngân hàng trong vòng 1-3 ngày làm việc.</li>
                    </ul>
                </div>
                {
                    rent.rentStatus !== "cancel" && rent.rentStatus !== "ongoing" &&
                    <button className='mt-4  rounded-lg w-full p-3 font-bold bg-red-500 text-white' onClick={() => handleCancelTrip(rentId)}>HỦY CHUYẾN</button>
                }
            </div>
        </>
    )
}

export default DetailRent