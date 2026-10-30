import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {listDemandComments} from "../services/CommentsService.ts";
import type {Commentaire} from "../types/types.ts";

type Props = {
    demandeId: number;
};

function formatDate(date: string): string {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(date));
}

export default function CommentsList({demandeId}: Props) {
    const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        void listDemandComments(demandeId)
            .then(setCommentaires)
            .catch(() => {
                setError("Impossible de charger les commentaires.");
            });
    }, [demandeId]);

    if (error) {
        return <p className="p-6 text-sm text-black">{error}</p>;
    }

    return (
        <section className="border-t border-black px-6 py-6 sm:px-8">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Commentaires
            </h2>

            {commentaires.length === 0 ? (
                <p className="text-sm text-black/60">Aucun commentaire.</p>
            ) : (
                <div className="grid gap-3">
                    {commentaires.map((commentaire) => (
                        <button
                            key={commentaire.id}
                            type="button"
                            onClick={() =>
                                navigate(`/demandes/${demandeId}/commentaires/${commentaire.id}`)
                            }
                            className="border border-black p-4 text-left transition-colors hover:bg-black hover:text-white"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <span className="text-xs font-semibold uppercase tracking-wider">
                                    Commentaire #{commentaire.id}
                                </span>
                                <span className="text-xs">
                                    {formatDate(commentaire.created_at)}
                                </span>
                            </div>
                            <p className="mt-2 line-clamp-2 text-sm">
                                {commentaire.content}
                            </p>
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
