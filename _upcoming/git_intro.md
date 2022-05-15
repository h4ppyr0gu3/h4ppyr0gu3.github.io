---
layout: single
title: Git Intro
toc: true
excerpt:  Version control basically allows us to develop seperate versions of the application in a single folder
---

## Introduction

[Git](https://www.git-scm.com/docs) is a [version control](https://en.wikipedia.org/wiki/Version_control) system and so to be able to understand it we should first understand exactly what version control is.
So... Version control basically allows us to develop seperate versions of the application in a single folder, but instead of just different versions it can be a single feature that you develop on top of the same base application, which allows multiple people to contribute by having multiple feature branches touching different sections of the application.

## configuring Git 

The first requirement is the Git cli tool which on linux is available from the default package manager.
After installing git, you have to configure the global git settings which are pretty much just your name and email address so any change you make can be associated with you.
The git config file is normally in the `$HOME` directory in a hidden file named `.gitconfig`.
to set the values you can run the following commands:
```bash 
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

## Creating a Version Controlled Directory

Now that git is setup and configured we can get to work.
First, we have to create a directory and then initialize it with git:
```bash
mkdir dir_name
cd dir_name
git init
```
And that is it.




## Connecting to an Online Git Provider
