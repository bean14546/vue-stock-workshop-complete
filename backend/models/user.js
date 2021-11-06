// table
const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const user = sequelize.define(
    "user",{ // ชื่อ table
        username:{
            type:Sequelize.STRING,
            allowNull: false,
            primaryKey : true
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
            
        },
        level:{
            type: Sequelize.STRING,
            defaultValue: "normal"
        }
    },{} //optional = ทางเลือก ไม่ใส่ก็ได้
);

(async () => {
    await user.sync({ force: false}); 
})();

module.exports = user;