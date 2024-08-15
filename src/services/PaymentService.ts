import axios from "axios";
import {API} from "../config";
import {HEADERS} from "../config";
import exp from "constants";
import moment from "moment";

export const updatePayment = async (booking_number: string | null | undefined) => {
    let route = booking_number && booking_number.startsWith('MS') ? 'ms-bookings-update-payment' : 'mb-bookings-update-payment';
    const res = await axios({
        method: 'post',
        data: {
            booking_number: booking_number,
        },
        url: `${API}/${route}`,
        headers: HEADERS
    });

    return res.data;
};

export const sendCancelEmail = async (booking_number: string | null | undefined) => {
    let route = booking_number && booking_number.startsWith('MS') ? 'ms-bookings-payment-canceled' : 'mb-bookings-payment-canceled';
    const res = await axios({
        method: 'post',
        data: {
            booking_number: booking_number,
        },
        url: `${API}/${route}`,
        headers: HEADERS
    });

    return res.data;
};