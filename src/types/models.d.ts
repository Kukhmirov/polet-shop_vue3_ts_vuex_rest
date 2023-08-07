interface ProductsModel {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { count: number, rate: number };
    title: string;
}

interface UserInput {
    [key: string]: string;
    name: string;
    cardNumber: string;
    cvc: string,
    expiryDate: string,
    phone: string;
    comment: string;
    email: string;
    address: string;
}