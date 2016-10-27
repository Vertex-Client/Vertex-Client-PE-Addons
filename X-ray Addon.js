const CONTEXT = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
    Category = {
        COMBAT: 0,
        BUILDING: 1,
        MOVEMENT: 2,
        CHAT: 3,
        MISC: 4
    },
    Launcher = {
    isBlockLauncher() {
        let packageName = CONTEXT.getPackageName();
        return (packageName == "net.zhuoweizhang.mcpelauncher" || packageName == "net.zhuoweizhang.mcpelauncher.pro");
    },
    isToolbox() {
        return CONTEXT.getPackageName() == "io.mrarm.mctoolbox";
    },
    isMcpeMaster() {
        return CONTEXT.getPackageName() == "com.mcbox.pesdkb.mcpelauncher";
    }
};

const ADDON_NAME = "X-ray Mod";
const ADDON_DESC = "X-ray Mod";
const ADDON_VERSION = "1.0";
const TARGET_VERSION = "1.7";

var modules = [];



/**
 *	CUSTOM MODULES
 */

registerModule({
    name: "AutoLevitate",
    desc: "Automatically makes you fly up in the sky.",
    category: Category.MOVEMENT,
    type: "Mod",
    state: false,
    isStateMod: function () {
        return true;
    },
    onToggle: function () {
        this.state = !this.state;
    },
    onTick: function () {
        setVelY(Player.getEntity(), 0.07);
    }
});

registerModule({
    name: "PointNuker",
    desc: "Removes blocks around the block you're looking at.",
    category: Category.BUILDING,
    type: "Mod",
    state: false,
    isStateMod: function () {
        return true;
    },
    onToggle: function () {
        this.state = !this.state;
    },
    onTick: function () {
        if (getTile(Player.getPointedBlockX(), Player.getPointedBlockY(), Player.getPointedBlockZ()) != 0) {
            callFunction("nuke", [Player.getPointedBlockX(), Player.getPointedBlockY(),
                Player.getPointedBlockZ(), 3, "cube"
            ]);
        }
    }
});

registerModule({
    name: "Heal",
    desc: "Heals you.",
    category: Category.COMBAT,
    type: "Mod",
    isStateMod: function () {
        return false;
    },
    onToggle: function () {
        Entity.setHealth(getPlayerEnt(), Entity.getMaxHealth(getPlayerEnt()));
    }
});

registerModule({
    name: "NoWeather",
    desc: "Disables weather.",
    category: Category.MISC,
    type: "Mod",
    state: false,
    isStateMod: function () {
        return true;
    },
    onToggle: function () {
        this.state = !this.state;
    },
    onTick: function () {
        if (Level.getRainLevel() > 0) {
            Level.setRainLevel(0);
        }
        if (Level.getLightningLevel() > 0) {
            Level.setLightningLevel(0);
        }
    }
});

registerModule({
    name: "Suicide",
    desc: "Kills you.",
    category: Category.COMBAT,
    type: "Mod",
    isStateMod: function () {
        return false;
    },
    onToggle: function () {
        Entity.setHealth(getPlayerEnt(), 0);
    }
});


/*
***************************************************************************************************************

Other parameters you can add to your modules are the following:

getSettingsLayout: function() {
  var settingsLayout = new LinearLayout(ctx);
  //add extra widgets (such as buttons and texts) in here, they will be displayed in a mod's ... dialog
  return settingsLayout;
},
onModDialogDismiss: function() {
  //this will be called when an user closes a mod's ... dialog
},
canBypassYesCheatPlus: function() {
  return false; //if the mod should be blocked by YesCheat+
}

If you want to store a variable in a module, simply add it like this: yourVariableName: yourVariableValue just like other parameters.
You can call this variable from within the module using this.yourVariableName.

It's still possible to use normal vars within the module's functions (onUseItem, onTick etcetera)

***************************************************************************************************************
Other functions and variables you can use in your addon are the following:
##################################
callFunction(functionName, propArray);
>> Example: callFunction("nuke", [getPlayerX(), getPlayerY(), getPlayerZ(), 3, "cube"]); <<
^^ In this example it will call Vertex Client PE's nuke function without having to copy the whole function into your addon. This also works for other functions. ^^
!! Make sure to put the parameters in an array, otherwise it won't work!
----------------------------------
Launcher.isBlockLauncher();
>> Example: Launcher.isBlockLauncher(); <<
^^ This will return true if the user uses BlockLauncher. If not, it will return false.
----------------------------------
Launcher.isToolbox();
>> Example: Launcher.isToolbox(); <<
^^ This will return true if the user uses the Toolbox launcher. If not, it will return false.
----------------------------------
Launcher.isMcpeMaster();
>> Example: Launcher.isMcpeMaster(); <<
^^ This will return true if the user uses the MCPE Master launcher. If not, it will return false.
##################################
***************************************************************************************************************

*/

/**
 *	PART 2 OF THE FUNCTION LIBRARY (DON'T EDIT)
 */

function addonLoadHook() {
    if (Launcher.isBlockLauncher() || Launcher.isToolbox()) {
        net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules]);
    } else if (Launcher.isMcpeMaster()) {
        com.mcbox.pesdk.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules]);
    }
}

function registerModule(obj) {
    obj.source = ADDON_NAME;
    modules.push(obj);
}

function callFunction(functionName, propArray) {
    if (Launcher.isBlockLauncher() || Launcher.isToolbox()) {
        net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod(functionName, propArray);
    } else if (Launcher.isMcpeMaster()) {
        com.mcbox.pesdk.mcpelauncher.ScriptManager.callScriptMethod(functionName, propArray);
    }
}