import {useNavigate} from "react-router-dom";
import {type FormEvent, useEffect, useState} from "react";
import type {Commentaire} from "../types/types.ts";
import {getaCommentForDemand, ModifyCommentForDemand} from "../services/CommentsService.ts";
import {formatDate} from "../utils/function.ts";


type Props = {
    demandeId: number;
    commentaireId: number;
};

export function CommentaireDetails({demandeId, commentaireId}: Props) {
    const navigate = useNavigate();
    const [commentaire, setCommentaire] = useState<Commentaire>();
    const [content, setContent] = useState("");
    const [error, setError] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        void getaCommentForDemand(demandeId, commentaireId)
            .then((loadedCommentaire) => {
//                console.log("VOici le contenu du commentaire Ligne 23 :", loadedCommentaire.data);
                setCommentaire(loadedCommentaire.data);
                setContent(loadedCommentaire.data.content);
            })
            .catch(() => {
                setError("Impossible de charger le commentaire.");
            });
    }, [demandeId, commentaireId]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage(undefined);

        if (content.length == 0) {
            setMessage("Le commentaire ne peut pas être vide.");
            return;
        }

        setIsSubmitting(true);

        try {
            const updatedCommentaire = await ModifyCommentForDemand(
                demandeId,
                commentaireId,
                {
                    content: content.trim()
                }
            );
            setCommentaire(updatedCommentaire.data);
            setContent(updatedCommentaire.data.content);
            setMessage("Le commentaire a été modifié.");
        } catch {
            setMessage("La modification du commentaire a échoué.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (error) {
        return <p className="p-8 text-black">{error}</p>;
    }

    if (!commentaire) {
        return <p className="p-8 text-black">Chargement du commentaire...</p>;
    }

    console.log("VOici le contenu du commentaire Ligne 68 :", commentaire.content);

    return (
        <main className="min-h-full p-4 text-black sm:p-6 lg:p-8">
            <article className="mx-auto max-w-3xl overflow-hidden border border-black bg-white">
                <header className="border-b border-black bg-black px-6 py-6 text-white sm:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        {/*Détail du commentaire #{commentaire.id}*/}
                    </p>
                    <h1 className="mt-2 text-8xl font-medium tracking-tight text-white">
                         Commentaire :
                    </h1>
                    <p>
                        {commentaire.content}
                    </p>
                </header>

                <section className="px-6 py-6 sm:px-8">
                    <p className="whitespace-pre-wrap leading-7 text-black/75">
                        {commentaire.content}
                    </p>
                    <p className="mt-4 text-xs text-black/50">
                        Créé le {commentaire.created_at}
                    </p>
                </section>

                <form
                    onSubmit={handleSubmit}
                    className="border-t border-black bg-gray-50 px-6 py-6 sm:px-8"
                >
                    <label
                        htmlFor="commentaire-content"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                    >
                        Modifier le commentaire
                    </label>
                    <textarea
                        id="commentaire-content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        rows={6}
                        required
                        className="w-full resize-y border border-black bg-white px-3 py-2.5 text-black outline-none focus:bg-black focus:text-white"
                    />
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-black px-4 py-2.5 font-semibold text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/50"
                        >
                            {isSubmitting ? "Modification..." : "Enregistrer"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(`/demandes/${demandeId}`)}
                            className="border border-black bg-white px-4 py-2.5 font-semibold text-black transition-colors hover:bg-black hover:text-white"
                        >
                            Retour à la demande
                        </button>
                    </div>
                    {message && (
                        <p className="mt-3 text-sm" role="status">
                            {message}
                        </p>
                    )}
                </form>
            </article>
        </main>
    );
}
