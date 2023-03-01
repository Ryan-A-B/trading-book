import React from 'react';
import { List } from 'immutable';
import Entry, { EmptyEntry } from './Entry';
import EditEntryRow from './EditEntryRow';
import EntryRow from './EntryRow';
import AddRecurringOrderForm from './AddRecurringOrder';

type Entries = List<Entry>

interface Props {
    entries: Entries
    onChange: (entries: Entries) => void
}

const addEntry = (entries: Entries, entry: Entry): Entries => {
    const index = entries.findIndex((other) => entry.when >= other.when)
    if (index >= 0) {
        return entries.splice(index, 0, entry)
    }
    return entries.push(entry)
}

const removeEntry = (entries: Entries, entryID: string): Entries => {
    const index = entries.findIndex((entry) => entry.id === entryID)
    if (index < 0) return entries
    return entries.remove(index)
}

const EntriesTable: React.FunctionComponent<Props> = ({ entries, onChange }) => {
    const putEntry = React.useCallback((entry: Entry) => {
        onChange(addEntry(removeEntry(entries, entry.id), entry))
    }, [entries, onChange])
    const addEntries = React.useCallback((newEntries: List<Entry>) => {
        onChange(newEntries.reduce(addEntry, entries))
    }, [onChange, entries])
    const deleteEntry = React.useCallback((entryID: string) => {
        onChange(removeEntry(entries, entryID))
    }, [entries, onChange])
    return (
        <React.Fragment>
            <AddRecurringOrderForm formID="form_add_recurring_order" saveEntries={addEntries} />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th rowSpan={2}>When</th>
                        <th colSpan={2}>Asset</th>
                        <th rowSpan={2}>Exchange</th>
                        <th colSpan={2}>Quantity</th>
                        <th colSpan={2}>Location</th>
                        <th colSpan={2}>Description</th>
                        <th rowSpan={2}>Transaction ID</th>
                    </tr>
                    <tr>
                        <th>To</th>
                        <th>From</th>
                        <th>To</th>
                        <th>From</th>
                        <th>To</th>
                        <th>From</th>
                        <th>To</th>
                        <th>From</th>
                    </tr>
                </thead>
                <tbody>
                    <EditEntryRow formID="form_entry_new" initial={EmptyEntry} onSave={putEntry} />
                    {entries.map((entry) => <EntryRow entry={entry} onChange={putEntry} onDelete={deleteEntry} key={entry.id} />)}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default EntriesTable