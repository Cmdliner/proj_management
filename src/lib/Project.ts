export interface IProjectItem {
    name: string;
    description: string;
    status: string;
    id: string;
}

export type ProjectForm = {
    name? : string;
    status?: 'active' | 'on hold' | 'completed';
    description?: string;
    dueDate?: Date
}

export interface IProject {
    id: string;
    name: string;
    // status: 'active' | 'on hold' | 'completed';
    status?: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    dueDate: string;
    tasks: {}[];
}