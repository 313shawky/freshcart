export interface Product {
    images: string[];
    id: string;
    title: string;
    imageCover:string;
    description: string;
    quantity: number;
    price: number;
    category: {
        _id: string;
        name: string;
        image: string
    };
    brand: {
        _id: string;
        name: string;
        image: string
    };
    ratingsAverage: number;
}
