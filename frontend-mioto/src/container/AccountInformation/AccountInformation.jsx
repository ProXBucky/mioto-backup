import { NavLink, Outlet, useNavigate } from "react-router-dom"
import "./style.css"
import { useDispatch } from "react-redux";
import { setModalDelete, setModalObjectDelete } from "../../redux/Slice/ModalSlice";


function AccountInformation() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDeleteModal = () => {
        dispatch(setModalDelete())
        dispatch(setModalObjectDelete("logout-user"))
    }

    const handleOnchange = (e) => {
        navigate(e.target.value)
    }

    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 sm:py-10 md:py-10 lg:py-20 xl:py-20 bg-gray-100 flex sm:flex-col md:flex-col lg:flex-row xl:flex-row">
            <div className="w-1/3 sm:hidden md:hidden">
                <h2 className="lg:text-3xl xl:text-4xl font-bold">Xin chào bạn!</h2>
                <div className="py-5 pr-5">
                    <NavLink to="/account/myaccount" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Tài khoản của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/favorite" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 8.7196C21.25 9.8796 20.81 11.0496 19.92 11.9396L18.44 13.4196L12.07 19.7896C12.04 19.8196 12.03 19.8296 12 19.8496C11.97 19.8296 11.96 19.8196 11.93 19.7896L4.08 11.9396C3.19 11.0496 2.75 9.8896 2.75 8.7196C2.75 7.54961 3.19 6.37961 4.08 5.48961C5.86 3.71961 8.74 3.71961 10.52 5.48961L11.99 6.9696L13.47 5.48961C15.25 3.71961 18.12 3.71961 19.9 5.48961C20.81 6.37961 21.25 7.53961 21.25 8.7196Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Xe yêu thích</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/mycar" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.86914 15.7207H14.7691" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.68914 17.4603C7.83237 17.4603 8.75914 16.5335 8.75914 15.3903C8.75914 14.2471 7.83237 13.3203 6.68914 13.3203C5.54591 13.3203 4.61914 14.2471 4.61914 15.3903C4.61914 16.5335 5.54591 17.4603 6.68914 17.4603Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.0798 17.4603C18.223 17.4603 19.1498 16.5335 19.1498 15.3903C19.1498 14.2471 18.223 13.3203 17.0798 13.3203C15.9365 13.3203 15.0098 14.2471 15.0098 15.3903C15.0098 16.5335 15.9365 17.4603 17.0798 17.4603Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Xe của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/order" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85938 4.81V2.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1406 4.81V2.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.05 3.7793H5.95C4.18 3.7793 2.75 5.20929 2.75 6.97929V18.0593C2.75 19.8293 4.18 21.2593 5.95 21.2593H18.06C19.83 21.2593 21.26 19.8293 21.26 18.0593V6.97929C21.25 5.20929 19.82 3.7793 18.05 3.7793Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 7.89844H21.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12Z" fill="black"></path><path d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z" fill="black"></path><path d="M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z" fill="black"></path><path d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z" fill="black"></path><path d="M18 15.4902C18.5523 15.4902 19 15.0425 19 14.4902C19 13.9379 18.5523 13.4902 18 13.4902C17.4477 13.4902 17 13.9379 17 14.4902C17 15.0425 17.4477 15.4902 18 15.4902Z" fill="black"></path><path d="M14 15.4902C14.5523 15.4902 15 15.0425 15 14.4902C15 13.9379 14.5523 13.4902 14 13.4902C13.4477 13.4902 13 13.9379 13 14.4902C13 15.0425 13.4477 15.4902 14 15.4902Z" fill="black"></path><path d="M10 15.4902C10.5523 15.4902 11 15.0425 11 14.4902C11 13.9379 10.5523 13.4902 10 13.4902C9.44772 13.4902 9 13.9379 9 14.4902C9 15.0425 9.44772 15.4902 10 15.4902Z" fill="black"></path><path d="M6 15.4902C6.55228 15.4902 7 15.0425 7 14.4902C7 13.9379 6.55228 13.4902 6 13.4902C5.44772 13.4902 5 13.9379 5 14.4902C5 15.0425 5.44772 15.4902 6 15.4902Z" fill="black"></path><path d="M14 18.9707C14.5523 18.9707 15 18.523 15 17.9707C15 17.4184 14.5523 16.9707 14 16.9707C13.4477 16.9707 13 17.4184 13 17.9707C13 18.523 13.4477 18.9707 14 18.9707Z" fill="black"></path><path d="M10 18.9707C10.5523 18.9707 11 18.523 11 17.9707C11 17.4184 10.5523 16.9707 10 16.9707C9.44772 16.9707 9 17.4184 9 17.9707C9 18.523 9.44772 18.9707 10 18.9707Z" fill="black"></path><path d="M6 18.9707C6.55228 18.9707 7 18.523 7 17.9707C7 17.4184 6.55228 16.9707 6 16.9707C5.44772 16.9707 5 17.4184 5 17.9707C5 18.523 5.44772 18.9707 6 18.9707Z" fill="black"></path></svg>
                            <p>Đơn đặt xe</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/mytrip" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.50023 8.86914H4.80023C3.66023 8.86914 2.74023 9.78914 2.74023 10.9291V18.1191C2.74023 19.2591 3.66023 20.1791 4.80023 20.1791H19.1902C20.3302 20.1791 21.2502 19.2591 21.2502 18.1191V10.9291" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.1095 8.86914H10.2695" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.1094 16.0605H19.1894C20.3294 16.0605 21.2494 16.9805 21.2494 18.1205C21.2494 19.2605 20.3294 20.1805 19.1894 20.1805H16.1094" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.1094 5.7793H19.1894C20.3294 5.7793 21.2494 6.6993 21.2494 7.8393" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.25 18.1198V7.83984" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.1094 5.7793V16.0593" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 14.0098H6.86C7.43 14.0098 7.89 14.3998 7.89 14.8898C7.89 15.3798 8.35 15.7698 8.92 15.7698H9.95C10.52 15.7698 10.98 16.1598 10.98 16.6498V17.5298V20.1698" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.40007 3.83008C6.98007 3.83008 5.83008 4.98008 5.83008 6.40008C5.83008 8.16008 8.13007 10.7401 8.23007 10.8501C8.32007 10.9501 8.48008 10.9501 8.57008 10.8501C8.67008 10.7401 10.9701 8.16008 10.9701 6.40008C10.9701 4.98008 9.82007 3.83008 8.40007 3.83008Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.39977 7.37961C8.8913 7.37961 9.28976 6.98114 9.28976 6.48961C9.28976 5.99808 8.8913 5.59961 8.39977 5.59961C7.90823 5.59961 7.50977 5.99808 7.50977 6.48961C7.50977 6.98114 7.90823 7.37961 8.39977 7.37961Z" fill="black"></path></svg>
                            <p>Chuyến của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myvoucher" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.7793 12H9.9493V21.23H5.9593C4.7593 21.23 3.7793 20.25 3.7793 19.05V12V12Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M20.2208 12V19.05C20.2208 20.25 19.2408 21.23 18.0408 21.23H14.0508V12H20.2208Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.63 6.83984H9.94V11.9998H2.75V8.71984C2.75 7.67984 3.59 6.83984 4.63 6.83984Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.2505 8.71984V11.9998H14.0605V6.83984H19.3705C20.4105 6.83984 21.2505 7.67984 21.2505 8.71984Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.0495 6.83984H9.93945V21.2298H14.0495V6.83984Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.0495 21.2305H9.93945V21.2505H14.0495V21.2305Z" fill="black" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.0199 4.8C12.0199 5.37 11.7899 5.88 11.4199 6.25C11.0499 6.62 10.5399 6.85 9.96992 6.85H9.93993C9.38993 6.84 8.87993 6.61 8.51993 6.25C8.14993 5.88 7.91992 5.37 7.91992 4.8C7.91992 3.67 8.82992 2.75 9.96992 2.75C10.5399 2.75 11.0499 2.98 11.4199 3.35C11.7899 3.72 12.0199 4.23 12.0199 4.8Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.1008 2.75C12.9708 2.75 12.0508 3.67 12.0508 4.8C12.0508 5.93 12.9708 6.85 14.1008 6.85C15.2308 6.85 16.1508 5.93 16.1508 4.8C16.1508 3.67 15.2308 2.75 14.1008 2.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Quà tặng</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/myaddress" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.14 21.2H6.85999C5.71999 21.2 4.79999 20.28 4.79999 19.14V4.74994C4.79999 3.60994 5.71999 2.68994 6.85999 2.68994H17.14C18.28 2.68994 19.2 3.60994 19.2 4.74994V19.14C19.19 20.28 18.27 21.2 17.14 21.2Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.89001 6.85999H8.92001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 6.85999H16.11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.89001 12H8.92001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 12H16.11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.89001 17.14H8.92001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.14H16.11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Địa chỉ của tôi</p>
                        </div>
                    </NavLink>
                    <NavLink to="/account/changepassword" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Đổi mật khẩu</p>
                        </div>
                    </NavLink>
                    <div className="cursor-pointer" onClick={handleDeleteModal}>
                        <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.74907H18.12C18.9125 2.71374 19.6868 2.99377 20.2734 3.52788C20.86 4.06199 21.2111 4.8067 21.25 5.59907V18.3991C21.2111 19.1914 20.86 19.9362 20.2734 20.4703C19.6868 21.0044 18.9125 21.2844 18.12 21.2491H12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.9993 12H2.7793" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 12L6.75 16" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 12L6.75 8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p>Đăng xuất</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:hidden xl:hidden">
                <h2 className="sm:text-2xl md:text-3xl text-center font-bold">Xin chào bạn!</h2>
                <div className="py-3">
                    <select className="w-full py-3 px-3 border-2 rounded-lg sm:text-lg md:text-xl font-semibold outline-none" onChange={(e) => handleOnchange(e)}>
                        <option className="py-2 border-2" value="/account/myaccount">
                            <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                                <p>Tài khoản của tôi</p>
                            </div>
                        </option>
                        <option className="py-2 border-2" value="/account/favorite">
                            <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                                <p>Xe yêu thích</p>
                            </div>
                        </option>
                        <option className="py-2 border-2" value="/account/mycar">
                            <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                                <p>Xe của tôi</p>
                            </div>
                        </option>
                        <option className="py-2 border-2" value="/account/order">
                            <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                                <p>Đơn đặt xe</p>
                            </div>
                        </option>
                        <option className="py-2 border-2" value="/account/mytrip">
                            <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                                <p>Chuyến của tôi</p>
                            </div>

                        </option>
                        <option className="py-2 border-2" value="/account/myvoucher">
                            <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                                <p>Quà tặng</p>
                            </div>
                        </option>
                        <option className="py-2 border-2" value="/account/myaddress">
                            <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                                <p>Địa chỉ của tôi</p>
                            </div>
                        </option>
                        <option className="py-2 border-2" value="/account/changepassword">
                            <div className="flex flex-row gap-1 items-center border-t-2 py-3 px-3">
                                <p>Đổi mật khẩu</p>
                            </div>
                        </option>
                    </select>
                </div>
            </div>
            <div className="sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
                <Outlet />
            </div>
        </div>
    )
}


export default AccountInformation