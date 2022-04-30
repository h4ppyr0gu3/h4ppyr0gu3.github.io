---
layout: single
title: Raw Linux introduction
toc: true
---

# Useful linux commands
cd - | help | info | man 
The Linux boot process is the procedure for initializing the system. It consists of everything that happens from when the computer power is first switched on until the user interface is fully operational. 
Having a good understanding of the steps in the boot process may help you with troubleshooting problems, as well as with tailoring the computer's performance to your needs. 
On the other hand, the boot process can be rather technical, and you can start using Linux without knowing all the details. 
NOTE: You may want to come back and study this section later, if you want to first get a good feel for how to use a Linux system.

The Boot Process
Starting an x86-based Linux system involves a number of steps. When the computer is powered on, the Basic Input/Output System (BIOS) initializes the hardware, including the screen and keyboard, and tests the main memory. This process is also called POST (Power On Self Test).
The BIOS software is stored on a ROM chip on the motherboard. After this, the remainder of the boot process is controlled by the operating system (OS).

BIOS
Once the POST is completed, the system control passes from the BIOS to the boot loader. The boot loader is usually stored on one of the hard disks in the system, either in the boot sector (for traditional BIOS/MBR systems) or the EFI partition (for more recent (Unified) Extensible Firmware Interface or EFI/UEFI systems). Up to this stage, the machine does not access any mass storage media. Thereafter, information on date, time, and the most important peripherals are loaded from the CMOS values (after a technology used for the battery-powered memory store which allows the system to keep track of the date and time even when it is powered off).
A number of boot loaders exist for Linux; the most common ones are GRUB (for GRand Unified Boot loader), ISOLINUX (for booting from removable media), and DAS U-Boot (for booting on embedded devices/appliances). Most Linux boot loaders can present a user interface for choosing alternative options for booting Linux, and even other operating systems that might be installed. When booting Linux, the boot loader is responsible for loading the kernel image and the initial RAM disk or filesystem (which contains some critical files and device drivers needed to start the system) into memory.
 

Master Boot Record
The boot loader has two distinct stages:
For systems using the BIOS/MBR method, the boot loader resides at the first sector of the hard disk, also known as the Master Boot Record (MBR). The size of the MBR is just 512 bytes. In this stage, the boot loader examines the partition table and finds a bootable partition. Once it finds a bootable partition, it then searches for the second stage boot loader, for example GRUB, and loads it into RAM (Random Access Memory). For systems using the EFI/UEFI method, UEFI firmware reads its Boot Manager data to determine which UEFI application is to be launched and from where (i.e. from which disk and partition the EFI partition can be found). The firmware then launches the UEFI application, for example GRUB, as defined in the boot entry in the firmware's boot manager. This procedure is more complicated, but more versatile than the older MBR methods.
The second stage boot loader resides under /boot. A splash screen is displayed, which allows us to choose which operating system (OS) to boot. After choosing the OS, the boot loader loads the kernel of the selected operating system into RAM and passes control to it.  Kernels are almost always compressed, so its first job is to uncompress itself. After this, it will check and analyze the system hardware and initialize any hardware device drivers built into the kernel.

Boot Loader in Action
The initramfs filesystem image contains programs and binary files that perform all actions needed to mount the proper root filesystem, like providing kernel functionality for the needed filesystem and device drivers for mass storage controllers with a facility called udev (for user device), which is responsible for figuring out which devices are present, locating the device drivers they need to operate properly, and loading them. After the root filesystem has been found, it is checked for errors and mounted.
The mount program instructs the operating system that a filesystem is ready for use, and associates it with a particular point in the overall hierarchy of the filesystem (the mount point). If this is successful, the initramfs is cleared from RAM and the init program on the root filesystem (/sbin/init) is executed.
init handles the mounting and pivoting over to the final real root filesystem. If special hardware drivers are needed before the mass storage can be accessed, they must be in the initramfs image.
 

The Initial RAM Disk
Near the end of the boot process, init starts a number of text-mode login prompts. These enable you to type your username, followed by your password, and to eventually get a command shell. However, if you are running a system with a graphical login interface, you will not see these at first.
As you will learn in Chapter 7: Command Line Operations, the terminals which run the command shells can be accessed using the ALT key plus a function key. Most distributions start six text terminals and one graphics terminal starting with F1 or F2. Within a graphical environment, switching to a text console requires pressing CTRL-ALT + the appropriate function key (with F7 or F1 leading to the GUI).
Usually, the default command shell is bash (the GNU Bourne Again Shell), but there are a number of other advanced command shells available. The shell prints a text prompt, indicating it is ready to accept commands; after the user types the command and presses Enter, the command is executed, and another prompt is displayed after the command is done.

Text-Mode Logins
The boot loader loads both the kernel and an initial RAM–based file system (initramfs) into memory, so it can be used directly by the kernel.  
When the kernel is loaded in RAM, it immediately initializes and configures the computer’s memory and also configures all the hardware attached to the system. This includes all processors, I/O subsystems, storage devices, etc. The kernel also loads some necessary user space applications.

The Linux Kernel
Once the kernel has set up all its hardware and mounted the root filesystem, the kernel runs /sbin/init. This then becomes the initial process, which then starts other processes to get the system running. Most other processes on the system trace their origin ultimately to init; exceptions include the so-called kernel processes. These are started by the kernel directly, and their job is to manage internal operating system details.
Besides starting the system, init is responsible for keeping the system running and for shutting it down cleanly. One of its responsibilities is to act when necessary as a manager for all non-kernel processes; it cleans up after them upon completion, and restarts user login services as needed when users log in and out, and does the same for other background system services.
Traditionally, this process startup was done using conventions that date back to the 1980s and the System V variety of UNIX. This serial process has the system passing through a sequence of runlevels containing collections of scripts that start and stop services. Each runlevel supports a different mode of running the system. Within each runlevel, individual services can be set to run, or to be shut down if running.
However, all major recent distributions have moved away from this sequential runlevel method of system initialization, although they usually support the System V conventions for compatibility purposes. Next, we discuss the newer methods, systemd and Upstart.

/sbin/init and Services
SysVinit viewed things as a serial process, divided into a series of sequential stages. Each stage required completion before the next could proceed. Thus, startup did not easily take advantage of the parallel processing that could be done on multiple processors or cores.
Furthermore, shutdown and reboot was seen as a relatively rare event; exactly how long it took was not considered important. This is no longer true, especially with mobile devices and embedded Linux systems. Some modern methods, such as the use of containers, can require almost instantaneous startup times. Thus, systems now require methods with faster and enhanced capabilities. Finally, the older methods required rather complicated startup scripts, which were difficult to keep universal across distribution versions, kernel versions, architectures, and types of systems. The two main alternatives developed were:
Upstart
Developed by Ubuntu and first included in 2006
Adopted in Fedora 9 (in 2008) and in RHEL 6 and its clones.
systemd
Adopted by Fedora first (in 2011)
Adopted by RHEL 7 and SUSE 
Replaced Upstart in Ubuntu 16.04
While the migration to systemd was rather controversial, it has been adopted by the major distributions, and so we will not discuss the older System V method or Upstart, which has become a dead end. Regardless of how one feels about the controversies or the technical methods of systemd, almost universal adoption has made learning how to work on Linux systems simpler, as there are fewer differences among distributions. We enumerate systemd features next.
Systems with systemd start up faster than those with earlier init methods. This is largely because it replaces a serialized set of steps with aggressive parallelization techniques, which permits multiple services to be initiated simultaneously.
Complicated startup shell scripts are replaced with simpler configuration files, which enumerate what has to be done before a service is started, how to execute service startup, and what conditions the service should indicate have been accomplished when startup is finished. One thing to note is that /sbin/init now just points to /lib/systemd/systemd; i.e. systemd takes over the init process.
One systemd command (systemctl) is used for most basic tasks. While we have not yet talked about working at the command line, here is a brief listing of its use:
Starting, stopping, restarting a service (using nfs as an example) on a currently running system:
$ sudo systemctl start|stop|restart nfs.service
Enabling or disabling a system service from starting up at system boot:
$ sudo systemctl enable|disable nfs.service
In most cases, the .service can be omitted. There are many technical differences with older methods that lie beyond the scope of our discussion.  
 

Think of a refrigerator that has multiple shelves that can be used for storing various items. These shelves help you organize the grocery items by shape, size, type, etc. The same concept applies to a filesystem, which is the embodiment of a method of storing and organizing arbitrary collections of data in a human-usable form.
Different types of filesystems supported by Linux:
Conventional disk filesystems: ext2, ext3, ext4, XFS, Btrfs, JFS, NTFS, etc.
Flash storage filesystems: ubifs, JFFS2, YAFFS, etc.
Database filesystems
Special purpose filesystems: procfs, sysfs, tmpfs, squashfs, debugfs, etc.
This section will describe the standard filesystem layout shared by most Linux distributions.

A partition is a physically contiguous section of a disk, or what appears to be so in some advanced setups.
A filesystem is a method of storing/finding files on a hard disk (usually in a partition). 
One can think of a partition as a container in which a filesystem resides, although in some circumstances, a filesystem can span more than one partition if one uses symbolic links, which we will discuss much later.
A comparison between filesystems in Windows and Linux is given in the accompanying table:
 
 
Windows
Linux
Partition
Disk1
/dev/sda1
Filesystem Type
NTFS/VFAT
EXT3/EXT4/XFS/BTRFS...
Mounting Parameters
DriveLetter
MountPoint
Base Folder (where OS is stored)
C:\
/

Linux systems store their important files according to a standard layout called the Filesystem Hierarchy Standard (FHS), which has long been maintained by the Linux Foundation. For more information, take a look at the following document: "Filesystem Hierarchy Standard" created by LSB Workgroup. Having a standard is designed to ensure that users, administrators, and developers can move between distributions without having to re-learn how the system is organized.
Linux uses the ‘/’ character to separate paths (unlike Windows, which uses ‘\’), and does not have drive letters. Multiple drives and/or partitions are mounted as directories in the single filesystem. Removable media such as USB drives and CDs and DVDs will show up as mounted at /run/media/yourusername/disklabel for recent Linux systems, or under /media for older distributions. For example, if your username is student a USB pen drive labeled FEDORA might end up being found at /run/media/student/FEDORA, and a file README.txt on that disc would be at /run/media/student/FEDORA/README.txt.
Click the image to view an enlarged version.
 

The Filesystem Hierarchy Standard
All Linux filesystem names are case-sensitive, so /boot, /Boot, and /BOOT represent three different directories (or folders). Many distributions distinguish between core utilities needed for proper system operation and other programs, and place the latter in directories under /usr (think user). To get a sense for how the other programs are organized, find the /usr directory in the diagram from the previous page and compare the subdirectories with those that exist directly under the system root directory (/).
Click the image to view an enlarged version.
 

All installations include the bare minimum software for running a Linux distribution.
Most installers also provide options for adding categories of software. Common applications (such as the Firefox web browser and LibreOffice office suite), developer tools (like the vi and emacs text editors, which we will explore later in this course), and other popular services, (such as the Apache web server tools or MySQL database) are usually included. In addition, for any system with a graphical desktop, a chosen desktop (such as GNOME or KDE) is installed by default.
All installers set up some initial security features on the new system. One basic step consists of setting the password for the superuser (root) and setting up an initial user. In some cases (such as Ubuntu), only an initial user is set up; direct root login is not configured and root access requires logging in first as a normal user and then using sudo, as we will describe later. Some distributions will also install more advanced security frameworks, such as SELinux or AppArmor. For example, all Red Hat-based systems including Fedora and CentOS always use SELinux by default, and Ubuntu comes with AppArmor up and running.
 

Linux Installation Software Choices
Like other operating systems, Linux distributions are provided on removable media such as USB drives and CDs or DVDs. Most Linux distributions also support booting a small image and downloading the rest of the system over the network. These small images are usable on media, or as network boot images, in which case it is possible to perform an install without using any local media.
Many installers can do an installation completely automatically, using a configuration file to specify installation options. This file is called a Kickstart file for Red Hat-based systems, an AutoYAST profile for SUSE-based systems, and a Preseed file for Debian-based systems.
Each distribution provides its own documentation and tools for creating and managing these files.
 

You have completed Chapter 3. Let’s summarize the key concepts covered:
A partition is a logical part of the disk.
A filesystem is a method of storing/finding files on a hard disk.
By dividing the hard disk into partitions, data can be grouped and separated as needed. When a failure or mistake occurs, only the data in the affected partition will be damaged, while the data on the other partitions will likely survive.
The boot process has multiple steps, starting with BIOS, which triggers the boot loader to start up the Linux kernel. From there, the initramfs filesystem is invoked, which triggers the init program to complete the startup process.
Determining the appropriate distribution to deploy requires that you match your specific system needs to the capabilities of the different distributions.
 Email applications allow for sending, receiving, and reading messages over the Internet. Linux systems offer a wide number of email clients, both graphical and text-based. In addition, many users simply use their browsers to access their email accounts.
Most email clients use the Internet Message Access Protocol (IMAP) or the older Post Office Protocol (POP) to access emails stored on a remote mail server. Most email applications also display HTML (HyperText Markup Language) formatted emails that display objects, such as pictures and hyperlinks. The features of advanced email applications include the ability of importing address books/contact lists, configuration information, and emails from other email applications.
Linux supports the following types of email applications:
Graphical email clients, such as Thunderbird, Evolution, and Claws Mail
Text mode email clients, such as Mutt and mail
All web browser-based clients, such as Gmail, Yahoo Mail, and Office 365.
 

Email Applications
Graphic editors allow you to create, edit, view, and organize images of various formats, like Joint Photographic Experts Group (JPEG or JPG), Portable Network Graphics (PNG), Graphics Interchange Format (GIF), and Tagged Image File Format (TIFF).
The GNU Image Manipulation Program (GIMP) is a feature-rich image retouching and editing tool similar to Adobe Photoshop and is available on all Linux distributions. Some features of the GIMP are:
It can handle any image file format.
It has many special purpose plugins and filters.
It provides extensive information about the image, such as layers, channels, and histograms.
 

GIMP Editor
There are some basic command line utilities that are used constantly, and it would be impossible to proceed further without using some of them in simple form before we discuss them in more detail. A short list has to include:
cat: used to type out a file (or combine files)
head: used to show the first few lines of a file
tail: used to show the last few lines of a file
man: used to view documentation.
The screenshot shows elementary uses of these programs. Note the use of the pipe symbol (|) used to have one program take as input the output of another.
For the most part, we will only use these utilities in screenshots displaying various activities, before we discuss them in detail.
 

Basic Command Line Utilities
Virtual Terminals (VT) are console sessions that use the entire display and keyboard outside of a graphical environment. Such terminals are considered "virtual" because, although there can be multiple active terminals, only one terminal remains visible at a time. A VT is not quite the same as a command line terminal window; you can have many of those visible at once on a graphical desktop.
One virtual terminal (usually number one or seven) is reserved for the graphical environment, and text logins are enabled on the unused VTs. Ubuntu uses VT 7, but CentOS/RHEL and openSUSE use VT 1 for the graphical display.
An example of a situation where using VTs is helpful is when you run into problems with the graphical desktop. In this situation, you can switch to one of the text VTs and troubleshoot.
To switch between VTs, press CTRL-ALT-function key for the VT. For example, press CTRL-ALT-F6 for VT 6. Actually, you only have to press the ALT-F6 key combination if you are in a VT and want to switch to another VT.
 

Switching between Virtual Terminals
The ln utility is used to create hard links and (with the -s option) soft links, also known as symbolic links or symlinks. These two kinds of links are very useful in UNIX-based operating systems.
Suppose that file1 already exists. A hard link, called file2, is created with the command:
$ ln file1 file2
Note that two files now appear to exist. However, a closer inspection of the file listing shows that this is not quite true.
$ ls -li file1 file2
The -i option to ls prints out in the first column the inode number, which is a unique quantity for each file object. This field is the same for both of these files; what is really going on here is that it is only one, file but it has more than one name associated with it, as is indicated by the 2 that appears in the ls output. Thus, there was already another object linked to file1 before the command was executed.
Hard links are very useful and they save space, but you have to be careful with their use, sometimes in subtle ways. For one thing, if you remove either file1 or file2 in the example, the inode object (and the remaining file name) will remain, which might be undesirable, as it may lead to subtle errors later if you recreate a file of that name.
If you edit one of the files, exactly what happens depends on your editor; most editors, including vi and gedit, will retain the link by default, but it is possible that modifying one of the names may break the link and result in the creation of two objects.
 

Hard Links
Soft (or Symbolic) links are created with the -s option, as in:
$ ln -s file1 file3
$ ls -li file1 file3
Notice file3 no longer appears to be a regular file, and it clearly points to file1 and has a different inode number.
Symbolic links take no extra space on the filesystem (unless their names are very long). They are extremely convenient, as they can easily be modified to point to different places. An easy way to create a shortcut from your home directory to long pathnames is to create a symbolic link.
Unlike hard links, soft links can point to objects even on different filesystems, partitions, and/or disks and other media,  which may or may not be currently available or even exist. In the case where the link does not point to a currently available or existing object, you obtain a dangling link.
 

Soft (Symbolic) Links
The cd command remembers where you were last, and lets you get back there with cd -. For remembering more than just the last directory visited, use pushd to change the directory instead of cd; this pushes your starting directory onto a list. Using popd will then send you back to those directories, walking in reverse order (the most recent directory will be the first one retrieved with popd). The list of directories is displayed with the dirs command.
 

Navigating Through Directory History
You can use the following command line utilities to view files:
Command
Usage
cat
Used for viewing files that are not very long; it does not provide any scroll-back.
tac
Used to look at a file backwards, starting with the last line.
less
Used to view larger files because it is a paging program. It pauses at each screen full of text, provides scroll-back capabilities, and lets you search and navigate within the file. Note: Use / to search for a pattern in the forward direction and ? for a pattern in the backward direction. An older program named more is still used, but has fewer capabilities: "less is more".
tail
Used to print the last 10 lines of a file by default. You can change the number of lines by doing -n 15 or just -15 if you wanted to look at the last 15 lines instead of the default.
head
The opposite of tail; by default, it prints the first 10 lines of a file.


Note that mv does double duty, in that it can:
Simply rename a file
Move a file to another location, while possibly changing its name at the same time.
If you are not certain about removing files that match a pattern you supply, it is always good to run rm interactively (rm –i) to prompt before every removal.
 
