# PanSou 网盘搜索API

PanSou是一个高性能的网盘资源搜索API服务，支持TG搜索和自定义插件搜索。系统设计以性能和可扩展性为核心，支持并发搜索、结果智能排序和网盘类型分类。

**认证API接口：**

- `POST /api/auth/login` - 用户登录，获取Token
- `POST /api/auth/verify` - 验证Token有效性
- `POST /api/auth/logout` - 退出登录（客户端删除Token）

**使用Token调用API：**

```bash
# 1. 登录获取Token
curl -X POST http://localhost:8888/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 响应：{"token":"eyJhbGc...","expires_at":1234567890,"username":"admin"}

# 2. 使用Token调用搜索API
curl -X POST http://localhost:8888/api/search \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"kw":"速度与激情"}'
```

## API文档

### 认证说明

当启用认证功能（`AUTH_ENABLED=true`）时，除登录和健康检测接口外的所有API接口都需要提供有效的JWT Token。

**请求头格式**：
```
Authorization: Bearer <your-jwt-token>
```

**获取Token**：

1. 调用登录接口获取Token（详见下方[认证API](#认证API)）
2. 在后续所有API请求的Header中添加`Authorization: Bearer <token>`
3. Token过期后需要重新登录获取新Token

**示例**：
```bash
# 未启用认证时
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -d '{"kw":"速度与激情"}'

# 启用认证时
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{"kw":"速度与激情"}'
```

### 认证API

#### 用户登录

获取JWT Token用于后续API调用。

**接口地址**：`/api/auth/login`  
**请求方法**：`POST`  
**Content-Type**：`application/json`  
**是否需要认证**：否

**请求参数**：

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |

**请求示例**：
```bash
curl -X POST http://localhost:8888/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**成功响应**：
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": 1234567890,
  "username": "admin"
}
```

**错误响应**：
```json
{
  "error": "用户名或密码错误"
}
```

#### 验证Token

验证当前Token是否有效。

**接口地址**：`/api/auth/verify`  
**请求方法**：`POST`  
**是否需要认证**：是

**请求示例**：
```bash
curl -X POST http://localhost:8888/api/auth/verify \
  -H "Authorization: Bearer eyJhbGc..."
```

**成功响应**：
```json
{
  "valid": true,
  "username": "admin"
}
```

#### 退出登录

退出当前登录（客户端删除Token即可）。

**接口地址**：`/api/auth/logout`  
**请求方法**：`POST`  
**是否需要认证**：否

**请求示例**：
```bash
curl -X POST http://localhost:8888/api/auth/logout
```

**成功响应**：
```json
{
  "message": "退出成功"
}
```

### 搜索API

搜索网盘资源。

**接口地址**：`/api/search`  
**请求方法**：`POST` 或 `GET`  
**Content-Type**：`application/json`（POST方法）  
**是否需要认证**：取决于`AUTH_ENABLED`配置

**POST请求参数**：

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| kw | string | 是 | 搜索关键词 |
| channels | string[] | 否 | 搜索的频道列表，不提供则使用默认配置 |
| conc | number | 否 | 并发搜索数量，不提供则自动设置为频道数+插件数+10 |
| refresh | boolean | 否 | 强制刷新，不使用缓存，便于调试和获取最新数据 |
| res | string | 否 | 结果类型：all(返回所有结果)、results(仅返回results)、merge(仅返回merged_by_type)，默认为merge |
| src | string | 否 | 数据来源类型：all(默认，全部来源)、tg(仅Telegram)、plugin(仅插件) |
| plugins | string[] | 否 | 指定搜索的插件列表，不指定则搜索全部插件 |
| cloud_types | string[] | 否 | 指定返回的网盘类型列表，支持：baidu、aliyun、quark、tianyi、uc、mobile、115、pikpak、xunlei、123、magnet、ed2k，不指定则返回所有类型 |
| ext | object | 否 | 扩展参数，用于传递给插件的自定义参数，如{"title_en":"English Title", "is_all":true} |

**GET请求参数**：

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| kw | string | 是 | 搜索关键词 |
| channels | string | 否 | 搜索的频道列表，使用英文逗号分隔多个频道，不提供则使用默认配置 |
| conc | number | 否 | 并发搜索数量，不提供则自动设置为频道数+插件数+10 |
| refresh | boolean | 否 | 强制刷新，设置为"true"表示不使用缓存 |
| res | string | 否 | 结果类型：all(返回所有结果)、results(仅返回results)、merge(仅返回merged_by_type)，默认为merge |
| src | string | 否 | 数据来源类型：all(默认，全部来源)、tg(仅Telegram)、plugin(仅插件) |
| plugins | string | 否 | 指定搜索的插件列表，使用英文逗号分隔多个插件名，不指定则搜索全部插件 |
| cloud_types | string | 否 | 指定返回的网盘类型列表，使用英文逗号分隔多个类型，支持：baidu、aliyun、quark、tianyi、uc、mobile、115、pikpak、xunlei、123、magnet、ed2k，不指定则返回所有类型 |
| ext | string | 否 | JSON格式的扩展参数，用于传递给插件的自定义参数，如{"title_en":"English Title", "is_all":true} |

**POST请求示例**：

```bash
# 未启用认证
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "kw": "速度与激情",
    "channels": ["tgsearchers3", "xxx"],
    "conc": 2,
    "refresh": true,
    "res": "merge",
    "src": "all",
    "plugins": ["jikepan"],
    "cloud_types": ["baidu", "quark"],
    "ext": {
      "title_en": "Fast and Furious",
      "is_all": true
    }
  }'

# 启用认证时（需要添加Authorization头）
curl -X POST http://localhost:8888/api/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "kw": "速度与激情",
    "res": "merge"
  }'
```

**GET请求示例**：

```bash
# 未启用认证
curl "http://localhost:8888/api/search?kw=速度与激情&res=merge&src=tg"

# 启用认证时（需要添加Authorization头）
curl "http://localhost:8888/api/search?kw=速度与激情&res=merge" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**成功响应**：

```json
{
  "total": 15,
  "results": [
    {
      "message_id": "12345",
      "unique_id": "channel-12345",
      "channel": "tgsearchers3",
      "datetime": "2023-06-10T14:23:45Z",
      "title": "速度与激情全集1-10",
      "content": "速度与激情系列全集，1080P高清...",
      "links": [
        {
          "type": "baidu",
          "url": "https://pan.baidu.com/s/1abcdef",
          "password": "1234"
        }
      ],
      "tags": ["电影", "合集"],
      "images": [
        "https://cdn1.cdn-telegram.org/file/xxx.jpg"
      ]
    },
    // 更多结果...
  ],
  "merged_by_type": {
    "baidu": [
      {
        "url": "https://pan.baidu.com/s/1abcdef",
        "password": "1234",
        "note": "速度与激情全集1-10",
        "datetime": "2023-06-10T14:23:45Z",
        "source": "tg:频道名称",
        "images": [
          "https://cdn1.cdn-telegram.org/file/xxx.jpg"
        ]
      },
      // 更多百度网盘链接...
    ],
    "quark": [
      {
        "url": "https://pan.quark.cn/s/xxxx",
        "password": "",
        "note": "凡人修仙传",
        "datetime": "2023-06-10T15:30:22Z",
        "source": "plugin:插件名",
        "images": []
      }
    ],
    "aliyun": [
      // 阿里云盘链接...
    ]
    // 更多网盘类型...
  }
}
```

**字段说明**：

- `source`: 数据来源标识
  - `tg:频道名称`: 来自Telegram频道
  - `plugin:插件名`: 来自指定插件
  - `unknown`: 未知来源
- `images`: TG消息中的图片链接数组（可选字段）
  - 仅在来源为Telegram频道且消息包含图片时出现


**错误响应**：

```json
// 参数错误
{
  "code": 400,
  "message": "关键词不能为空"
}

// 未授权（启用认证但未提供Token）
{
  "error": "未授权：缺少认证令牌",
  "code": "AUTH_TOKEN_MISSING"
}

// Token无效或过期
{
  "error": "未授权：令牌无效或已过期",
  "code": "AUTH_TOKEN_INVALID"
}
```

### 健康检查

检查API服务是否正常运行。

**接口地址**：`/api/health`  
**请求方法**：`GET`  
**是否需要认证**：否（公开接口）

**请求示例**：
```bash
curl http://localhost:8888/api/health
```

**成功响应**：

```json
{
  "status": "ok",
  "auth_enabled": true,
  "plugins_enabled": true,
  "plugin_count": 16,
  "plugins": [
    "pansearch",
    "panta", 
    "qupansou",
    "hunhepan",
    "jikepan",
    "pan666",
    "panyq",
    "susu",
    "xuexizhinan",
    "hdr4k",
    "labi",
    "shandian",
    "duoduo",
    "muou",
    "wanou",
    "ouge",
    "zhizhen",
    "huban"
  ],
  "channels_count": 1,
  "channels": [
    "tgsearchers3"
  ]
}
```

**字段说明**：
- `status`: 服务状态，"ok"表示正常
- `auth_enabled`: 是否启用认证功能
- `plugins_enabled`: 是否启用插件
- `plugin_count`: 已启用的插件数量
- `plugins`: 已启用的插件列表
- `channels_count`: 配置的频道数量
- `channels`: 配置的频道列表
