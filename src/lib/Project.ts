export interface IProjectItem {
    name: string;
    description: string;
    status: string;
}

export type ProjectForm = {
    name? : string;
    status?: 'pending' | 'ongoing' | 'completed';
    description?: string;
    dueDate?: Date
}