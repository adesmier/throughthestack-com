---
layout: blogpost
id: 3
title: My Windows Subsystem for Linux Development Setup
category: devbytes
image: /assets/images/posts/devbytes/devbytes-wsl.jpg
thumbnail: /assets/images/posts/devbytes/devbytes-wsl-thumb.jpg
time: 5 min
heading: With the Windows Subsystem for Linux now becoming a full feature in Windows 10, you'll really be able to harness the power of having a full version of Linux running behind the scenes to provide compilation and tooling support for your development projects.
tags: [windows, wsl, build, tooling]
sections:
    What is the Windows Subsystem For Linux: |
        Most of you will already know this by now, but the [Windows Subsytem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10) is basically a full version of Linux that runs within Windows. As opposed to Cygwin, which provides a 'unix-like' environment, this is an actual version of Linux you have available to you. No more spinning up a VM in VirtualBox and SSHing to it and trying to share files between it and your host system. This is all taken care of with the WSL.<br /><br />

        >You can install various Linux distributions from the Windows Store. Make sure your build version of Windows is at least 16215. Run `winver` in the command prompt to check this. Microsoft are continuously adding new distributions, Kali Linux and Debian being the most recent additions.

    How I make use of the WSL: |
        One of the projects I'm working on requires the usual frontend tooling process of *ES6/SASS->Babel->Webpack* which is best run on Linux or MacOS. I'm a Windows guy and since it's so much easier to build frontend dev projects on Linux/Mac, I used to spin up a VM and have that do all the heavy lifting. It was then a lot of work trying to get the files to play nicely when shared out to my Windows host.<br /><br />

        Now with the WSL, all this extra configuration is removed so I have more time to concentrate on the code. Here's a run down of how the WSL really helps me in my development process:<br /><br />

        **Build your Code within a Linux Environment<br />**
        Before the WSL I was using a Ubuntu VM running in VirtualBox to build my codebase and sharing out the repository to my Windows host system in order to access those files in VS Code. This required a lot of setup to get up and running. Now with the WSL, you just have to click the Ubuntu icon and you're straight into a bash shell. This also takes up a lot less memory as I’d give my Ubuntu VM at least 2GB but the WSL bash shell should only use around 5MB (however you may find the overall memory consumption by Windows is higher due to the running of the WSL).<br /><br />

        **Access Windows Files and Folders**<br />
        With my old Ubuntu VM setup the best way I found to share files to my Windows host was to setup a Samba file server and then mount the network drive in Windows. VirtualBox shared folders [didn't play nicely with symlinks](https://github.com/npm/npm/issues/992) which caused problems for NPM, so Samba was the best alternative. Again, this was time spent on a lot of configuration setup.<br /><br />

        With the WSL it makes it incredibly easy to access your Windows files from within bash. No more trying to share out a folders, you can just cd to `/mnt` and you'll see your drive letters. This means you can clone a repo and install your NPM packages to a folder in Ubuntu like `/mnt/d/dev/repos/myproject` and this will be directly accessible from within Windows at `D:\dev\repos\myproject`.<br /><br />

        **Install Multiple Linux Distributions<br />**
        You now have the ability to download multiple distributions from the Windows Store. This is great if you need to test certain things in a separate Linux environment or need to specifically run commands in OpenSUSE for example. As of now there are 5 distros you can install: *Ubuntu, openSUSE, SUSE Server, Debian and Kali Linux*.<br /><br />

        >What to do with the beta WSL...? If you were using the beta version of the WSL, Microsoft have now provided a command line utility, `lxrun.exe`, that allows you to properly uninstall this beta version.

        <br />**Set your Default WSL Distribution**<br />
        Now that you can install multiple Linux distros, Microsoft have added a handy command line utility that allows you to set a default. Run `wslconfig /l` from your normal Windows prompt and this will list all the distributions you currently have installed (the beta Ubuntu bash will not be listed). You can then set the default distro to use by running `wslconfig /s openSUSE-42`. Now that openSUSE is set as the default I can just run `wsl` or `bash` and this will log me into my bash shell for openSUSE.<br /><br />

        **Open the WSL from within VS Code**<br />
        If you're a VS Code user, you have to ability to run an integrated terminal, which I find really useful. By default, this will use the Windows command prompt, but adding this to your settings file: `terminal.integrated.shell.windows": "C:\\WINDOWS\\Sysnative\\bash.exe"`, you can tell it to run your default WSL distribution.<br /><br />

        **Manage your Node Environments with NVM**<br />
        NVM (Node Version Manger) is a really good way of managing multiple Node environments. It works really well for Linux but I've always had issues with the Windows port - mainly issues with directory names being too long (however this may have been fixed in a newer version). One great thing about the WSL is that you can run the Linux version of NVM with no issues (that I know of) which makes it really easy to switch between versions if you need to. Checkout [NVM's Github page](https://github.com/creationix/nvm) for details on how to set it up.<br /><br />

        **Run Windows Commands from within WSL**<br />
        This, for me, is one of the best things about the WSL - you can actually run Windows files (so exe, msi, PowerShell scripts) from the bash prompt. This was super useful as I needed to build my code in Linux but use a PowerShell script to build the msi file for deploying on Windows. I could therefore have one NPM script that built my code and have another that called the PowerShell script that built the msi and run them sequentially. Super useful!<br /><br />

        **Enhance your Bash shell with WSL Mintty**<br />
        If you've used Cygwin then you've most likely come across Mintty. Cygwin, by default, will use the Windows shell which has a fair amount of limitations on customising it. By installing the Mintty shell it allows you to add several customisations that make your life so much easier. Now there's a version of Mintty for the WSL. Head to the [WSL Mintty Github page](https://github.com/mintty/wsltty) and install the latest version.<br /><br />

        This will give you the new Mintty shell for each distro you have, provide shortcut links to open them and include a matching distro icon! You now have access to all its customisations, like font colour/sizes, transparency etc. - just right click on the top menu of your bash shell and select Options.<br />

    There's still a Place for Cygwin (I think): |
        I actually still find Cygwin very useful - mainly for SSHing to actual Linux machines and running [tmux](https://en.wikipedia.org/wiki/Tmux). I've found the bash shell does not play very well with tmux when you have multiple panes open and when you change the size of the bash window the tmux panes don't get redrawn correctly. Cygwin (with Mintty) handles this really well and also 256 bit colour is supported, so if you have code highlighting in VI this will work nicely in Cygwin.
---
