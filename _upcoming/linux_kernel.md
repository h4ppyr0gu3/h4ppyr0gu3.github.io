## Compiling Kernel

Start by cloning the stable kernel git, building and installing the latest stable kernel. The stable cloning step below will create a new directory named linux-stable and populate it with the sources. The stable repository has several branches going back to linux-2.6.11.y. Let’s start with the latest stable release branch. As of this writing (April 2021), it is linux-5.12.y, which is used in the following example. You can find the latest stable or a recent active kernel release.

git clone git://git.kernel.org/pub/scm/linux/kernel/git/stable/linux-stable.git linux_stable
cd linux_stable
git branch -a | grep linux-5
    remotes/origin/linux-5.12.y
    remotes/origin/linux-5.11.y
    remotes/origin/linux-5.10.y

git checkout linux-5.12.y

Starting out with the distribution configuration file is the safest approach for the very first kernel install on any system. You can do so by copying the configuration for your current kernel from /proc/config.gz or /boot. As an example, I am running Ubuntu 19.04 and config-5.0.0-21-generic is the configuration I have in /boot on my system. Pick the latest configuration you have on your system and copy that to linux_stable/.config. In the following example, config-5.0.0-21-generic is the latest kernel configuration.
```
ls /boot
config-5.0.0-20-generic        memtest86+.bin
config-5.0.0-21-generic        memtest86+.elf
efi                            memtest86+_multiboot.bin
grub                           System.map-5.0.0-20-generic
initrd.img-5.0.0-20-generic    System.map-5.0.0-21-generic
initrd.img-5.0.0-21-generic    vmlinuz-5.0.0-20-generic
lost+found                     vmlinuz-5.0.0-21-generic
```

cp /boot/<config-5.0.0-21-generic> .config

Run the following command to generate a kernel configuration file based on the current configuration. This step is important to configure the kernel, which has a good chance to work correctly on your system. You will be prompted to tune the configuration to enable new features and drivers that have been added since Ubuntu snapshot the kernel from the mainline. make all will invoke make oldconfig in any case. I am showing these two steps separately just to call out the configuration file generation step.

make oldconfig

Another way to trim down the kernel and tailor it to your system is by using make localmodconfig. This option creates a configuration file based on the list of modules currently loaded on your system.

lsmod > /tmp/my-lsmod
make LSMOD=/tmp/my-lsmod localmodconfig

Once this step is complete, it is time to compile the kernel. Using the -j option helps the compiles go faster. The -j option specifies the number of jobs (make commands) to run simultaneously:

make -j3 all

Once the kernel compilation is complete, install the new kernel:

su -c "make modules_install install"

The above command will install the new kernel and run update-grub to add the new kernel to the grub menu. Now it is time to reboot the system to boot the newly installed kernel. Before we do that, let's save logs from the current kernel to compare and look for regressions and new errors, if any. Using the -t option allows us to generate dmesg logs without the timestamps, and makes it easier to compare the old and the new.

dmesg -t > dmesg_current
dmesg -t -k > dmesg_kernel
dmesg -t -l emerg > dmesg_current_emerg
dmesg -t -l alert > dmesg_current_alert
dmesg -t -l crit > dmesg_current_crit
dmesg -t -l err > dmesg_current_err
dmesg -t -l warn > dmesg_current_warn
dmesg -t -l info > dmesg_current_info

In general, dmesg should be clean, with no emerg, alert, crit, and err level messages. If you see any of these, it might indicate some hardware and/or kernel problem.

If the dmesg_current is zero length, it is very likely that secure boot is enabled on your system. When secure boot is enabled, you won’t be able to boot the newly installed kernel, as it is unsigned. You can disable secure boot temporarily on startup with MOK manager. Your system should already have mokutil.

Let's first make sure secure boot is indeed enabled:

mokutil --sb-state

If you see the following, you are all set to boot your newly installed kernel:

SecureBoot disabled
Platform is in Setup Mode

If you see the following, disable secure boot temporarily on startup with MOK manager:

SecureBoot enabled
SecureBoot validation is disabled in shim

Disable validation:

