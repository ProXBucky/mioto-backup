import { formatMoney } from "../../utils/formatMoney"

function CarPrice({ car, voucher, beginDate, endDate, carStatus,
    totalRentNotVoucher, totalRentVoucher, dayRent,
    handleOpenModalMap, handleOpenModalVoucher, handleCancelVoucher,
    handleOpenModalReport, handleOpenModalConfirmRent, handleOpenDateModal
}) {
    return (
        <>
            <div className=" bg-[#f7fbff] rounded-lg flex flex-col sm:p-3 md:p-3 lg:p-4 xl:p-4 gap-3 mb-3">
                <h1 className="font-black sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl">{formatMoney(car && car.pricePerDay && car.pricePerDay * 1000)} /ngày</h1>
                <div className="flex flex-row w-full cursor-pointer" onClick={handleOpenDateModal}>
                    <div className={`rounded-tl-lg rounded-bl-lg bg-white p-3 w-1/2 ${carStatus ? "border border-gray-600" : "border-1 border-red-500"}`}>
                        <p className="font-normal text-gray-500 mb-1 text-sm">Nhận xe</p>
                        <p className="font-semibold text-lg">{beginDate}</p>
                    </div>
                    <div className={`rounded-tr-lg rounded-br-lg  bg-white p-3 w-1/2 ${carStatus ? "border border-gray-600" : "border-1 border-l-red-50 border-red-500"}`}>
                        <p className="font-normal text-gray-500 mb-1 text-sm">Trả xe</p>
                        <p className="font-semibold text-lg">{endDate}</p>
                    </div>
                </div>
                {
                    !carStatus &&
                    <div className="flex gap-2">
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.98665 3.29624L2.12572 11.6364C1.73993 12.4061 2.2886 13.3332 3.13733 13.3332L12.8592 13.3332C13.7079 13.3332 14.2652 12.4148 13.8708 11.6364L9.00988 3.29624C8.5898 2.45659 7.40673 2.45659 6.98665 3.29624Z" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 6.61328V9.05328" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 10.6665H8.00599" stroke="#F04438" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <p className="text-red-500 text-[13px]">Xe bận trong khoảng thời gian trên. Vui lòng đặt xe khác hoặc thay đổi lịch trình thích hợp</p>
                    </div>
                }
                <div className="w-full rounded-md border bg-white p-3 cursor-pointer" onClick={handleOpenModalMap}>
                    <p className="text-sm">Địa điểm giao nhận xe</p>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold">{`${car && car.district && car.district} - ${car && car.city && car.city}`}</p>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                </div>

                <div className="my-1 border"></div>

                <div>
                    <div className="flex justify-between">
                        <p>Đơn giá thuê</p>
                        <span className="font-semibold">{formatMoney(totalRentNotVoucher)} / ngày</span>
                    </div>
                    <div className="flex justify-between">
                        <p>Bảo hiểm thuê xe</p>
                        <span className="font-semibold">{formatMoney(totalRentNotVoucher / 10)}/ ngày</span>
                    </div>
                </div>

                <div className="my-1 border"></div>

                <div>
                    <div className="flex justify-between">
                        <p>Tổng cộng</p>
                        <span className="font-semibold">{formatMoney(totalRentNotVoucher + totalRentNotVoucher / 10)} x {dayRent} ngày</span>
                    </div>
                </div>

                <div className="my-1 border"></div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-row items-center w-3/4 gap-3">
                        <p>Mã giảm giá</p>
                        {
                            voucher && voucher.voucherCode ?
                                <>
                                    <p className="text-black font-bold text-lg">{voucher && voucher.voucherCode}</p>
                                    <i className="fa-solid fa-xmark fa-lg cursor-pointer" onClick={handleCancelVoucher}></i>
                                </>
                                :
                                <button className="p-1 bg-main text-white rounded-md w-1/3" onClick={handleOpenModalVoucher}>Chọn mã</button>
                        }
                    </div>
                    <span className="font-semibold">{voucher && voucher.voucherMoney === 0 ? formatMoney(0) : formatMoney(voucher && -voucher.voucherMoney)}</span>
                </div>


                <div className="my-1 border"></div>
                <div className="flex justify-between font-bold text-lg">
                    <p>Thành tiền</p>
                    <span className="font-black">{formatMoney(totalRentVoucher)}</span>
                </div>
                {
                    carStatus ?
                        <button className="p-3 bg-main text-white font-bold text-lg rounded-md uppercase" onClick={handleOpenModalConfirmRent}>Chọn thuê</button>
                        :
                        <div className="text-center p-3 bg-gray-300 text-white font-bold text-lg rounded-md uppercase cursor-not-allowed">Chọn thuê</div>

                }
            </div>
            <p className="text-center text-lg font-semibold hover:text-main cursor-pointer" onClick={handleOpenModalReport}><i className="fa-regular fa-flag mr-3"></i>Báo cáo xe này</p>
        </>
    )
}

export default CarPrice