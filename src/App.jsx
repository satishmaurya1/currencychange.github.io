import React,{useEffect,useState} from 'react';
import './index.css';
import CurrencyRow from './CurrencyRow';


const BASE_URL=' https://api.ratesapi.io/api/latest';


const App = () => {
    const [currencyOptions,setCurrencyOptions]=useState([])

    const [fromCurrency,setFromCurrency]=useState();
    const [toCurrency,setToCurrency]=useState();
    const [exchangeRate,setExchangeRate]=useState();
    const [amount,setAmount]=useState();
    const [amountInFromCurrency,setAmountInFromCurrency]=useState(true);


    let toAmount,fromAmount

    if(amountInFromCurrency){
        fromAmount=amount
        toAmount=amount * exchangeRate
    }else{
        toAmount=amount
        fromAmount=amount / exchangeRate
    }


    useEffect(()=>{
        fetch(BASE_URL)
        .then(res=>res.json())
        .then(data=>{
            const firstCurrency=Object.keys(data.rates)[0]
            setCurrencyOptions([data.base,...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(firstCurrency)
            setExchangeRate(data.rates[firstCurrency])
        })
    },[])

    useEffect(()=>{
        if(fromCurrency != null && toCurrency != null){
            fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res=>res.json())
            .then(data=>setExchangeRate(data.rates[toCurrency]))
        }

    },[fromCurrency,toCurrency])

    function handleToAmountChange(event){
        setAmount(event.target.value)
        setAmountInFromCurrency(false)
    }

    function handleFromAmountChange(event){
        setAmount(event.target.value)
        setAmountInFromCurrency(true)

    }



    return (
        <>
            <h1>Convert</h1>

            <CurrencyRow 
                currencyOptions={currencyOptions}
                selectCurrency={fromCurrency}
                onChangeCurrency={e=>setFromCurrency(e.target.value)}
                amount={fromAmount}
                onChangeAmount={handleFromAmountChange}
            />
            <div className='equal'>=</div>
            <CurrencyRow 
                currencyOptions={currencyOptions}
                selectCurrency={toCurrency}
                onChangeCurrency={e=>setToCurrency(e.target.value)}
                amount={toAmount}
                onChangeAmount={handleToAmountChange}
            />
        </>
    )
}

export default App
