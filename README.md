ZEFA Getaccount extension
==========

Getaccount details from Zimbra UI

Designed for Zimbra version 8.8.

Bugs and feedback: https://github.com/btactic/zefa-getaccount/issues


========================================================================

### Install prerequisites
  - No special requirements

### Installing
Use the automated installer:

    wget https://raw.githubusercontent.com/btactic/zefa-getaccount/master/zefa-getaccount-installer.sh -O /tmp/zefa-getaccount-installer.sh
    chmod +rx /tmp/zefa-getaccount-installer.sh
    /tmp/zefa-getaccount-installer.sh


========================================================================

### Screenshot of Admin Zimlet and extension
No need to have CLI access to create/revoke root shares.
![alt tag](https://raw.githubusercontent.com/btactic/zefa-getaccount/master/help/admin-zimlet.png)

### Screenshot of the installer
![alt tag](https://raw.githubusercontent.com/btactic/zefa-getaccount/master/help/installer.png)

### CLI Commands
Installed in /usr/local/sbin an can be run as user `zimbra`:
* `getaccount`: zmprov getAccount equivalent

### Enable the Admin Zimlet for delegated admins

    zmprov ma testadmin@example.com +zimbraAdminConsoleUIComponents zimbraClientUploadView
    zmprov grr global usr testadmin@example.com adminConsoleClientUploadRights
    zmprov fc all

### License

Copyright (C) 2019 BTACTIC,SCCL [BTACTIC](http://www.btactic.com/)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
