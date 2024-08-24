export interface IProjectItem {
    name: string;
    description: string;
    status: string;
    id: string;
}

export type ProjectForm = {
    name? : string;
    status?: 'pending' | 'ongoing' | 'completed';
    description?: string;
    dueDate?: Date
}

export interface IProject {
    id: string;
    name: string;
    status: 'pending' | 'ongoing' | 'completed';
    description: string;
    createdAt: string;
    updatedAt: string;
    dueDate: string;
    tasks: {}[];
}