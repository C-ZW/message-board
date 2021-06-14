import { Sequelize } from 'sequelize';
import { Config } from '../config';

const sequelize = new Sequelize('sqlite::memory', {
    host: Config.DB_HOST,
    username: Config.DB_USER,
    password: Config.DB_PASSWORD,
    define: {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: 'update_at'
    },
    logging: Config.ENV === 'development'
});

export {
    sequelize
}