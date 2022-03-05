import React from "react";
import { v4 as uuid } from "uuid";
import Entry from "./Entry";
import Input, { NumberInput } from "./Input";

interface Props {
    formID: string
    initial: Entry
    onSave: (entry: Entry) => void
}

const EditEntryRow: React.FunctionComponent<Props> = ({ formID, initial, onSave }) => {
    const [when, setWhen] = React.useState(initial.when)
    const [assetTo, setAssetTo] = React.useState(initial.assetTo)
    const [assetFrom, setAssetFrom] = React.useState(initial.assetFrom)
    const [exchange, setExchange] = React.useState(initial.exchange)
    const [quantityTo, setQuantityTo] = React.useState(initial.quantityTo)
    const [quantityFrom, setQuantityFrom] = React.useState(initial.quantityFrom)
    const [locationTo, setLocationTo] = React.useState(initial.locationTo)
    const [locationFrom, setLocationFrom] = React.useState(initial.locationFrom)
    const [descriptionTo, setDescriptionTo] = React.useState(initial.descriptionTo)
    const [descriptionFrom, setDescriptionFrom] = React.useState(initial.descriptionFrom)
    const [transactionID, setTransactionID] = React.useState(initial.transactionID)
    const reset = React.useCallback(() => {
        setWhen(initial.when)
        setAssetTo(initial.assetTo)
        setAssetFrom(initial.assetFrom)
        setExchange(initial.exchange)
        setQuantityTo(initial.quantityTo)
        setQuantityFrom(initial.quantityFrom)
        setLocationTo(initial.locationTo)
        setLocationFrom(initial.locationFrom)
        setDescriptionTo(initial.descriptionTo)
        setDescriptionFrom(initial.descriptionFrom)
        setTransactionID(initial.transactionID)
    }, [initial])
    const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSave({
            id: (initial.id ? initial.id : uuid()),
            when,
            assetTo,
            assetFrom,
            exchange,
            quantityTo,
            quantityFrom,
            locationTo,
            locationFrom,
            descriptionTo,
            descriptionFrom,
            transactionID,
        })
        reset()
    }, [onSave, initial.id, when, assetTo, assetFrom, exchange, quantityTo, quantityFrom, locationTo, locationFrom, descriptionTo, descriptionFrom, transactionID])
    // TODO find a better way to render form
    // form isn't allowed as direct decendent of tbody
    // so it gets move out of the table, which isn't an issue because we're using form.id
    return (
        <React.Fragment>
            <form id={formID} onSubmit={onSubmit} />
            <tr>
                <td>
                    <Input
                        form={formID}
                        type="datetime-local"
                        name="when"
                        value={when}
                        onChange={setWhen}
                        className="form-control"
                        required
                    />
                </td>
                <td>
                    <Input
                        form={formID}
                        name="assetTo"
                        value={assetTo}
                        onChange={setAssetTo}
                        className="form-control"
                    />
                </td>
                <td>
                    <Input
                        form={formID}
                        name="assetFrom"
                        value={assetFrom}
                        onChange={setAssetFrom}
                        className="form-control"
                    />
                </td>
                <td>
                    <Input
                        form={formID}
                        name="exchange"
                        value={exchange}
                        onChange={setExchange}
                        className="form-control"
                    />
                </td>
                <td>
                    <NumberInput
                        form={formID}
                        name="quantityTo"
                        value={quantityTo}
                        onChange={setQuantityTo}
                        className="form-control"
                    />
                </td>
                <td>
                    <NumberInput
                        form={formID}
                        name="quantityFrom"
                        value={quantityFrom}
                        onChange={setQuantityFrom}
                        className="form-control"
                    />
                </td>
                <td>
                    <Input
                        form={formID}
                        name="locationTo"
                        value={locationTo}
                        onChange={setLocationTo}
                        className="form-control"
                    />
                </td>
                <td>
                    <Input
                        form={formID}
                        name="locationFrom"
                        value={locationFrom}
                        onChange={setLocationFrom}
                        className="form-control"
                    />
                </td>
                <td>
                    <Input
                        form={formID}
                        name="descriptionTo"
                        value={descriptionTo}
                        onChange={setDescriptionTo}
                        className="form-control"
                    />
                </td>
                <td>
                    <Input
                        form={formID}
                        name="descriptionFrom"
                        value={descriptionFrom}
                        onChange={setDescriptionFrom}
                        className="form-control"
                    />
                </td>
                <td>
                    <Input
                        form={formID}
                        name="transactionID"
                        value={transactionID}
                        onChange={setTransactionID}
                        className="form-control"
                    />
                </td>
                <td>
                    <button type="submit" form={formID} className="btn btn-primary">
                        Save
                    </button>
                </td>
            </tr>
        </React.Fragment>
    )
}

export default EditEntryRow