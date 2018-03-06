const config = {}

// port for running server
config.port = 3080; //默认端口号
config.urlServerPath = '/mmbs'; //通过http://ip:port/urlServerPath去访问api
config.urlDashboardPath = '/index'; //通过http://ip:port/dashboard去访问控制面板
config.adminRoleName = 'administrator'; //管理员的角色名称

config.init = true; //初始化数据库

config.useMorgan = "tiny"; //HTTP request logger middleware ,设置为null表示不使用,选项有 combined short dev common
// configuring mmbsServer
config.mmbsServer = {
    databaseURI: 'mongodb://localhost:27017/test', //默认数据库是mongodb,mmbs是要建的数据库，用户可根据情况改动
    // databaseURI: 'mysql://root:******@103.45.102.47:3306/mmp', //采用mysql数据库，如密码有特殊字符需进行url encode转义
    serverURL: 'http://localhost:' + config.port + '/mmbs',
    appId: '1q2w3e4r5t6y7u8i9o0p',
    masterKey: '1q2w3e4r5t6y7u8i9o0p',
    allowAnonymousKey: 'q1w2e3r4t5y6u7i8o9p0',
    isForbidAnonymousUser: true, //默认情况下，禁止匿名用户访问SDK
    //云代码的路径
    cloud: '../cloud/main.js',
    //需要进行liveQuery的表
    liveQuery: {
        classNames: ['']
    },
    //初始化用户，如果数据库中没有用户表时，在启动应用后三秒，会自动创建下面用户
    initUser: {
        username: 'admin',
        password: '123456',
        role: config.adminRoleName
    }
}

config.dashboard = {
    "apps": [{
        "serverURL": config.mmbsServer.serverURL,
        "appId": config.mmbsServer.appId,
        "masterKey": config.mmbsServer.masterKey,
        "appName": "actions"
    }],
    "trustProxy": 1,
    //此用户是dashboard的登录用户，和上面的用户不一样
    "users": [{
        "user": "admin",
        "pass": "$2y$10$O2d3j.RPukU9rNtf/W41o.tSkikOblEX.c9YkcjlqHwQ8eYsRuLO6" //yt123456 https://bcrypt-generator.com
    }],
    "useEncryptedPasswords": true
}

module.exports = config