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
if(appNewUI && ZaSettings){
    if(window.console && window.console.log) console.log("Start loading com_btactic_zefagetaccount_admin.js");
    function ZefaGetaccount() {
        ZaItem.call(this,"ZefaGetaccount");
        this._init();
        this.type = "ZefaGetaccount";
    };
    ZefaGetaccount.prototype = new ZaItem;
    ZefaGetaccount.prototype.constructor = ZefaGetaccount;

    ZaZimbraAdmin._ZEFA_GETACCOUNT_VIEW = ZaZimbraAdmin.VIEW_INDEX++;

    ZaApp.prototype.getZefaGetaccountViewController =
        function() {
            if (this._controllers[ZaZimbraAdmin._ZEFA_GETACCOUNT_VIEW] == null)
                this._controllers[ZaZimbraAdmin._ZEFA_GETACCOUNT_VIEW] = new ZefaGetaccountController(this._appCtxt, this._container);
            return this._controllers[ZaZimbraAdmin._ZEFA_GETACCOUNT_VIEW];
        }

    ZefaGetaccount.TreeListener = function (ev) {
        var zefaGetaccount = new ZefaGetaccount();

        if(ZaApp.getInstance().getCurrentController()) {
            ZaApp.getInstance().getCurrentController().switchToNextView(ZaApp.getInstance().getZefaGetaccountViewController(),ZefaGetaccountController.prototype.show, [zefaGetaccount]);
        } else {
            ZaApp.getInstance().getZefaGetaccountViewController().show(zefaGetaccount);
        }
    }

    ZefaGetaccount.TreeModifier = function (tree) {
        var overviewPanelController = this ;
        if (!overviewPanelController) throw new Exception("ZefaGetaccount.TreeModifier: Overview Panel Controller is not set.");
        if(ZaSettings.ENABLED_UI_COMPONENTS[ZaSettings.Client_UPLOAD_VIEW] || ZaSettings.ENABLED_UI_COMPONENTS[ZaSettings.CARTE_BLANCHE_UI]) {
            var parentPath = ZaTree.getPathByArray([ZaMsg.OVP_home, ZaMsg.OVP_toolMig]);

            var ti = new ZaTreeItemData({
                parent:parentPath,
                id:ZaId.getTreeItemId(ZaId.PANEL_APP,"magHV",null, "ZefaGetaccountHV"),
                text: "ZEFA's Getaccount",
                mappingId: ZaZimbraAdmin._ZEFA_GETACCOUNT_VIEW});
            tree.addTreeItemData(ti);

            if(ZaOverviewPanelController.overviewTreeListeners) {
                ZaOverviewPanelController.overviewTreeListeners[ZaZimbraAdmin._ZEFA_GETACCOUNT_VIEW] = ZefaGetaccount.TreeListener;
            }
        }
    }

    if(ZaOverviewPanelController.treeModifiers)
        ZaOverviewPanelController.treeModifiers.push(ZefaGetaccount.TreeModifier);

}

