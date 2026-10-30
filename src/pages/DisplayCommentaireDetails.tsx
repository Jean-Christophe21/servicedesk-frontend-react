import {useParams} from "react-router-dom";
import {CommentaireDetails} from "../Components/CommentaireDetails.tsx";


export default function DisplayCommentaireDetails() {
    const {demandeId, commentaireId} = useParams<{
        demandeId: string;
        commentaireId: string;
    }>();

    if (!demandeId || !commentaireId) {
        return <p className="p-8 text-black">Identifiant de commentaire manquant.</p>;
    }

    const idDemande = Number(demandeId);
    const idCommentaire = Number(commentaireId);

    if (!Number.isInteger(idDemande) || idDemande <= 0 ||
        !Number.isInteger(idCommentaire) || idCommentaire <= 0) {
        return <p className="p-8 text-black">commentaire ou demande non trouvé.</p>;
    }

    return (
        <CommentaireDetails
            demandeId={idDemande}
            commentaireId={idCommentaire}
        />
    );
}

