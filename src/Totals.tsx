import React from "react"
import { List, Map } from "immutable"
import Entry from "./Entry"

interface Props {
    entries: List<Entry>
}

const Totals: React.FunctionComponent<Props> = ({ entries }) => {
    const totals = React.useMemo(() => {
        return entries.reduce((totals, entry) => {
            const sameAsset = entry.assetTo === entry.assetFrom
            if (sameAsset) return totals
            return totals.withMutations((totals) => {
                if (entry.quantityTo !== 0) {
                    totals.set(entry.assetTo, totals.get(entry.assetTo, 0) + entry.quantityTo)
                }
                if (entry.quantityFrom !== 0) {
                    totals.set(entry.assetFrom, totals.get(entry.assetFrom, 0) - entry.quantityFrom)
                }
            })
        }, Map<string, number>())
    }, [entries])
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Asset</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {totals.map((amount, asset) => (
                    <tr>
                        <td>
                            {asset}
                        </td>
                        <td>
                            {amount}
                        </td>
                    </tr>
                )).toList()}
            </tbody>
        </table>
    )
}

export default Totals