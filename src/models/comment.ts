import { DataTypes, Sequelize } from 'sequelize';

function CommentModel(sequelize: Sequelize) {
    return sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        creator: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_id: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(1024),
            allowNull: false
        }
    });
}


export {
    CommentModel
}