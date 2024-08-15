import React, {useState} from 'react';
import './App.css';
import GlobalContext, {Company, GlobalState, MovingBoxesForm, PriceDetails, Price} from "./store/GlobalContext";
import Main from "./view/Main";
import {Routes, Route} from "react-router-dom";
import ContinueBooking from "./view/ContinueBooking";
import Success from "./view/Success";
import BookingRequestPrices from "./view/BookingRequestPrices";

interface IAppProps {
    companySecret: string | null
}

function App(props: IAppProps) {
    const [state, setState] = useState<GlobalState>({
        step: 1,
        companySecret: props.companySecret ? props.companySecret : '',
        priceDetails: {} as PriceDetails,
        company: {} as Company,
        movingServiceForm: {} as MovingBoxesForm,
        type: '',
        box_type: 'small',
        price: {} as Price
    });

  return (
      <GlobalContext.Provider value={{
          globalState: state,
          setGlobalState: setState
      }}>
          <Routes>
              <Route path={'/'}>
                  <Route index element={<Main/>}/>
                  <Route path={'/continue/:id'} element={<ContinueBooking />}/>
                  <Route path={'/success'} element={<Success/>}/>
                  <Route path={'/booking-request-prices/:code'} element={<BookingRequestPrices/>}/>
              </Route>
          </Routes>
      </GlobalContext.Provider>
  );
}

export default App;
