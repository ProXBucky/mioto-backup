import Slider from "react-slick"

function IncomeSum() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 1
    }

    return (
        <>
            <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 py-10 bg-gray-100">
                <h1 className='sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-center'>Thu nhập ước tính của chủ xe</h1>
                <p className="text-md mt-5 text-center sm:px-5 md:px-10 lg:px-64 xl:px-64">Mioto dựa trên dữ liệu thu nhập bình quân 6 tháng gần nhất của các chủ xe đang kinh doanh hiệu quả trên hệ thống và thống kê theo từng khu vực.</p>
                <table className="w-full border-collapse border border-gray-300 mt-10 rounded-xl text-center font-semibold">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 py-4 px-4 sm:text-sm invisible">Cột 1</th>
                            <th className="border border-gray-300 py-4 px-4 sm:text-sm text-lg">Thu nhập / tháng</th>
                            <th className="border border-gray-300 py-4 px-4 sm:text-sm text-lg">Số ngày cho thuê / tháng</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">TP.HCM (khu vực trung tâm)</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">Từ 5 - 10 triệu</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">Từ 6 - 12 ngày</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">TP.HCM (khu vực ngoại thành)</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">3 - 6</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">4 - 8</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">Hà Nội (khu vực trung tâm)</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">5 - 8</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">6 - 10</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">Hà Nội (khu vực ngoại thành)</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">3 - 6</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">4 - 8</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">Đà Nẵng</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">3 - 6</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">4 - 8</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">Bình Dương</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">3 - 6</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">4 - 8</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">Đà Lạt</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">3 - 6</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">4 - 8</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">Phú Quốc</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">3 - 6</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">4 - 8</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">TP khác</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">2 - 5</td>
                            <td className="border border-gray-300 py-4 px-4 sm:text-sm">3 - 6</td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-center text-sm mt-5 text-gray-500 sm:px-5 md:px-10 lg:px-64 xl:px-64">* Lưu ý: Thu nhập của chủ xe khi cho thuê trên Mioto còn tùy thuộc vào nhiều yếu tố, bao gồm thời gian xe sẵn sàng cho thuê mỗi tháng, mức giá cho thuê và nhu cầu thuê xe ở khu vực của bạn.</p>
            </div>
            <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 py-20 border-b border-gray-300">
                <h1 className='sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-center'>Ba bước đăng ký xe trên MIOTO</h1>

                <div className="flex flex-wrap gap-[20px] mt-4 sm:hidden md:hidden">
                    <div className="w-[calc(33.33%-14px)] rounded-xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-col-reverse relative">
                            <p className="p-3 bg-main w-10 rounded-xl text-white absolute top-[-25px] right-[-25px] text-lg font-semibold">1.</p>
                            <div className="w-full mt-5">
                                <h3 className="text-2xl font-semibold mb-4">Tải app và điền thông tin</h3>
                                <p>Cách 1: Tải app Mioto, vào mục Xe của tôi và đăng kí xe theo hướng dẫn.</p>
                                <p>Cách 2: Điền thông tin theo mẫu để Mioto hỗ trợ tư vấn quy trình đăng kí. (Mẫu đăng kí).</p>
                            </div>
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M52.5 17.5V42.5C52.5 50 48.75 55 40 55H20C11.25 55 7.5 50 7.5 42.5V17.5C7.5 10 11.25 5 20 5H40C48.75 5 52.5 10 52.5 17.5Z" stroke="#6AD28E" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M36.25 11.25V16.25C36.25 19 38.5 21.25 41.25 21.25H46.25" stroke="#6AD28E" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20 32.5H30" stroke="#6AD28E" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20 42.5H40" stroke="#6AD28E" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                    </div>

                    <div className="w-[calc(33.33%-14px)] rounded-xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-col-reverse relative">
                            <p className="p-3 bg-main w-10 rounded-xl text-white absolute top-[-25px] right-[-25px] text-lg font-semibold">2.</p>
                            <div className="w-full mt-5">
                                <h3 className="text-2xl font-semibold mb-4">Xác nhận thông tin</h3>
                                <p>Nhân viên Mioto liên hệ chủ xe tư vấn thủ tục & quy trình cho thuê xe trong vòng 1 ngày sau khi nhận được thông tin.</p>
                            </div>
                            <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.782 28.8063C30.7036 28.8063 33.0719 26.4379 33.0719 23.5164C33.0719 20.5949 30.7036 18.2266 27.782 18.2266C24.8605 18.2266 22.4922 20.5949 22.4922 23.5164C22.4922 26.4379 24.8605 28.8063 27.782 28.8063Z" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1172 43.4332V40.4135C17.1172 36.9012 19.9656 34.0742 23.4564 34.0742H32.9439C36.4562 34.0742 39.2832 36.9226 39.2832 40.4135V43.4332" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M28.2106 47.6321C39.1514 47.6321 48.0208 38.7628 48.0208 27.8219C48.0208 16.881 39.1514 8.01172 28.2106 8.01172C17.2697 8.01172 8.40039 16.881 8.40039 27.8219C8.40039 38.7628 17.2697 47.6321 28.2106 47.6321Z" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M42.1314 54.1241C35.2915 54.1241 29.75 48.5826 29.75 41.7427C29.75 34.9028 35.2915 29.3613 42.1314 29.3613C48.9712 29.3613 54.5127 34.9028 54.5127 41.7427C54.5127 48.5826 48.9712 54.1241 42.1314 54.1241Z" fill="#F7FDF9"></path><path d="M41.516 43.8578L39.1602 41.502" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M46.2272 39.1465L41.5156 43.8581" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                    </div>

                    <div className="w-[calc(33.33%-14px)] rounded-xl border-2 border-[#cff1db] bg-[#f7fdf9] p-6 mt-5">
                        <div className="flex flex-col-reverse relative">
                            <p className="p-3 bg-main w-10 rounded-xl text-white absolute top-[-25px] right-[-25px] text-lg font-semibold">3.</p>
                            <div className="w-full mt-5">
                                <h3 className="text-2xl font-semibold mb-4">Duyệt xe</h3>
                                <p>Bắt đầu cho thuê xe trên Mioto sau khi nhận thông báo xe đã được phê duyệt.</p>
                            </div>
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47.875 42.0606H49C51.275 42.0606 53.1 39.9106 53.1 37.3606V33.8856C53.1 32.0606 52.15 30.3606 50.675 29.6106L46.975 27.6856L43.675 21.7606C42.725 20.0356 41.05 19.0106 39.275 19.0356H25.3C23.675 19.0356 22.15 19.8856 21.175 21.3356L16.925 27.6106L9.9 29.7606C8.1 30.3106 6.875 32.1606 6.875 34.2606V37.3356C6.875 39.8856 8.7 42.0356 10.975 42.0356H11.575" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22.1758 42.0605H36.9258" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.7258 46.4105C19.5839 46.4105 21.9008 44.0936 21.9008 41.2355C21.9008 38.3775 19.5839 36.0605 16.7258 36.0605C13.8677 36.0605 11.5508 38.3775 11.5508 41.2355C11.5508 44.0936 13.8677 46.4105 16.7258 46.4105Z" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M42.6984 46.4105C45.5565 46.4105 47.8734 44.0936 47.8734 41.2355C47.8734 38.3775 45.5565 36.0605 42.6984 36.0605C39.8404 36.0605 37.5234 38.3775 37.5234 41.2355C37.5234 44.0936 39.8404 46.4105 42.6984 46.4105Z" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M41.9321 32.7608C35.0923 32.7608 29.5508 27.2193 29.5508 20.3794C29.5508 13.5395 35.0923 7.99805 41.9321 7.99805C48.772 7.99805 54.3135 13.5395 54.3135 20.3794C54.3135 27.2193 48.772 32.7608 41.9321 32.7608Z" fill="#F7FDF9"></path><path d="M41.3167 22.4945L38.9609 20.1387" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M46.028 17.7832L41.3164 22.4948" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="mt-4 lg:hidden xl:hidden">
                    <Slider {...settings}>
                        <div className="w-full rounded-xl border-2 border-[#cff1db] bg-[#f7fdf9] sm:h-[400px] md:h-[300px] p-3">
                            <div className="flex flex-col-reverse relative">
                                <p className="p-3 bg-main w-10 rounded-xl text-white absolute top-[-17px] right-[-17px] text-lg font-semibold">1.</p>
                                <div className="w-full mt-5">
                                    <h3 className="text-2xl font-semibold mb-4">Tải app và điền thông tin</h3>
                                    <p>Cách 1: Tải app Mioto, vào mục Xe của tôi và đăng kí xe theo hướng dẫn.</p>
                                    <p>Cách 2: Điền thông tin theo mẫu để Mioto hỗ trợ tư vấn quy trình đăng kí. (Mẫu đăng kí).</p>
                                </div>
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M52.5 17.5V42.5C52.5 50 48.75 55 40 55H20C11.25 55 7.5 50 7.5 42.5V17.5C7.5 10 11.25 5 20 5H40C48.75 5 52.5 10 52.5 17.5Z" stroke="#6AD28E" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M36.25 11.25V16.25C36.25 19 38.5 21.25 41.25 21.25H46.25" stroke="#6AD28E" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20 32.5H30" stroke="#6AD28E" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20 42.5H40" stroke="#6AD28E" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                        </div>

                        <div className="w-full rounded-xl border-2 border-[#cff1db] bg-[#f7fdf9] sm:h-[400px] md:h-[300px] p-3">
                            <div className="flex flex-col-reverse relative">
                                <p className="p-3 bg-main w-10 rounded-xl text-white absolute top-[-17px] right-[-17px] text-lg font-semibold">2.</p>
                                <div className="w-full mt-5">
                                    <h3 className="text-2xl font-semibold mb-4">Xác nhận thông tin</h3>
                                    <p>Nhân viên Mioto liên hệ chủ xe tư vấn thủ tục & quy trình cho thuê xe trong vòng 1 ngày sau khi nhận được thông tin.</p>
                                </div>
                                <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.782 28.8063C30.7036 28.8063 33.0719 26.4379 33.0719 23.5164C33.0719 20.5949 30.7036 18.2266 27.782 18.2266C24.8605 18.2266 22.4922 20.5949 22.4922 23.5164C22.4922 26.4379 24.8605 28.8063 27.782 28.8063Z" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1172 43.4332V40.4135C17.1172 36.9012 19.9656 34.0742 23.4564 34.0742H32.9439C36.4562 34.0742 39.2832 36.9226 39.2832 40.4135V43.4332" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M28.2106 47.6321C39.1514 47.6321 48.0208 38.7628 48.0208 27.8219C48.0208 16.881 39.1514 8.01172 28.2106 8.01172C17.2697 8.01172 8.40039 16.881 8.40039 27.8219C8.40039 38.7628 17.2697 47.6321 28.2106 47.6321Z" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M42.1314 54.1241C35.2915 54.1241 29.75 48.5826 29.75 41.7427C29.75 34.9028 35.2915 29.3613 42.1314 29.3613C48.9712 29.3613 54.5127 34.9028 54.5127 41.7427C54.5127 48.5826 48.9712 54.1241 42.1314 54.1241Z" fill="#F7FDF9"></path><path d="M41.516 43.8578L39.1602 41.502" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M46.2272 39.1465L41.5156 43.8581" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                        </div>

                        <div className="w-full rounded-xl border-2 border-[#cff1db] bg-[#f7fdf9] sm:h-[400px] md:h-[300px] p-3">
                            <div className="flex flex-col-reverse relative">
                                <p className="p-3 bg-main w-10 rounded-xl text-white absolute top-[-17px] right-[-17px] text-lg font-semibold">3.</p>
                                <div className="w-full mt-5">
                                    <h3 className="text-2xl font-semibold mb-4">Duyệt xe</h3>
                                    <p>Bắt đầu cho thuê xe trên Mioto sau khi nhận thông báo xe đã được phê duyệt.</p>
                                </div>
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47.875 42.0606H49C51.275 42.0606 53.1 39.9106 53.1 37.3606V33.8856C53.1 32.0606 52.15 30.3606 50.675 29.6106L46.975 27.6856L43.675 21.7606C42.725 20.0356 41.05 19.0106 39.275 19.0356H25.3C23.675 19.0356 22.15 19.8856 21.175 21.3356L16.925 27.6106L9.9 29.7606C8.1 30.3106 6.875 32.1606 6.875 34.2606V37.3356C6.875 39.8856 8.7 42.0356 10.975 42.0356H11.575" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22.1758 42.0605H36.9258" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.7258 46.4105C19.5839 46.4105 21.9008 44.0936 21.9008 41.2355C21.9008 38.3775 19.5839 36.0605 16.7258 36.0605C13.8677 36.0605 11.5508 38.3775 11.5508 41.2355C11.5508 44.0936 13.8677 46.4105 16.7258 46.4105Z" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M42.6984 46.4105C45.5565 46.4105 47.8734 44.0936 47.8734 41.2355C47.8734 38.3775 45.5565 36.0605 42.6984 36.0605C39.8404 36.0605 37.5234 38.3775 37.5234 41.2355C37.5234 44.0936 39.8404 46.4105 42.6984 46.4105Z" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M41.9321 32.7608C35.0923 32.7608 29.5508 27.2193 29.5508 20.3794C29.5508 13.5395 35.0923 7.99805 41.9321 7.99805C48.772 7.99805 54.3135 13.5395 54.3135 20.3794C54.3135 27.2193 48.772 32.7608 41.9321 32.7608Z" fill="#F7FDF9"></path><path d="M41.3167 22.4945L38.9609 20.1387" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M46.028 17.7832L41.3164 22.4948" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>


        </>
    )
}

export default IncomeSum