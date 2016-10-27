/**
 * @file X-ray Addon for Vertex Client PE
 * @author Astro <astr36@naver.com>
 * @version 1.0
 * @license GPL-3.0
 */
const ADDON_NAME = "X-ray Mod",
    ADDON_DESC = "X-ray Mod",
    ADDON_VERSION = "1.0",
    TARGET_VERSION = "1.7",
    BLOCK_ORES = [14, 15, 16, 56, 73, 74],
    CONTEXT = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
    Category = {
        COMBAT: 0,
        BUILDING: 1,
        MOVEMENT: 2,
        CHAT: 3,
        MISC: 4
    },
    Launcher = {
        isBlockLauncher() {
            var packageName = CONTEXT.getPackageName();
            return packageName.contains("net.zhuoweizhang.mcpelauncher");
        },
        isToolbox() {
            return CONTEXT.getPackageName().equals("io.mrarm.mctoolbox");
        },
        isMcpeMaster() {
            return CONTEXT.getPackageName().equals("com.mcbox.pesdkb.mcpelauncher");
        }
    };

var modules = [];

function registerModule(obj) {
    obj.source = ADDON_NAME;
    modules.push(obj);
}

function addonLoadHook() {
    if (Launcher.isBlockLauncher() || Launcher.isToolbox()) {
        net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules]);
    } else if (Launcher.isMcpeMaster()) {
        com.mcbox.pesdk.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules]);
    }
}

function callFunction(functionName, propArray) {
    if (Launcher.isBlockLauncher() || Launcher.isToolbox()) {
        net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod(functionName, propArray);
    } else if (Launcher.isMcpeMaster()) {
        com.mcbox.pesdk.mcpelauncher.ScriptManager.callScriptMethod(functionName, propArray);
    }
}

registerModule({
    name: "X-ray",
    desc: "Enables X-ray.",
    category: Category.COMBAT,
    type: "Mod",
    state: false,
    isStateMod() {
        return true;
    },
    onToggle() {
        this.state = !this.state;
        if (this.state) {
            for (var i = 1; i < 256; i++) {
                if (BLOCK_ORES.indexOf(i) < 0) {
                    Block.setShape(i, 0, 0.99, 0, 1, 1, 1);
                    Block.setLightOpacity(i, 0);
                } else {
                    if (i === 73 || i === 74) {
                        Block.setLightLevel(i, 12);
                    } else {
                        Block.setLightLevel(i, 15);
                    }
                    Block.setShape(i, 0.001, 0.001, 0.001, 0.999, 0.999, 0.999);
                }
            }
        } else {
        print("off")
            for (var j = 1; j < 256; j++) {
                if (BLOCK_ORES.indexOf(j) < 0) {
                    Block.setShape(j, 0, 0, 0, 1, 1, 1);
                    Block.setLightOpacity(j, 1);
                } else {
                    Block.setLightLevel(j, 0.1);
                    Block.setShape(j, 0, 0, 0, 1, 1, 1);
                }
            }
        }
    }
});