import {useLocation} from "react-router-dom";
import logo from '../logo.png'
import React, {useEffect, useState} from "react";
import {updatePayment,sendCancelEmail} from "../services/PaymentService";

const ContinueBooking = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const orderNumber = params.get("ORDER_NUMBER");
    const returnCode: any = params.get("RETURN_CODE");

    console.log(returnCode)

    const [state, setState] = useState({
        loading: true
    });

    useEffect(() => {
        const __init = async () => {
            // const res = await Number(returnCode) === 0 ? updatePayment(orderNumber) : '';

            if(Number(returnCode) === 0){
                const res = await updatePayment(orderNumber);

                if (res){
                    setState({loading: false})
                }
            }
            else if(Number(returnCode) === 1){
                const res = await sendCancelEmail(orderNumber);

                if (res){
                    setState({loading: false})
                }
            }
        }

        __init();
    }, []);

    return (
        <div className="container">
            {
                Number(returnCode) === 0 &&
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img src={logo} alt="" className="mt-3" />
                    </div>
                    <div className="col-md-12 text-center">
                        <div className="card mt-5 d-flex align-items-center justify-content-center">
                            <div style={{
                                borderRadius: '200px',
                                height: '200px',
                                background: "#F8FAF5",
                                margin: "0 auto",
                                width: '200px'
                            }}>
                                <i className="checkmark">✓</i>
                            </div>
                            <h1 className={'success mt-5'}>Menestys</h1>
                            <p className={'success'}>Saimme maksusi.<br/> Kiitos, että valitsit meidät</p>

                            <a className={'mt-5 text-muted'} href="https://vuokralaatikot.fi">Mene kotisivulle</a>
                        </div>
                    </div>
                </div>
            }

            {
                Number(returnCode) === 1 &&
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img src={logo} alt="" className="mt-3" />
                    </div>

                    <div className="col-md-12 text-center">
                        <div className="card mt-5 d-flex align-items-center justify-content-center">
                            <div style={{
                                borderRadius: '200px',
                                height: '200px',
                                background: "#F8FAF5",
                                margin: "0 auto",
                                width: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <i className="fa fa-remove" style={{color: '#df4747', fontSize: '100px'}}></i>
                            </div>
                            <h1 className={'success mt-5'} style={{color: '#df4747'}}>Epäonnistui</h1>
                            <p className={'success'}>Maksu epäonnistui.<br/> Yritä uudelleen myöhemmin</p>

                            <a className={'mt-5 text-muted'} href="https://vuokralaatikot.fi">Mene kotisivulle</a>
                        </div>
                    </div>
                </div>
            }

            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
        </div>
    )
}

export  default ContinueBooking