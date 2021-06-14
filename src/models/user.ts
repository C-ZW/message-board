import { DataTypes, Sequelize } from 'sequelize'
import { Model } from 'sequelize';

interface UserFields extends Model {
    id: string;
    username: string;
    password: string;
    create_time: string;
}

function UserModel(sequelize: Sequelize) {
    return sequelize.define<UserFields>('user', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                name: 'username',
                msg: 'username existed'
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}

export {
    UserModel,
    UserFields
}