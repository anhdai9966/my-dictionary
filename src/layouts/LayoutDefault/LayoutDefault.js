function LayoutDefault({ children }) {
    return (
        <div className="w-full max-w-4xl h-[var(--window-height)] mx-auto overflow-hidden">
            <div className="w-full h-full px-3 pb-3 flex flex-col gap-4 relative">
                {children}
            </div>
        </div>
    );
}

export default LayoutDefault;
