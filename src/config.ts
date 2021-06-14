import Dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
Dotenv.config({ path: `../.env.${env}`, debug: true });

class Config {
    static DB_HOST: string = process.env.DB_HOST!;
    static DB_USER: string = process.env.DB_USER!;
    static DB_PASSWORD: string = process.env.DB_PASSWORD!;
    static PORT: number = parseInt(process.env.PORT!);
    static ENV: string = process.env.NODE_ENV!;
}

export {
    Config
}