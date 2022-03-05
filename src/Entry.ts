export default interface Entry {
    id: string
    when: string
    assetTo: string
    assetFrom: string
    exchange: string
    quantityTo: number
    quantityFrom: number
    locationTo: string
    locationFrom: string
    descriptionTo: string
    descriptionFrom: string
    transactionID: string
}

export const EmptyEntry: Entry = {
    id: "",
    when: "",
    assetTo: "",
    assetFrom: "",
    exchange: "",
    quantityTo: 0,
    quantityFrom: 0,
    locationTo: "",
    locationFrom: "",
    descriptionTo: "",
    descriptionFrom: "",
    transactionID: "",
}