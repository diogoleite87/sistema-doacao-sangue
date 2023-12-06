export type BloodTypeDTO = {
    type: string,
    factor: string
}

export type CityDTO = {
    name: string,
    stateId: number
}

export type CollectionLocationDTO = {
    name: string,
    street: string,
    number: string,
    complement: string,
    cityId: number
}

export type DonationDTO = {
    personId: number,
    localId: number,
    date: Date
}

export type PersonDTO = {
    name: string,
    street: string,
    number: string,
    complement: string,
    rg: string,
    cityId: number,
    bloodTypeId: number
}

export type StateDTO = {
    name: string,
    acronym: string
}