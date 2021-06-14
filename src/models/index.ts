import { sequelize } from './connection';
import { UserModel } from './user';
import { PostModel } from './post';
import { CommentModel } from './comment';

const Post = PostModel(sequelize);
const Comment = CommentModel(sequelize);
const User = UserModel(sequelize);

async function init() {
    User.hasMany(Post, {
        sourceKey: 'id',
        foreignKey: {
            name: 'creator',
            allowNull: false
        },
        constraints: true
    });

    User.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: {
            name: 'creator',
            allowNull: false
        },
        constraints: true
    })

    Post.belongsTo(User, {
        targetKey: 'id',
        foreignKey: {
            name: 'creator',
            allowNull: false
        }
    });

    Post.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: {
            name: 'post_id',
            allowNull: false
        }
    });

    Comment.belongsTo(Post, {
        targetKey: 'id',
        foreignKey: {
            name: 'post_id',
            allowNull: false
        }
    });

    Comment.belongsTo(User, {
        targetKey: 'id',
        foreignKey: {
            name: 'creator',
            allowNull: false
        }
    })

    await Promise.all([
        Post.sync({ force: true }),
        User.sync({ force: true }),
        Comment.sync({ force: true })
    ]);
}
init();

export {
    User,
    Post,
    Comment
}