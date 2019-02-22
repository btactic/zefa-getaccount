/*
Copyright (C) 2019 BTACTIC,SCCL

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
 */
ZaZefaGetacountTab = function(parent, entry) {
    if (arguments.length == 0) return;
    ZaTabView.call(this, parent,"ZaZefaGetacountTab");
    ZaTabView.call(this, {
        parent:parent,
        iKeyName:"ZaZefaGetacountTab",
        contextId:"ZEFA_GETACCOUNT"
    });
    this.setScrollStyle(Dwt.SCROLL);

    var soapDoc = AjxSoapDoc.create("ZefaGetacount", "urn:ZefaGetacount", null);
    soapDoc.getMethod().setAttribute("action", "getAccounts");
    var csfeParams = new Object();
    csfeParams.soapDoc = soapDoc;
    csfeParams.asyncMode = true;
    csfeParams.callback = new AjxCallback(ZaZefaGetacountTab.prototype.getAccountsCallback);
    var reqMgrParams = {} ;
    resp = ZaRequestMgr.invoke(csfeParams, reqMgrParams);

    document.getElementById('ztab__ZEFA_GETACCOUNT').innerHTML = '<div style="padding-left:10px"><h1>ZEFAs Getaccount extension</h1>' +
    '<h2>Create and remove shares</h2>This option allows you to share an entire account with another account. Useful for department and team mailboxes.<br><br><select id="ZefaGetacount-action" onchange="ZaZefaGetacountTab.prototype.uiUpdate(this.value);" ><option value="createShare">Share</option><option value="removeShare">Unshare</option></select> the account <input type="text" id="ZefaGetacount-account-a" list="ZefaGetacount-datalist" placeholder="user@domain.com">&nbsp;<span id="ZefaGetacount-withfrom">with</span>:&nbsp;<input type="text" id="ZefaGetacount-account-b" list="ZefaGetacount-datalist" placeholder="other-user@domain.com"><datalist id="ZefaGetacount-datalist"></datalist>&nbsp;&nbsp;<button id="ZefaGetacount-btnCreateShare">OK</button>' +
    '<br><br><input type="checkbox" id="ZefaGetacount-disablePersonaCreation">Share only (skip configuring sendAs/persona\'s and mail filter).' +
    '<br><br><b>Permissions:</b>' +
    '<br><select onchange="ZaZefaGetacountTab.prototype.uiUpdate(this.value);" id="ZefaGetacount-permissions">'+
    '<option value="r">r</option>' +
    '<option value="rw">rw</option>' +
    '<option value="rwix">rwix</option>' +
    '<option selected="selected" value="rwixd">rwixd</option>' +
    '<option value="rwixda">rwixda</option>' +
    '<option value="none">none</option></select>' +    
    '<small style="font-size:11px;"><ul><li> (r)ead - search, view overviews and items</li><li> (w)rite - edit drafts/contacts/notes, set flags </li><li> (i)nsert - copy/add to directory, create subfolders action</li><li> (x) - workflow actions, like accepting appointments</li><li> (d)elete - delete items and subfolders, set \Deleted flag</li><li> (a)dminister - delegate admin and change permissions</li></ul></small>' +
    '<br><hr>' +
    '<h2>Generate persona\'s</h2>This option allows you to generate a persona for each alias in the users account. <br><br><input type="text" id="ZefaGetacount-account-c" list="ZefaGetacount-datalist" placeholder="user@domain.com">&nbsp;&nbsp;<button id="ZefaGetacount-btnPersonaGen">OK</button>' +
    '<br><br><hr>' +
    '<h2>Status</h2><div id="ZefaGetacount-status" style="color:#aaaaaa; font-style: italic;"></div></div>';   
    
    ZaZefaGetacountTab.prototype.status('Loading auto completion...');
    
    var btnCreateShare = document.getElementById('ZefaGetacount-btnCreateShare');
    btnCreateShare.onclick = AjxCallback.simpleClosure(this.btnCreateRemoveShare);
    
    var btnPersonaGen = document.getElementById('ZefaGetacount-btnPersonaGen');
    btnPersonaGen.onclick = AjxCallback.simpleClosure(this.btnPersonaGen);
}


ZaZefaGetacountTab.prototype = new ZaTabView();
ZaZefaGetacountTab.prototype.constructor = ZaZefaGetacountTab;

ZaZefaGetacountTab.prototype.getTabIcon =
    function () {
        return "ClientUpload" ;
    }

ZaZefaGetacountTab.prototype.getTabTitle =
    function () {
        return "Share Toolkit";
    }

