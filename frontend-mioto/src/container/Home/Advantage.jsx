import Slider from "react-slick"

function Advantage() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
    }

    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>Ưu Điểm Của Mioto</h1>
                <h2 className='h-6 sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-medium sm:mt-3 md:mt-5 lg:mt-5 xl:mt-5'>Những tính năng giúp bạn dễ dàng hơn khi thuê xe trên Mioto.</h2>
            </div>

            <div className="flex flex-wrap sm:hidden md:gap-6 lg:gap-8 xl:gap-10">
                <div className="flex flex-col outline-none items-center md:w-[48%] lg:w-[31%] xl:w-[31%] md:px-5 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/advan1.svg" />
                    <h2 className="text-2xl font-semibold md:py-4 lg:py-5 xl:py-5">Lái xe an toàn cùng Mioto</h2>
                    <p className="text-base">Chuyến đi trên Mioto được bảo vệ với Gói bảo hiểm thuê xe tự lái từ MIC & VNI. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.</p>
                </div>
                <div className="flex flex-col outline-none items-center md:w-[48%] lg:w-[31%] xl:w-[31%] md:px-5 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/advan2.svg" />
                    <h2 className="text-2xl font-semibold md:py-4 lg:py-5 xl:py-5">An tâm đặt xe</h2>
                    <p className="text-base">Không tính phí huỷ chuyến trong vòng 1h sau khi đặt cọc. Hoàn cọc và bồi thường 100% nếu chủ xe huỷ chuyến trong vòng 7 ngày trước chuyến đi.</p>
                </div>
                <div className="flex flex-col outline-none items-center md:w-[48%] lg:w-[31%] xl:w-[31%] md:px-5 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/advan3.svg" />
                    <h2 className="text-2xl font-semibold md:py-4 lg:py-5 xl:py-5">Thủ tục đơn giản</h2>
                    <p className="text-base">Chỉ cần có CCCD gắn chip (Hoặc Passport) & Giấy phép lái xe là bạn đã đủ điều kiện thuê xe trên Mioto.</p>
                </div>
                <div className="flex flex-col outline-none items-center md:w-[48%] lg:w-[31%] xl:w-[31%] md:px-5 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/advan4.svg" />
                    <h2 className="text-2xl font-semibold md:py-4 lg:py-5 xl:py-5">Thanh toán dễ dàng</h2>
                    <p className="text-base">Đa dạng hình thức thanh toán: ATM, thẻ Visa & Ví điện tử (Momo, VnPay, ZaloPay).</p>
                </div>
                <div className="flex flex-col outline-none items-center md:w-[48%] lg:w-[31%] xl:w-[31%] md:px-5 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/advan5.svg" />
                    <h2 className="text-2xl font-semibold md:py-4 lg:py-5 xl:py-5">Giao xe tận nơi</h2>
                    <p className="text-base">Bạn có thể lựa chọn giao xe tận nhà/sân bay... Phí tiết kiệm chỉ từ 15k/km.</p>
                </div>
                <div className="flex flex-col outline-none items-center md:w-[48%] lg:w-[31%] xl:w-[31%] md:px-5 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/advan6.svg" />
                    <h2 className="text-2xl font-semibold md:py-4 lg:py-5 xl:py-5">Dòng xe đa dạng</h2>
                    <p className="text-base">Hơn 100 dòng xe cho bạn tuỳ ý lựa chọn: Mini, Sedan, CUV, SUV, MPV, Bán tải.</p>
                </div>

            </div>

            <div className="sm:block md:hidden lg:hidden xl:hidden text-center">
                <Slider {...settings}>
                    <div className="flex flex-col outline-none justify-center items-center w-full px-3">
                        <img loading="lazy" className="w-3/4 mx-auto" src="/advan1.svg" />
                        <h2 className="text-2xl font-semibold py-3">Lái xe an toàn cùng Mioto</h2>
                        <p className="text-base">Chuyến đi trên Mioto được bảo vệ với Gói bảo hiểm thuê xe tự lái từ MIC & VNI. Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.</p>
                    </div>
                    <div className="flex flex-col outline-none justify-center items-center w-full px-3">
                        <img loading="lazy" className="w-3/4 mx-auto" src="/advan2.svg" />
                        <h2 className="text-2xl font-semibold py-3">An tâm đặt xe</h2>
                        <p className="text-base">Không tính phí huỷ chuyến trong vòng 1h sau khi đặt cọc. Hoàn cọc và bồi thường 100% nếu chủ xe huỷ chuyến trong vòng 7 ngày trước chuyến đi.</p>
                    </div>
                    <div className="flex flex-col outline-none justify-center items-center w-full px-3">
                        <img loading="lazy" className="w-3/4 mx-auto" src="/advan3.svg" />
                        <h2 className="text-2xl font-semibold py-3">Thủ tục đơn giản</h2>
                        <p className="text-base">Chỉ cần có CCCD gắn chip (Hoặc Passport) & Giấy phép lái xe là bạn đã đủ điều kiện thuê xe trên Mioto.</p>
                    </div>
                    <div className="flex flex-col outline-none justify-center items-center w-full px-3">
                        <img loading="lazy" className="w-3/4 mx-auto" src="/advan4.svg" />
                        <h2 className="text-2xl font-semibold py-3">Thanh toán dễ dàng</h2>
                        <p className="text-base">Đa dạng hình thức thanh toán: ATM, thẻ Visa & Ví điện tử (Momo, VnPay, ZaloPay).</p>
                    </div>
                    <div className="flex flex-col outline-none justify-center items-center w-full px-3">
                        <img loading="lazy" className="w-3/4 mx-auto" src="/advan5.svg" />
                        <h2 className="text-2xl font-semibold py-3">Giao xe tận nơi</h2>
                        <p className="text-base">Bạn có thể lựa chọn giao xe tận nhà/sân bay... Phí tiết kiệm chỉ từ 15k/km.</p>
                    </div>
                    <div className="flex flex-col outline-none justify-center items-center w-full px-3">
                        <img loading="lazy" className="w-3/4 mx-auto" src="/advan6.svg" />
                        <h2 className="text-2xl font-semibold py-3">Dòng xe đa dạng</h2>
                        <p className="text-base">Hơn 100 dòng xe cho bạn tuỳ ý lựa chọn: Mini, Sedan, CUV, SUV, MPV, Bán tải.</p>
                    </div>
                </Slider>
            </div>

        </div >
    )

}

export default Advantage