Command
Usage
mv
Rename a file 
rm
Remove a file 
rm –f
Forcefully remove a file
rm –i
Interactively remove a file


When commands are executed, by default there are three standard file streams (or descriptors) always open for use: standard input (standard in or stdin), standard output (standard out or stdout) and standard error (or stderr).
 
Name
Symbolic Name
Value
Example
standard input
stdin
0
keyboard
standard output
stdout
1
terminal
standard error
stderr
2
log file

 
Usually, stdin is your keyboard, and stdout and stderr are printed on your terminal. stderr is often redirected to an error logging file, while stdin is supplied by directing input to come from a file or from the output of a previous command through a pipe. stdout is also often redirected into a file. Since stderr is where error messages are written, usually nothing will go there.
In Linux, all open files are represented internally by what are called file descriptors. Simply put, these are represented by numbers starting at zero. stdin is file descriptor 0, stdout is file descriptor 1, and stderr is file descriptor 2. Typically, if other files are opened in addition to these three, which are opened by default, they will start at file descriptor 3 and increase from there.
On the next page and in the chapters ahead, you will see examples which alter where a running command gets its input, where it writes its output, or where it prints diagnostic (error) messages. 
Through the command shell, we can redirect the three standard file streams so that we can get input from either a file or another command, instead of from our keyboard, and we can write output and errors to files or use them to provide input for subsequent commands.
For example, if we have a program called do_something that reads from stdin and writes to stdout and stderr, we can change its input source by using the less-than sign ( < ) followed by the name of the file to be consumed for input data:
$ do_something < input-file
If you want to send the output to a file, use the greater-than sign (>) as in:
 
$ do_something > output-file
Because stderr is not the same as stdout, error messages will still be seen on the terminal windows in the above example.
If you want to redirect stderr to a separate file, you use stderr’s file descriptor number (2), the greater-than sign (>), followed by the name of the file you want to hold everything the running command writes to stderr:
 
$ do_something 2> error-file
Note: By the same logic, do_something 1> output-file is the same as do_something > output-file.
A special shorthand notation can send anything written to file descriptor 2 (stderr) to the same place as file descriptor 1 (stdout): 2>&1.
$ do_something > all-output-file 2>&1
bash permits an easier syntax for the above:
$ do_something >& all-output-file
You can search for a filename containing specific characters using wildcards.
 
Wildcard
Result
? 
Matches any single character
*
Matches any string of characters
[set]
Matches any character in the set of characters, for example [adf] will match any occurrence of a, d, or f
[!set]
Matches any character not in the set of characters

 
To search for files using the ? wildcard, replace each unknown character with ?. For example, if you know only the first two letters are 'ba' of a three-letter filename with an extension of .out, type ls ba?.out .
To search for files using the * wildcard, replace the unknown string with *. For example, if you remember only that the extension was .out, type ls *.out.
find is an extremely useful and often-used utility program in the daily life of a Linux system administrator. It recurses down the filesystem tree from any particular directory (or set of directories) and locates files that match specified conditions. The default pathname is always the present working directory.
For example, administrators sometimes scan for potentially large core files (which contain diagnostic information after a program fails) that are more than several weeks old in order to remove them.
It is also common to remove files in inessential or outdated files in /tmp (and other volatile directories, such as those containing cached files) that have not been accessed recently. Many Linux distributions use shell scripts that run periodically (through cron usually) to perform such house cleaning.
 

find
When no arguments are given, find lists all files in the current directory and all of its subdirectories. Commonly used options to shorten the list include -name (only list files with a certain pattern in their name), -iname (also ignore the case of file names), and -type (which will restrict the results to files of a certain specified type, such as d for directory, l for symbolic link, or f for a regular file, etc.). 
Searching for files and directories named gcc:
 
$ find /usr -name gcc
Searching only for directories named gcc:
 
$ find /usr -type d -name gcc
Searching only for regular files named gcc:
 
$ find /usr -type f -name gcc
 

Using find
Another good use of find is being able to run commands on the files that match your search criteria. The -exec option is used for this purpose.
To find and remove all files that end with .swp: 
$ find -name "*.swp" -exec rm {} ’;’
The {} (squiggly brackets) is a placeholder that will be filled with all the file names that result from the find expression, and the preceding command will be run on each one individually.
Please note that you have to end the command with either ‘;’ (including the single-quotes) or "\;". Both forms are fine.
One can also use the -ok option, which behaves the same as -exec, except that find will prompt you for permission before executing the command. This makes it a good way to test your results before blindly executing any potentially dangerous commands.

Finding and Removing Files that End with .swp
It is sometimes the case that you wish to find files according to attributes, such as when they were created, last used, etc., or based on their size. It is easy to perform such searches.
To find files based on time:
 
$ find / -ctime 3
Here, -ctime is when the inode metadata (i.e. file ownership, permissions, etc.) last changed; it is often, but not necessarily, when the file was first created. You can also search for accessed/last read (-atime) or modified/last written (-mtime) times. The number is the number of days and can be expressed as either a number (n) that means exactly that value, +n, which means greater than that number, or -n, which means less than that number. There are similar options for times in minutes (as in -cmin, -amin, and -mmin).
To find files based on sizes:
$ find / -size 0
Note the size here is in 512-byte blocks, by default; you can also specify bytes (c), kilobytes (k), megabytes (M), gigabytes (G), etc. As with the time numbers above, file sizes can also be exact numbers (n), +n or -n. For details, consult the man page for find.
For example, to find files greater than 10 MB in size and running a command on those files:
 
$ find / -size +10M -exec command {} ’;’
 

Finding Files Based on Time and Size
It is sometimes the case that you wish to find files according to attributes, such as when they were created, last used, etc., or based on their size. It is easy to perform such searches.

To find files based on time:

$ find / -ctime 3

Here, -ctime is when the inode metadata (i.e. file ownership, permissions, etc.) last changed; it is often, but not necessarily, when the file was first created. You can also search for accessed/last read (-atime) or modified/last written (-mtime) times. The number is the number of days and can be expressed as either a number (n) that means exactly that value, +n, which means greater than that number, or -n, which means less than that number. There are similar options for times in minutes (as in -cmin, -amin, and -mmin).

To find files based on sizes:

$ find / -size 0

Note the size here is in 512-byte blocks, by default; you can also specify bytes (c), kilobytes (k), megabytes (M), gigabytes (G), etc. As with the time numbers above, file sizes can also be exact numbers (n), +n or -n. For details, consult the man page for find.

For example, to find files greater than 10 MB in size and running a command on those files:

$ find / -size +10M -exec command {} ’;’

 

￼

Finding Files Based on Time and Size

A terminal window (one kind of command shell) is a process that runs as long as needed. It allows users to execute programs and access resources in an interactive environment. You can also run programs in the background, which means they become detached from the shell.
Processes can be of different types according to the task being performed. Here are some different process types, along with their descriptions and examples:
 
Process Type
Description
Example
Interactive Processes
Need to be started by a user, either at a command line or through a graphical interface such as an icon or a menu selection.
bash, firefox, top
Batch Processes
Automatic processes which are scheduled from and then disconnected from the terminal. These tasks are queued and work on a FIFO (First-In, First-Out) basis.
updatedb, ldconfig
Daemons
Server processes that run continuously. Many are launched during system startup and then wait for a user or system request indicating that their service is required.
httpd, sshd, libvirtd
Threads
Lightweight processes. These are tasks that run under the umbrella of a main process, sharing memory and other resources, but are scheduled and run by the system on an individual basis. An individual thread can end without terminating the whole process and a process can create new threads at any time. Many non-trivial programs are multi-threaded.
firefox, gnome-terminal-server
Kernel Threads
Kernel tasks that users neither start nor terminate and have little control over. These may perform actions like moving a thread from one CPU to another, or making sure input/output operations to disk are completed.
kthreadd, migration, ksoftirqd



ID Type
Description
Process ID (PID)
Unique Process ID number
Parent Process ID (PPID)
Process (Parent) that started this process. If the parent dies, the PPID will refer to an adoptive parent; on recent kernels, this is kthreadd which has PPID=2.
Thread ID (TID)
Thread ID number. This is the same as the PID for single-threaded processes. For a multi-threaded process, each thread shares the same PID, but has a unique TID.


Besides reporting information, top can be utilized interactively for monitoring and controlling processes. While top is running in a terminal window, you can enter single-letter commands to change its behavior. For example, you can view the top-ranked processes based on CPU or memory usage. If needed, you can alter the priorities of running processes or you can stop/kill a process.
The table lists what happens when pressing various keys when running top:
 
Command
Output
t
Display or hide summary information (rows 2 and 3)
m
Display or hide memory information (rows 4 and 5)
A
Sort the process list by top resource consumers
r
Renice (change the priority of) a specific processes
k
Kill a specific process
f
Enter the top configuration screen
o
Interactively select a new sort order in the process list



Suppose you need to perform a task on a specific day sometime in the future. However, you know you will be away from the machine on that day. How will you perform the task? You can use the at utility program to execute any non-interactive command at a specified time, as illustrated in the diagram:
 

Scheduling Future Processes Using at

cron is a time-based scheduling utility program. It can launch routine background jobs at specific times and/or days on an on-going basis. cron is driven by a configuration file called /etc/crontab (cron table), which contains the various shell commands that need to be run at the properly scheduled times. There are both system-wide crontab files and individual user-based ones. Each line of a crontab file represents a job, and is composed of a so-called CRON expression, followed by a shell command to execute.
Typing crontab -e  will open the crontab editor to edit existing jobs or to create new jobs. Each line of the crontab file will contain 6 fields:
 
Field
Description
Values
MIN
Minutes
0 to 59
HOUR
Hour field
0 to 23
DOM
Day of Month
1-31
MON
Month field
1-12
DOW
Day Of Week
0-6 (0 = Sunday)
CMD
Command
Any command to be executed





Sometimes, a command or job must be delayed or suspended. Suppose, for example, an application has read and processed the contents of a data file and then needs to save a report on a backup system. If the backup system is currently busy or not available, the application can be made to sleep (wait) until it can complete its work. Such a delay might be to mount the backup device and prepare it for writing.
sleep suspends execution for at least the specified period of time, which can be given as the number of seconds (the default), minutes, hours, or days. After that time has passed (or an interrupting signal has been received), execution will resume.
The syntax is:
 
sleep NUMBER[SUFFIX]...
 
where SUFFIX may be:
s for seconds (the default)
m for minutes
h for hours
d for days.
sleep and at are quite different; sleep delays execution for a specific period, while at starts execution at a later time.
 The mount command is used to attach a filesystem (which can be local to the computer or on a network) somewhere within the filesystem tree. The basic arguments are the device node and mount point.  For example,
$ sudo mount /dev/sda5 /home
will attach the filesystem contained in the disk partition associated with the /dev/sda5 device node, into the filesystem tree at the /home mount point. There are other ways to specify the partition other than the device node, such as using the disk label or UUID.
To unmount the partition, the command would be:
$ sudo umount /home
Note the command is umount, not unmount! Only a root user (logged in as root, or using sudo) has the privilege to run these commands, unless the system has been otherwise configured.
If you want it to be automatically available every time the system starts up, you need to edit /etc/fstab accordingly (the name is short for filesystem table). Looking at this file will show you the configuration of all pre-configured filesystems. man fstab will display how this file is used and how to configure it.
Executing mount without any arguments will show all presently mounted filesystems.
The command df -Th (disk-free) will display information about mounted filesystems, including the filesystem type, and usage statistics about currently used and available space.
 

Mounting and Unmounting
 

sleep
We will now look in detail at how to use NFS on the server.
On the server machine, NFS uses daemons (built-in networking and service processes in Linux) and other system servers are started at the command line by typing:
$ sudo systemctl start nfs
The text file /etc/exports contains the directories and permissions that a host is willing to share with other systems over NFS. A very simple entry in this file may look like the following:
/projects *.example.com(rw)
This entry allows the directory /projects to be mounted using NFS with read and write (rw) permissions and shared with other hosts in the example.com domain. As we will detail in the next chapter, every file in Linux has three possible permissions: read (r), write (w) and execute (x).
After modifying the /etc/exports file, you can type exportfs -av to notify Linux about the directories you are allowing to be remotely mounted using NFS. You can also restart NFS with sudo systemctl restart nfs, but this is heavier, as it halts NFS for a short while before starting it up again. To make sure the NFS service starts whenever the system is booted, issue sudo systemctl enable nfs. (Note: On RHEL/CentOS 8, the service is called nfs-server, not nfs).
 

NFS on the Server

On the client machine, if it is desired to have the remote filesystem mounted automatically upon system boot, /etc/fstab is modified to accomplish this. For example, an entry in the client's /etc/fstab might look like the following:
servername:/projects /mnt/nfs/projects nfs defaults 0 0
You can also mount the remote filesystem without a reboot or as a one-time mount by directly using the mount command:
$ sudo mount servername:/projects /mnt/nfs/projects
Remember, if /etc/fstab is not modified, this remote mount will not be present the next time the system is restarted. Furthermore, you may want to use the nofail option in fstab in case the NFS server is not live at boot.
 

NFS on the Client
The /bin directory contains executable binaries, essential commands used to boot the system or in single-user mode, and essential commands required by all system users, such as cat, cp, ls, mv, ps, and rm.
Click the image to view an enlarged version.
 

/bin Directory
 
Likewise, the /sbin directory is intended for essential binaries related to system administration, such as fsck and ip. To view a list of these programs, type: 
$ ls /bin /sbin
 

/sbin Directory
 
Commands that are not essential (theoretically) for the system to boot or operate in single-user mode are placed in the /usr/bin and /usr/sbin directories. Historically, this was done so /usr could be mounted as a separate filesystem that could be mounted at a later stage of system startup or even over a network. However, nowadays most find this distinction is obsolete. In fact, many distributions have been discovered to be unable to boot with this separation, as this modality had not been used or tested for a long time.
Thus, on some of the newest Linux distributions /usr/bin and /bin are actually just symbolically linked together, as are /usr/sbin and /sbin.
Certain filesystems, like the one mounted at /proc, are called pseudo-filesystems because they have no permanent presence anywhere on the disk.
The /proc filesystem contains virtual files (files that exist only in memory) that permit viewing constantly changing kernel data. /proc contains files and directories that mimic kernel structures and configuration information. It does not contain real files, but runtime system information, e.g. system memory, devices mounted, hardware configuration, etc. Some important entries in /proc are:
/proc/cpuinfo
/proc/interrupts
/proc/meminfo
/proc/mounts
/proc/partitions
/proc/version
/proc has subdirectories as well, including:
/proc/<Process-ID-#>
/proc/sys
The first example shows there is a directory for every process running on the system, which contains vital information about it. The second example shows a virtual directory that contains a lot of information about the entire system, in particular its hardware and configuration. The /proc filesystem is very useful because the information it reports is gathered only as needed and never needs storage on the disk.
 

The /proc Filesystem
The /dev directory contains device nodes, a type of pseudo-file used by most hardware and software devices, except for network devices. This directory is:
Empty on the disk partition when it is not mounted
Contains entries which are created by the udev system, which creates and manages device nodes on Linux, creating them dynamically when devices are found. The /dev directory contains items such as:
/dev/sda1 (first partition on the first hard disk)
/dev/lp1 (second printer)
/dev/random (a source of random numbers).
 

The /dev Directory
The /var directory contains files that are expected to change in size and content as the system is running (var stands for variable), such as the entries in the following directories:
System log files: /var/log
Packages and database files: /var/lib
Print queues: /var/spool
Temporary files: /var/tmp.
The /var directory may be put on its own filesystem so that growth of the files can be accommodated and any exploding  file sizes do not fatally affect the system. Network services directories such as /var/ftp (the FTP service) and /var/www (the HTTP web service) are also found under /var.

The /var Directory

The /var Directory
The /etc directory is the home for system configuration files. It contains no binary programs, although there are some executable scripts. For example, /etc/resolv.conf tells the system where to go on the network to obtain host name to IP address mappings (DNS). Files like passwd, shadow and group for managing user accounts are found in the /etc directory. While some distributions have historically had their own extensive infrastructure under /etc (for example, Red Hat and SUSE have used /etc/sysconfig), with the advent of systemd there is much more uniformity among distributions today.
Note that /etc is for system-wide configuration files and only the superuser can modify files there. User-specific configuration files are always found under their home directory.
Click the image to view an enlarged version.
 

The /etc Directory
he /boot directory contains the few essential files needed to boot the system. For every alternative kernel installed on the system there are four files:
vmlinuz
The compressed Linux kernel, required for booting.
initramfs
The initial ram filesystem, required for booting, sometimes called initrd, not initramfs.
config
The kernel configuration file, only used for debugging and bookkeeping.
System.map
Kernel symbol table, only used for debugging.
Each of these files has a kernel version appended to its name.
The Grand Unified Bootloader (GRUB) files such as /boot/grub/grub.conf or /boot/grub2/grub2.cfg are also found under the /boot directory.
 

The /boot Directory
 
The screenshot shows an example listing of the /boot directory, taken from a RHEL 7 system that has multiple installed kernels, including both distribution-supplied and custom-compiled ones. Names will vary and things will tend to look somewhat different on a different distribution.
/lib contains libraries (common code shared by applications and needed for them to run) for the essential programs in /bin and /sbin. These library filenames either start with ld or lib. For example, /lib/libncurses.so.5.9.
Most of these are what is known as dynamically loaded libraries (also known as shared libraries or Shared Objects (SO)). On some Linux distributions there exists a /lib64 directory containing 64-bit libraries, while /lib contains 32-bit versions.
On recent Linux distributions, one finds:
 

The /lib and /lib64 Directories
 
i.e just like for /bin and /sbin, the directories just point to those under /usr.
Kernel modules (kernel code, often device drivers, that can be loaded and unloaded without re-starting the system) are located in /lib/modules/<kernel-version-number>.
One often uses removable media, such as USB drives, CDs and DVDs. To make the material accessible through the regular filesystem, it has to be mounted at a convenient location. Most Linux systems are configured so any removable media are automatically mounted when the system notices something has been plugged in.
While historically this was done under the /media directory, modern Linux distributions place these mount points under the /run directory. For example, a USB pen drive with a label myusbdrive for a user name student would be mounted at /run/media/student/myusbdrive.
 

 
The /mnt directory has been used since the early days of UNIX for temporarily mounting filesystems. These can be those on removable media, but more often might be network filesystems , which are not normally mounted. Or these can be temporary partitions, or so-called loopback filesystems, which are files which pretend to be partitions.
 

