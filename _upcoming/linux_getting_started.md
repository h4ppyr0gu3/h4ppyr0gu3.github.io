---
layout: single
title: Getting started with Linux
toc: true
---
## An Intro to Linux (and why you should use it)

microsoft has an increasingly large portion of the computer operating system market but that doesn't mean it is the best, in fact in terms of privacy linux is far more private and in recent years the barrier of entry into linux has become very low.

### Steps to install Linux

1. Choose a Distro (a version of Linux with a specific Desktop Environment and Package installer)
2. Download an ISO
3. Reboot your PC to BIOS
4. Boot into live environment to test the distro
5. Start the installer and follow instructions

to get started with linux all you need is a USB stick and an internet connection
the first thing to note about linux is that there are 2 major families, 
Namely: Arch and Debian 

upon which most distributions are based 

Arch can be considered a purist distribution for enthusiasts who would like to be on the bleeding edge and this comes at the cost of nearly daily updates 

whereas Debian is more stable with a 2 or 3 year release cycle 

however for begginners this information is almost irrelevant as you would not be interacting with the terminal and would probably not even be able to tell the difference

so the important factor for a new user would be the desktop environment which also comes with choices
the two most popular would be GNOME and KDE Plasma as well as Cinammon, which can be compared to MacOS and windows respectively

alright from these options we can start to get a full image of what distro you should try out

| Windows | MacOS |  
| --- | --- |  
| KDE | GNOME |  
| Cinammon | CuteFish |  

We could go on and on with variations and so the best begginner guide would be those with the most Users
and so i recommend:
- Debian with GNOME: Ubuntu
- Debian with KDE: Kubuntu

and that is the beginners guide to Linux

## We know what distro but what now 

well that is a good question 
first load up a USB stick with the ISO of the LTS (Long Term Support) Version through a disc writing tool like RUFUS as this is not a typical file copy (a detailed guide can be found here LINK me please)

The next step is to plug in the USB and reboot into the live demo (by entering the BIOS and selecting the USB as the boot device) of the product before you become a linux fanatic


### Useful linux commands

- cd
- cat
- grep
- | (pipe)
- tee
- awk
- wget
- find
- mkdir
- ls
- tail
- man
- head
- ln
- less
- rm 
- mv
- >/<
- top/htop
- cron
- rsync
- chmod
- chown
- usermod
- useradd
- wc

### Creating bootable media

### Creating a server 

Services
One systemd command (systemctl) 
Starting, stopping, restarting a service (using nfs as an example) on a currently running system:
$ sudo systemctl start|stop|restart nfs.service
Enabling or disabling a system service from starting up at system boot:
$ sudo systemctl enable|disable nfs.service

Linux Installation Software Choices
Like other operating systems, Linux distributions are provided on removable media such as USB drives and CDs or DVDs. Most Linux distributions also support booting a small image and downloading the rest of the system over the network. These small images are usable on media, or as network boot images, in which case it is possible to perform an install without using any local media.
Many installers can do an installation completely automatically, using a configuration file to specify installation options. This file is called a Kickstart file for Red Hat-based systems, an AutoYAST profile for SUSE-based systems, and a Preseed file for Debian-based systems.
Each distribution provides its own documentation and tools for creating and managing these files.
 
Virtual Terminals (VT) are console sessions that use the entire display and keyboard outside of a graphical environment. Such terminals are considered "virtual" because, although there can be multiple active terminals, only one terminal remains visible at a time. A VT is not quite the same as a command line terminal window; you can have many of those visible at once on a graphical desktop.
One virtual terminal (usually number one or seven) is reserved for the graphical environment, and text logins are enabled on the unused VTs. Ubuntu uses VT 7, but CentOS/RHEL and openSUSE use VT 1 for the graphical display.
An example of a situation where using VTs is helpful is when you run into problems with the graphical desktop. In this situation, you can switch to one of the text VTs and troubleshoot.
To switch between VTs, press CTRL-ALT-function key for the VT. For example, press CTRL-ALT-F6 for VT 6. Actually, you only have to press the ALT-F6 key combination if you are in a VT and want to switch to another VT.
 

$ ln file1 file2
Note that two files now appear to exist. However, a closer inspection of the file listing shows that this is not quite true.


Mounting and Unmounting
 

/bin Directory
 
Likewise, the /sbin directory is intended for essential binaries related to system administration, such as fsck and ip. To view a list of these programs, type: 
$ ls /bin /sbin
 

/sbin Directory
 
Commands that are not essential (theoretically) for the system to boot or operate in single-user mode are placed in the /usr/bin and /usr/sbin directories. Historically, this was done so /usr could be mounted as a separate filesystem that could be mounted at a later stage of system startup or even over a network. However, nowadays most find this distinction is obsolete. In fact, many distributions have been discovered to be unable to boot with this separation, as this modality had not been used or tested for a long time.
Thus, on some of the newest Linux distributions /usr/bin and /bin are actually just symbolically linked together, as are /usr/sbin and /sbin.
Certain filesystems, like the one mounted at /proc, are called pseudo-filesystems because they have no permanent presence anywhere on the disk.

Command
Usage
gzip
The most frequently used Linux compression utility
bzip2
Produces files significantly smaller than those produced by gzip
xz
The most space-efficient compression utility used in Linux
zip
Is often required to examine and decompress archives from other operating systems

Creating Files Without Using an Editor
nano is easy to use, and requires very little effort to learn. To open a file, type nano <filename> and press Enter. If the file does not exist, it will be created.

nano

gedit
Usually, the actual program installed on your system is vim, which stands for Vi IMproved, and is aliased to the name vi. The name is pronounced as “vee-eye”.

