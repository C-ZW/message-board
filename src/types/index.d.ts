export { }

declare global {
    namespace Express {
        interface Request {
            //@ts-ignore
            user: {
                id: string;
                username: string;
                createTime: string
            }
        }
    }
}
