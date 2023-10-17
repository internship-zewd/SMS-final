const { admin } = require("../models");
const { instructor } = require("../models");
const { manager } = require("../models");
const { accountant } = require("../models");
const bcrypt = require('bcrypt');

const sendProfile = async (req, res) => {
  const username = req.body.user;
  const role = req.body.role;
  try {
    let user = null;

    if (role === "Admin") {
      user = await admin.findOne({
        where: {
          username: username,

        },
      });
    }
    if (role === "Manager") {
      user = await manager.findOne({
        where: {
          username: username,
        },
      });
    }
    if (role === "Accountant") {
      user = await accountant.findOne({
        where: {
          username: username,
        },
      });
    }
    if (role === "Instructor") {
      user = await instructor.findOne({
        where: {
          username: username,
        },
      });
    }
    if (!user) {
      res.json({ success: false, msg: "User doesn't exist" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.json({ msg: "Error in selection", error });
    console.log(error, 500);
  }
};

const updateProfile = async (req, res) => {
  const body = req.body;
  const role = body.role;
  const user = body.user;

  try {
    const fullUser = user.full_identification.split(" ")[0];

    if (role === "Admin") {
      const userExists = await admin.findOne({
        where: {
          username: user.username,
        },
      });
      const emailExists = await admin.findOne({
        where: {
          username: user.email,
        },
      });

      if (!userExists && !emailExists) {
        await admin.update({
          full_name: user.name,
          username: user.username,
          email: user.email,
          full_identification: `${fullUser} ${user.full_name}`,
        });
      } else if(userExists && !emailExists) {
        res.json({ success: false, msg: "Username already taken" });
      }
      else if(!userExists && emailExists) {
        res.json({ success: false, msg: "email already taken" });
      }
    } else if (role === "Accountant") {
      const userExists = await accountant.findOne({
        where: {
          username: user.username,
        },
      });
      const emailExists = await accountant.findOne({
        where: {
          username: user.email,
        },
      });

      if (!userExists && !emailExists) {
        await accountant.update({
          full_name: user.name,
          username: user.username,
          email: user.email,
          full_identification: `${fullUser} ${user.full_name}`,
        });
      } else if(userExists && !emailExists) {
        res.json({ success: false, msg: "Username already taken" });
      }
      else if(!userExists && emailExists) {
        res.json({ success: false, msg: "email already taken" });
      }
    }
    if (role === "Instructor") {
      const userExists = await instructor.findOne({
        where: {
          username: user.username,
        },
      });

      const emailExists = await instructor.findOne({
        where: {
          username: user.email,
        },
      });

      if (!userExists && !emailExists) {
        await instructor.update({
          full_name: user.name,
          username: user.username,
          email: user.email,
          full_identification: `${fullUser} ${user.full_name}`,
        });
      } else if(userExists && !emailExists) {
        res.json({ success: false, msg: "Username already taken" });
      }
      else if(!userExists && emailExists) {
        res.json({ success: false, msg: "email already taken" });
      }
    }
    if (role === "Manager") {
      const userExists = await manager.findOne({
        where: {
          username: user.username,
        },
      });

      const emailExists = await manager.findOne({
        where: {
          username: user.email,
        },
      });

      if (!userExists && !emailExists) {
        await manager.update({
          full_name: user.name,
          username: user.username,
          email: user.email,
          full_identification: `${fullUser} ${user.full_name}`,
        });
      } else if(userExists && !emailExists) {
        res.json({ success: false, msg: "Username already taken" });
      }
      else if(!userExists && emailExists) {
        res.json({ success: false, msg: "email already taken" });
      }
    }
    res.json({ success: true });
  } catch (error) {
    res.json({ error: error });
  }
};

const changePassword = async (req, res) => {
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword
  const username = req.body.username
  const role = req.body.role

  try {
    let user = null;
    async function hashPassword(password) {
        try {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          console.log('Hashed password:', hashedPassword);
        } catch (error) {
          console.error(error);
        }
      }
    const hashedNewPassword = hashPassword(newPassword)
    async function comparePasswords(enteredPassword, hashedPasswordFromDB) {
        try {
          const result = await bcrypt.compare(enteredPassword, hashedPasswordFromDB);
          if (result) {
            console.log('Passwords match!');
            console.log('Passwords match!');
                await user.update({
                password: hashedNewPassword
            })
            res.json({msg: "Password changed"})
          } else {
            console.log('Passwords do not match!');
            res.json({success: false, msg: "Incorrect old password"})
          }
        } catch (error) {
          console.error(error);
        }
      }
      
      
      

        if(role === "Admin"){
            user = await admin.findOne({
                where:{
                    username: username,
                }
            });
        }
        if(role === "Manager"){
            user = await manager.findOne({
                where:{
                    username: username,
                }
            });
        }
        if(role === "Accountant"){
            user = await accountant.findOne({
                where:{
                    username: username,
                }
            });
        }
        if(role === "Instructor"){
            user = await instructor.findOne({
                where:{
                    username: username,
                }
            });
        }
        if(!user){
            res.json({success: false, msg: "User doesn't exist"});
        }
        
        else{
            comparePasswords(oldPassword, user.password);
        }
  } catch (error) {
    
  }
}

module.exports = {
    sendProfile,
    updateProfile,
    changePassword
}
