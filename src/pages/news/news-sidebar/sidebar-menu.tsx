interface Item {
    name: string;
    total: number;
}

interface Props {
    items: Item[];
    active?: number;
}

export default function SidebarMenu({
    items,
    active = 0,
}: Props) {
    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <button
                    key={item.name}
                    className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-left transition cursor-pointer
                        ${
                            active === index
                                ? "bg-premium-gold-sgs text-navy-sgs-dark"
                                : "text-navy-sgs-dark hover:bg-premium-gold-sgs"
                        }
                    `}
                >
                    <span>{item.name}</span>

                    <span>{item.total}</span>
                </button>
            ))}
        </div>
    );
}