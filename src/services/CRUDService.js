const bcrypt = require("bcryptjs");
const db = require("../models/index");

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};

const createNewUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const hashPasswordFromBcrypt = await hashUserPassword(data.password);
			await db.User.create({
				email: data.email,
				password: hashPasswordFromBcrypt,
				firstName: data.firstName,
				lastName: data.lastName,
				address: data.address,
				phoneNumber: data.phoneNumber,
				gender: data.gender === "1" ? true : false,
				roleId: data.roleId,
				positionId: data.positionId,
				image: data.image
			});
			resolve("Ok create a new user successful");
		} catch (e) {
			reject(e);
		}
	});
};

const getAllUser = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await db.User.findAll({
				raw: true
			});
			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

const getUserInfoById = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await db.User.findOne({
				where: { id: userId },
				raw: true
			});
			if (user) {
				resolve(user);
			} else {
				resolve([]);
			}
		} catch (e) {
			reject(e);
		}
	});
};

const updateUser = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await db.User.findOne({
				where: { id: data.id }
			});
			if (user) {
				user.firstName = data.firstName;
				user.lastName = data.lastName;
				user.address = data.address;
				await user.save();
				const allusers = await db.User.findAll();
				resolve(allusers);
			} else {
				resolve();
			}
		} catch (e) {
			reject(e);
		}
	});
};

const deleteUserById = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await db.User.findOne({
				where: { id: userId }
			});
			if (user) {
				await user.destroy();
			}
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createNewUser,
	getAllUser,
	getUserInfoById,
	updateUser,
	deleteUserById
};