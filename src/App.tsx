import React from 'react';
import { List } from 'immutable';
import './App.css';
import Entry from './Entry';
import EntriesTable from './EntriesTable';

interface EntryStore {
  save: (entries: List<Entry>) => void
  load: () => List<Entry>
}

const EntryStoreLocalStorage = (key: string) => {
  const save = (entries: List<Entry>) => {
    localStorage.setItem(key, JSON.stringify(entries.toJSON()))
  }

  const load = () => {
    const value = localStorage.getItem(key)
    if (value === null) return List<Entry>()
    return List<Entry>(JSON.parse(value))
  }

  return { save, load }
}

function App() {
  const entryStore: EntryStore = React.useMemo(
    () => EntryStoreLocalStorage('entries'),
    []
  )
  const [entries, setEntries] = React.useState<List<Entry>>(entryStore.load)
  React.useEffect(() => {
    entryStore.save(entries)
  }, [entryStore, entries])

  const backupURL = React.useMemo(() => {
    const data = JSON.stringify(entries.toJSON())
    const blob = new Blob([data], { type: "application/json" })
    return URL.createObjectURL(blob)
  }, [entries])

  const onRestore = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return
    if (event.target.files.length !== 1) return
    if (!window.confirm("Restore will remove any existing data. Continue?")) return
    const file = event.target.files[0]
    file.text()
      .then(JSON.parse)
      .then((data) => List<Entry>(data))
      .then(setEntries)
  }, [setEntries])

  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-auto ms-auto">
          <a href={backupURL} download="entries.json" className="btn btn-outline-secondary">
            Backup
          </a>
        </div>
        <div className="col-auto">
          <form>
            <div className="input-group">
              <input type="file" value="" onChange={onRestore} accept=".json,application/json" id="input-restore" className="form-control" />
              <label htmlFor="input-restore" className="input-group-text">Restore</label>
            </div>
          </form>
        </div>
      </div>
      <EntriesTable entries={entries} onChange={setEntries} />
    </div>
  );
}

export default App;
