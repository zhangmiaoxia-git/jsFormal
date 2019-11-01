### git与github
+ git：版本控制工具
    + 上线之后网站挂了，使用git回滚项目，将项目回滚到之前的老版本，然后修改bug之后，等新版本网站确认没问题之后，再重新上线
    + 版本的时光穿梭
+ github：网站、远程代码管理仓库、贵圈基友平台（学习、交流）
#### git
+ 版本控制系统：集中式 vs 分布式
    + 集中式缺点：
        + 必须联网、比较慢、都是用一个中央服务器，有可能会造成数据丢失
    + 分布式优点：
        + 不需要联网就可以进行版本控制，速度快
+ 版本控制工具还有：cvs、svn，这两个是集中式管理，它需要一个中央服务器，里面放的是所有的代码，它们必须联网才可以使用
+ git工作流程（区域）分为：
    + 工作区（本地）
    + 暂存区（过渡区，保护工作区和历史区的）
    + 历史区（版本区）
#### 初始化版本控制状态
+ 找到要控制的文件目录，鼠标右键，找到git bash here，点击
+ 打开控制台，输入git init
+ 版本控制都是基于.git这个隐藏文件的，如果不下心把.git文件删除，那么就不能进行版本控制了
+ 查看git状态   git status
+ 通过Tab键补全文件
+ 通过ll（可以查看文件修改的具体信息）或ls（查看都有哪些文件，只有文件名）查看目录的文件
+ 通过git add 增加文件
+ 通过上下键去切换刚才输入的命令
#### 设置作者信息
+ cat ~/.gitconfig  查看配置信息
+ git config --global user.name '自己的名字'（这个名字最好用英文，最好不要用中文） 设置用户名  
+ git config --global user.email '自己的邮箱'（能够收到邮件的邮箱） 设置邮箱
+ git config --global credential.helper 'store' git push的时候记住用户名和密码
+ git config --global push.default 'simple' 从Git 2.0之后，push.default的默认值由'matching'改为'simple'  (matching[所有分支]  simple[当前分支])
+ 工作区到暂存区
    + git add 指定文件名
    + git add .  把当前目录下的所有文件都放到暂存区
+ 暂存区到版本区
    + git commit -m '添加注释'（可以直接识别的注释即可）
    + git commit -a -m '添加注释'   快速把工作区的代码放到版本区（已经被管理过得文件）
    > 注意：上面的这个命令，前提条件是文件已经提交过一次才可以使用，新增的文件是不可以直接使用这种方式直接把新文件放到版本区的，新增的文件还是需要先把文件放到暂存区，再放到版本区
#### 过滤指定文件
+ 创建一个.gitignore的文件
    + touch .gitignore（创建文件）
+ 配置过滤项
    + .gitignore文件中可以写
        + /create.html（单独的一个文件）
        + node_modules/（文件夹）
+ 如果配置不起作用，可以先把之前的操作清除一下，再过滤操作
    + 清除缓存的命令：git rm -r --cached .
+ 查看git文件版本
    + git log   查看提交文件的具体信息
    + git reflog  查看有多少个文件（如果版本操作的多使用这个）
+ 查看每个区域的不同点
    + 工作区与暂存区的区别：git diff
    + 工作区与版本区的区别：git diff master
    + 暂存区与版本区的区别：git diff --cached
+ 撤销回滚：git reset --hard 版本号id
### github
+ 其实有很多代码托管平台，github只是其中一个，其他代码托管平台有：码云、coding...
+ 把我们的代码放到远程仓库
    + 1、在github上创建一个项目
    + 2、绑定秘钥（生成秘钥的方式）
        + SSH-keygen -t rsa -C '邮箱名'（邮箱名是注册github的邮箱名）（绑定一次即可）
    + 3、确定版本库是最新的（没有东西可以提交了）
    + 4、查看远程仓库：
        + git remote -v  （使用git init的时候是查不出来东西的）
    + 5、添加远程仓库（本地与远程仓库关联）：
        + git remote add origin（这个名字是可以改变的） https://github.com/zhangmiaoxia-git/zhangmiaoxia.git（github上的项目地址）
    + 6、git pull origin master  保证能够成功上传，进行远程与本地相合并（下载下来冲突的文件，解决冲突之后，重新上传）
    + 7、git push origin master  上传（第一次会出现让输入用户名和密码）
#### 第二种方式
    + 1、先在远程仓库中创建一个项目
    + 2、git clone github上的项目地址（克隆）
    + 3、git add .
    + 4、git commit -m '注释'
    + 5、git push origin master
+ 获取github上仓库里的所有文件（包括项目文件夹）
    + 1、git clone github上的项目地址
    + 2、git pull
### node
+ npm 跟着node一起安装下来的模块
+ npm是目前世界上最大的资源管理平台
+ Yarn 最快的资源管理平台
    + npm install yarn -g
+ 创建项目
    + npm init -y  会生成一个package.json的文件，这个文件里面放的是所有的项目配置依赖
+ 如何下载资源    
    + npm install 资源名
        + -g  全局安装
        + -s  项目依赖
    + 下载下来的时候会自动生成一个node_modules的文件夹，文件夹中放的就是你需要的资源