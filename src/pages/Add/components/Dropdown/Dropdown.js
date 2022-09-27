import { PART_OF_SPEECH } from '~/configs';

function Dropdown({ action }) {
    return (
        <div className="rounded-[14px] overflow-hidden shadow-2xl">
            <div className="bg-white divide-y divide-[#767680]/[.12]">
                {PART_OF_SPEECH.map((pos) => (
                    <div className="h-[42px] relative" key={pos.id}>
                        <input
                            type="radio"
                            name="partOfSpeech"
                            id={'radio-' + pos.id}
                            value={pos.eng}
                            className="absolute invisible peer"
                        />

                        <label
                            htmlFor={'radio-' + pos.id}
                            onClick={() => action(pos.vie)}
                            className="w-full h-full flex items-center px-3 hover:bg-[#767680]/20 peer-checked:bg-[#767680]/[.12]"
                        >
                            {pos.eng} ({pos.vie})
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dropdown;
