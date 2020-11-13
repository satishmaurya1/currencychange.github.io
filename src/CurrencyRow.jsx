import React from 'react'

const CurrencyRow = (props) => {
    const {
        currencyOptions,
        selectCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    }= props
    return (
        <>
            <input onChange={onChangeAmount} type='number' value={amount}/>

            <select value={selectCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option=>(
                <option keys={option} value={option}>{option}</option>

                ))}
            </select>
        </>
    )
}

export default CurrencyRow
