import { HOUSES, useGuestbook } from "./guestbookStore";

export function GuestbookSection() {
    const { entries } = useGuestbook();

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

                <div className="space-y-5">
                    {entries.map((entry) => {
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
                                    <span className="text-amber-900/60 text-sm">
                                        {new Date(entry.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                <h3 className="text-2xl text-amber-950 mb-1 font-bold">{entry.title}</h3>
                                <p className="text-amber-900/80 italic mb-3">- {entry.author}</p>
                                <p className="text-amber-950/90 whitespace-pre-wrap">{entry.content}</p>
                            </article>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}