sudo mokutil --disable-validation
root password
mok password: 12345678
mok password: 12345678
sudo reboot

The machine will reboot in a blue screen, the MOK manager menu. Type the number(s) shown on the screen: if it is 7, it is the 7th character of the password. So, keep 12345678. The question to answer is Yes to disable secure boot. Reboot.

You’ll see on startup after a new message (top left) saying <<Booting in insecure mode>>. The machine will boot normally after and secure boot remains enabled. This change is permanent, a clean install won't overwrite it. You must keep it that way.

To re-enable it (please note that you won't be able to boot the kernels you build if you re-enable):

sudo mokutil --enable-validation
root password
mok password: 12345678
mok password: 12345678
sudo reboot


A few tips and best practices for sending patches:

    Run scripts/checkpatch.pl before sending the patch. Note that checkpatch.pl might suggest changes that are unnecessary! Use your best judgement when deciding whether it makes sense to make the change checkpatch.pl suggests. The end goal is for the code to be more readable. If checkpatch.pl suggests a change and you think the end result is not more readable, don't make the change. For example, if a line is 81 characters long, but breaking it makes the resulting code look ugly, don't break that line.
    Compile and test your change.
    Document your change and include relevant testing details and results of that testing.
    Signed-off-by should be the last tag.
    As a general rule, don't include change lines in the commit log.
    Remember that good patches get accepted quicker. It is important to understand how to create good patches.
    Copy mailing lists and maintainers/developers suggested by scripts/get_maintainer.pl.
    Be patient and wait for a minimum of one week before requesting for comments. It could take longer than a week during busy periods such as the merge windows.
    Always thank the reviewers for their feedback and address them.
    Don’t hesitate to ask a clarifying question if you don’t understand the comment.
    When working on a patch based on a suggested idea, make sure to give credit using the Suggested-by tag. Other tags used for giving credit are Tested-by, Reported-by.
    Remember that the reviewers help improve code. Don’t take it personally and handle the feedback gracefully. Please don’t do top post when responding to emails. Responses should be inlined.
    Keep in mind that the community doesn’t have any obligation to accept your patch. Patches are pulled, not pushed. Always give a reason for the maintainer to take your patch.
    Be patient and be ready to make changes and working with the reviewers. It could take multiple versions before your patch gets accepted. It is okay to disagree with maintainers and reviewers. Please don't ignore a review because you disagree with it. Present your reasons for disagreeing, along with supporting technical data such as benchmarks and other improvements.
    In general, getting response and comments is a good sign that the community likes the patch and wants to see it improved. Silence is what you want to be concerned about. If you don't hear any response back from the maintainer after a week, feel free to either send the patch again, or send a gentle "ping" - something like "Hi, I know you are busy, but have you found time to look at my patch?"
    Expect to receive comments and feedback at any time during the review process.
    Stay engaged and be ready to fix problems, if any, after the patch gets accepted into linux-next for integration into the mainline. Kernel build and Continuous Integration (CI) bots and rings usually find problems.
    When a patch gets accepted, you will either see an email from the maintainer or an automated patch accepted email with information on which tree it has been applied to, and some estimate on when you can expect to see it in the mainline kernel. Not all maintainers might send an email when the patch gets merged. The patch could stay in linux-next for integration until the next merge window, before it gets into Linus's tree. Unless the patch is an actual fix to a bug in Linus's tree, in which case, it may go directly into his tree.
    Sometimes you need to send multiple related patches. This is useful for grouping, say, to group driver clean up patches for one particular driver into a set, or grouping patches that are part of a new feature into one set. git format-patch -2 -s --cover-letter --thread --subject-prefix="PATCH v3" --to= “name” --cc=” name” will create a threaded patch series that includes the top two commits and generated cover letter template. It is a good practice to send a cover letter when sending a patch series.
    Including patch series version history in the cover letter will help reviewers get a quick snapshot of changes from version to version.
    When a maintainer accepts a patch, the maintainer assumes maintenance responsibility for that patch. As a result, maintainers have decision power on how to manage patch flow into their individual sub-system(s) and they also have individual preferences. Be prepared for maintainer-to-maintainer differences in commit log content and sub-system specific coding styles.

