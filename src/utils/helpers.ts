import { EmailClient } from "@azure/communication-email"
import jwt from "jsonwebtoken"
import shortId from "shortid"
import slugify from "slugify"
import { SlugifyOptions } from "../types/common"
import {
    BlobSASSignatureValues,
    BlobServiceClient,
    ContainerSASPermissions,
    generateBlobSASQueryParameters,
    SASProtocol,
    StorageSharedKeyCredential,
} from "@azure/storage-blob"

export const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

export const generateShortId = () => {
    return shortId.generate()
}

export function generatePassword(length: number = 8): string {
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const specialCharacters = "@#$%^&*()_+[]{}"

    const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters

    // Ensure the password contains at least one character from each category
    const getRandomCharacter = (chars: string) => chars[Math.floor(Math.random() * chars.length)]

    const passwordArray = [
        getRandomCharacter(upperCaseLetters),
        getRandomCharacter(lowerCaseLetters),
        getRandomCharacter(numbers),
        getRandomCharacter(specialCharacters),
    ]

    // Generate remaining characters randomly from all available characters
    for (let i = passwordArray.length; i < length; i++) {
        passwordArray.push(getRandomCharacter(allCharacters))
    }

    // Shuffle the password array to avoid predictable patterns
    const shuffleArray = <T>(array: T[]) => array.sort(() => Math.random() - 0.5)

    return shuffleArray(passwordArray).join("")
}

export const sliceText = (text: string, length = 4) => text?.slice(0, length) || ""

export const sendEmail = async ({
    subject,
    html,
    plainText,
    recipients,
}: {
    subject: string
    html: string
    plainText: string
    recipients: Array<{ address: string; displayName: string }>
}) => {
    const connectionString = process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"]
    const senderAddress = process.env["COMMUNICATION_SERVICES_SENDER_ADDRESS"]
    const emailClient = new EmailClient(connectionString)
    const message = {
        senderAddress,
        content: {
            subject,
            html,
            plainText,
        },
        recipients: {
            to: recipients,
        },
    }

    const poller = await emailClient.beginSend(message)

    if (!poller.getOperationState().isStarted) {
        throw "Poller was not started."
    }

    const result = await poller.pollUntilDone()

    if (result.error?.message) {
        throw result.error?.message
    }
}

export const slugifyText = (text: string, args?: SlugifyOptions) => {
    return slugify(text, {
        lower: true, // Convert to lowercase
        strict: true, // Remove special characters
        replacement: "_",
        ...args,
    })
}

export const sendWelcomeEmail = async ({
    recipients,
    username,
    password,
}: {
    recipients: Array<{ address: string; displayName: string }>
    username: string
    password
}) => {
    sendEmail({
        recipients,
        plainText: "Hello",
        subject: "Welcome to EnviStride",
        html: `<p>Your generated username and password is: <br/><br/>
        <strong>Username: ${username}</strong>
        <br/>
        <strong>Password: ${password}</strong>
        </p>`,
    })
}

export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000)
}

export async function createContainerSas() {
    const accountName = process.env.ACCOUNT_NAME
    const containerName = process.env.CONTAINER_NAME
    const accountkey = process.env.ACCOUNT_KEY

    const credential = new StorageSharedKeyCredential(accountName, accountkey)
    const sasOptions: BlobSASSignatureValues = {
        containerName,
        protocol: SASProtocol.HttpsAndHttp,
    }

    sasOptions.permissions = ContainerSASPermissions.parse("cwr") // for creating and writing.
    sasOptions.expiresOn = new Date(new Date().valueOf() + 3600 * 1000)
    const sasToken = generateBlobSASQueryParameters(sasOptions, credential).toString()
    console.log(sasOptions.permissions)
    return sasToken
}

export const uploadFile = async (blobName: string) => {
    const sasToken = await createContainerSas()
    const blobServiceClient = new BlobServiceClient(
        `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net/?${sasToken}`,
    )
    const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME)
    const blobClient = containerClient.getBlockBlobClient(blobName)
    return blobClient.url
}
