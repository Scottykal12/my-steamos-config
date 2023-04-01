(function (React) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    let webpackCache = {};
    let hasWebpack5 = false;
    if (window.webpackJsonp && !window.webpackJsonp.deckyShimmed) {
        // Webpack 4, currently on stable
        const wpRequire = window.webpackJsonp.push([
            [],
            { get_require: (mod, _exports, wpRequire) => (mod.exports = wpRequire) },
            [['get_require']],
        ]);
        delete wpRequire.m.get_require;
        delete wpRequire.c.get_require;
        webpackCache = wpRequire.c;
    }
    else {
        // Webpack 5, currently on beta
        hasWebpack5 = true;
        const id = Math.random();
        let initReq;
        window.webpackChunksteamui.push([
            [id],
            {},
            (r) => {
                initReq = r;
            },
        ]);
        for (let i of Object.keys(initReq.m)) {
            webpackCache[i] = initReq(i);
        }
    }
    const allModules = hasWebpack5
        ? Object.values(webpackCache).filter((x) => x)
        : Object.keys(webpackCache)
            .map((x) => webpackCache[x].exports)
            .filter((x) => x);
    const findModule = (filter) => {
        for (const m of allModules) {
            if (m.default && filter(m.default))
                return m.default;
            if (filter(m))
                return m;
        }
    };
    const findModuleChild = (filter) => {
        for (const m of allModules) {
            for (const mod of [m.default, m]) {
                const filterRes = filter(mod);
                if (filterRes) {
                    return filterRes;
                }
                else {
                    continue;
                }
            }
        }
    };
    const CommonUIModule = allModules.find((m) => {
        if (typeof m !== 'object')
            return false;
        for (let prop in m) {
            if (m[prop]?.contextType?._currentValue && Object.keys(m).length > 60)
                return true;
        }
        return false;
    });
    findModule((m) => {
        if (typeof m !== 'object')
            return false;
        for (let prop in m) {
            if (m[prop]?.toString && /Spinner\)}\),.\.createElement\(\"path\",{d:\"M18 /.test(m[prop].toString()))
                return true;
        }
        return false;
    });
    allModules.find((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.computeRootMatch)
                return true;
        }
        return false;
    });

    const ButtonItem = CommonUIModule.ButtonField ||
        Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('"highlightOnFocus","childrenContainerWidth"') ||
            mod?.render?.toString()?.includes('childrenContainerWidth:"min"'));

    const Dropdown = Object.values(CommonUIModule).find((mod) => mod?.prototype?.SetSelectedOption && mod?.prototype?.BuildMenu);
    Object.values(CommonUIModule).find((mod) => mod?.toString()?.includes('"dropDownControlRef","description"'));

    function sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }

    const [panelSection, mod] = findModuleChild((mod) => {
        for (let prop in mod) {
            if (mod[prop]?.toString()?.includes('.PanelSection')) {
                return [mod[prop], mod];
            }
        }
        return null;
    });
    const PanelSection = panelSection;
    // New as of Feb 22 2023 Beta || Old
    const PanelSectionRow = mod.PanelSectionRow ||
        Object.values(mod).filter((exp) => !exp?.toString()?.includes('.PanelSection'))[0];

    var SideMenu;
    (function (SideMenu) {
        SideMenu[SideMenu["None"] = 0] = "None";
        SideMenu[SideMenu["Main"] = 1] = "Main";
        SideMenu[SideMenu["QuickAccess"] = 2] = "QuickAccess";
    })(SideMenu || (SideMenu = {}));
    var QuickAccessTab;
    (function (QuickAccessTab) {
        QuickAccessTab[QuickAccessTab["Notifications"] = 0] = "Notifications";
        QuickAccessTab[QuickAccessTab["RemotePlayTogetherControls"] = 1] = "RemotePlayTogetherControls";
        QuickAccessTab[QuickAccessTab["VoiceChat"] = 2] = "VoiceChat";
        QuickAccessTab[QuickAccessTab["Friends"] = 3] = "Friends";
        QuickAccessTab[QuickAccessTab["Settings"] = 4] = "Settings";
        QuickAccessTab[QuickAccessTab["Perf"] = 5] = "Perf";
        QuickAccessTab[QuickAccessTab["Help"] = 6] = "Help";
        QuickAccessTab[QuickAccessTab["Decky"] = 7] = "Decky";
    })(QuickAccessTab || (QuickAccessTab = {}));
    var DisplayStatus;
    (function (DisplayStatus) {
        DisplayStatus[DisplayStatus["Invalid"] = 0] = "Invalid";
        DisplayStatus[DisplayStatus["Launching"] = 1] = "Launching";
        DisplayStatus[DisplayStatus["Uninstalling"] = 2] = "Uninstalling";
        DisplayStatus[DisplayStatus["Installing"] = 3] = "Installing";
        DisplayStatus[DisplayStatus["Running"] = 4] = "Running";
        DisplayStatus[DisplayStatus["Validating"] = 5] = "Validating";
        DisplayStatus[DisplayStatus["Updating"] = 6] = "Updating";
        DisplayStatus[DisplayStatus["Downloading"] = 7] = "Downloading";
        DisplayStatus[DisplayStatus["Synchronizing"] = 8] = "Synchronizing";
        DisplayStatus[DisplayStatus["ReadyToInstall"] = 9] = "ReadyToInstall";
        DisplayStatus[DisplayStatus["ReadyToPreload"] = 10] = "ReadyToPreload";
        DisplayStatus[DisplayStatus["ReadyToLaunch"] = 11] = "ReadyToLaunch";
        DisplayStatus[DisplayStatus["RegionRestricted"] = 12] = "RegionRestricted";
        DisplayStatus[DisplayStatus["PresaleOnly"] = 13] = "PresaleOnly";
        DisplayStatus[DisplayStatus["InvalidPlatform"] = 14] = "InvalidPlatform";
        DisplayStatus[DisplayStatus["PreloadComplete"] = 16] = "PreloadComplete";
        DisplayStatus[DisplayStatus["BorrowerLocked"] = 17] = "BorrowerLocked";
        DisplayStatus[DisplayStatus["UpdatePaused"] = 18] = "UpdatePaused";
        DisplayStatus[DisplayStatus["UpdateQueued"] = 19] = "UpdateQueued";
        DisplayStatus[DisplayStatus["UpdateRequired"] = 20] = "UpdateRequired";
        DisplayStatus[DisplayStatus["UpdateDisabled"] = 21] = "UpdateDisabled";
        DisplayStatus[DisplayStatus["DownloadPaused"] = 22] = "DownloadPaused";
        DisplayStatus[DisplayStatus["DownloadQueued"] = 23] = "DownloadQueued";
        DisplayStatus[DisplayStatus["DownloadRequired"] = 24] = "DownloadRequired";
        DisplayStatus[DisplayStatus["DownloadDisabled"] = 25] = "DownloadDisabled";
        DisplayStatus[DisplayStatus["LicensePending"] = 26] = "LicensePending";
        DisplayStatus[DisplayStatus["LicenseExpired"] = 27] = "LicenseExpired";
        DisplayStatus[DisplayStatus["AvailForFree"] = 28] = "AvailForFree";
        DisplayStatus[DisplayStatus["AvailToBorrow"] = 29] = "AvailToBorrow";
        DisplayStatus[DisplayStatus["AvailGuestPass"] = 30] = "AvailGuestPass";
        DisplayStatus[DisplayStatus["Purchase"] = 31] = "Purchase";
        DisplayStatus[DisplayStatus["Unavailable"] = 32] = "Unavailable";
        DisplayStatus[DisplayStatus["NotLaunchable"] = 33] = "NotLaunchable";
        DisplayStatus[DisplayStatus["CloudError"] = 34] = "CloudError";
        DisplayStatus[DisplayStatus["CloudOutOfDate"] = 35] = "CloudOutOfDate";
        DisplayStatus[DisplayStatus["Terminating"] = 36] = "Terminating";
    })(DisplayStatus || (DisplayStatus = {}));
    const Router = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.Navigate && m[prop]?.NavigationManager)
                return m[prop];
        }
    });
    let Navigation = {};
    try {
        (async () => {
            let InternalNavigators = {};
            if (!Router.NavigateToAppProperties || Router.deckyShim) {
                function initInternalNavigators() {
                    try {
                        InternalNavigators = findModuleChild((m) => {
                            if (typeof m !== 'object')
                                return undefined;
                            for (let prop in m) {
                                if (m[prop]?.GetNavigator) {
                                    return m[prop];
                                }
                            }
                        })?.GetNavigator();
                    }
                    catch (e) {
                        console.error('[DFL:Router]: Failed to init internal navigators, trying again');
                    }
                }
                initInternalNavigators();
                while (!InternalNavigators?.AppProperties) {
                    console.log('[DFL:Router]: Trying to init internal navigators again');
                    await sleep(100);
                    initInternalNavigators();
                }
            }
            const newNavigation = {
                Navigate: Router.Navigate?.bind(Router),
                NavigateBack: Router.WindowStore?.GamepadUIMainWindowInstance?.NavigateBack?.bind(Router.WindowStore.GamepadUIMainWindowInstance),
                NavigateToAppProperties: InternalNavigators?.AppProperties || Router.NavigateToAppProperties?.bind(Router),
                NavigateToExternalWeb: InternalNavigators?.ExternalWeb || Router.NavigateToExternalWeb?.bind(Router),
                NavigateToInvites: InternalNavigators?.Invites || Router.NavigateToInvites?.bind(Router),
                NavigateToChat: Router.NavigateToChat?.bind(Router),
                NavigateToLibraryTab: InternalNavigators?.LibraryTab || Router.NavigateToLibraryTab?.bind(Router),
                NavigateToLayoutPreview: Router.NavigateToLayoutPreview?.bind(Router),
                NavigateToSteamWeb: Router.WindowStore?.GamepadUIMainWindowInstance?.NavigateToSteamWeb?.bind(Router.WindowStore.GamepadUIMainWindowInstance),
                OpenSideMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenSideMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
                OpenQuickAccessMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenQuickAccessMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
                OpenMainMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenMainMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
                CloseSideMenus: Router.CloseSideMenus?.bind(Router),
                OpenPowerMenu: Router.OpenPowerMenu?.bind(Router),
            };
            Object.assign(Navigation, newNavigation);
        })();
    }
    catch (e) {
        console.error('[DFL:Router]: Error initializing Navigation interface', e);
    }

    const quickAccessMenuClasses = findModule((mod) => typeof mod === 'object' && mod?.Title?.includes('quickaccessmenu'));
    /**
     * @depreciated please use quickAccessMenuClasses instead
     */
    const staticClasses = quickAccessMenuClasses;
    findModule((mod) => typeof mod === 'object' && mod?.ScrollPanel?.includes('scrollpanel'));
    findModule((mod) => typeof mod === 'object' && mod?.GamepadDialogContent?.includes('gamepaddialog'));
    findModule((mod) => typeof mod === 'object' && mod?.PanelSection?.includes('quickaccesscontrols'));
    findModule((mod) => typeof mod === 'object' && mod?.OOBEUpdateStatusContainer?.includes('updaterfield'));
    findModule((mod) => typeof mod === 'object' && mod?.Container?.includes('appdetailsplaysection'));
    findModule((mod) => typeof mod === 'object' && mod?.SliderControlPanelGroup?.includes('gamepadslider'));
    findModule((mod) => typeof mod === 'object' && mod?.TopCapsule?.includes('sharedappdetailsheader'));
    findModule((mod) => typeof mod === 'object' && mod?.HeaderLoaded?.includes('appdetails_'));

    const ToggleField = Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('ToggleField,fallback'));

    // TypeScript helper function
    const definePlugin = (fn) => {
        return (...args) => {
            // TODO: Maybe wrap this
            return fn(...args);
        };
    };

    var DefaultContext = {
      color: undefined,
      size: undefined,
      className: undefined,
      style: undefined,
      attr: undefined
    };
    var IconContext = React__default["default"].createContext && React__default["default"].createContext(DefaultContext);

    var __assign = window && window.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };

    var __rest = window && window.__rest || function (s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    };

    function Tree2Element(tree) {
      return tree && tree.map(function (node, i) {
        return React__default["default"].createElement(node.tag, __assign({
          key: i
        }, node.attr), Tree2Element(node.child));
      });
    }

    function GenIcon(data) {
      return function (props) {
        return React__default["default"].createElement(IconBase, __assign({
          attr: __assign({}, data.attr)
        }, props), Tree2Element(data.child));
      };
    }
    function IconBase(props) {
      var elem = function (conf) {
        var attr = props.attr,
            size = props.size,
            title = props.title,
            svgProps = __rest(props, ["attr", "size", "title"]);

        var computedSize = size || conf.size || "1em";
        var className;
        if (conf.className) className = conf.className;
        if (props.className) className = (className ? className + ' ' : '') + props.className;
        return React__default["default"].createElement("svg", __assign({
          stroke: "currentColor",
          fill: "currentColor",
          strokeWidth: "0"
        }, conf.attr, attr, svgProps, {
          className: className,
          style: __assign(__assign({
            color: props.color || conf.color
          }, conf.style), props.style),
          height: computedSize,
          width: computedSize,
          xmlns: "http://www.w3.org/2000/svg"
        }), title && React__default["default"].createElement("title", null, title), props.children);
      };

      return IconContext !== undefined ? React__default["default"].createElement(IconContext.Consumer, null, function (conf) {
        return elem(conf);
      }) : elem(DefaultContext);
    }

    // THIS FILE IS AUTO GENERATED
    function FaVideo (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"}}]})(props);
    }

    class DeckyRecorderLogic {
        constructor(serverAPI) {
            this.pressedAt = Date.now();
            this.notify = async (message, duration = 1000, body = "") => {
                if (!body) {
                    body = message;
                }
                await this.serverAPI.toaster.toast({
                    title: message,
                    body: body,
                    duration: duration,
                    critical: true
                });
            };
            this.saveRollingRecording = async (duration) => {
                const res = await this.serverAPI.callPluginMethod('save_rolling_recording', { clip_duration: duration });
                let r = res.result;
                if (r > 0) {
                    await this.notify("Saved clip");
                }
                else if (r == 0) {
                    await this.notify("Too early to record another clip");
                }
                else {
                    await this.notify("ERROR: Could not save clip");
                }
            };
            this.toggleRolling = async (isRolling) => {
                if (!isRolling) {
                    await this.serverAPI.callPluginMethod('enable_rolling', {});
                }
                else {
                    await this.serverAPI.callPluginMethod('disable_rolling', {});
                }
            };
            this.handleButtonInput = async (val) => {
                /*
                R2 0
                L2 1
                R1 2
                R2 3
                Y  4
                B  5
                X  6
                A  7
                UP 8
                Right 9
                Left 10
                Down 11
                Select 12
                Steam 13
                Start 14
                QAM  ???
                L5 15
                R5 16*/
                for (const inputs of val) {
                    if (Date.now() - this.pressedAt < 2000) {
                        continue;
                    }
                    if (inputs.ulButtons && inputs.ulButtons & (1 << 13) && inputs.ulButtons & (1 << 4)) {
                        this.pressedAt = Date.now();
                        Router.DisableHomeAndQuickAccessButtons();
                        setTimeout(() => {
                            Router.EnableHomeAndQuickAccessButtons();
                        }, 1000);
                        const isRolling = await this.serverAPI.callPluginMethod("is_rolling", {});
                        if (isRolling.result) {
                            await this.saveRollingRecording(30);
                        }
                        else {
                            await this.notify("Enabling replay mode", 1500, "Steam + Y to save last 30 seconds");
                            this.toggleRolling(false);
                        }
                    }
                }
            };
            this.serverAPI = serverAPI;
        }
    }
    const DeckyRecorder = ({ serverAPI, logic }) => {
        const [isCapturing, setCapturing] = React.useState(false);
        const [mode, setMode] = React.useState("localFile");
        const [isRolling, setRolling] = React.useState(false);
        const [buttonsEnabled, setButtonsEnabled] = React.useState(true);
        const audioBitrateOption128 = { data: "128", label: "128 Kbps" };
        const audioBitrateOption192 = { data: "192", label: "192 Kbps" };
        const audioBitrateOption256 = { data: "256", label: "256 Kbps" };
        const audioBitrateOption320 = { data: "320", label: "320 Kbps" };
        const [audioBitrate, setAudioBitrate] = React.useState(audioBitrateOption128);
        const [localFilePath, setLocalFilePath] = React.useState("/home/deck/Videos");
        const formatOptionMp4 = { data: "mp4", label: "MP4" };
        const formatOptionMkv = { data: "mkv", label: "Matroska (.mkv)" };
        const formatOptionMov = { data: "mov", label: "QuickTime (.mov)" };
        const formatOptions = [formatOptionMp4, formatOptionMkv, formatOptionMov];
        const [localFileFormat, setLocalFileFormat] = React.useState(formatOptionMp4);
        const initState = async () => {
            const getIsCapturingResponse = await serverAPI.callPluginMethod('is_capturing', {});
            setCapturing(getIsCapturingResponse.result);
            const getIsRollingResponse = await serverAPI.callPluginMethod('is_rolling', {});
            setRolling(getIsRollingResponse.result);
            const getModeResponse = await serverAPI.callPluginMethod('get_current_mode', {});
            setMode(getModeResponse.result);
            const getAudioBitrateResponse = await serverAPI.callPluginMethod('get_audio_bitrate', {});
            const audioBitrateResponseNumber = getAudioBitrateResponse.result;
            switch (audioBitrateResponseNumber) {
                case 128:
                    setAudioBitrate(audioBitrateOption128);
                    break;
                case 192:
                    setAudioBitrate(audioBitrateOption192);
                    break;
                case 256:
                    setAudioBitrate(audioBitrateOption256);
                    break;
                case 320:
                    setAudioBitrate(audioBitrateOption320);
                    break;
                default:
                    setAudioBitrate(audioBitrateOption128);
                    break;
            }
            const getLocalFilepathResponse = await serverAPI.callPluginMethod('get_local_filepath', {});
            setLocalFilePath(getLocalFilepathResponse.result);
            const getLocalFileFormatResponse = await serverAPI.callPluginMethod('get_local_fileformat', {});
            const localFileFormatResponseString = getLocalFileFormatResponse.result;
            if (localFileFormatResponseString == "mp4") {
                setLocalFileFormat(formatOptionMp4);
            }
            else if (localFileFormatResponseString == "mkv") {
                setLocalFileFormat(formatOptionMkv);
            }
            else if (localFileFormatResponseString == "mov") {
                setLocalFileFormat(formatOptionMov);
            }
            else {
                // should never happen? default back to mp4
                setLocalFileFormat(formatOptionMp4);
            }
        };
        const recordingButtonPress = async () => {
            if (isCapturing === false) {
                setCapturing(true);
                await serverAPI.callPluginMethod('start_capturing', {});
                Router.CloseSideMenus();
            }
            else {
                setCapturing(false);
                await serverAPI.callPluginMethod('stop_capturing', {});
            }
        };
        const rollingRecordButtonPress = async (duration) => {
            setButtonsEnabled(false);
            setTimeout(() => {
                setButtonsEnabled(true);
            }, 1000);
            logic.saveRollingRecording(duration);
        };
        const shouldButtonsBeEnabled = () => {
            if (!isCapturing) {
                return false;
            }
            if (!buttonsEnabled) {
                return false;
            }
            return true;
        };
        const disableFileformatDropdown = () => {
            if (isCapturing) {
                return true;
            }
            if (isRolling) {
                return true;
            }
            return false;
        };
        const rollingToggled = async () => {
            logic.toggleRolling(isRolling);
            setCapturing(!isRolling);
            setRolling(!isRolling);
        };
        const getLabelText = () => {
            return "Recordings will be saved to " + localFilePath;
        };
        const getRecordingButtonText = () => {
            if (isCapturing === false) {
                return "Start Recording";
            }
            else {
                return "Stop Recording";
            }
        };
        React.useEffect(() => {
            initState();
        }, []);
        return (window.SP_REACT.createElement(PanelSection, null,
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(ToggleField, { label: "Replay Mode", checked: isRolling, onChange: (e) => { setRolling(e); rollingToggled(); } }),
                window.SP_REACT.createElement("div", null, "Steam + Y saves a 30 second clip in replay mode. If replay mode is off, this shortcut will enable it."),
                (!isRolling) ?
                    window.SP_REACT.createElement(ButtonItem, { label: getLabelText(), bottomSeparator: "none", layout: "below", onClick: () => {
                            recordingButtonPress();
                        } }, getRecordingButtonText()) : null),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(Dropdown, { menuLabel: "Select the video file format", disabled: disableFileformatDropdown(), strDefaultLabel: localFileFormat.label, rgOptions: formatOptions, selectedOption: localFileFormat, onChange: (newLocalFileFormat) => {
                        serverAPI.callPluginMethod('set_local_fileformat', { fileformat: newLocalFileFormat.data });
                        setLocalFileFormat(newLocalFileFormat);
                    } })),
            (isRolling)
                ? window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ButtonItem, { disabled: !shouldButtonsBeEnabled(), onClick: () => { rollingRecordButtonPress(30); } }, "30 sec")) : null,
            (isRolling)
                ? window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ButtonItem, { disabled: !shouldButtonsBeEnabled(), onClick: () => { rollingRecordButtonPress(60); } }, "1 min")) : null,
            (isRolling)
                ? window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ButtonItem, { disabled: !shouldButtonsBeEnabled(), onClick: () => { rollingRecordButtonPress(60 * 2); } }, "2 min")) : null,
            (isRolling)
                ? window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ButtonItem, { disabled: !shouldButtonsBeEnabled(), onClick: () => { rollingRecordButtonPress(60 * 5); } }, "5 min")) : null));
    };
    var index = definePlugin((serverApi) => {
        let logic = new DeckyRecorderLogic(serverApi);
        let input_register = window.SteamClient.Input.RegisterForControllerStateChanges(logic.handleButtonInput);
        return {
            title: window.SP_REACT.createElement("div", { className: staticClasses.Title }, "Decky Recorder"),
            content: window.SP_REACT.createElement(DeckyRecorder, { serverAPI: serverApi, logic: logic }),
            icon: window.SP_REACT.createElement(FaVideo, null),
            onDismount() {
                input_register.unregister();
            },
        };
    });

    return index;

})(SP_REACT);
