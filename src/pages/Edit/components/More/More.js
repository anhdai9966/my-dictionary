import { PART_OF_SPEECH } from "~/configs"

function More({ moreItemHandler, moreCloseHandler }) {

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/60"
                onClick={moreCloseHandler} >
            </div>

            <div className="w-full max-w-md p-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <ul className="w-full rounded-xl bg-white divide-y shadow-lg max-h-[510px] overflow-y-auto overflow-x-hidden">
                    {PART_OF_SPEECH.map(pos => (
                        <li
                            key={pos.id}
                            className="h-12 flex items-center justify-center cursor-pointer text-sm text-[#3c3c43] hover:bg-[#767680]/[12%]"
                            onClick={() => moreItemHandler(pos)}>
                            {pos.eng} ({pos.vie})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default More