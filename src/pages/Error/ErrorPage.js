import { Link } from "react-router-dom"
import icons from "~/assets/icons"
import LayoutDefault from "~/layouts/LayoutDefault"

function ErrorPage() {
    
    return (
        <LayoutDefault>
            <div className="w-full flex gap-3 justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg className="w-[56px] h-[56px] mx-auto">
                    <use href={icons + '#icon-error'}></use>
                </svg>
                <h1 className="text-center text-3xl text-gray-500">Error</h1>
                <Link to='/' className="text-center text-primary underline text-sm">My Dictionary</Link>
            </div>
        </LayoutDefault>
    )
}

export default ErrorPage