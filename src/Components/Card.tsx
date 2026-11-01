import type { DashboardInfos } from "../types/types.ts";

type CardProps = {
    data: DashboardInfos;
};

const cardTitles: Record<keyof DashboardInfos, string> = {
    total_: "Total",
    total_open: "Demandes ouvertes",
    total_closed: "Demandes fermées",
    total_resolved: "Demandes résolues",
};

export default function Card({ data }: CardProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(cardTitles) as Array<keyof DashboardInfos>).map((key) => (
                <article
                    key={key}
                    className="border border-black bg-white p-5 text-black transition-colors hover:bg-gray-200"
                >
                    <h2 className="text-lg font-semibold text-black!">{cardTitles[key]}</h2>
                    <p className="mt-4 text-3xl font-semibold">{data[key]}</p>
                </article>
            ))}
        </div>
    );
}
