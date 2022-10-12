import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';

import { convertLowercaseLetter, database } from '~/utils';
import { actions, useStore } from '~/store';

import LayoutDefault from '~/layouts/LayoutDefault';
import Switch from '~/components/Switch';

import TopNavigation from './components/TopNavigation';
import MoreModal from './components/MoreModal';
import { ArrowCounterClockWiseIcon, ChevronDownIcon } from '~/components/Icons'

function EditPage() {
    const { state, dispatch } = useStore();
    const { edit } = state;

    const [isSaved, setIsSaved] = useState(edit.data.saved);
    const [isOpenMore, setIsOpenMore] = useState(false);
    const [isValidation, setIsValidation] = useState(false)

    const formRef = useRef();
    const wordTextareaRef = useRef();
    const translationTextareaRef = useRef();
    const partOfSpeechTextareaRef = useRef();
    const noteTextareaRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const doc = document.documentElement;
        doc.style.setProperty('--word-textarea-height', `${wordTextareaRef.current.value ? wordTextareaRef.current.scrollHeight : 36}px`);
        doc.style.setProperty('--translation-textarea-height', `${translationTextareaRef.current.value ? translationTextareaRef.current.scrollHeight : 36}px`);
    }, [])

    // xử lý auto height 
    const autoHeightHandler = (e) => {
        e.target.value
            ? (e.target.style.height = `${e.target.scrollHeight}px`)
            : (e.target.style.height = '36px'); // leading 1.5 * 16 + px 6 * 2
    }

    // xử lý disable enter
    const textareaKeyUpHandler = (e) => {
        if (e.key === 'Enter') {
            const fixWord = e.target.value.split('').map(w => w === '\n' ? ' ' : w).join('')

            if (e.target.name === "word") {
                dispatch(actions.setEdit({ status: true, data: { ...edit.data, word: fixWord } }))
            }
            if (e.target.name === "translation") {
                dispatch(actions.setEdit({ status: true, data: { ...edit.data, translation: fixWord } }))
            }
        }
        autoHeightHandler(e)
    };

    const partOfSpeechTextareaFocusHandler = () => {
        setIsOpenMore(true)
        partOfSpeechTextareaRef.current.blur()
    }

    const pickItemHandler = (pos) => {
        dispatch(actions.setEdit({ status: true, data: { ...edit.data, part_of_speech: pos.vie } }))
        setIsOpenMore(false)
        if (!translationTextareaRef.current.value) {
            translationTextareaRef.current.focus()
        }
    }

    const switchChangeHandler = () => {
        setIsSaved(!isSaved);
    };

    // const noteTextareaKeyUpHandler = (e) => {
    //     if (e.code === 'Enter') {
    //         const characterArr = e.target.value.split('')
    //         if (characterArr[characterArr.length - 1] === '\n') {
    //             console.log('run')
    //             dispatch(actions.setEdit({ status: true, data: { ...edit.data, note: `${edit.data.note}\n` } }))
    //         }
    //     }
    // }

    const resetAllTextarea = () => {
        dispatch(actions.setEdit({ status: false, data: {} }))
        wordTextareaRef.current.value = ''
        translationTextareaRef.current.value = ''
        partOfSpeechTextareaRef.current.value = ''
        noteTextareaRef.current.value = ''
    }

    const rightBtnSubmissionHandler = async () => {
        try {
            if (!wordTextareaRef.current.value || !translationTextareaRef.current.value || !partOfSpeechTextareaRef.current.value) {
                setIsValidation(true)
                return 
            };
    
            dispatch(actions.setIsLoading(true));
        
            const req = {
                id: edit.data.id,
                word: convertLowercaseLetter(edit.data.word),
                part_of_speech: edit.data.part_of_speech,
                translation: convertLowercaseLetter(edit.data.translation),
                note: edit.data.note,
                created_at: edit.data.created_at,
                updated_at: new Date().getTime(),
            };

            await set(ref(database, `dictionary/${req.id}`), req);

            dispatch(actions.setDetail({
                status: true, data: {
                    ...req,
                    saved: isSaved
                }
            }));

            navigate(`/detail/${req.id}`);
        } catch (error) {
            console.log(error);
            navigate('/error');
        }

        dispatch(actions.setIsLoading(false));
    }

    return (
        <LayoutDefault>
            <TopNavigation onClickRight={rightBtnSubmissionHandler} />

            {isValidation && <p className='bg-[#FF3B30] rounded px-3 py-1 font-semibold text-white text-xs absolute top-5 text-center left-1/2 -translate-x-1/2 '>Bạn phải nhập đủ 3 trường đầu tiên</p>}

            <div className="w-full h-full rounded-lg overflow-x-hidden scroll-smooth">
                <form
                    className="w-full h-full flex flex-col gap-4"
                    ref={formRef}
                >
                    <textarea
                        ref={wordTextareaRef}
                        rows="1"
                        name="word"
                        placeholder="*Word"
                        className="min-h-[36px] h-[var(--word-textarea-height)] w-full px-2 pt-[6px] rounded-lg break-words resize-none  outline-none leading-6 transition-all duration-300 ease-out bg-[#767680]/[.12] flex-shrink-0 overflow-hidden"
                        value={edit.data.word}
                        onChange={(e) => dispatch(actions.setEdit({ status: true, data: { ...edit.data, word: e.target.value } }))}
                        onKeyUp={textareaKeyUpHandler}
                    ></textarea>

                    <div className='relative h-9'>
                        <textarea
                            ref={partOfSpeechTextareaRef}
                            rows="1"
                            name="word"
                            placeholder="*Part of Speech"
                            className="h-9 w-full px-2 pt-[6px] rounded-lg break-words resize-none  outline-none leading-6 transition-all duration-300 ease-out bg-[#767680]/[.12] flex-shrink-0 overflow-hidden"
                            value={edit.data.part_of_speech}
                            onChange={(e) => dispatch(actions.setEdit({ status: true, data: { ...edit.data, part_of_speech: e.target.value } }))}
                            onKeyUp={textareaKeyUpHandler}
                            onFocus={partOfSpeechTextareaFocusHandler}
                        ></textarea>
                        <ChevronDownIcon className="w-3 h-3 absolute top-1/2 -translate-y-1/2 right-2" />
                    </div>

                    <textarea
                        ref={translationTextareaRef}
                        rows="1"
                        placeholder="*Translation"
                        name="translation"
                        className="min-h-[36px] h-[var(--translation-textarea-height)] w-full px-2 pt-[6px] rounded-lg break-words resize-none  outline-none leading-6 transition-all duration-300 ease-out bg-[#767680]/[.12] flex-shrink-0 overflow-hidden"
                        value={edit.data.translation}
                        onChange={(e) => dispatch(actions.setEdit({ status: true, data: { ...edit.data, translation: e.target.value } }))}
                        onKeyUp={textareaKeyUpHandler}
                    ></textarea>

                    <textarea
                        ref={noteTextareaRef}
                        placeholder="Note for word"
                        name="note"
                        className="h-full min-h-[calc(100%_-_156px)] w-full px-2 py-[6px] rounded-lg break-words resize-none outline-none leading-6 bg-[#767680]/[.12]"
                        value={edit.data.note}
                        onChange={(e) => dispatch(actions.setEdit({ status: true, data: { ...edit.data, note: e.target.value } }))}
                        // onKeyUp={noteTextareaKeyUpHandler}
                    ></textarea>
                </form>
            </div>

            {isOpenMore && (
                <MoreModal
                    pickItemHandler={pickItemHandler}
                    closeModalHandler={() => setIsOpenMore(false)}
                />
            )}

            <div className='h-16'>
                <div className="px-2 flex items-center justify-between gap-3 text-gray-600 font-semibold">
                    <button
                        className='bg-[#767680]/[12%] rounded-xl px-2 py-1'
                        onClick={resetAllTextarea}
                    >
                        <ArrowCounterClockWiseIcon className="w-6 h-6" />
                    </button>
                    <div className='flex items-center gap-4'>
                        <span>Add to Saved</span>

                        <Switch
                            onChange={switchChangeHandler}
                            checked={isSaved}
                        />
                    </div>
                </div>
            </div>
        </LayoutDefault>
    );
}

export default EditPage;