ZaZefaGetacountTab.prototype.getAccountsCallback = function (result) {
   var dataList = document.getElementById('ZefaGetacount-datalist');
   var users = result._data.Body.ZefaGetacountResponse.zefaGetaccountResult._content.split(";");
   
   users.sort();
   users.forEach(function(item) 
   {
      // Create a new <option> element.
      var option = document.createElement('option');
      // Set the value using the item in the JSON array.
      option.value = item;
      // Add the <option> element to the <datalist>.
      dataList.appendChild(option);
   });
   ZaZefaGetacountTab.prototype.status('Ready.');
   return;
}

ZaZefaGetacountTab.prototype.btnCreateRemoveShare = function () {
    if(document.getElementById('ZefaGetacount-action').value == 'createShare')
    {
       ZaZefaGetacountTab.prototype.status('Creating share...');
    }
    else
    {
       ZaZefaGetacountTab.prototype.status('Removing share...');
    }   
    var accountA = document.getElementById('ZefaGetacount-account-a').value;
    var accountB = document.getElementById('ZefaGetacount-account-b').value;
    var skipPersonaCreation = document.getElementById('ZefaGetacount-disablePersonaCreation').checked;
    var permissions = document.getElementById('ZefaGetacount-permissions').value;
    
    if(accountA && accountB && (accountA !== accountB))
    {
       var soapDoc = AjxSoapDoc.create("ZefaGetacount", "urn:ZefaGetacount", null);
       soapDoc.getMethod().setAttribute("action", document.getElementById('ZefaGetacount-action').value);
       soapDoc.getMethod().setAttribute("accounta", accountA);
       soapDoc.getMethod().setAttribute("accountb", accountB);
       soapDoc.getMethod().setAttribute("skipPersonaCreation", skipPersonaCreation);
       soapDoc.getMethod().setAttribute("permissions", permissions);
       var csfeParams = new Object();
       csfeParams.soapDoc = soapDoc;
       csfeParams.asyncMode = true;
       csfeParams.callback = new AjxCallback(ZaZefaGetacountTab.prototype.zefaGetaccountDefaultCallback);
       var reqMgrParams = {} ;
       resp = ZaRequestMgr.invoke(csfeParams, reqMgrParams);
    }   
    else
    {
       ZaZefaGetacountTab.prototype.status('Select or type 2 different email addresses.');
    }
}   

ZaZefaGetacountTab.prototype.btnPersonaGen = function () {
    ZaZefaGetacountTab.prototype.status('Creating persona\'s...');

    var accountA = document.getElementById('ZefaGetacount-account-c').value;
  
    if(accountA)
    {
       var soapDoc = AjxSoapDoc.create("ZefaGetacount", "urn:ZefaGetacount", null);
       soapDoc.getMethod().setAttribute("action", "createPersonas");
       soapDoc.getMethod().setAttribute("accounta", accountA);
       var csfeParams = new Object();
       csfeParams.soapDoc = soapDoc;
       csfeParams.asyncMode = true;
       csfeParams.callback = new AjxCallback(ZaZefaGetacountTab.prototype.zefaGetaccountDefaultCallback);
       var reqMgrParams = {} ;
       resp = ZaRequestMgr.invoke(csfeParams, reqMgrParams);
    }   
    else
    {
       ZaZefaGetacountTab.prototype.status('Select or type email address.');
    }
}   
  
   
ZaZefaGetacountTab.prototype.zefaGetaccountDefaultCallback = function (result) {
   ZaZefaGetacountTab.prototype.status('Ready. '+result._data.Body.ZefaGetacountResponse.zefaGetaccountResult._content);
}  

ZaZefaGetacountTab.prototype.status = function (statusText) {
   document.getElementById('ZefaGetacount-status').innerHTML = statusText;
}

ZaZefaGetacountTab.prototype.uiUpdate = function (value) {
   if(value == 'createShare')
   {
      document.getElementById('ZefaGetacount-withfrom').innerHTML = 'with';
      document.getElementById('ZefaGetacount-permissions').value = 'rwixd';
      document.getElementById('ZefaGetacount-permissions').disabled = false;
   }
   else if(value == 'none')
   {
      document.getElementById('ZefaGetacount-withfrom').innerHTML = 'from';
      document.getElementById('ZefaGetacount-permissions').value = 'none';
      document.getElementById('ZefaGetacount-permissions').disabled = true;
      document.getElementById('ZefaGetacount-action').value = 'removeShare';
   }
   else if(value == 'removeShare')
   {
      document.getElementById('ZefaGetacount-withfrom').innerHTML = 'from';
      document.getElementById('ZefaGetacount-permissions').value = 'none';
      document.getElementById('ZefaGetacount-permissions').disabled = true;
   }
}
