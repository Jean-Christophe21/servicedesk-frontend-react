import httpService from "./httpService.ts";
import type {AxiosResponse} from "axios";
import type {
    StoreDemande,
    Demande,
    ModificationDemande,
    StatusOfDemande, TechnicianId
} from "../types/types.ts";
//import getCurrentUser, {User} from "../auth/authStore.ts";

export async function demandesService(): Promise<Demande[]>
{
    const response: AxiosResponse<Demande[]> = await httpService.get('/demandes');
    console.log(response.data);
    return response.data;
}

// export async function getUserDemandes(){
//     if(!getCurrentUser())
//         return [];
//     else{
//         const currentUser: User = getCurrentUser();
//
//         const response: AxiosResponse<Demande[]> = await httpService.get( `/demandes/${currentUser.id}`);
//         console.log(response.data);
//         return response.data;
//     }
// }

export async function getUserDemandesById(id: number){
        const response: AxiosResponse<Demande | { data: Demande }> =
            await httpService.get(`/demandes/${id}`);
        const demande = "data" in response.data ? response.data.data : response.data;
        console.log(demande);
        return demande;
}


export async function createDemande(demande: StoreDemande){
    const response: AxiosResponse<Demande | { data: Demande }> =
        await httpService.post('/demandes/', demande);

    const createdDemande =
        "data" in response.data ? response.data.data : response.data;

    if (!createdDemande?.id) {
        throw new Error("La réponse de création ne contient pas l'identifiant de la demande.");
    }

    console.log(createdDemande);
    return createdDemande;
}

export async function modifyDemande(demande: ModificationDemande){
    const response: AxiosResponse<Demande> = await httpService.put('/demandes/', demande);  // format de la requête à revoir
    console.log(response.data);
    return response.data;
}


export async function modifyDemandeStatus(id:number, demande: StatusOfDemande){
    const response: AxiosResponse<Demande | { data: Demande }> =
        await httpService.put(`/demandes/${id}/status`, demande);

    return "data" in response.data ? response.data.data : response.data;
}

export async function assignTechnicianToDemand(demandeId: number, technician: TechnicianId){
    const response: AxiosResponse<Demande> = await httpService.put(`/demandes/${demandeId}/assign`, technician);  // format de la requête à revoir
    console.log(response.data);
    return response.data;
}
