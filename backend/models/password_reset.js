module.exports=(sequelize,DataTypes)=>{
    const password_reset = sequelize.define("password_reset",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role: {
            type: DataTypes.STRING,
        },
        token: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        }

    },
    {
        freezTableName: true,
        timestamps: false
    })

    return password_reset;
}