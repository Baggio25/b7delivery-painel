
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
    }
}

