import { useState } from "react";
import { useGuestbook, HOUSES } from "./guestbookStore";

export function GuestbookFormModal({ open, onClose }) {
    const { addEntry } = useGuestbook();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const [house, setHouse] = useState('Gryffindor'); 
    const [password, setPassword] = useState('');

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !author.trim() || !content.trim() || !password.trim()) {
            alert("마법의 메시지가 부족합니다. 모든 항목을 입력해주세요!");
            return;
        }

        addEntry({
            title,
            author,
            content,
            house,
            password
        });

        setTitle('');
        setAuthor('');
        setContent('');
        setPassword('');
        setHouse('Gryffindor');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">

            <div className="bg-[#fef3c7] p-8 rounded-2xl w-full max-w-lg shadow-2xl border-2 border-amber-500">
                <h2 className="text-3xl text-amber-900 font-serif mb-6 text-center">방명록 작성</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-amber-900 mb-1 font-bold">제목</label>
                        <input
                            className="w-full p-2 rounded bg-amber-50 border border-amber-200 text-amber-950 outline-none focus:border-amber-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                        />
                    </div>

                    <div>
                        <label className="block text-amber-900 mb-1 font-bold">작성자</label>
                        <input 
                            className="w-full p-2 rounded bg-amber-50 border border-amber-200 text-amber-950 outline-none focus:border-amber-500"
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)} 
                            placeholder="이름을 입력하세요"
                        />
                    </div>

                    <div>
                        <label className="block text-amber-900 mb-1 font-bold">내용</label>
                        <textarea 
                            className="w-full p-2 rounded bg-amber-50 border border-amber-200 text-amber-950 outline-none focus:border-amber-500"
                            rows={4}
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            placeholder="마법 같은 한 마디를 남겨주세요"
                        />
                    </div>

                    <div>
                        <label className="block text-amber-900 mb-1 font-bold">비밀번호</label>
                        <input 
                            type="password" 
                            className="w-full p-2 rounded bg-amber-50 border border-amber-200 text-amber-950 outline-none focus:border-amber-500"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="나중에 글을 지울 때 사용할 비밀번호"
                        />
                    </div>

                    <div>
                        <label className="block text-amber-900 mb-1 font-bold">기숙사 선택</label>
                        <div className="grid grid-cols-2 gap-2">
                        {HOUSES.map((h) => {
                            const active = house === h.name; 
                            return (
                            <button
                                type="button"
                                key={h.name}
                                onClick={() => setHouse(h.name)} 
                                className={`px-3 py-2 rounded-md border-2 transition-all font-bold`}
                                style={{
                                backgroundColor: active ? h.color : 'rgba(255,255,255,0.4)',
                                borderColor: active ? h.accent : '#d97706',
                                color: active ? h.accent : '#78350f',
                                }}
                            >
                                {h.label}
                            </button>
                            );
                        })}
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 py-2 rounded-full border-2 border-amber-800 text-amber-900 hover:bg-amber-100"
                        >
                        취소
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-2 rounded-full bg-amber-700 text-white hover:bg-amber-800"
                        >
                        남기기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}