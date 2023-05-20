"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Divider, Grid, InputAdornment, Skeleton, 
    Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";

import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { api } from "@/libs/api";
import { ProductTableSkeleton } from "@/components/ProductTableSkeleton";

const Page = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);

        setProducts(await api.getProducts());
        setCategories(await api.getCategories());

        setLoading(false);
    }

    const handleNewProduct = () => {

    }

    return(
        <>
            <Box sx={{ my: 3, displayPrint: "none" }}>
                <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
                    <Typography 
                        component="h5" 
                        variant="h5"
                        sx={{ color: "#555", mr: 2 }}
                    >
                        Produtos
                    </Typography>   
                    <Button
                        onClick={handleNewProduct}
                    >
                        Novo Produto
                    </Button>             
                </Box>              
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 50, display: { xs: 'none', md: 'table-cell'}}}>ID</TableCell>
                            <TableCell>IMAGEM</TableCell>
                            <TableCell>NOME</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell'} }}>PREÇO</TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell'} }}>CATEGORIA</TableCell>
                            <TableCell sx={{ sx: 50, md: 130 }} >AÇÕES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && 
                            <>
                                <ProductTableSkeleton />
                                <ProductTableSkeleton />
                                <ProductTableSkeleton />
                            </>
                        }
                    </TableBody>
                </Table>  
            </Box>
        </>
    )
}

export default Page;