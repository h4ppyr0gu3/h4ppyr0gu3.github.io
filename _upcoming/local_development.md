---
layout: single
title: Local development
toc: true
---
# setting up NGINX

install nginx 
install dnsmasq
disable systemd-resolved
add 127.0.0.1 to /etc/resolv.conf
make dnsmasq lookup in order
this will allow custom domains on localhost and nameservers

## dnsmasq config


port=53
domain-needed
bogus-priv
address=/cooleaf.test/127.0.0.1
address=/.cooleaf.test/127.0.0.1
listen-address=127.0.0.1
bind-interfaces
