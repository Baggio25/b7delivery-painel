
"use client";

import { useState, FormEvent } from "react";
import { Typography, Box, TextField, Button, Alert, Link as Muilink } from "@mui/material";

import { api } from "@/libs/api";
import Link from "next/link";

const Page = () => {
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [isRedefined, setIsRedefined] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordField, setPasswordField] = useState("");
    const [passwordFieldConfirm, setPasswordFieldConfirm] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!passwordField || !passwordFieldConfirm) {
            setError("Preencha a senha.");
            return;
        }

        if(passwordField !== passwordFieldConfirm) {
            setError("As senhas não batem.");
            return;
        }

        setError("");   
        setInfo("");
        setLoading(true);
        setIsRedefined(false);

        const result = await api.redefinePassword(passwordField, "123");
        setLoading(false);
        
        if(result.error) {
            setError(result.error);
        } else {
            setInfo("Senha redefinida. realize o login!");
            setPasswordField("");
            setPasswordFieldConfirm("");
            setIsRedefined(true);
        }   
    }

    return (
        <>
            <Typography 
                component="p" 
                sx={{ 
                    textAlign: "center", 
                    mt: 2, 
                    color: "#555"
                }}>
                    Olá **USUÁRIO**, defina sua nova senha abaixo.
            </Typography>
            <Box 
                component="form"
                sx={{
                    mt: 3
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Digite nova senha" 
                    name="password"
                    type="password"
                    fullWidth
                    autoFocus
                    sx={{ mb: 2 }}
                    onChange={e => setPasswordField(e.target.value)}
                    value={passwordField}
                    disabled={loading}
                />
                
                <TextField
                    label="Confirme sua nova senha" 
                    name="passwordConfirm"
                    type="password"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={e => setPasswordFieldConfirm(e.target.value)}
                    value={passwordFieldConfirm}
                    disabled={loading}
                />
                
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? "Carregando..." : "Redefinir Senha"}
                </Button>

                {error && 
                    <Alert 
                        variant="filled" 
                        severity="error" 
                        sx={{ mt: 3 }}
                    >
                        {error}
                    </Alert>
                }
                {info && 
                    <Alert 
                        variant="filled" 
                        severity="success" 
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {info}
                    </Alert>
                }

            </Box>
            
            { isRedefined && 
                <Muilink href="/login" component={Link} variant="button">Realizar login</Muilink>
            }
        </>
    )
}

export default Page;