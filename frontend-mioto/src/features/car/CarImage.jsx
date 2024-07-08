import Slider from "react-slick"

function CarImage({ car, carImgs, handleOpenModalViewImg }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1
    }

    return (
        <>
            <div className="flex flex-row lg:h-[600px] xl:h-[600px] relative sm:hidden md:hidden">
                <div className="w-[calc(68%)] pr-6">
                    <img loading="lazy" src={car && car.images && car.images[0] && car.images[0].imageLink} className="w-full h-full object-cover rounded-2xl cursor-pointer" alt="Car 1" />
                </div>
                <div className="w-[calc(32%)] flex flex-col gap-4">
                    <img loading="lazy" src={car && car.images && car.images[1] && car.images[1].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 2" />
                    <img loading="lazy" src={car && car.images && car.images[2] && car.images[2].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 3" />
                    <img loading="lazy" src={car && car.images && car.images[3] && car.images[3].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 4" />
                </div>
                <div className="rounded-lg border bg-white flex flex-row absolute bottom-5 right-5 p-2 items-center gap-2 cursor-pointer" onClick={() => handleOpenModalViewImg(carImgs)}>
                    <i className="fa-regular fa-images"></i>
                    <p>Xem tất cả ảnh</p>
                </div>
            </div>

            <div className="sm:h-[320px] md:h-[600px] lg:hidden xl:hidden">
                <Slider {...settings}>
                    <img loading="lazy" src={car && car.images && car.images[0] && car.images[0].imageLink} className="w-full h-full object-cover rounded-2xl cursor-pointer" alt="Car 1" />
                    <img loading="lazy" src={car && car.images && car.images[1] && car.images[1].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 2" />
                    <img loading="lazy" src={car && car.images && car.images[2] && car.images[2].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 3" />
                    <img loading="lazy" src={car && car.images && car.images[3] && car.images[3].imageLink} className="h-[30.7%] object-cover rounded-2xl cursor-pointer" alt="Car 4" />
                </Slider>
                <div className="w-full mt-5">
                    <div className="sm:w-2/3 md:w-1/3 rounded-lg border bg-gray-100 flex flex-row sm:py-2 md:py-3 sm:px-5 md:px-5 mx-auto items-center gap-2 cursor-pointer" onClick={() => handleOpenModalViewImg(carImgs)}>
                        <i className="fa-regular fa-images"></i>
                        <p className="text-center font-semibold">Xem tất cả ảnh</p>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CarImage