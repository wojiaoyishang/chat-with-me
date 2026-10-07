export default function WidgetResponseDetails({ response, fallback = '' }) {
    return (
        <details className="mt-2 text-sm">
            <summary className="cursor-pointer select-none text-gray-500 hover:text-gray-800">查看选择详情</summary>
            <div className="mt-2 space-y-3 rounded-lg border border-gray-200 bg-white p-3">
                {response?.title && <div className="font-medium text-gray-800">{response.title}</div>}
                {response?.widgetType === 'card_deck' ? (
                    ['left', 'right', 'middle'].map((pile) => {
                        const cards = response[pile] || [];
                        return (
                            <section key={pile}>
                                <div className="mb-1 text-xs font-medium text-gray-500">
                                    {response[`${pile}Label`]} · {cards.length}
                                </div>
                                {cards.length ? (
                                    <ul className="space-y-2">
                                        {cards.map((card, index) => (
                                            <li key={card.id || index} className="rounded-md bg-gray-50 p-2">
                                                <div className="text-gray-800">{card.title || card.id}</div>
                                                {card.subtitle && (
                                                    <div className="text-xs text-gray-500">{card.subtitle}</div>
                                                )}
                                                {card.description && (
                                                    <div className="whitespace-pre-wrap text-xs leading-5 text-gray-600">
                                                        {card.description}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-xs text-gray-400">无</div>
                                )}
                            </section>
                        );
                    })
                ) : (
                    <div className="whitespace-pre-wrap break-words text-gray-700">{response?.summary || fallback}</div>
                )}
            </div>
        </details>
    );
}
