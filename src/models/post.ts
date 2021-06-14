import { DataTypes, Sequelize } from 'sequelize'

function PostModel(sequelize: Sequelize) {
    return sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        creator: {
            type: DataTypes.UUID,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(1024),
            allowNull: false
        }
    });
}

export {
    PostModel
}