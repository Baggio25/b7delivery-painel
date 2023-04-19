
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
    }
}