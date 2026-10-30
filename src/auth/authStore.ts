

export type User = {
    id: string;
    email: string;
    name?: string;
}

let currentUser: User | null = null;
currentUser = {
    id: '1',
    email: 'exemple@example.com',
    name: 'currentUser',
}

export default function getCurrentUser(): User | null {
    return currentUser;
}
