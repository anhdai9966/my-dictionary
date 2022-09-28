function Examples({ example }) {
    return (
        <>
            <p className="font-semibold flex gap-3 text-primary before:contents-[''] before:block before:w-[2px] before:h-6 before:bg-primary">
                Ví dụ:
            </p>

            <div className="flex flex-col gap-3">
                {example.split('@enter').map((examp, index) => {
                    const exampArr = examp.split('@split');

                    return (
                        <p key={index}>
                            <strong>{exampArr[0]}</strong>
                            {exampArr[1]}
                        </p>
                    );
                })}
            </div>
        </>
    );
}

export default Examples;
