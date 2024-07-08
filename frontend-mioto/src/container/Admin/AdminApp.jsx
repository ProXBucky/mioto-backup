import { NavLink, Outlet } from "react-router-dom"
import "./adminApp.css"
import HeaderAdmin from "./HeaderAdmin";
import { useSelector } from "react-redux";
import { adminFullnameSelector, avatarImageAdminSelector, menuLeftAdminSelector } from "../../redux/selector";
import { useEffect } from "react";

function AdminApp() {

    const adminFullname = useSelector(adminFullnameSelector)
    const avatar = useSelector(avatarImageAdminSelector)

    const isOpenAdmin = useSelector(menuLeftAdminSelector)

    useEffect(() => {
        if (isOpenAdmin) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpenAdmin]);

    return (
        <div className="bg-gray-100 sm:min-h-dvh md:min-h-screen lg:h-dvh xl:h-dvh flex sm:flex-row md:flex-row lg:flex-row xl:flex-row sm:justify-center md:justify-center">
            <div className="sm:hidden md:hidden lg:w-1/6 xl:w-1/6 sm:border-none md:border-none lg:border-r-2 xl:border-r-2 px-3 sm:py-2 md:py-5 lg:py-8 xl:py-10 flex sm:flex-row md:flex-row lg:flex-col xl:flex-col sm:justify-center md:justify-center sm:gap-2 md:gap-2 items-center">
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
                <p className="text-lg font-semibold">{adminFullname}</p>
                <div className="sm:hidden md:hidden w-full border-t-2 border-gray-300 mt-2 mb-1"></div>
                <div className="mt-3 w-full">
                    <NavLink to="/admin/dashboard" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-chart-line"></i>
                            <p className="font-medium text-gray-600 text-sm">Thống kê</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/staff" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-user-tie"></i>
                            <p className="font-medium text-gray-600 text-sm">Nhân viên</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/user" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-user"></i>
                            <p className="font-medium text-gray-600 text-sm">Người dùng</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/car" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-car"></i>
                            <p className="font-medium text-gray-600 text-sm">Phương tiện</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/order" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-regular w-10 fa-calendar"></i>
                            <p className="font-medium text-gray-600 text-sm">Đơn đặt xe</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/history" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-clock-rotate-left"></i>
                            <p className="font-medium text-gray-600 text-sm">Lịch sử</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/blog" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-book"></i>
                            <p className="font-medium text-gray-600 text-sm">Blog</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/voucher" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-ticket"></i>
                            <p className="font-medium text-gray-600 text-sm">Mã giảm giá</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/report" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-flag"></i>
                            <p className="font-medium text-gray-600 text-sm">Đơn báo cáo</p>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/review" className={(navData) => (navData.isActive ? 'active' : 'link')}>
                        <div className="flex flex-row items-center rounded-md py-[10px] px-3">
                            <i className="fa-solid w-10 fa-comment"></i>
                            <p className="font-medium text-gray-600 text-sm">Bình luận</p>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="sm:w-full md:w-full lg:w-5/6 xl:w-5/6 overflow-y-auto">
                <HeaderAdmin />
                <div className="sm:px-5 md:px-5 lg:px-12 xl:px-12 sm:mt-4 md:mt-5 lg:mt-5 xl:mt-5 h-full pb-12">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default AdminApp