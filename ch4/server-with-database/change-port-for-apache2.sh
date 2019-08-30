#!/bin/bash
apache_port="$1"

if [ "$apache_port" == '' ]; then
  echo -e '[ERROR] Please provide the apache server port you want in the 1st argument,'
  echo -e '        if you want to use default setting (port 80), please type "d"\n'
  exit 1
elif [ "$apache_port" == 'd' ]; then
  apache_port='80'
fi

sed -i "s/^Listen .*/Listen $apache_port/g" /etc/apache2/ports.conf
service apache2 restart 

netstat -tulpn | grep LISTEN # show current used port status
