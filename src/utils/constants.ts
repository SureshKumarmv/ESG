import { ConnectionOptions } from "bullmq"

export const conversionTable = {
    kg: {
        kg: 1,
        tonne: 0.001,
        tonUK: 0.00098,
        tonUS: 0.0011,
        lb: 2.20462,
    },
    tonne: {
        kg: 1000,
        tonne: 1,
        tonUK: 0.98421,
        tonUS: 1.10231,
        lb: 2204.62368,
    },
    tonUK: {
        kg: 1016.04642,
        tonne: 1.01605,
        tonUK: 1,
        tonUS: 1.12,
        lb: 2240,
    },
    tonUS: {
        kg: 907.18,
        tonne: 0.90718,
        tonUK: 0.89286,
        tonUS: 1,
        lb: 2000,
    },
    lb: {
        kg: 0.45359,
        tonne: 0.00045359,
        tonUK: 0.00044643,
        tonUS: 0.0005,
        lb: 1,
    },
}

export const distanceConversionTable = {
    meter: {
        meter: 1,
        kilometer: 0.001,
        mile: 0.000621371,
        yard: 1.09361,
        feet: 3.28084,
        inch: 39.3701,
        squareFeet: 10.7639,
        hectare: 0.0001,
    },
    kilometer: {
        meter: 1000,
        kilometer: 1,
        mile: 0.621371,
        yard: 1093.61,
        feet: 3280.84,
        inch: 39370.1,
        squareFeet: 10763910.4,
        hectare: 100,
    },
    mile: {
        meter: 1609.34,
        kilometer: 1.60934,
        mile: 1,
        yard: 1760,
        feet: 5280,
        inch: 63360,
        squareFeet: 27878400,
        hectare: 258.999,
    },
    yard: {
        meter: 0.9144,
        kilometer: 0.0009144,
        mile: 0.000568182,
        yard: 1,
        feet: 3,
        inch: 36,
        squareFeet: 9,
        hectare: 0.0000836127,
    },
    feet: {
        meter: 0.3048,
        kilometer: 0.0003048,
        mile: 0.000189394,
        yard: 0.333333,
        feet: 1,
        inch: 12,
        squareFeet: 1,
        hectare: 0.0000092903,
    },
    inch: {
        meter: 0.0254,
        kilometer: 0.0000254,
        mile: 0.0000157828,
        yard: 0.0277778,
        feet: 0.0833333,
        inch: 1,
        squareFeet: 0.00694444,
        hectare: 0.00000064516,
    },
    squareFeet: {
        meter: 0.092903,
        kilometer: 0.000000092903,
        mile: 0.00000003587,
        yard: 0.111111,
        feet: 1,
        inch: 144,
        squareFeet: 1,
        hectare: 0.0000092903,
    },
    hectare: {
        meter: 10000,
        kilometer: 0.01,
        mile: 0.00386102,
        yard: 11959.9,
        feet: 32808.4,
        inch: 393701,
        squareFeet: 107639.1,
        hectare: 1,
    },
}

export const AREA_FOR_CAPACITY_FOR_1_TON = 280
export const PER_TON_HVAC_IN_KGS = 1.81

export const EMAIL_QUEUE = "email_queue"

export const REDIS_CONNECTION: ConnectionOptions = {
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD,
    redisOptions: {
        password: process.env.REDIS_PASSWORD,
    },
}
export const PASSWORD_RESET_COUNT = 3

export const UNITS = ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"]
