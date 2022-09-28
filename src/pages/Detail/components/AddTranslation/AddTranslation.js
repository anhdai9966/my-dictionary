function AddTranslation({ addTranslation }) {
    return (
        <div className="flex flex-col gap-3">
            {addTranslation.split('@enter').map((trans, index) => (
                <p key={index} className="">
                    {trans}
                </p>
            ))}
        </div>
    );
}

export default AddTranslation;
