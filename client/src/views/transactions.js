
import Snabbdom from 'snabbdom-pragma'
import { formatSat, formatNumber } from './util'
import loader from '../components/loading'

const staticRoot = process.env.STATIC_ROOT || ''

export const transactions = (txs, viewMore, { t } ) => 
    <div className="tx-container">
      { !txs ? loader()
      : !txs.length ? <p>{t`No recent transactions`}</p>
      : <div className="transactions-table">
            <h3 className="table-title font-h3">{t`Latest Transactions`}</h3>
            <div className="transactions-table-row header">
              <div className="transactions-table-cell font-h4">{t`Transaction ID`}</div>
              { txs[0].value != null && <div className="transactions-table-cell font-h4">{t`Value`}</div> }
                <div className="transactions-table-cell font-h4">{t`Size`}</div>
                { txs[0].discount_vsize != null && <div className="transactions-table-cell font-h4">{t`Discount Size`}</div> }
              <div className="transactions-table-cell font-h4">{t`Fee Rate`}</div>
                { txs[0].discount_vsize != null && <div className="transactions-table-cell font-h4">{t`Discount Fee Rate`}</div> }
            </div>
            {txs.map(txOverview => { const feerate = txOverview.fee/txOverview.vsize; return (
              <div className="transactions-table-link-row">
                <a className="transactions-table-row transaction-data" href={`tx/${txOverview.txid}`}>
                  <div className="transactions-table-cell highlighted-text" data-label={t`TXID`}>{txOverview.txid}</div>
                  { txOverview.value != null && <div className="transactions-table-cell" data-label={t`Value`}>{formatSat(txOverview.value)}</div> }
                    <div className="transactions-table-cell" data-label={t`Size`}>{`${formatNumber(txOverview.vsize)} vB`}</div>
                    { txOverview.discount_vsize != null &&  <div className="transactions-table-cell" data-label={t`Discount Size`}>{`${formatNumber(txOverview.discount_vsize)} vB`}</div> }
                    <div className="transactions-table-cell" data-label={t`Fee Rate`}>{`${feerate.toFixed(3)} sat/vB`}</div>
                    { txOverview.discount_vsize != null && <div className="transactions-table-cell" data-label={t`Discount Fee Rate`}>{`${(txOverview.fee / txOverview.discount_vsize).toFixed(3)} sat/vB`}</div> }
                </a>
              </div>
            )})}

            {txs && viewMore ?
              <a className="view-more font-link-semibold" href="tx/recent">
                <span>{t`View more transactions`}</span>
                <div><img alt="" src={`${staticRoot}img/icons/arrow_right_blu.png`} /></div>
              </a> : ""}
        </div>
      }
    </div>

  