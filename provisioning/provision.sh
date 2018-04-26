#!/usr/bin/env bash

if [ ! ${1} ]
then
    echo "Please enter an environment (local, staging, production)" >&2
    exit 1
fi

ENVIRONMENT=${1}
APP_PATH="/srv/www"

if [ ${ENVIRONMENT} == 'local' ]
then
    APP_DOMAIN="music.local"
    PROVISION_FILES_PATH="/vagrant/provisioning"
    USER="vagrant"
elif [ ${ENVIRONMENT} == 'staging' ]
then
    APP_DOMAIN="music-staging.bythepixel.com"
    PROVISION_FILES_PATH="/home/ubuntu/provisioning"
    LETSENCRYPT_CONF_FILE="letsencrypt/staging/cli.ini"
    USER="deployer"
else
    APP_DOMAIN="music.bythepixel.com"
    PROVISION_FILES_PATH="/home/ubuntu/provisioning"
    LETSENCRYPT_CONF_FILE="letsencrypt/prod/cli.ini"
    USER="deployer"
fi

echo "Update ubuntu"
sudo apt-get update -y
sudo export DEBIAN_FRONTEND=noninteractive
sudo apt-get -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" upgrade -y

echo "Download NodeJS 10.x"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

echo "Install Nodejs"
sudo apt-get install nodejs -y > /dev/null

echo "Install Apache"
sudo apt-get install apache2 -y > /dev/null

echo "Install git"
sudo apt-get install git -y > /dev/null

echo "Install dos2unix"
sudo apt-get install dos2unix -y > /dev/null

echo "Install PHP"
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update -y
sudo apt-get install php7.2 -y > /dev/null

echo "Install PHP-CURL"
sudo apt-get install php7.2-curl -y > /dev/null

echo "Install PHP-MYSQL"
sudo apt-get install php7.2-mysql -y > /dev/null

echo "Install PHP-MBSTRING"
sudo apt-get install php7.2-mbstring -y > /dev/null

echo "Install composer globally"
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

if [ ${ENVIRONMENT} != 'local' ]
then
    echo "Create Unix User"
    # --gecos will make this interactive
    sudo adduser ${USER} --disabled-password --gecos ""

    echo "Add user to a suplementary/secondary group called 'sudo'"
    sudo usermod -a -G sudo ${USER}

    echo "Make sure sudoers can sudo without password by adding to sudoers"
    sudo sed -i -r "s/%sudo\t*\s*ALL=\(ALL:ALL\)\t*\s*ALL/%sudo ALL=\(ALL:ALL\) NOPASSWD: ALL/" /etc/sudoers

    echo "Add our list of keys so we can login as specified user"
    sudo mkdir /home/${USER}/.ssh
    sudo cp ${PROVISION_FILES_PATH}/public_keys /home/${USER}/.ssh/authorized_keys
    sudo chown -R ${USER}:${USER} /home/${USER}/.ssh

    echo "Disable root ssh access"
    sudo sed -i "s/PermitRootLogin prohibit-password/PermitRootLogin no/" /etc/ssh/sshd_config
    sudo service ssh restart
fi

echo "Copy php config files to /etc/php"
sudo cp ${PROVISION_FILES_PATH}/php/php.ini /etc/php/7.2/apache2/php.ini

echo "Remove boilerplate site"
sudo rm /etc/apache2/sites-available/000-default.conf
sudo rm /etc/apache2/sites-enabled/000-default.conf

echo "Copy apache config files to /etc/apache2"
sudo cp ${PROVISION_FILES_PATH}/apache2/apache2.conf /etc/apache2


sudo sed -i -r "s/\{USER\}/$USER/" /etc/apache2/apache2.conf
sudo cp ${PROVISION_FILES_PATH}/apache2/000-default.conf /etc/apache2/sites-available

echo "Install MySQL Client in a Non-Interactive mode. Default root password will be \"root\""
echo "mysql-server mysql-server/root_password password root" | sudo debconf-set-selections
echo "mysql-server mysql-server/root_password_again password root" | sudo debconf-set-selections
sudo apt-get install mysql-client -y

if [ ${ENVIRONMENT} == 'local' ]
then
    echo "Local environment detected"
    echo "symlink our shared folders to where we are serving out of"
    sudo rm -rf ${APP_PATH}
    sudo ln -sfn /vagrant ${APP_PATH}

    echo "Install MySQL Server"
    sudo apt-get install mysql-server -y

    mysql -uroot -proot --execute="CREATE DATABASE musicapp"
else
    echo "Non-local environment detected"
    echo "Setting up a git-hook deploy process"
    sudo git init ${APP_PATH}
    sudo cp ${PROVISION_FILES_PATH}/git/config ${APP_PATH}/.git/config
    sudo cp ${PROVISION_FILES_PATH}/git/post-receive ${APP_PATH}/.git/hooks/post-receive
    sudo chmod g+x ${APP_PATH}/.git/hooks/post-receive
    sudo dos2unix ${APP_PATH}/.git/hooks/post-receive # because windoz
fi

echo "Ensure read/write permissions are owned by Deployer"
sudo chown -R ${USER}:${USER} "$APP_PATH"

sudo a2enmod \
    headers \
    rewrite

echo "Restart both services"
sudo service apache2 restart