function Help() {
    return (
        <div className="sm:px-3 md:px-5 lg:px-16 xl:px-32 sm:pb-20 sm:pt-16 md:pt-[100px] md:pb-[50px] lg:py-20 xl:py-20">
            <div className='text-center sm:mb-5 md:mb-20 lg:mb-20 xl:mb-20'>
                <h1 className='h-12 sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>Hướng Dẫn Thuê Xe</h1>
                <h2 className='h-6 sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-medium sm:mt-2 md:mt-5 lg:mt-5 xl:mt-5'>Chỉ với 4 bước đơn giản để trải nghiệm thuê xe Mioto một cách nhanh chóng</h2>
            </div>
            <div className="flex flex-wrap">
                <div className="flex flex-col items-center sm:w-1/2 md:w-1/2 lg:w-[25%] xl:w-[25%] sm:px-3 md:px-10 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/help1.svg" className="sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px]" />
                    <div className="flex flex-row sm:gap-2 md:gap-5 lg:gap-5 xl:gap-5 sm:mt-2 md:mt-5 lg:mt-5 xl:mt-5">
                        <h5 className="text-main font-bold sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl">01</h5>
                        <h2 className="sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-semibold">Đặt xe trên app/web Mioto</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:w-1/2 md:w-1/2 lg:w-[25%] xl:w-[25%] sm:px-3 md:px-10 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/help2.svg" className="sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px]" />
                    <div className="flex flex-row sm:gap-2 md:gap-5 lg:gap-5 xl:gap-5 sm:mt-2 md:mt-5 lg:mt-5 xl:mt-5">
                        <h5 className="text-main font-bold sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl">02</h5>
                        <h2 className="sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-semibold">Nhận xe</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:w-1/2 md:w-1/2 lg:w-[25%] xl:w-[25%] sm:px-3 md:px-10 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/help3.svg" className="sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px]" />
                    <div className="flex flex-row sm:gap-2 md:gap-5 lg:gap-5 xl:gap-5 sm:mt-2 md:mt-5 lg:mt-5 xl:mt-5">
                        <h5 className="text-main font-bold sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl">03</h5>
                        <h2 className="sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-semibold">Bắt đầu hành trình</h2>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:w-1/2 md:w-1/2 lg:w-[25%] xl:w-[25%] sm:px-3 md:px-10 lg:px-10 xl:px-10">
                    <img loading="lazy" src="/help4.svg" className="sm:h-[200px] md:h-[200px] lg:h-[200px] xl:h-[200px]" />
                    <div className="flex flex-row sm:gap-2 md:gap-5 lg:gap-5 xl:gap-5 sm:mt-2 md:mt-5 lg:mt-5 xl:mt-5">
                        <h5 className="text-main font-bold sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl">04</h5>
                        <h2 className="sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-semibold">Trả xe và kết thúc chuyến đi</h2>
                    </div>
                </div>
            </div>

        </div >
    )

}

export default Help