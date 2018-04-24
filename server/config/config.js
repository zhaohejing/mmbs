const config = {};

// port for running server
config.port = 3380; //默认端口号
config.urlServerPath = "/mmbs"; //通过http://ip:port/urlServerPath去访问api
config.urlDashboardPath = "/index"; //通过http://ip:port/dashboard去访问控制面板
config.adminRoleName = "administrator"; //管理员的角色名称

config.init = true; //初始化数据库

config.useMorgan = "tiny"; //HTTP request logger middleware ,设置为null表示不使用,选项有 combined short dev common
// configuring mmbsServer
config.mmbsServer = {
  // databaseURI: 'mongodb://localhost:27017/test', //默认数据库是mongodb,mmbs是要建的数据库，用户可根据情况改动
  databaseURI: "postgres://postgres:yt123456@192.168.0.233:5432/cjt", //采用mysql数据库，如密码有特殊字符需进行url encode转义
  serverURL: "http://localhost:" + config.port + "/mmbs",
  appId: "cjtAppId",
  masterKey: "cjtMasterKey",
  allowAnonymousKey: "cjtAllowAnonymousKey",
  isForbidAnonymousUser: true, //默认情况下，禁止匿名用户访问SDK
  //云代码的路径
  cloud: "../cloud/main.js",
  //需要进行liveQuery的表
  liveQuery: {
    classNames: [""]
  },
  //初始化用户，如果数据库中没有用户表时，在启动应用后三秒，会自动创建下面用户
  initUser: {
    username: "admin",
    password: "yt123456",
    role: config.adminRoleName
  }
};

config.dashboard = {
  apps: [
    {
      serverURL: config.mmbsServer.serverURL,
      appId: config.mmbsServer.appId,
      masterKey: config.mmbsServer.masterKey,
      appName: "曹家滩项目"
    }
  ],
  trustProxy: 1,
  //此用户是dashboard的登录用户，和上面的用户不一样
  users: [
    {
      user: "admin",
      pass: "$2y$10$O2d3j.RPukU9rNtf/W41o.tSkikOblEX.c9YkcjlqHwQ8eYsRuLO6" //yt123456 https://bcrypt-generator.com
    }
  ],
  useEncryptedPasswords: true
};

module.exports = config;
