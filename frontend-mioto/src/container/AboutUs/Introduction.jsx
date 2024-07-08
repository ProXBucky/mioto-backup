function Introduction() {
    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 sm:py-5 md:py-8 lg:py-20 xl:py-20 flex flex-col gap-20">
            <div className="flex sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                <h1 className="sm:w-full md:w-full lg:w-1/3 xl:w-1/3 sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold">Mioto - Cùng bạn đến mọi hành trình</h1>
                <div className="sm:w-full md:w-full lg:w-2/3 xl:w-2/3 text-lg sm:mt-5 md:mt-8  lg:pl-20 xl:pl-20">
                    <p>
                        Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới xung quanh, là cơ hội học hỏi và chinh phục những điều mới lạ của mỗi cá nhân để trở nên tốt hơn. Do đó, chất lượng trải nghiệm của khách hàng là ưu tiên hàng đầu và là nguồn cảm hứng của đội ngũ MIOTO.
                    </p>
                    <br></br>
                    <p>
                        MIOTO là nền tảng chia sẻ ô tô, sứ mệnh của chúng tôi không chỉ dừng lại ở việc kết nối chủ xe và khách hàng một cách Nhanh chóng - An toàn - Tiện lợi, mà còn hướng đến việc truyền cảm hứng KHÁM PHÁ những điều mới lạ đến cộng đồng qua những chuyến đi trên nền tảng của chúng tôi.
                    </p>
                </div>
            </div>
            <img loading="lazy" src="/intro1.png" />
            <div className="flex sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                <div className="sm:w-full md:w-full lg:w-3/5 xl:w-3/5 text-lg lg:mr-20 xl:mr-20">
                    <h1 className="sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-bold mb-10">Drive. Explore. Inspire</h1>
                    <p>
                        <b>Cầm lái</b> và <b>Khám phá</b> thế giới đầy <b>Cảm hứng</b>.
                    </p>
                    <br></br>
                    <p>
                        MIOTO đặt mục tiêu trở thành cộng đồng người dùng ô tô Văn minh & Uy tín #1 tại Việt Nam, nhằm mang lại những giá trị thiết thực cho tất cả những thành viên hướng đến một cuộc sống tốt đẹp hơn.
                    </p>
                    <br></br>
                    <p>
                        Chúng tôi tin rằng mỗi hành trình đều quan trọng, vì vậy đội ngũ và các đối tác của MIOTO với nhiều kinh nghiệm về lĩnh vực cho thuê xe, công nghệ, bảo hiểm & du lịch sẽ mang đến cho hành trình của bạn thêm nhiều trải nghiệm mới lạ, thú vị cùng sự an toàn ở mức cao nhất.
                    </p>
                </div>
                <img loading="lazy" src="intro2.png" className="sm:w-full md:w-full lg:w-2/5 xl:w-2/5" />
            </div>
        </div>
    )
}

export default Introduction