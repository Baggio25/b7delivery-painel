import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";

const tmpProduct: Product = {
    id: 999,
    image: "https://i.pinimg.com/originals/f1/f9/8e/f1f98e74906d2c48ff4ec8a40e792d65.png",
    category: {
        id: 99,
        name: "Burgers",
    },
    name: "Burgão Boladão",
    price: 35.30,
    description: "Um burger boladão muito legal"
}

export const api = {
    login: async (email: string, senha: string): Promise<{ error: string, token?: string}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                if(email != "suporte@b7web.com.br") {
                    resolve(
                        { error: "E-mail e/ou senha não estão corretos." }
                    );
                } else {
                    resolve ({
                        error: "",
                        token: "123"
                    })
                }
            }, 1000);
        });
    },

    forgoutPassword: async ( email: string ): Promise<{error: string}> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ error: "" });
            }, 1000);
        });
    },

    redefinePassword: async ( senha: string, token: string ): Promise<{error: string}> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ error: "" });
            }, 1000);
        });
    },

    getOrders: async (): Promise<Order[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders: Order[] = [];
                const statusList: OrderStatus[] = ["preparing", "sent", "delivered"];

                for(let i=0; i < 6; i++) {
                    orders.push({
                        id: parseInt('12' + i),
                        status: statusList[Math.floor(Math.random() * 3)],
                        orderDate: "2023-03-01 18:30",
                        userid: "1",
                        userName: "Rodrigo",
                        shippingAddress: {
                            id: 99,
                            cep: "99999999",
                            address: "Rua teste",
                            number: "1200",
                            neighborhood: "Bairro Teste",
                            city: "Dois Vizinhos",
                            state: "PR",
                            complement: "Casa"
                        },
                        shippingPrice: 12.25,
                        paymentType: "card",
                        changeValue: 0,
                        cupom: "NOITEMALUCA",
                        cupomDiscount: 2,
                        products: [
                            { qt: 2, product: tmpProduct},
                            { qt: 3, product: {...tmpProduct, id: 888, name: "Burger podrão"}}
                        ],
                        subtotal: 99,
                        total: 120
                    });
                }
                resolve(orders);
            }, 1000);
        });
    },

    changeOrderStatus: async ( id: number, newStatus: OrderStatus) => {
        return true;
    }

}

