import { useDispatch, useSelector } from "react-redux"
import { avatarImageSelector, fullnameSelector, menuLeftSelector } from "../../redux/selector"
import { Link } from "react-router-dom"
import { setMenuLeft } from "../../redux/Slice/AppSlice"
import { setModalDelete, setModalObjectDelete } from "../../redux/Slice/ModalSlice"

function MenuLeft({ handleOpenLoginModal, handleOpenRegisterModal }) {
    const fullname = useSelector(fullnameSelector)
    const avatarImage = useSelector(avatarImageSelector);
    const menuLeft = useSelector(menuLeftSelector)
    const dispatch = useDispatch()

    const handleCloseMenu = () => {
        dispatch(setMenuLeft())
    }

    const handleDeleteModal = () => {
        dispatch(setModalDelete())
        dispatch(setModalObjectDelete("logout-user"))
    }

    return (
        <div
            className={`lg:hidden xl:hidden z-40 fixed top-0 right-0 bottom-0 left-0 w-full bg-gray-100 shadow-lg sm:p-4 md:p-10 transform 
                ${menuLeft ? 'translate-x-0' : '-translate-x-full'}
                 transition-transform duration-500 ease-in-out overflow-y-hidden`}
        >
            <i className="absolute top-10 sm:right-5 md:right-10 lg:right-10 xl:right-10 fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseMenu}></i>
            {
                fullname ?
                    <div className="w-full h-screen flex justify-center items-center">
                        <ul className="flex flex-col justify-end items-center w-full">
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white font-bold sm:text-base md:text-xl cursor-pointer" onClick={handleCloseMenu}>
                                <Link to={`/account/myaccount`} className="nav-link">
                                    <div className='flex flex-row gap-2 justify-center items-center cursor-pointer'>
                                        {avatarImage && avatarImage != "null" ? (
                                            <img loading="lazy"
                                                src={avatarImage}
                                                className="h-10 rounded-full border"
                                                alt="User avatar"
                                            />
                                        ) : (
                                            <img loading="lazy"
                                                src="/avaMale.png"
                                                className="h-10 rounded-full border"
                                                alt="Default avatar for male users"
                                            />
                                        )}
                                        <label className='font-semibold cursor-pointer'>{fullname}</label>
                                    </div>
                                </Link>
                            </li>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white font-bold sm:text-base md:text-xl cursor-pointer" onClick={handleCloseMenu} >
                                <Link to="/account/mycar" className="nav-link font-bold sm:text-base md:text-xl">
                                    Xe của tôi
                                </Link>
                            </li>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white " onClick={handleCloseMenu}>
                                <Link to="/account/favorite" className="nav-link font-bold sm:text-base md:text-xl">
                                    Xe yêu thích
                                </Link>
                            </li>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white " onClick={handleCloseMenu}>
                                <Link to="/account/myvoucher" className="nav-link font-bold sm:text-base md:text-xl">
                                    Quà tặng
                                </Link>
                            </li>
                            <div className="border-2 h-0 w-full border-gray-100 mt-2 mb-2"></div>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white" onClick={handleCloseMenu}>
                                <Link to="/aboutus" className="nav-link font-bold sm:text-base md:text-xl">
                                    Về Mioto
                                </Link>
                            </li>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white" onClick={handleCloseMenu}>
                                <Link to="/owner/register" className="nav-link font-bold sm:text-base md:text-xl">
                                    Trở thành chủ xe
                                </Link>
                            </li>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white" onClick={handleCloseMenu}>
                                <Link to="/account/mytrip" className="nav-link font-bold sm:text-base md:text-xl">
                                    Chuyến của tôi
                                </Link>
                            </li>
                            <li className="py-4 hover:text-main text-center w-full flex flex-row justify-center items-center gap-3" onClick={handleDeleteModal}>
                                <i className="fa-solid fa-right-from-bracket fa-xl"></i>
                                <p className="font-semibold sm:text-base md:text-lg">Đăng xuất</p>
                            </li>

                        </ul>

                    </div>
                    :
                    <div className="w-full h-screen flex justify-center items-center">
                        <ul className="flex flex-col justify-end items-center w-full">
                            <li className="py-4 hover:text-main text-center w-full px-4 rounded-lg bg-white " onClick={handleOpenLoginModal} >
                                <a className="nav-link font-bold sm:text-base md:text-xl cursor-pointer">
                                    Đăng nhập
                                </a>
                            </li>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white ">
                                <a className="nav-link font-bold sm:text-base md:text-xl cursor-pointer" onClick={handleOpenRegisterModal}>
                                    Đăng ký
                                </a>
                            </li>
                            <div className="border-2 h-0 w-full border-gray-100 mt-4 mb-4"></div>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white" onClick={handleCloseMenu}>
                                <Link to="/aboutus" className="nav-link font-bold sm:text-base md:text-xl">
                                    Về Mioto
                                </Link>
                            </li>
                            <li className="py-4 hover:text-main text-center w-full rounded-lg bg-white" onClick={handleCloseMenu}>
                                <Link to="/owner/register" className="nav-link font-bold sm:text-base md:text-xl">
                                    Trở thành chủ xe
                                </Link>
                            </li>
                        </ul>
                    </div>
            }
        </div>
    )
}

export default MenuLeft