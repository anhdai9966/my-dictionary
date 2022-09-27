import { Link } from 'react-router-dom';

import { useStore } from '~/store';

import LayoutDefault from '~/layouts/LayoutDefault';
import SearchField from '~/layouts/components/SearchField';

import Loading from '~/components/Loading';

import SegmentedPicker from './components/SegmentedPicker';
import Thread from './components/Thread';

import icons from '~/assets/icons';

function Home() {
    const { state } = useStore();
    const { dictionary, loading } = state;

    return (
        <LayoutDefault>
            <div className="flex justify-between items-center h-24 border-b">
                <h1 className="font-display text-4xl font-bold">
                    My Dictionary
                </h1>

                <Link
                    after="Add"
                    className="rounded-xl font-semibold flex items-center gap-2 hover:scale-[1.03] active:scale-[0.96] transition-transform ease-out bg-gray-400/20 text-gray-600 px-4 py-1 after:content-[attr(after)] after:inline-block"
                    to="./add"
                >
                    <svg className="h-5 w-5 fill-current">
                        <use href={icons + '#icon-plus'}></use>
                    </svg>
                </Link>
            </div>

            <SearchField />

            <SegmentedPicker />

            <div className="w-full h-full rounded-lg overflow-x-hidden overflow-y-auto bg-gray-100 relative">
                <div className="w-full flex flex-col gap-2">
                    {dictionary.length !== 0 &&
                        dictionary.map((word) => (
                            <Thread key={word.id} word={word} />
                        ))}

                    {dictionary.length === 0 && !loading && (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <svg className="h-20 w-20 text-gray-500/50">
                                <use href={icons + '#icon-paperplane'}></use>
                            </svg>

                            <p className="text-center leading-normal text-gray-500">
                                Hãy tìm hoặc tạo từ điển <br /> của riêng mình!
                            </p>
                        </div>
                    )}

                    {loading && <Loading />}
                </div>
            </div>
        </LayoutDefault>
    );
}

export default Home;
