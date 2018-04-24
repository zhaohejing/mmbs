let CHAT = "connet_chat";
let MESSAGE = "connet_message";
let CHATOFUSER = "connet_chatofuser";
let USERMESSAGE = "connet_usermessage";
let Dept = "DeptInfo";
const server = {
  deal: async function(req, res) {
    if (!req.body || !req.body.module || !req.body.method) {
      res.status(403).send();
    }
    await this[req.body.method](req.body, res);
    // this.serverStart(req, res);
  },
  /**
   * 服务器启动
   *
   * @method serverStart
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["serverStart"]: async (req, res) => {
    res.status(200).send();
  },
  /**
   * 登陆
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["login"]: async (req, res) => {
    try {
      var query = new Mmbs.Query(Mmbs.User);
      var model = await Mmbs.User.logIn(
        req.params.account,
        req.params.password
      );
      //  query.equalTo("password", req.params.password);
      let result = new Response("chat", "login");
      if (model) {
        model.set("chatStatus", req.params.status);
        await model.save();
        result.data = model;
        res.status(200).send(result);
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 登出
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["logout"]: async (req, res) => {
    var _userRepository = new Mmbs.Query(Mmbs.User);
    var model = await _userRepository.get(req.userID);
    if (model) {
      model.set("chatStatus", "away");
      model.save();
    }
    let result = new Response("chat", "logout");
    result.data = model;
    res.status(200).send(result);
  },
  /**
   * 获取用户列表
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["userGetlist"]: async (req, res) => {
    var params = {
      userID, //用户的id号
      module: "chat",
      method: "userGetlist",
      params: [
        idList // 要获取的用户信息id编号数组，可选，如果留空则获取所有用户（1.3新增）
      ]
    };
    var _userRepository = new Mmbs.User();
    _userRepository.containedIn("id", req.params);
    var users = await _userRepository.find();

    var _roleRepository = new Mmbs.Role();
    var _deptRepository = new Mmbs.Object.extend(Dept);

    var depts = await _deptRepository.find();
    var roles = await _roleRepository.find();
    let result = {
      module: "chat",
      method: "userGetlist",
      result: "success",
      users: []
    };
    if (users) {
      result.data = users;
    }
    if (depts) {
      result.depts = depts;
    }
    if (roles) {
      result.roles = roles;
    }
    res.status(200).send(result);
  },
  /**
   * 获取回话列表
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["getList"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "getList"
    };

    var _chatRepository = new Mmbs.Object.extend(CHAT);
    _chatRepository.equalTo("users", req.userID);
    var chats = await _chatRepository.find();

    let result = {
      module: "chat",
      method: "getList",
      result: "success",
      users: []
    };
    if (chats) {
      result.data = users;
    }
    res.status(200).send(result);
  },
  /**
   * 获取离线消息列表
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["getOfflineMessages"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "getOfflineMessages"
    };

    var _userMessageRepository = new Mmbs.Object.extend(USERMESSAGE);
    _userMessageRepository.equalTo("user", req.userID);
    var chats = await _userMessageRepository.find();

    let result = {
      module: "chat",
      method: "message",
      result: "success",
      users: []
    };
    if (chats) {
      result.data = chats;
    }
    res.status(200).send(result);
  },
  /**
   * 更改当前登录用户的信息
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["userChange"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "userChange",
      params: [
        // 更改后的用户
        {
          id, // ID
          account, // 用户名
          realname, // 真实姓名
          avatar, // 头像URL
          role, // 角色
          dept, // 部门ID
          status, // 要设置的新状态,包括online, away, busy
          admin, // 是否超级管理员，super 超级管理员 | no 普通用户
          gender, // 性别，u 未知 | f 女 | m 男
          email, // 邮箱
          mobile, // 手机
          site, // 网站
          phone // 电话
        }
      ]
    };

    var _userRepository = new Mmbs.User();
    var model = await _userMessageRepository.get(req.userId);
    if (model) {
      for (const key in req.params) {
        if (object.hasOwnProperty(key)) {
          const value = object[key];
          model.set(key, value);
        }
      }
      model.save();
    }
    let result = {
      module: "chat",
      method: "userChange",
      result: "success",
      users: [],
      data: model
    };
    res.status(200).send(result);
  },
  /**
   * 更改当前登录用户的信息
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["create"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "create",
      params: [
        gid, // 会话的全局id,
        name, // 会话的名称
        type, // 会话的类型
        members, // 会话的成员列表
        subject, //可选,主题会话的关联主题ID,默认为0
        pulic //可选,是否公共会话,默认为false
      ]
    };

    var _chatRepository = new Mmbs.Object.extend(CHAT);
    _chatRepository.equalTo("gid", req.params.gid);
    var model = await _chatRepository.first();
    let result = {
      module: "chat",
      method: "create",
      result: "success",
      users: []
    };
    if (model) {
      result.data = model;
    } else {
      model = await _chatRepository.save(Object.assign({}, req.params));
      result.data = model;
    }
    res.status(200).send(result);
  },
  /**
   * 加入或退出聊天会话
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["joinchat"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "joinchat",
      params: [
        gid, // 会话的全局id,
        join
      ]
    };

    var _chatRepository = new Mmbs.Object.extend(CHAT);
    _chatRepository.equalTo("gid", req.params.gid);
    var model = await _chatRepository.first();
    if (model) {
      var _cRuRepository = new Mmbs.Object.extend(CHATOFUSER);
      if (req.params.join) {
        var temp = new _cRuRepository();
        temp.set("cgid", model);
        temp.set("user", req.userID);
        temp.set("join", new Date());
        temp.save();
      } else {
        _cRuRepository.equalTo("cgid", req.params.gid);
        _cRuRepository.equalTo("user", req.userID);
        var temp = await _cRuRepository.first();
        await temp.destroy();
      }
    }

    let result = {
      module: "chat",
      method: "userChange",
      result: "success",
      users: [],
      data: model
    };
    res.status(200).send(result);
  },
  /**
   * 更改会话名称
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["changeName"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "changeName",
      params: [
        gid, // 会话的全局id,
        name
      ]
    };

    var _chatRepository = new Mmbs.Object.extend(CHAT);
    _chatRepository.equalTo("gid", req.params.gid);
    var model = await _chatRepository.first();
    model.set("name", req.params.name);
    model.save();
    let result = {
      module: "chat",
      method: "userChange",
      result: "success",
      users: [],
      data: model
    };
    res.status(200).send(result);
  },
  /**
   *收藏或取消收藏会话
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["star"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "star",
      params: [
        gid, // 会话的全局id,
        star
      ]
    };

    var _cRuRepository = new Mmbs.Object.extend(CHATOFUSER);
    _cRuRepository.equalTo("cgid", req.params.gid);
    _cRuRepository.equalTo("user", req.userID);
    var model = await _cRuRepository.first();
    model.set("star", req.params.star);
    model.save();
    let result = {
      module: "chat",
      method: "star",
      result: "success",
      users: [],
      data: model
    };
    res.status(200).send(result);
  },
  /**
   *邀请新的用户到会话或者将用户踢出会话
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["addmember"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "addmember",
      params: [
        gid, // 要操作的会话id
        members, // 用户id数组
        join // 可选, true邀请用户加入会话, false将用户踢出会话, 默认为true
      ]
    };
    var chat = Mmbs.Object.extend(CHAT);
    chat.equalTo("gid", req.params.gid);
    var model = await chat.first();
    var _cRuRepository = new Mmbs.Object.extend(CHATOFUSER);

    if (model) {
      if (req.params.join) {
        var arr = req.params.members.map(c => {
          var t = new _cRuRepository();
          t.set("cgid", model);
          t.set("user", c);
          t.set("join", new Date());
        });
        await Mmbs.Object.saveAll(arr);
      } else {
        _cRuRepository.containedIn("user", req.params.members);
        var res = await _cRuRepository.find();
        await Mmbs.Object.destroyAll(res);
      }
    }
    var model = await chat.first();
    let result = {
      module: "chat",
      method: "star",
      result: "success",
      users: [],
      data: model
    };
    res.status(200).send(result);
  },
  /**
   *用户向一个或多个会话中发送一条或多条消息,服务器推送此消息给此会话中的所有在线成员；当前不在线的成员会在下次上线时通过离线消息送达
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["message"]: async (req, res) => {
    var params = {
      userID,
      module: "chat",
      method: "message",
      params: [
        // 一个包含一条或多条新消息的数组
        {
          gid, // 此消息的gid
          cgid, // 此消息关联的会话的gid
          user, // 如果为空,则为发送此请求的用户
          date, // 如果为空,则已服务器处理时间为准
          type, // 消息的类型
          contentType, // 消息内容的类型
          content // 消息内容
        }
        // 可以在一个请求中发送多个消息
      ]
    };
    var chat = Mmbs.Object.extend(CHAT);
    chat.equalTo("gid", req.params.gid);
    var model = await chat.first();
    var _cRuRepository = new Mmbs.Object.extend(CHATOFUSER);

    if (model) {
      if (req.params.join) {
        var arr = req.params.members.map(c => {
          var t = new _cRuRepository();
          t.set("cgid", model);
          t.set("user", c);
          t.set("join", new Date());
        });
        await Mmbs.Object.saveAll(arr);
      } else {
        _cRuRepository.containedIn("user", req.params.members);
        var res = await _cRuRepository.find();
        await Mmbs.Object.destroyAll(res);
      }
    }
    var model = await chat.first();
    let result = {
      module: "chat",
      method: "star",
      result: "success",
      users: [],
      data: model
    };
    res.status(200).send(result);
  },
  /**
   *获取会话的所有消息记录
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["history"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *获取会话的所有成员信息
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["members"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *隐藏或显示会话
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["hide"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *将会话设置为公共会话或者取消设置公共会话
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["changePublic"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *获取所有公共会话列表
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["getPublicList"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *设置会话管理员
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["setAdmin"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *设置会话允许发言的人
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["setCommitters"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *上传下载用户在客户端的配置信息
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["settings"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *为会话设置分组（1.3新增）
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["category"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *管理员请求解散一个讨论组（1.3新增）
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["dismiss"]: async (req, res) => {
    res.status(200).send({});
  },
  /**
   *上传文件
   *
   * @method login
   * @returns {status} A Mmbs.Promise. If successfull return either true/false depending on the user
   *                    is in role or not
   */
  ["uploadFile"]: async (req, res) => {
    res.status(200).send({});
  }
};
/**
 *消息响应类
 *
 * @class Response
 * @param {method:"方法",users:"对应用户",params:"参数",result:"结果状态",message:"报错信息",data:"数据集"}
 */
export default class Response {
  constructor(
    method,
    users = [],
    params = {},
    result = "success",
    message = "",
    data
  ) {
    this.module = "chat";
    this.method = method;
    this.users = users;
    this.params = params;
    this.result = result;
    this.message = message;
    this.data = data;
  }
}
module.exports = server;
