import {useParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {BookingRequestPrice, Company, BookingRequest} from "../store/GlobalContext";
import {getBookingRequestPrices, getCompanies, createBookingByBookingRequest, getBookingRequestByCode} from "../services/BookingRequestService";
import AlertConfirm from "./shared/AlertConfirm";
import logo from "../logo.png";

const BookingRequestPrices = () => {

    let {code} = useParams();

    const [state, setState] = useState({
        bookingRequestPrice: [] as BookingRequestPrice[],
        bookingRequest: {} as BookingRequest,
        companies: [] as Company[],
        companyIsChosen: false,
        id: 0,
    })

    const [alertConfirm, setAlertConfirm] = useState<boolean>(false);

    useEffect(()=> {
        const __init = async () => {

            const bookingRequestPrice = await getBookingRequestPrices(code);
            const companies = await getCompanies();
            const bookingRequest = await getBookingRequestByCode(code);

            setState({...state, bookingRequestPrice, bookingRequest, companies})
        }

        __init()
    },[]);

    const onSelect = async (confirm: any) => {
        if (confirm === 'confirm'){

            const res = await createBookingByBookingRequest(state.id);

            if(res === true){
                setAlertConfirm(false)
                setState({...state,companyIsChosen: true})
            }

        }
        else {
            setAlertConfirm(false)
        }
    };

    const onSelectCompany = (id: any) => {
        setAlertConfirm(true)
        setState({
            ...state,
            id
        })
    }

    return (
        <>
            {state.bookingRequest.status === 0 || state.companyIsChosen ?
                (
                <div className="row">
                    <div className="col-md-12 text-center">
                        <img src={logo} alt="" className="mt-3"/>
                    </div>
                    <div className="col-md-12 text-center">
                        <h1 style={{
                            textAlign: "center",
                            margin: "50px auto",
                            textTransform: "uppercase",
                            fontWeight: "700",
                            borderBottom: "2px solid #4fcd00",
                            width: '40%',
                            padding: "10px"
                        }}>
                            Company has been chosen
                        </h1>
                    </div>
                </div>
                ) :
                (
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <img src={logo} alt="" className="mt-3" />
                        </div>
                        <div className="col-md-12 text-center mt-5">
                            <h2 className="mb-4 text-uppercase" style={{fontWeight: "700"}}>Choose Company</h2>
                        </div>
                        <div className="col-md-12 text-center">
                            {state.bookingRequestPrice.map(item => {

                                const company = state.companies.find((c: any) => c.id === item.company_id);

                                return (
                                    <div key={item.id} className={`card p-3 d-flex flex-row align-items-center`}
                                         style={{margin: "10px auto"}}>
                                        <div className={'container-fluid'}>
                                            <div className={'row align-items-center'}>
                                                <div className={'col-md-4 col-xs-4'}>
                                                    {company?.name}
                                                </div>
                                                <div className={'col-md-3 col-xs-3 text-center'}>
                                                    {item.price}
                                                </div>
                                                <div className={'col-md-5 col-xs-5'}>
                                                    <button type="submit" className="btn request-btn float-end"
                                                            onClick={() => onSelectCompany(item.id)}>
                                                        Select Company
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            )}
                        </div>
                </div>
                )}

            {
                alertConfirm &&
                <AlertConfirm
                    title={'You are selecting the Company'}
                    message={'Are you sure you want to select this company?'}
                    id={state.id}
                    isOpen={alertConfirm}
                    onClose={onSelect}
                />
            }
        </>
    )
}

export default BookingRequestPrices