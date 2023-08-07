const API_DATA = {
    GET_DATA: "/products",
};

const PRODUCT = {
    PRODUCTS_LIMIT: 4,
    MIN_PRICE: 0,
    MAX_PRICE: 100000
}

const INPUT_FIELDS = [
    {
        placeholder: "Full name",
        label: "Full name",
        type: "text",
        name: "name",
        required: true,
    },
    {
        placeholder: "Card number",
        label: "Card number",
        type: "number",
        name: "cardNumber",
        required: true,
    },
    {
        placeholder: "CVC",
        label: "CVC",
        type: "number",
        name: "cvc",
        required: true,
    },
    {
        placeholder: "MM/YY",
        label: "Expiry date",
        type: "text",
        name: "expiryDate",
        required: true,
    },
    {
        placeholder: "Your cell phone",
        label: "Phone",
        type: "number",
        name: "phone",
        required: true,
    },
    {
        placeholder: "Your e-mail",
        label: "E-mail",
        type: "text",
        name: "email",
        required: false,
    },
    {
        placeholder: "Comment",
        label: "Comment",
        type: "text",
        name: "comment",
        required: false,
    },
];

export { API_DATA, PRODUCT, INPUT_FIELDS };
