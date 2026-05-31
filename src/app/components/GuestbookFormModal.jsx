import { useState } from "react";
import { useGuestbook } from "./guestbookStore";

export function GuestbookFormModal({ open, onClose }) {
    const { addEntry } = useGuestbook();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        addEntry({
            title,
            author,
            content,
            house: 'Gryffindor',
            password: '0000'
        });

        setTitle('');
        setAuthor('');
        setContent('');
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