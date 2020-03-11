import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Portfolio = props => {
    const [amountToBuy,setAmountToBuy] = useState(0);
    const maxQuantity = Math.floor(props.userBalance / props.price);
    const buyLess = () => {
        let amount = amountToBuy;
        if(amount - 1 < 0) setAmountToBuy(amount);
        else setAmountToBuy(--amount);
    }

    const buyMore = () => {
        let amount = amountToBuy;
        if(amount + 1 > maxQuantity) setAmountToBuy(amount)
        else setAmountToBuy(++amount);
    }

    const setMax = () => {
        setAmountToBuy(maxQuantity);
    }

    const handleFinalize = () => {
        let moneySpent = (amountToBuy * props.price).toFixed(2);
        const { stockName } = props;
        props.handleBuy(stockName,amountToBuy,moneySpent);
        setAmountToBuy(0);
    }

    const handleDisplay = () => {
        if(props.searchMode){
            return (
                <table className="table table-bordered">
                    <caption className="text-center">{props.stockName}</caption>
                    <tbody>
                        <tr>
                            <td>Price</td>
                            <td>{props.price}</td>
                        </tr>
                        <tr>
                            <td>How many to buy?</td>
                            <td>
                                <Button onClick={e => buyLess()}>-</Button>
                                <input type="number" value={amountToBuy} disabled/>
                                <Button onClick={e => buyMore()}>+</Button>
                                <Button onClick={e => setMax()}>Max</Button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="12">
                                <Button onClick={e => handleFinalize()}>Finalize</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }else{
            return <div></div>
        }
    }

    return (
        <div>
            {handleDisplay()}
        </div>
    )
}
 
export default Portfolio;