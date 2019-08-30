#!/bin/bash
mysql_port="$1"

if [ "$mysql_port" == '' ]; then
  echo -e '[ERROR] Please provide the mysql server port you want in the 2nd argument,'
  echo -e '        if you want to use default setting (port 3306), please type "d"\n'
  exit 1
elif [ "$mysql_port" == 'd' ]; then
  mysql_port='3306'
fi

sed -i "s/port\t\t=.*/port\t\t= $mysql_port/g" /etc/mysql/mysql.conf.d/mysqld.cnf
service mysql restart 

netstat -tulpn | grep LISTEN # show current used port status
