### install

在指定文件夹下打开控制台，安装 **airbnb-babel-cli** 
	
	//输入
	npm install --save-dev babel-preset-airbnb
	👇
	//输出
	Folder: node_modules

在当前文件根目录下创建 `package.json` 文件，注意 `json` 代码规范，用于配置项目相关信息以及封装一些 `babel 命令`，其中 `scripts` 用于封装各种 `babel命名`。
例如，`"build": "babel origin -d src"` 通过 `npm run build` 可以将 *origin* 文件夹内的 *js* 文件通过 *airbnb* 规范进行转译并生成在 *src* 目录下

> **注意**，'dependencies' 的属性配置可以参考 `/node_modules/babel-cli/package.json`

	{
	  "name": "BabelTest",
	  "version": "1.0.0",
	  "scripts": {
	    "build": "babel origin -d src"
	  },
	  "dependencies": {
	    "babel-core": "^6.26.0",
	    "babel-polyfill": "^6.26.0"
	  }
	}

在当前目录下创建 `.babelrc` 文件，用于配置转码规则和使用插件

	{
	  "presets": ["airbnb"]
	}		