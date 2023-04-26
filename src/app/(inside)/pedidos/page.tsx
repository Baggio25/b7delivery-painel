"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material"
import { Search, Refresh } from "@mui/icons-material";

import { Order } from "@/types/Order";
import { api } from "@/libs/api";
import { OrderItem } from "@/components/OrderItem";
import { OrderStatus } from "@/types/OrderStatus";

const Page = () => {
    const [searchInput, setSearchInput] =  useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

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

    return(
        <Box sx={{ my: 3 }}>
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
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Page;