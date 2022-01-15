---
title: Mac-前端开发环境配置
date: '2022-01-15'
tags: ['mac', '开发环境']
draft: false
summary: Mac系统，前端开发环境
---

# Mac-前端开发环境配置

## 一、网络加速

1. [V2rayU](https://github.com/yanue/V2rayU)：支持 ss 和 v2ray，可以一键导入配置
2. [ShadowsocksX-NG](https://github.com/shadowsocks/ShadowsocksX-NG)：支持 ss
3. [Clash](https://github.com/Dreamacro/clash)：支持 SS、Vmess

## 二、开发工具

### 1. [homebrew](https://brew.sh/)：mac 包管理工具

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. [nvm](https://github.com/nvm-sh/nvm): node 版本管理工具

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

如果安装缓慢，可以使用淘宝镜像地址

```bash
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
```

### 3. [iTerm2](https://www.iterm2.com/): 终端

最新版下载地址：[点击](https://iterm2.com/downloads/stable/latest)

主题：https://draculatheme.com/iterm

### 4. [oh-my-zsh](https://ohmyz.sh/)：比原生 bash 更好用的 shell

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

```bash
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

### 5. [auto-jump](https://github.com/wting/autojump)：更方便的任意目录跳转

```bash
brew install autojump
```

![render1597931376276](../../../public/static/md-img/render1597931376276.gif)

### 6. [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)：命令行提示工具

注意：该插件会导致粘贴大量文本速度会比较慢，解决方法：参考https://github.com/zsh-users/zsh-autosuggestions/issues/238#issuecomment-389324292

```bash
# 需要配合zsh使用
# 克隆到zsh插件目录
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# 编辑.zshrc配置文件
vim ~/.zshrc
# plugins中添加zsh-autosuggestions，如果里面已有其他插件，以空格分开即可。
plugins=(zsh-autosuggestions)
# 重新打开终端即可生效，或者在当前终端执行
source ~/.zshrc
```

![img](../../../public/static/md-img/1597931689238-8bda5f76-f12d-443f-ad9e-9e0e6fc66dec.gif)

### 7. [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)：命令高亮插件

```bash
# 克隆到zsh插件目录
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# 配置插件（参考上一步流程）
plugins=( [plugins...] zsh-syntax-highlighting)
```

### 8. [tmux](https://github.com/tmux/tmux)：终端复用工具（终端神器）

使用说明配置参考： http://louiszhai.github.io/2017/09/30/tmux/

```bash
# 安装
brew install tmux
```

我的配置文件参考：

```yaml

 set -g prefix C-a #
# unbind C-b # C-b即Ctrl+b键，unbind意味着解除绑定
# bind C-a send-prefix # 绑定Ctrl+a为新的指令前缀

# 从tmux v1.6版起，支持设置第二个指令前缀
set-option -g prefix2 ` # 设置一个不常用的`键作为指令前缀，按键更快些
# 按下两次`，可以输入这个字符。
bind '`' send-keys '`'

unbind '"'
bind - splitw -v -c '#{pane_current_path}' # 垂直方向新增面板，默认进入当前目录
unbind %
bind | splitw -h -c '#{pane_current_path}' # 水平方向新增面板，默认进入当前目录

set-option -g mouse on # 等同于以上4个指令的效果

# 使用hjkl 切换面板
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# 设置起始索引
set -g base-index 1
setw -g pane-base-index 1

# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'

# Other examples:
# set -g @plugin 'github_username/plugin_name'
# set -g @plugin 'github_username/plugin_name#branch'
# set -g @plugin 'git@github.com:user/plugin'
# set -g @plugin 'git@bitbucket.com:user/plugin'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
set -g @plugin 'dracula/tmux'
run -b '~/.tmux/plugins/tpm/tpm'
```

### 9. [Raycast](https://www.raycast.com/): mac 效率工具（比 mac 原生聚焦更强大）

免费易用、支持开发插件

### 10. [Vscode](https://code.visualstudio.com/)：前端必备开发神器

下载地址：[点击](https://code.visualstudio.com/docs/?dv=osx)

### 11. [Shottr](https://shottr.cc/)：截图工具

免费且功能强大，具体用法参考官网 Demo 使用。

### 12. [SwitchHosts](https://swh.app/zh/): host 管理工具

目前已知最好用的 host 管理工具，支持加载远端 host 配置。
