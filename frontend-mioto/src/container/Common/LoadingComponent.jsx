import { SyncLoader } from "react-spinners"

function LoadingComponent() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-[1000000]">
            <div className="bg-white px-[5%] py-[5%] rounded-full flex flex-col gap-4 items-center sm:p-20">
                <img loading="lazy" src="/logo-full.png" className="h-10 opacity-100 sm:hidden" />
                <img loading="lazy" src="/logo-mini.png" className="h-10 opacity-100 md:hidden lg:hidden xl:hidden" />
                <SyncLoader
                    color="#5fcf86"
                    size={20}
                    margin={5}
                    speedMultiplier={0.7} />
            </div>
        </div>
    )
}

export default LoadingComponent