#!/bin/bash
apache_port="$1"
mysql_port="$2"
if [ "$apache_port" == '' ]; then
  echo -e '[ERROR] Please provide the apache server port you want in the 1st argument,'
  echo -e '        if you want to use default setting (port 80), please type "d"\n'
  exit 1
elif [ "$apache_port" == 'd' ]; then
  apache_port='80'
fi

if [ "$mysql_port" == '' ]; then
  echo -e '[ERROR] Please provide the mysql server port you want in the 2nd argument,'
  echo -e '        if you want to use default setting (port 3306), please type "d"\n'
  exit 1
elif [ "$mysql_port" == 'd' ]; then
  mysql_port='3306'
fi

apt-get update
apt-get install -y mysql-server # user: root , password: 1234
apt-get install -y phpmyadmin # user: phpmyadmin , password: 1234

service apache2 stop # /etc/init.d/apache2 stop
service mysql stop # /etc/init.d/mysql stop

# Let apache2 can read phpmyadmin's website.
ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin

# Change apache2 port
cp /etc/apache2/ports.conf /etc/apache2/ports.conf.default.backup
sed -i "s/^Listen .*/Listen $apache_port/g" /etc/apache2/ports.conf

# Change mysql port
cp /etc/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf.default.backup
sed -i "s/port\t\t=.*/port\t\t= $mysql_port/g" /etc/mysql/mysql.conf.d/mysqld.cnf

# Make mysql can import files from any diretory in your computer.
sed -i 's/\[mysqld\]/\[mysqld\]\nsecure-file-priv = \//g' /etc/mysql/mysql.conf.d/mysqld.cnf

service apache2 start # /etc/init.d/apache2 start
service mysql start # /etc/init.d/mysql start

netstat -tulpn | grep LISTEN # show current used port status

echo -e "\nPease open your browser and visit http://localhost:$apache_port/phpmyadmin , and use name = root and password = 1234 to login; the password is just for tutorial, in real life, please do NOT show password to others."

# Notes:
# 1. In the future, if you want to restart service without typing "stop" commands,
#    ypu can use `service apache2 restart` and `service mysql restart`
# 2. You can use the command `netstat -tulpn | grep LISTEN` to check service port listen status.
# 3. I don't do further config for myphpadimin, possible config files are:
#    1) /etc/phpmyadmin/config.inc.php
#    2) /etc/phpmyadmin/config-db.php
#    3) /usr/share/phpmyadmin/config.sample.inc.php
#    4) /var/lib/phpmyadmin/config.inc.php
#    5) /usr/share/doc/phpmyadmin/examples/config.manyhosts.inc.php
#    If something wrong, maybe the above 5 files can help.
