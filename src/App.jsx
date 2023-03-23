import { useState } from 'react'
import './App.css'

function App() {
  const [select, setSelect] = useState(localStorage.getItem(`select`) || '*')
  const [view, setView] = useState(localStorage.getItem(`view`) || '')
  const [where, setWhere] = useState(localStorage.getItem(`where`) || '1 = 1')
  const [orderby, setOrderby] = useState(localStorage.getItem(`orderby`) || '(SELECT 0)')
  const [limit, setLimit] = useState(localStorage.getItem(`limit`) || 5000)
  const [offset, setOffset] = useState(localStorage.getItem(`offset`) || 0)

  return (
    <div className="App">
      <div className='input'>
        <div>
        <label htmlFor="select">SELECT</label>
        <input type="text" id='select' style={{width: "370px"}} onInput={(e) => {
          e.preventDefault()
          if (!e.currentTarget.value) {
            localStorage.setItem(`select`,`*`)
          } else {
            localStorage.setItem(`select`,
              e.currentTarget.value
                .replace(/\*+/ig,'*')
                .replace(/\stop\s/ig,' TOP ')
                .replace(/\sdistinct\s/ig,' DISTINCT ')
                .replace(/\sas\s/ig,' AS ')
                .replace(/sum\(/ig,'SUM(')
                .replace(/avg\(/ig,'AVG(')
                .replace(/max\(/ig,'MAX(')
                .replace(/min\(/ig,'MIN(')
                .replace(/stdev\(/ig,'STDEV(')
                .replace(/stdevp\(/ig,'STDEVP(')
                .replace(/var\(/ig,'VAR(')
                .replace(/varp\(/ig,'VARP(')
                .replace(/checksum_agg\(/ig,'CHECKSUM_AGG(')
                .replace(/count\(/ig,'COUNT(')
                .replace(/count_big\(/ig,'COUNT_BIG(')
                .replace(/grouping\(/ig,'GROUPING(')
                .replace(/grouping_id\(/ig,'GROUPING_ID(')
                .replace(/string_agg\(/ig,'STRING_AGG(')
                .replace(/rank\(/g,'RANK() OVER (PARTITION BY ... ORDER BY ...) AS ROWNUM')
                .replace(/row_number\(/g,'ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) AS ROWNUM')
                .replace(/dense_rank\(/g,'DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...) AS Dense')
                .replace(/ntile\(/g,'NTILE() OVER ([PARTITION BY ...] ORDER BY ...) AS Dense')
                .replace(/over\s?\(/ig,'OVER (')
                .replace(/left\(/ig,'LEFT(')
                .replace(/mid\(/ig,'MID(')
                .replace(/right\(/ig,'RIGHT(')
                .replace(/rtrim\(/ig,'RTRIM(')
                .replace(/ltrim\(/ig,'LTRIM(')
                .replace(/replace\(/ig,'REPLACE(')
                .replace(/reverse\(/ig,'REVERSE(')
                .replace(/lower\(/ig,'LOWER(')
                .replace(/upper\(/ig,'UPPER(')
                .replace(/concat\(/ig,'CONCAT(')
                .replace(/substr\(/ig,'SUBSTR(')
                .replace(/substring\(/ig,'SUBSTRING(')
                .replace(/charindex\(/ig,'CHARINDEX(')
                .replace(/floor\(/ig,'FLOOR(')
                .replace(/ceiling\(/ig,'CEILING(')
                .replace(/round\(/ig,'ROUND(')
                .replace(/len\(/ig,'LEN(')
                .replace(/isnull\(/ig,'ISNULL(')
                .replace(/coalesce\(/ig,'COALESCE(')
                .replace(/cast\(/ig,'CAST(... AS VARCHAR) AS ...')
                .replace(/convert\(/ig,`CONVERT(VARCHAR, '1998-11-30') AS ...`)
                .replace(/getdate\(/ig,`GETDATE() AS [CURRENT DATE]`)
                // .replace(/DATEADD\(/ig,`DATEADD(mm, 1,'1998-11-30'`)
            )
          }
          setSelect(localStorage.getItem(`select`))
        }} value={select} />
        </div>
        <div>
        <label htmlFor="view">Table/View Name</label>
        <textarea type="text" id='view' style={{width: "370px"}} onInput={(e) => {
          e.preventDefault()
          localStorage.setItem(`view`,
            e.currentTarget.value.replace(/\n\n/g,"\n")
          )
          setView(localStorage.getItem(`view`))
        }} value={view} />
        </div>
        <div>
        <label htmlFor="where">WHERE</label>
        <input type="text" id='where' style={{width: "370px"}} onInput={(e) => {
          e.preventDefault()
          if (!e.currentTarget.value) {
            localStorage.setItem(`where`,`1=1`)
          } else {
            localStorage.setItem(`where`,
              e.currentTarget.value
                .replace(/\sand\s/ig,' AND ')
                .replace(/\sor\s/ig,' OR ')
                .replace(/\snot\s/ig,' NOT ')
                .replace(/\slike\s/ig,' LIKE ')
                .replace(/\sin\s/ig,' IN ')
                .replace(/\sis\s/ig,' IS ')
                .replace(/\snull\s/ig,' NULL ')
                .replace(/\.\*/ig,'%')
            )
          }
          setWhere(localStorage.getItem(`where`))
        }} value={where} />
        </div>
        <div>
        <label htmlFor="orderby">ORDER BY</label>
        <input type="text" id='orderby' style={{width: "370px"}} onInput={(e) => {
          e.preventDefault()
          if (!e.currentTarget.value) {
            localStorage.setItem(`orderby`, `(SELECT 0)`)
          } else {
            localStorage.setItem(`orderby`,
              e.currentTarget.value
                .replace(/\sasc\s/ig,' ASC ')
                .replace(/\sdesc\s/ig,' DESC ')
            )
          }
          setOrderby(localStorage.getItem(`orderby`))
        }} value={orderby} />
        </div>
        <div>
          <label htmlFor="limit">LIMIT</label>
          <input type="number" id='limit' style={{width: "370px"}} onInput={(e) => {
          e.preventDefault()
          if (!e.currentTarget.value) {
            localStorage.setItem(`limit`,5000)
          } else {
            localStorage.setItem(`limit`, e.currentTarget.value)
          }
          setLimit(localStorage.getItem(`limit`))
        }} value={limit} />
        </div>
        <div>
          <label htmlFor="offset">OFFSET</label>
          <input type="number" id='offset' style={{width: "370px"}} onInput={(e) => {
          e.preventDefault()
          if (!e.currentTarget.value) {
            localStorage.setItem(`offset`, 0)
          } else {
            localStorage.setItem(`offset`, e.currentTarget.value)
          }
          setOffset(localStorage.getItem(`offset`))
        }} value={offset} />
        </div>
      </div>
      {/* <div className="split"></div> */}
      <hr />
      <div className='output'>
        {view.split('\n').map((v,i) => {
          if (v) {
            return <div className='outitem' key={i}>
              SELECT {select} <br /> 
              FROM {v} <br /> 
              WHERE {where} <br /> 
              ORDER BY {orderby} <br /> 
              LIMIT {limit} <br /> 
              OFFSET {offset};
            </div>
          }
        }
        )}
      </div>
    </div>
  )
}

export default App
