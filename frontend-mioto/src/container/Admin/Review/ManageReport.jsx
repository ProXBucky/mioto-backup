import { useEffect, useState } from "react"
import { getAllReport } from "../../../api/appAPI"
import { useDispatch, useSelector } from "react-redux"
import { adminTokenSelector } from "../../../redux/selector"
import { format } from "date-fns"
import { toast } from "react-toastify"
import { deleteReportById } from "../../../api/adminAPI"

function ManageReport() {
    const [reports, setReports] = useState([])
    const adminToken = useSelector(adminTokenSelector)


    const fetchAllReports = async () => {
        let res = await getAllReport(adminToken)
        if (res && res.length > 0) {
            setReports(res)
        } else {
            setReports([])
        }
    }

    const deleteReportByReportId = async (reportId) => {
        try {
            if (window.confirm("Bạn có muốn xóa báo cáo này không?")) {
                let res = await deleteReportById(reportId, adminToken);
                if (res) {
                    fetchAllReports()
                    toast.success("Xóa báo cáo thành công");
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi hệ thống, xóa báo cáo thất bại")
        }
    }


    useEffect(() => {
        fetchAllReports()
    }, [])


    return (
        <div className="w-full">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl">Báo cáo</h2>
            </div>
            <div className="w-full mt-10 pb-16">
                <table className="min-w-full bg-white sm:hidden">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Người báo cáo</th>
                            <th className="py-3 px-3 text-center">Nội dung</th>
                            <th className="py-3 px-4 text-center">Ngày</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-normal">
                        {
                            reports && reports.length > 0 &&
                            reports.map((report, index) => {
                                return (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex flex-col items-center gap-2">
                                                <img loading="lazy" className="h-10 rounded-full border" src={report.user.avatarImage ? report.user.avatarImage : "/avaMale.png"} />
                                                <span className="font-medium">{report.user.fullname}</span>
                                            </div>
                                            <div className="flex flex-col gap-2 items-center mt-4">
                                                <h2 className="font-semibold">Chủ xe</h2>
                                                <img loading="lazy" className="h-10 rounded-full border" src={report.car.user.avatarImage ? report.car.user.avatarImage : "/avaMale.png"} />
                                                <span>{report.car.user.fullname}</span>
                                                <p className="font-semibold text-xs">{report.car.model}</p>
                                                <p className="font-semibold text-xs">{report.car.plateNumber}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 text-left">
                                            <span>{report.reason}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">{format(report.reportDate, "dd/MM/yyyy")}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <i className="fa-solid fa-trash fa-lg cursor-pointer fa-lg" style={{ color: "#ff0000" }} onClick={() => deleteReportByReportId(report.reportId)}></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="w-full md:hidden lg:hidden xl:hidden">
                    {
                        reports && reports.length > 0 &&
                        reports.map((report, index) => {
                            return (
                                <div className="border-b rounded-lg bg-white p-3 mb-3" key={index}>
                                    <div className="text-center flex flex-row items-center justify-between">
                                        <div className="flex flex-col items-center gap-2">
                                            <h2 className="font-semibold">Người báo cáo</h2>
                                            <img loading="lazy" className="h-10 rounded-full border" src={report.user.avatarImage ? report.user.avatarImage : "/avaMale.png"} />
                                            <span className="font-medium">{report.user.fullname}</span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center">
                                            <h2 className="font-semibold">Chủ xe</h2>
                                            <img loading="lazy" className="h-10 rounded-full border" src={report.car.user.avatarImage ? report.car.user.avatarImage : "/avaMale.png"} />
                                            <span>{report.car.user.fullname}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center mt-2">
                                        <p className="font-semibold text-base">{report.car.model}</p>
                                        <p className="font-semibold text-base">{report.car.plateNumber}</p>
                                    </div>
                                    <div className="py-3 px-2">
                                        <span>{report.reason}</span>
                                    </div>
                                    <div className="py-3 px-2 flex justify-between items-center">
                                        <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-sm">{format(report.reportDate, "dd/MM/yyyy")}</span>
                                        <i className="fa-solid fa-trash fa-lg cursor-pointer fa-lg" style={{ color: "#ff0000" }} onClick={() => deleteReviewByID(report.reportId)}></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageReport