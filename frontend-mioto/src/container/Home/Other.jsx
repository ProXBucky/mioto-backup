import { Link } from "react-router-dom"

function Other() {
    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 py-20">
            <div className=" rounded-2xl flex sm:flex-col md:flex-col lg:flex-row xl:flex-row h-auto sm:mb-8 md:mb-20 lg:mb-20 xl:mb-20 bg-[#effaf3]">
                <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 sm:p-3 md:p-8 lg:p-8 xl:p-8 flex justify-center">
                    <img loading="lazy" src="/other1.png" />
                </div>
                <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 sm:p-5 md:p-16 lg:p-16 xl:p-16 flex flex-col justify-center items-center text-center">
                    <div>
                        <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M64.7367 45.3824L53.7663 17.3473C53.1936 15.9196 51.8344 15 50.2977 15H39.9565C38.7062 15 37.5447 15.6211 36.8509 16.6577L32.4991 23.1673L28.1472 16.6617C27.4535 15.6211 26.2919 15 25.0416 15H14.7004C13.1637 15 11.8005 15.9236 11.2238 17.3635L0.269489 45.3662C-0.194333 46.5197 -0.0531702 47.8225 0.64458 48.8509C1.3383 49.8794 2.49584 50.4925 3.73807 50.4925H3.7421L24.7109 50.4642C26.3686 50.4642 27.8447 49.347 28.3045 47.7378L32.4991 32.597L36.6977 47.7539C37.1534 49.347 38.6296 50.4602 40.2832 50.4642L61.2561 50.4925H61.2601C62.5023 50.4925 63.6558 49.8794 64.3536 48.8509C65.0513 47.8225 65.1925 46.5197 64.7367 45.3824ZM24.1785 46.0357L4.74638 46.064L15.1683 19.4285H24.6665L29.5346 26.7044L24.1785 46.0357ZM40.8156 46.0357L35.4595 26.7044L40.3276 19.4285H49.8259L60.2477 46.064L40.8156 46.0357Z" fill="#5FCF86"></path></svg>
                    </div>
                    <h1 className="sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold py-5">Bạn muốn biết thêm về Mioto</h1>
                    <p>Mioto kết nối khách hàng có nhu cầu thuê xe với hàng ngàn chủ xe ô tô ở TPHCM, Hà Nội & các tỉnh thành khác. Mioto hướng đến việc xây dựng cộng đồng người dùng ô tô văn minh & uy tín tại Việt Nam.</p>
                    <Link to="/aboutus">
                        {/* <button className="cursor-pointer px-16 py-4 rounded-lg bg-blue-400 text-white font-semibold hover:shadow-custom hover:bg-[#53a1e6]">Đăng ký xe</button> */}
                        <button className="mt-10 px-20 py-4 rounded-lg bg-main text-white font-semibold hover:shadow-custom hover:bg-[#79d799]">Tìm hiểu thêm</button>
                    </Link>
                </div>
            </div>

            <div className=" rounded-2xl flex sm:flex-col md:flex-col lg:flex-row xl:flex-row h-auto sm:mb-8 md:mb-20 lg:mb-20 xl:mb-20 bg-[#eef7ff]">
                <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 sm:p-5 md:p-16 lg:p-16 xl:p-16 flex flex-col justify-center items-center text-center">
                    <div>
                        <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.2979 5.66406H25.6979C20.8979 5.66406 19.8313 8.06409 19.2179 11.0241L17.0312 21.4774H47.9645L45.7779 11.0241C45.1645 8.06409 44.0979 5.66406 39.2979 5.66406Z" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8031 38.5218C52.0164 40.7885 50.2031 42.7351 47.8831 42.7351H44.2564C42.1764 42.7351 41.8831 41.8551 41.5098 40.7351L41.1098 39.5885C40.5764 38.0151 40.2298 36.9485 37.4298 36.9485H27.5364C24.7631 36.9485 24.3364 38.1485 23.8564 39.5885L23.4564 40.7351C23.0831 41.8285 22.7897 42.7351 20.7097 42.7351H17.0831C14.7631 42.7351 12.9497 40.7885 13.1631 38.5218L14.2564 26.7352C14.5231 23.8285 15.083 21.4551 20.1497 21.4551H44.8164C49.8831 21.4551 50.4431 23.8285 50.7098 26.7352L51.8031 38.5218Z" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.0302 15.6641H15.0835" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M49.9052 15.6641H47.9585" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20.896 29.2051H26.6827" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M38.3125 29.2051H44.0992" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.5 45.6641V48.3307" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.5 56.3301V58.9967" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.50016 48.3301L5.8335 58.9967" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M56.5 48.3301L59.1667 58.9967" stroke="#5CB3FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        {/* <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M64.7367 45.3824L53.7663 17.3473C53.1936 15.9196 51.8344 15 50.2977 15H39.9565C38.7062 15 37.5447 15.6211 36.8509 16.6577L32.4991 23.1673L28.1472 16.6617C27.4535 15.6211 26.2919 15 25.0416 15H14.7004C13.1637 15 11.8005 15.9236 11.2238 17.3635L0.269489 45.3662C-0.194333 46.5197 -0.0531702 47.8225 0.64458 48.8509C1.3383 49.8794 2.49584 50.4925 3.73807 50.4925H3.7421L24.7109 50.4642C26.3686 50.4642 27.8447 49.347 28.3045 47.7378L32.4991 32.597L36.6977 47.7539C37.1534 49.347 38.6296 50.4602 40.2832 50.4642L61.2561 50.4925H61.2601C62.5023 50.4925 63.6558 49.8794 64.3536 48.8509C65.0513 47.8225 65.1925 46.5197 64.7367 45.3824ZM24.1785 46.0357L4.74638 46.064L15.1683 19.4285H24.6665L29.5346 26.7044L24.1785 46.0357ZM40.8156 46.0357L35.4595 26.7044L40.3276 19.4285H49.8259L60.2477 46.064L40.8156 46.0357Z" fill="#5FCF86"></path></svg> */}
                    </div>
                    <h1 className="sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold py-5">Bạn cho thuê xe</h1>
                    <p>Hơn 5,000 chủ xe đang cho thuê hiệu quả trên Mioto
                        Đăng kí trở thành đối tác của chúng tôi ngay hôm nay để gia tăng thu nhập hàng tháng.</p>
                    <div className="flex flex-row gap-5 mt-10">
                        {/* <button className="cursor-pointer px-16 py-4 rounded-lg border border-black text-black font-semibold hover:shadow-custom hover:bg-gray-200">Tìm hiểu ngay</button> */}
                        <Link to="/owner/register">
                            <button className="cursor-pointer px-16 py-4 rounded-lg bg-blue-400 text-white font-semibold hover:shadow-custom hover:bg-[#53a1e6]">Đăng ký xe</button>
                        </Link>
                    </div>
                </div>
                <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 sm:p-3 md:p-8 lg:p-8 xl:p-8 flex justify-center">
                    <img loading="lazy" src="/other2.png" />
                </div>
            </div>

            <div className="rounded-2xl flex sm:flex-col md:flex-col lg:flex-row xl:flex-row h-auto bg-[#f3f2f2]">
                <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 sm:p-5 md:p-10 lg:p-16 xl:p-16 flex flex-col justify-center items-center text-center">
                    <div>
                        <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48.5 39.5541V52.1941C48.5 54.8074 46.42 56.9408 43.8866 56.9408H21.1134C18.5534 56.9408 16.5 54.8074 16.5 52.1941V12.3541C16.5 9.74076 18.58 7.60742 21.1134 7.60742H43.8866C46.4466 7.60742 48.5 9.74076 48.5 12.3541V40.4874" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M31.1665 15.8203H33.8332" stroke="#5FCF86" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.5002 50.9661C33.9729 50.9661 35.1668 49.7722 35.1668 48.2995C35.1668 46.8267 33.9729 45.6328 32.5002 45.6328C31.0274 45.6328 29.8335 46.8267 29.8335 48.2995C29.8335 49.7722 31.0274 50.9661 32.5002 50.9661Z" fill="#5FCF86"></path></svg>
                    </div>
                    <h1 className="sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold py-5">Trải nghiệm trọn vẹn cùng ứng dụng Mioto</h1>
                    <div className="flex flex-row gap-2 sm:mt-2 md:mt-3 lg:mt-5 xl:mt-5">
                        <a href="https://apps.apple.com/vn/app/mioto-%E1%BB%A9ng-d%E1%BB%A5ng-thu%C3%AA-xe/id1316420500?l=vi" target="_blank">
                            <img loading="lazy" className="cursor-pointer" src="/appstore.png" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?gl=vn&hl=vi&id=com.mioto.mioto&referrer=adjust_reftag%3DcYJK2ZHao91WK%26utm_source%3DWEBSITE%2Bredirect%26utm_campaign%3DANDROID&pli=1" target="_blank">
                            <img loading="lazy" className="cursor-pointer" src="/ggplay.png" />
                        </a>
                    </div>
                </div>
                <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
                    <img loading="lazy" src="/other3.png" />
                </div>
            </div>


        </div>
    )

}

export default Other