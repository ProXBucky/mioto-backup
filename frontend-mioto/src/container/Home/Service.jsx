import Slider from "react-slick"

function Service() {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1,
    }

    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 sm:py-16 md:py-24 md:pb-[600px] lg:py-20 xl:py-20">
            <div className='text-center mb-20'>
                <h1 className='h-12 sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>Dịch Vụ Của Mioto</h1>
            </div>
            <div className="sm:hidden flex justify-between relative">
                <div className="relative">
                    <img loading="lazy" src="/service1.png" className="pb-10" />
                    <div className="absolute left-12 bottom-20">
                        <h1 className="text-4xl font-bold mb-3 text-white">Xe đã sẵn sàng.</h1>
                        <h1 className="text-4xl font-bold mb-3 text-white">Bắt đầu hành trình ngay!</h1>
                        <p className="text-base text-white">
                            Tự tay cầm lái chiếc xe bạn yêu thích cho hành trình thêm hứng khởi.
                        </p>
                        <button className="mt-10 px-20 py-4 rounded-lg bg-main text-white font-semibold">Thuê xe tự lái</button>
                    </div>
                </div>
                <div className="absolute md:top-[100%] lg:top-[50px] xl:top-[50px] right-0">
                    <img loading="lazy" src="/service2.png" />
                    <div className="absolute right-12 bottom-10 text-right ">
                        <h1 className="text-4xl font-bold mb-3 text-white">Tài xế của bạn đã đến!</h1>
                        <p className="text-base text-white">
                            Chuyến đi thêm thú vị
                            cùng các bác tài 5* trên Mioto
                        </p>
                        <button className="mt-10 px-20 py-4 rounded-lg bg-main text-white font-semibold">Thuê xe có tài xế</button>
                    </div>
                </div>
            </div>

            <div className="sm:block md:hidden lg:hidden xl:hidden">
                <Slider {...settings}>
                    <div className="relative">
                        <img loading="lazy" src="/service1.png" />
                        <div className="absolute bottom-[15px] left-[15px] pr-10">
                            <h1 className="text-xl font-bold mb-2 text-white">Xe đã sẵn sàng.</h1>
                            <h1 className="text-xl font-bold mb-2 text-white">Bắt đầu hành trình ngay!</h1>
                            <p className="text-sm text-white">
                                Tự tay cầm lái chiếc xe bạn yêu thích cho hành trình thêm hứng khởi.
                            </p>
                            <button className="mt-3 px-8 py-2 rounded-lg bg-main text-sm text-white font-semibold">Thuê xe tự lái</button>
                        </div>
                    </div>
                    <div className="relative">
                        <img loading="lazy" src="/service2.png" />
                        <div className="absolute right-[15px] bottom-[15px] text-right pl-16">
                            <h1 className="text-xl font-bold mb-3 text-white">Tài xế của bạn đã đến!</h1>
                            <p className="text-base text-white pl-10">
                                Chuyến đi thêm thú vị
                                cùng các bác tài 5* trên Mioto
                            </p>
                            <button className="mt-3 px-8 py-2 text-sm rounded-lg bg-main text-white font-semibold">Thuê xe có tài xế</button>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )

}

export default Service