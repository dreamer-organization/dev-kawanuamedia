import { ReactNode } from "react";

interface Props {
    sidebar: ReactNode;
    children: ReactNode;
}

export default function NewsLayout({
    sidebar,
    children,
}: Props) {
    return (
        <section className="bg-primary-light-sgs py-24">
            <div className="container-custom md:container mx-auto px-6">
                <div className="grid gap-12 xl:grid-cols-[280px_1fr]">
                    {/* SIDEBAR */}
                    <aside>
                        {sidebar}
                    </aside>

                    {/* CONTENT */}
                    <main className="min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </section>
    );
}