export type User = {
    id: number | string;
    name: string;
    email: string;
    access: boolean;
    lastName: string;
    birthDate: string ;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

export interface UserSliceState {
    items: User[];
    sortItems: User[];
    currentItems: User[];
    status: Status;
}

