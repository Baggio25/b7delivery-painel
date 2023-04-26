"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Divider, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material"
import { Search, Refresh } from "@mui/icons-material";

import { Order } from "@/types/Order";
import { api } from "@/libs/api";
import { OrderItem } from "@/components/OrderItem";
import { OrderStatus } from "@/types/OrderStatus";
import { dateFormat } from "@/libs/dateFormat";

const Page = () => {
    const [searchInput, setSearchInput] =  useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [printOrder, setPrintOrder] = useState<Order | null>(null);

    const getOrders = async () => {
        setSearchInput("");
        setOrders([]);
        setLoading(true);
        
        const ordersList: Order[] = await api.getOrders();
        setOrders(ordersList);
        setLoading(false);
    }

    useEffect(() => {
        getOrders();
    }, []);
    
    useEffect(() => {
        setSearchInput("");
        setFilteredOrders(orders);
    }, [orders]);

    const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
        console.log(event.code)
        if((event.code.toLocaleLowerCase() === "enter") || (event.code.toLocaleLowerCase() === "numpadenter")) {
            if(searchInput != "") {
                let newOrders: Order[] = [];

                for(let i in orders) {
                    if(orders[i].id.toString() === searchInput) {
                        newOrders.push(orders[i]);
                    } 
                }

                setFilteredOrders(newOrders);
            }else {
                setFilteredOrders(orders);
            }
        }
    }

    const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
        await api.changeOrderStatus(id, newStatus);
        getOrders;
    }

    const handlePrintAction = (order: Order) => {
        setPrintOrder(order);
        setTimeout(() => {
            if(window) window.print();
        }, 200);
    }

    return(
        <>
            <Box sx={{ my: 3, displayPrint: "none" }}>
                <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center"}}>
                        <Typography 
                            component="h5" 
                            variant="h5"
                            sx={{ color: "#555", mr: 2 }}
                        >
                            Pedidos
                        </Typography>
                        {loading && <CircularProgress size={24}/>}
                        {!loading && 
                            <Button 
                                sx={{ justifyContent: { xs: "flex-start" } }}
                                size="small"
                                onClick={getOrders}
                            >
                                <Refresh />
                                <Typography
                                    component="div"
                                    sx={{
                                        color: "#555", 
                                        display: {
                                            xs: "none", 
                                            sm: "block"
                                        }
                                    }}
                                >
                                    Atualizar
                                </Typography>
                            </Button>
                        }
                    </Box>
                    <TextField
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        onKeyUp={handleSearchKey}
                        placeholder="Pesquise um pedido..."
                        variant="standard"
                        disabled={loading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                <Grid 
                    container 
                    spacing={3} 
                    columns={{
                        xs: 1, 
                        sm: 2,
                        md: 4
                    }}
                >
                    {loading &&
                        <>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220} />
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220} />
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220} />
                            </Grid>
                            <Grid item xs={1}>
                                <Skeleton variant="rectangular" height={220} />
                            </Grid>
                        </>
                    }

                    {!loading && filteredOrders.map((item, index) => (
                        <Grid key={index} item xs={1}>
                            <OrderItem 
                                item={item}
                                onChangeStatus={handleChangeStatus}    
                                onPrint={handlePrintAction}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ display: "none", displayPrint: "block" }}>
                {printOrder && 
                    <>
                        <Typography sx={{mt:3, mb: 1}} component="h5" variant="h5">Pedido</Typography>
                        <Box>ID: #{printOrder.id}</Box>
                        <Box>Data do Pedido: {dateFormat(printOrder.orderDate)}</Box>
                        <Box sx={{mb: 2}}>Cliente: {printOrder.userName}</Box>
                        
                        <Divider />
                        
                        <Typography sx={{mt: 2, mb: 1}} component="h5" variant="h5">Pagamento</Typography>
                        <Box>Tipo de Pagamento: {printOrder.paymentType === "card" ? "Cartão" : "Dinheiro"}</Box>
                        <Box>Subtotal: R$ {printOrder.subtotal.toFixed(2)}</Box>
                        <Box>Entrega: R$ {printOrder.shippingPrice.toFixed(2)}</Box>
                        {printOrder.cupomDiscount && 
                            <Box>Desconto: -R$ {printOrder.cupomDiscount.toFixed(2)}</Box>
                        }
                        <Box sx={{mb: 1}}>Total: R$ {printOrder.total.toFixed(2)}</Box>

                        <Divider />
                        
                        <Typography sx={{mt: 2, mb: 1}} component="h5" variant="h5">Endereço</Typography>
                        <Box>Rua: {printOrder.shippingAddress.address} </Box>
                        <Box>Número: {printOrder.shippingAddress.number} </Box>
                        <Box>Complemento: {printOrder.shippingAddress.complement} </Box>
                        <Box>CEP: {printOrder.shippingAddress.cep} </Box>
                        <Box>Bairro: {printOrder.shippingAddress.neighborhood} </Box>
                        <Box>Cidade: {printOrder.shippingAddress.city} </Box>
                        <Box sx={{mb: 1}}>Estado: {printOrder.shippingAddress.state} </Box>

                        <Divider />
                        
                        <Typography sx={{mt: 2, mb: 1}} component="h5" variant="h5">Itens</Typography>
                        {printOrder.products.map((item, index) => (
                            <Box key={index}>
                                {item.qt} x {item.product.name}
                            </Box>
                        ))}
                    </>
                }
            </Box>
        </>
    )
}

export default Page;