import { useState } from "react";
import { HOUSES, useGuestbook } from "./guestbookStore";
import { filter } from "motion/react-client";

const ALL_HOUSES = [{ name: 'all', label: '전체'}, ...HOUSES];

export function GuestbookSection() {
    const { entries, deleteEntry } = useGuestbook();

    const [houseFilter, setHouseFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');

    const [deleteTarget, setDeleteTarget] = useState(null); 
    const [deletePw, setDeletePw] = useState('');           
    const [deleteError, setDeleteError] = useState('');

    const handleDelete = () => {
    if (!deleteTarget) return;
    
    const isSuccess = deleteEntry(deleteTarget.id, deletePw);
    
    if (isSuccess) {
      setDeleteTarget(null);
      setDeletePw('');
      setDeleteError('');
    } else {
      setDeleteError('비밀번호가 일치하지 않습니다.');
    }
  };

    let filteredEntries = [...entries];
    
    if (houseFilter !== 'all') {
        filteredEntries = filteredEntries.filter((entry) => entry.house === houseFilter);
    }

    filteredEntries.sort((a, b) => {
        return sortOrder === 'newest'
        ? b.createdAt - a.createdAt 
        : a.createdAt - b.createdAt;
    })

    return (
        <section id="guestbook" className="py-24 px-6 bg-slate-900 min-h-screen">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-10">
                    <h2 className="text-5xl text-amber-500 mb-4" style={{ fontFamily: 'Georgia, sefif'}}>
                        방명록
                    </h2>
                    <p className="text-amber-200/80 italic">
                        "이곳에 남겨진 모든 메세지는 호그와트의 기록보관소에 보관됩니다."
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {ALL_HOUSES.map((h) => {
                        const active = houseFilter === h.name; 
                        const houseData = HOUSES.find(x => x.name === h.name); 
                        
                        return (
                            <button
                            key={h.name}
                            onClick={() => setHouseFilter(h.name)}
                            className="px-3 py-1 rounded-full border text-sm font-bold transition-all"
                            style={{
                                backgroundColor: active ? (houseData ? houseData.color : 'rgba(251,191,36,0.2)') : 'transparent',
                                borderColor: active ? (houseData ? houseData.accent : '#fbbf24') : 'rgba(251,191,36,0.3)',
                                color: active ? (houseData ? houseData.accent : '#fbbf24') : '#fbbf24',
                            }}
                            >
                            {h.label}
                            </button>
                        );
                        })}
                    </div>

                    <div className="flex rounded-full border border-amber-500/30 overflow-hidden">
                        <button
                        onClick={() => setSortOrder('newest')}
                        className="px-4 py-1 text-sm font-bold transition-colors"
                        style={{
                            backgroundColor: sortOrder === 'newest' ? 'rgba(251,191,36,0.2)' : 'transparent',
                            color: sortOrder === 'newest' ? '#fbbf24' : 'rgba(251,191,36,0.5)',
                        }}
                        >
                        최신순
                        </button>
                        <button
                        onClick={() => setSortOrder('oldest')}
                        className="px-4 py-1 text-sm font-bold transition-colors"
                        style={{
                            backgroundColor: sortOrder === 'oldest' ? 'rgba(251,191,36,0.2)' : 'transparent',
                            color: sortOrder === 'oldest' ? '#fbbf24' : 'rgba(251,191,36,0.5)',
                        }}
                        >
                        오래된순
                        </button>
                    </div>
                </div>

                <div className="space-y-5">
                    {filteredEntries.map((entry) => {
                        const house = HOUSES.find((h) => h.name === entry.house);

                        return (
                            <article
                                key={entry.id}
                                className="p-6 rounded-2xl border-2 shadow-xl"
                                style={{
                                    backgroundColor: '#fef3c7',
                                    borderColor: house ? house.accent : '#fbbf24'
                                }}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-bold"
                                        style={{
                                            backgroundColor: house ? house.color : '#000',
                                            color: house ? house.accent : '#fff'
                                        }}
                                    >
                                        {house ? house.label : '기숙사 없음'}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <span className="text-amber-900/60 text-sm">
                                        {new Date(entry.createdAt).toLocaleDateString()}
                                        </span>
                                        <button
                                        onClick={() => setDeleteTarget(entry)} 
                                        className="px-3 py-1 rounded-full border border-red-800 text-red-800 text-sm font-bold hover:bg-red-800 hover:text-white transition-colors"
                                        >
                                        삭제
                                        </button>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl text-amber-950 mb-1 font-bold">{entry.title}</h3>
                                <p className="text-amber-900/80 italic mb-3">- {entry.author}</p>
                                <p className="text-amber-950/90 whitespace-pre-wrap">{entry.content}</p>
                            </article>
                        );
                    })}
                </div>

            </div>

            {deleteTarget && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#fef3c7] p-6 rounded-2xl w-full max-w-sm border-2 border-red-800 shadow-2xl">
                        <h3 className="text-xl font-bold text-red-900 mb-2">방명록 삭제</h3>
                        <p className="text-red-800/80 text-sm mb-4">
                        작성 시 설정한 비밀번호를 입력해주세요.
                        </p>
                        
                        <input
                            type="password"
                            value={deletePw}
                            onChange={(e) => setDeletePw(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
                            className="w-full p-2 rounded bg-amber-50 border border-red-200 outline-none focus:border-red-500 mb-2 text-red-900"
                            placeholder="비밀번호"
                        />
                        
                        {deleteError && (
                        <p className="text-red-600 text-sm mb-3 font-bold">{deleteError}</p>
                        )}
                        
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => {
                                setDeleteTarget(null); 
                                setDeletePw('');
                                setDeleteError('');
                                }}
                                className="flex-1 py-2 rounded-full border-2 border-red-800/40 text-red-900 font-bold hover:bg-red-100"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-2 rounded-full bg-red-800 text-white font-bold hover:bg-red-900"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}