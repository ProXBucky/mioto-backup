import Slider from "react-slick"

function WhyChoose() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
    }

    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 py-10">
            <h1 className='sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-center'>Tại sao bạn nên cho thuê xe trên MIOTO?</h1>
            <div className="flex flex-wrap gap-[20px] mt-16 sm:hidden md:hidden">
                <div className="w-[calc(33.33%-14px)] rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Thu nhập</h3>
                            <p>Gia tăng thu nhập từ 5-10 triệu/tháng.</p>
                        </div>
                        <img loading="lazy" src="/wc1.svg" className="w-1/2" />


                    </div>
                </div>

                <div className="w-[calc(33.33%-14px)] rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Nhanh chóng</h3>
                            <p>Thủ tục đăng ký cho thuê ONLINE nhanh chóng trong 10 phút</p>
                        </div>
                        <img loading="lazy" src="/wc2.svg" className="w-1/2" />


                    </div>
                </div>

                <div className="w-[calc(33.33%-14px)] rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Chủ động</h3>
                            <p>Toàn quyền quyết định giá & thời gian cho thuê.</p>
                        </div>
                        <img loading="lazy" src="/wc3.svg" className="w-1/2" />


                    </div>
                </div>

                <div className="w-[calc(33.33%-14px)] rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Bảo hiểm</h3>
                            <p>Hỗ trợ bảo hiểm mất cắp xe nguyên chiếc từ MIC & VNI</p>
                        </div>
                        <img loading="lazy" src="/wc4.svg" className="w-1/2" />


                    </div>
                </div>

                <div className="w-[calc(33.33%-14px)] rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <h3 className="text-xl font-semibold mb-4">GPS</h3>
                            <p>Hỗ trợ cài đặt GPS với giá gốc để quản lí xe an toàn.</p>
                        </div>
                        <img loading="lazy" src="/wc5.svg" className="w-1/2" />


                    </div>
                </div>

                <div className="w-[calc(33.33%-14px)] rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Chăm sóc đối tác</h3>
                            <p>Đội ngũ Mioto tư vấn chặt chẽ QUY TRÌNH & KINH NGHIỆM cho thuê chặt chẽ và an toàn</p>
                        </div>
                        <img loading="lazy" src="/wc6.svg" className="w-1/2" />


                    </div>
                </div>

            </div>

            <div className="mt-16 sm:block md:block lg:hidden xl:hidden">
                <Slider {...settings}>
                    <div className="rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-row">
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold mb-4">Thu nhập</h3>
                                <p>Gia tăng thu nhập từ 5-10 triệu/tháng.</p>
                            </div>
                            <img loading="lazy" src="/wc1.svg" className="w-1/2" />


                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-row">
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold mb-4">Nhanh chóng</h3>
                                <p>Thủ tục đăng ký cho thuê ONLINE nhanh chóng trong 10 phút</p>
                            </div>
                            <img loading="lazy" src="/wc2.svg" className="w-1/2" />


                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-row">
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold mb-4">Chủ động</h3>
                                <p>Toàn quyền quyết định giá & thời gian cho thuê.</p>
                            </div>
                            <img loading="lazy" src="/wc3.svg" className="w-1/2" />


                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-row">
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold mb-4">Bảo hiểm</h3>
                                <p>Hỗ trợ bảo hiểm mất cắp xe nguyên chiếc từ MIC & VNI</p>
                            </div>
                            <img loading="lazy" src="/wc4.svg" className="w-1/2" />


                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-row">
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold mb-4">GPS</h3>
                                <p>Hỗ trợ cài đặt GPS với giá gốc để quản lí xe an toàn.</p>
                            </div>
                            <img loading="lazy" src="/wc5.svg" className="w-1/2" />


                        </div>
                    </div>

                    <div className="rounded-2xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-row">
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold mb-4">Chăm sóc đối tác</h3>
                                <p>Đội ngũ Mioto tư vấn chặt chẽ QUY TRÌNH & KINH NGHIỆM cho thuê chặt chẽ và an toàn</p>
                            </div>
                            <img loading="lazy" src="/wc6.svg" className="w-1/2" />


                        </div>
                    </div>
                </Slider>

            </div>
        </div>
    )

}

export default WhyChoose