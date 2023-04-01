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

    const Field = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.render?.toString().includes('"shift-children-below"'))
                return m[prop];
        }
    });

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

    const SliderField = Object.values(CommonUIModule).find((mod) => mod?.toString()?.includes('SliderField,fallback'));

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
      // eslint-disable-next-line react/display-name
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
        if (props.className) className = (className ? className + " " : "") + props.className;
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
    function GiDrill (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M48.148 49c-9 0-14.776 3.864-19.793 11.29-5.017 7.424-8.323 18.56-9.234 30.4-.91 11.838.52 24.33 3.814 34.214 3.079 9.236 7.783 15.602 12.288 18.367 28.96 2.58 66.314 2.689 82.671 28.96 11.82 42.442-15.348 94.133-25.816 130.769h74.55l-5.064-89.941 23.168-4.729 14.12-58.926 64.296 7.219V49zm233 0v98.916l30-.453V49zm48 16v62h30V65zm-274 2h178v60h-178zm322 .525v56.95l46-11.5v-33.95zM73.148 85v24h142V85zm368 0v18h52V85h-9zm-228.5 84.064l-8.841 36.907 17.925-1.532c-1.87-15.08 1.338-23.637 10.96-33.125zM89.148 321v32H52.965l-20 30h244.879l-11.823-30h-98.873v-32zm-64 80v62h237.608l16.584-62z"}}]})(props);
    }function GiDynamite (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M280 67.77c-2.8 2.78-4.1 9.46-.7 20.04 3.4 10.59 11.3 23.59 22.8 35.39 11.5 11.7 24.3 19.9 34.9 23.5 10.5 3.7 17.2 2.4 20-.3 2.8-2.8 4.2-9.5.8-20.1-3.4-10.6-11.3-23.6-22.8-35.32-11.6-11.76-24.4-19.94-34.9-23.57-6.2-1.5-15-4.44-20.1.36zm89.1-1.84c-4 0-6.9 1.05-8.5 2.62-2.8 2.78-4.1 9.45-.7 20.04 3.4 10.58 11.3 23.61 22.8 35.31 11.5 11.8 24.3 20 34.9 23.6 10.5 3.6 17.2 2.4 20-.4 2.8-2.7 4.2-9.4.8-20-3.4-10.6-11.3-23.6-22.8-35.35-11.6-11.76-24.4-19.94-34.9-23.56-4.6-1.59-8.5-2.25-11.6-2.26zM260.4 86.97l-31.2 30.63c5.8 17.4 13.4 32.7 24.2 44.8 12.8 14.5 29.9 24.9 55.1 29.7l1.5.3 27.4-26.8c-2.1-.5-4.2-1.1-6.3-1.9-14-4.8-28.7-14.4-41.9-27.9-13.2-13.5-22.5-28.4-27.1-42.48-.7-2.18-1.2-4.44-1.7-6.35zm-58.3 57.13L81.3 262.4c5.7 16.5 13.2 31.1 23.5 42.7 12.8 14.5 29.9 24.9 55.1 29.7l4 .7 118-115.6c-37-11.4-63-38.6-79.8-75.8zm180 13.8c-4 0-6.9 1-8.5 2.6-2.8 2.8-4.1 9.5-.7 20 3.4 10.6 11.3 23.6 22.8 35.4 11.5 11.8 24.3 19.9 34.9 23.6 10.5 3.6 17.2 2.4 20-.4.7-.7 1.3-1.6 1.8-2.8 13.2 11.3 24.3 26.2 25.3 35.8 1.3 11.7-3.5 21.7-12.8 32.4-9.4 10.7-23.2 21.2-37.4 32-14.1 10.7-28.5 21.6-39.3 34.4-10.7 12.9-17.9 28.7-14.7 46.4 2.9 15.6 11.3 31.8 25.1 42.9 13.7 11.2 33.4 16.8 55.1 9.7l8.6-2.8-5.6-17.1-8.6 2.8c-16.3 5.3-28.4 1.5-38.2-6.5-9.8-8-16.6-20.9-18.6-32.2-2.1-11.6 1.9-21.1 10.7-31.6 8.9-10.5 22.4-21 36.4-31.7 14.1-10.7 28.8-21.7 40-34.5 11.2-12.7 19.2-28.3 17.2-46.1-2.2-20.4-18.9-37.8-35.6-51-4-3.2-8.1-6.1-12.1-8.6-4.2-8.6-10.7-18.1-19.3-26.9-11.6-11.8-24.4-19.9-34.9-23.6-4.6-1.5-8.5-2.2-11.6-2.2zM354 179.7l-27.3 26.8.2 1.5c4.2 25.3 14.3 42.7 28.5 55.8 11.9 11 27.1 19 44.3 25.1l31.3-30.6c-2.1-.5-4.2-1.1-6.3-1.8-14-4.8-28.7-14.5-41.9-28s-22.5-28.4-27.1-42.4c-.7-2.2-1.2-4.3-1.7-6.4zM298.6 234L180.5 349.6l.7 4c4.1 25.3 14.2 42.6 28.5 55.7 11.4 10.6 25.7 18.4 42.2 24.4l120-117.5c-36.8-17.8-63.1-44.6-73.3-82.2zM55.68 287.5c-11.64 9-23.69 22.4-34.25 33.5-2.84 2.8-4.19 9.5-.79 20.1 3.41 10.6 11.32 23.6 22.83 35.3 11.52 11.8 24.36 20 34.87 23.6 10.51 3.6 17.21 2.4 20.04-.4 12.72-12.3 25.72-25.1 36.62-35.8-36.88-11.6-62.65-38.9-79.32-76.3zm95.12 91.2c-12.2 11.4-20.2 19.3-35.8 35.1-2.8 2.8-4.2 9.4-.8 20 3.4 10.6 11.3 23.6 22.8 35.4 11.6 11.7 24.4 19.9 34.9 23.5 10.5 3.7 17.2 2.5 20.1-.3 11.3-10.6 21.6-21.2 32.4-31.8-36.8-17.8-63.2-44.5-73.6-81.9z"}}]})(props);
    }function GiTimeBomb (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M104.53 28.72c-.676 0-1.356.012-2.03.03-16.186.435-31.577 6.108-44.375 15.25-34.13 24.378-50.547 75.233-18.563 118.72 25.234 34.303 14.237 79.597-11.874 104.905l13.03 13.406c32.24-31.247 45.253-86.76 13.907-129.374C28.415 116.022 42.253 78.324 69 59.22c13.374-9.554 29.767-14.01 46.28-10.75 15.853 3.126 32.335 13.31 46.907 35l-59.875 34.655 24.344 42.28c-49.898 63.943-58.988 154.445-16 229.126 56.487 98.133 181.517 131.802 279.281 75.19 97.765-56.614 131.237-182.057 74.75-280.19-42.912-74.55-125.41-111.868-205.437-100.686l-24.438-42.438-56.437 32.657c-16.916-25.592-38.054-39.714-59.47-43.938-4.813-.95-9.63-1.405-14.374-1.406zm170.126 81.124c79.9 0 144.813 64.347 144.813 144.25 0 79.9-64.913 144.844-144.814 144.844-79.9 0-144.25-64.945-144.25-144.844 0-79.9 64.35-144.25 144.25-144.25zm-9.094 25.187v88.19c-13.248 4.192-23.156 16.79-23.156 31.218 0 17.726 14.962 32.125 32.688 32.125 16.82 0 30.63-12.968 32-29.438l76.53-54.875-10.905-15.188-70.283 50.407c-4.103-6.774-10.542-11.993-18.187-14.345V135.03h-18.688zm-42.187 11.314l-16.188 9.344 14.344 24.843 16.19-9.374-14.345-24.812zm103.063 0l-14.344 24.812 16.187 9.375 14.345-24.843-16.188-9.343zm-150.125 40.22l-9.344 16.186 24.81 14.344 9.345-16.188-24.813-14.344zm98.78 53.874c7.628 0 13.438 6.375 13.438 14 0 7.626-5.81 13.437-13.436 13.437-7.627 0-14-5.81-14-13.438 0-7.626 6.372-14 14-14zm-119.437 4.5v18.687h28.656v-18.688h-28.656zm209.813 0v18.687h28.686v-18.688H365.47zM191.78 291.5l-24.81 14.313L176.312 322l24.812-14.344-9.344-16.156zm166.25 0l-9.342 16.156L373.5 322l9.344-16.188L358.03 291.5zm-136.5 36.563l-14.343 24.812 16.188 9.344 14.344-24.814-16.19-9.344zm106.75 0l-16.186 9.343 14.344 24.813 16.187-9.345-14.344-24.813zm-62.717 16.812v28.656h18.687v-28.655h-18.688z"}}]})(props);
    }function GiTimeTrap (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M255.656 22.75c-131.173 0-237.72 33.326-237.72 74.344.002 22.39 32.41 42.59 82.564 56.22-17.407-8.91-27.53-19.216-27.53-30.47 0-32.128 81.75-58.53 182.686-58.53 100.937 0 183.25 26.4 183.25 58.53 0 11.194-10.3 21.59-27.53 30.47 49.843-13.627 81.968-33.91 81.968-56.22 0-41.018-106.514-74.344-237.688-74.344zM147.47 103.094v30.094h216.28v-30.094H147.47zm4.374 48.78V361.94h18.687V151.875h-18.686zm39.125 0c.698 61.812 25.325 96.435 52.81 103.814-27.847 7.475-52.776 42.9-52.843 106.25h128.188c-.066-63.353-24.952-98.766-52.78-106.25 27.468-7.386 52.05-41.998 52.75-103.813H190.968zm147.936 0V361.94h18.688V151.875h-18.688zM100.5 360.72c-50.153 13.626-82.563 33.827-82.563 56.217 0 41.018 106.546 74.344 237.72 74.344 131.173 0 237.687-33.325 237.687-74.342 0-22.31-32.125-42.593-81.97-56.22 17.232 8.88 27.532 19.244 27.532 30.438 0 32.13-82.313 58.563-183.25 58.563S72.97 423.283 72.97 391.155c0-11.254 10.123-21.528 27.53-30.437zm46.97 19.905v30.063h216.28v-30.063H147.47z"}}]})(props);
    }

    let wasm;

    const heap = new Array(128).fill(undefined);

    heap.push(undefined, null, true, false);

    function getObject(idx) { return heap[idx]; }

    let heap_next = heap.length;

    function dropObject(idx) {
        if (idx < 132) return;
        heap[idx] = heap_next;
        heap_next = idx;
    }

    function takeObject(idx) {
        const ret = getObject(idx);
        dropObject(idx);
        return ret;
    }

    const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

    cachedTextDecoder.decode();

    let cachedUint8Memory0 = null;

    function getUint8Memory0() {
        if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
            cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
        }
        return cachedUint8Memory0;
    }

    function getStringFromWasm0(ptr, len) {
        return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
    }

    function addHeapObject(obj) {
        if (heap_next === heap.length) heap.push(heap.length + 1);
        const idx = heap_next;
        heap_next = heap[idx];

        heap[idx] = obj;
        return idx;
    }

    let WASM_VECTOR_LEN = 0;

    const cachedTextEncoder = new TextEncoder('utf-8');

    const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
        ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
        : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });

    function passStringToWasm0(arg, malloc, realloc) {

        if (realloc === undefined) {
            const buf = cachedTextEncoder.encode(arg);
            const ptr = malloc(buf.length);
            getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
            WASM_VECTOR_LEN = buf.length;
            return ptr;
        }

        let len = arg.length;
        let ptr = malloc(len);

        const mem = getUint8Memory0();

        let offset = 0;

        for (; offset < len; offset++) {
            const code = arg.charCodeAt(offset);
            if (code > 0x7F) break;
            mem[ptr + offset] = code;
        }

        if (offset !== len) {
            if (offset !== 0) {
                arg = arg.slice(offset);
            }
            ptr = realloc(ptr, len, len = offset + arg.length * 3);
            const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
            const ret = encodeString(arg, view);

            offset += ret.written;
        }

        WASM_VECTOR_LEN = offset;
        return ptr;
    }

    function isLikeNone(x) {
        return x === undefined || x === null;
    }

    let cachedInt32Memory0 = null;

    function getInt32Memory0() {
        if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
            cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
        }
        return cachedInt32Memory0;
    }

    let cachedFloat64Memory0 = null;

    function getFloat64Memory0() {
        if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
            cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
        }
        return cachedFloat64Memory0;
    }

    function makeMutClosure(arg0, arg1, dtor, f) {
        const state = { a: arg0, b: arg1, cnt: 1, dtor };
        const real = (...args) => {
            // First up with a closure we increment the internal reference
            // count. This ensures that the Rust closure environment won't
            // be deallocated while we're invoking it.
            state.cnt++;
            const a = state.a;
            state.a = 0;
            try {
                return f(a, state.b, ...args);
            } finally {
                if (--state.cnt === 0) {
                    wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

                } else {
                    state.a = a;
                }
            }
        };
        real.original = state;

        return real;
    }
    function __wbg_adapter_26(arg0, arg1, arg2) {
        wasm.__wbindgen_export_3(arg0, arg1, addHeapObject(arg2));
    }

    /**
    * Initialize the front-end library
    * @param {number} port
    */
    function init_usdpl(port) {
        wasm.init_usdpl(port);
    }

    /**
    * Get the targeted plugin framework, or "any" if unknown
    * @returns {string}
    */
    function target_usdpl() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.target_usdpl(retptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_4(r0, r1);
        }
    }

    /**
    * Get the UDSPL front-end version
    * @returns {string}
    */
    function version_usdpl() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.version_usdpl(retptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_4(r0, r1);
        }
    }

    /**
    * Get the targeted plugin framework, or "any" if unknown
    * @param {string} key
    * @param {any} value
    * @returns {any}
    */
    function set_value(key, value) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.set_value(ptr0, len0, addHeapObject(value));
        return takeObject(ret);
    }

    /**
    * Get the targeted plugin framework, or "any" if unknown
    * @param {string} key
    * @returns {any}
    */
    function get_value(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.get_value(ptr0, len0);
        return takeObject(ret);
    }

    let cachedUint32Memory0 = null;

    function getUint32Memory0() {
        if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
            cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
        }
        return cachedUint32Memory0;
    }

    function passArrayJsValueToWasm0(array, malloc) {
        const ptr = malloc(array.length * 4);
        const mem = getUint32Memory0();
        for (let i = 0; i < array.length; i++) {
            mem[ptr / 4 + i] = addHeapObject(array[i]);
        }
        WASM_VECTOR_LEN = array.length;
        return ptr;
    }
    /**
    * Call a function on the back-end.
    * Returns null (None) if this fails for any reason.
    * @param {string} name
    * @param {any[]} parameters
    * @returns {Promise<any>}
    */
    function call_backend(name, parameters) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayJsValueToWasm0(parameters, wasm.__wbindgen_export_0);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.call_backend(ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }

    /**
    * Initialize translation strings for the front-end
    * @param {string} locale
    * @returns {Promise<void>}
    */
    function init_tr(locale) {
        const ptr0 = passStringToWasm0(locale, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.init_tr(ptr0, len0);
        return takeObject(ret);
    }

    /**
    * Translate a phrase, equivalent to tr_n(msg_id, 0)
    * @param {string} msg_id
    * @returns {string}
    */
    function tr(msg_id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(msg_id, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            const len0 = WASM_VECTOR_LEN;
            wasm.tr(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_4(r0, r1);
        }
    }

    function handleError(f, args) {
        try {
            return f.apply(this, args);
        } catch (e) {
            wasm.__wbindgen_export_5(addHeapObject(e));
        }
    }
    function __wbg_adapter_58(arg0, arg1, arg2, arg3) {
        wasm.__wbindgen_export_6(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
    }

    async function load(module, imports) {
        if (typeof Response === 'function' && module instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming === 'function') {
                try {
                    return await WebAssembly.instantiateStreaming(module, imports);

                } catch (e) {
                    if (module.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                    } else {
                        throw e;
                    }
                }
            }

            const bytes = await module.arrayBuffer();
            return await WebAssembly.instantiate(bytes, imports);

        } else {
            const instance = await WebAssembly.instantiate(module, imports);

            if (instance instanceof WebAssembly.Instance) {
                return { instance, module };

            } else {
                return instance;
            }
        }
    }

    function getImports() {
        const imports = {};
        imports.wbg = {};
        imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
            takeObject(arg0);
        };
        imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
            const ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        };
        imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        };
        imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
            const ret = getObject(arg0);
            return addHeapObject(ret);
        };
        imports.wbg.__wbindgen_number_new = function(arg0) {
            const ret = arg0;
            return addHeapObject(ret);
        };
        imports.wbg.__wbindgen_boolean_get = function(arg0) {
            const v = getObject(arg0);
            const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
            return ret;
        };
        imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
            getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
        };
        imports.wbg.__wbindgen_is_null = function(arg0) {
            const ret = getObject(arg0) === null;
            return ret;
        };
        imports.wbg.__wbindgen_is_undefined = function(arg0) {
            const ret = getObject(arg0) === undefined;
            return ret;
        };
        imports.wbg.__wbg_instanceof_Window_e266f02eee43b570 = function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Window;
            } catch {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_fetch_465e8cb61a0f43ea = function(arg0, arg1) {
            const ret = getObject(arg0).fetch(getObject(arg1));
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_instanceof_Response_fb3a4df648c1859b = function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Response;
            } catch {
                result = false;
            }
            const ret = result;
            return ret;
        };
        imports.wbg.__wbg_text_f61464d781b099f0 = function() { return handleError(function (arg0) {
            const ret = getObject(arg0).text();
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_newwithstrandinit_c45f0dc6da26fd03 = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbindgen_cb_drop = function(arg0) {
            const obj = takeObject(arg0).original;
            if (obj.cnt-- == 1) {
                obj.a = 0;
                return true;
            }
            const ret = false;
            return ret;
        };
        imports.wbg.__wbg_newnoargs_2b8b6bd7753c76ba = function(arg0, arg1) {
            const ret = new Function(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_call_95d1ea488d03e4e8 = function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_new_f9876326328f45ed = function() {
            const ret = new Object();
            return addHeapObject(ret);
        };
        imports.wbg.__wbindgen_is_string = function(arg0) {
            const ret = typeof(getObject(arg0)) === 'string';
            return ret;
        };
        imports.wbg.__wbg_self_e7c1f827057f6584 = function() { return handleError(function () {
            const ret = self.self;
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_window_a09ec664e14b1b81 = function() { return handleError(function () {
            const ret = window.window;
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_globalThis_87cbb8506fecf3a9 = function() { return handleError(function () {
            const ret = globalThis.globalThis;
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_global_c85a9259e621f3db = function() { return handleError(function () {
            const ret = global.global;
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_newwithlength_0da6f12fbc1ab6eb = function(arg0) {
            const ret = new Array(arg0 >>> 0);
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_set_17224bc548dd1d7b = function(arg0, arg1, arg2) {
            getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
        };
        imports.wbg.__wbg_call_9495de66fdbe016b = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_new_9d3a9ce4282a18a8 = function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wbg_adapter_58(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return addHeapObject(ret);
            } finally {
                state0.a = state0.b = 0;
            }
        };
        imports.wbg.__wbg_resolve_fd40f858d9db1a04 = function(arg0) {
            const ret = Promise.resolve(getObject(arg0));
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_then_ec5db6d509eb475f = function(arg0, arg1) {
            const ret = getObject(arg0).then(getObject(arg1));
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_then_f753623316e2873a = function(arg0, arg1, arg2) {
            const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        };
        imports.wbg.__wbg_set_6aa458a4ebdb65cb = function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
            return ret;
        }, arguments) };
        imports.wbg.__wbg_parse_3ac95b51fc312db8 = function() { return handleError(function (arg0, arg1) {
            const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbg_stringify_029a979dfb73aa17 = function() { return handleError(function (arg0) {
            const ret = JSON.stringify(getObject(arg0));
            return addHeapObject(ret);
        }, arguments) };
        imports.wbg.__wbindgen_throw = function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        };
        imports.wbg.__wbindgen_closure_wrapper386 = function(arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 75, __wbg_adapter_26);
            return addHeapObject(ret);
        };

        return imports;
    }

    function finalizeInit(instance, module) {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;
        cachedFloat64Memory0 = null;
        cachedInt32Memory0 = null;
        cachedUint32Memory0 = null;
        cachedUint8Memory0 = null;


        return wasm;
    }

    async function init(input) {
        if (typeof input === 'undefined') {
            input = new URL('usdpl_front_bg.wasm', (document.currentScript && document.currentScript.src || new URL('index.js', document.baseURI).href));
        }
        const imports = getImports();

        if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
            input = fetch(input);
        }

        const { instance, module } = await load(await input, imports);

        return finalizeInit(instance, module);
    }


    // USDPL customization
    const encoded = "AGFzbQEAAAABtwEbYAJ/fwBgAn9/AX9gAX8AYAN/f38AYAR/f39/AGADf39/AX9gAX8Bf2AAAGAAAX9gBX9/f39/AGAEf39/fwF/YAV/f39/fwF/YAF/AX5gA39/fwF+YAR/fn9/AGAGf39/f39/AX9gBn9/f39/fwBgBX9/fn9/AGAFf399f38AYAV/f3x/fwBgBH99f38AYAR/fH9/AGACfn8AYAd/f39/f39/AX9gA35/fwF/YAF8AX9gAn9/AX4CqgkjA3diZxpfX3diaW5kZ2VuX29iamVjdF9kcm9wX3JlZgACA3diZxVfX3diaW5kZ2VuX3N0cmluZ19uZXcAAQN3YmcVX193YmluZGdlbl9zdHJpbmdfZ2V0AAADd2JnG19fd2JpbmRnZW5fb2JqZWN0X2Nsb25lX3JlZgAGA3diZxVfX3diaW5kZ2VuX251bWJlcl9uZXcAGQN3YmcWX193YmluZGdlbl9ib29sZWFuX2dldAAGA3diZxVfX3diaW5kZ2VuX251bWJlcl9nZXQAAAN3YmcSX193YmluZGdlbl9pc19udWxsAAYDd2JnF19fd2JpbmRnZW5faXNfdW5kZWZpbmVkAAYDd2JnKF9fd2JnX2luc3RhbmNlb2ZfV2luZG93X2UyNjZmMDJlZWU0M2I1NzAABgN3YmccX193YmdfZmV0Y2hfNDY1ZThjYjYxYTBmNDNlYQABA3diZypfX3diZ19pbnN0YW5jZW9mX1Jlc3BvbnNlX2ZiM2E0ZGY2NDhjMTg1OWIABgN3YmcbX193YmdfdGV4dF9mNjE0NjRkNzgxYjA5OWYwAAYDd2JnKF9fd2JnX25ld3dpdGhzdHJhbmRpbml0X2M0NWYwZGM2ZGEyNmZkMDMABQN3YmcSX193YmluZGdlbl9jYl9kcm9wAAYDd2JnIF9fd2JnX25ld25vYXJnc18yYjhiNmJkNzc1M2M3NmJhAAEDd2JnG19fd2JnX2NhbGxfOTVkMWVhNDg4ZDAzZTRlOAABA3diZxpfX3diZ19uZXdfZjk4NzYzMjYzMjhmNDVlZAAIA3diZxRfX3diaW5kZ2VuX2lzX3N0cmluZwAGA3diZxtfX3diZ19zZWxmX2U3YzFmODI3MDU3ZjY1ODQACAN3YmcdX193Ymdfd2luZG93X2EwOWVjNjY0ZTE0YjFiODEA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BGoiAyACQYABaiACQShqEIQCIAIoAghFBEAgAigCDCIEQYQBTwRAIAQQAAsgAigCgAEiBEGEAU8EQCAEEAALIAIoAigiBEGEAU8EQCAEEAALIAMoAgAiA0GEAU8EQCADEAALQQEhAyAAKAKUBCIEQYQBSQ0BIAQQAAwBC0G4gMAAQRUQlgMACyAAIAM6AJgEIAJB4AJqJAAgAUEARwuhDAEFfyMAQZACayIDJAAgAQJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAS0AYEEBaw4EBwACAwELAAsgASABKQMANwMIIANByABqIAFBEGpBKBCiAxogASABLwFcOwFeIAEQETYCOCABQThqIgQQvwEgBBDCASADQaQBakEGNgIAIANBnAFqQQc2AgAgAyABQd4AajYCoAEgA0HQisAANgKYASADQQg2ApQBIAMgAUEIajYCkAEgA0EDNgLMASADQQQ2AsQBIANBpIrAADYCwAEgA0EANgK4ASADIANBkAFqNgLIASADQYABaiADQbgBahBBIAFBxABqIANBiAFqKAIANgIAIAEgAykDgAE3AjwgA0G4AWogA0HIAGpBKBCiAxogA0GQAWogA0G4AWoQgQEgAygCkAEhBSADKAKUASIGRQ0LIAFB0ABqIAMoApgBIgc2AgAgAUHMAGogBjYCACABIAU2AkggA0GQAWogBiAHEDcgA0HAAWoiBSADQZgBaikDADcDACADIAMpA5ABNwO4ASADQfAAaiADQbgBahC8ASAFIANB+ABqKAIANgIAIAMgAykDcDcDuAEgAyADQbgBahCMAjYCkAEgBCADQZABahCwASADKAKQASIFQYQBTwRAIAUQAAsgA0FAayABQUBrKAIAIAFBxABqKAIAIAQQ8wEgAygCRCEFIAMoAkANCiABIAU2AlQgA0E4ahDtASADKAI4RQ0GIAEgAygCPDYCWCABIAFB2ABqKAIAIAFB1ABqKAIAEAoQSDYCaAsgA0EwaiABQegAaiIEIAIQjQEgAygCMCIGQQJGDQYgAygCNCEFIAQQrwEgBg0IIANBKGogBRDyASADKAIsIQUgAygCKA0IIAEgBTYCaCADQSBqIAQQ9gEgAygCICEEIAFB9ABqIAMoAiQiBTYCACABIAQ2AnAgBA0BIAEgBRBINgJsCyADQRhqIAFB7ABqIgQgAhCNASADKAIYIgJBAkYNASADKAIcIQUgBBCvASACDQAgA0EQaiAFEPEBIAMoAhQhBCADKAIQRQ0CIAQhBQsgASgCaCICQYQBSQ0GIAIQAAwGCyAAQQs2AgBBBAwKCyADQQhqIAQQAiADKAIIIgVFBEAgA0EANgK8AQwECyADKAIMIQIgAyAFNgK8ASADIAI2AsABIAMgAjYCuAEgAyADQbgBahCxAiADQbgBaiADKAIAIAMoAgQQ5QIgAygCvAFFDQMgA0GIAWogA0HAAWoiBigCACICNgIAIAMgAykDuAE3A4ABIANBuAFqIAMoAoQBIAIQmwEgAygCuAEiAkEKRwRAIAMoArwBIQUgA0GQAWogBkEoEKIDGiADQfABaiADQZgBaikDADcDACADQfgBaiADQaABaikDADcDACADQYACaiADQagBaikDADcDACADIAMpA5ABNwPoASADQYABahCaAiAEQYQBTwRAIAQQAAsgASgCaCIEQYQBTwRAIAQQAAsgASgCWCIEQYQBTwRAIAQQAAsgASgCVCIEQYQBTwRAIAQQAAsgAUHIAGoQmgIgAUE8ahCaAiABKAI4IgFBhAFJDQkgARAADAkLIAMgAykCvAE3A4gCIANBiAJqEKoBIQUgA0GAAWoQmgIgBEGEAU8EQCAEEAALIAEoAmgiAkGEAU8EQCACEAALIAEoAlgiAkGEAU8EQCACEAALIAEoAlQiAkGEAU8EQCACEAALIAFByABqEJoCIAFBPGoQmgIgASgCOCIBQYQBSQ0HIAEQAAwHC0HAgsAAQSNB9InAABD3AQALQbyFwABBK0HYisAAEPcBAAsgAEELNgIAQQMMBgtBvIXAAEErQeiKwAAQ9wEACyABKAJYIgJBhAFPBEAgAhAACyABKAJUIgJBhAFJDQAgAhAACyABQcgAahCaAgsgAUE8ahCaAiABKAI4IgFBhAFJDQAgARAAC0EKIQILIAAgBTYCBCAAIAI2AgAgACADKQPoATcDCCAAQRBqIANB8AFqKQMANwMAIABBGGogA0H4AWopAwA3AwAgAEEgaiADQYACaikDADcDAEEBCzoAYCADQZACaiQAC4YMAgp/An4jAEHQAmsiAiQAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAC0A2AJBAWsOAwcCAQALIAAgAEGoAWpBqAEQogMaCwJAIAAtAKABQQFrDgMFAQACCyAAQQhqIQQgAEGYAWotAABBAWsOAwcAAwILAAsgACgCACEDIAIgACgCBCIENgLIASACIAM2AsQBIAIgBDYCwAEgAkEoaiACQcABahCxAiACQTBqIAIoAiggAigCLBDlAiACQcwCaiACQThqKAIANgIAIAIgAikDMDcCxAIgAEEIaiIEIAJBwAFqQZABEKIDGiAAQZgBakEAOgAACyAAQYgBaiAAQZQBaigCADYCACAAQYABaiIDIABBjAFqKQIANwIAQYjswABBiOzAACkDACIMQgF8NwMAIAJB6ABqQQRyIAMQ0QEgAkEJNgJoQZDswAAvAQAhAyACQcgBaiACQegAakEoEKIDGiAAQRBqIAJBwAFqQTAQogMaIABB6ABqQQA6AAAgAEHkAGogAzsBACAAIAw3AwgLIAJBwAFqIAQgARAnIAIoAsABQQtGDQIgAkFAayACQcABakEoEKIDGiAEEK4BAkACQCACKAJAIghBeGoOAwEGAAYLIAIoAkQhAUHU7MAAKAIABEAQ4wILQdTswABBADYCACABQYQBSQ0JIAEQAAwJCyACQcgAaigCACEBIAJBzABqKAIAIQUgAigCRCEGIAJBGGpB5ILAABDnASACKQMYIQwgAikDICENIAJBwAFqIAUQayACQYABaiIJIAJByAFqIgopAwA3AwAgAiACKQPAATcDeCACIA03A3AgAiAMNwNoIAIgATYCzAEgAiABIAVBGGwiA2oiBzYCyAEgAiABNgLEASACIAY2AsABIAVFDQYgAkG4AWohBQNAIAEoAgQiBkUEQCABQRhqIQcMBwsgASgCACELIAIgASgCCDYCqAEgAiAGNgKkASACIAs2AqABIAUgAUEUaigCADYCACACIAEpAgw3A7ABIAJBkAFqIAJB6ABqIAJBoAFqIAJBsAFqEEsgAigClAEEQCACQZABahCmAiACQZABahDKAgsgAUEYaiEBIANBaGoiAw0ACwwFC0HAgsAAQSNBgIzAABD3AQALQcCCwABBI0GwgsAAEPcBAAtBAyEDIABBAzoAoAEgAEEDOgCYAUEBIQEMBgtBwILAAEEjQfCLwAAQ9wEAC0HU7MAAKAIABEAQ4wILQdTswABBADYCAEEBIQEMAgsgAiAHNgLEAQsgAkHAAWoQuwEg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IAAoAgQoAgwRBQALrQcCBn8CfiMAQTBrIgMkACADQf8BOgAPIANBEGogASADQQ9qQQEgAigCICIGEQQAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAy0AEEEERwRAIAMpAxAiCUL/AYNCBlINAQsgAy0AD0F/ag4KExACAwQFBgcJCAELIAAgCTcCBAwTCyAAQQU6AAQMEgsgA0F/NgIoIANBEGogASADQShqQQQgBhEEACADLQAQQQRHBEAgAzEAEEIGUg0NCyADNQIoIQlBBCEFQQIhBAwQCyADQn83AyggA0EQaiABIANBKGpBCCAGEQQAIAMtABBBBEcEQCADMQAQQgZSDQsLIAMpAygiCkIghiEJIApCIIinIQdBCCEFQQMhBAwPCyADQX82AiggA0EQaiABIANBKGpBBCAGEQQAIAMtABBBBEcEQCADKQMQIglC/wGDQgZSDQkLIAM1AighCUEEIQRBBCEFDA4LIANCfzcDICADQShqIAEgA0EgakEIIAYRBAAgAy0AKEEERwRAIAMpAygiCUL/AYNCBlINBwsgAyADKQMgIgk3AhQgCUIgiKchByADKQMQIQlBCCEFQQUhBAwNCyADQX82AiggA0EQaiABIANBKGpBBCAGEQQAIAMtABBBBEcEQCADKQMQIglC/wGDQgZSDQULIAM1AighCUEEIQVBBiEEDAwLIANCfzcDICADQShqIAEgA0EgakEIIAYRBAAgAy0AKEEERwRAIAMpAygiCUL/AYNCBlINAwsgAyADKQMgIgk3AhQgCUIgiKchByADKQMQIQlBCCEFQQchBAwLCyADQRBqIAEgAhBFIAMoAhRFDQggAygCGCEHIAMpAxAhCSADKAIcIQVBCSEEDAoLIANBEGogASACEL4BIAMoAhBFDQggACADKQIUNwIEDAoLIAAgCTcCBAwJCyAAIAk3AgQMCAsgACAJNwIEDAcLIAAgCTcCBAwGCyAAIAM1AhAgAzUCFEIghoQ3AgQMBQsgACADNQIQIAM1AhRCIIaENwIEDAQLIANBEGogASACEEUgAygCFARAIAMoAhghByADKQMQIQkgAygCHCEFQQEhBAwDCyAAIAMpAxg3AgQMAwsgACADKQMYNwIEDAILQQghBCADQRhqKAIAIQUgAy0AFCEICyAA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IANBGGogA0HgAGoQngMgAygCHEUEQCAAIAY2AgQgAEEANgIAIABBCGogBDYCAAwCCwJAAkACQCACRQRAQQEhAQwBCyACQX9MDQIgAkEBEPcCIgFFDQELIANBADYCQCADIAE2AjwgAyACNgI4IAQgAksEfyADQThqQQAgBBCFASADKAJAIQUgAygCPAUgAQsgBWogBiAEEKIDGiADIAQgBWoiAjYCQCADKAI4IAJrQQJNBEAgA0E4aiACQQMQhQEgAygCQCECCyADKAI8IgEgAmoiBEGYzsAALwAAIgU7AAAgBEECakGazsAALQAAIgY6AAAgAyACQQNqIgI2AkAgAyADKQMwNwNIIANB0ABqIANByABqED4gAygCUARAA0AgA0HoAGogA0HYAGopAwA3AwAgAyADKQNQNwNgIANBEGogA0HgAGoQnQMgAygCECEHIAMoAjggAmsgAygCFCIESQRAIANBOGogAiAEEIUBIAMoAkAhAiADKAI8IQELIAEgAmogByAEEKIDGiADIAIgBGoiAjYCQCADQQhqIANB4ABqEJ4DIAMoAgwEQCADKAI4IAJrQQJNBEAgA0E4aiACQQMQhQEgAygCQCECCyADKAI8IgEgAmoiBCAFOwAAIARBAmogBjoAACADIAJBA2oiAjYCQAsgA0HQAGogA0HIAGoQPiADKAJQDQALCyAAIAMpAzg3AgQgAEEBNgIAIABBDGogA0FAaygCADYCAAwDCyACQQEQmwMACxCYAgALIABB5MzAADYCBCAAQQA2AgAgAEEIakEANgIACyADQfAAaiQAC9AEAgR/Bn4gACAAKAI4IAJqNgI4AkAgAAJ/AkACQAJAIAAoAjwiBUUEQAwBCwJ+IAJBCCAFayIEIAIgBEkbIgZBA00EQEIADAELQQQhAyABNQAACyEHIAAgACkDMCADQQFyIAZJBEAgASADajMAACADQQN0rYYgB4QhByADQQJyIQMLIAMgBkkEfiABIANqMQAAIANBA3SthiAHhAUgBwsgBUEDdEE4ca2GhCIHNwMwIAQgAksNASAAIAApAxggB4UiCCAAKQMIfCIJIAApAxAiCkINiSAKIAApAwB8IgqFIgt8IgwgC0IRiYU3AxAgACAMQiCJNwMIIAAgCSAIQhCJhSIIQhWJIAggCkIgiXwiCIU3AxggACAHIAiFNwMACyACIARrIgJBB3EhAyAEIAJBeHEiAkkEQCAAKQMIIQggACkDECEHIAApAwAhCSAAKQMYIQoDQCAIIAEgBGopAAAiCyAKhSIIfCIKIAcgCXwiCSAHQg2JhSIHfCIMIAdCEYmFIQcgCiAIQhCJhSIIQhWJIAggCUIgiXwiCYUhCiAMQiCJIQggCSALhSEJIARBCGoiBCACSQ0ACyAAIAc3AxAgACAJNwMAIAAgCjcDGCAAIAg3AwgLIANBA0sNAUIAIQdBAAwCCyACIAVqIQMMAgsgASAEajUAACEHQQQLIgJBAXIgA0kEQCABIAIgBGpqMwAAIAJBA3SthiAHhCEHIAJBAnIhAgsgAiADSQR+IAEgAiAEamoxAAAgAkEDdK2GIAeEBSAHCzcDMAsgACADNgI8C5oFAgZ/A34jAEEwayIDJAAgA0H/AToAByADQQhqIAEgA0EHakEBIAIoAiARBAACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCADLQAIQQRHBEAgAykDCCIKQv8Bg0IGUg0BC0ECIQQgAy0AB0F/ag4KAgMNBAoFBgkIBwELIAAgCjcCBAwNCyAAQQU6AAQMDAsgA0EIaiABIAIQYSADKQMIIQogAygCFCIHRQ0IIAMoAighBSADKQMgIQsgAykDGCEJIAMoAhAhCEEAIQQMCgsgA0EIaiABIAIQjgEgAykDCCEKIAMoAhQiB0UNByADKAIgIQUgAykDGCEJIAMoAhAhCEEBIQQMCQtBAyEEDAgLQQUhBAwHCyAAQQU6AAQMBwsgA0EIaiABIAIQRSADKAIMIgFFDQQgAa0gAykDECIJQiCGhCEKIAlCIIinIQUgAygCCCEGQQkhBAwFCyADQQhqIAEgAhBRIAMoAgwiAQRAIAGtIAMpAxAiCUIghoQhCiAJQiCIpyEFIAMoAgghBkEIIQQMBQsgACADKQMQNwIEDAULIANBCGogASACED8gAygCDCIBBEAgAa0gAykDECIJQiCGhCEKIAlCIIinIQUgAygCCCEGQQchBAwECyAAIAMpAxA3AgQMBAsgA0EIaiABIAIQRSADKAIMIgEEQCABrSADKQMQIglCIIaEIQogCUIgiKchBSADKAIIIQZBBCEEDAMLIAAgAykDEDcCBAwDCyAAIAo3AgQMAgsgACADKQMQNwIEDAELIAAgCzcCICAAIAk3AhggACAHNgIUIAAgCDYCECAAIAo3AgggACAGNgIEIAAgBDYCACAAIAVBAWo2AigMAQsgAEEKNgIACyADQTBqJAAL+QQBCn8jAEEwayIDJAAgA0EDOgAoIANCgICAgIAENwMgIANBADYCGCADQQA2AhAgAyABNgIMIAMgADYCCAJ/AkACQCACKAIAIgpFBEAgAkEUaigCACIARQ0BIAIoAhAhASAAQQN0IQUgAEF/akH/////AXFBAWohByACKAIIIQADQCAAQQRqKAIAIgQEQCADKAIIIAAoAgAgBCADKAIMKAIMEQUADQQLIAEoAgAgA0EIaiABQQRqKAIAEQEADQMgAUEIaiEBIABBCGohACAFQXhqIgUNAAsMAQsgAigCBCIARQ0AIABBBXQhCyAAQX9qQf///z9xQQFqIQcgAigCCCEAA0AgAEEEaigCACIBBEAgAygCCCAAKAIAIAEgAygCDCgCDBEFAA0DCyADIAUgCmoiBEEcai0AADoAKCADIARBFGopAgA3AyAgBEEQaigCACEGIAIoAhAhCEEAIQlBACEBAkACQAJAIARBDGooAgBBAWsOAgACAQsgBkEDdCAIaiIMQQRqKAIAQYMBRw0BIAwoAgAoAgAhBgtBASEBCyADIAY2AhQgAyABNgIQIARBCGooAgAhAQJAAkACQCAEQQRqKAIAQQFrDgIAAgELIAFBA3QgCGoiBkEEaigCAEGDAUcNASAGKAIAKAIAIQELQQEhCQsgAyABNgIcIAMgCTYCGCAIIAQoAgBBA3RqIgEoAgAgA0EIaiABKAIEEQEADQIgAEEIaiEAIAsgBUEgaiIFRw0ACwsgByACQQxqKAIASQRAIAMoAgggAigCCCAHQQN0aiIAKAIAIAAoAgQgAygCDCgCDBEFAA0BC0EADAELQQELIANBMGokAAvRBAEKfyMAQUBqIgMkACACKAIAIQkgAigCCCEIIANBOGohCiADQTBqIQsgA0EoaiEMA0AgAigCCCIFIAIoAgAiBEYEQCACQSAQywIgAigCACEEIAIoAgghBQsgAyAGNgIUIANBADYCECADIAQgBWs2AgwgAyACKAIEIAVqNgIIIANBGGogAUEAIANBCGoQqAECQAJAAkACQAJAAkACQAJAIAMtABgiBUEERgRAIAMoAhAiBQ0BIABBBDoAACAAIAIo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IAQ2AgQgASAAIAJqNgIACyABEIEDDQEgARCXAyICQRBBCBDmAiADak0NASABIAMQqAMhACABIAMQugIgACACIANrIgMQugIgACADED0MAQsgBA8LIAEQqgMgARCBAxoLvwMBAX8jAEFAaiICJAACQAJAAkACQAJAAkAgAC0AAEEBaw4DAQIDAAsgAiAAKAIENgIEQRRBARD3AiIARQ0EIABBEGpBxMfAACgAADYAACAAQQhqQbzHwAApAAA3AAAgAEG0x8AAKQAANwAAIAJBFDYCECACIAA2AgwgAkEUNgIIIAJBNGpBAzYCACACQTxqQQI2AgAgAkEkakHtADYCACACQazFwAA2AjAgAkEANgIoIAJB7gA2AhwgAiACQRhqNgI4IAIgAkEEajYCICACIAJBCGo2AhggASACQShqENgBIQAgAigCCEUNAyACKAIMECsMAwsgAC0AASEAIAJBNGpBATYCACACQTxqQQE2AgAgAkGov8AANgIwIAJBADYCKCACQe8ANgIMIAIgAEEgc0E/cUECdCIAQcjHwABqKAIANgIcIAIgAEHIycAAaigCADYCGCACIAJBCGo2AjggAiACQRhqNgIIIAEgAkEoahDYASEADAILIAAoAgQiACgCACAAKAIEIAEQnAMhAAwBCyAAKAIEIgAoAgAgASAAQQRqKAIAKAIQEQEAIQALIAJBQGskACAADwtBFEEBEJsDAAuPAwIKfwV+IwBBIGsiBCQAIAFBEGohCCABIAIQQyEPIAFBHGooAgAiCUFoaiEKIAEoAhAiByAPp3EhBiAPQhmIQv8Ag0KBgoSIkKDAgAF+IREgAigCCCELIAIoAgQhDAJAAkACQANAIAYgCWopAAAiECARhSIOQn+FIA5C//379+/fv/9+fINCgIGChIiQoMCAf4MhDgNAIA5QBEAgECAQQgGGg0KAgYKEiJCgwIB/g1BFDQMgBiANQQhqIg1qIAdxIQYMAgsgDnohEiAOQn98IA6DIQ4gDCALIApBACASp0EDdiAGaiAHcWtBGGxqIgUoAgQgBSgCCBDRAkUNAAsLIAUNAQsgBEEQaiACQQhqKAIANgIAIARBHGogA0EIaigCADYCACAEIAIpAgA3AwggBCADKQIANwIUIAggDyAEQQhqIAEQRCAAQQA2AgQMAQsgACAFKQIMNwIAIAUgAykCADcC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AkACQCAALQAAIgNBfGpBAiADQQNLG0H/AXFBAWsOAgECAAsgAkEcakEBNgIAIAJBJGpBADYCACACQeyfwAA2AhggAkH8ncAANgIgIAJBADYCECABIAJBEGoQ2AEMAgsgAkEcakEBNgIAIAJBJGpBADYCACACQcifwAA2AhggAkH8ncAANgIgIAJBADYCECABIAJBEGoQ2AEMAQsgAiAANgIMIAJBHGpBAjYCACACQSRqQQE2AgAgAkGgn8AANgIYIAJBADYCECACQcIANgIsIAIgAkEoajYCICACIAJBDGo2AiggASACQRBqENgBCyACQTBqJAAL6gECAn8BfiMAQSBrIgMkACAAKAIARQRAIABBfzYCACADQRhqIABBHGopAgA3AwAgA0EQaiAAQRRqKQIANwMAIABBDGoiBCkCACEFIARBADYCACADIAU3AwggA0EIahDaAgJAIABBJGooAgBBAkYNACAAQShqKAIAIgRBhAFJDQAgBBAACyAAIAE2AiQgAEEoaiACNgIAIABBCGoiAigCACEBIAJBADYCACAAIAAoAgBBAWo2AgAgAQRAIAAoAgQgASgCBBECAAsgA0EgaiQADwtB4LbAAEEQIANBCGpB8LbAAEGwuMAAELQBAAvpAQIDfwJ+IwBBIGsiAyQAIANBEGogASACEEUCQAJAIAMoAhQiBARAIAMoAhAhBSADIAMpAxgiBz4CCCADIAQ2AgQgAyAFNgIAIANBEGogASACEFMgAygCFCIBRQ0BIAMoAhAhAiADKQMYIQYgACADKQMANwIAIAAgBj4CFCAAIAE2AhAgACACNgIMIABBCGogA0EIaigCADYCACAAIAZCIIinIAdCIIinajYCGAwCCyADKQMYIQYgAEEANgIEIAAgBjcCCAwBCyADKQMYIQYgAEEANgIEIAAgBjcCCCADEJoCCyADQSBqJAAL0AEBBX8jAEEgayIDJAAgAAJ/QQAgAkEBaiIEIAJJDQAaIAEoAgAiAkEBdCIFIAQgBSAESxsiBEEEIARBBEsbIgVBBHQhBCAFQYCAgMAASUEDdCEGAkAgAgRAIAEoAgQhByADQQg2AhggAyACQQR0NgIUIAMgBzYCEAwBCyADQQA2AhgLIAMgBCAGIANBEGoQlwEgAygCBCEEIAMoAgAEQCADQQhqKAIADAELIAEgBTYCACABIAQ2AgRBgYCAgHgLNgIEIAAgBDYCACADQSBqJAALzwEBBX8jAEEgayIDJAAgAAJ/QQAgAkEBaiIEIAJJDQAaIAEoAgAiAkEBdCIFIAQgBSAESxsiBEEEIARBBEsbIgVBGGwhBCAFQdaq1SpJQQJ0IQYCQCACBEAgASgCBCEHIANBBDYCGCADIAJBGGw2AhQgAyAHNgIQDAELIANBADYCGAsgAyAEIAYgA0EQahCXASADKAIEIQQgAygCAARAIANBCGooAgAMAQsgASAFNgIAIAEgBDYCBEGBgICAeAs2AgQgACAENgIAIANBIGokAAvQAQEFfyMAQSBrIgMkACAAAn9BACACQQFqIgQgAkkNABogASgCACICQQF0IgUgBCAFIARLGyIEQQQgBEEESxsiBUEMbCEEIAVBq9Wq1QBJQQJ0IQYCQCACBEAgASgCBCEHIANBBDYCGCADIAJBDGw2AhQgAyAHNgIQDAELIANBADYCGAsgAyAEIAYgA0EQahCXASADKAIEIQQgAygCAARAIANBCGooAgAMAQsgASAFNgIAIAEgBDYCBEGBgICAeAs2AgQgACAENgIAIANBIGokAAvPAQEFfyMAQSBrIgMkACAAAn9BACACQQFqIgQgAkkNABogASgCACICQQF0IgUgBCAFIARLGyIEQQQgBEEESxsiBUEobCEEIAVBtObMGUlBA3QhBgJAIAIEQCABKAIEIQcgA0EINgIYIAMgAkEobDYCFCADIAc2AhAMAQsgA0EANgIYCyADIAQgBiADQRBqEJcBIAMoAgQhBCADKAIABEAgA0EIaigCAAwBCyABIAU2AgAgASAENgIEQYGAgIB4CzYCBCAAIAQ2AgAgA0EgaiQAC9ABAQV/IwBBIGsiAyQAIAACf0EAIAJBAWoiBCACSQ0AGiABKAIAIgJBAXQiBSAEIAUgBEsbIgRBBCAEQQRLGyIFQQJ0IQQgBUGAgICAAklBAnQhBgJAIAIEQCABKAIEIQcgA0EENgIYIAMgAkECdDYCFCADIAc2AhAMAQsgA0EANgIYCyADIAQgBiADQRBqEJcBIAMoAgQhBCADKAIABEAgA0EIaigCAAwBCyABIAU2AgAgASAENgIEQYGAgIB4CzYCBCAAIAQ2AgAgA0EgaiQAC8kBAQV/IwBBMGsiAiQAIAJBCGpBgAgQ3gEgAkEANgIYIAIgAikDCDcDECACQSBqIAEgAkEQahCDAQJAIAItACBBBkYEQCACKAIkIQUgAigCFCEEIAIgAigCGCIDEN4BIAIoAgAhBiACKAIEIAQgAxCiAyEEIAAgBTYCDCAAIAM2AgggACAENgIEIAAgBjYCAAwBCyACIAIpAyA3AyggAkEoahCpASEDIABBADYCBCAAIAM2AgALIAJBEGoQmgIgARC4ASACQTBqJAAL4AEBAn8jAEEgayICJAAgAiAANgIMIAIgASgCAEG85MAAQREgASgCBCgCDBEFADoAGCACIAE2AhQgAkEAOgAZIAJBADYCECACQRBqIAJBDGpBrOTAABBfIQACfyACLQAYIgEgACgCACIDRQ0AGiABQf8BcSEAQQEgAA0AGiACKAIUIQACQCADQQFHDQAgAi0AGUUNACAALQAYQQRxDQBBASAAKAIAQYjQwABBASAAKAIEKAIMEQUADQEaCyAAKAIAQcfOwABBASAAKAIEKAIMEQUACyACQSBqJABB/wFxQQBHC70BAgJ/AX4jAEEgayIDJAAgA0GACBDeASADQQA2AhAgAyADKQMANwMIIANBGGogASADQQhqQeyQwAAQVgJAAkACQAJ/IAMtABhBBkYEQCADKAIcDAELIAMpAxgiBUL/AYNCBlINASAFQiCIpwshASADKAIQIgQgAUkNAiADKAIMIAEgAhDqASAAQQY6AAAgACABNgIEDAELIAAgBTcCAAsgA0EIahCaAiADQSBqJAAPCyABIARB1JHAABCHAwALzAEBAn8jAEEgayIDJAACQAJAIAEgAmoiAiABSQ0AIAAoAgAiAUEBdCIEIAIgBCACSxsiAkEIIAJBCEsbIgJBf3NBH3YhBAJAIAEEQCADQQE2AhggAyABNgIUIAMgAEEEaigCADYCEAwBCyADQQA2AhgLIAMgAiAEIANBEGoQmAEgAygCBCEBIAMoAgBFBEAgACACNgIAIAAgATYCBAwCCyADQQhqKAIAIgBBgYCAgHhGDQEgAEUNACABIAAQmwMACxCYAgALIANBIGokAAvMAQECfyMAQSBrIgMkAAJAAkAgASACaiICIAFJDQAgACgCACIBQQF0IgQgAiAEIAJLGyICQQggAkEISxsiAkF/c0EfdiEEAkAgAQRAIANBATYCGCADIAE2AhQgAyAAQQRqKAIANgIQDAELIANB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AygCEEUEQCAAIAMpAwg3AgAgAyABKAIINgIADAELIAMpAwgiBUL/AYNCBFEEQCAAQZCNwAA2AgQgAEECNgIADAELIAAgBTcCAAsgAygCBCADKAIANgIIIANBIGokAA8LIAQgAkHcjMAAEIYDAAumAQEBfyMAQTBrIgMkACADQQQ6AAggAyABNgIQIANBKGogAkEQaikCADcDACADQSBqIAJBCGopAgA3AwAgAyACKQIANwMYAkAgA0EIakHQksAAIANBGGoQOgRAIAMtAAhBBEYEQCAAQfiSwAA2AgQgAEECNgIADAILIAAgAykDCDcCAAwBCyAAQQQ6AAAgAy0ACEEERg0AIANBCGoQiAILIANBMGokAAupAQEDfyMAQTBrIgIkACABKAIERQRAIAEoAgwhAyACQRBqIgRBADYCACACQoCAgIAQNwMIIAIgAkEIajYCFCACQShqIANBEGopAgA3AwAgAkEgaiADQQhqKQIANwMAIAIgAykCADcDGCACQRRqQdi+wAAgAkEYahA6GiABQQhqIAQoAgA2AgAgASACKQMINwIACyAAQdzGwAA2AgQgACABNgIAIAJBMGokAAudAQEBfyMAQUBqIgQkACAEIAI2AjggBCABNgI0IAQgAjYCMCAEQQhqIARBMGoQsQIgBEEgaiAEKAIIIAQoAgwQ5QIgBEE4aiIBIARBKGooAgA2AgAgBCAEKQMgNwMwIARBEGogBEEwaiADEFAgASAEQRhqKAIANgIAIAQgBCkDEDcDMCAEIARBMGoQsQIgACAEKQMANwMAIARBQGskAAusAQEDfyMAQSBrIgMkACADQgA3AwggA0EBOgAcIANBCGoQhgIiAiACKAIAQQFqIgQ2AgACQCAEBEAgAigCCA0BIAJBfzYCCCACQQxqIgQQiQIgAkEYakHQucAANgIAIAJBFGogAkEIajYCACACQRBqIAE2AgAgBCAANgIAIAJBADYCCCACEPQBIANBIGokAA8LAAtB4LbAAEEQIANBCGpB8LbAAEG8ucAAELQBAAubAQEBfyMAQUBqIgMkACADIAI2AjggAyABNgI0IAMgAjYCMCADQQhqIANBMGoQsQIgA0EgaiADKAIIIAMoAgwQ5QIgA0E4aiIBIANBKGooAgA2AgAgAyADKQMgNwMwIANBEGogA0EwahBSIAEgA0EYaigCADYC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QCAAEAALAkAgAS0AAEUNACABKAIEIgBBhAFJDQAgABAACyABQRBqJAALeQECfyMAQRBrIgQkACAEQQhqIAEQ8AECQCAEKAIMIANPBEAgBCgCCCEFAkAgA0EBRwRAIAIgBSADEKIDGgwBCyACIAUtAAA6AAALIABBBDoAACABIAEpAwAgA618NwMADAELIABCgoCAgICzgAg3AgALIARBEGokAAuHAQIBfwF+IwBBEGsiASQAQbDtwAApAwBQBEBBwO3AAAJ+AkAgAEUNACAAKQMAIABCADcDAEIBUg0AIAApAwghAiAAKQMQDAELIAFCAjcDCCABQgE3AwAgASkDACECIAEpAwgLNwMAQbjtwAAgAjcDAEGw7cAAQgE3AwALIAFBEGokAEG47cAAC4EBAQF/IwBBEGsiASQAIAFB8rLAAEEEEAE2AgggAUGIs8AAQQQQATYCDCABIAAgAUEIaiABQQxqEOIBIAEoAgwiAEGEAU8EQCAAEAALIAEoAggiAEGEAU8EQCAAEAALAkAgAS0AAEUNACABKAIEIgBBhAFJDQAgABAACyABQRBqJAALeQEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBFGpBAjYCACADQRxqQQI2AgAgA0EsakHwADYCACADQaDPwAA2AhAgA0EANgIIIANB8AA2AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACEKgCAAt5AQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0EUakECNgIAIANBHGpBAjYCACADQSxqQfAANgIAIANB0NPAADYCECADQQA2AgggA0HwADYCJCADIANBIGo2AhggAyADQQRqNgIoIAMgAzYCICADQQhqIAIQqAIAC3kBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQRRqQQI2AgAgA0EcakECNgIAIANBLGpB8AA2AgAgA0Hw08AANgIQIANBADYCCCADQfAANgIkIAMgA0EgajYCGCADIANBBGo2AiggAyADNgIgIANBCGogAhCoAgALeQEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBFGpBAjYCACADQRxqQQI2AgAgA0EsakHwADYCACADQaTUwAA2AhAgA0EANgIIIANB8AA2AiQgAyADQSBqNgIYIAMgA0EEajYCKCADIAM2AiAgA0EIaiACEKgCAAt0AQR/IwBBEGsiASQAIAAoAggiAiAAKAIEIgNHBEAgAiADa0ECdkECdCECA0AgAygCACIEQYQBTwRAIAQQAAsgA0EEaiEDIAJBfGoiAg0ACwsgASAAKAIMNgIMIAEgACgCADYCCCABQQhqEJkCIAFBEGokAAtsAQF/IwBBMGsiAyQAIAMgATYCKCADIAA2AiQgAyABNgIgIANBCGogA0EgahCxAiADQRBqIAMoAgggAygCDBDlAiADQShqIANBGGooAgA2AgAgAyADKQMQNwMgIANBIGogAhDPASADQTBqJAALaQEBfyMAQTBrIgIkACACIAE2AiggAiAANgIkIAIgATYCICACQQhqIAJBIGoQsQIgAkEQaiACKAIIIAIoAgwQ5QIgAkEoaiACQRhqKAIANgIAIAIgAikDEDcDICACQSBqEGggAkEwaiQAC3IBA38jAEEgayICJAACf0EBIAAgARBbDQAaIAEoAgQhAyABKAIAIQQgAkEANgIcIAJBnM7AADYCGCACQQE2AhQgAkHMzsAANgIQIAJBADYCCEEBIAQgAyACQQhqEDoNABogAEEEaiABEFsLIAJBIGokAAt5AQF/AkACQCAARQ0AIAAoAgAhASAAQQA2AgAgACgCBCEAAkAgAQ4CAQIACyAAQYQBSQ0AIAAQAAsQVyEAC0H07MAAKAIAIQFB9OzAACAANgIAQfDswAAoAgBB8OzAAEEBNgIARSABQYQBSXJFBEAgARAAC0H07MAAC3wBA38gACAAEKoDIgBBCBDmAiAAayICEKgDIQBB7PDAACABIAJrIgE2AgBB9PDAACAANgIAIAAgAUEBcjYCBEEIQQgQ5gIhAkEUQQgQ5gIhA0EQQQgQ5gIhBCAAIAEQqAMgBCADIAJBCGtqajYCBEGA8cAAQYCAgAE2AgALcwAjAEEwayIBJABB2OzAAC0AAARAIAFBFGpBAjYCACABQRxqQQE2AgAgAUHoxcAANgIQIAFBADYCCCABQfAANgIkIAEgADYCLCABIAFBIGo2AhggASABQSxqNgIgIAFBCGpBkMbAABCoAgALIAFBMGokAAt2AQF/IAAtAAQhASAALQAFBEAgAUH/AXEhASAAAn9BASABDQAaIAAoAgAiAS0AGEEEcUUEQCABKAIAQYPQwABBAiABKAIEKAIMEQUADAELIAEoAgBBgtDAAEEBIAEoAgQoAgwRBQALIgE6AAQLIAFB/wFxQQBHC2oBAX8jAEEgayICJABBtOzAACgCAEUEQEHgj8AAQStBrJDAABD3AQALIAJBGGogAEEIaigCADYCACACIAApAgA3AxAgAkEIaiACQRBqIAEQVSACKAIIIQAgAigCDCACQSBqJABBgQEgABsLawECfyMAQSBrIgIkACACQQhqIAEoAgAQAgJAIAIoAggiAwRAIAIoAgwhASACIAM2AhQgAiABNgIYIAIgATYCECACIAJBEGoQsQIgACACKAIAIAIoAgQQ5QIMAQsgAEEANgIECyACQSBqJAALawECfyABQQRqKAIAIQMCQAJAAkAgAUEIaigCACIBRQRAQQEhAgwBCyABQX9MDQEgAUEBEPcCIgJFDQILIAIgAyABEKIDIQIgACABNgIIIAAgAjYCBCAAIAE2AgAPCxCYAgALIAFBARCbAwALWQEBfyMAQSBrIgIkACACIAAoAgA2AgQgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAkEEakHIj8AAIAJBCGoQOiACQSBqJAALWQEBfyMAQSBrIgIkACACIAAoAgA2AgQgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAkEEakGol8AAIAJBCGoQOiACQSBqJAALYQEDfyAAIAEQywIgACgCBCIEIAAoAggiAmohAwJAAkAgAUECTwRAIANBACABQX9qIgEQowMaIAQgASACaiICaiEDDAELIAFFDQELIANBADoAACACQQFqIQILIAAgAjYCCAtZAQF/IwBBIGsiAiQAIAIgACgCADYCBCACQRhqIAFBEGopAgA3AwAgAkEQaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqQdi+wAAgAkEIahA6IAJBIGokAAtZAQF/IwBBIGsiAiQAIAIgACgCADYCBCACQRhqIAFBEGopAgA3AwAgAkEQaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqQczMwAAgAkEIahA6IAJBIGokAAtZAQF/IwBBIGsiAiQAIAIgACgCADYCBCACQRhqIAFBEGopAgA3AwAgAkEQaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqQZTSwAAgAkEIahA6IAJBIGokAAtTAQJ/IwBBIGsiAiQAIAAoAgQhAyAAKAIAIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAMgAkEIahA6IAJBIGokAAtWAQF/IwBBIGsiAiQAIAIgADYCBCACQRhqIAFBEGopAgA3AwAgAkEQaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqQciPwAAgAkEIahA6IAJBIGokAAuTAQIBfwJ+IwBBEGsiASQAQZDswAAgADsBAEGI7MAAQgA3AwAgAUGMkMAAEOcBIAEpAwghAiABKQMAIQNBtOzAACgCAARAQajswAAoAgAEQBCcARCrAgsLQbTswABByJ3AADYCAEGo7MAAQgA3AwBBmOzAACADNwMAQaDswAAgAjcDAEGw7MAAQQA2AgAgAUEQaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBqJfAACACQQhqEDogAkEgaiQAC1YBAX8jAEEgayICJAAgAiAANgIEIAJBGGogAUEQaikCADcDACACQRBqIAFBCGopAgA3AwAgAiABKQIANwMIIAJBBGpBlNLAACACQQhqEDogAkEgaiQAC2YBAX8jAEFAaiIBJAAgAUEBOgAPIABBADYCCCAAQoCAgIAQNwIAIAFBEGogAEGMjsAAEL4CIAFBD2ogAUEQahCTAQRAQaSOwABBNyABQThqQdyOwABBuI/AABC0AQALIAFBQGskAAtIAQJ/AkAgAUUEQEEBIQIMAQsgAUEATgRAIAEgAUF/c0EfdiIDEPcCIgINASABIAMQmwMACxCYAgALIAAgAjYCBCAAIAE2AgALYgEBfyMAQSBrIgMkACAAKAIAIANBCGogASACEDAgAygCCARAIAMgAykCDDcDGEGIsMAAQSsgA0EYakG0sMAAQaCxwAAQtAEACyADKAIMIANBEGooAgAQlwIgA0EgaiQAQQALaQEDfyMAQRBrIgEkAAJAQQBBzLnAACgCABEGACICBEAgACgCACgCACIAIAAoAgBBAWoiAzYCACADRQ0BIAIgABC2ASABQRBqJAAPC0GiusAAQcYAIAFBCGpB6LrAAEHIu8AAELQBAAsAC1YBAn8CQCAAQQNwQQNzQQNwIgRFBEAMAQtBACEAA0AgACACRwRAIAAgAWpBPToAACAAQQFqIQNBASEAIAMgBEkNAQwCCwsgAiACQcigwAAQwwEACyADC1oBAX8jAEEQayIEJAAgASgCACACKAIAIAMoAgAQHiEBIARBCGoQvQIgAAJ/IAQoAghFBEAgACABQQBHOgABQQAMAQsgACAEKAIMNgIEQQELOgAAIARBEGokAAtUAQF/IwBBMGsiASQAIAFBEGpBkJDAAEEGEIUCIAFBKGogAUEYaigCADYCACABIAEpAxA3AyAgAUEIaiABQSBqELECIAAgASkDCDcDACABQTBqJAALWQECfyAAKAIMIgIgACgCACIDRgRAIAAQqwEgACgCDCECIAAoAgAhAwsgACgCBCAAKAIIIAJqIgJBACADIAIgA0kba0ECdGogATYCACAAIAAoAgxBAWo2AgwLRwECfwJAIAAoAgAiAkUNACACIABBFGooAgAiASAANQIQIAJBAWqtfqdqQX9qQQAgAWtxIgFqQQlqRQ0AIAAoAgwgAWsQKwsLYAECfyMAQRBrIgEkACABQeiCwABBFRCFAkEMQQQQ9wIiAkUEQEEMQQQQmwMACyACIAEpAwA3AgAgAkEIaiABQQhqKAIANgIAIABB4IDAADYCBCAAIAI2AgAgAUEQaiQAC2ECAX8BfiMAQRBrIgIkAEEAIAEoAgARBgAiAQRAIAEgASkDACIDQgF8NwMAIAAgASkDCDcDCCAAIAM3AwAgAkEQaiQADwtBsJTAAEHGACACQQhqQfiUwABB2JXAABC0AQALSgEBfyMAQSBrIgAkACAAQRRqQQE2AgAgAEEcakEANgIAIABB5MvAADYCECAAQcjLwAA2AhggAEEANgIIIABBCGpBvMzAABCoAgALTQEBfyMAQTBrIgEkACABQRBqEN0BIAFBKGogAUEYaigCADYCACABIAEpAxA3AyAgAUEIaiABQSBqELECIAAgASkDCDcDACABQTBqJAALZwEBfyMAQSBrIgMkACADIAI2AgwgA0EQaiICQYACOwEEIAJBBmpBADoAACACQf0FNgIAIANBEGogACABIANBDGoQJQRAQcCcwABBIiADQRhqQeyXwABBtJ3AABC0AQALIANBIGokAAtMAQJ/IAAoAggiAQRAIAAoAgQhACABQQR0IQEDQCAALQAAIgJBfmpBB0kgAkVyRQRAIABBBGoQmgILIABBEGohACABQXBqIgENAAsLC1YBAn8gASgCACECIAFBADYCAAJAIAIEQCABKAIEIQNBCEEEEPcCIgFFDQEgASADNgIEIAEgAjYCACAAQdiywAA2AgQgACABNgIADwsAC0EIQQQQmwMAC1IBA38jAEEQayIBJAAgAUEIahCPAhC0AiABKAIMIQICQCABKAIIRQRAQQEhAwwBCyACQYQBSQ0AIAIQAAsgACACNgIEIAAgAzYCACABQRBqJAALSwECfyMAQRBrIgEkACABIABBeGo2AgggAC0AFCAAQQE6ABQgASABQQhqNgIMQQFxRQRAIAFBDGoQ4AELIAFBCGoQtQEgAUEQaiQAC18BA38jAEEQayIBJAACQCAAKAIMIgIEQCAAKAIIIgNFDQEgASACNgIIIAEgADYCBCABIAM2AgAgARC2AgALQfC+wABBK0HMxsAAEPcBAAtB8L7AAEErQbzGwAAQ9wEAC1ACAn8CfiABQRBqKAIAIgIgASkDACIEIAKtIgUgBCAFVBunIgNJBEAgAyACQcyEwAAQhgMACyAAIAIgA2s2AgQgACABQQxqKAIAIANqNgIAC0gBA38jAEEQayICJAAgAiABNgIMQQEhASACQQxqKAIAEBJBAUYgAigCDCEDBEBBACEBCyAAIAM2AgQgACABNgIAIAJBEGokAAtIAQN/IwBBEGsiAiQAIAIgATYCDEEBIQEgAkEMaigCABALQQBHIAIoAgwhAwRAQQAhAQsgACADNgIEIAAgATYCACACQRBqJAALSgEBfyMAQRBrIgQkACABIAIgAygCABANIQEgBEEIahC9AiAAAn8gASAEKAIIIgFFDQAaIAQoAgwLNgIEIAAgATYCACAEQRBqJAALWAECfyMAQRBrIgEkACABIAA2AgRBAEHMucAAKAIAEQYAIgIEQCACIAAQtgEgAUEQaiQADwsgAUEEahC1AUGiusAAQcYAIAFBCGpB6LrAAEHIu8AAELQBAAtYAQF/IwBBIGsiACQAIABBDGpBATYCACAAQRRqQQE2AgAgAEGomMAANgIIIABBADYCACAAQQc2AhwgAEHIm8AANgIYIAAgAEEYajYCECAAQdCbwAAQqAIAC0YBAX8jAEEQayICJAAgASgCABAMIQEgAkEIahC9AiAAAn8gASACKAIIIgFFDQAaIAIoAgwLNgIEIAAgATYCACACQRBqJAALUgEBfyMAQSBrIgMkACADQQxqQQE2AgAgA0EUakEANgIAIANBnM7AADYCECADQQA2AgAgAyABNgIcIAMgADYCGCADIANBGGo2AgggAyACEKgCAAtTAQF/IwBBIGsiAiQAIAJBDGpBATYCACACQRRqQQE2AgAgAkHAz8AANgIIIAJBADYCACACQYQBNgIcIAIgADYCGCACIAJBGGo2AhAgAiABEKgCAAtDAQN/AkAgAkUNAANAIAAtAAAiBCABLQAAIgVGBEAgAEEBaiEAIAFBAWohASACQX9qIgINAQwCCwsgBCAFayEDCyADC0sBAX8jAEEQayICJAAgAkEIaiAAIAFBARCMAQJAIAIoAgwiAEGBgICAeEcEQCAARQ0BIAIoAgggABCbAwALIAJBEGokAA8LEJgCAAtIAQF/IwBBEGsiAiQAIAJBCGogACABEH8CQCACKAIMIgBBgYCAgHhHBEAgAEUNASACKAIIIAAQmwMACyACQRBqJAAPCxCYAgALSAEBfyMAQRBrIgIkACACQQhqIAAgARB8AkAgAigCDCIAQYGAgIB4RwRAIABFDQEgAigCCCAAEJsDAAsgAkEQaiQADwsQmAIAC0gBAX8jAEEQayICJAAgAkEIaiAAIAEQfQJAIAIoAgwiAEGBgICAeEcEQCAARQ0BIAIoAgggABCbAwALIAJBEGokAA8LEJgCAAtIAQF/IwBBEGsiAiQAIAJBCGogACABEH4CQCACKAIMIgBBgYCAgHhHBEAgAEUNASACKAIIIAAQmwMACyACQRBqJAAPCxCYAgALSwEBfyMAQRBrIgMkACADQQhqIAAgASACEIwBAkAgAygCDCIAQYGAgIB4RwRAIABFDQEgAygCCCAAEJsDAAsgA0EQaiQADwsQmAIAC00BAn8jAEEQayICJAAgACgCACEDIABBADYCACADRQRAQai3wABBHBCWAwALIAIgAzYCDCADQQhqQQAgARB6IAJBDGoQrwEgAkEQaiQAC00BAn8jAEEQayICJAAgACgCACEDIABBADYCACADRQRAQai3wABBHBCWAwALIAIgAzYCDCADQQhqQQEgARB6IAJBDGoQrwEgAkEQaiQAC0MBAn8jAEEQayIBJAAgASAAQXhqNgIIIAAtABQgAEEBOgAUIAEgAUEIajYCDEEBcUUEQCABQQxqEOABCyABQRBqJAALSQEBfyMAQRBrIgIkACACQQhqIAAgARCAAQJAIAIoAgwiAEGBgICAeEcEQCAARQ0BIAIoAgggABCbAwALIAJBEGokAA8LEJgCAAtOAQF/IwBBEGsiBCQAIAEoAgAgAigCACADKAIAEBkhASAEQQhqEL0CIAQoAgwhAiAAIAQoAggiAzYCACAAIAIgASADGzYCBCAEQRBqJAALSQEDfyMAQRBrIgMkACADQQhqIAIQ3gEgAygCCCEEIAAgAygCDCIFNgIEIAAgBDYCACAFIAEgAhCiAxogACACNgIIIANBEGokAAtQAQF/QSBBBBD3AiIBRQRAQSBBBBCbAwALIAFCgYCAgBA3AgAgASAAKQIANwIIIAFBEGogAEEIaikCADcCACABQRhqIABBEGopAgA3AgAgAQtKAQF/IwBBsAFrIgEkACABIABBqAEQogMiACAANgKsASAAQawBakGsgcAAEKcDIAAtAKABQQNGBEAgAEEIahCsAgsgAEGwAWokAAtFAQJ/IAAtAABBA0YEQCAAKAIEIgEoAgAgASgCBCgCABECACABKAIEIgIoAgQEQCACKAIIGiABKAIAECsLIAAoAgQQKwsLSAEBfyAAKAIAIgEEQCABIAAoAgQoAgARAgAgACgCBCIBKAIEBEAgASgCCBogACgCABArCyAAKAIIIABBDGooAgAoAgwRAgALC0gBAX8gACgCACIAKAIAIAAoAggiA2sgAkkEQCAAIAMgAhCEASAAKAIIIQMLIAAoAgQgA2ogASACEKIDGiAAIAIgA2o2AghBAAtIAQF/IAAoAgAiACgCACAAKAIIIgNrIAJJBEAgACADIAIQhQEgACgCCCEDCyAAKAIEIANqIAEgAhCiAxogACACIANqNgIIQQALPgECfyMAQRBrIgEkACABQQhqIABBCGooAgAiAjYCACABIAApAgA3AwAgASgCBCACEAEgARCaAiABQRBqJAALQQECfyAAKAIIIgEEQCAAKAIEIQAgAUECdCEBA0AgACgCACICQYQBTwRAIAIQAAsgAEEEaiEAIAFBfGoiAQ0ACwsLTwEBfyAAKAIAIgAgACgCAEF/aiIBNgIAAkAgAQ0AIABBDGoiARCVASABKAIABEAgASgCBBAr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7MAAKAIAIABrECsLCzEAAkACfwJAAkAgAC0AkAEOBAADAwEDCyAAQYQBagwBCyAAEK4BIABB+ABqCxCaAgsLLwEBfyMAQRBrIgIkACACIAAoAgA2AgwgAkEMaiABEGogAkEMahCOAiACQRBqJAALLgEBfyAAKAIEBEAgAEEEahCOAiAAKAIAIgFBhAFPBEAgARAACyAAQQhqEKkCCwskACMAQRBrIgAkACAAQQhqIAEQvwIgAEEIahDOASAAQRBqJAALMwEBf0E0QQQQ9wIiAUUEQEE0QQQQmwMACyABQoGAgIAQNwIAIAFBCGogAEEsEKIDGiABCzIBAX8gACABKAIAIAEoAggiAksEfyABIAIQngIgASgCCAUgAgs2AgQgACABKAIENgIACzIBAX8gACABKAIAIAEoAggiAksEfyABIAIQnwIgASgCCAUgAgs2AgQgACABKAIENgIACy4BAX8gASgCACICBEAgAEEBNgIIIAAgAjYCBCAAIAEoAgQ2AgAPCyAAQQA2AggLIwEBfwJ/QQEgARAJRQ0AGkEACyECIAAgATYCBCAAIAI2AgALMAEBfyABQXhqIgIgAigCAEEBaiICNgIAIAJFBEAACyAAQdC5wAA2AgQgACABNgIACy0BAX8jAEEQayIBJAAgAUEIaiAAQQhqKAIANgIAIAEgACkCADcDACABEKwBAAskACAAKAIAQXBqIgAQmgIgAEEMaigCACIAQYQBTwRAIAAQAAsLMQEBf0EEQQQQ9wIiAkUEQEEEQQQQmwMACyACIAE2AgAgAEGAt8AANgIEIAAgAjYCAAsxAQF/QQRBBBD3AiICRQRAQQRBBBCbAwALIAIgATYCACAAQZS3wAA2AgQgACACNgIACycAIAAgACgCBEEBcSABckECcjYCBCAAIAFqIgAgACgCBEEBcjYCBAsmAQF/IwBBEGsiASQAIAEgAEF4ajYCDCABQQxqELUBIAFBEGokAAsmAAJAIABFDQAgACABKAIAEQIAIAEoAgRFDQAgASgCCBogABArCws6AQJ/QZDtwAAtAAAhAUGQ7cAAQQA6AABBlO3AACgCACECQZTtwABBADYCACAAIAI2AgQgACABNgIACzEAIABBAzoAICAAQoCAgICABDcCGCAAQQA2AhAgAEEANgIIIAAgAjYCBCAAIAE2AgALMgEBfyABKAIAQZu/wABBCyABKAIEKAIMEQUAIQIgAEEAOgAFIAAgAjoABCAAIAE2AgALIAEBfwJAIABBBGooAgAiAUUNACAAKAIARQ0AIAEQKwsLJgEBfyMAQRBrIgMkACADIAE2AgwgAyAANgIIIANBCGogAhD4AQALEwAgACABKQAANwABIABBADoAAAsmAQF/IABBB2oiASAASQRAQbCxwABBM0G0ssAAEIoDAAsgAUEDdgsjAAJAIAFB/P///wdNBEAgACABQQQgAhDoAiIADQELAAsgAAsjACACIAIoAgRBfnE2AgQgACABQQFyNgIEIAAgAWogATYCAAseACAAKAIAIgCtQgAgAKx9IABBf0oiABsgACABEFoLKgACQAJAAkAgAC0AqgEOBAACAgECCyAAQYABahC4AQ8LIABBCGoQrgELCyUAIABFBEBB57vAAEEyEJYDAAsgACACIAMgBCAFIAEoAhARCwALHQAgACgCACgCACABKAIMQQAgAmtBGGxqQWhqEEMLEQAgACgCAARAIAAoAgQQKwsLIAEBfyAAKAIAIAAoAggiAmsgAUkEQCAAIAIgARD/AQsLIwAgAEUEQEHnu8AAQTIQlgMACyAAIAIgAyAEIAEoAhARFAALIwAgAEUEQEHnu8AAQTIQlgMACyAAIAIgAyAEIAEoAhARBAALIwAgAEUEQEHnu8AAQTIQlgMACyAAIAIgAyAEIAEoAhARCgALIwAgAEUEQEHnu8AAQTIQlgMACyAAIAIgAyAEIAEoAhARFQALIwAgAEUEQEHnu8AAQTIQlgMACyAAIAIgAyAEIAEoAhARDgALFwAgASADRgR/IAAgAiABEPkBRQVBAAsLHgAgACABQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIECyEAIABFBEBB57vAAEEyEJYDAAsgACACIAMgASgCEBEDAAsUACAAKAIABEAgAEEEaigCABArCwsaACAAKAIAKAIAIAEoAgwgAkEEdGtBcGoQQwsdACABKAIARQRAAAsgAEHYssAANgIEIAAgATYCAAsfACAARQRAQcC0wABBMhCWAwALIAAgAiABKAIQEQAACx8AIABFBEBB8LnAAEEyEJYDAAsgACACIAEoAhARAAALHwAgAEUEQEHnu8AAQTIQlgMACyAAIAIgASgCEBEBAAsXACAAKAIABEAgABCpAiAAQQxqEKkCCwsfAQF/IAAoAgQgACgCCBABIAAoAgAEQCAAKAIEECsLCx4BAX9B9OzAACEBQfDswAAoAgAEfyABBSAAEMsBCwsZAQF/IAAoAhAiAQR/IAEFIABBFGooAgALCxkAIAEgAiADEJcCIABBBDoAACAAIAM2AgQLFwAgAEEEaigCACAAQQhqKAIAIAEQnAMLEgBBAEEZIABBAXZrIABBH0YbCxYAIAAgAUEBcjYCBCAAIAFqIAE2AgALFgAgAEEEaigCACAAQQhqKAIAIAEQLwsTAEHI7MAAKAIABEAQmQEQpAILCxcAQeDswAAoAgBFBEAgABBvC0Hc7MAACxcAIAAgAjYCCCAAIAE2AgQgACACNgIACxAAIAAgAWpBf2pBACABa3ELEgAgAC0AAEEERwRAIAAQiAILCwwAIAAgASACIAMQLgsLACABBEAgABArCwsPACAAQQF0IgBBACAAa3ILGQAgASgCAEHUzsAAQQsgASgCBCgCDBEFAAsZACABKAIAQd/OwABBDiABKAIEKAIMEQUACxkAIAEoAgBB6OTAAEEFIAEoAgQoAgwRBQALEwAgACgCACgCCCABIAIQlwJBAAsSACABIAIgAxCXAiAAQQQ6AAALCgAgAEEIahCaAgsPACAAKAIABEAgABCvAQsLFAAgACgCACABIAAoAgQoAgwRAQALDwAgACABIAIgAyAEECkACw4AIAAoAgAgARBwGkEACxAAIAAoAgggASACEJcCQQALEAAgACgCACABIAIQlwJBAAsIACAAIAEQSQsRACAAKAIAIAAoAgQgARCcAwsQACAAIAI2AgQgACABNgIACxYAQZTtwAAgADYCAEGQ7cAAQQE6AAALEwAgAEHsxsAANgIEIAAgATYCAAsNACAALQAEQQJxQQF2Cw8AIAAgAUEEaikCADcDAAsQACABIAAoAgAgACgCBBAsCw0AIAAgASACEJcCQQALCgBBACAAayAAcQsLACAALQAEQQNxRQsMACAAIAFBA3I2AgQLDQAgACgCACAAKAIEagsNACAAKAIAIAEQWEEACw4AIAAoAgAaA0AMAAsACwwAIAAgASACEMQBAAsMACAAIAEgAhDFAQALDAAgACABIAIQxgEACw0AIAA1AgBBASABEFoLDAAgACABIAIQwQIACw0AIAAoAgAgASACEEcLDQAgACkDAEEBIAEQWgsNACAAMwEAQQEgARBaCw4AIAAoAgAtAAAgARBdCwsAIAAjAGokACMACwoAIAAgASACEDsLCwAgACACIAEQoQELBwAgABCaAgsNACABQeiVwABBAhAsCwsAIAAoAgAgARBKCwsAIAAgAUHdABAiCwkAIAAgARAhAAsKACAAKAIEQXhxCwoAIAAoAgRBAXELCgAgACgCDEEBcQsKACAAKAIMQQF2CxoAIAAgAUGY7cAAKAIAIgBB8QAgABsRAAAACwoAIAIgACABECwLDAAgACABKQIANwMACwwAIAAgASkCCDcDAAsLACAAKAIAIAEQWwsNACABQejSwABBAhAsCwoAIAAgASACEDULCgAgACABIAIQWQsLACAAIAEgAhCWAQsHACAAEMEBCwkAIABBBDoAAAsJACAAQQA2AgALCAAgACABEBoLBwAgACABagsHACAAIAFrCwcAIABBCGoLBwAgAEF4agsHACAAENoBCwcAIAAQjgILBABBAQsLAELys9u82+mRJQsNAELIteDPyobb04l/Cw0AQu/Fjf7k3bzN8wALDABCs7b38aLcov4ECwMAAQsDAAELC91rBABBgIDAAAu0VQEAAAAEAAAABAAAAAIAAAADAAAAAwAAAAEAAAAEAAAABAAAAAQAAAAFAAAABQAAAP//////////YHVud3JhcF90aHJvd2AgZmFpbGVkAAAACQAAAAwAAAAEAAAACgAAAAkAAAAMAAAABAAAAAsAAAAKAAAAUAAQAAwAAAANAAAADgAAAAwAAAAPAAAAEAAAAGABAAAIAAAAEQAAABIAAAAgAgAACAAAABMAAAAUAAAABAAAAAQAAAAVAAAAFgAAABQAAAAEAAAABAAAABcAAAAYAAAAL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvd2FzbS1iaW5kZ2VuLWZ1dHVyZXMtMC40LjM0L3NyYy9saWIucnPUABAAXAAAANoAAAAVAAAAYGFzeW5jIGZuYCByZXN1bWVkIGFmdGVyIGNvbXBsZXRpb24AGQAAAGZhaWxlZCB0byBmaWxsIGJ1ZmZlcmZhaWxlZCB0byBmaWxsIHdob2xlIGJ1ZmZlcn0BEAAbAAAAJQAAAC9ydXN0Yy9mYzU5NGYxNTY2OTY4MGZhNzBkMjU1ZmFlYzNjYTNmYjUwN2MzNDA1L2xpYnJhcnkvc3RkL3NyYy9pby9pbXBscy5ycwCkARAASwAAAPIAAAANAAAAL3J1c3RjL2ZjNTk0ZjE1NjY5NjgwZmE3MGQyNTVmYWVjM2NhM2ZiNTA3YzM0MDUvbGlicmFyeS9zdGQvc3JjL2lvL2N1cnNvci5ycwACEABMAAAA6wAAAAoAAAAvcnVzdGMvZmM1OTRmMTU2Njk2ODBmYTcwZDI1NWZhZWMzY2EzZmI1MDdjMzQwNS9saWJyYXJ5L3N0ZC9zcmMvaW8vcmVhZGJ1Zi5ycwAAAFwCEABNAAAAIQEAACsAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQAAFAAAAAAAAAABAAAAGgAAAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzL2Jhc2U2NC0wLjEzLjEvc3JjL2NodW5rZWRfZW5jb2Rlci5ycwAAJAMQAFoAAAAtAAAAGgAAACQDEABaAAAANwAAAEQAAAAkAxAAWgAAADoAAAAnAAAAL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvYmFzZTY0LTAuMTMuMS9zcmMvZW5jb2RlLnJzAAAAsAMQAFEAAAC2AAAAIAAAALADEABRAAAAtwAAACUAAACwAxAAUQAAAPwAAAAcAAAAsAMQAFEAAAD9AAAAIQAAALADEABRAAAAEwEAAC4AAACwAxAAUQAAABMBAAAJAAAAsAMQAFEAAAAUAQAACQAAALADEABRAAAACwEAAC4AAACwAxAAUQAAAAsBAAAJAAAAsAMQAFEAAAANAQAADwAAALADEABRAAAADAEAAAkAAACwAxAAUQAAAA8BAAAJAAAAsAMQAFEAAACgAAAAKgAAAHVzZHBsLWZyb250L3NyYy9jb25uZWN0aW9uLnJzAAAA1AQQAB0AAAAZAAAAJgAAAFBPU1RodHRwOi8vdXNkcGwuOi91c2RwbC9jYWxsAAAACAUQAAwAAAAUBRAAAQAAABUFEAABAAAAFgUQAAsAAABsb2NhbGhvc3QAAABEBRAACQAAANQEEAAdAAAALQAAACQAAADUBBAAHQAAADQAAAAnAAAA1AQQAB0AAABJAAAAJgAAAEV4cGVjdGVkIGNhbGwgcmVzcG9uc2UgbWVzc2FnZSwgZ290IHNvbWV0aGluZyBlbHNldXNkcGwtZnJvbnQvc3JjL2xpYi5yc7oFEAAWAAAAcAAAAE4AAAC6BRAAFgAAAG8AAAABAAAAugUQABYAAACfAAAAJgAAALoFEAAWAAAAngAAAAEAAAAvcnVzdGMvZmM1OTRmMTU2Njk2ODBmYTcwZDI1NWZhZWMzY2EzZmI1MDdjMzQwNS9saWJyYXJ5L3N0ZC9zcmMvaW8vbW9kLnJzAAAAEAYQAEkAAABTAQAAGAAAAHN0cmVhbSBkaWQgbm90IGNvbnRhaW4gdmFsaWQgVVRGLTgAAGwGEAAiAAAAFQAAABAGEABJAAAAhwEAABsAAAAvcnVzdGMvZmM1OTRmMTU2Njk2ODBmYTcwZDI1NWZhZWMzY2EzZmI1MDdjMzQwNS9saWJyYXJ5L3N0ZC9zcmMvaW8vcmVhZGJ1Zi5ycwAAAKwGEABNAAAAywAAADYAAAAbAAAADAAAAAQAAAAcAAAAHQAAAB4AAABhIERpc3BsYXkgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3IgdW5leHBlY3RlZGx5AB8AAAAAAAAAAQAAACAAAAAvcnVzdGMvZmM1OTRmMTU2Njk2ODBmYTcwZDI1NWZhZWMzY2EzZmI1MDdjMzQwNS9saWJyYXJ5L2FsbG9jL3NyYy9zdHJpbmcucnMAbAcQAEsAAADoCQAACQAAAB8AAAAEAAAABAAAACEAAAAiAAAAIwAAAGNhbGxlZCBgT3B0aW9uOjp1bndyYXAoKWAgb24gYSBgTm9uZWAgdmFsdWUAJAAAADAuMTAuMHVzZHBsLWZyb250L3NyYy9saWIucnMWCBAAFgAAAGEAAAAYAAAAFggQABYAAABpAAAAGAAAABYIEAAWAAAAwwAAAEAAAAAWCBAAFgAAANEAAABAAAAAJQAAAAwAAAAEAAAAJgAAACcAAAAoAAAAKQAAACoAAAArAAAALAAAAC9jYXlsb24vc3JjL3VzZHBsX2Zyb250L3VzZHBsLXJzL3VzZHBsLWNvcmUvc3JjL3NlcmRlcy90cmFpdHMucnOUCBAAQAAAAHYAAAAcAAAALQAAABgAAAAIAAAALgAAAC8AAAAwAAAAMQAAADIAAAAzAAAANAAAADUAAABgdW53cmFwX3Rocm93YCBmYWlsZWRmYWlsZWQgdG8gd3JpdGUgd2hvbGUgYnVmZmVyAAAAJQkQABwAAAAXAAAANgAAAAwAAAAEAAAANwAAADgAAAA5AAAAZm9ybWF0dGVyIGVycm9yAGgJEAAPAAAAKAAAAC9ydXN0Yy9mYzU5NGYxNTY2OTY4MGZhNzBkMjU1ZmFlYzNjYTNmYjUwN2MzNDA1L2xpYnJhcnkvc3RkL3NyYy9pby9tb2QucnMAAACECRAASQAAACQFAAAWAAAAhAkQAEkAAAAoBQAADQAAAGFkdmFuY2luZyBpbyBzbGljZXMgYmV5b25kIHRoZWlyIGxlbmd0aADwCRAAJwAAAIQJEABJAAAAJgUAAA0AAABjYW5ub3QgYWNjZXNzIGEgVGhyZWFkIExvY2FsIFN0b3JhZ2UgdmFsdWUgZHVyaW5nIG9yIGFmdGVyIGRlc3RydWN0aW9uAAA6AAAAAAAAAAEAAAA7AAAAL3J1c3RjL2ZjNTk0ZjE1NjY5NjgwZmE3MGQyNTVmYWVjM2NhM2ZiNTA3YzM0MDUvbGlicmFyeS9zdGQvc3JjL3RocmVhZC9sb2NhbC5ycwCIChAATwAAAKYBAAAJAAAAKCkAACUAAAAMAAAABAAAADwAAAA9AAAAHgAAAGEgRGlzcGxheSBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvciB1bmV4cGVjdGVkbHkAOgAAAAAAAAABAAAAIAAAAC9ydXN0Yy9mYzU5NGYxNTY2OTY4MGZhNzBkMjU1ZmFlYzNjYTNmYjUwN2MzNDA1L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwBMCxAASwAAAOgJAAAJAAAAOgAAAAQAAAAEAAAAPgAAAD8AAABAAAAAY2FsbGVkIGBPcHRpb246OnVud3JhcCgpYCBvbiBhIGBOb25lYCB2YWx1ZQA6AAAAAAAAAAEAAABBAAAAaW50ZXJuYWwgZXJyb3I6IGVudGVyZWQgdW5yZWFjaGFibGUgY29kZTogAAD8CxAAKgAAAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzL2Jhc2U2NC0wLjEzLjEvc3JjL2RlY29kZS5ycwAAADAMEABRAAAA2QEAAB8AAAAwDBAAUQAAAN8BAAAfAAAAMAwQAFEAAADoAQAAHwAAADAMEABRAAAA8QEAAB8AAAAwDBAAUQAAAPoBAAAfAAAAMAwQAFEAAAADAgAAHwAAADAMEABRAAAADAIAAB8AAAAwDBAAUQAAABUCAAAfAAAAMAwQAFEAAAAKAQAAJAAAADAMEABRAAAACwEAACkAAAAwDBAAUQAAADEBAAAWAAAAMAwQAFEAAAA0AQAAGgAAADAMEABRAAAASAEAAA4AAAAwDBAAUQAAAEsBAAASAAAAMAwQAFEAAABfAQAAEwAAAEltcG9zc2libGU6IG11c3Qgb25seSBoYXZlIDAgdG8gOCBpbnB1dCBieXRlcyBpbiBsYXN0IGNodW5rLCB3aXRoIG5vIGludmFsaWQgbGVuZ3Roc3QNEABUAAAAMAwQAFEAAACkAQAADgAAADAMEABRAAAAuAEAAAkAAABPdmVyZmxvdyB3aGVuIGNhbGN1bGF0aW5nIG91dHB1dCBidWZmZXIgbGVuZ3RoAAAwDBAAUQAAAJ0AAAAKAAAAMAwQAFEAAACiAAAAIQAAAFdyaXRpbmcgdG8gYSBTdHJpbmcgc2hvdWxkbid0IGZhaWwvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9iYXNlNjQtMC4xMy4xL3NyYy9lbmNvZGUucnMAYg4QAFEAAABTAAAADgAAAAAAAAD//////////3VzZHBsLWZyb250L3NyYy9jb252ZXJ0LnJzAADQDhAAGgAAACAAAAAnAAAAY3JhbmtzaGFmdAAA/A4QAAoAAABkZWNreQAAABAPEAAFAAAAYW55ACAPEAADAAAATG9hZEVycm9yOiBJbygpACwPEAAOAAAAOg8QAAEAAABMb2FkRXJyb3I6IEludmFsaWREYXRhAABMDxAAFgAAAExvYWRFcnJvcjogVG9vU21hbGxCdWZmZXIAAABsDxAAGQAAAER1bXBFcnJvcjogSW8oAACQDxAADgAAADoPEAABAAAARHVtcEVycm9yOiBVbnN1cHBvcnRlZAAAsA8QABYAAABEdW1wRXJyb3I6IFRvb1NtYWxsQnVmZmVyAAAA0A8QABkAAAAvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy9iYXNlNjQtMC4xMy4xL3NyYy9lbmNvZGUucnMAAAD0DxAAUQAAADsBAAAJAAAAISIjJCUmJygpKissLTAxMjM0NTY3ODlAQUJDREVGR0hJSktMTU5QUVJTVFVWWFlaW2BhYmNkZWhpamtsbXBxckFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5KywuL0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Li8wMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV9BQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsv////////////////////////////////////////////AAECAwQFBgcICQoLDP//DQ4PEBESExQVFv///////xcYGRobHB0eHyAhIiMkJf8mJygpKiss/y0uLzD/////MTIzNDU2//83ODk6Ozz//z0+P/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8+P////zQ1Njc4OTo7PD3/////////AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBn///////8aGxwdHh8gISIjJCUmJygpKissLS4vMDEyM///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAE2Nzg5Ojs8PT4//////////wIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRob////////HB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDX//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wABAgMEBQYHCAkKC/////////8MDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJf///////yYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z7//zQ1Njc4OTo7PD3/////////AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBn/////P/8aGxwdHh8gISIjJCUmJygpKissLS4vMDEyM///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pv///z80NTY3ODk6Ozw9/////////wABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZ////////GhscHR4fICEiIyQlJicoKSorLC0uLzAxMjP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mBEQAFgREAAYERAA2BAQAJgQEABYEBAA2BYQANgVEADYFBAA2BMQANgSEADYERAAY2FsbGVkIGBSZXN1bHQ6OnVud3JhcCgpYCBvbiBhbiBgRXJyYCB2YWx1ZQBDAAAACAAAAAQAAABEAAAAL3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvYmFzZTY0LTAuMTMuMS9zcmMvY2h1bmtlZF9lbmNvZGVyLnJzAABEGBAAWgAAAGgAAAAwAAAAT3ZlcmZsb3cgd2hlbiBjYWxjdWxhdGluZyBudW1iZXIgb2YgY2h1bmtzIGluIGlucHV0L3Jvb3QvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9naXRodWIuY29tLTFlY2M2Mjk5ZGI5ZWM4MjMvYmFzZTY0LTAuMTMuMS9zcmMvZGVjb2RlLnJz4xgQAFEAAADDAAAACgAAAEUAAAAIAAAABAAAAEYAAABHAAAARQAAAAgAAAAEAAAASAAAAGJvZHltZXRob2Rtb2Rlc2FtZS1vcmlnaW5uby1jb3JzY29yc25hdmlnYXRlYXR0ZW1wdGVkIHRvIGNvbnZlcnQgaW52YWxpZCBSZXF1ZXN0TW9kZSBpbnRvIEpTVmFsdWUvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy93ZWItc3lzLTAuMy42MS9zcmMvZmVhdHVyZXMvZ2VuX1JlcXVlc3RNb2RlLnJzAAAAyRkQAGQAAAADAAAAAQAAAGNsb3N1cmUgaW52b2tlZCByZWN1cnNpdmVseSBvciBhZnRlciBiZWluZyBkcm9wcGVkAABMAAAABAAAAAQAAABNAAAATgAAAGFscmVhZHkgYm9ycm93ZWRPAAAAAAAAAAEAAABQAAAAYWxyZWFkeSBtdXRhYmx5IGJvcnJvd2VkTwAAAAAAAAABAAAAUQAAAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzL3dhc20tYmluZGdlbi1mdXR1cmVzLTAuNC4zNC9zcmMvcXVldWUucnMAANAaEABeAAAAGgAAAC4AAADQGhAAXgAAAB0AAAApAAAA0BoQAF4AAAAyAAAAGgAAAGFscmVhZHkgYm9ycm93ZWRSAAAAAAAAAAEAAABQAAAAUwAAAAQAAAAEAAAAVAAAAFUAAABTAAAABAAAAAQAAABWAAAAVwAAAEZuT25jZSBjYWxsZWQgbW9yZSB0aGFuIG9uY2Uvcm9vdC8uY2FyZ28vcmVnaXN0cnkvc3JjL2dpdGh1Yi5jb20tMWVjYzYyOTlkYjllYzgyMy93YXNtLWJpbmRnZW4tZnV0dXJlcy0wLjQuMzQvc3JjL2xpYi5yc8QbEABcAAAApQAAAA8AAADEGxAAXAAAAIUAAAAnAAAAxBsQAFwAAACvAAAAJAAAAC9yb290Ly5jYXJnby9yZWdpc3RyeS9zcmMvZ2l0aHViLmNvbS0xZWNjNjI5OWRiOWVjODIzL3dhc20tYmluZGdlbi1mdXR1cmVzLTAuNC4zNC9zcmMvdGFzay9zaW5nbGV0aHJlYWQucnMAAFAcEABqAAAAIQAAABUAAABYAAAAWQAAAFoAAABbAAAAXAAAAFAcEABqAAAAVQAAACUAAABjbG9zdXJlIGludm9rZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgYmVpbmcgZHJvcHBlZGNhbm5vdCBhY2Nlc3MgYSBUaHJlYWQgTG9jYWwgU3RvcmFnZSB2YWx1ZSBkdXJpbmcgb3IgYWZ0ZXIgZGVzdHJ1Y3Rpb25eAAAAAAAAAAEAAAA7AAAAL3J1c3RjL2ZjNTk0ZjE1NjY5NjgwZmE3MGQyNTVmYWVjM2NhM2ZiNTA3YzM0MDUvbGlicmFyeS9zdGQvc3JjL3RocmVhZC9sb2NhbC5ycwB4HRAATwAAAKYBAAAJAAAAXwAAAHJldHVybiB0aGlzY2xvc3VyZSBpbnZva2VkIHJlY3Vyc2l2ZWx5IG9yIGFmdGVyIGJlaW5nIGRyb3BwZWRjYW5ub3QgYWNjZXNzIGEgVGhyZWFkIExvY2FsIFN0b3JhZ2UgdmFsdWUgZHVyaW5nIG9yIGFmdGVyIGRlc3RydWN0aW9uAGwAAAAAAAAAAQAAADsAAAAvcnVzdGMvZmM1OTRmMTU2Njk2ODBmYTcwZDI1NWZhZWMzY2EzZmI1MDdjMzQwNS9saWJyYXJ5L3N0ZC9zcmMvdGhyZWFkL2xvY2FsLnJzAHAeEABPAAAApgEAAAkAAABUcmllZCB0byBzaHJpbmsgdG8gYSBsYXJnZXIgY2FwYWNpdHnQHhAAJAAAAC9ydXN0Yy9mYzU5NGYxNTY2OTY4MGZhNzBkMjU1ZmFlYzNjYTNmYjUwN2MzNDA1L2xpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMucnP8HhAATAAAAKoBAAAJAAAAcgAAAAQAAAAEAAAAcwAAAHQAAAB1AAAAY2FsbGVkIGBPcHRpb246OnVud3JhcCgpYCBvbiBhIGBOb25lYCB2YWx1ZUFjY2Vzc0Vycm9yAABwHxAAAAAAAHVuY2F0ZWdvcml6ZWQgZXJyb3JvdGhlciBlcnJvcm91dCBvZiBtZW1vcnl1bmV4cGVjdGVkIGVuZCBvZiBmaWxldW5zdXBwb3J0ZWRvcGVyYXRpb24gaW50ZXJydXB0ZWRhcmd1bWVudCBsaXN0IHRvbyBsb25naW52YWxpZCBmaWxlbmFtZXRvbyBtYW55IGxpbmtzY3Jvc3MtZGV2aWNlIGxpbmsgb3IgcmVuYW1lZGVhZGxvY2tleGVjdXRhYmxlIGZpbGUgYnVzeXJlc291cmNlIGJ1c3lmaWxlIHRvbyBsYXJnZWZpbGVzeXN0ZW0gcXVvdGEgZXhjZWVkZWRzZWVrIG9uIHVuc2Vla2FibGUgZmlsZW5vIHN0b3JhZ2Ugc3BhY2V3cml0ZSB6ZXJvdGltZWQgb3V0aW52YWxpZCBkYXRhaW52YWxpZCBpbnB1dCBwYXJhbWV0ZXJzdGFsZSBuZXR3b3JrIGZpbGUgaGFuZGxlZmlsZXN5c3RlbSBsb29wIG9yIGluZGlyZWN0aW9uIGxpbWl0IChlLmcuIHN5bWxpbmsgbG9vcCly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CzAVEAFlBwIGAgIBBCMBHhtbCzoJCQEYBAEJAQMBBSsDPAgqGAEgNwEBAQQIBAEDBwoCHQE6AQEBAgQIAQkBCgIaAQICOQEEAgQCAgMDAR4CAwELAjkBBAUBAgQBFAIWBgEBOgEBAgEECAEHAwoCHgE7AQEBDAEJASgBAwE3AQEDBQMBBAcCCwIdAToBAgECAQMBBQIHAgsCHAI5AgEBAgQIAQkBCgIdAUgBBAECAwEBCAFRAQIHDAhiAQIJCwdJAhsBAQEBATcOAQUBAgULASQJAWYEAQYBAgICGQIEAxAEDQECAgYBDwEAAwADHQIeAh4CQAIBBwgBAgsJAS0DAQF1AiIBdgMEAgkBBgPbAgIBOgEBBwEBAQECCAYKAgEwHzEEMAcBAQUBKAkMAiAEAgIBAzgBAQIDAQEDOggCApgDAQ0BBwQBBgEDAsZAAAHDIQADjQFgIAAGaQIABAEKIAJQAgABAwEEARkCBQGXAhoSDQEmCBkLLgMwAQIEAgInAUMGAgICAgwBCAEvATMBAQMCAgUCAQEqAggB7gECAQQBAAEAEBAQAAIAAeIBlQUAAwECBQQoAwQBpQIABAACUANGCzEEewE2DykBAgIKAzEEAgIHAT0DJAUBCD4BDAI0CQoEAgFfAwIBAQIGAQIBnQEDCBUCOQIBAQEBFgEOBwMFwwgCAwEBFwFRAQIGAQECAQECAQLrAQIEBgIBAhsCVQgCAQECagEBAQIGAQFlAwIEAQUACQEC9QEKAgEBBAGQBAICBAEgCigGAgQIAQkGAgMuDQECAAcBBgEBUhYCBwECAQJ6BgMBAQIBBwEBSAIDAQEBAAILAjQFBQEBAQABBg8ABTsHAAE/BFEBAAIALgIXAAEBAwQFCAgCBx4ElAMANwQyCAEOARYFAQ8ABwERAgcBAgEFZAGgBwABPQQABAAHbQcAYIDwAAAEMhAAKAAAAD8BAAAJAEGQ7MAACwJpegBHCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4xOS4wDHdhc20tYmluZGdlbhIwLjIuODQgKGNlYThjYzNkMik=";

    function asciiToBinary(str) {
      if (typeof atob === 'function') {
        return atob(str)
      } else {
        return new Buffer(str, 'base64').toString('binary');
      }
    }

    function decode() {
      var binaryString =  asciiToBinary(encoded);
      var bytes = new Uint8Array(binaryString.length);
      for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return (async function() {return new Response(bytes.buffer);})();
    }

    function init_embedded() {
        return init(decode())
    }

    const USDPL_PORT = 44443;
    // Utility
    function resolve(promise, setter) {
        (async function () {
            let data = await promise;
            if (data != null) {
                console.debug("Got resolved", data);
                setter(data);
            }
            else {
                console.warn("Resolve failed:", data, promise);
                log(LogLevel.Warn, "A resolve failed");
            }
        })();
    }
    function resolve_nullable(promise, setter) {
        (async function () {
            let data = await promise;
            console.debug("Got resolved", data);
            setter(data);
        })();
    }
    async function initBackend() {
        // init usdpl
        await init_embedded();
        init_usdpl(USDPL_PORT);
        console.log("POWERTOOLS: USDPL started for framework: " + target_usdpl());
        const user_locale = navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
        console.log("POWERTOOLS: locale", user_locale);
        //let mo_path = "../plugins/PowerTools/translations/" + user_locale.toString() + ".mo";
        await init_tr(user_locale);
        //await init_tr("../plugins/PowerTools/translations/test.mo");
        //setReady(true);
    }
    // API
    async function getInfo() {
        return (await call_backend("V_INFO", []))[0];
    }
    // Battery
    async function getBatteryCurrent() {
        return (await call_backend("BATTERY_current_now", []))[0];
    }
    async function getBatteryChargeNow() {
        return (await call_backend("BATTERY_charge_now", []))[0];
    }
    async function getBatteryChargeFull() {
        return (await call_backend("BATTERY_charge_full", []))[0];
    }
    async function getBatteryChargeDesign() {
        return (await call_backend("BATTERY_charge_design", []))[0];
    }
    async function getBatteryChargeRate() {
        return (await call_backend("BATTERY_get_charge_rate", []))[0];
    }
    async function setBatteryChargeRate(val) {
        return (await call_backend("BATTERY_set_charge_rate", [val]))[0];
    }
    async function unsetBatteryChargeRate() {
        return await call_backend("BATTERY_unset_charge_rate", []);
    }
    async function getBatteryChargeMode() {
        return (await call_backend("BATTERY_get_charge_mode", []))[0];
    }
    async function setBatteryChargeMode(val) {
        return (await call_backend("BATTERY_set_charge_mode", [val]))[0];
    }
    async function unsetBatteryChargeMode() {
        return await call_backend("BATTERY_unset_charge_mode", []);
    }
    // CPU
    async function setCpuSmt(status) {
        return await call_backend("CPU_set_smt", [status]);
    }
    async function getCpuSmt() {
        return (await call_backend("CPU_get_smt", []))[0];
    }
    /*export async function getCpuCount(): Promise<number> {
        return (await call_backend("CPU_count", []))[0];
    }*/
    async function setCpuOnline(index, online) {
        return (await call_backend("CPU_set_online", [index, online]))[0];
    }
    async function setCpuOnlines(onlines) {
        return await call_backend("CPU_set_onlines", onlines);
    }
    async function getCpusOnline() {
        return (await call_backend("CPU_get_onlines", [])); // -> online status for all CPUs
    }
    async function setCpuClockLimits(index, min, max) {
        return (await call_backend("CPU_set_clock_limits", [index, min, max])); // -> [min, max]
    }
    async function getCpuClockLimits(index) {
        return (await call_backend("CPU_get_clock_limits", [index])); // -> [min, max]
    }
    async function unsetCpuClockLimits(index) {
        return (await call_backend("CPU_unset_clock_limits", [index]));
    }
    async function setCpuGovernor(index, val) {
        return (await call_backend("CPU_set_governor", [index, val]))[0];
    }
    async function getCpusGovernor() {
        return (await call_backend("CPU_get_governors", [])); // -> governors for all CPUs
    }
    // GPU
    async function setGpuPpt(fast, slow) {
        return (await call_backend("GPU_set_ppt", [fast, slow])); // -> [fastPPT, slowPPT]
    }
    async function getGpuPpt() {
        return (await call_backend("GPU_get_ppt", [])); // -> [fastPPT, slowPPT]
    }
    async function unsetGpuPpt() {
        return (await call_backend("GPU_unset_ppt", []));
    }
    async function setGpuClockLimits(min, max) {
        return (await call_backend("GPU_set_clock_limits", [min, max])); // -> [min, max]
    }
    async function getGpuClockLimits() {
        return (await call_backend("GPU_get_clock_limits", [])); // -> [min, max]
    }
    async function unsetGpuClockLimits() {
        return (await call_backend("GPU_unset_clock_limits", []));
    }
    async function setGpuSlowMemory(val) {
        return (await call_backend("GPU_set_slow_memory", [val]))[0];
    }
    async function getGpuSlowMemory() {
        return (await call_backend("GPU_get_slow_memory", []))[0];
    }
    // general
    async function setGeneralPersistent(val) {
        return (await call_backend("GENERAL_set_persistent", [val]))[0];
    }
    async function getGeneralPersistent() {
        return (await call_backend("GENERAL_get_persistent", []))[0];
    }
    async function loadGeneralSettings(path, name) {
        return (await call_backend("GENERAL_load_settings", [path, name]))[0];
    }
    async function loadGeneralDefaultSettings() {
        return (await call_backend("GENERAL_load_default_settings", []))[0];
    }
    async function loadGeneralSystemSettings() {
        return (await call_backend("GENERAL_load_system_settings", []))[0];
    }
    async function getGeneralSettingsName() {
        return (await call_backend("GENERAL_get_name", []))[0];
    }
    async function waitForComplete() {
        return (await call_backend("GENERAL_wait_for_unlocks", []))[0];
    }
    async function getLimits() {
        return (await call_backend("GENERAL_get_limits", []))[0];
    }
    async function getDriverProviderName(name) {
        return (await call_backend("GENERAL_get_provider", [name]))[0];
    }
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["Trace"] = 1] = "Trace";
        LogLevel[LogLevel["Debug"] = 2] = "Debug";
        LogLevel[LogLevel["Info"] = 3] = "Info";
        LogLevel[LogLevel["Warn"] = 4] = "Warn";
        LogLevel[LogLevel["Error"] = 5] = "Error";
    })(LogLevel || (LogLevel = {}));
    async function log(level, msg) {
        return (await call_backend("LOG", [level, msg]))[0];
    }
    async function idk() {
        return (await call_backend("GENERAL_idk", []))[0];
    }

    const BACKEND_INFO = "VINFO";
    const DRIVER_INFO = "GENERAL_provider";
    const LIMITS_INFO = "LIMITS_all";
    const CURRENT_BATT = "BATTERY_current_now";
    const CHARGE_RATE_BATT = "BATTERY_charge_rate";
    const CHARGE_MODE_BATT = "BATTERY_charge_mode";
    const CHARGE_NOW_BATT = "BATTERY_charge_now";
    const CHARGE_FULL_BATT = "BATTERY_charge_full";
    const CHARGE_DESIGN_BATT = "BATTERY_charge_design";
    //export const TOTAL_CPUS = "CPUs_total";
    const ONLINE_CPUS = "CPUs_online";
    const ONLINE_STATUS_CPUS = "CPUs_status_online";
    const SMT_CPU = "CPUs_SMT";
    const CLOCK_MIN_CPU = "CPUs_min_clock";
    const CLOCK_MAX_CPU = "CPUs_max_clock";
    const CLOCK_MIN_MAX_CPU = "CPUs_minmax_clocks";
    const GOVERNOR_CPU = "CPUs_governor";
    const FAST_PPT_GPU = "GPU_fastPPT";
    const SLOW_PPT_GPU = "GPU_slowPPT";
    const CLOCK_MIN_GPU = "GPU_min_clock";
    const CLOCK_MAX_GPU = "GPU_max_clock";
    const SLOW_MEMORY_GPU = "GPU_slow_memory";
    const PERSISTENT_GEN = "GENERAL_persistent";
    const NAME_GEN = "GENERAL_name";

    let eggCount = 0;
    let now = new Date();
    let isSpecialDay = now.getDate() == 1 && now.getMonth() == 3;
    class Debug extends React.Component {
        render() {
            return buildDebug();
        }
    }
    function buildDebug() {
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, eggCount % 10 == 9 ? "Ha! Nerd" : tr("Debug")),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(Field, { label: eggCount % 10 == 9 ? "PowerTools" : tr("Native"), onClick: () => {
                        if (eggCount % 10 == 9) {
                            // you know you're bored and/or conceited when you spend time adding an easter egg
                            // that just sends people to your own project's repo
                            Router.NavigateToExternalWeb("https://github.com/NGnius/PowerTools/releases");
                        }
                        eggCount++;
                    } }, eggCount % 10 == 9 ? "by NGnius" : get_value(BACKEND_INFO))),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(Field, { label: tr("Framework"), onClick: () => eggCount++ }, eggCount % 10 == 9 ? "<3 <3 <3" : target_usdpl())),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(Field, { label: tr("Driver"), onClick: () => eggCount++ }, eggCount % 10 == 9 ? "Tracy Chapman" : get_value(DRIVER_INFO))),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(Field, { label: "USDPL", onClick: () => {
                        if (eggCount % 10 == 9) {
                            // you know you're bored and/or conceited when you spend time adding an easter egg
                            // that just sends people to your own project's repo
                            Router.NavigateToExternalWeb("https://github.com/NGnius/usdpl-rs");
                        }
                        eggCount++;
                    } },
                    "v",
                    version_usdpl())),
            (eggCount % 10 == 9 || isSpecialDay) && window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(ButtonItem, { layout: "below", onClick: (_) => {
                        idk();
                    } }, "???"))));
    }

    class Gpu extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                reloadThingy: "/shrug",
            };
        }
        render() {
            const reloadGUI = (x) => this.setState({ reloadThingy: x });
            return (window.SP_REACT.createElement(React.Fragment, null,
                window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, tr("GPU")),
                (get_value(LIMITS_INFO).gpu.fast_ppt_limits != null || get_value(LIMITS_INFO).gpu.slow_ppt_limits != null) && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(SLOW_PPT_GPU) != null || get_value(FAST_PPT_GPU) != null, label: tr("PowerPlay Limits"), description: tr("Override APU TDP settings"), onChange: (value) => {
                            if (value) {
                                if (get_value(LIMITS_INFO).gpu.slow_ppt_limits != null) {
                                    set_value(SLOW_PPT_GPU, get_value(LIMITS_INFO).gpu.slow_ppt_limits.max);
                                }
                                if (get_value(LIMITS_INFO).gpu.fast_ppt_limits != null) {
                                    set_value(FAST_PPT_GPU, get_value(LIMITS_INFO).gpu.fast_ppt_limits.max);
                                }
                                reloadGUI("GPUPPTToggle");
                            }
                            else {
                                set_value(SLOW_PPT_GPU, null);
                                set_value(FAST_PPT_GPU, null);
                                resolve(unsetGpuPpt(), (_) => {
                                    reloadGUI("GPUUnsetPPT");
                                });
                            }
                        } })),
                window.SP_REACT.createElement(PanelSectionRow, null, get_value(SLOW_PPT_GPU) != null && window.SP_REACT.createElement(SliderField, { label: tr("SlowPPT (W)"), value: get_value(SLOW_PPT_GPU), max: get_value(LIMITS_INFO).gpu.slow_ppt_limits.max, min: get_value(LIMITS_INFO).gpu.slow_ppt_limits.min, step: get_value(LIMITS_INFO).gpu.ppt_step, showValue: true, disabled: get_value(SLOW_PPT_GPU) == null, onChange: (ppt) => {
                        log(LogLevel.Debug, "SlowPPT is now " + ppt.toString());
                        const pptNow = get_value(SLOW_PPT_GPU);
                        const realPpt = ppt;
                        if (realPpt != pptNow) {
                            resolve(setGpuPpt(get_value(FAST_PPT_GPU), realPpt), (limits) => {
                                set_value(FAST_PPT_GPU, limits[0]);
                                set_value(SLOW_PPT_GPU, limits[1]);
                                reloadGUI("GPUSlowPPT");
                            });
                        }
                    } })),
                window.SP_REACT.createElement(PanelSectionRow, null, get_value(FAST_PPT_GPU) != null && window.SP_REACT.createElement(SliderField, { label: tr("FastPPT (W)"), value: get_value(FAST_PPT_GPU), max: get_value(LIMITS_INFO).gpu.fast_ppt_limits.max, min: get_value(LIMITS_INFO).gpu.fast_ppt_limits.min, step: get_value(LIMITS_INFO).gpu.ppt_step, showValue: true, disabled: get_value(FAST_PPT_GPU) == null, onChange: (ppt) => {
                        log(LogLevel.Debug, "FastPPT is now " + ppt.toString());
                        const pptNow = get_value(FAST_PPT_GPU);
                        const realPpt = ppt;
                        if (realPpt != pptNow) {
                            resolve(setGpuPpt(realPpt, get_value(SLOW_PPT_GPU)), (limits) => {
                                set_value(FAST_PPT_GPU, limits[0]);
                                set_value(SLOW_PPT_GPU, limits[1]);
                                reloadGUI("GPUFastPPT");
                            });
                        }
                    } })),
                (get_value(LIMITS_INFO).gpu.clock_min_limits != null || get_value(LIMITS_INFO).gpu.clock_max_limits != null) && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(CLOCK_MIN_GPU) != null || get_value(CLOCK_MAX_GPU) != null, label: tr("Frequency Limits"), description: tr("Set bounds on clock speed"), onChange: (value) => {
                            if (value) {
                                let clock_min_limits = get_value(LIMITS_INFO).gpu.clock_min_limits;
                                let clock_max_limits = get_value(LIMITS_INFO).gpu.clock_max_limits;
                                if (clock_min_limits != null) {
                                    set_value(CLOCK_MIN_GPU, clock_min_limits.min);
                                }
                                if (clock_max_limits != null) {
                                    set_value(CLOCK_MAX_GPU, clock_max_limits.max);
                                }
                                reloadGUI("GPUFreqToggle");
                            }
                            else {
                                set_value(CLOCK_MIN_GPU, null);
                                set_value(CLOCK_MAX_GPU, null);
                                resolve(unsetGpuClockLimits(), (_) => {
                                    reloadGUI("GPUUnsetFreq");
                                });
                            }
                        } })),
                window.SP_REACT.createElement(PanelSectionRow, null, get_value(CLOCK_MIN_GPU) != null && window.SP_REACT.createElement(SliderField, { label: tr("Minimum (MHz)"), value: get_value(CLOCK_MIN_GPU), max: get_value(LIMITS_INFO).gpu.clock_min_limits.max, min: get_value(LIMITS_INFO).gpu.clock_min_limits.min, step: get_value(LIMITS_INFO).gpu.clock_step, showValue: true, disabled: get_value(CLOCK_MIN_GPU) == null, onChange: (val) => {
                        log(LogLevel.Debug, "GPU Clock Min is now " + val.toString());
                        const valNow = get_value(CLOCK_MIN_GPU);
                        const maxNow = get_value(CLOCK_MAX_GPU);
                        if (val != valNow && ((maxNow != null && val <= maxNow) || maxNow == null)) {
                            resolve(setGpuClockLimits(val, get_value(CLOCK_MAX_GPU)), (limits) => {
                                set_value(CLOCK_MIN_GPU, limits[0]);
                                set_value(CLOCK_MAX_GPU, limits[1]);
                                reloadGUI("GPUMinClock");
                            });
                        }
                    } })),
                window.SP_REACT.createElement(PanelSectionRow, null, get_value(CLOCK_MAX_GPU) != null && window.SP_REACT.createElement(SliderField, { label: tr("Maximum (MHz)"), value: get_value(CLOCK_MAX_GPU), max: get_value(LIMITS_INFO).gpu.clock_max_limits.max, min: get_value(LIMITS_INFO).gpu.clock_max_limits.min, step: get_value(LIMITS_INFO).gpu.clock_step, showValue: true, disabled: get_value(CLOCK_MAX_GPU) == null, onChange: (val) => {
                        log(LogLevel.Debug, "GPU Clock Max is now " + val.toString());
                        const valNow = get_value(CLOCK_MAX_GPU);
                        const minNow = get_value(CLOCK_MIN_GPU);
                        if (val != valNow && ((minNow != null && val >= minNow) || minNow == null)) {
                            resolve(setGpuClockLimits(get_value(CLOCK_MIN_GPU), val), (limits) => {
                                set_value(CLOCK_MIN_GPU, limits[0]);
                                set_value(CLOCK_MAX_GPU, limits[1]);
                                reloadGUI("GPUMaxClock");
                            });
                        }
                    } })),
                get_value(LIMITS_INFO).gpu.memory_control_capable && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(SLOW_MEMORY_GPU), label: tr("Downclock Memory"), description: tr("Force RAM into low-power mode"), onChange: (value) => {
                            resolve(setGpuSlowMemory(value), (val) => {
                                set_value(SLOW_MEMORY_GPU, val);
                                reloadGUI("GPUSlowMemory");
                            });
                        } }))));
        }
    }

    class Battery extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                reloadThingy: "/shrug",
            };
        }
        render() {
            const reloadGUI = (x) => this.setState({ reloadThingy: x });
            const chargeModeOptions = get_value(LIMITS_INFO).battery.charge_modes.map((elem) => {
                return {
                    data: elem,
                    label: window.SP_REACT.createElement("span", null, elem),
                };
            });
            return (window.SP_REACT.createElement(React.Fragment, null,
                window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, tr("Battery")),
                get_value(CHARGE_NOW_BATT) != null && get_value(CHARGE_FULL_BATT) != null && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(Field, { label: tr("Now (Charge)") },
                        get_value(CHARGE_NOW_BATT).toFixed(1),
                        " Wh (",
                        (100 * get_value(CHARGE_NOW_BATT) / get_value(CHARGE_FULL_BATT)).toFixed(1),
                        "%)")),
                get_value(CHARGE_FULL_BATT) != null && get_value(CHARGE_DESIGN_BATT) != null && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(Field, { label: tr("Max (Design)") },
                        get_value(CHARGE_FULL_BATT).toFixed(1),
                        " Wh (",
                        (100 * get_value(CHARGE_FULL_BATT) / get_value(CHARGE_DESIGN_BATT)).toFixed(1),
                        "%)")),
                get_value(LIMITS_INFO).battery.charge_current != null && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(CHARGE_RATE_BATT) != null, label: tr("Charge Current Limits"), description: tr("Control battery charge rate when awake"), onChange: (value) => {
                            if (value) {
                                set_value(CHARGE_RATE_BATT, 2500);
                                reloadGUI("BATTChargeRateToggle");
                            }
                            else {
                                set_value(CHARGE_RATE_BATT, null);
                                resolve(unsetBatteryChargeRate(), (_) => {
                                    reloadGUI("BATTUnsetChargeRate");
                                });
                            }
                        } }),
                    get_value(CHARGE_RATE_BATT) != null && window.SP_REACT.createElement(SliderField, { label: tr("Maximum (mA)"), value: get_value(CHARGE_RATE_BATT), max: get_value(LIMITS_INFO).battery.charge_current.max, min: get_value(LIMITS_INFO).battery.charge_current.min, step: get_value(LIMITS_INFO).battery.charge_current_step, showValue: true, disabled: get_value(CHARGE_RATE_BATT) == null, onChange: (val) => {
                            log(LogLevel.Debug, "Charge rate is now " + val.toString());
                            const rateNow = get_value(CHARGE_RATE_BATT);
                            if (val != rateNow) {
                                resolve(setBatteryChargeRate(val), (rate) => {
                                    set_value(CHARGE_RATE_BATT, rate);
                                    reloadGUI("BATTChargeRate");
                                });
                            }
                        } })),
                chargeModeOptions.length != 0 && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(CHARGE_MODE_BATT) != null, label: tr("Charge Mode"), description: tr("Force battery charge mode"), onChange: (value) => {
                            if (value) {
                                set_value(CHARGE_MODE_BATT, chargeModeOptions[0].data);
                                reloadGUI("BATTChargeModeToggle");
                            }
                            else {
                                set_value(CHARGE_MODE_BATT, null);
                                resolve(unsetBatteryChargeMode(), (_) => {
                                    reloadGUI("BATTUnsetChargeMode");
                                });
                            }
                        } }),
                    get_value(CHARGE_MODE_BATT) != null && window.SP_REACT.createElement(Field, { label: tr("Mode") },
                        window.SP_REACT.createElement(Dropdown, { menuLabel: tr("Charge Mode"), rgOptions: chargeModeOptions, selectedOption: chargeModeOptions.find((val, _index, _arr) => {
                                return val.data == get_value(CHARGE_MODE_BATT);
                            }), strDefaultLabel: get_value(CHARGE_MODE_BATT), onChange: (elem) => {
                                log(LogLevel.Debug, "Charge mode dropdown selected " + elem.data.toString());
                                resolve(setBatteryChargeMode(elem.data), (mode) => {
                                    set_value(CHARGE_MODE_BATT, mode);
                                    reloadGUI("BATTChargeMode");
                                });
                            } }))),
                window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(Field, { label: tr("Current") },
                        get_value(CURRENT_BATT),
                        " mA"))));
        }
    }

    let advancedMode = false;
    let advancedCpu = 1;
    class Cpus extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                reloadThingy: "/shrug",
            };
        }
        render() {
            const reloadGUI = (x) => this.setState((_state) => {
                return {
                    reloadThingy: x,
                };
            });
            const total_cpus = get_value(LIMITS_INFO)?.cpu.count ?? 8;
            const advancedCpuIndex = advancedCpu - 1;
            const smtAllowed = get_value(LIMITS_INFO)?.cpu.smt_capable ?? true;
            const governorOptions = get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].governors.map((elem) => {
                return {
                    data: elem,
                    label: window.SP_REACT.createElement("span", null, elem),
                };
            });
            const governorGlobalOptions = get_value(LIMITS_INFO).cpu.governors.map((elem) => {
                return {
                    data: elem,
                    label: window.SP_REACT.createElement("span", null, elem),
                };
            });
            return (window.SP_REACT.createElement(React.Fragment, null,
                window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, tr("CPU")),
                window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: advancedMode, label: tr("Advanced"), description: tr("Enables per-thread configuration"), onChange: (advanced) => {
                            advancedMode = advanced;
                            this.setState((state) => {
                                return {
                                    reloadThingy: state.reloadThingy,
                                };
                            });
                        } })),
                !advancedMode && smtAllowed && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(SMT_CPU), label: tr("SMT"), description: tr("Enables odd-numbered CPUs"), onChange: (smt) => {
                            log(LogLevel.Debug, "SMT is now " + smt.toString());
                            //const cpus = get_value(ONLINE_CPUS);
                            const smtNow = smt && smtAllowed;
                            resolve(setCpuSmt(smtNow), (statii) => {
                                set_value(SMT_CPU, smtNow);
                                set_value(ONLINE_STATUS_CPUS, statii);
                                const count = countCpus$1(statii);
                                set_value(ONLINE_CPUS, count);
                                reloadGUI("SMT");
                            });
                        } })),
                !advancedMode && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(SliderField, { label: tr("Threads"), value: get_value(ONLINE_CPUS), step: 1, max: (get_value(SMT_CPU) || !smtAllowed) ? total_cpus : total_cpus / 2, min: 1, showValue: true, onChange: (cpus) => {
                            log(LogLevel.Debug, "CPU slider is now " + cpus.toString());
                            const onlines = get_value(ONLINE_CPUS);
                            if (cpus != onlines) {
                                set_value(ONLINE_CPUS, cpus);
                                const smtNow = get_value(SMT_CPU);
                                let onlines = [];
                                for (let i = 0; i < total_cpus; i++) {
                                    const online = smtNow ? i < cpus : (i % 2 == 0) && (i < cpus * 2);
                                    onlines.push(online);
                                }
                                resolve(setCpuOnlines(onlines), (statii) => {
                                    set_value(ONLINE_STATUS_CPUS, statii);
                                    const count = countCpus$1(statii);
                                    set_value(ONLINE_CPUS, count);
                                    reloadGUI("CPUs");
                                });
                                reloadGUI("CPUsImmediate");
                            }
                        } })),
                !advancedMode && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(CLOCK_MIN_CPU) != null || get_value(CLOCK_MAX_CPU) != null, label: tr("Frequency Limits"), description: tr("Set bounds on clock speed"), onChange: (value) => {
                            if (value) {
                                if (get_value(LIMITS_INFO).cpu.cpus[0].clock_min_limits != null) {
                                    set_value(CLOCK_MIN_CPU, get_value(LIMITS_INFO).cpu.cpus[0].clock_min_limits.min);
                                }
                                if (get_value(LIMITS_INFO).cpu.cpus[0].clock_max_limits != null) {
                                    set_value(CLOCK_MAX_CPU, get_value(LIMITS_INFO).cpu.cpus[0].clock_max_limits.max);
                                }
                                syncPlebClockToAdvanced$1();
                                reloadGUI("CPUFreqToggle");
                            }
                            else {
                                set_value(CLOCK_MIN_CPU, null);
                                set_value(CLOCK_MAX_CPU, null);
                                for (let i = 0; i < total_cpus; i++) {
                                    resolve(unsetCpuClockLimits(i), (_idc) => { });
                                }
                                resolve(waitForComplete(), (_) => {
                                    reloadGUI("CPUUnsetFreq");
                                });
                                syncPlebClockToAdvanced$1();
                            }
                        } })),
                !advancedMode && get_value(LIMITS_INFO).cpu.cpus[0].clock_min_limits != null && window.SP_REACT.createElement(PanelSectionRow, null, get_value(CLOCK_MIN_CPU) != null && window.SP_REACT.createElement(SliderField, { label: tr("Minimum (MHz)"), value: get_value(CLOCK_MIN_CPU), max: get_value(LIMITS_INFO).cpu.cpus[0].clock_min_limits.max, min: get_value(LIMITS_INFO).cpu.cpus[0].clock_min_limits.min, step: get_value(LIMITS_INFO).cpu.cpus[0].clock_step, showValue: true, disabled: get_value(CLOCK_MIN_CPU) == null, onChange: (freq) => {
                        log(LogLevel.Debug, "Min freq slider is now " + freq.toString());
                        const freqNow = get_value(CLOCK_MIN_CPU);
                        const maxNow = get_value(CLOCK_MAX_CPU);
                        if (freq != freqNow && ((maxNow != null && freq <= maxNow) || maxNow == null)) {
                            set_value(CLOCK_MIN_CPU, freq);
                            for (let i = 0; i < total_cpus; i++) {
                                resolve(setCpuClockLimits(i, freq, get_value(CLOCK_MAX_CPU)), (_limits) => {
                                    //set_value(CLOCK_MIN_CPU, limits[0]);
                                    //set_value(CLOCK_MAX_CPU, limits[1]);
                                    syncPlebClockToAdvanced$1();
                                });
                            }
                            resolve(waitForComplete(), (_) => {
                                reloadGUI("CPUMinFreq");
                            });
                            reloadGUI("CPUMinFreqImmediate");
                        }
                    } })),
                !advancedMode && get_value(LIMITS_INFO).cpu.cpus[0].clock_max_limits != null && window.SP_REACT.createElement(PanelSectionRow, null, get_value(CLOCK_MAX_CPU) != null && window.SP_REACT.createElement(SliderField, { label: tr("Maximum (MHz)"), value: get_value(CLOCK_MAX_CPU), max: get_value(LIMITS_INFO).cpu.cpus[0].clock_max_limits.max, min: get_value(LIMITS_INFO).cpu.cpus[0].clock_max_limits.min, step: get_value(LIMITS_INFO).cpu.cpus[0].clock_step, showValue: true, disabled: get_value(CLOCK_MAX_CPU) == null, onChange: (freq) => {
                        log(LogLevel.Debug, "Max freq slider is now " + freq.toString());
                        const freqNow = get_value(CLOCK_MAX_CPU);
                        const minNow = get_value(CLOCK_MIN_CPU);
                        if (freq != freqNow && ((minNow != null && freq >= minNow) || minNow == null)) {
                            set_value(CLOCK_MAX_CPU, freq);
                            for (let i = 0; i < total_cpus; i++) {
                                resolve(setCpuClockLimits(i, get_value(CLOCK_MIN_CPU), freq), (_limits) => {
                                    //set_value(CLOCK_MIN_CPU, limits[0]);
                                    //set_value(CLOCK_MAX_CPU, limits[1]);
                                    syncPlebClockToAdvanced$1();
                                });
                            }
                            resolve(waitForComplete(), (_) => {
                                reloadGUI("CPUMaxFreq");
                            });
                            reloadGUI("CPUMaxFreqImmediate");
                        }
                    } })),
                !advancedMode && governorGlobalOptions.length != 0 && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(Field, { label: tr("Governor") },
                        window.SP_REACT.createElement(Dropdown, { menuLabel: tr("Governor"), rgOptions: governorGlobalOptions, selectedOption: governorGlobalOptions.find((val, _index, _arr) => {
                                log(LogLevel.Debug, "POWERTOOLS: array item " + val.toString());
                                log(LogLevel.Debug, "POWERTOOLS: looking for data " + get_value(GOVERNOR_CPU)[0].toString());
                                return val.data == get_value(GOVERNOR_CPU)[0];
                            }), strDefaultLabel: get_value(GOVERNOR_CPU)[0], onChange: (elem) => {
                                log(LogLevel.Debug, "Governor global dropdown selected " + elem.data.toString());
                                const governors = get_value(GOVERNOR_CPU);
                                for (let i = 0; i < total_cpus; i++) {
                                    governors[i] = elem.data;
                                    resolve(setCpuGovernor(i, governors[i]), (_) => { });
                                }
                                set_value(GOVERNOR_CPU, governors);
                                reloadGUI("CPUGlobalGovernor");
                            } }))),
                advancedMode && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(SliderField, { label: tr("Selected CPU"), value: advancedCpu, step: 1, max: total_cpus, min: 1, showValue: true, onChange: (cpuNum) => {
                            advancedCpu = cpuNum;
                            this.setState((state) => {
                                return {
                                    reloadThingy: state.reloadThingy,
                                };
                            });
                        } })),
                advancedMode && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(ONLINE_STATUS_CPUS)[advancedCpuIndex], label: tr("Online"), description: tr("Allow the CPU thread to do work"), onChange: (status) => {
                            log(LogLevel.Debug, "CPU " + advancedCpu.toString() + " is now " + status.toString());
                            if (!get_value(SMT_CPU)) {
                                resolve(setCpuSmt(true), (_newVal) => {
                                    set_value(SMT_CPU, true);
                                });
                            }
                            resolve(setCpuOnline(advancedCpuIndex, status), (newVal) => {
                                const onlines = get_value(ONLINE_STATUS_CPUS);
                                onlines[advancedCpuIndex] = newVal;
                                set_value(ONLINE_STATUS_CPUS, onlines);
                            });
                        } })),
                advancedMode && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ToggleField, { checked: get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex].min != null || get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex].max != null, label: tr("Frequency Limits"), description: tr("Set bounds on clock speed"), onChange: (value) => {
                            if (value) {
                                const clocks = get_value(CLOCK_MIN_MAX_CPU);
                                if (get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_min_limits != null) {
                                    clocks[advancedCpuIndex].min = get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_min_limits.min;
                                }
                                if (get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_max_limits != null) {
                                    clocks[advancedCpuIndex].max = get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_max_limits.max;
                                }
                                set_value(CLOCK_MIN_MAX_CPU, clocks);
                                reloadGUI("CPUFreqToggle");
                            }
                            else {
                                const clocks = get_value(CLOCK_MIN_MAX_CPU);
                                clocks[advancedCpuIndex].min = null;
                                clocks[advancedCpuIndex].max = null;
                                set_value(CLOCK_MIN_MAX_CPU, clocks);
                                resolve(unsetCpuClockLimits(advancedCpuIndex), (_idc) => {
                                    reloadGUI("CPUUnsetFreq");
                                });
                            }
                        } })),
                advancedMode && get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_min_limits != null && window.SP_REACT.createElement(PanelSectionRow, null, get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex].min != null && window.SP_REACT.createElement(SliderField, { label: tr("Minimum (MHz)"), value: get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex].min, max: get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_min_limits.max, min: get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_min_limits.min, step: get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_step, showValue: true, disabled: get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex].min == null, onChange: (freq) => {
                        log(LogLevel.Debug, "Min freq slider for " + advancedCpu.toString() + " is now " + freq.toString());
                        const freqNow = get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex];
                        if (freq != freqNow.min && ((freqNow.max != null && freq <= freqNow.max) || freqNow.max == null)) {
                            resolve(setCpuClockLimits(advancedCpuIndex, freq, freqNow.max), (limits) => {
                                const clocks = get_value(CLOCK_MIN_MAX_CPU);
                                clocks[advancedCpuIndex].min = limits[0];
                                clocks[advancedCpuIndex].max = limits[1];
                                set_value(CLOCK_MIN_MAX_CPU, clocks);
                                reloadGUI("CPUMinFreq");
                            });
                        }
                    } })),
                advancedMode && get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_max_limits != null && window.SP_REACT.createElement(PanelSectionRow, null, get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex].max != null && window.SP_REACT.createElement(SliderField, { label: tr("Maximum (MHz)"), value: get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex].max, max: get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_max_limits.max, min: get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_max_limits.min, step: get_value(LIMITS_INFO).cpu.cpus[advancedCpuIndex].clock_step, showValue: true, disabled: get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex].max == null, onChange: (freq) => {
                        log(LogLevel.Debug, "Max freq slider for " + advancedCpu.toString() + " is now " + freq.toString());
                        const freqNow = get_value(CLOCK_MIN_MAX_CPU)[advancedCpuIndex];
                        if (freq != freqNow.max && ((freqNow.min != null && freq >= freqNow.min) || freqNow.min == null)) {
                            resolve(setCpuClockLimits(advancedCpuIndex, freqNow.min, freq), (limits) => {
                                const clocks = get_value(CLOCK_MIN_MAX_CPU);
                                clocks[advancedCpuIndex].min = limits[0];
                                clocks[advancedCpuIndex].max = limits[1];
                                set_value(CLOCK_MIN_MAX_CPU, clocks);
                                reloadGUI("CPUMaxFreq");
                            });
                        }
                    } })),
                advancedMode && governorOptions.length != 0 && window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(Field, { label: tr("Governor") },
                        window.SP_REACT.createElement(Dropdown, { menuLabel: tr("Governor"), rgOptions: governorOptions, selectedOption: governorOptions.find((val, _index, _arr) => {
                                log(LogLevel.Debug, "POWERTOOLS: array item " + val.toString());
                                log(LogLevel.Debug, "POWERTOOLS: looking for data " + get_value(GOVERNOR_CPU)[advancedCpuIndex].toString());
                                return val.data == get_value(GOVERNOR_CPU)[advancedCpuIndex];
                            }), strDefaultLabel: get_value(GOVERNOR_CPU)[advancedCpuIndex], onChange: (elem) => {
                                log(LogLevel.Debug, "Governor dropdown selected " + elem.data.toString());
                                resolve(setCpuGovernor(advancedCpuIndex, elem.data), (gov) => {
                                    const governors = get_value(GOVERNOR_CPU);
                                    governors[advancedCpuIndex] = gov;
                                    set_value(GOVERNOR_CPU, governors);
                                    reloadGUI("CPUGovernor");
                                });
                            } })))));
        }
    }
    function countCpus$1(statii) {
        let count = 0;
        for (let i = 0; i < statii.length; i++) {
            if (statii[i]) {
                count += 1;
            }
        }
        return count;
    }
    function syncPlebClockToAdvanced$1() {
        const cpuCount = get_value(LIMITS_INFO).cpu.count;
        const minClock = get_value(CLOCK_MIN_CPU);
        const maxClock = get_value(CLOCK_MAX_CPU);
        let clockArr = [];
        for (let i = 0; i < cpuCount; i++) {
            clockArr.push({
                min: minClock,
                max: maxClock,
            });
        }
        set_value(CLOCK_MIN_MAX_CPU, clockArr);
    }

    var periodicHook = null;
    var lifetimeHook = null;
    var startHook = null;
    var usdplReady = false;
    function countCpus(statii) {
        let count = 0;
        for (let i = 0; i < statii.length; i++) {
            if (statii[i]) {
                count += 1;
            }
        }
        return count;
    }
    function syncPlebClockToAdvanced() {
        const cpuCount = get_value(LIMITS_INFO).cpu.count;
        const minClock = get_value(CLOCK_MIN_CPU);
        const maxClock = get_value(CLOCK_MAX_CPU);
        let clockArr = [];
        for (let i = 0; i < cpuCount; i++) {
            clockArr.push({
                min: minClock,
                max: maxClock,
            });
        }
        set_value(CLOCK_MIN_MAX_CPU, clockArr);
    }
    const reload = function () {
        if (!usdplReady) {
            return;
        }
        resolve(getLimits(), (limits) => {
            set_value(LIMITS_INFO, limits);
            console.debug("POWERTOOLS: got limits ", limits);
        });
        resolve(getBatteryCurrent(), (rate) => { set_value(CURRENT_BATT, rate); });
        resolve_nullable(getBatteryChargeRate(), (rate) => { set_value(CHARGE_RATE_BATT, rate); });
        resolve_nullable(getBatteryChargeMode(), (mode) => { set_value(CHARGE_MODE_BATT, mode); });
        resolve(getBatteryChargeNow(), (rate) => { set_value(CHARGE_NOW_BATT, rate); });
        resolve(getBatteryChargeFull(), (rate) => { set_value(CHARGE_FULL_BATT, rate); });
        resolve(getBatteryChargeDesign(), (rate) => { set_value(CHARGE_DESIGN_BATT, rate); });
        //backend.resolve(backend.getCpuCount(), (count: number) => { set_value(TOTAL_CPUS, count)});
        resolve(getCpusOnline(), (statii) => {
            set_value(ONLINE_STATUS_CPUS, statii);
            const count = countCpus(statii);
            set_value(ONLINE_CPUS, count);
            //set_value(SMT_CPU, statii.length > 3 && statii[0] == statii[1] && statii[2] == statii[3]);
        });
        resolve(getCpuSmt(), (smt) => {
            set_value(SMT_CPU, smt);
        });
        resolve(getCpuClockLimits(0), (limits) => {
            set_value(CLOCK_MIN_CPU, limits[0]);
            set_value(CLOCK_MAX_CPU, limits[1]);
            syncPlebClockToAdvanced();
        });
        resolve(getCpusGovernor(), (governors) => {
            set_value(GOVERNOR_CPU, governors);
            log(LogLevel.Info, "POWERTOOLS: Governors from backend " + governors.toString());
        });
        resolve(getGpuPpt(), (ppts) => {
            set_value(FAST_PPT_GPU, ppts[0]);
            set_value(SLOW_PPT_GPU, ppts[1]);
        });
        resolve(getGpuClockLimits(), (limits) => {
            set_value(CLOCK_MIN_GPU, limits[0]);
            set_value(CLOCK_MAX_GPU, limits[1]);
        });
        resolve(getGpuSlowMemory(), (status) => { set_value(SLOW_MEMORY_GPU, status); });
        resolve(getGeneralPersistent(), (value) => { set_value(PERSISTENT_GEN, value); });
        resolve(getGeneralSettingsName(), (name) => { set_value(NAME_GEN, name); });
        resolve(getInfo(), (info) => { set_value(BACKEND_INFO, info); });
        resolve(getDriverProviderName("gpu"), (driver) => { set_value(DRIVER_INFO, driver); });
    };
    // init USDPL WASM and connection to back-end
    (async function () {
        await initBackend();
        usdplReady = true;
        set_value(NAME_GEN, "Default");
        reload(); // technically this is only a load
        // register Steam callbacks
        //@ts-ignore
        lifetimeHook = SteamClient.GameSessions.RegisterForAppLifetimeNotifications((update) => {
            if (update.bRunning) ;
            else {
                //backend.log(backend.LogLevel.Debug, "AppID " + update.unAppID.toString() + " is no longer running");
                resolve(loadGeneralDefaultSettings(), (ok) => { log(LogLevel.Debug, "Loading default settings ok? " + ok); });
            }
        });
        //@ts-ignore
        startHook = SteamClient.Apps.RegisterForGameActionStart((actionType, id) => {
            //@ts-ignore
            let gameInfo = appStore.GetAppOverviewByGameID(id);
            // don't use gameInfo.appid, haha
            resolve(loadGeneralSettings(id.toString() + ".json", gameInfo.display_name), (ok) => { log(LogLevel.Debug, "Loading settings ok? " + ok); });
        });
        log(LogLevel.Debug, "Registered PowerTools callbacks, hello!");
    })();
    const periodicals = function () {
        resolve(getBatteryCurrent(), (rate) => { set_value(CURRENT_BATT, rate); });
        resolve(getBatteryChargeNow(), (rate) => { set_value(CHARGE_NOW_BATT, rate); });
        resolve(getBatteryChargeFull(), (rate) => { set_value(CHARGE_FULL_BATT, rate); });
        resolve(getGeneralPersistent(), (value) => { set_value(PERSISTENT_GEN, value); });
        resolve(getGeneralSettingsName(), (name) => {
            const oldValue = get_value(NAME_GEN);
            set_value(NAME_GEN, name);
            if (name != oldValue) {
                reload();
            }
        });
    };
    const Content = ({}) => {
        const [idc, reloadGUI] = React.useState("/shrug");
        if (periodicHook != null) {
            clearInterval(periodicHook);
            periodicHook = null;
        }
        periodicHook = setInterval(function () {
            periodicals();
            reloadGUI("periodic" + (new Date()).getTime().toString());
        }, 1000);
        if (!usdplReady || !get_value(LIMITS_INFO)) {
            // Not translated on purpose (to avoid USDPL issues)
            return (window.SP_REACT.createElement(PanelSection, null,
                "USDPL or PowerTools's backend did not start correctly!",
                window.SP_REACT.createElement(ButtonItem, { layout: "below", onClick: (_) => {
                        console.log("POWERTOOLS: manual reload after startup failure");
                        reload();
                    } }, "Reload")));
        }
        return (window.SP_REACT.createElement(PanelSection, null,
            window.SP_REACT.createElement(Cpus, { idc: idc }),
            window.SP_REACT.createElement(Gpu, { idc: idc }),
            window.SP_REACT.createElement(Battery, { idc: idc }),
            window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, tr("Miscellaneous")),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(ToggleField, { checked: get_value(PERSISTENT_GEN), label: tr("Persistent Profile"), description: tr("Save profile and load it next time"), onChange: (persist) => {
                        log(LogLevel.Debug, "Persist is now " + persist.toString());
                        resolve(setGeneralPersistent(persist), (val) => { set_value(PERSISTENT_GEN, val); });
                    } })),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(Field, { label: tr("Profile") }, get_value(NAME_GEN))),
            window.SP_REACT.createElement(Debug, { idc: idc }),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(ButtonItem, { layout: "below", onClick: (_) => {
                        log(LogLevel.Debug, "Loading default PowerTools settings");
                        resolve(setGeneralPersistent(false), (val) => {
                            set_value(PERSISTENT_GEN, val);
                            resolve(loadGeneralSystemSettings(), (_) => {
                                reload();
                                resolve(waitForComplete(), (_) => { reloadGUI("LoadSystemDefaults"); });
                            });
                        });
                    } }, tr("Defaults")))));
    };
    var index = definePlugin((serverApi) => {
        let ico = window.SP_REACT.createElement(GiDrill, null);
        let now = new Date();
        if (now.getDate() == 1 && now.getMonth() == 3) {
            ico = window.SP_REACT.createElement("span", null,
                window.SP_REACT.createElement(GiDynamite, null),
                window.SP_REACT.createElement(GiTimeTrap, null),
                window.SP_REACT.createElement(GiTimeBomb, null));
        }
        return {
            title: window.SP_REACT.createElement("div", { className: staticClasses.Title }, "I'm a tool"),
            content: window.SP_REACT.createElement(Content, { serverAPI: serverApi }),
            icon: ico,
            onDismount() {
                log(LogLevel.Debug, "PowerTools shutting down");
                clearInterval(periodicHook);
                periodicHook = null;
                lifetimeHook.unregister();
                startHook.unregister();
                //serverApi.routerHook.removeRoute("/decky-plugin-test");
                log(LogLevel.Debug, "Unregistered PowerTools callbacks, so long and thanks for all the fish.");
            },
        };
    });

    return index;

})(SP_REACT);
