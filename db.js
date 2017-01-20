import Sequelize from 'sequelize';
import Faker from 'faker';
import _ from 'lodash';

const Conn = new Sequelize(
    'testgraphql',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

const User = Conn.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            isNumeric: true
        }
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
});

Conn.sync({force: true}).then(() => {
    _.times(10, () => {
        return User.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        }).then(User => {
            console.log('success');
        });
    });
});

export default Conn;
