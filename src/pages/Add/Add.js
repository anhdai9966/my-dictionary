import { useState, useRef, useEffect } from 'react';

import LayoutDefault from '~/layouts/LayoutDefault';

import Switch from '~/components/Switch';

import TopNavigation from './components/TopNavigation';
import Dropdown from './components/Dropdown';

import icons from '~/assets/icons';

import { useToggle } from '~/hooks';
import { randomNumber } from '~/utils';
import { uploadDictionary } from '~/services';
import { actions, useStore } from '~/store';
import { useNavigate } from 'react-router-dom';


function Add() {
    const {dispatch} = useStore()
    const [addTranslations, setAddTranslations] = useState([]);
    const [addExamples, setAddExamples] = useState([]);
    const [partOfSpeech, setPartOfSpeech] = useState('Select!');

    const [dropdown, handleDropdown] = useToggle(false);
    const [submit, handleSubmit] = useToggle(false);

    const wrapperRef = useRef();
    const formRef = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        // Immediately invoked
        (formRef.current.onsubmit = async () => {
            try {
                const dataArr = new FormData(formRef.current);
                const data = Object.fromEntries(dataArr);

                if (!data.word || !data.partOfSpeech || !data.translation)
                    return;

                const res = await uploadDictionary(data);

                dispatch(actions.setDetailWord(res.word))
                navigate(`/detail/${res.word.id}`)
            } catch (error) {
                console.log(error);
            }

            return false;
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submit]);

    const handleAddTranslation = (e) => {
        setAddTranslations([
            ...addTranslations,
            { id: randomNumber(addTranslations), value: '' },
        ]);

        if (e.target.offsetTop > wrapperRef.current.offsetHeight)
            setTimeout(() => {
                wrapperRef.current.scrollTop += 52;
            }, 100);
    };

    const handleChangeAddTranslation = function (e, id) {
        const value = e.target.value;

        const update = addTranslations.map((addTranslation) => {
            if (addTranslation.id === id) {
                addTranslation.value = value;
            }
            return addTranslation;
        });

        setAddTranslations(update);
    };

    const handleRemoveAddTranslation = (id) => {
        const update = addTranslations.filter(
            (addTranslation) => addTranslation.id !== id
        );

        setAddTranslations(update);
    };

    const handleAddExample = () => {
        setAddExamples([
            ...addExamples,
            { id: randomNumber(addExamples), exmaple: '', exmapleTranslation: '' },
        ]);

        setTimeout(() => {
            wrapperRef.current.scroll({
                top: wrapperRef.current.scrollHeight,
                left: 0,
                behavior: 'smooth',
            });
        }, 100);
    };

    /**
     *
     * @param {3} input : 1: input example | 0: input example translation 
     */
    const handleChangeAddExample = (e, id, input) => {
        const value = e.target.value;

        const update = addExamples.map((addExample) => {
            if (addExample.id === id) {
                input
                    ? (addExample.example = value)
                    : (addExample.exmapleTranslation = value);
            }
            return addExample;
        });

        setAddExamples(update);
    };

    const handleRemoveExample = (id) => {
        const update = addExamples.filter((ex) => ex.id !== id);
        setAddExamples(update);
    };

    const handleSelectorPartOfSpeech = (posVie) => {
        setPartOfSpeech(posVie);
        handleDropdown();
    };

    const handleAutoHeight = (e) => {
        e.target.value
            ? (e.target.style.height = e.target.scrollHeight + 'px')
            : (e.target.style.height = '36px');
    };

    const handleBookmark = () => {
        console.log('🚀 handleBookmark: ' )
    };

    return (
        <LayoutDefault>
            <TopNavigation action={handleSubmit} />

            <div
                className="w-full h-full rounded-lg overflow-x-hidden overflow-y-auto scroll-smooth"
                ref={wrapperRef}
            >
                <form
                    className="w-full flex flex-col gap-4 pb-3 px-1"
                    ref={formRef}
                >
                    <textarea
                        rows="1"
                        placeholder="*Word"
                        name="word"
                        className="h-9 w-full px-2 pt-[6px] rounded-lg break-words break-all resize-none  outline-none leading-6 transition-all duration-300 ease-out bg-[#767680]/[.12]"
                        onKeyUp={handleAutoHeight}
                    ></textarea>

                    <div className="flex items-center justify-between relative">
                        <p className="italic">{partOfSpeech}</p>

                        <div
                            className="flex items-center gap-3 cursor-pointer text-primary"
                            onClick={handleDropdown}
                        >
                            <span>*Part of Speech</span>

                            <svg className="w-3 h-3">
                                <use href={icons + '#icon-caret'}></use>
                            </svg>
                        </div>

                        <div
                            className="absolute top-full right-0 transition-all duration-300 origin-top-right"
                            style={
                                dropdown
                                    ? { transform: 'scale(1)', opacity: 1 }
                                    : { transform: 'scale(0)', opacity: 0 }
                            }
                        >
                            <Dropdown action={handleSelectorPartOfSpeech} />
                        </div>
                    </div>

                    <textarea
                        rows="1"
                        placeholder="*Translation"
                        name="translation"
                        className="h-9 w-full px-2 pt-[6px] rounded-lg break-words break-all resize-none  outline-none leading-6 transition-all duration-300 ease-out bg-[#767680]/[.12]"
                        onKeyUp={handleAutoHeight}
                    ></textarea>

                    {addTranslations.length !== 0 &&
                        addTranslations.map((addTranslation, index) => (
                            <div
                                className="flex items-center gap-2"
                                key={index}
                            >
                                <div
                                    className="flex items-center gap-3 text-[#FF3B30] font-semibold cursor-pointer rounded-full"
                                    onClick={() =>
                                        handleRemoveAddTranslation(addTranslation.id)
                                    }
                                >
                                    <div className="w-6 h-6 bg-current rounded-full relative">
                                        <div className="w-3 h-[2px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                    </div>
                                </div>

                                <textarea
                                    rows="1"
                                    placeholder={
                                        'Add translation ' + (index + 1)
                                    }
                                    name={'addTranslation-' + index}
                                    className="h-9 w-full px-2 pt-[6px] rounded-lg break-words break-all resize-none  outline-none leading-6 transition-all duration-300 ease-out bg-[#767680]/[.12]"
                                    onKeyUp={handleAutoHeight}
                                    value={addTranslation.value}
                                    onChange={(e) =>
                                        handleChangeAddTranslation(e, addTranslation.id)
                                    }
                                ></textarea>
                            </div>
                        ))}

                    <div className="flex justify-end">
                        <div
                            className="flex items-center gap-3 cursor-pointer text-primary"
                            onClick={handleAddTranslation}
                        >
                            <span>Add translation</span>

                            <svg className="w-4 h-4">
                                <use href={icons + '#icon-plus'}></use>
                            </svg>
                        </div>
                    </div>

                    {addExamples.length !== 0 &&
                        addExamples.map((addExample, index) => (
                            <div
                                className="flex gap-2 items-center"
                                key={index}
                            >
                                <div
                                    className="flex items-center gap-3 text-[#FF3B30] font-semibold cursor-pointer rounded-full"
                                    onClick={() => handleRemoveExample(addExample.id)}
                                >
                                    <div className="w-6 h-6 bg-current rounded-full relative">
                                        <div className="w-3 h-[2px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <textarea
                                        type="text"
                                        placeholder={'Example ' + (index + 1)}
                                        name={'example-' + index}
                                        className="h-9 w-full px-2 pt-[6px] rounded-lg break-words break-all resize-none  outline-none leading-6 transition-all duration-300 ease-out bg-[#767680]/[.12]"
                                        value={addExample.example}
                                        onChange={(e) =>
                                            handleChangeAddExample(e, addExample.id, 1)
                                        }
                                        onKeyUp={handleAutoHeight}
                                    ></textarea>

                                    <textarea
                                        type="text"
                                        placeholder={
                                            'Translation example ' + (index + 1)
                                        }
                                        name={'translationExample-' + index}
                                        className="h-9 w-full px-2 pt-[6px] rounded-lg break-words break-all resize-none  outline-none leading-6 transition-all duration-300 ease-out bg-[#767680]/[.12]"
                                        value={addExample.exmapleTranslation}
                                        onChange={(e) =>
                                            handleChangeAddExample(e, addExample.id, 0)
                                        }
                                        onKeyUp={handleAutoHeight}
                                    ></textarea>
                                    <div className="w-full h-[1px] bg-gray-200"></div>
                                </div>
                            </div>
                        ))}

                    <div className="flex justify-end">
                        <div
                            className="flex items-center gap-3 cursor-pointer text-primary"
                            onClick={handleAddExample}
                        >
                            <span>Add example</span>

                            <svg className="w-4 h-4">
                                <use href={icons + '#icon-plus'}></use>
                            </svg>
                        </div>
                    </div>
                </form>
            </div>

            <div className="h-16 flex items-center justify-between gap-3 text-gray-600 font-semibold border-t">
                <span>Add to Favorites</span>

                <Switch onChange={handleBookmark} />
            </div>
        </LayoutDefault>
    );
}

export default Add;
