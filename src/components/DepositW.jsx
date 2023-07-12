import React, { useCallback, useEffect, useState } from 'react'
import '../css/result.css'
import { useDispatch, useSelector } from 'react-redux'
import { creditAgentAction, getMyAgentsAction, getMyTransactionsAction, withdrawAgentAction } from '../Redux/actions/adminActions'
import { userProfileAction } from '../Redux/actions/userActions'
const DepositW = ({ }) => {
    const [searchName, setSearchName] = useState('')
    const [balance, setBalance] = useState(0)
    const [display, setDisplay] = useState(false)
    const [deposit, setDeposit] = useState(false)
    const [victimId, setVictimId] = useState('')

    const { user } = useSelector(state => state.userProfile)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyAgentsAction)
    }, [dispatch])
    // useEffect(() => {
    //     dispatch(getMyTransactionsAction)
    // }, [dispatch])

    // const { myTransactions, loading } = useSelector(state => state.myTransactions)
    const { loading, myAgents, error } = useSelector(state => state.myAgents)
    const depositBalance = (victimId) => {
        setDisplay(true)
        setDeposit(true)
        setVictimId(victimId)
    }
    const withdrawBalance = (victimId) => {
        setDisplay(true)
        setDeposit(false)
        setVictimId(victimId)
    }
    const submitData = {
        creditToTransfer: balance
    }
    const submitAction = () => {
        if (deposit === true) {
            dispatch(creditAgentAction(submitData, victimId))
        } else {
            dispatch(withdrawAgentAction(submitData, victimId))
        }
        setTimeout(() => {
            dispatch(userProfileAction)
            dispatch(getMyAgentsAction)
        }, 2000);
        // clearTimeout(timeSet)
        setDisplay(false)
    }
    return (
        <div className='deposit_tab selected_tab'>
            <div className={display ? 'popup_container result_div' : 'd_none'}>
                <p>Enter Balance: </p>
                <input type='number' value={balance} onChange={(e) => setBalance(e.target.value)} />
                <div className='popup_btns'>
                    <button onClick={submitAction}>Submit</button>
                    <button className='b_red' onClick={() => setDisplay(false)}>Cancel</button>
                </div>
            </div>
            <h2>Deposit / Withdrawal</h2>
            <div className='member_search_bar'>
                <p>Login Name: </p>
                <input type='text' value={searchName} placeholder='Enter username to search' onChange={(e) => setSearchName(e.target.value)} />
                <button>Search</button>
            </div>
            <div className='account_credit'>
                <h3>Credit: </h3>
                <p>{user && user.credit}</p>
            </div>
            <div className='search_results overflow_n'>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Login Name</th>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Currency</th>
                            <th>Credit</th>
                            <th>Deposit</th>
                            <th>Withdrawal</th>
                            <th>Detail</th>
                            <th>Last Login Date</th>
                            <th>Last Login IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {loading && <td>loading</td>}
                        {!myTransactions && <td>Not Found</td>}
                        {myTransactions && myTransactions.filter(a => a.userName.includes(searchName)).map((transaction, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{transaction && transaction.to.userName}</td>
                                    <td>{transaction && transaction.to.name}</td>
                                    <td>{transaction && transaction.to.level}</td>
                                    <td>{transaction && transaction.currency}</td>
                                    <td>{transaction && transaction.credit}</td>
                                    <td>{transaction && transaction.transactionType === "Deposit"}</td>
                                    <td>{transaction && transaction.transactionType === "Withdrawal"}</td>
                                    <td><button>detail</button></td>
                                    <td>{transaction && transaction.to.lastLoginDate ? transaction.to.lastLoginDate : 'null'}</td>
                                    <td>{transaction && transaction.to.loginIp ? transaction.to.loginIp : 'null'}</td>
                                </tr>
                            )
                        })} */}
                        {loading && <td>loading</td>}
                        {!myAgents && <td>Not Found</td>}
                        {!loading && myAgents && myAgents.filter(a => a.userName.includes(searchName)).map((sub, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{sub && sub.userName}</td>
                                    <td>{sub && sub.name}</td>
                                    <td>{sub && sub.level}</td>
                                    <td>{sub && sub.currency}</td>
                                    <td>{sub && sub.credit}</td>
                                    <td><button onClick={() => depositBalance(sub && sub._id)}>+</button></td>
                                    <td><button onClick={() => withdrawBalance(sub && sub._id)}>-</button></td>
                                    <td><button>Detail</button></td>
                                    <td>{sub && sub.lastLoginDate ? sub.lastLoginDate : 'null'}</td>
                                    <td>{sub && sub.loginIp ? sub.loginIp : 'null'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DepositW