export type Demande = {
    id: number,
    title: string,
    description: string,
    status: DemandeStatus,
    technicien_id: number,
    employe_id: number,
    created_at: string,
    updated_at: string,
}

export const demandeStatus = {
    open: "ouvert",
    pending: "en_cours",
    closed: "ferme",
    resolved: "resolu"
} as const;

export type DemandeStatus = typeof demandeStatus[keyof typeof demandeStatus];


export type StoreDemande = {
    title: string,
    description: string,
    status: DemandeStatus,
    employe_id: number,
}

export type ModificationDemande = {
    title: string,
    description: string,
}

export type StatusOfDemande = {
    status: DemandeStatus,
}

export type TechnicianId = {
    technician_id: string,
}

export type Commentaire = {
    'id': number,
    'content' :string,
    'modified': boolean,
    'employe_id': number,
    'technician_id': number,
    'created_at': string,
    'modified_at': string,
}

export type StoreCommentaire = {
    'content' :string,
    'modified': boolean, // supprimer ce champ de la modification
}

export type CommentaireModification = {
    'content' :string,
}

export type employeId = {
    employe_id: number,
}

export type DashboardInfos = {
    total_: number,
    total_open: number,
    total_closed: number,
    total_resolved: number,
}
