import React from "react"
import { Map, List } from "immutable"
import { v4 as uuid } from "uuid"
import Entry from "./Entry"
import Input, { NumberInput } from "./Input"

interface Props {
    formID: string
    saveEntries: (entries: List<Entry>) => void
}

const allocations: Map<string, number> = Map({
    "BTC": 0.8,
    "ETH": 0.15,
    "RUNE": 0.05,
})

const InitialQuantityTo = allocations.map(() => 0)

const assetFrom = "TODO"
const exchange = "TODO"
const locationTo = "TODO"
const locationFrom = "TODO"

const AddRecurringOrderForm: React.FunctionComponent<Props> = ({ formID, saveEntries }) => {
    const [when, setWhen] = React.useState("")
    const [quantityTo, setQuantityTo] = React.useState(InitialQuantityTo)
    const [quantityFrom, setQuantityFrom] = React.useState(0)
    const reset = React.useCallback(() => {
        setWhen("")
        setQuantityTo(InitialQuantityTo)
        setQuantityFrom(0)
    }, [setWhen, setQuantityTo, setQuantityFrom])
    const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        saveEntries(
            quantityTo.map((quantity, asset): Entry => {
                return {
                    id: uuid(),
                    when,
                    assetTo: asset,
                    assetFrom,
                    exchange,
                    quantityTo: quantity,
                    quantityFrom: quantityFrom * allocations.get(asset, 0),
                    locationTo,
                    locationFrom,
                    descriptionTo: "",
                    descriptionFrom: "",
                    transactionID: "",
                }
            }).valueSeq().toList()
        )
        reset()
    }, [saveEntries, reset, when, quantityTo, quantityFrom])
    return (
        <section>
            <h1>Add Recurring Order</h1>
            <form id={formID} onSubmit={onSubmit} className="row row-cols-lg-auto align-items-center">
                <div className="col-12">
                    <label htmlFor="when" className="visually-hidden">When</label>
                    <Input type="datetime-local" id="when" value={when} onChange={setWhen} className="form-control" />
                </div>
                {quantityTo.map((quantity, asset) => (
                    <div key={asset} className="col-12">
                        <label htmlFor={`quantityTo-${asset}`} className="visually-hidden">{asset} Quantity To</label>
                        <div className="input-group">
                            <div className="input-group-text">
                                {asset}
                            </div>
                            <NumberInput
                                id={`quantityTo-${asset}`}
                                value={quantity}
                                onChange={value => setQuantityTo(quantityTo.set(asset, value))}
                                className="form-control"
                            />
                        </div>
                    </div>
                )).valueSeq()}
                <div className="col-12">
                    <label htmlFor="quantityFrom" className="visually-hidden">Quantity From</label>
                    <div className="input-group">
                        <div className="input-group-text">
                            {assetFrom}
                        </div>
                        <NumberInput id="quantityFrom" value={quantityFrom} onChange={setQuantityFrom} className="form-control" />
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AddRecurringOrderForm