The /run Directory
There are some additional directories to be found under the root directory:
 
Directory Name
Usage
/opt
Optional application software packages
/sys
Virtual pseudo-filesystem giving information about the system and the hardware
Can be used to alter system parameters and for debugging purposes
/srv
Site-specific data served up by the system
Seldom used
/tmp
Temporary files; on some distributions erased across a reboot and/or may actually be a ramdisk in memory
/usr
Multi-user applications, utilities and data

The /usr directory tree contains theoretically non-essential programs and scripts (in the sense that they should not be needed to initially boot the system) and has at least the following sub-directories:
 
Directory Name
Usage
/usr/include
Header files used to compile applications
/usr/lib
Libraries for programs in /usr/bin and /usr/sbin
/usr/lib64
64-bit libraries for 64-bit programs in /usr/bin and /usr/sbin
/usr/sbin
Non-essential system binaries, such as system daemons
/usr/share
Shared data used by applications, generally architecture-independent
/usr/src
Source code, usually for the Linux kernel
/usr/local
Data and programs specific to the local machine. Subdirectories include bin, sbin, lib, share, include, etc.
/usr/bin
This is the primary directory of executable commands on the system

Now that you know about the filesystem and its structure, let’s learn how to manage files and directories.
diff is used to compare files and directories. This often-used utility program has many useful options (see: man diff) including:
 
diff Option
Usage
-c
Provides a listing of differences that include three lines of context before and after the lines differing in content
-r
Used to recursively compare subdirectories, as well as the current directory
-i
Ignore the case of letters
-w
Ignore differences in spaces and tabs (white space)
-q
Be quiet: only report if files are different without listing the differences

 
To compare two files, at the command prompt, type diff [options] <filename1> <filename2>. diff is meant to be used for text files; for binary files, one can use cmp. 
In this section, you will learn additional methods for comparing files and how to apply patches to files.
You can compare three files at once using diff3, which uses one file as the reference basis for the other two. For example, suppose you and a co-worker both have made modifications to the same file working at the same time independently. diff3 can show the differences based on the common file you both started with. The syntax for diff3 is as follows:
$ diff3 MY-FILE COMMON-FILE YOUR-FILE
The graphic shows the use of diff3.
 

Using diff3
 
Many modifications to source code and configuration files are distributed utilizing patches, which are applied, not surprisingly, with the patch program. A patch file contains the deltas (changes) required to update an older version of a file to the new one. The patch files are actually produced by running diff with the correct options, as in:
$ diff -Nur originalfile newfile > patchfile
Distributing just the patch is more concise and efficient than distributing the entire file. For example, if only one line needs to change in a file that contains 1000 lines, the patch file will be just a few lines long.
 

Using patch
 
To apply a patch, you can just do either of the two methods below:
$ patch -p1 < patchfile
$ patch originalfile patchfile
The first usage is more common, as it is often used to apply changes to an entire directory tree, rather than just one file, as in the second example. To understand the use of the -p1 option and many others, see the man page for patch.
rsync is a very powerful utility. For example, a very useful way to back up a project directory might be to use the following command:
$ rsync -r project-X archive-machine:archives/project-X
Note that rsync can be very destructive! Accidental misuse can do a lot of harm to data and programs, by inadvertently copying changes to where they are not wanted. Take care to specify the correct options and paths. It is highly recommended that you first test your rsync command using the -dry-run option to ensure that it provides the results that you want.
To use rsync at the command prompt, type rsync sourcefile destinationfile, where either file can be on the local machine or on a networked machine; The contents of sourcefile will be copied to destinationfile.
A good combination of options is shown in:
$ rsync --progress -avrxH  --delete sourcedir destdir

File data is often compressed to save disk space and reduce the time it takes to transmit files over networks.
Linux uses a number of methods to perform this compression, including:
 
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

 
These techniques vary in the efficiency of the compression (how much space is saved) and in how long they take to compress; generally, the more efficient techniques take longer. Decompression time does not vary as much across different methods.
In addition, the tar utility is often used to group files in an archive and then compress the whole archive at once.
Sometimes, you may want to create a short file and don't want to bother invoking a full text editor. In addition, doing so can be quite useful when used from within scripts, even when creating longer files. You will no doubt find yourself using this method when you start on the later chapters that cover shell scripting!
If you want to create a file without using an editor, there are two standard ways to create one from the command line and fill it with content.
The first is to use echo repeatedly:
 
$ echo line one > myfile
$ echo line two >> myfile
$ echo line three >> myfile
Note that while a single greater-than sign (>) will send the output of a command to a file, two of them (>>) will append the new output to an existing file.
The second way is to use cat combined with redirection:
$ cat << EOF > myfile
> line one
> line two
> line three
> EOF
$
Both techniques produce a file with the following lines in it:
 
line one
line two
line three
and are extremely useful when employed by scripts.
 

Creating Files Without Using an Editor
nano is easy to use, and requires very little effort to learn. To open a file, type nano <filename> and press Enter. If the file does not exist, it will be created.
nano provides a two line shortcut bar at the bottom of the screen that lists the available commands. Some of these commands are:
CTRL-G
Display the help screen.
CTRL-O 
Write to a file.
CTRL-X
Exit a file.
CTRL-R
Insert contents from another file to the current buffer.
CTRL-C
Cancels previous commands.
 

nano
gedit (pronounced 'g-edit') is a simple-to-use graphical editor that can only be run within a Graphical Desktop environment. It is visually quite similar to the Notepad text editor in Windows, but is actually far more capable and very configurable and has a wealth of plugins available to extend its capabilities further.
To open a new file find the program in your desktop's menu system, or from the command line type gedit <filename>. If the file does not exist, it will be created.
Using gedit is pretty straightforward and does not require much training. Its interface is composed of quite familiar elements.
 

gedit
Usually, the actual program installed on your system is vim, which stands for Vi IMproved, and is aliased to the name vi. The name is pronounced as “vee-eye”.
Even if you do not want to use vi, it is good to gain some familiarity with it: it is a standard tool installed on virtually all Linux distributions. Indeed, there may be times where there is no other editor available on the system.
GNOME extends vi with a very graphical interface known as gvim and KDE offers kvim. Either of these may be easier to use at first. 
When using vi, all commands are entered through the keyboard. You do not need to keep moving your hands to use a pointer device such as a mouse or touchpad, unless you want to do so when using one of the graphical versions of the editor.
 

Introduction to vi
The table describes the most important keystrokes used when changing cursor position in vi. Line mode commands (those following colon : ) require the ENTER key to be pressed after the command is typed.
 
Key
Usage
arrow keys
To move up, down, left and right
j or <ret>
To move one line down
k
To move one line up
h or Backspace
To move one character left
l or Space
To move one character right
0
To move to beginning of line
$
To move to end of line
w
To move to beginning of next word
:0 or 1G
To move to beginning of file
:n or nG
To move to line n
:$ or G
To move to last line in file
CTRL-F or Page Down
To move forward one page
CTRL-B or Page Up
To move backward one page
^l
To refresh and center screen

Distributions have straightforward graphical interfaces for creating and removing users and groups and manipulating group membership. However, it is often useful to do it from the command line or from within shell scripts. Only the root user can add and remove users and groups.
Adding a new user is done with useradd and removing an existing user is done with userdel. In the simplest form, an account for the new user bjmoose would be done with:
$ sudo useradd bjmoose
Note that for openSUSE, useradd is not in the normal user's PATH, so the command should be:
$ sudo /usr/sbin/useradd bjmoose
which, by default, sets the home directory to /home/bjmoose, populates it with some basic files (copied from /etc/skel) and adds a line to /etc/passwd such as:
bjmoose:x:1002:1002::/home/bjmoose:/bin/bash
and sets the default shell to /bin/bash. Removing a user account is as easy as typing userdel bjmoose. However, this will leave the /home/bjmoose directory intact. This might be useful if it is a temporary inactivation. To remove the home directory while removing the account one needs to use the -r option to userdel.
Typing id with no argument gives information about the current user, as in:
$ id
uid=1002(bjmoose) gid=1002(bjmoose) groups=106(fuse),1002(bjmoose)
If given the name of another user as an argument, id will report information about that other user.
 

Adding and Removing Users
Adding a new group is done with groupadd:
$ sudo /usr/sbin/groupadd anewgroup
The group can be removed with:
$ sudo /usr/sbin/groupdel anewgroup
Adding a user to an already existing group is done with usermod. For example, you would first look at what groups the user already belongs to:
$ groups rjsquirrel
bjmoose : rjsquirrel
and then add the new group:
$ sudo /usr/sbin/usermod -a -G anewgroup rjsquirrel
$ groups rjsquirrel
rjsquirrel: rjsquirrel anewgroup
These utilities update /etc/group as necessary. Make sure to use the -a option, for append, so as to avoid removing already existing groups. groupmod can be used to change group properties, such as the Group ID (gid) with the -g option or its name with then -n option.
Removing a user from the group is somewhat trickier. The -G option to usermod must give a complete list of groups. Thus, if you do:
$ sudo /usr/sbin/usermod -G rjsquirrel rjsquirrel
$ groups rjsquirrel
rjsquirrel : rjsquirrel
only the rjsquirrel group will be left.
 

Adding and Removing Groups
The root account is very powerful and has full access to the system. Other operating systems often call this the administrator account; in Linux, it is often called the superuser account. You must be extremely cautious before granting full root access to a user; it is rarely, if ever, justified. External attacks often consist of tricks used to elevate to the root account.
However, you can use sudo to assign more limited privileges to user accounts:
Only on a temporary basis
Only for a specific subset of commands.
Prompt Statement (PS) is used to customize your prompt string in your terminal windows to display the information you want. 
PS1 is the primary prompt variable which controls what your command line prompt looks like. The following special characters can be included in PS1:
\u - User name
\h - Host name
\w - Current working directory
\! - History number of this command
\d - Date
They must be surrounded in single quotes when they are used, as in the following example:
 
$ echo $PS1
$
$ export PS1='\u@\h:\w$ '
student@example.com:~$ # new prompt
To revert the changes:
 
student@example.com:~$ export PS1='$ '
$
An even better practice would be to save the old prompt first and then restore, as in:
 
$ OLD_PS1=$PS1
change the prompt, and eventually change it back with:
 
$ PS1=$OLD_PS1
$
 

The PS1 Variable and the Command Line Prompt
You can use keyboard shortcuts to perform different tasks quickly. The table lists some of these keyboard shortcuts and their uses. Note the case of the "hotkey" does not matter, e.g. doing CTRL-a is the same as doing CTRL-A .
 
Keyboard Shortcut
Task
CTRL-L
Clears the screen
CTRL-D
Exits the current shell
CTRL-Z
Puts the current process into suspended background
CTRL-C
Kills the current process
CTRL-H
Works the same as backspace
CTRL-A
Goes to the beginning of the line
CTRL-W
Deletes the word before the cursor
CTRL-U
Deletes from beginning of line to cursor position
CTRL-E
Goes to the end of the line
Tab
Auto-completes files, directories, and binaries

In Linux and other UNIX-based operating systems, every file is associated with a user who is the owner. Every file is also associated with a group (a subset of all users) which has an interest in the file and certain rights, or permissions: read, write, and execute.
The following utility programs involve user and group ownership and permission setting: 
 
Command
Usage
chown
Used to change user ownership of a file or directory
chgrp
Used to change group ownership
chmod
Used to change the permissions on the file, which can be done separately for owner, group and the rest of the world (often named as other)

Files have three kinds of permissions: read (r), write (w), execute (x). These are generally represented as in rwx. These permissions affect three groups of owners: user/owner (u), group (g), and others (o).
As a result, you have the following three groups of three permissions:
rwx: rwx: rwx
 u:   g:   o
There are a number of different ways to use chmod. For instance, to give the owner and others execute permission and remove the group write permission:
$ ls -l somefile
-rw-rw-r-- 1 student student 1601 Mar 9 15:04 somefile
$ chmod uo+x,g-w somefile
$ ls -l somefile
-rwxr--r-x 1 student student 1601 Mar 9 15:04 somefile
where u stands for user (owner), o stands for other (world), and g stands for group.
This kind of syntax can be difficult to type and remember, so one often uses a shorthand which lets you set all the permissions in one step. This is done with a simple algorithm, and a single digit suffices to specify all three permission bits for each entity. This digit is the sum of:
4 if read permission is desired
2 if write permission is desired
1 if execute permission is desired.
Thus, 7 means read/write/execute, 6 means read/write, and 5 means read/execute.
When you apply this to the chmod command, you have to give three digits for each degree of freedom, such as in:
$ chmod 755 somefile
$ ls -l somefile
-rwxr-xr-x 1 student student 1601 Mar 9 15:04 somefile
 

File Permission Modes and chmod
Let's see an example of changing file ownership using chown, as shown in the screenshot to the right. First, we create two empty files using touch.
Notice it requires sudo to change the owner of file2 to root. The second chown command changes both owner and group at the same time!
Finally, only the superuser can remove the files. 
 

CHOWN

Now, let’s see an example of changing the group ownership using chgrp:
 

chgrp
cat is short for concatenate and is one of the most frequently used Linux command line utilities. It is often used to read and print files, as well as for simply viewing file contents. To view a file, use the following command: 
$ cat <filename>
For example, cat readme.txt will display the contents of readme.txt on the terminal. However, the main purpose of cat is often to combine (concatenate) multiple files together. You can perform the actions listed in the table using cat.
The tac command (cat spelled backwards) prints the lines of a file in reverse order. Each line remains the same, but the order of lines is inverted. The syntax of tac is exactly the same as for cat, as in:
$ tac file
$ tac file1 file2 > newfile
 
Command
Usage
cat file1 file2
Concatenate multiple files and display the output; i.e. the entire content of the first file is followed by that of the second file
cat file1 file2 > newfile
Combine multiple files and save the output into a new file
cat file >> existingfile
Append a file to the end of an existing file
cat > file
Any subsequent lines typed will go into the file, until CTRL-D is typed
cat >> file
Any subsequent lines are appended to the file, until CTRL-D is typed

cat can be used to read from standard input (such as the terminal window) if no files are specified. You can use the > operator to create and add lines into a new file, and the >> operator to append lines (or files) to an existing file. We mentioned this when talking about how to create files without an editor.
To create a new file, at the command prompt type cat > <filename> and press the Enter key.
This command creates a new file and waits for the user to edit/enter the text. After you finish typing the required text, press CTRL-D at the beginning of the next line to save and exit the editing.
Another way to create a file at the terminal is cat > <filename> << EOF. A new file is created and you can type the required input. To exit, enter EOF at the beginning of a line.
Note that EOF is case sensitive. One can also use another word, such as STOP.
 

Using cat
echo simply displays (echoes) text. It is used simply, as in:
$ echo string
echo can be used to display a string on standard output (i.e. the terminal) or to place in a new file (using the > operator) or append to an already existing file (using the >> operator).
The –e option, along with the following switches, is used to enable special character sequences, such as the newline character or horizontal tab.
\n  represents newline
\t  represents horizontal tab.
echo is particularly useful for viewing the values of environment variables (built-in shell variables). For example, echo $USERNAME will print the name of the user who has logged into the current terminal.
The following table lists echo commands and their usage:
 
Command
Usage
echo string > newfile
The specified string is placed in a new file
echo string >> existingfile
The specified string is appended to the end of an already existing file
echo $variable
The contents of the specified environment variable are displayed

System administrators need to work with configuration files, text files, documentation files, and log files. Some of these files may be large or become quite large as they accumulate data with time. These files will require both viewing and administrative updating. In this section, you will learn how to manage such large files.
For example, a banking system might maintain one simple large log file to record details of all of one day's ATM transactions. Due to a security attack or a malfunction, the administrator might be forced to check for some data by navigating within the file. In such cases, directly opening the file in an editor will cause issues, due to high memory utilization, as an editor will usually try to read the whole file into memory first. However, one can use less to view the contents of such a large file, scrolling up and down page by page, without the system having to place the entire file in memory before starting. This is much faster than using a text editor.
Viewing somefile can be done by typing either of the two following commands:
$ less somefile
$ cat somefile | less
By default, man pages are sent through the less command. You may have encountered the older more utility which has the same basic function but fewer capabilities: i.e. less is more!
head reads the first few lines of each named file (10 by default) and displays it on standard output. You can give a different number of lines in an option.
For example, if you want to print the first 5 lines from grub.cfg, use the following command:
$ head –n 5 grub.cfg
You can also just say head -5 grub.cfg.
 

head
tail prints the last few lines of each named file and displays it on standard output. By default, it displays the last 10 lines. You can give a different number of lines as an option. tail is especially useful when you are troubleshooting any issue using log files, as you probably want to see the most recent lines of output.
For example, to display the last 15 lines of somefile.log, use the following command:
$ tail -n 15 somefile.log
*You can also just say tail -15 somefile.log.
To continually monitor new output in a growing log file:
$ tail -f somefile.log 
This command will continuously display any new lines of output in atmtrans.log as soon as they appear. Thus, it enables you to monitor any current activity that is being reported and recorded.
 

tail
When working with compressed files, many standard commands cannot be used directly. For many commonly-used file and text manipulation programs, there is also a version especially designed to work directly with compressed files. These associated utilities have the letter "z" prefixed to their name. For example, we have utility programs such as zcat, zless, zdiff and zgrep.
Here is a table listing some z family commands:
 
Command
Description
$ zcat compressed-file.txt.gz
To view a compressed file
$ zless somefile.gz
or
$ zmore somefile.gz
To page through a compressed file
$ zgrep -i less somefile.gz
To search inside a compressed file
$ zdiff file1.txt.gz file2.txt.gz
To compare two compressed files

 
Note that if you run zless on an uncompressed file, it will still work and ignore the decompression stage. There are also equivalent utility programs for other compression methods besides gzip, for example, we have bzcat and bzless associated with bzip2, and xzcat and xzless associated with xz.
sed is a powerful text processing tool and is one of the oldest, earliest and most popular UNIX utilities. It is used to modify the contents of a file or input stream, usually placing the contents into a new file or output stream. Its name is an abbreviation for stream editor.
sed can filter text, as well as perform substitutions in data streams.
Data from an input source/file (or stream) is taken and moved to a working space. The entire list of operations/modifications is applied over the data in the working space and the final contents are moved to the standard output space (or stream).

sed
You can invoke sed using commands like those listed in the accompanying table.
 
