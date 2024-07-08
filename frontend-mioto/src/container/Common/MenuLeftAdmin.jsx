import { useDispatch, useSelector } from "react-redux"
import { adminFullnameSelector, avatarImageAdminSelector, menuLeftAdminSelector } from "../../redux/selector"
import { setMenuLeftAdmin } from "../../redux/Slice/AppSlice"
import { NavLink } from "react-router-dom"

function MenuLeftAdmin() {
    const dispatch = useDispatch()

    const handleCloseMenu = () => {
        dispatch(setMenuLeftAdmin())
    }
    const menuLeftAdmin = useSelector(menuLeftAdminSelector)
    const adminFullname = useSelector(adminFullnameSelector)
    const avatar = useSelector(avatarImageAdminSelector)


    return (
        <div
            className={`lg:hidden xl:hidden z-40 fixed top-0 left-0 right-0 bottom-0 h-full bg-gray-100 shadow-lg w-full sm:p-4 md:p-10 transform ${menuLeftAdmin ? 'translate-x-0' : '-translate-x-full'}
             transition-transform duration-500 ease-in-out overflow-y-hidden`}
        >
            <i className="absolute top-10 right-10 fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseMenu}></i>
            <div className="flex flex-col justify-center items-center w-full h-screen sm:gap-3 md:gap-3">
                <img loading="lazy" className="h-8 mb-4 sm:hidden md:hidden" src="/logo-mini.png" />
                {avatar && avatar != "null" ? (
                    <img loading="lazy"
                        src={avatar}
                        className="h-16 rounded-full border-2"
                        alt="User avatar"
                    />
                ) : (
                    <img loading="lazy"
                        src="/avaMale.png"
                        className="h-16 rounded-full border-2"
                        alt="Default avatar for male users"
                    />
                )}
                <p className="sm:text-lg md:text-2xl font-semibold">{adminFullname}</p>
                <NavLink to="/admin/dashboard" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-chart-line"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Thống kê</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/staff" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-user-tie"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Nhân viên</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/user" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-user"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Người dùng</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/car" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-car"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Phương tiện</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/order" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-regular w-10 fa-calendar"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Đơn đặt xe</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/history" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-clock-rotate-left"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Lịch sử</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/blog" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-book"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Blog</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/voucher" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-ticket"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Mã giảm giá</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/report" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-flag"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Đơn báo cáo</p>
                    </div>
                </NavLink>
                <NavLink to="/admin/review" className={(navData) => (navData.isActive ? 'active' : 'link')} onClick={handleCloseMenu}>
                    <div className="flex flex-row items-center rounded-md py-[10px] px-3 sm:w-[200px] md:w-[300px]">
                        <i className="fa-solid w-10 fa-comment"></i>
                        <p className="font-medium text-gray-600 sm:text-sm md:text-2xl">Bình luận</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default MenuLeftAdmin