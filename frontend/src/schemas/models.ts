export type Theme = 'dark' | 'light'

export type BloodType = {
    id: number;
    type: string;
    factor: string;
    createdAt: Date;
    updatedAt: Date;
}

export type City = {
    id: number;
    name: string;
    stateId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CollectionLocation = {
    id: number;
    name: string;
    street: string;
    number: string;
    complement: string;
    cityId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type Donation = {
    id: number;
    personId: number;
    localId: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type Person = {
    id: number;
    name: string;
    street: string;
    number: string;
    complement: string;
    rg: string;
    cityId: number;
    bloodTypeId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type State = {
    id: number;
    name: string;
    acronym: string;
    createdAt: Date;
    updatedAt: Date;
}