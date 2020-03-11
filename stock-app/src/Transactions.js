import React from 'react';

const Transactions = props => {

    const listTransactions = () => {
        const { trans } = props;
        let list = [];
        trans.forEach((element,counter) => {
            list.push(
                <tr key={counter}>
                    <td>
                        {element['symbol']}
                    </td>
                    <td>
                        {element['amount']}
                    </td>
                    <td>
                        {element['price']}
                    </td>
                </tr>
            )
        });
        return list;
    }

    return (
        <React.Fragment>
            <table>
                <caption>Transactions</caption>
                <tbody>
                    {listTransactions()}
                </tbody>
            </table>
        </React.Fragment>
    );
}
export default Transactions;