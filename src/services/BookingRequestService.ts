import axios from "axios";
import {API} from "../config";
import {HEADERS} from "../config";

export const getBookingRequestPrices = async (code: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/booking-request-price-by-booking-request/${code}`,
        headers: HEADERS
    });

    return res.data;
};

export const createBookingByBookingRequest = async (id: any) => {
    const res = await axios({
        method: 'POST',
        url: `${API}/booking-create-by-booking-request/${id}`,
        headers: HEADERS
    });

    if (res.status === 200) {
        return true;
    } else {
        return false;
    }
};

export const getCompanies = async () => {
    const res = await axios({
        method: 'get',
        url: `${API}/ms-companies`,
        headers: HEADERS
    });

    return res.data;
};

export const getBookingRequestByCode = async (code: any) => {
    const res = await axios({
        method: 'get',
        url: `${API}/booking-request-by-code/${code}`,
        headers: HEADERS
    });

    return res.data;
};
