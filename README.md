# miniprogram-date-slide

> 一个日期选择插件

![avatar](https://s2.ax1x.com/2020/01/07/lgSETO.png)

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
   | timeOut                 | Boolean  | 否   | 是否禁止以过期的时间,默认不禁止  |
   | title   | Array<{key:unique,text:String}> | 否   |  设置显示星期文本   |
   | label   | 'month'\|'range' | 否   |  显示当前日期,空字符串不显示   |

## 测试

* 执行测试用例：

```
npm run test
```
