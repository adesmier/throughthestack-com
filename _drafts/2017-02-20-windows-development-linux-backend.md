---
layout: tutorials
title: Developing on Windows with a Linux backend
category: tutorials
image: assets/images/posts/tutorials/windows-linux-backend/header.jpg
thumbnail: assets/images/posts/tutorials/windows-linux-backend/thumbnail.jpg
time: 20 min
comments: true
heading: A lot of backend development environments are linux-based. But what if wanted to use Windows to do all your coding and design work? You can setup a linux-based virtual server, using something like VirtualBox, to handle all your builds and then use Windows to do all your coding. Let's see how we can set that up...
tags: [windows, ubuntu, linux, virtualbox, virtualisation]
sections:
    Intro: |
        This may not have a wide-spread use case, but my situation is that I like to have all my backend tooling run on Linux (mainly Ubuntu) and then use Windows to do all my code editing, and frontend design work.

        I'm definitely more of a Windows guy, but also love getting stuck into all things Linux based. Take Jekyll for example. That can run on L`inux just by running a simple ```gem install jekyll``` ruby command. But getting it run on Windows, while doable use this brilliant guide, does mean having to install a whole bunch of extra tools.

        You could also then run into issues of you Jekyll site not compiling on hosting sites like Netlify if you have built everything using Windows. It's also best to keep the development platform consistent.

        Here we're going to step through the process of creating a virtual Ubuntu Server running in VirtualBox using Windows as the host. The by enabling the Samba file server we can share out files to our Windows host and access then via Windows Explorer. We'll use a Jekyll site repository, clone it in our Linux vm, then access it in Atom in Windows. Let's go!


    Prerequisites: |
        You'll need to have at least a basic knowledge of VirtualBox and linux-based commands to follow along. Make sure VirtualBox is installed and you've downloaded the latest Ubuntu Server release - I'm using 16.04 in this tutorial

    Setting up our VM: |
        We'll be configuring our Ubuntu VM with 2 network adapters - one as a bridged adapter for access to your local network and internet, and one as a host-only adapter. This sets up a network between only your Windows host and the VM. I've find this to be useful for when you're not connected to a local network, you can still connect to your VM via the host-only adapter.

        **Step 1 - Configure DHCP in VirtualBox<br />**
        VirtualBox has it's own DHCP server built in. This means that when a host-only adapter is connected it'll issue out an IP address within the range you have specified. This can then be used to SSH or UNC to the box from Windows. Go to File -> Preferences -> Network in VirtualBox and select the Host-only networks tab. If you don't already have an ethernet apapter in the list, click the + sign to create one.

        Once created, highlight the adapter in the list and click on the configure icon. Here you can set the Ip address of the virtual adpater, you can think of it as a virtual router, and the subnet mask. We'll leave the defaults as 192.168.56.1 and 255.255.255.0. Then click on the DHCP tab and make sure this is enabled - this is important. Set the mask and lower and upper address bounds - you can leave the defaults. Without this enabled you VM won't be assigned an IP and you'll have to configure a static one on it before you can access it from Windows.

        Now you can create your Ubuntu VM -

        [slide show of steps to go here]


    Installing Samba: |
    Accessing via Windows: |

---
