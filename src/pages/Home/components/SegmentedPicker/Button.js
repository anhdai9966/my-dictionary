function Button({ btnConfig }) {
    const { title, selected, handler } = btnConfig

    return (
        <button
            className={`w-full h-full text-sm rounded-[7px] flex gap-1 items-center justify-center text-[#3c3c43]/60 ${selected && "bg-white"}`}
            onClick={handler}
        >
            {title}
        </button>
    );
}

export default Button;
