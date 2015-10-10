#!/bin/bash
# Configure the application in the deployment environment
# 1. Update the config.py file with appropriate values
# 2. Update the apache config to server via WSGI

if [[ `id -u` -ne 0 ]]; then
  echo "You have to execute this script as super user!"
  exit 1;
fi

ABS_PATH_FBP=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )

update_app_config () {
  CONFIG_FILE="config.py"

  # Make sure to escape the slashes in the URL, as sed will incur error if
  # slashes are not escaped..
  DS_URL="http:\/\/data.vlabs.ac.in"
  SECRET_KEY=$(date +%s | sha256sum | head -c 32)

  echo "Updating config.py.."
  sed -i "s/<data-service-URL>/$DS_URL/" $ABS_PATH_FBP/$CONFIG_FILE
  sed -i "s/SECRET_KEY = ''/SECRET_KEY = '$SECRET_KEY'/" $ABS_PATH_FBP/$CONFIG_FILE
}

update_apache_config() {
  PROC_NAME="feedback-portal"
  WSGI_SCRIPT="feedback_portal.wsgi"
  APACHE_VHOST_FILE="/etc/apache2/sites-available/default"

  sed -i "/<\/VirtualHost>/i \
    WSGIScriptAlias / $ABS_PATH_FBP/$WSGI_SCRIPT
  " $APACHE_VHOST_FILE

  #sed -i '/<\/VirtualHost>/i \
  #  WSGIDaemonProcess $PROC_NAME user=www-data group=www-data threads=5
  #  WSGIScriptAlias / $ABS_PATH_DS/$WSGI_SCRIPT

  #  <Directory $ABS_PATH_DS>
  #    WSGIProcessGroup $PROC_NAME
  #    WSGIApplicationGroup %{GLOBAL}
  #    Order deny,allow
  #    Allow from all
  #  </Directory>
  #' $APACHE_VHOST_FILE

}

update_app_config
if [[ $? -ne 0 ]]; then
  echo "FATAL: Failed to update application config.py"
  exit 1;
fi

update_apache_config
if [[ $? -ne 0 ]]; then
  echo "FATAL: Failed to update apache config"
  exit 1;
fi

service apache2 restart

exit 0;
