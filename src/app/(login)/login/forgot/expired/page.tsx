
"use client";

import { Alert, Link as Muilink } from "@mui/material";
import Link from "next/link";


const Page = () => {

    return (
        <>         
            <Alert variant="filled" severity="error" sx={{ mt: 3, mb: 3 }}>
                Este link expirou, refaça o procedimento.
            </Alert>

            <Muilink href="/login/forgot" component={Link} variant="button">Esqueci minha senha</Muilink>
        </>
    )
}

export default Page;