# miniprogram-date-slide

## 安装

```
npm install --save miniprogram-date-slide
```

   **date-slide 的属性介绍如下：**

   | 字段名                | 类型    | 必填 | 描述                                      |
   | --------------------- | ------- | ---- | ----------------------------------------- |
   | active                    | String  | 否   | 选择当前的日期,默认当天                 |
   | disabled                 | Boolean | 否   | 是否禁用选择,默认不禁止 |
   | filter                | Array<String>  | 否   | 禁止某些日期选择    |
   | outTime                 | Boolean  | 否   | 是否禁止以过期的时间,默认不禁止  |
   | title   | Array<{key:unique,text:String}> | 否   | 默认为false，同scroll-view同名字段        |

## 测试

* 执行测试用例：

```
npm run test
```
