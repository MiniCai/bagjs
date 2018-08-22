# bag-tool: A tool just for bag

这是一款针对某前端开发程序媛在写代码时遇到的痛点而设计的工具，功能简单，喜欢就拿去，不喜勿喷（**反正也不是为你而设计的**）。

## 功能

- **母版**：你可以把重复的代码（默认支持.html和.tpl，你可以在配置中修改，以便支持更多类型）写在母版文件中，然后在主文件里引用母版文件，支持全引用、部分引用以及代码注入；
- **less编译**：喜欢写less但又懒得自己搭less构建工具的你可以通过bag-tool来非常方便地编译less文件；
- 暂时没遇到其余前端痛点，如果你有想要的功能，可以[联系我](mailto:jaminqian@outlook.com)或提[Issues](https://github.com/MiniCai/bagjs/issues/new)，有空我就加一下。

## 安装

```shell
npm install -g bag-tool
```

## 使用

直接在你的项目目录里执行`bag-tool <command>`，支持以下`<command>`：

- `help` 获取帮助。
- `init` 初始化src目录以及配置文件。
- `clean` 清空dest目录。
- `build` 编译src目录并输出到dest目录。
- `start` 编译后自动打开默认浏览器并加载，然后监听src目录并实时刷新浏览器。

## 配置

默认配置可以参考[src/config.json](https://github.com/MiniCai/bagjs/blob/master/src/config.json)文件。

当然，如果你对这份默认配置感到很不爽，你可以针对你的项目去单独写配置文件，只要在你的项目里新增`bag-tool-config.json`文件然后编辑你的配置内容就可以了，或者执行`bag-tool init`自动创建`bag-tool-config.json`文件。注意配置编写必须符合JSON规范。

```shell
cd your-path
vi bag-tool-config.json

# or

cd your-path
bag-tool init
```

### 配置项

#### src

Type: `Array`

Default: `["src/"]`

项目源码路径，可写多个路径。

#### dest

Type: `String`

Default: `"dest/"`

项目输出路径，只可写一个路径。

#### template

Type: `String`

Default: `"template/"`

母版目录，所有母版文件都必须放在此处，不支持引用母版目录以外的文件，路径相对src。

#### tmplExtname

Type: `Array`

Default: `["*.html", "*.tpl"]`

支持的母版文件后缀。

#### styleExtname

Type: `Array`

Default: `["*.less"]`

支持的css预处理器后缀，其实目前也就只支持less，写成配置是有望日后去拓展它（至于最后拓不拓展要看我心情）。

#### startPath

Type: `String`

Default: `"index.html"`

本地服务开启后默认加载的路径。

#### encoding

Type: `String`

Default: `"utf8"`

字符集编码。

## 母版语法

### 引用母版文件

使用`<bag-include file="path/file.html"></bag-include>`来引用母版文件`path/file.html`，`file`属性相对母版目录。注意：母版文件必须在母版目录里。

```html
fdsfsdf
```

编译后

```html
fdsfsdf
```

### 引用母版文件的部分内容

在母版文件中使用`<%#partName%><%#/partName%>`将母版划分各个模块，`part`为各个模块的id，通过这个id可以指定该模块内容。

```html
fdsfsdf
```

使用`<bag-include file="path/file.html" part="partName"></bag-include>`来引用母版文件`path/file.html`的`partName`模块内容。

```html
fdsfsdf
```

编译后

```html
fdsfsdf
```

### 注入代码

在母版文件中使用`<%$slotName%><%$/slotName%>`来设置一个代码注入口，可在其中设置默认内容，当没有代码注入时就注入默认内容。

```html
fdsfsdf
```

使用`<bag-slot name="slotName"></bag-slot>`来注入代码，`<bag-slot>`必须写在`<bag-include>`里。

```html
fdsfsdf
```

编译后

```html
fdsfsdf
```