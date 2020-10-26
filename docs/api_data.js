define({ "api": [
  {
    "type": "post",
    "url": "/register",
    "title": "用户注册接口",
    "name": "register",
    "group": "用户管理",
    "version": "0.1.0",
    "description": "<p>完成用户注册操作</p>",
    "permission": [
      {
        "name": "anyone"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "infos",
            "description": "<p>简介</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "success-3000": [
          {
            "group": "success-3000",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>响应状态码</p>"
          },
          {
            "group": "success-3000",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>响应描述</p>"
          },
          {
            "group": "success-3000",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>成功时返回数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功注册-示例：",
          "content": "{\n \"error_code\": 0,\n \"reason\": \"创建成功\",\n \"result\": {\n     \"data\": {\n         \"id\": \"5f96b4d8c75bcd50e4313a15\",\n         \"username\": \"www\"\n     }\n }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/api/registerController.js",
    "groupTitle": "用户管理",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/v1/register"
      }
    ]
  }
] });
