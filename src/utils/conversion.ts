import { conversionTable, distanceConversionTable } from "./constants"
import { lengthTable } from "./length"
import { volumeTable } from "./volume"

export function convertWeight(
    value: number,
    fromUnit: keyof typeof conversionTable,
    toUnit: keyof typeof conversionTable,
) {
    if (!conversionTable[fromUnit] || !conversionTable[fromUnit][toUnit]) {
        throw new Error("Invalid unit provided for conversion.")
    }

    return value * conversionTable[fromUnit][toUnit]
}

export function convertDistance(
    value: number,
    fromUnit: keyof typeof distanceConversionTable,
    toUnit: keyof typeof distanceConversionTable,
) {
    if (!distanceConversionTable[fromUnit] || !distanceConversionTable[fromUnit][toUnit]) {
        throw new Error("Invalid unit provided for conversion.")
    }

    return value * distanceConversionTable[fromUnit][toUnit]
}

export function convertLength(value: number, fromUnit: string, toUnit: string) {
    if (!lengthTable[fromUnit] || !lengthTable[fromUnit][toUnit]) {
        throw new Error("Invalid unit provided for conversion.")
    }

    return value * lengthTable[fromUnit][toUnit]
}

export function convertVolume(value: number, fromUnit: string, toUnit: string) {
    if (!volumeTable[fromUnit] || !volumeTable[fromUnit][toUnit]) {
        throw new Error("Invalid unit provided for conversion.")
    }

    return value * volumeTable[fromUnit][toUnit]
}
