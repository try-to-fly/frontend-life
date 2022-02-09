---
title: Git常用命令
date: 2022-01-16
tags: ['Linux', 'git', 'Mac', 'Command']
draft: false
summary: Git常用命令
---

# Git 常用命令

作为开发，熟练使用`git`已经是非常基本的要求的，以下是本人多年开发使用 git 积累下的常用命令，希望有所帮助。

### 安装软件：

1. [安装 Git](https://formulae.brew.sh/formula/git#default)

   ```bash
   brew install git
   ```

2. [安装 Zsh](https://ohmyz.sh/)：会默认开启[git 插件](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git/)

   ```bash
   sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

3. [安装 git-extra](https://github.com/tj/git-extras)：扩充了 git 命令。

   ```bash
   brew install git-extras
   ```

### 缩写：zsh 的 git 插件

1. `gf`：拉去最新远端代码，无任何副作用，随时执行。
2. `gp`: git push 推送代码
3. `gpsup`: 推送新分支代码，到远端
4. `gl`: git pull 拉去代码。 强力推荐使用 git pull --rebase 来拉去所有分支代码。
5. `gco`: git checkout
6. `gcm`: git checkout master
7. `gcp`: git cherry-pick 复制 commit
8. `gaa`: git add . 添加所有文件到暂存区
9. `gm`: git merge 合并分支
10. `gbda`：删除所有本地已合并的代码：批量删除已合并的分支时
11. `gst`：git status 查看 git 当前状态

### extras 扩充命令

1. `git delete-branch`: 删除本地和远端的指定分支
2. `git delete-tag`: 删除本地和远端的标签
3. `git undo`： git commit 的反向操作
4. `git lock`：提前锁定临时修改，单又不想被提交的文件。
5. `git summary`：查看当前仓库的概要信息，commit 提交统计等。
6. `git setup`：初始化仓库，并创建一个默认 commit。
7. `git rename-branch`：重命名分支。

### 技巧：

1. `gco -` : 切换到上分支
2. `gm -` : 合并到上个分支
3. `git remote prune origin`：删除所有远端已删除的分支，配合`gbda`更佳 。
4. `gwip`、`gunwip`：用于方便切换开发中的代码到其他分支，本质上是一个临时 commit。

### 参考资料：

1. [Git 的奇技淫巧](https://github.com/521xueweihan/git-tips)
2. [Pro Git book](https://git-scm.com/book/zh/v2)
3. [Git 飞行规则(Flight Rules)](https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md)
