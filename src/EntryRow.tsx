import React from "react";
import EditEntryRow from "./EditEntryRow";
import Entry from "./Entry";

interface Props {
    entry: Entry
    onChange: (entry: Entry) => void
    onDelete: (entryID: string) => void
}

const EntryRow: React.FunctionComponent<Props> = ({ entry, onChange, onDelete }) => {
    const { when, assetTo, assetFrom, exchange, quantityTo, quantityFrom, locationTo, locationFrom, descriptionTo, descriptionFrom, transactionID } = entry
    const [editing, setEditing] = React.useState(false)
    const onEditClick = React.useCallback(() => {
        setEditing(true)
    }, [editing, setEditing])
    const onDeleteClick = React.useCallback(() => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return
        onDelete(entry.id)
    }, [onDelete, entry.id])
    const onSave = React.useCallback((entry: Entry) => {
        onChange(entry)
        setEditing(false)
    }, [setEditing, onChange])
    if (editing) {
        return (
            <EditEntryRow
                formID={`form_entry_${entry.id}`}
                initial={entry}
                onSave={onSave}
            />
        )
    }
    return (
        <tr>
            <td>{when}</td>
            <td>{assetTo}</td>
            <td>{assetFrom}</td>
            <td>{exchange}</td>
            <td>{quantityTo}</td>
            <td>{quantityFrom}</td>
            <td>{locationTo}</td>
            <td>{locationFrom}</td>
            <td>{descriptionTo}</td>
            <td>{descriptionFrom}</td>
            <td>{transactionID}</td>
            <td>
                <div className="btn-group">
                    <button type="button" onClick={onEditClick} className="btn btn-primary">
                        Edit
                    </button>
                    <button type="button" onClick={onDeleteClick} className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default EntryRow