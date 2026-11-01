import type {Demande} from "../types/types.ts";
import {formatDate} from "../utils/function.ts";


interface props {
    demandes: Demande[],
    OnClick: (id: number) => void
    OnClickModifierButton: (id: number) => void
}

export default function demandesTable({demandes, OnClick, OnClickModifierButton}: props) {

    console.log("demandes de l'utilisateur: Table.tsx", demandes);

    return (
        <div className="overflow-hidden border border-black bg-white">
            <div className="overflow-x-auto">
                <table className="w-full min-w-225 border-collapse text-left text-sm">
                    <thead className="bg-black text-xs uppercase tracking-wider text-white">
                        <tr>
                            <th className="px-4 py-3 font-semibold">ID</th>
                            <th className="px-4 py-3 font-semibold">Titre</th>
                            <th className="px-4 py-3 font-semibold">Description</th>
                            <th className="px-4 py-3 font-semibold">Statut</th>
                            <th className="px-4 py-3 font-semibold">Technicien</th>
                            <th className="px-4 py-3 font-semibold">Employé</th>
                            <th className="px-4 py-3 font-semibold">Modification</th>
                            <th className="px-4 py-3 font-semibold">Création</th>
                            <th className="px-4 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10">
                        {demandes.map((demande) => (
                            <tr
                                key={demande.id}
                                onClick={() => OnClick(demande.id)}
                                onMouseOver={() => console.log("on mouseover click sur ligne", demande.id)}
                                onMouseLeave={() => console.log("on mouseleave click sur ligne", demande.id)}


                                className="cursor-pointer transition-colors hover:bg-mist-200 hover:text-black"
                            >
                                <td className="px-4 py-4 font-semibold">{demande.id}</td>
                                <td className="max-w-56 px-4 py-4 font-medium">{demande.title}</td>
                                <td className="max-w-72 truncate px-4 py-4">{demande.description}</td>
                                <td className="px-4 py-4">{demande.status}</td>
                                <td className="px-4 py-4">{demande.technicien_id || "—"}</td>
                                <td className="px-4 py-4">{demande.employe_id}</td>
                                <td className="whitespace-nowrap px-4 py-4">{formatDate(demande.created_at) }</td>
                                <td className="whitespace-nowrap px-4 py-4">{formatDate(demande.updated_at) }</td>
                                <td className="px-4 py-4">
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            OnClickModifierButton(demande.id);
                                        }}
                                        className="bg-black px-3 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black"
                                    >
                                        Modifier
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}