Command
Usage
sed -e command <filename>
Specify editing commands at the command line, operate on file and put the output on standard out (e.g. the terminal)
sed -f scriptfile <filename>
Specify a scriptfile containing sed commands, operate on file and put output on standard out

 
The -e option allows you to specify multiple editing commands simultaneously at the command line. It is unnecessary if you only have one operation invoked.
 

sed Command Syntax
Now that you know that you can perform multiple editing and filtering operations with sed, let’s explain some of them in more detail. The table explains some basic operations, where pattern is the current string and replace_string is the new string:
 
Command
Usage
sed s/pattern/replace_string/ file
Substitute first string occurrence in every line
sed s/pattern/replace_string/g file
Substitute all string occurrences in every line
sed 1,3s/pattern/replace_string/g file
Substitute all string occurrences in a range of lines
sed -i s/pattern/replace_string/g file
Save changes for string substitution in the same file

 
You must use the -i option with care, because the action is not reversible. It is always safer to use sed without the –i option and then replace the file yourself, as shown in the following example:
$ sed s/pattern/replace_string/g file1 > file2
The above command will replace all occurrences of pattern with replace_string in file1 and move the contents to file2. The contents of file2 can be viewed with cat file2. If you approve you can then overwrite the original file with mv file2 file1.
Example: To convert 01/02/… to JAN/FEB/…
 
sed -e 's/01/JAN/' -e 's/02/FEB/' -e 's/03/MAR/' -e 's/04/APR/' -e 's/05/MAY/' \
    -e 's/06/JUN/' -e 's/07/JUL/' -e 's/08/AUG/' -e 's/09/SEP/' -e 's/10/OCT/' \
    -e 's/11/NOV/' -e 's/12/DEC/'
awk is used to extract and then print specific contents of a file and is often used to construct reports. It was created at Bell Labs in the 1970s and derived its name from the last names of its authors: Alfred Aho, Peter Weinberger, and Brian Kernighan.
awk has the following features:
It is a powerful utility and interpreted programming language.
It is used to manipulate data files, retrieving, and processing text.
It works well with fields (containing a single piece of data, essentially a column) and records (a collection of fields, essentially a line in a file).
awk is invoked as shown in the following:
 

awk
 
As with sed, short awk commands can be specified directly at the command line, but a more complex script can be saved in a file that you can specify using the -f option.
 
Command
Usage
awk ‘command’  file
Specify a command directly at the command line
awk -f scriptfile file
Specify a file that contains the script to be executed

