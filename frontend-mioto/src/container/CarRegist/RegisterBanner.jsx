function RegisterBanner({ handleRegistCar }) {
    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 pb-20">
            <div className="p-10 text-black text-base h-[700px] rounded-2xl relative "
                style={{
                    backgroundImage: `url("/backRegister.png")`
                }}>
                <div className="sm:w-[90%] md:w-[90%] lg:w-[66%] xl:w-[53%] sm:p-4 md:p-14 lg:p-14 xl:p-14 sm:pr-4 md:pr-24 lg:pr-24 xl:pr-24 absolute sm:bottom-[100px] sm:left-[5%]  bottom-10" style={{
                    background: `url("/backWhite.png") no-repeat`
                }}>
                    <h2 className="sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl font-bold mb-3"><b className="text-main">Cho Thuê Xe</b> Trên Mioto Để Gia Tăng Thu Nhập Đến 10tr/Tháng!</h2>
                    <p>
                        Mioto không thu phí khi bạn đăng xe. Bạn chỉ chia sẻ phí dịch vụ với Mioto khi có giao dịch cho thuê thành công.
                    </p>
                    <div className="border-b-2 py-3 mb-3"></div>
                    <div>
                        <p>
                            Hotline: 1900 9217 (T2-T7 9AM-9PM)
                        </p>
                        <p>
                            Hoặc để lại tin nhắn cho Mioto qua Fanpage
                        </p>
                    </div>
                    <button className="sm:mt-2 md:mt-10 lg:mt-10 xl:mt-10 sm:px-14 md:px-14 lg:px-20 xl:px-20 py-3 rounded-lg bg-black text-white font-semibold" onClick={handleRegistCar}>Đăng ký ngay</button>
                </div>
            </div>

        </div>
    )
}

export default RegisterBanner