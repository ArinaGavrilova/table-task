export enum FilterProperty {
    FILTER_NAME = 'name',
    FILTER_LASTNAME = 'lastname',
    FILTER_EMAIL = 'email',
    FILTER_BIRTHDATE = 'birthdate',
    FILTER_ACCESS = 'access',
}

export type Filter = {
    name: string | number | boolean;
    filterProperty: FilterProperty;
};

export interface FilterSliceState {
    filter: Filter;
}