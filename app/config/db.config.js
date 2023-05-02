module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "O@ZC2022db",
    DB: "estanfa3_db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };