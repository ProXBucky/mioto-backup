function PageNotFound() {
    return (
        <div className="w-full h-screen flex mt-[10vh] justify-center">
            <div>
                <img loading="lazy" src="/pageNotFound.svg" />
                <p className="text-center font-bold text-xl">Trang không tồn tại</p>
            </div>

        </div>
    )
}

export default PageNotFound