The table explains the basic tasks that can be performed using awk. The input file is read one line at a time, and, for each line, awk matches the given pattern in the given order and performs the requested action. The -F option allows you to specify a particular field separator character. For example, the /etc/passwd file uses ":" to separate the fields, so the -F: option is used with the /etc/passwd file.
The command/action in awk needs to be surrounded with apostrophes (or single-quote (')). awk can be used as follows:
 
Command
Usage
awk '{ print $0 }' /etc/passwd
Print entire file
awk -F: '{ print $1 }' /etc/passwd
Print first field (column) of every line, separated by a space
awk -F: '{ print $1 $7 }' /etc/passwd
Print first and seventh field of every line

sort is used to rearrange the lines of a text file, in either ascending or descending order according to a sort key. You can also sort with respect to particular fields (columns) in a file. The default sort key is the order of the ASCII characters (i.e. essentially alphabetically).
sort can be used as follows:
 
Syntax
Usage
sort <filename>
Sort the lines in the specified file, according to the characters at the beginning of each line
cat file1 file2 | sort
Combine the two files, then sort the lines and display the output on the terminal
sort -r <filename>
Sort the lines in reverse order
sort -k 3 <filename>
Sort the lines by the 3rd field on each line instead of the beginning

 
When used with the -u option, sort checks for unique values after sorting the records (lines). It is equivalent to running uniq (which we shall discuss) on the output of sort.
 

sort
uniq removes duplicate consecutive lines in a text file and is useful for simplifying the text display.
Because uniq requires that the duplicate entries must be consecutive, one often runs sort first and then pipes the output into uniq; if sort is used with the -u option, it can do all this in one step.
To remove duplicate entries from multiple files at once, use the following command:

sort file1 file2 | uniq > file3
or
sort -u file1 file2 > file3
To count the number of duplicate entries, use the following command:
 
uniq -c filename
 
 
uniq
Suppose you have a file that contains the full name of all employees and another file that lists their phone numbers and Employee IDs. You want to create a new file that contains all the data listed in three columns: name, employee ID, and phone number. How can you do this effectively without investing too much time?
paste can be used to create a single file containing all three columns. The different columns are identified based on delimiters (spacing used to separate two fields). For example, delimiters can be a blank space, a tab, or an Enter. In the image provided, a single space is used as the delimiter in all files.
paste accepts the following options:
-d delimiters, which specify a list of delimiters to be used instead of tabs for separating consecutive values on a single line. Each delimiter is used in turn; when the list has been exhausted, paste begins again at the first delimiter.
-s, which causes paste to append the data in series rather than in parallel; that is, in a horizontal rather than vertical fashion.
 

paste
paste can be used to combine fields (such as name or phone number) from different files, as well as combine lines from multiple files. For example, line one from file1 can be combined with line one of file2, line two from file1 can be combined with line two of file2, and so on.
To paste contents from two files one can do:
 
$ paste file1 file2
The syntax to use a different delimiter is as follows:
 
$ paste -d, file1 file2
Common delimiters are 'space', 'tab', '|', 'comma', etc.
 

Using paste
Suppose you have two files with some similar columns. You have saved employees’ phone numbers in two files, one with their first name and the other with their last name. You want to combine the files without repeating the data of common columns. How do you achieve this?
The above task can be achieved using join, which is essentially an enhanced version of paste. It first checks whether the files share common fields, such as names or phone numbers, and then joins the lines in two files based on a common field.
 

join
To combine two files on a common field, at the command prompt type join file1 file2 and press the Enter key.
For example, the common field (i.e. it contains the same values) among the phonebook and cities files is the phone number, and the result of joining these two files is shown in the screen capture.
 

Using join
split is used to break up (or split) a file into equal-sized segments for easier viewing and manipulation, and is generally used only on relatively large files. By default, split breaks up a file into 1000-line segments. The original file remains unchanged, and a set of new files with the same name plus an added prefix is created. By default, the x prefix is added. To split a file into segments, use the command split infile.
To split a file into segments using a different prefix, use the command split infile <Prefix>.
 

split
We will apply split to an American-English dictionary file of over 99,000 lines:
$ wc -l american-english
99171 american-english
where we have used wc (word count, soon to be discussed) to report on the number of lines in the file. Then, typing:
$ split american-english dictionary
will split the American-English file into 100 equal-sized segments named dictionaryxx. The last one will of course be somewhat smaller.
 

Using split
Regular expressions are text strings used for matching a specific pattern, or to search for a specific location, such as the start or end of a line or a word. Regular expressions can contain both normal characters or so-called meta-characters, such as * and $.
Many text editors and utilities such as vi, sed, awk, find and grep work extensively with regular expressions. Some of the popular computer languages that use regular expressions include Perl, Python and Ruby. It can get rather complicated and there are whole books written about regular expressions; thus, we will do no more than skim the surface here.
These regular expressions are different from the wildcards (or meta-characters) used in filename matching in command shells such as bash (which were covered in Chapter 7: Command-Line Operations). The table lists search patterns and their usage.
 
Search Patterns
Usage
.(dot)
Match any single character
a|z
Match a or z
$
Match end of string
^
Match beginning of string
*
Match preceding item 0 or more times

For example, consider the following sentence: the quick brown fox jumped over the lazy dog.
Some of the patterns that can be applied to this sentence are as follows:
 
Command
Usage
a..
matches azy
b.|j.
matches both br and ju
..$
matches og
l.*
matches lazy dog
l.*y
matches lazy
the.*
matches the whole sentence

grep is extensively used as a primary text searching tool. It scans files for specified patterns and can be used with regular expressions, as well as simple strings, as shown in the table:
 
Command
Usage
grep [pattern] <filename>
Search for a pattern in a file and print all matching lines
grep -v [pattern] <filename>
Print all lines that do not match the pattern
grep [0-9] <filename>
Print the lines that contain the numbers 0 through 9
grep -C 3 [pattern] <filename>
Print context of lines (specified number of lines above and below the pattern) for matching the pattern. Here, the number of lines is specified as 3

strings is used to extract all printable character strings found in the file or files given as arguments. It is useful in locating human-readable content embedded in binary files; for text files one can just use grep.
For example, to search for the string my_string in a spreadsheet:
 
$ strings book1.xls | grep my_string
The screenshot shows a  search of a number of programs to see which ones have GPL licenses of various versions.
 

strings
In this section, you will learn about some additional text utilities that you can use for performing various actions on your Linux files, such as changing the case of letters or determining the count of words, lines, and characters in a file.
 

tr
 
The tr utility is used to translate specified characters into other characters or to delete them. The general syntax is as follows:
$ tr [options] set1 [set2]
The items in the square brackets are optional. tr requires at least one argument and accepts a maximum of two. The first, designated set1 in the example, lists the characters in the text to be replaced or removed. The second, set2, lists the characters that are to be substituted for the characters listed in the first argument. Sometimes these sets need to be surrounded by apostrophes (or single-quotes (')) in order to have the shell ignore that they mean something special to the shell. It is usually safe (and may be required) to use the single-quotes around each of the sets as you will see in the examples below.
For example, suppose you have a file named city containing several lines of text in mixed case. To translate all lower case characters to upper case, at the command prompt type cat city | tr a-z A-Z and press the Enter key.
 
Command
Usage
tr abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ
Convert lower case to upper case
tr '{}' '()' < inputfile > outputfile
Translate braces into parenthesis
echo "This is for testing" | tr [:space:] '\t'
Translate white-space to tabs
echo "This   is   for    testing" | tr -s [:space:]
Squeeze repetition of characters using -s
echo "the geek stuff" | tr -d 't'
Delete specified characters using -d option
echo "my username is 432234" | tr -cd [:digit:]
Complement the sets using -c option
tr -cd [:print:] < file.txt
Remove all non-printable character from a file
tr -s '\n' ' ' < file.txt
Join all the lines in a file into a single line

tee takes the output from any command, and, while sending it to standard output, it also saves it to a file. In other words, it tees the output stream from the command: one stream is displayed on the standard output and the other is saved to a file.
For example, to list the contents of a directory on the screen and save the output to a file, at the command prompt type ls -l | tee newfile and press the Enter key.
Typing cat newfile will then display the output of ls –l.
 

tee
wc (word count) counts the number of lines, words, and characters in a file or list of files. Options are given in the table below.
 
Option
Description
–l
Displays the number of lines
-c
Displays the number of bytes
-w
Displays the number of words

 
By default, all three of these options are active.
For example, to print only the number of lines contained in a file, type wc -l filename and press the Enter key.
 

wc
cut is used for manipulating column-based files and is designed to extract specific columns. The default column separator is the tab character. A different delimiter can be given as a command option.
For example, to display the third column delimited by a blank space, at the command prompt type ls -l | cut -d" " -f3 and press the Enter key.
 

cut
There are two different types of IP addresses available: IPv4 (version 4) and IPv6 (version 6). IPv4 is older and by far the more widely used, while IPv6 is newer and is designed to get past limitations inherent in the older standard and furnish many more possible addresses.
IPv4 uses 32-bits for addresses; there are only 4.3 billion unique addresses available. Furthermore, many addresses are allotted and reserved, but not actually used. IPv4 is considered inadequate for meeting future needs because the number of devices available on the global network has increased enormously in recent years.
IPv6 uses 128-bits for addresses; this allows for 3.4 X 1038 unique addresses. If you have a larger network of computers and want to add more, you may want to move to IPv6, because it provides more unique addresses. However, it can be complex to migrate to IPv6; the two protocols do not always inter-operate well. Thus, moving equipment and addresses to IPv6 requires significant effort and has not been quite as fast as was originally intended. We will discuss IPv4 more than IPv6 as you are more likely to deal with it.
One reason IPv4 has not disappeared is there are ways to effectively make many more addresses available by methods such as NAT (Network Address Translation).  NAT enables sharing one IP address among many locally connected computers, each of which has a unique address only seen on the local network. While this is used in organizational settings, it also used in simple home networks. For example, if you have a router hooked up to your Internet Provider (such as a cable system) it gives you one externally visible address, but issues each device in your home an individual local address.
 

IPv4 and IPv6
A 32-bit IPv4 address is divided into four 8-bit sections called octets.
Example:
IP address →            172  .          16  .          31  .         46
Bit format →     10101100.00010000.00011111.00101110
Note: Octet is just another word for byte.
Network addresses are divided into five classes: A, B, C, D and E. Classes A, B and C are classified into two parts: Network addresses (Net ID) and Host address (Host ID). The Net ID is used to identify the network, while the Host ID is used to identify a host in the network. Class D is used for special multicast applications (information is broadcast to multiple computers simultaneously) and Class E is reserved for future use. In this section you will learn about classes A, B and C.
 

Decoding IPv4 Addresses
Class A addresses use the first octet of an IP address as their Net ID and use the other three octets as the Host ID. The first bit of the first octet is always set to zero. So you can use only 7-bits for unique network numbers. As a result, there are a maximum of 126 Class A networks available (the addresses 0000000 and 1111111 are reserved). Not surprisingly, this was only feasible when there were very few unique networks with large numbers of hosts. As the use of the Internet expanded, Classes B and C were added in order to accommodate the growing demand for independent networks.
Each Class A network can have up to 16.7 million unique hosts on its network. The range of host address is from 1.0.0.0 to 127.255.255.255.
Note: The value of an octet, or 8-bits, can range from 0 to 255. 
 

Class A Network Addresses
Class B addresses use the first two octets of the IP address as their Net ID and the last two octets as the Host ID. The first two bits of the first octet are always set to binary 10, so there are a maximum of 16,384 (14-bits) Class B networks. The first octet of a Class B address has values from 128 to 191. The introduction of Class B networks expanded the number of networks but it soon became clear that a further level would be needed.
Each Class B network can support a maximum of 65,536 unique hosts on its network. The range of host address is from 128.0.0.0 to 191.255.255.255.
 

Class B Network Addresses
Class C addresses use the first three octets of the IP address as their Net ID and the last octet as their Host ID. The first three bits of the first octet are set to binary 110, so almost 2.1 million (21-bits) Class C networks are available. The first octet of a Class C address has values from 192 to 223. These are most common for smaller networks which don't have many unique hosts.
Each Class C network can support up to 256 (8-bits) unique hosts. The range of host address is from 192.0.0.0 to 223.255.255.255.
 

Class C Network Addresses
Typically, a range of IP addresses are requested from your Internet Service Provider (ISP) by your organization's network administrator. Often, your choice of which class of IP address you are given depends on the size of your network and expected growth needs. If NAT is in operation, such as in a home network, you only get one externally visible address!
You can assign IP addresses to computers over a network either manually or dynamically. Manual assignment adds static (never changing) addresses to the network. Dynamically assigned addresses can change every time you reboot or even more often; the Dynamic Host Configuration Protocol (DHCP) is used to assign IP addresses.

IP Address Allocation
Name Resolution is used to convert numerical IP address values into a human-readable format known as the hostname. For example, 104.95.85.15 is the numerical IP address that refers to the hostname whitehouse.gov. Hostnames are much easier to remember!
Given an IP address, you can obtain its corresponding hostname. Accessing the machine over the network becomes easier when you can type the hostname instead of the IP address.
You can view your system’s hostname simply by typing hostname with no argument.
Note: If you give an argument, the system will try to change its hostname to match it, however, only root users can do that.
The special hostname localhost is associated with the IP address 127.0.0.1, and describes the machine you are currently on (which normally has additional network-related IP addresses).
 

Screenshot Showing Server IP Address of The Linux Foundation Website
Network configuration files are essential to ensure that interfaces function correctly. They are located in the /etc directory tree. However, the exact files used have historically been dependent on the particular Linux distribution and version being used.
For Debian family configurations, the basic network configuration files could be found under /etc/network/, while for Fedora and SUSE family systems one needed to inspect /etc/sysconfig/network. 
Modern systems emphasize the use of Network Manager, which we briefly discussed when we considered graphical system administration, rather than try to keep up with the vagaries of the files in /etc. While the graphical versions of Network Manager do look somewhat different in different distributions, the nmtui utility (shown in the screenshot) varies almost not at all, as does the even more sparse nmcli (command line interface) utility. If you are proficient in the use of the GUIs, by all means, use them. If you are working on a variety of systems, the lower level utilities may make life easier.
 

Network Manager
Network interfaces are a connection channel between a device and a network. Physically, network interfaces can proceed through a network interface card (NIC), or can be more abstractly implemented as software. You can have multiple network interfaces operating at once. Specific interfaces can be brought up (activated) or brought down (de-activated) at any time.
Information about a particular network interface or all network interfaces can be reported by the ip and ifconfig utilities, which you may have to run as the superuser, or at least, give the full path, i.e. /sbin/ifconfig, on some distributions. ip is newer than ifconfig and has far more capabilities, but its output is uglier to the human eye. Some new Linux distributions do not install the older net-tools package to which ifconfig belongs, and  so you would have to install it if you want to use it.
 

Network Interfaces
To view the IP address:
$ /sbin/ip addr show
To view the routing information:
$ /sbin/ip route show
ip is a very powerful program that can do many things. Older (and more specific) utilities such as ifconfig and route are often used to accomplish similar tasks. A look at the relevant man pages can tell you much more about these utilities.
 

ip Utility
ping is used to check whether or not a machine attached to the network can receive and send data; i.e. it confirms that the remote host is online and is responding.
To check the status of the remote host, at the command prompt, type ping <hostname>.
ping is frequently used for network testing and management; however, its usage can increase network load unacceptably. Hence, you can abort the execution of ping by typing CTRL-C, or by using the -c option, which limits the number of packets that ping will send before it quits. When execution stops, a summary is displayed.
 

ping
A network requires the connection of many nodes. Data moves from source to destination by passing through a series of routers and potentially across multiple networks. Servers maintain routing tables containing the addresses of each node in the network. The IP routing protocols enable routers to build up a forwarding table that correlates final destinations with the next hop addresses.
 

route
 
One can use the route utility or the newer ip route command to view or change the IP routing table to add, delete, or modify specific (static) routes to specific hosts or networks. The table explains some commands that can be used to manage IP routing:
 
Task
Command
Show current routing table
$ route –n or ip route
Add static route
$ route add -net address or ip route add 
Delete static route
$ route del -net address or ip route del 

traceroute is used to inspect the route which the data packet takes to reach the destination host, which makes it quite useful for troubleshooting network delays and errors. By using traceroute, you can isolate connectivity issues between hops, which helps resolve them faster.
To print the route taken by the packet to reach the network host, at the command prompt, type traceroute <address>.
 

traceroute
Now, let’s learn about some additional networking tools. Networking tools are very useful for monitoring and debugging network problems, such as network connectivity and network traffic.
 
Networking Tools
Description
ethtool
Queries network interfaces and can also set various parameters such as the speed
netstat
Displays all active connections and routing tables. Useful for monitoring performance and troubleshooting
nmap
Scans open ports on a network. Important for security analysis
tcpdump
Dumps network traffic for analysis
iptraf
Monitors network traffic in text mode
mtr
Combines functionality of ping and traceroute and gives a continuously updated display
dig
Tests DNS workings. A good replacement for host and nslookup

Browsers are used to retrieve, transmit, and explore information resources, usually on the World Wide Web. Linux users commonly use both graphical and non-graphical browser applications.
The common graphical browsers used in Linux are:
Firefox
Google Chrome
Chromium
Konqueror
Opera
Sometimes, you either do not have a graphical environment to work in (or have reasons not to use it) but still need to access web resources. In such a case, you can use non-graphical browsers, such as the following:
 
Non-Graphical Browsers
Description
Lynx
Configurable text-based web browser; the earliest such browser and still in use
ELinks
Based on Lynx. It can display tables and frames
w3m
Another text-based web browser with many features.

Sometimes, you need to download files and information, but a browser is not the best choice, either because you want to download multiple files and/or directories, or you want to perform the action from a command line or a script. wget is a command line utility that can capably handle the following types of downloads:
Large file downloads
Recursive downloads, where a web page refers to other web pages and all are downloaded at once
Password-required downloads
Multiple file downloads.
To download a web page, you can simply type wget <url>, and then you can read the downloaded page as a local file using a graphical or non-graphical browser.
 

wget
Besides downloading, you may want to obtain information about a URL, such as the source code being used. curl can be used from the command line or a script to read such information. curl also allows you to save the contents of a web page to a file, as does wget.
You can read a URL using curl <URL>. For example, if you want to read http://www.linuxfoundation.org, type curl http://www.linuxfoundation.org.
To get the contents of a web page and store it to a file, type curl -o saved.html http://www.mysite.com. The contents of the main index file at the website will be saved in saved.html.
 

curl
When you are connected to a network, you may need to transfer files from one machine to another. File Transfer Protocol (FTP) is a well-known and popular method for transferring files between computers using the Internet. This method is built on a client-server model. FTP can be used within a browser or with stand-alone client programs.  
FTP is one of the oldest methods of network data transfer, dating back to the early 1970s. As such, it is considered inadequate for modern needs, as well as being intrinsically insecure. However, it is still in use and when security is not a concern (such as with so-called anonymous FTP) it can make sense. However, many websites, such as kernel.org, have abandoned its use.

File Transfer Protocol
FTP clients enable you to transfer files with remote computers using the FTP protocol. These clients can be either graphical or command line tools. Filezilla, for example, allows use of the drag-and-drop approach to transfer files between hosts. All web browsers support FTP, all you have to do is give a URL like ftp://ftp.kernel.org where the usual http:// becomes ftp://.
Some command line FTP clients are:
ftp
sftp
ncftp
yafc (Yet Another FTP Client).
FTP has fallen into disfavor on modern systems, as it is intrinsically insecure, since passwords are user credentials that can be transmitted without encryption and are thus prone to interception. Thus, it was removed in favor of using rsync and web browser https access for example. As an alternative, sftp is a very secure mode of connection, which uses the Secure Shell (ssh) protocol, which we will discuss shortly. sftp encrypts its data and thus sensitive information is transmitted more securely. However, it does not work with so-called anonymous FTP (guest user credentials).
 

FTP Clients
Secure Shell (SSH) is a cryptographic network protocol used for secure data communication. It is also used for remote services and other secure services between two devices on the network and is very useful for administering systems which are not easily available to physically work on, but to which you have remote access.
To login to a remote system using your same user name you can just type ssh some_system and press Enter. ssh then prompts you for the remote password. You can also configure ssh to securely allow your remote access without typing a password each time.
If you want to run as another user, you can do either ssh -l someone some_system or ssh someone@some_system. To run a command on a remote system via SSH, at the command prompt, you can type ssh some_system my_command.

SSH: Executing Commands Remotely
We can also move files securely using Secure Copy (scp) between two networked hosts. scp uses the SSH protocol for transferring data.
To copy a local file to a remote system, at the command prompt, type scp <localfile> <user@remotesystem>:/home/user/ and press Enter.
You will receive a prompt for the remote password. You can also configure scp so that it does not prompt for a password for each transfer.
 

Copying Files Securely with scp
Lab: Network Troubleshooting
Troubleshooting network problems is something that you will often encounter if you haven't already. We are going to practice some of the previously discussed tools, that can help you isolate, troubleshoot and fix problems in your network.
Suppose you need to perform an Internet search, but your web browser can not find google.com, saying the host is unknown. Let's proceed step by step to fix this.
First make certain your network is properly configured. If your Ethernet device is up and running, running ifconfig should display something like:
student:/tmp> /sbin/ifconfig
eno167777 Link encap:Ethernet  HWaddr 00:0C:29:BB:92:C2
          inet addr:192.168.1.14  Bcast:192.168.1.255  Mask:255.255.255.0
          inet6 addr: fe80::20c:29ff:febb:92c2/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:3244 errors:0 dropped:0 overruns:0 frame:0
          TX packets:2006 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:4343606 (4.1 Mb)  TX bytes:169082 (165.1 Kb)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b)
 On older systems you probably will see a less cryptic name than eno167777, like eth0, or for a wireless connection, you might see something like wlan0 or wlp3s0. You can also show your IP address with:
student:/tmp> ip addr show
1: lo: mtu 65536 qdisc noqueue state UNKNOWN group default
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eno16777736: mtu 1500 qdisc pfifo_fast state \
    UP group default qlen 1000
    link/ether 00:0c:29:bb:92:c2 brd ff:ff:ff:ff:ff:ff
p    inet 192.168.1.14/24 brd 192.168.1.255 scope global dynamic eno16777736
       valid_lft 84941sec preferred_lft 84941sec
    inet 192.168.1.15/24 brd 192.168.1.255 scope global secondary dynamic eno16777736
       valid_lft 85909sec preferred_lft 85909sec
    inet6 fe80::20c:29ff:febb:92c2/64 scope link
       valid_lft forever preferred_lft forever
     
 Does the IP address look valid? Depending on where you are using this from, it is most likely a Class C IP address; in the above this is 192.168.1.14
If it does not show a device with an IP address, you may need to start or restart the network and/or NetworkManager. Exactly how you do this depends on your system. For most distributions one of these commands will accomplish this:
student:/tmp> sudo systemctl restart NetworkManager
student:/tmp> sudo systemctl restart network
student:/tmp> sudo service NetworkManager restart
student:/tmp> sudo service network restart
     
 If your device was up but had no IP address, the above should have helped fix it, but you can try to get a fresh address with:
student:/tmp> sudo dhclient eth0
     
 substituting the right name for the Ethernet device.
If your interface is up and running with an assigned IP address and you still can not reach google.com, we should make sure you have a valid hostname assigned to your machine, with hostname:
student:/tmp> hostname
openSUSE
     
 It is rare you would have a problem here, as there is probably always at least a default hostname, such as localhost.
When you type in a name of a site such as google.com, that name needs to be connected to a known IP address. This is usually done employing the DNS sever (Domain Name System)
First, see if the site is up and reachable with ping:
student:/tmp> sudo ping -c 3 google.com
PING google.com (216.58.216.238) 56(84) bytes of data.
64 bytes from ord31s22-in-f14.1e100.net (216.58.216.238): icmp_seq=1 ttl=51 time=21.7 ms
64 bytes from ord31s22-in-f14.1e100.net (216.58.216.238): icmp_seq=2 ttl=51 time=23.8 ms
64 bytes from ord31s22-in-f14.1e100.net (216.58.216.238): icmp_seq=3 ttl=51 time=21.3 ms

--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 21.388/22.331/23.813/1.074 ms
     
 Note:
We have used sudo for ping; recent Linux distributions have required this to avoid clueless or malicious users from flooding systems with such queries.
We have used -c 3 to limit to 3 packets; otherwise ping would run forever until forcibly terminated, say with CTRL-C.
If the result was:
ping: unknown host google.com
     
 It is likely that something is wrong with your DNS set-up. (Note on some systems you will never see the unknown host message, but you will get a suspicious result like:
student:/tmp> sudo ping l89xl28vkjs.com
PING l89xl28vkjs.com.site (127.0.53.53) 56(84) bytes of data.
64 bytes from 127.0.53.53: icmp_seq=1 ttl=64 time=0.016 ms
...
     
 where the 127.0.x.x address is a loop feeding back to the host machine you are on. You can eliminate this as being a valid address by doing:
student:/tmp> host l89xl28vkjs.com
Host l89xl28vkjs.com not found: 3(NXDOMAIN)
     
 whereas a correct result would look like:
student:/tmp> host google.com
google.com has address 216.58.216.206
google.com has IPv6 address 2607:f8b0:4009:80b::200e
google.com mail is handled by 20 alt1.aspmx.l.google.com.
google.com mail is handled by 10 aspmx.l.google.com.
google.com mail is handled by 30 alt2.aspmx.l.google.com.
google.com mail is handled by 40 alt3.aspmx.l.google.com.
google.com mail is handled by 50 alt4.aspmx.l.google.com.
     
 The above command utilizes the DNS server configured in /etc/resolv.conf on your machine. If you wanted to override that you could do:
host 8.8.8.8
8.8.8.8.in-addr.arpa domain name pointer google-public-dns-a.google.com.
student@linux:~> host google.com 8.8.8.8
Using domain server:
Name: 8.8.8.8
Address: 8.8.8.8#53
Aliases:

google.com has address 216.58.216.110
google.com has IPv6 address 2607:f8b0:4009:804::1002
...\
     
 where we have used the publicly available DNS server provided by Google itself. (Using this or another public server can be a good trick sometimes if your network is up but DNS is ill; in that case you can also enter it in resolv.conf.)
Note that there is another file, /etc/hosts, where you can associate names with IP addresses, which is used before the DNS server is consulted. This is most useful for specifying nodes on your local network.
You could also use the dig utility if you prefer:
student:/tmp> dig google.com
; <<>> DiG 9.9.5-rpz2+rl.14038.05-P1 <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 29613
;; flags: qr rd ra; QUERY: 1, ANSWER: 11, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; MBZ: 1c20 , udp: 1280
;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             244     IN      A       173.194.46.67
google.com.             244     IN      A       173.194.46.65
google.com.             244     IN      A       173.194.46.71
google.com.             244     IN      A       173.194.46.73
google.com.             244     IN      A       173.194.46.69
google.com.             244     IN      A       173.194.46.68
google.com.             244     IN      A       173.194.46.64
google.com.             244     IN      A       173.194.46.72
google.com.             244     IN      A       173.194.46.70
google.com.             244     IN      A       173.194.46.66
google.com.             244     IN      A       173.194.46.78

;; Query time: 22 msec
;; SERVER: 192.168.1.1#53(192.168.1.1)
;; WHEN: Mon Apr 20 08:58:58 CDT 2015
;; MSG SIZE  rcvd: 215
     
Suppose host or dig fail to connect the name to an IP address. There are many reasons DNS can fail, some of which are:
The DNS server is down. In this case try pinging it to see if it is alive (you should have the IP address in /etc/resolv.conf.
The server can be up and running, but DNS may not be currently available on the machine.
Your route to the DNS server may not be correct.
How can we test the route? Tracing the route to one of the public name server we mentioned before:
student@linux:~> sudo traceroute 8.8.8.8
traceroute to 8.8.8.8 (8.8.8.8), 30 hops max, 60 byte packets
 1  192.168.1.1 (192.168.1.1)  0.405 ms  0.494 ms  0.556 ms
 2  10.132.4.1 (10.132.4.1)  15.127 ms  15.107 ms  15.185 ms
 3  dtr02ftbgwi-tge-0-6-0-3.ftbg.wi.charter.com (96.34.24.122)
                                                          15.243 ms  15.327 ms  17.878 ms
 4  crr02ftbgwi-bue-3.ftbg.wi.charter.com (96.34.18.116)  17.667 ms  17.734 ms  20.016 ms
 5  crr01ftbgwi-bue-4.ftbg.wi.charter.com (96.34.18.108)  22.017 ms  22.359 ms  22.052 ms
 6  crr01euclwi-bue-1.eucl.wi.charter.com (96.34.16.77)  29.430 ms  22.705 ms  22.076 ms
 7  bbr01euclwi-bue-4.eucl.wi.charter.com (96.34.2.4)  17.795 ms  25.542 ms  25.600 ms
 8  bbr02euclwi-bue-5.eucl.wi.charter.com (96.34.0.7)  28.227 ms  28.270 ms  28.303 ms
 9  bbr01chcgil-bue-1.chcg.il.charter.com (96.34.0.9)  33.114 ms  33.072 ms  33.175 ms
10  prr01chcgil-bue-2.chcg.il.charter.com (96.34.3.9)  36.882 ms  36.794 ms  36.895 ms
11  96-34-152-30.static.unas.mo.charter.com (96.34.152.30)  42.585 ms  42.326 ms  42.401 ms
12  216.239.43.111 (216.239.43.111)  28.737 ms 216.239.43.113 (216.239.43.113)
                                                            24.558 ms  23.941 ms
13  209.85.243.115 (209.85.243.115)  24.269 ms 209.85.247.17 (209.85.247.17)
   25.758 ms 216.239.50.123 (216.239.50.123)  25.433 ms
14  google-public-dns-a.google.com (8.8.8.8)  25.239 ms  24.003 ms  23.795 ms
     
 Again, this should likely work for you, but what if you only got the first line in the traceroute output?
If this happened, most likely your default route is wrong. Try:
student:/tmp> ip route show
efault via 192.168.1.1 dev eno16777736  proto static  metric 1024
192.168.1.0/24 dev eno16777736  proto kernel  scope link  src 192.168.1.14
     
 Most likely this is set to your network interface and the IP address of your router, DSL, or Cable Modem. Let's say that it is blank or simply points to your own machine. Here's your problem! At this point, you would need to add a proper default route and run some of the same tests we just did.
Note, an enhanced version of traceroute is supplied by mtr, which runs continuously (like top). Running it with the --report-cycles option to limit how long it runs:
student:/tmp> sudo mtr --report-cycles 3 8.8.8.8
                             My traceroute  [v0.85]
c7 (0.0.0.0)                                           Mon Apr 20 09:30:41 2015
Unable to allocate IPv6 socket for nameserver communication: Address family not supported
              by protocol                  Packets               Pings
 Host                                Loss%   Snt   Last   Avg  Best  Wrst StDev
                                      0.0%     3    0.3   0.3   0.2   0.3   0.0
 2. 10.132.4.1                        0.0%     3    6.3   7.1   6.3   8.4   0.7
 3. dtr02ftbgwi-tge-0-6-0-3.ftbg.wi.  0.0%     3    6.2   7.5   6.2  10.0   2.1
 4. dtr01ftbgwi-bue-1.ftbg.wi.charte  0.0%     3    8.9   8.5   6.2  10.4   2.0
 5. crr01ftbgwi-bue-4.ftbg.wi.charte  0.0%     3    8.9   9.7   8.9  10.4   0.0
 6. crr01euclwi-bue-1.eucl.wi.charte  0.0%     3   16.5  17.4  14.2  21.5   3.7
 7. bbr01euclwi-bue-4.eucl.wi.charte  0.0%     3   23.5  22.0  18.2  24.2   3.2
 8. bbr02euclwi-bue-5.eucl.wi.charte  0.0%     3   18.9  22.7  18.1  31.1   7.2
 9. bbr01chcgil-bue-1.chcg.il.charte  0.0%     3   22.9  23.0  22.9  23.1   0.0
10. prr01chcgil-bue-2.chcg.il.charte  0.0%     3   21.4  24.1  20.8  30.2   5.2
11. 96-34-152-30.static.unas.mo.char  0.0%     3   22.6  21.9  20.0  23.3   1.6
12. 216.239.43.111                    0.0%     3   21.2  21.7  21.2  22.0   0.0
13. 72.14.237.35                      0.0%     3   21.2  21.0  19.8  21.9   1.0
14. google-public-dns-a.google.com    0.0%     3   26.7  23.0  21.0  26.7   3.2
     
Hopefully, running through some of these commands helped. It actually helps to see what the correct output for your system looks like. Practice using these commands; it is very likely that you will need them someday.
Lab: Non-graphical browsers
We have discussed non-graphical browsers:
lynx
links and elinks
w3m
There are times when you will not have a graphical window interface running on your Linux machine and you need to look something up on the web or download a driver (like a graphics driver in order to bring up a graphical window interface). So, it is a good idea to practice using a non-graphical web browser to do some work.
With links, you can use your mouse to click on the top line of the screen to get a menu. In this case, we want to go to google.com (or your favorite search engine), so you can just type g to go to a typed-in URL.
Pressing the TAB key will move your cursor to the OK button. You can then press the ENTER key.
You should now be at google.com (or your favorite search engine). Use the down-arrow key to move through the choices until you reach the blank line used to enter your search query. Now type Intel Linux graphics drivers in the search box. Use the down-arrow key to move you to the Google Search button. With that highlighted, press the ENTER key.
Use your down-arrow key to move to the entry: Intel(R) Graphics Drivers for Linux - Download Center. It may take several presses of the down-arrow key. You can press the space-bar to move down the page or the 'b' key to move back up the page if needed. Once this line is highlighted, press the ENTER key. You will now go to the Intel Graphics Driver for Linux page. If you want, you can read the page. Remember, the space-bar will page you down the page while the 'b' key will move you back up the page. The Page Down and Page Up keys will do the same thing if you prefer. Find the URL under the line
URL Location:
     
Position your cursor at this line using the up-arrow or down-arrow key. Press the ENTER key to go to this location.
Page down this page until you see the line:
Latest Releases
     
If you move your cursor with the arrow keys, find the latest version (with the most recent release date) under this section. If using your arrow-keys, you should highlight Release Notes. Press the ENTER key.
This has installers for versions of Ubuntu and Fedora, along with the source code. You will need to page down a page or two depending on the size of your screen.
Select one of the installers, perhaps for the version of Linux that you are running, or just a random one, and press the ENTER key.
You should see a text dialog box with choices of what to do. Save the package wherever you want to.
You can now quit your non-graphical browser. If you used links, then click on the top line of the screen, select the File drop-down menu item, and click on Exit. Confirm that you really want to exit Links. You should now see your shell prompt.
Suppose you want to look up a filename, check if the associated file exists, and then respond accordingly, displaying a message confirming or not confirming the file's existence. If you only need to do it once, you can just type a sequence of commands at a terminal. However, if you need to do this multiple times, automation is the way to go. In order to automate sets of commands, you will need to learn how to write shell scripts.  Most commonly in Linux, these scripts are developed to be run under the bash command shell interpreter. The graphic illustrates several of the benefits of deploying scripts.
 

Features of Shell Scripts
Note: Many of the topics discussed in this and the next chapter have already been introduced earlier, while discussing things that can be done at the command line. We have elected to repeat some of that discussion in order to make the sections on scripting stand on their own, so the repetition is intentional.
The command interpreter is tasked with executing statements that follow it in the script. Commonly used interpreters include: /usr/bin/perl, /bin/bash, /bin/csh, /usr/bin/python and /bin/sh.
Typing a long sequence of commands at a terminal window can be complicated, time consuming, and error prone. By deploying shell scripts, using the command line becomes an efficient and quick way to launch complex sequences of steps. The fact that shell scripts are saved in a file also makes it easy to use them to create new script variations and share standard procedures with several users.
Linux provides a wide choice of shells; exactly what is available on the system is listed in /etc/shells. Typical choices are:
/bin/sh
/bin/bash
/bin/tcsh
/bin/csh
/bin/ksh
/bin/zsh
Most Linux users use the default bash shell, but those with long UNIX backgrounds with other shells may want to override the default.
To learn more about the UNIX Shell, you can read this short "History of Command Shells" article.
 

Command Shell Choices
Remember from our earlier discussion, a shell is a command line interpreter which provides the user interface for terminal windows. It can also be used to run scripts, even in non-interactive sessions without a terminal window, as if the commands were being directly typed in. For example, typing find . -name "*.c" -ls at the command line accomplishes the same thing as executing a script file containing the lines:
#!/bin/bash
find . -name "*.c" -ls
The first line of the script, which starts with #!, contains the full path of the command interpreter (in this case /bin/bash) that is to be used on the file. As we have noted, you have quite a few choices for the scripting language you can use, such as /usr/bin/perl, /bin/csh, /usr/bin/python, etc.
 

Shell Scripts
Let's write a simple bash script that displays a one line message on the screen. Either type:
$ cat > hello.sh
#!/bin/bash
echo "Hello Linux Foundation Student"
and press ENTER and CTRL-D to save the file, or just create hello.sh in your favorite text editor. Then, type chmod +x hello.sh to make the file executable by all users.
You can then run the script by  typing ./hello.sh or by doing:
$ bash hello.sh
Hello Linux Foundation Student
Note: If you use the second form, you do not have to make the file executable.
 

A Simple bash Script
Now, let's see how to create a more interactive example using a bash script. The user will be prompted to enter a value, which is then displayed on the screen. The value is stored in a temporary variable, name. We can reference the value of a shell variable by using a $ in front of the variable name, such as $name. To create this script, you need to create a file named getname.sh in your favorite editor with the following content: 
#!/bin/bash
# Interactive reading of a variable
echo "ENTER YOUR NAME"
read name
# Display variable input
echo The name given was :$name
Once again, make it executable by doing chmod +x getname.sh.
In the above example, when the user types./getname.sh and the script is executed, the user is prompted with the string ENTER YOUR NAME. The user then needs to enter a value and press the Enter key. The value will then be printed out.
Note: The hash-tag/pound-sign/number-sign (#) is used to start comments in the script and can be placed anywhere in the line (the rest of the line is considered a comment). However, note the special magic combination of #!, used on the first line, is a unique exception to this rule.
 
Interactive Example Using bash Scripts
All shell scripts generate a return value upon finishing execution, which can be explicitly set with the exit statement. Return values permit a process to monitor the exit state of another process, often in a parent-child relationship. Knowing how the process terminates enables taking any appropriate steps which are necessary or contingent on success or failure.
 

Return Values
As a script executes, one can check for a specific value or condition and return success or failure as the result. By convention, success is returned as 0, and failure is returned as a non-zero value. An easy way to demonstrate success and failure completion is to execute ls on a file that exists as well as one that does not, the return value is stored in the environment variable represented by $?:
$ ls /etc/logrotate.conf
/etc/logrotate.conf
$ echo $?
0
In this example, the system is able to locate the file /etc/logrotate.conf and ls returns a value of 0 to indicate success. When run on a non-existing file, it returns 2. Applications often translate these return values into meaningful messages easily understood by the user.
 
Viewing Return Values
Scripts require you to follow a standard language syntax. Rules delineate how to define variables and how to construct and format allowed statements, etc. The table lists some special character usages within bash scripts:
 
Character
Description
#
Used to add a comment, except when used as \#, or as #! when starting a script
\
Used at the end of a line to indicate continuation on to the next line
;
Used to interpret what follows as a new command to be executed next
$
Indicates what follows is an environment variable
>
Redirect output
>>
Append output
<
Redirect input
|
Used to pipe the result into the next command

 
There are other special characters and character combinations and constructs that scripts understand, such as (..), {..}, [..], &&, ||, ', ", $((...)), some of which we will discuss later.
Sometimes, commands are too long to either easily type on one line, or to grasp and understand (even though there is no real practical limit to the length of a command line).  
In this case, the concatenation operator (\), the backslash character, is used to continue long commands over several lines.
Here is an example of a command installing a long list of packages on a system using Debian package management:
$~/> cd $HOME
$~/> sudo apt-get install autoconf automake bison build-essential \
    chrpath curl diffstat emacs flex gcc-multilib g++-multilib \ 
    libsdl1.2-dev libtool lzop make mc patch \
    screen socat sudo tar texinfo tofrodos u-boot-tools unzip \
    vim wget xterm zip
The command is divided into multiple lines to make it look readable and easier to understand. The \ operator at the end of each line causes the shell to combine (concatenate) multiple lines and executes them as one single command.
 

Splitting Long Commands Over Multiple Lines
Users sometimes need to combine several commands and statements and even conditionally execute them based on the behavior of operators used in between them. This method is called chaining of commands.
There are several different ways to do this, depending on what you want to do. The ; (semicolon) character is used to separate these commands and execute them sequentially, as if they had been typed on separate lines. Each ensuing command is executed whether or not the preceding one succeeded.
Thus, the three commands in the following example will all execute, even if the ones preceding them fail:
 
$ make ; make install ; make clean
However, you may want to abort subsequent commands when an earlier one fails. You can do this using the && (and) operator as in:
$ make && make install && make clean
If the first command fails, the second one will never be executed. A final refinement is to use the || (or) operator, as in:
$ cat file1 || cat file2 || cat file3
In this case, you proceed until something succeeds and then you stop executing any further steps.
Chaining commands is not the same as piping them; in the later case succeeding commands begin operating on data streams produced by earlier ones before they complete, while in chaining each step exits before the next one starts.
 

Putting Multiple Commands on a Single Line
Most operating systems accept input from the keyboard and display the output on the terminal. However, in shell scripting you can send the output to a file. The process of diverting the output to a file is called output redirection. We have already used this facility in our earlier sections on how to use the command line.
The > character is used to write output to a file. For example, the following command sends the output of free to /tmp/free.out:
$ free > /tmp/free.out
To check the contents of /tmp/free.out, at the command prompt type cat /tmp/free.out.
Two > characters (>>) will append output to a file if it exists, and act just like > if the file does not already exist.
 

Output Redirection
Just as the output can be redirected to a file, the input of a command can be read from a file. The process of reading input from a file is called input redirection and uses the < character.
The following three commands (using wc to count the number of lines, words and characters in a file) are entirely equivalent and involve input redirection, and a command operating on the contents of a file:
$ wc < /etc/passwd
49  105 2678 /etc/passwd
$ wc /etc/passwd
49  105 2678 /etcpasswd
$ cat /etc/passwd | wc
49  105 2678
Shell scripts execute sequences of commands and other types of statements. These commands can be: 
Compiled applications
Built-in bash commands
Shell scripts or scripts from other interpreted languages, such as perl and Python.
Compiled applications are binary executable files, generally residing on the filesystem in well-known directories such as /usr/bin. Shell scripts always have access to applications such as rm, ls, df, vi, and gzip, which are programs compiled from lower level programming languages such as C.
In addition, bash has many built-in commands, which can only be used to display the output within a terminal shell or shell script. Sometimes, these commands have the same name as executable programs on the system, such as echo which can lead to subtle problems. bash built-in commands include and cd,  pwd, echo, read, logout, printf, let, and ulimit. Thus, slightly different behavior can be expected from the built-in version of a command such as echo as compared to /bin/echo.
A complete list of bash built-in commands can be found in the bash man page, or by simply typing help, as we review on the next page.
 

Built-In Shell Commands
We already enumerated which commands have versions built in to bash, in our earlier discussion of how to get help on Linux systems. Once again, here is a screenshot listing exactly which commands are available.
Click the image to view an enlarged version.
 

Commands Built in to bash
Users often need to pass parameter values to a script, such as a filename, date, etc. Scripts will take different paths or arrive at different values according to the parameters (command arguments) that are passed to them. These values can be text or numbers as in:
$ ./script.sh /tmp
$ ./script.sh 100 200
 
Within a script, the parameter or an argument is represented with a $ and a number or special character. The table lists some of these parameters.
 
Parameter
Meaning
$0
Script name
$1
First parameter
$2, $3, etc.
Second, third parameter, etc.
$*
All parameters
$#
Number of arguments

If you type in the script shown in the figure, make the script executable with chmod +x param.sh. Then, run the script giving it several arguments, as shown. The script is processed as follows:
 
$0 prints the script name: param.sh
$1 prints the first parameter: one
$2 prints the second parameter: two
$3 prints the third parameter: three
$* prints all parameters: one two three four five
The final statement becomes: All done with param.sh
 

Using Script Parameters
At times, you may need to substitute the result of a command as a portion of another command. It can be done in two ways:
By enclosing the inner command in $( )
By enclosing the inner command with backticks (`)
The second, backticks form, is deprecated in new scripts and commands. No matter which method is used, the specified command will be executed in a newly launched shell environment, and the standard output of the shell will be inserted where the command substitution is done.
Virtually any command can be executed this way. While both of these methods enable command substitution, the $( ) method allows command nesting. New scripts should always use this more modern method. For example:
$ ls /lib/modules/$(uname -r)/
In the above example, the output of the command uname –r (which will be something like 5.7.3 , is inserted into the argument for the ls command.
 

Command Substitution
Most scripts use variables containing a value, which can be used anywhere in the script. These variables can either be user or system-defined. Many applications use such environment variables (already covered in some detail in Chapter 12: User Environment) for supplying inputs, validation, and controlling behavior.
As we discussed earlier,  some examples of standard environment variables are HOME, PATH, and HOST. When referenced, environment variables must be prefixed with the $ symbol, as in $HOME. You can view and set the value of environment variables. For example, the following command displays the value stored in the PATH variable:
$ echo $PATH
However, no prefix is required when setting or modifying the variable value. For example, the following command sets the value of the MYCOLOR variable to blue:
 
$ MYCOLOR=blue
You can get a list of environment variables with the env, set, or printenv commands.
 

Environment Variables
While we discussed the export of environment variables in the section on the "User Environment", it is worth reviewing this topic in the context of writing bash scripts.
By default, the variables created within a script are available only to the subsequent steps of that script. Any child processes (sub-shells) do not have automatic access to the values of these variables. To make them available to child processes, they must be promoted to environment variables using the export statement, as in:
export VAR=value
or
VAR=value ; export VAR
While child processes are allowed to modify the value of exported variables, the parent will not see any changes; exported variables are not shared, they are only copied and inherited.
Typing export with no arguments will give a list of all currently exported environment variables.
 

Exporting Variables
A function is a code block that implements a set of operations. Functions are useful for executing procedures multiple times, perhaps with varying input variables. Functions are also often called subroutines. Using functions in scripts requires two steps:
Declaring a function
Calling a function
The function declaration requires a name which is used to invoke it. The proper syntax is:
 
function_name () {
   command...
}
For example, the following function is named display:
display () {
   echo "This is a sample function"
}
 
The function can be as long as desired and have many statements. Once defined, the function can be called later as many times as necessary. In the full example shown in the figure, we are also showing an often-used refinement: how to pass an argument to the function. The first argument can be referred to as $1, the second as $2, etc.
 

Functions
Conditional decision making, using an if statement, is a basic construct that any useful programming or scripting language must have.
When an if statement is used, the ensuing actions depend on the evaluation of specified conditions, such as:
Numerical or string comparisons
Return value of a command (0 for success)
File existence or permissions.
In compact form, the syntax of an if statement is:
if TEST-COMMANDS; then CONSEQUENT-COMMANDS; fi
A more general definition is:
if condition
then
       statements
else
       statements
fi
In the following example, an if statement checks to see if a certain file exists, and if the file is found, it displays a message indicating success or failure:
 
if [ -f "$1" ]
then
    echo file "$1 exists" 
else
    echo file "$1" does not exist
fi
We really should also check first that there is an argument passed to the script ($1) and abort if not.
Notice the use of the square brackets ([]) to delineate the test condition. There are many other kinds of tests you can perform, such as checking whether two numbers are equal to, greater than, or less than each other and make a decision accordingly; we will discuss these other tests.
In modern scripts, you may see doubled brackets as in [[ -f /etc/passwd ]]. This is not an error. It is never wrong to do so and it avoids some subtle problems, such as referring to an empty environment variable without surrounding it in double quotes; we will not talk about this here.
You can use the elif statement to perform more complicated tests, and take action appropriate actions. The basic syntax is:
if [ sometest ] ; then
    echo Passed test1 
elif [ somothertest ] ; then
    echo Passed test2 
fi
In the example shown we use strings tests which we will explain shortly, and show how to pull in an environment variable with the read statement. 
 

The elif Statement
bash provides a set of file conditionals, that can be used with the if statement, including those in the table.
You can use the if statement to test for file attributes, such as:
File or directory existence
Read or write permission
Executable permission.
For example, in the following example:
 
if [ -x /etc/passwd ] ; then
    ACTION
fi
the if statement checks if the file /etc/passwd is executable, which it is not. Note the very common practice of putting:
; then
on the same line as the if statement.
You can view the full list of file conditions typing:
man 1 test.
 
Condition
Meaning
-e file
Checks if the file exists.
-d file
Checks if the file is a directory.
-f file
Checks if the file is a regular file (i.e. not a symbolic link, device node, directory, etc.)
-s file
Checks if the file is of non-zero size.
-g file
Checks if the file has sgid set.
-u file
Checks if the file has suid set.
-r file
Checks if the file is readable.
-w file
Checks if the file is writable.
-x file
Checks if the file is executable.

Boolean expressions evaluate to either TRUE or FALSE, and results are obtained using the various Boolean operators listed in the table.
 
Operator
Operation
Meaning
&&
AND
The action will be performed only if both the conditions evaluate to true.
||
OR
The action will be performed if any one of the conditions evaluate to true.
!
NOT
The action will be performed only if the condition evaluates to false. 

 
Note that if you have multiple conditions strung together with the && operator, processing stops as soon as a condition evaluates to false. For example, if you have A && B && C and A is true but B is false, C will never be executed.
Likewise, if you are using the || operator, processing stops as soon as anything is true. For example, if you have A || B || C and A is false and B is true, you will also never execute C.
Boolean expressions return either TRUE or FALSE. We can use such expressions when working with multiple data types, including strings or numbers, as well as with files. For example, to check if a file exists, use the following conditional test:
[ -e <filename> ]
 
Similarly, to check if the value of number1 is greater than the value of number2, use the following conditional test:
[ $number1 -gt $number2 ]
 
The operator -gt returns TRUE if number1 is greater than number2.

You can use the if statement to compare strings using the operator == (two equal signs). The syntax is as follows:
if [ string1 == string2 ] ; then
   ACTION
fi
Note that using one = sign will also work, but some consider it deprecated usage. Let’s now consider an example of testing strings.
In the example illustrated here, the if statement is used to compare the input provided by the user and accordingly display the result.
 

Example of Testing of Strings
You can use specially defined operators with the if statement to compare numbers. The various operators that are available are listed in the table:
 
Operator
Meaning
-eq
Equal to
-ne
Not equal to
-gt
Greater than
-lt
Less than
-ge
Greater than or equal to
-le
Less than or equal to

 
The syntax for comparing numbers is as follows:
 
exp1 -op exp2
Arithmetic expressions can be evaluated in the following three ways (spaces are important!):
Using the expr utility
expr is a standard but somewhat deprecated program. The syntax is as follows:

expr 8 + 8
echo $(expr 8 + 8)
Using the $((...)) syntax 
This is the built-in shell format. The syntax is as follows:

echo $((x+1))
Using the built-in shell command let. The syntax is as follows:

let x=( 1 + 2 ); echo $x
In modern shell scripts, the use of expr is better replaced with var=$((...)).
 

Arithmetic Expressions
Write a script that will act as a simple calculator for add, subtract, multiply and divide.
Each operation should have its own function.
Any of the three methods for bash arithmetic, ( $((..)), let , or expr) may be used.
The user should give 3 arguments when executing the script:
The first should be one of the letters a, s, m, or d to specify which math operation.
The second and third arguments should be the numbers that are being operated on.
 The script should detect for bad or missing input values and display the results when done.
Click the link below to view a solution to the Lab exercise.
Lab Solution: Arithmetic and Functions
Create a file named testmath.sh, with the content below.
#!/bin/bash

# Functions.  must be before the main part of the script

# in each case method 1 uses $((..))
#              method 2 uses let
#              method 3 uses expr

add() {
    answer1=$(($1 + $2))
    let answer2=($1 + $2)
    answer3=`expr $1 + $2`
}
sub() {
    answer1=$(($1 - $2))
    let answer2=($1 - $2)
    answer3=`expr $1 - $2`
}
mult() {
    answer1=$(($1 * $2))
    let answer2=($1 * $2)
    answer3=`expr $1 \* $2`
}
div() {
    answer1=$(($1 / $2))
    let answer2=($1 / $2)
    answer3=`expr $1 / $2`
}
# End of functions
#

# Main part of the script

# need 3 arguments, and parse to make sure they are valid types

op=$1 ; arg1=$2 ; arg2=$3

[[ $# -lt 3 ]] && \
    echo "Usage: Provide an operation (a,s,m,d) and two numbers" && exit 1

[[ $op != a ]] && [[ $op != s ]] && [[ $op != d ]] && [[ $op != m ]] && \
    echo operator must be a, s, m, or d, not $op as supplied

# ok, do the work!

if [[ $op == a ]] ; then add $arg1 $arg2
elif [[ $op == s ]] ; then sub $arg1 $arg2
elif [[ $op == m ]] ; then mult $arg1 $arg2
elif [[ $op == d ]] ; then div $arg1 $arg2
else
echo $op is not a, s, m, or d, aborting ; exit 2 
fi

# Show the answers
echo $arg1 $op $arg2 :
echo 'Method 1, $((..)),' Answer is  $answer1
echo 'Method 2, let,    ' Answer is  $answer2
echo 'Method 3, expr,   ' Answer is  $answer3
Make it executable and run it:
student:/tmp> chmod +x testmath.sh 
student:/tmp> ./testmath.sh
student:/tmp> for n in a s m d x ; do ./testmath.sh $n 21 7 ; done
21 a 7 :
Method 1, $((..)), Answer is 28
Method 2, let,
Answer is 28
Method 3, expr,
Answer is 28
21 s 7 :
Method 1, $((..)), Answer is 14
Method 2, let,
Answer is 14
Method 3, expr,
Answer is 14
21 m 7 :
Method 1, $((..)), Answer is 147
Method 2, let,
Answer is 147
Method 3, expr,
Answer is 147
21 d 7 :
Method 1, $((..)), Answer is 3
Method 2, let,
Answer is 3
Method 3, expr,
Answer is 3
operator must be a, s, m, or d, not x as supplied
x is not a, s, m, or d, aborting
Let’s go deeper and find out how to work with strings in scripts.
A string variable contains a sequence of text characters. It can include letters, numbers, symbols and punctuation marks. Some examples include: abcde, 123, abcde 123, abcde-123, &acbde=%123.
String operators include those that do comparison, sorting, and finding the length. The following table demonstrates the use of some basic string operators:
 
Operator
Meaning
[[ string1 > string2 ]]
Compares the sorting order of string1 and string2.
[[ string1 == string2 ]]
Compares the characters in string1 with the characters in string2.
myLen1=${#string1}
Saves the length of string1 in the variable myLen1.

At times, you may not need to compare or use an entire string. To extract the first n characters of a string we can specify: ${string:0:n}. Here, 0 is the offset in the string (i.e. which character to begin from) where the extraction needs to start and n is the number of characters to be extracted.
To extract all characters in a string after a dot (.), use the following expression: ${string#*.}.
 

Parts of a String
The case statement is used in scenarios where the actual value of a variable can lead to different execution paths. case statements are often used to handle command-line options.
Below are some of the advantages of using the case statement:
It is easier to read and write.
It is a good alternative to nested, multi-level if-then-else-fi code blocks.
It enables you to compare a variable against several values at once.
It reduces the complexity of a program.


Features of case Statement



Here is the basic structure of the case statement:
case expression in
   pattern1) execute commands;;
   pattern2) execute commands;;
   pattern3) execute commands;;
   pattern4) execute commands;;
   * )       execute some default commands or nothing ;;
esac

Structure of the case Statement
Here is an example of the use of a case construct. Note you can have multiple possibilities for each case value that take the same action.
 

Example of Use of the case Construct
By using looping constructs, you can execute one or more lines of code repetitively, usually on a selection of values of data such as individual files. Usually, you do this until a conditional test returns either true or false, as is required.
Three type of loops are often used in most programming languages:
for
while
until.
All these loops are easily used for repeating a set of statements until the exit condition is true.

Looping Constructs
The for loop operates on each element of a list of items. The syntax for the for loop is:
for variable-name in list
do
    execute one iteration for each item in the list until the list is finished
done
In this case, variable-name and list are substituted by you as appropriate (see examples). As with other looping constructs, the statements that are repeated should be enclosed by do and done.
The screenshot here shows an example of the for loop to print the sum of numbers 1 to 10.
 

The for Loop
The while loop repeats a set of statements as long as the control command returns true. The syntax is:
 
while condition is true
do
    Commands for execution
    ----
done
The set of commands that need to be repeated should be enclosed between do and done. You can use any command or operator as the condition. Often, it is enclosed within square brackets ([]).
The screenshot here shows an example of the while loop that calculates the factorial of a number. Do you know why the computation of 21! gives a bad result?
 

The while Loop
The until loop repeats a set of statements as long as the control command is false. Thus, it is essentially the opposite of the while loop. The syntax is:
until condition is false
do
    Commands for execution
    ----
done
Similar to the while loop, the set of commands that need to be repeated should be enclosed between do and done. You can use any command or operator as the condition.
The screenshot here shows example of the until loop that once again computes factorials; it is only slightly different than the test case for the while loop.
 

The until Loop
Before fixing an error (or bug), it is vital to know its source.
You can run a bash script in debug mode either by doing bash –x ./script_file, or bracketing parts of the script with set -x and set +x. The debug mode helps identify the error because:
It traces and prefixes each command with the + character.
It displays each command before executing it.
It can debug only selected parts of a script (if desired) with:

set -x    # turns on debugging
...
set +x    # turns off debugging
The screenshot shown here demonstrates a script which runs in debug mode if run with any argument on the command line.
 

Script Debug Mode
In UNIX/Linux, all programs that run are given three open file streams when they are started as listed in the table: 
 
File stream
Description
File Descriptor
stdin
Standard Input, by default the keyboard/terminal for programs run from the command line
0
stdout
Standard output, by default the screen for programs run from the command line
1
stderr
Standard error, where output error messages are shown or saved
2

 
Using redirection, we can save the stdout and stderr output streams to one file or two separate files for later analysis after a program or command is executed.
The screenshot shows a shell script with a simple bug, which is then run and the error output is diverted to error.log. Using cat to display the contents of the error log adds in debugging. Do you see how to fix the script?
 

Redirecting Errors to File and Screen
Consider a situation where you want to retrieve 100 records from a file with 10,000 records. You will need a place to store the extracted information, perhaps in a temporary file, while you do further processing on it.
Temporary files (and directories) are meant to store data for a short time. Usually, one arranges it so that these files disappear when the program using them terminates. While you can also use touch to create a temporary file, in some circumstances this may make it easy for hackers to gain access to your data. This is particularly true if the name and the file location of the temporary file are predictable.
The best practice is to create random and unpredictable filenames for temporary storage. One way to do this is with the mktemp utility, as in the following examples.
The XXXXXXXX is replaced by mktemp with random characters to ensure the name of the temporary file cannot be easily predicted and is only known within your program.
 
Command
Usage
TEMP=$(mktemp /tmp/tempfile.XXXXXXXX)
To create a temporary file
TEMPDIR=$(mktemp -d /tmp/tempdir.XXXXXXXX)
To create a temporary directory

Sloppiness in creation of temporary files can lead to real damage, either by accident or if there is a malicious actor. For example, if someone were to create a symbolic link from a known temporary file used by root to the /etc/passwd file, like this:
$ ln -s /etc/passwd /tmp/tempfile
 
There could be a big problem if a script run by root has a line in like this:
echo $VAR > /tmp/tempfile
The password file will be overwritten by the temporary file contents.
To prevent such a situation, make sure you randomize your temporary file names by replacing the above line with the following lines:
TEMP=$(mktemp /tmp/tempfile.XXXXXXXX)
echo $VAR > $TEMP
Note the screen capture shows similarly named temporary files from different days, but with randomly generated characters in them.
 

Example of Creating a Temporary File and Directory
Certain commands (like find) will produce voluminous amounts of output, which can overwhelm the console. To avoid this, we can redirect the large output to a special file (a device node) called /dev/null. This pseudofile is also called the bit bucket or black hole.
All data written to it is discarded and write operations never return a failure condition. Using the proper redirection operators, it can make the output disappear from commands that would normally generate output to stdout and/or stderr:
$ ls -lR /tmp > /dev/null
In the above command, the entire standard output stream is ignored, but any errors will still appear on the console. However, if one does:
$ ls -lR /tmp >& /dev/null
both stdout and stderr will be dumped into /dev/null.
 

Discarding Output with /dev/null
It is often useful to generate random numbers and other random data when performing tasks such as:
Performing security-related tasks
Reinitializing storage devices
Erasing and/or obscuring existing data
Generating meaningless data to be used for tests.
Such random numbers can be generated by using the $RANDOM environment variable, which is derived from the Linux kernel’s built-in random number generator, or by the OpenSSL library function, which uses the FIPS140 (Federal Information Processing Standard) algorithm to generate random numbers for encryption
To learn about FIPS140, read Wikipedia's "FIPS 140-2" article.
The example shows you how to easily use the environmental variable method to generate random numbers.
 

Random Numbers and Data
Some servers have hardware random number generators that take as input different types of noise signals, such as thermal noise and photoelectric effect. A transducer converts this noise into an electric signal, which is again converted into a digital number by an A-D converter. This number is considered random. However, most common computers do not contain such specialized hardware and, instead, rely on events created during booting to create the raw data needed.
Regardless of which of these two sources is used, the system maintains a so-called entropy pool of these digital numbers/random bits. Random numbers are created from this entropy pool.
The Linux kernel offers the /dev/random and /dev/urandom device nodes, which draw on the entropy pool to provide random numbers which are drawn from the estimated number of bits of noise in the entropy pool.
/dev/random is used where very high quality randomness is required, such as one-time pad or key generation, but it is relatively slow to provide values. /dev/urandom is faster and suitable (good enough) for most cryptographic purposes.
Furthermore, when the entropy pool is empty, /dev/random is blocked and does not generate any number until additional environmental noise (network traffic, mouse movement, etc.) is gathered, whereas /dev/urandom reuses the internal pool to produce more pseudo-random bits.
 

How the Kernel Generates Random Numbers
To manage printers and print directly from a computer or across a networked environment, you need to know how to configure and install a printer. Printing itself requires software that converts information from the application you are using to a language your printer can understand. The Linux standard for printing software is the Common UNIX Printing System (CUPS).
Modern Linux desktop systems make installing and administering printers pretty simple and intuitive, and not unlike how it is done on other operating systems. Nevertheless, it is instructive to understand the underpinnings of how it is done in Linux.

CUPS is the underlying software almost all Linux systems use to print from applications like a web browser or LibreOffice. It converts page descriptions produced by your application (put a paragraph here, draw a line there, and so forth) and then sends the information to the printer. It acts as a print server for both local and network printers.
Printers manufactured by different companies may use their own particular print languages and formats. CUPS uses a modular printing system which accommodates a wide variety of printers and also processes various data formats. This makes the printing process simpler; you can concentrate more on printing and less on how to print.
Generally, the only time you should need to configure your printer is when you use it for the first time. In fact, CUPS often figures things out on its own by detecting and configuring any printers it locates.

CUPS carries out the printing process with the help of its various components:
Configuration Files
Scheduler
Job Files
Log Files
Filter
Printer Drivers
Backend.
You will learn about each of these components on the next few pages.

How CUPS Works
CUPS is designed around a print scheduler that manages print jobs, handles administrative commands, allows users to query the printer status, and manages the flow of data through all CUPS components.
We will look at the browser-based interface that can be used with CUPS,  which allows you to view and manipulate the order and status of pending print jobs.
 
The print scheduler reads server settings from several configuration files, the two most important of which are cupsd.conf and printers.conf. These and all other CUPS related configuration files are stored under the /etc/cups/ directory.
cupsd.conf is where most system-wide settings are located; it does not contain any printer-specific details. Most of the settings available in this file relate to network security, i.e. which systems can access CUPS network capabilities, how printers are advertised on the local network, what management features are offered, and so on.
printers.conf is where you will find the printer-specific settings. For every printer connected to the system, a corresponding section describes the printer’s status and capabilities. This file is generated or modified only after adding a printer to the system, and should not be modified by hand.
You can view the full list of configuration files by typing ls -lF /etc/cups.
 

/etc/cups/ Directory
CUPS stores print requests as files under the /var/spool/cups directory (these can actually be accessed before a document is sent to a printer). Data files are prefixed with the letter d while control files are prefixed with the letter c.
 

/var/spool/cups Directory
 
After a printer successfully handles a job, data files are automatically removed. These data files belong to what is commonly known as the print queue.
 

Print Queue
Log files are placed in /var/log/cups and are used by the scheduler to record activities that have taken place. These files include access, error, and page records.
To view what log files exist, type:
 
$ sudo ls -l /var/log/cups
 

Viewing Log Files Using ls -l /var/log/cups
 
Note on some distributions permissions are set such that you do not need to use sudo. You can view the log files with the usual tools.
 

Viewing Log Files Using $ sudo ls -l /var/log/cups
CUPS uses filters to convert job file formats to printable formats. Printer drivers contain descriptions for currently connected and configured printers, and are usually stored under /etc/cups/ppd/. The print data is then sent to the printer through a filter, and via a backend that helps to locate devices connected to the system.
So, in short, when you execute a print command, the scheduler validates the command and processes the print job, creating job files according to the settings specified in the configuration files. Simultaneously, the scheduler records activities in the log files. Job files are processed with the help of the filter, printer driver, and backend, and then sent to the printer.

Filters, Printer Drivers, and Backends
Assuming CUPS has been installed you'll need to start and manage the CUPS daemon so that CUPS is ready for configuring a printer. Managing the CUPS daemon is simple; all management features can be done with the systemctl utility:
$ systemctl status cups
$ sudo systemctl [enable|disable] cups
$ sudo systemctl [start|stop|restart] cups
Note: The next screen demonstrates this on Ubuntu, but is the same for all major current Linux distributions. 
Each Linux distribution has a GUI application that lets you add, remove, and configure local or remote printers. Using this application, you can easily set up the system to use both local and network printers. The following screens show how to find and use the appropriate application in each of the distribution families covered in this course.
When configuring a printer, make sure the device is currently turned on and connected to the system; if so it should show up in the printer selection menu. If the printer is not visible, you may want to troubleshoot using tools that will determine if the printer is connected. For common USB printers, for example, the lsusb utility will show a line for the printer. Some printer manufacturers also require some extra software to be installed in order to make the printer visible to CUPS, however, due to the standardization these days, this is rarely required.
 

Configuring a Printer from the GUI
A fact that few people know is that CUPS also comes with its own web server, which makes a configuration interface available via a set of CGI scripts.
This web interface allows you to:
Add and remove local/remote printers
Configure printers:
– Local/remote printers
– Share a printer as a CUPS server
Control print jobs:
– Monitor jobs
– Show completed or pending jobs
– Cancel or move jobs.
The CUPS web interface is available on your browser at: http://localhost:631.
Some pages require a username and password to perform certain actions, for example to add a printer. For most Linux distributions, you must use the root password to add, modify, or delete printers or classes.
 

Screenshot of the CUPS Website
Many graphical applications allow users to access printing features using the CTRL-P shortcut. To print a file, you first need to specify the printer (or a file name and location if you are printing to a file instead) you want to use; and then select the page setup, quality, and color options. After selecting the required options, you can submit the document for printing. The document is then submitted to CUPS. You can use your browser to access the CUPS web interface at http://localhost:631/ to monitor the status of the printing job. Now that you have configured the printer, you can print using either the Graphical or Command Line interfaces.
The screenshot shows the GUI interface for CTRL-P for CentOS, other Linux distributions appear virtually identical.
 

GUI Interface for CTRL-P for CentOS
CUPS provides two command-line interfaces, descended from the System V and BSD flavors of UNIX. This means that you can use either lp (System V) or lpr (BSD) to print. You can use these commands to print text, PostScript, PDF, and image files.
These commands are useful in cases where printing operations must be automated (from shell scripts, for instance, which contain multiple commands in one file). 
lp is just a command line front-end to the lpr utility that passes input to lpr. Thus, we will discuss only lp in detail. In the example shown here, the task is to print  $HOME/.emacs .
 

Printing from the Command-Line Interface
lp and lpr accept command line options that help you perform all operations that the GUI can accomplish. lp is typically used with a file name as an argument.
Some lp commands and other printing utilities you can use are listed in the table:
 
Command
Usage
lp <filename>
To print the file to default printer
lp -d printer <filename>
To print to a specific printer (useful if multiple printers are available)
program | lp
echo string | lp
To print the output of a program
lp -n number <filename>
To print multiple copies
lpoptions -d printer
To set the default printer
lpq -a
To show the queue status
lpadmin
To configure printer queues

 
lpoptions can be used to set printer options and defaults. Each printer has a set of tags associated with it, such as the default number of copies and authentication requirements. You can type lpoptions help to obtain a list of supported options. lpoptions can also be used to set system-wide values, such as the default printer.
You send a file to the shared printer. But when you go there to collect the printout, you discover another user has just started a 200 page job that is not time sensitive. Your file cannot be printed until this print job is complete. What do you do now?
In Linux, command line print job management commands allow you to monitor the job state as well as managing the listing of all printers and checking their status, and canceling or moving print jobs to another printer.
Some of these commands are listed in the table. 
 
Command
Usage
lpstat -p -d
To get a list of available printers, along with their status
lpstat -a
To check the status of all connected printers, including job numbers
cancel job-id
OR
lprm job-id
To cancel a print job
lpmove job-id newprinter
To move a print job to new printer

PostScript is a standard  page description language. It effectively manages scaling of fonts and vector graphics to provide quality printouts. It is purely a text format that contains the data fed to a PostScript interpreter. The format itself is a language that was developed by Adobe in the early 1980s to enable the transfer of data to printers.
Features of PostScript are:
It can be used on any printer that is PostScript-compatible; i.e. any modern printer
Any program that understands the PostScript specification can print to it
Information about page appearance, etc. is embedded in the page.
Postscript has been for the most part superseded by the PDF format (Portable Document Format) which produces far smaller files in a compressed format for which support has been integrated into many applications. However, one still has to deal with postscript documents, often as an intermediate format on the way to producing final documents.

Working with PostScript and PDF
enscript is a tool that is used to convert a text file to PostScript and other formats. It also supports Rich Text Format (RTF) and HyperText Markup Language (HTML). For example, you can convert a text file to two columns (-2) formatted PostScript using the command:
$ enscript -2 -r -p psfile.ps textfile.txt
This command will also rotate (-r) the output to print so the width of the paper is greater than the height (aka landscape mode) thereby reducing the number of pages required for printing.
The commands that can be used with enscript are listed in the table below (for a file called textfile.txt).
 
Command
Usage
enscript -p psfile.ps textfile.txt
Convert a text file to PostScript (saved to psfile.ps)
enscript -n -p psfile.ps textfile.txt
Convert a text file to n columns where n=1-9 (saved in psfile.ps)
enscript textfile.txt
Print a text file directly to the default printer

Most users today are far more accustomed to working with files in PDF format, viewing them easily either on the Internet through their browser or locally on their machine. The PostScript format is still important for various technical reasons that the general user will rarely have to deal with.
From time to time, you may need to convert files from one format to the other, and there are very simple utilities for accomplishing that task. ps2pdf and pdf2ps are part of the ghostscript package installed on or available on all Linux distributions. As an alternative, there are pstopdf and pdftops which are usually part of the poppler package, which may need to be added through your package manager. Unless you are doing a lot of conversions or need some of the fancier options (which you can read about in the man pages for these utilities), it really does not matter which ones you use.
Another possibility is to use the very powerful convert program, which is part of the ImageMagick package. (Some newer distributions have replaced this with Graphics Magick, and the command to use is gm convert).
Some usage examples:
 
Command
Usage
pdf2ps file.pdf
Converts file.pdf to file.ps
ps2pdf file.ps
Converts file.ps to file.pdf
pstopdf input.ps output.pdf
Converts input.ps to output.pdf
pdftops input.pdf output.ps
Converts input.pdf to output.ps
convert input.ps output.pdf
Converts input.ps to output.pdf
convert input.pdf output.ps
Converts input.pdf to output.ps

Linux has many standard programs that can read PDF files, as well as many applications that can easily create them, including all available office suites, such as LibreOffice.
The most common Linux PDF readers are:
evince is available on virtually all distributions and the most widely used program.
okular is based on the older kpdf and available on any distribution that provides the KDE environment.
ghostView is one of the first open source PDF readers and is universally available.
xpdf is one of the oldest open source PDF readers and still has a good user base. 
All of these open source PDF readers support and can read files following the PostScript standard unlike the proprietary Adobe Acrobat Reader, which was once widely used on Linux systems, but, with the growth of these excellent programs, very few Linux users use it today.
 

At times, you may want to merge, split, or rotate PDF files; not all of these operations can be achieved while using a PDF viewer. Some of these operations include:
Merging/splitting/rotating PDF documents
Repairing corrupted PDF pages
Pulling single pages from a file
Encrypting and decrypting PDF files
Adding, updating, and exporting a PDF’s metadata
Exporting bookmarks to a text file
Filling out PDF forms.
In order to accomplish these tasks there are several programs available:
qpdf
pdftk
ghostscript.
qpdf is widely available on Linux distributions and is very full-featured. pdftk was once very popular but depends on an obsolete unmaintained package (libgcj) and a number of distributions have dropped it; thus we recommend avoiding it. Ghostscript (often invoked using gs) is widely available and well-maintained. However, its usage is a little complex.
You can accomplish a wide variety of tasks using qpdf including:
 




Command
Usage
qpdf --empty --pages 1.pdf 2.pdf -- 12.pdf
Merge the two documents 1.pdf and 2.pdf. The output will be saved to 12.pdf.
qpdf --empty --pages 1.pdf 1-2 -- new.pdf
Write only pages 1 and 2 of 1.pdf. The output will be saved to new.pdf.
qpdf --rotate=+90:1 1.pdf 1r.pdf
qpdf --rotate=+90:1-z 1.pdf 1r-all.pdf
Rotate page 1 of 1.pdf 90 degrees clockwise and save to 1r.pdf
Rotate all pages of 1.pdf 90 degrees clockwise and save to 1r-all.pdf
qpdf --encrypt mypw mypw 128 -- public.pdf private.pdf
Encrypt with 128 bits public.pdf using as the passwd mypw with output as private.pdf
qpdf --decrypt --password=mypw private.pdf file-decrypted.pdf
Decrypt private.pdf with output as file-decrypted.pdf. 

You can accomplish a wide variety of tasks using pdftk including:
 




Command
Usage
pdftk 1.pdf 2.pdf cat output 12.pdf
Merge the two documents 1.pdf and 2.pdf. The output will be saved to 12.pdf.
pdftk A=1.pdf cat A1-2 output new.pdf
Write only pages 1 and 2 of 1.pdf. The output will be saved to new.pdf.
pdftk A=1.pdf cat A1-endright output new.pdf
Rotate all pages of 1.pdf 90 degrees clockwise and save result in new.pdf.

If you’re working with PDF files that contain confidential information and you want to ensure that only certain people can view the PDF file, you can apply a password to it using the user_pw option. One can do this by issuing a command such as:
$ pdftk public.pdf output private.pdf user_pw PROMPT
When you run this command, you will receive a prompt to set the required password, which can have a maximum of 32 characters. A new file, private.pdf, will be created with the identical content as public.pdf, but anyone will need to type the password to be able to view it.
 

Encrypted PDF File
Ghostscript is widely available as an interpreter for the Postscript and PDF languages. The executable program associated with it is abbreviated to gs.
This utility can do most of the operations pdftk can, as well as many others; see man gs for details. Use is somewhat complicated by the rather long nature of the options. For example:
Combine three PDF files into one:
$ gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite  -sOutputFile=all.pdf file1.pdf file2.pdf file3.pdf
Split pages 10 to 20 out of a PDF file:
$ gs -sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dDOPDFMARKS=false -dFirstPage=10 -dLastPage=20\
-sOutputFile=split.pdf file.pdf
You can use other tools to work with PDF files, such as:
pdfinfo 
It can extract information about PDF files, especially when the files are very large or when a graphical interface is not available.
flpsed 
It can add data to a PostScript document. This tool is specifically useful for filling in forms or adding short comments into the document.
pdfmod 
It is a simple application that provides a graphical interface for modifying PDF documents. Using this tool, you can reorder, rotate, and remove pages; export images from a document; edit the title, subject, and author; add keywords; and combine documents using drag-and-drop action.
For example, to collect the details of a document, you can use the following command:
 
$ pdfinfo /usr/share/doc/readme.pdf
 

Using Additional Tools: pdfinfo, flpsed, pdfmod
The Linux kernel allows properly authenticated users to access files and applications. While each user is identified by a unique integer (the user id or UID), a separate database associates a username with each UID. Upon account creation, new user information is added to the user database and the user's home directory must be created and populated with some essential files. Command line programs such as useradd and userdel as well as GUI tools are used for creating and removing accounts. 
 

 
For each user, the following seven fields are maintained in the /etc/passwd file: 
 
Field Name
Details
Remarks
Username
User login name
Should be between 1 and 32 characters long
Password
User password (or the character x if the password is stored in the /etc/shadow file) in encrypted format
Is never shown in Linux when it is being typed; this stops prying eyes
User ID (UID)
Every user must have a user id (UID)
UID 0 is reserved for root user
UID's ranging from 1-99 are reserved for other predefined accounts
UID's ranging from 100-999 are reserved for system accounts and groups
Normal users have UID's of 1000 or greater
Group ID (GID)
The primary Group ID (GID); Group Identification Number stored in the /etc/group file
Is covered in detail in the chapter on Processes
User Info
This field is optional and allows insertion of extra information about the user such as their name
For example: Rufus T. Firefly
Home Directory
The absolute path location of user's home directory
For example: /home/rtfirefly
Shell
The absolute location of a user's default shell 
For example: /bin/bash

By default, Linux distinguishes between several account types in order to isolate processes and workloads. Linux has four types of accounts:
root
System
Normal
Network
For a safe working environment, it is advised to grant the minimum privileges possible and necessary to accounts, and remove inactive accounts. The last utility, which shows the last time each user logged into the system, can be used to help identify potentially inactive accounts which are candidates for system removal.
Keep in mind that practices you use on multi-user business systems are more strict than practices you can use on personal desktop systems that only affect the casual user. This is especially true with security. We hope to show you practices applicable to enterprise servers that you can use on all systems, but understand that you may choose to relax these rules on your own personal system.
 

last Utility
root is the most privileged account on a Linux/UNIX system. This account has the ability to carry out all facets of system administration, including adding accounts, changing user passwords, examining log files, installing software, etc. Utmost care must be taken when using this account. It has no security restrictions imposed upon it.
When you are signed in as, or acting as root, the shell prompt displays '#' (if you are using bash and you have not customized the prompt, as we have discussed previously). This convention is intended to serve as a warning to you of the absolute power of this account.

root privileges are required to perform operations such as:
Creating, removing and managing user accounts
Managing software packages
Removing or modifying system files
Restarting system services.
Regular account users of Linux distributions might be allowed to install software packages, update some settings, use some peripheral devices, and apply various kinds of changes to the system. However, root privilege is required for performing administration tasks such as restarting most services, manually installing packages and managing parts of the filesystem that are outside the normal user’s directories.

Operations Requiring root Privileges
A regular account user can perform some operations requiring special permissions; however, the system configuration must allow such abilities to be exercised.
SUID (Set owner User ID upon execution - similar to the Windows "run as" feature) is a special kind of file permission given to a file. Use of SUID provides temporary permissions to a user to run a program with the permissions of the file owner (which may be root) instead of the permissions held by the user.
The table provides examples of operations which do not require root privileges:
 
Operations that do not require Root privilege
Examples of this operation
Running a network client
Sharing a file over the network
Using devices such as printers
Printing over the network
Operations on files that the user has proper permissions to access
Accessing files that you have access to or sharing data over the network
Running SUID-root applications
Executing programs such as passwd

In Linux you can use either su or sudo to temporarily grant root access to a normal user. However, these methods are actually quite different. Listed below are the differences between the two commands:
 
su
sudo
When elevating privilege, you need to enter the root password. Giving the root password to a normal user should never, ever be done.
When elevating privilege, you need to enter the user’s password and not the root password.
Once a user elevates to the root account using su, the user can do anything that the root user can do for as long as the user wants, without being asked again for a password. 
Offers more features and is considered more secure and more configurable. Exactly what the user is allowed to do can be precisely controlled and limited. By default the user will either always have to keep giving their password to do further operations with sudo, or can avoid doing so for a configurable time interval.
The command has limited logging features.
The command has detailed logging features.

sudo has the ability to keep track of unsuccessful attempts at gaining root access. Users' authorization for using sudo is based on configuration information stored in the /etc/sudoers file and in the /etc/sudoers.d directory.
A message such as the following would appear in a system log file (usually /var/log/secure) when trying to execute sudo bash without successfully authenticating the user:
authentication failure; logname=op uid=0 euid=0 tty=/dev/pts/6 ruser=op rhost= user=op
conversation failed
auth could not identify password for [op]
op : 1 incorrect password attempt ;
TTY=pts/6 ; PWD=/var/log ; USER=root ; COMMAND=/bin/bash

sudo Features
Whenever sudo is invoked, a trigger will look at /etc/sudoers and the files in /etc/sudoers.d to determine if the user has the right to use sudo and what the scope of their privilege is. Unknown user requests and requests to do operations not allowed to the user even with sudo are reported. The basic structure of entries in these files is:
who where = (as_whom) what
/etc/sudoers contains a lot of documentation in it about how to customize. Most Linux distributions now prefer you add a file in the directory /etc/sudoers.d with a name the same as the user. This file contains the individual user's sudo configuration, and one should leave the master configuration file untouched except for changes that affect all users.
You should edit any of these configuration files by using visudo, which ensures that only one person is editing the file at a time, has the proper permissions, and refuses to write out the file and exit if there are syntax errors in the changes made. The editing can be accomplished by doing a command such as the following ones:
# visudo /etc/sudoers
# visudo -f /etc/sudoers.d/student
The actual specific editor invoked will depend on the setting of your EDITOR environment variable.
 

The sudoers File
By default, sudo commands and any failures are logged in /var/log/auth.log under the Debian distribution family, and in /var/log/messages and/or /var/log/secure on other systems. This is an important safeguard to allow for tracking and accountability of sudo use. A typical entry of the message contains:
Calling username
Terminal info
Working directory
User account invoked
Command with arguments.
Running a command such as sudo whoami results in a log file entry such as:
 
Dec 8 14:20:47 server1 sudo: op : TTY=pts/6 PWD=/var/log USER=root COMMAND=/usr/bin/whoami
 

Command Logging
Linux is considered to be more secure than many other operating systems because processes are naturally isolated from each other. One process normally cannot access the resources of another process, even when that process is running with the same user privileges. Linux thus makes it difficult (though certainly not impossible) for viruses and security exploits to access and attack random resources on a system.
More recent additional security mechanisms that limit risks even further include:
Control Groups (cgroups)
Allows system administrators to group processes and associate finite resources to each cgroup.
Containers
Makes it possible to run multiple isolated Linux systems (containers) on a single system by relying on cgroups.
Virtualization
Hardware is emulated in such a way that not only processes can be isolated, but entire systems are run simultaneously as isolated and insulated guests (virtual machines) on one physical host.

Process Isolation
Linux limits user access to non-networking hardware devices in a manner that is extremely similar to regular file access. Applications interact by engaging the filesystem layer (which is independent of the actual device or hardware the file resides on). This layer will then open a device special file (often called a device node) under the /dev directory that corresponds to the device being accessed. Each device special file has standard owner, group and world permission fields. Security is naturally enforced just as it is when standard files are accessed.
Hard disks, for example, are represented as /dev/sd*. While a root user can read and write to the disk in a raw fashion, for example, by doing something like:
 # echo hello world > /dev/sda1
The standard permissions as shown in the figure, make it impossible for regular users to do so. Writing to a device in this fashion can easily obliterate the filesystem stored on it in a way that cannot be repaired without great effort, if at all. The normal reading and writing of files on the hard disk by applications is done at a higher level through the filesystem, and never through direct access to the device node.
 

Hardware Device Access
When security problems in either the Linux kernel or applications and libraries are discovered, Linux distributions have a good record of reacting quickly and pushing out fixes to all systems by updating their software repositories and sending notifications to update immediately. The same thing is true with bug fixes and performance improvements that are not security related.
However, it is well known that many systems do not get updated frequently enough and problems which have already been cured are allowed to remain on computers for a long time; this is particularly true with proprietary operating systems where users are either uninformed or distrustful of the vendor's patching policy as sometimes updates can cause new problems and break existing operations. Many of the most successful attack vectors come from exploiting security holes for which fixes are already known but not universally deployed.
So the best practice is to take advantage of your Linux distribution's mechanism for automatic updates and never postpone them. It is extremely rare that such an update will cause new problems.

Timely System Update
The system verifies authenticity and identity using user credentials.
Originally, encrypted passwords were stored in the /etc/passwd file, which was readable by everyone. This made it rather easy for passwords to be cracked.
On modern systems, passwords are actually stored in an encrypted format in a secondary file named /etc/shadow. Only those with root access can read or modify this file.

How Passwords Are Stored
Protecting passwords has become a crucial element of security. Most Linux distributions rely on a modern password encryption algorithm called SHA-512 (Secure Hashing Algorithm 512 bits), developed by the U.S. National Security Agency (NSA) to encrypt passwords.
The SHA-512 algorithm is widely used for security applications and protocols. These security applications and protocols include TLS, SSL, PHP, SSH, S/MIME and IPSec. SHA-512 is one of the most tested hashing algorithms.
For example, if you wish to experiment with SHA-512 encoding, the word "test" can be encoded using the program sha512sum to produce the SHA-512 form (see graphic):
 

Password Encryption: sha512sum
IT professionals follow several good practices for securing the data and the password of every user.
Password aging is a method to ensure that users get prompts that remind them to create a new password after a specific period. This can ensure that passwords, if cracked, will only be usable for a limited amount of time. This feature is implemented using chage, which configures the password expiry information for a user.
Another method is to force users to set strong passwords using Pluggable Authentication Modules (PAM). PAM can be configured to automatically verify that a password created or modified using the passwd utility is sufficiently strong. PAM configuration is implemented using a library called pam_cracklib.so, which can also be replaced by pam_passwdqc.so to take advantage of more options.
One can also install password cracking programs, such as John The Ripper, to secure the password file and detect weak password entries. It is recommended that written authorization be obtained before installing such tools on any system that you do not own.
 

Using chage
You can secure the boot process with a secure password to prevent someone from bypassing the user authentication step. This can work in conjunction with password protection for the BIOS. Note that while using a bootloader password alone will stop a user from editing the bootloader configuration during the boot process, it will not prevent a user from booting from an alternative boot media such as optical disks or pen drives. Thus, it should be used with a BIOS password for full protection.
For the older GRUB 1 boot method, it was relatively easy to set a password for grub. However, for the GRUB 2 version, things became more complicated. However, you have more flexibility, and can take advantage of more advanced features, such as user-specific passwords (which can be their normal login ones.)
Furthermore, you never edit grub.cfg directly; instead, you can modify the configuration files in /etc/grub.d and /etc/defaults/grub, and then run update-grub, or grub2-mkconfig and save the new configuration file.
To learn more, read the following post: "GRUB 2 Password Protection".

When hardware is physically accessible, security can be compromised by:
Key logging
Recording the real time activity of a computer user including the keys they press. The captured data can either be stored locally or transmitted to remote machines.
Network sniffing
Capturing and viewing the network packet level data on your network.
Booting with a live or rescue disk
Remounting and modifying disk content.
Your IT security policy should start with requirements on how to properly secure physical access to servers and workstations. Physical access to a system makes it possible for attackers to easily leverage several attack vectors, in a way that makes all operating system level recommendations irrelevant.
The guidelines of security are:
Lock down workstations and servers.
Protect your network links such that it cannot be accessed by people you do not trust.
Protect your keyboards where passwords are entered to ensure the keyboards cannot be tampered with.
Ensure a password protects the BIOS in such a way that the system cannot be booted with a live or rescue DVD or USB key.
For single user computers and those in a home environment some of the above features (like preventing booting from removable media) can be excessive, and you can avoid implementing them. However, if sensitive information is on your system that requires careful protection, either it shouldn't be there or it should be better protected by following the above guidelines.
 

Hardware Vulnerability
