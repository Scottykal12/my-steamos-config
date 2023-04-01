(function (React) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var React__namespace = /*#__PURE__*/_interopNamespace(React);

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

    const CommonDialogDivs = Object.values(CommonUIModule).filter((m) => typeof m === 'object' && m?.render?.toString().includes('"div",Object.assign({},'));
    const MappedDialogDivs = new Map(Object.values(CommonDialogDivs).map((m) => {
        const renderedDiv = m.render({});
        // Take only the first class name segment as it identifies the element we want
        return [renderedDiv.props.className.split(' ')[0], m];
    }));
    MappedDialogDivs.get('DialogHeader');
    MappedDialogDivs.get('DialogSubHeader');
    MappedDialogDivs.get('DialogFooter');
    MappedDialogDivs.get('DialogLabel');
    MappedDialogDivs.get('DialogBodyText');
    MappedDialogDivs.get('DialogBody');
    MappedDialogDivs.get('DialogControlsSection');
    MappedDialogDivs.get('DialogControlsSectionHeader');
    Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('DialogButton') && mod?.render?.toString()?.includes('Primary'));
    const DialogButtonSecondary = Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('Object.assign({type:"button"') &&
        mod?.render?.toString()?.includes('DialogButton') &&
        mod?.render?.toString()?.includes('Secondary'));
    // This is the "main" button. The Primary can act as a submit button,
    // therefore secondary is chosen (also for backwards comp. reasons)
    const DialogButton = DialogButtonSecondary;

    const ButtonItem = CommonUIModule.ButtonField ||
        Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('"highlightOnFocus","childrenContainerWidth"') ||
            mod?.render?.toString()?.includes('childrenContainerWidth:"min"'));

    const Dropdown = Object.values(CommonUIModule).find((mod) => mod?.prototype?.SetSelectedOption && mod?.prototype?.BuildMenu);
    const DropdownItem = Object.values(CommonUIModule).find((mod) => mod?.toString()?.includes('"dropDownControlRef","description"'));

    const Focusable = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.render?.toString()?.includes('["flow-children","onActivate","onCancel","focusClassName",'))
                return m[prop];
        }
    });

    // TODO: implement storing patches as an option so we can offer unpatchAll selectively
    // let patches = new Set<Patch>();
    function beforePatch(object, property, handler, options = {}) {
        const orig = object[property];
        object[property] = function (...args) {
            handler.call(this, args);
            const ret = patch.original.call(this, ...args);
            if (options.singleShot) {
                patch.unpatch();
            }
            return ret;
        };
        const patch = processPatch(object, property, handler, object[property], orig);
        return patch;
    }
    function afterPatch(object, property, handler, options = {}) {
        const orig = object[property];
        object[property] = function (...args) {
            let ret = patch.original.call(this, ...args);
            ret = handler.call(this, args, ret);
            if (options.singleShot) {
                patch.unpatch();
            }
            return ret;
        };
        const patch = processPatch(object, property, handler, object[property], orig);
        return patch;
    }
    function processPatch(object, property, handler, patchedFunction, original) {
        // Assign all props of original function to new one
        Object.assign(object[property], original);
        // Allow toString webpack filters to continue to work
        object[property].toString = () => original.toString();
        // HACK: for compatibility, remove when all plugins are using new patcher
        Object.defineProperty(object[property], '__deckyOrig', {
            get: () => patch.original,
            set: (val) => (patch.original = val),
        });
        // Build a Patch object of this patch
        const patch = {
            object,
            property,
            handler,
            patchedFunction,
            original,
            hasUnpatched: false,
            unpatch: () => unpatch(patch),
        };
        object[property].__deckyPatch = patch;
        return patch;
    }
    function unpatch(patch) {
        const { object, property, handler, patchedFunction, original } = patch;
        if (patch.hasUnpatched)
            throw new Error('Function is already unpatched.');
        let realProp = property;
        let realObject = object;
        console.debug('[Patcher] unpatching', {
            realObject,
            realProp,
            object,
            property,
            handler,
            patchedFunction,
            original,
            isEqual: realObject[realProp] === patchedFunction,
        });
        // If another patch has been applied to this function after this one, move down until we find the correct patch
        while (realObject[realProp] && realObject[realProp] !== patchedFunction) {
            realObject = realObject[realProp].__deckyPatch;
            realProp = 'original';
            console.debug('[Patcher] moved to next', {
                realObject,
                realProp,
                object,
                property,
                handler,
                patchedFunction,
                original,
                isEqual: realObject[realProp] === patchedFunction,
            });
        }
        realObject[realProp] = realObject[realProp].__deckyPatch.original;
        patch.hasUnpatched = true;
        console.debug('[Patcher] unpatched', {
            realObject,
            realProp,
            object,
            property,
            handler,
            patchedFunction,
            original,
            isEqual: realObject[realProp] === patchedFunction,
        });
    }

    function fakeRenderComponent(fun, customHooks = {}) {
        const hooks = window.SP_REACT.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher
            .current;
        // TODO: add more hooks
        let oldHooks = {
            useContext: hooks.useContext,
            useCallback: hooks.useCallback,
            useLayoutEffect: hooks.useLayoutEffect,
            useEffect: hooks.useEffect,
            useMemo: hooks.useMemo,
            useRef: hooks.useRef,
            useState: hooks.useState,
        };
        hooks.useCallback = (cb) => cb;
        hooks.useContext = (cb) => cb._currentValue;
        hooks.useLayoutEffect = (_) => { }; //cb();
        hooks.useMemo = (cb, _) => cb;
        hooks.useEffect = (_) => { }; //cb();
        hooks.useRef = (val) => ({ current: val || {} });
        hooks.useState = (v) => {
            let val = v;
            return [val, (n) => (val = n)];
        };
        Object.assign(hooks, customHooks);
        const res = fun(hooks);
        Object.assign(hooks, oldHooks);
        return res;
    }
    const findInTree = (parent, filter, opts) => {
        const { walkable = null, ignore = [] } = opts ?? {};
        if (!parent || typeof parent !== 'object') {
            // Parent is invalid to search through
            return null;
        }
        if (filter(parent))
            return parent; // Parent matches, just return
        if (Array.isArray(parent)) {
            // Parent is an array, go through values
            return parent.map((x) => findInTree(x, filter, opts)).find((x) => x);
        }
        // Parent is an object, go through values (or option to only use certain keys)
        return (walkable || Object.keys(parent))
            .map((x) => !ignore.includes(x) && findInTree(parent[x], filter, opts))
            .find((x) => x);
    };
    const findInReactTree = (node, filter) => findInTree(node, filter, {
        // Specialised findInTree for React nodes
        walkable: ['props', 'children', 'child', 'sibling'],
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

    const SteamSpinner = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.toString()?.includes('Steam Spinner') && m[prop].toString().includes('PreloadThrobber'))
                return m[prop];
        }
    });

    let tabsComponent;
    const getTabs = async () => {
        if (tabsComponent)
            return tabsComponent;
        // @ts-ignore
        while (!window?.DeckyPluginLoader?.routerHook?.routes) {
            console.debug('[DFL:Tabs]: Waiting for Decky router...');
            await sleep(500);
        }
        return (tabsComponent = fakeRenderComponent(() => {
            return findInReactTree(findInReactTree(
            // @ts-ignore
            window.DeckyPluginLoader.routerHook.routes
                .find((x) => x.props.path == '/library/app/:appid/achievements')
                .props.children.type(), (x) => x?.props?.scrollTabsTop).type({ appid: 1 }), (x) => x?.props?.tabs).type;
        }, {
            useRef: () => ({ current: { reaction: { track: () => { } } } }),
            useContext: () => ({ match: { params: { appid: 1 } } }),
            useMemo: () => ({ data: {} }),
        }));
    };
    let oldTabs;
    try {
        const oldTabsModule = findModule((m) => {
            if (typeof m !== 'object')
                return false;
            for (let prop in m) {
                if (m[prop]?.Unbleed)
                    return true;
            }
            return false;
        });
        if (oldTabsModule)
            oldTabs = Object.values(oldTabsModule).find((x) => x?.type?.toString()?.includes('((function(){'));
    }
    catch (e) {
        console.error('Error finding oldTabs:', e);
    }
    /**
     * Tabs component as used in the library and media tabs. See {@link TabsProps}
     * Unlike other components in `decky-frontend-lib`, this requires Decky Loader to be running.
     */
    const Tabs = oldTabs ||
        ((props) => {
            const found = tabsComponent;
            const [tc, setTC] = React.useState(found);
            React.useEffect(() => {
                if (found)
                    return;
                (async () => {
                    console.debug('[DFL:Tabs]: Finding component...');
                    const t = await getTabs();
                    console.debug('[DFL:Tabs]: Found!');
                    setTC(t);
                })();
            }, []);
            console.log('tc', tc);
            return tc ? React.createElement(tc, props) : window.SP_REACT.createElement(SteamSpinner, null);
        });

    const TextField = Object.values(CommonUIModule).find((mod) => mod?.validateUrl && mod?.validateEmail);

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
    function RiFolderMusicFill (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"g","attr":{},"child":[{"tag":"path","attr":{"fill":"none","d":"M0 0h24v24H0z"}},{"tag":"path","attr":{"d":"M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM11 13.05a2.5 2.5 0 1 0 2 2.45V11h3V9h-5v4.05z"}}]}]})(props);
    }

    // THIS FILE IS AUTO GENERATED
    function FaMusic (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"}}]})(props);
    }function FaSyncAlt (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"}}]})(props);
    }function FaTrash (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"}}]})(props);
    }function FaVolumeUp (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"}}]})(props);
    }

    const AudioParent = findModuleChild((m) => {
        if (typeof m !== "object")
            return undefined;
        for (let prop in m) {
            if (m[prop]?.GamepadUIAudio) {
                return m[prop];
            }
        }
    });

    const AboutPage = () => {
        return (window.SP_REACT.createElement(window.SP_REACT.Fragment, null,
            window.SP_REACT.createElement("h2", null, "About"),
            window.SP_REACT.createElement("p", null, "Audio Loader is a plugin for the Decky Loader that allows users to replace Steam UI sounds and add music when outside of a game. The source code is available on GitHub under the MIT License if you would like to make contributions. https://eme.wtf/audioloader"),
            window.SP_REACT.createElement("h2", null, "Creating Packs"),
            window.SP_REACT.createElement("p", null, "If you are interested in creating a music or sound pack for Audio Loader, please consult the DeckThemes Docs. https://docs.deckthemes.com")));
    };

    var server = undefined;
    function resolve(promise, setter) {
        (async function () {
            let data = await promise;
            if (data.success) {
                console.debug("Got resolved", data, "promise", promise);
                setter(data.result);
            }
            else {
                console.warn("Resolve failed:", data, "promise", promise);
            }
        })();
    }
    function setServer(s) {
        server = s;
    }
    async function getBackendVersion() {
        return server.callPluginMethod("get_loader_version", {});
    }
    async function fetchPackDb() {
        return server.fetchNoCors("https://api.deckthemes.com/themes/legacy/audio", {
            method: "GET",
        });
    }
    // getSoundPacks just fetches the packs already stored in python memory, you need to call this reload function to re-fetch the folder list
    function reloadPacksDir() {
        return server.callPluginMethod("parse_packs", {
            packsDir: "/home/deck/homebrew/sounds",
        });
    }
    function downloadPack(uuid) {
        return server.callPluginMethod("download_pack", { uuid: uuid });
    }
    function deletePack(name) {
        return server.callPluginMethod("delete_pack", { name: name });
    }
    function getSoundPacks() {
        return server.callPluginMethod("get_sound_packs", {});
    }
    function getConfig() {
        return server.callPluginMethod("get_config", {});
    }
    function setConfig(configObj) {
        return server.callPluginMethod("set_config", { configObj: configObj });
    }
    function dummyFunction() {
        return server.callPluginMethod("dummy_function", {});
    }

    class Pack {
        constructor() {
            this.name = "";
            this.description = "";
            this.path = "";
            this.ignore = [];
            this.mappings = {};
            this.version = "v1.0";
            this.author = "";
        }
        // This init function is called by the setter function in GlobalState
        init() {
            this.name = this.data.name;
            this.description = this.data.description;
            this.path = this.data.packPath.split("/").pop();
            this.ignore = this.data.ignore;
            this.mappings = this.data.mappings;
            this.version = this.data.version;
            this.author = this.data.author;
        }
    }

    // This class creates the getter and setter functions for all of the global state data.
    class GlobalState {
        constructor() {
            this.menuMusic = null;
            this.soundPatchInstance = null;
            this.volumePatchInstance = null;
            this.gainNode = null;
            this.soundVolume = 1;
            this.musicVolume = 0.5;
            this.gamesRunning = [];
            this.activeSound = "Default";
            this.soundPacks = [];
            this.selectedMusic = "None";
            this.browserPackList = [];
            this.searchFieldValue = "";
            this.selectedSort = 3;
            this.selectedTarget = {
                data: 1,
                label: "All",
            };
            this.isInstalling = false;
            // You can listen to this eventBus' 'stateUpdate' event and use that to trigger a useState or other function that causes a re-render
            this.eventBus = new EventTarget();
        }
        getPublicState() {
            return {
                menuMusic: this.menuMusic,
                soundPatchInstance: this.soundPatchInstance,
                volumePatchInstance: this.volumePatchInstance,
                gainNode: this.gainNode,
                soundVolume: this.soundVolume,
                musicVolume: this.musicVolume,
                gamesRunning: this.gamesRunning,
                activeSound: this.activeSound,
                soundPacks: this.soundPacks,
                selectedMusic: this.selectedMusic,
                browserPackList: this.browserPackList,
                searchFieldValue: this.searchFieldValue,
                selectedSort: this.selectedSort,
                selectedTarget: this.selectedTarget,
                isInstalling: this.isInstalling,
            };
        }
        setMenuMusic(value) {
            this.menuMusic = value;
            this.forceUpdate();
        }
        setSoundPatchInstance(value) {
            this.soundPatchInstance = value;
            this.forceUpdate();
        }
        setVolumePatchInstance(value) {
            this.volumePatchInstance = value;
            this.forceUpdate();
        }
        setGainNode(value) {
            this.gainNode = value;
            this.forceUpdate();
        }
        setSoundVolume(value) {
            this.soundVolume = value;
            this.forceUpdate();
        }
        setMusicVolume(value) {
            this.musicVolume = value;
            this.forceUpdate();
        }
        setGamesRunning(gameArr) {
            this.gamesRunning = gameArr;
            this.forceUpdate();
        }
        setActiveSound(value) {
            this.activeSound = value;
            this.forceUpdate();
        }
        setSoundPacks(packArr) {
            // This formats the raw data grabbed by python into the Pack class format
            let list = [];
            packArr.forEach((e) => {
                let entry = new Pack();
                entry.data = e;
                list.push(entry);
            });
            list.forEach((e) => e.init());
            this.soundPacks = list;
            this.forceUpdate();
        }
        setSelectedMusic(value) {
            this.selectedMusic = value;
            this.forceUpdate();
        }
        setBrowserPackList(packArr) {
            this.browserPackList = packArr;
            this.forceUpdate();
        }
        setSearchValue(value) {
            this.searchFieldValue = value;
            this.forceUpdate();
        }
        setSort(value) {
            this.selectedSort = value;
            this.forceUpdate();
        }
        setTarget(value) {
            this.selectedTarget = value;
            this.forceUpdate();
        }
        setInstalling(bool) {
            this.isInstalling = bool;
            this.forceUpdate();
        }
        forceUpdate() {
            this.eventBus.dispatchEvent(new Event("stateUpdate"));
        }
    }
    const GlobalStateContext = React.createContext(null);
    const useGlobalState = () => React.useContext(GlobalStateContext);
    // This is a React Component that you can wrap multiple separate things in, as long as they both have used the same instance of the CssLoaderState class, they will have synced state
    const GlobalStateContextProvider = ({ children, globalStateClass, }) => {
        const [publicState, setPublicState] = React.useState({
            ...globalStateClass.getPublicState(),
        });
        React.useEffect(() => {
            function onUpdate() {
                setPublicState({ ...globalStateClass.getPublicState() });
            }
            globalStateClass.eventBus.addEventListener("stateUpdate", onUpdate);
            return () => globalStateClass.eventBus.removeEventListener("stateUpdate", onUpdate);
        }, []);
        const setMenuMusic = (value) => globalStateClass.setMenuMusic(value);
        const setSoundPatchInstance = (value) => globalStateClass.setSoundPatchInstance(value);
        const setVolumePatchInstance = (value) => globalStateClass.setVolumePatchInstance(value);
        const setGainNode = (value) => globalStateClass.setGainNode(value);
        const setSoundVolume = (value) => globalStateClass.setSoundVolume(value);
        const setMusicVolume = (value) => globalStateClass.setMusicVolume(value);
        const setGamesRunning = (gameArr) => globalStateClass.setGamesRunning(gameArr);
        const setActiveSound = (value) => globalStateClass.setActiveSound(value);
        const setSoundPacks = (packArr) => globalStateClass.setSoundPacks(packArr);
        const setSelectedMusic = (value) => globalStateClass.setSelectedMusic(value);
        const setBrowserPackList = (packArr) => globalStateClass.setBrowserPackList(packArr);
        const setSearchValue = (value) => globalStateClass.setSearchValue(value);
        const setSort = (value) => globalStateClass.setSort(value);
        const setTarget = (value) => globalStateClass.setTarget(value);
        const setInstalling = (bool) => globalStateClass.setInstalling(bool);
        return (window.SP_REACT.createElement(GlobalStateContext.Provider, { value: {
                ...publicState,
                setMenuMusic,
                setSoundPatchInstance,
                setVolumePatchInstance,
                setGainNode,
                setSoundVolume,
                setMusicVolume,
                setGamesRunning,
                setActiveSound,
                setSoundPacks,
                setSelectedMusic,
                setBrowserPackList,
                setSearchValue,
                setSort,
                setTarget,
                setInstalling,
            } }, children));
    };

    var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

    var css = ".AudioLoader_PackBrowser_SingleItem_InstallContainer > .Panel {\n  padding: 0;\n}\n";
    n(css,{});

    /**
     * @public
     */
    const MotionConfigContext = React.createContext({
        transformPagePoint: (p) => p,
        isStatic: false,
        reducedMotion: "never",
    });

    const MotionContext = React.createContext({});
    function useVisualElementContext() {
        return React.useContext(MotionContext).visualElement;
    }

    /**
     * @public
     */
    const PresenceContext = React.createContext(null);

    const isBrowser = typeof document !== "undefined";

    const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

    const LazyContext = React.createContext({ strict: false });

    function useVisualElement(Component, visualState, props, createVisualElement) {
        const parent = useVisualElementContext();
        const lazyContext = React.useContext(LazyContext);
        const presenceContext = React.useContext(PresenceContext);
        const reducedMotionConfig = React.useContext(MotionConfigContext).reducedMotion;
        const visualElementRef = React.useRef();
        /**
         * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
         */
        createVisualElement = createVisualElement || lazyContext.renderer;
        if (!visualElementRef.current && createVisualElement) {
            visualElementRef.current = createVisualElement(Component, {
                visualState,
                parent,
                props,
                presenceId: presenceContext ? presenceContext.id : undefined,
                blockInitialAnimation: presenceContext
                    ? presenceContext.initial === false
                    : false,
                reducedMotionConfig,
            });
        }
        const visualElement = visualElementRef.current;
        useIsomorphicLayoutEffect(() => {
            visualElement && visualElement.render();
        });
        /**
         * If we have optimised appear animations to handoff from, trigger animateChanges
         * from a synchronous useLayoutEffect to ensure there's no flash of incorrectly
         * styled component in the event of a hydration error.
         */
        useIsomorphicLayoutEffect(() => {
            if (visualElement && visualElement.animationState) {
                visualElement.animationState.animateChanges();
            }
        });
        useIsomorphicLayoutEffect(() => () => visualElement && visualElement.notify("Unmount"), []);
        return visualElement;
    }

    function isRefObject(ref) {
        return (typeof ref === "object" &&
            Object.prototype.hasOwnProperty.call(ref, "current"));
    }

    /**
     * Creates a ref function that, when called, hydrates the provided
     * external ref and VisualElement.
     */
    function useMotionRef(visualState, visualElement, externalRef) {
        return React.useCallback((instance) => {
            instance && visualState.mount && visualState.mount(instance);
            if (visualElement) {
                instance
                    ? visualElement.mount(instance)
                    : visualElement.unmount();
            }
            if (externalRef) {
                if (typeof externalRef === "function") {
                    externalRef(instance);
                }
                else if (isRefObject(externalRef)) {
                    externalRef.current = instance;
                }
            }
        }, 
        /**
         * Only pass a new ref callback to React if we've received a visual element
         * factory. Otherwise we'll be mounting/remounting every time externalRef
         * or other dependencies change.
         */
        [visualElement]);
    }

    /**
     * Decides if the supplied variable is variant label
     */
    function isVariantLabel(v) {
        return typeof v === "string" || Array.isArray(v);
    }

    function isAnimationControls(v) {
        return typeof v === "object" && typeof v.start === "function";
    }

    const variantProps$1 = [
        "initial",
        "animate",
        "exit",
        "whileHover",
        "whileDrag",
        "whileTap",
        "whileFocus",
        "whileInView",
    ];
    function isControllingVariants(props) {
        return (isAnimationControls(props.animate) ||
            variantProps$1.some((name) => isVariantLabel(props[name])));
    }
    function isVariantNode(props) {
        return Boolean(isControllingVariants(props) || props.variants);
    }

    function getCurrentTreeVariants(props, context) {
        if (isControllingVariants(props)) {
            const { initial, animate } = props;
            return {
                initial: initial === false || isVariantLabel(initial)
                    ? initial
                    : undefined,
                animate: isVariantLabel(animate) ? animate : undefined,
            };
        }
        return props.inherit !== false ? context : {};
    }

    function useCreateMotionContext(props) {
        const { initial, animate } = getCurrentTreeVariants(props, React.useContext(MotionContext));
        return React.useMemo(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
    }
    function variantLabelsAsDependency(prop) {
        return Array.isArray(prop) ? prop.join(" ") : prop;
    }

    const createDefinition = (propNames) => ({
        isEnabled: (props) => propNames.some((name) => !!props[name]),
    });
    const featureDefinitions = {
        measureLayout: createDefinition(["layout", "layoutId", "drag"]),
        animation: createDefinition([
            "animate",
            "exit",
            "variants",
            "whileHover",
            "whileTap",
            "whileFocus",
            "whileDrag",
            "whileInView",
        ]),
        exit: createDefinition(["exit"]),
        drag: createDefinition(["drag", "dragControls"]),
        focus: createDefinition(["whileFocus"]),
        hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
        tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
        pan: createDefinition([
            "onPan",
            "onPanStart",
            "onPanSessionStart",
            "onPanEnd",
        ]),
        inView: createDefinition([
            "whileInView",
            "onViewportEnter",
            "onViewportLeave",
        ]),
    };

    function loadFeatures(features) {
        for (const key in features) {
            if (key === "projectionNodeConstructor") {
                featureDefinitions.projectionNodeConstructor = features[key];
            }
            else {
                featureDefinitions[key].Component = features[key];
            }
        }
    }

    /**
     * Creates a constant value over the lifecycle of a component.
     *
     * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
     * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
     * you can ensure that initialisers don't execute twice or more.
     */
    function useConstant(init) {
        const ref = React.useRef(null);
        if (ref.current === null) {
            ref.current = init();
        }
        return ref.current;
    }

    /**
     * This should only ever be modified on the client otherwise it'll
     * persist through server requests. If we need instanced states we
     * could lazy-init via root.
     */
    const globalProjectionState = {
        /**
         * Global flag as to whether the tree has animated since the last time
         * we resized the window
         */
        hasAnimatedSinceResize: true,
        /**
         * We set this to true once, on the first update. Any nodes added to the tree beyond that
         * update will be given a `data-projection-id` attribute.
         */
        hasEverUpdated: false,
    };

    let id$1 = 1;
    function useProjectionId() {
        return useConstant(() => {
            if (globalProjectionState.hasEverUpdated) {
                return id$1++;
            }
        });
    }

    const LayoutGroupContext = React.createContext({});

    class VisualElementHandler extends React__default["default"].Component {
        /**
         * Update visual element props as soon as we know this update is going to be commited.
         */
        getSnapshotBeforeUpdate() {
            const { visualElement, props } = this.props;
            if (visualElement)
                visualElement.setProps(props);
            return null;
        }
        componentDidUpdate() { }
        render() {
            return this.props.children;
        }
    }

    /**
     * Internal, exported only for usage in Framer
     */
    const SwitchLayoutGroupContext = React.createContext({});

    const motionComponentSymbol = Symbol.for("motionComponentSymbol");

    /**
     * Create a `motion` component.
     *
     * This function accepts a Component argument, which can be either a string (ie "div"
     * for `motion.div`), or an actual React component.
     *
     * Alongside this is a config option which provides a way of rendering the provided
     * component "offline", or outside the React render cycle.
     */
    function createMotionComponent({ preloadedFeatures, createVisualElement, projectionNodeConstructor, useRender, useVisualState, Component, }) {
        preloadedFeatures && loadFeatures(preloadedFeatures);
        function MotionComponent(props, externalRef) {
            const configAndProps = {
                ...React.useContext(MotionConfigContext),
                ...props,
                layoutId: useLayoutId(props),
            };
            const { isStatic } = configAndProps;
            let features = null;
            const context = useCreateMotionContext(props);
            /**
             * Create a unique projection ID for this component. If a new component is added
             * during a layout animation we'll use this to query the DOM and hydrate its ref early, allowing
             * us to measure it as soon as any layout effect flushes pending layout animations.
             *
             * Performance note: It'd be better not to have to search the DOM for these elements.
             * For newly-entering components it could be enough to only correct treeScale, in which
             * case we could mount in a scale-correction mode. This wouldn't be enough for
             * shared element transitions however. Perhaps for those we could revert to a root node
             * that gets forceRendered and layout animations are triggered on its layout effect.
             */
            const projectionId = isStatic ? undefined : useProjectionId();
            /**
             *
             */
            const visualState = useVisualState(props, isStatic);
            if (!isStatic && isBrowser) {
                /**
                 * Create a VisualElement for this component. A VisualElement provides a common
                 * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
                 * providing a way of rendering to these APIs outside of the React render loop
                 * for more performant animations and interactions
                 */
                context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement);
                /**
                 * Load Motion gesture and animation features. These are rendered as renderless
                 * components so each feature can optionally make use of React lifecycle methods.
                 */
                const lazyStrictMode = React.useContext(LazyContext).strict;
                const initialLayoutGroupConfig = React.useContext(SwitchLayoutGroupContext);
                if (context.visualElement) {
                    features = context.visualElement.loadFeatures(
                    // Note: Pass the full new combined props to correctly re-render dynamic feature components.
                    configAndProps, lazyStrictMode, preloadedFeatures, projectionId, projectionNodeConstructor ||
                        featureDefinitions.projectionNodeConstructor, initialLayoutGroupConfig);
                }
            }
            /**
             * The mount order and hierarchy is specific to ensure our element ref
             * is hydrated by the time features fire their effects.
             */
            return (React__namespace.createElement(VisualElementHandler, { visualElement: context.visualElement, props: configAndProps },
                features,
                React__namespace.createElement(MotionContext.Provider, { value: context }, useRender(Component, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement))));
        }
        const ForwardRefComponent = React.forwardRef(MotionComponent);
        ForwardRefComponent[motionComponentSymbol] = Component;
        return ForwardRefComponent;
    }
    function useLayoutId({ layoutId }) {
        const layoutGroupId = React.useContext(LayoutGroupContext).id;
        return layoutGroupId && layoutId !== undefined
            ? layoutGroupId + "-" + layoutId
            : layoutId;
    }

    /**
     * Convert any React component into a `motion` component. The provided component
     * **must** use `React.forwardRef` to the underlying DOM component you want to animate.
     *
     * ```jsx
     * const Component = React.forwardRef((props, ref) => {
     *   return <div ref={ref} />
     * })
     *
     * const MotionComponent = motion(Component)
     * ```
     *
     * @public
     */
    function createMotionProxy(createConfig) {
        function custom(Component, customMotionComponentConfig = {}) {
            return createMotionComponent(createConfig(Component, customMotionComponentConfig));
        }
        if (typeof Proxy === "undefined") {
            return custom;
        }
        /**
         * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
         * Rather than generating them anew every render.
         */
        const componentCache = new Map();
        return new Proxy(custom, {
            /**
             * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
             * The prop name is passed through as `key` and we can use that to generate a `motion`
             * DOM component with that name.
             */
            get: (_target, key) => {
                /**
                 * If this element doesn't exist in the component cache, create it and cache.
                 */
                if (!componentCache.has(key)) {
                    componentCache.set(key, custom(key));
                }
                return componentCache.get(key);
            },
        });
    }

    /**
     * We keep these listed seperately as we use the lowercase tag names as part
     * of the runtime bundle to detect SVG components
     */
    const lowercaseSVGElements = [
        "animate",
        "circle",
        "defs",
        "desc",
        "ellipse",
        "g",
        "image",
        "line",
        "filter",
        "marker",
        "mask",
        "metadata",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "rect",
        "stop",
        "switch",
        "symbol",
        "svg",
        "text",
        "tspan",
        "use",
        "view",
    ];

    function isSVGComponent(Component) {
        if (
        /**
         * If it's not a string, it's a custom React component. Currently we only support
         * HTML custom React components.
         */
        typeof Component !== "string" ||
            /**
             * If it contains a dash, the element is a custom HTML webcomponent.
             */
            Component.includes("-")) {
            return false;
        }
        else if (
        /**
         * If it's in our list of lowercase SVG tags, it's an SVG component
         */
        lowercaseSVGElements.indexOf(Component) > -1 ||
            /**
             * If it contains a capital letter, it's an SVG component
             */
            /[A-Z]/.test(Component)) {
            return true;
        }
        return false;
    }

    const scaleCorrectors = {};
    function addScaleCorrector(correctors) {
        Object.assign(scaleCorrectors, correctors);
    }

    /**
     * Generate a list of every possible transform key.
     */
    const transformPropOrder = [
        "transformPerspective",
        "x",
        "y",
        "z",
        "translateX",
        "translateY",
        "translateZ",
        "scale",
        "scaleX",
        "scaleY",
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "skew",
        "skewX",
        "skewY",
    ];
    /**
     * A quick lookup for transform props.
     */
    const transformProps = new Set(transformPropOrder);

    function isForcedMotionValue(key, { layout, layoutId }) {
        return (transformProps.has(key) ||
            key.startsWith("origin") ||
            ((layout || layoutId !== undefined) &&
                (!!scaleCorrectors[key] || key === "opacity")));
    }

    const isMotionValue = (value) => !!(value === null || value === void 0 ? void 0 : value.getVelocity);

    const translateAlias = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective",
    };
    /**
     * A function to use with Array.sort to sort transform keys by their default order.
     */
    const sortTransformProps = (a, b) => transformPropOrder.indexOf(a) - transformPropOrder.indexOf(b);
    /**
     * Build a CSS transform style from individual x/y/scale etc properties.
     *
     * This outputs with a default order of transforms/scales/rotations, this can be customised by
     * providing a transformTemplate function.
     */
    function buildTransform({ transform, transformKeys, }, { enableHardwareAcceleration = true, allowTransformNone = true, }, transformIsDefault, transformTemplate) {
        // The transform string we're going to build into.
        let transformString = "";
        // Transform keys into their default order - this will determine the output order.
        transformKeys.sort(sortTransformProps);
        // Loop over each transform and build them into transformString
        for (const key of transformKeys) {
            transformString += `${translateAlias[key] || key}(${transform[key]}) `;
        }
        if (enableHardwareAcceleration && !transform.z) {
            transformString += "translateZ(0)";
        }
        transformString = transformString.trim();
        // If we have a custom `transform` template, pass our transform values and
        // generated transformString to that before returning
        if (transformTemplate) {
            transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
        }
        else if (allowTransformNone && transformIsDefault) {
            transformString = "none";
        }
        return transformString;
    }

    /**
     * Returns true if the provided key is a CSS variable
     */
    function isCSSVariable$1(key) {
        return key.startsWith("--");
    }

    /**
     * Provided a value and a ValueType, returns the value as that value type.
     */
    const getValueAsType = (value, type) => {
        return type && typeof value === "number"
            ? type.transform(value)
            : value;
    };

    const clamp = (min, max, v) => Math.min(Math.max(v, min), max);

    const number = {
        test: (v) => typeof v === "number",
        parse: parseFloat,
        transform: (v) => v,
    };
    const alpha = {
        ...number,
        transform: (v) => clamp(0, 1, v),
    };
    const scale = {
        ...number,
        default: 1,
    };

    /**
     * TODO: When we move from string as a source of truth to data models
     * everything in this folder should probably be referred to as models vs types
     */
    // If this number is a decimal, make it just five decimal places
    // to avoid exponents
    const sanitize = (v) => Math.round(v * 100000) / 100000;
    const floatRegex = /(-)?([\d]*\.?[\d])+/g;
    const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
    const singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
    function isString(v) {
        return typeof v === "string";
    }

    const createUnitType = (unit) => ({
        test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
        parse: parseFloat,
        transform: (v) => `${v}${unit}`,
    });
    const degrees = createUnitType("deg");
    const percent = createUnitType("%");
    const px = createUnitType("px");
    const vh = createUnitType("vh");
    const vw = createUnitType("vw");
    const progressPercentage = {
        ...percent,
        parse: (v) => percent.parse(v) / 100,
        transform: (v) => percent.transform(v * 100),
    };

    const int = {
        ...number,
        transform: Math.round,
    };

    const numberValueTypes = {
        // Border props
        borderWidth: px,
        borderTopWidth: px,
        borderRightWidth: px,
        borderBottomWidth: px,
        borderLeftWidth: px,
        borderRadius: px,
        radius: px,
        borderTopLeftRadius: px,
        borderTopRightRadius: px,
        borderBottomRightRadius: px,
        borderBottomLeftRadius: px,
        // Positioning props
        width: px,
        maxWidth: px,
        height: px,
        maxHeight: px,
        size: px,
        top: px,
        right: px,
        bottom: px,
        left: px,
        // Spacing props
        padding: px,
        paddingTop: px,
        paddingRight: px,
        paddingBottom: px,
        paddingLeft: px,
        margin: px,
        marginTop: px,
        marginRight: px,
        marginBottom: px,
        marginLeft: px,
        // Transform props
        rotate: degrees,
        rotateX: degrees,
        rotateY: degrees,
        rotateZ: degrees,
        scale,
        scaleX: scale,
        scaleY: scale,
        scaleZ: scale,
        skew: degrees,
        skewX: degrees,
        skewY: degrees,
        distance: px,
        translateX: px,
        translateY: px,
        translateZ: px,
        x: px,
        y: px,
        z: px,
        perspective: px,
        transformPerspective: px,
        opacity: alpha,
        originX: progressPercentage,
        originY: progressPercentage,
        originZ: px,
        // Misc
        zIndex: int,
        // SVG
        fillOpacity: alpha,
        strokeOpacity: alpha,
        numOctaves: int,
    };

    function buildHTMLStyles(state, latestValues, options, transformTemplate) {
        const { style, vars, transform, transformKeys, transformOrigin } = state;
        transformKeys.length = 0;
        // Track whether we encounter any transform or transformOrigin values.
        let hasTransform = false;
        let hasTransformOrigin = false;
        // Does the calculated transform essentially equal "none"?
        let transformIsNone = true;
        /**
         * Loop over all our latest animated values and decide whether to handle them
         * as a style or CSS variable.
         *
         * Transforms and transform origins are kept seperately for further processing.
         */
        for (const key in latestValues) {
            const value = latestValues[key];
            /**
             * If this is a CSS variable we don't do any further processing.
             */
            if (isCSSVariable$1(key)) {
                vars[key] = value;
                continue;
            }
            // Convert the value to its default value type, ie 0 -> "0px"
            const valueType = numberValueTypes[key];
            const valueAsType = getValueAsType(value, valueType);
            if (transformProps.has(key)) {
                // If this is a transform, flag to enable further transform processing
                hasTransform = true;
                transform[key] = valueAsType;
                transformKeys.push(key);
                // If we already know we have a non-default transform, early return
                if (!transformIsNone)
                    continue;
                // Otherwise check to see if this is a default transform
                if (value !== (valueType.default || 0))
                    transformIsNone = false;
            }
            else if (key.startsWith("origin")) {
                // If this is a transform origin, flag and enable further transform-origin processing
                hasTransformOrigin = true;
                transformOrigin[key] = valueAsType;
            }
            else {
                style[key] = valueAsType;
            }
        }
        if (!latestValues.transform) {
            if (hasTransform || transformTemplate) {
                style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
            }
            else if (style.transform) {
                /**
                 * If we have previously created a transform but currently don't have any,
                 * reset transform style to none.
                 */
                style.transform = "none";
            }
        }
        /**
         * Build a transformOrigin style. Uses the same defaults as the browser for
         * undefined origins.
         */
        if (hasTransformOrigin) {
            const { originX = "50%", originY = "50%", originZ = 0, } = transformOrigin;
            style.transformOrigin = `${originX} ${originY} ${originZ}`;
        }
    }

    const createHtmlRenderState = () => ({
        style: {},
        transform: {},
        transformKeys: [],
        transformOrigin: {},
        vars: {},
    });

    function copyRawValuesOnly(target, source, props) {
        for (const key in source) {
            if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
                target[key] = source[key];
            }
        }
    }
    function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
        return React.useMemo(() => {
            const state = createHtmlRenderState();
            buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
            return Object.assign({}, state.vars, state.style);
        }, [visualState]);
    }
    function useStyle(props, visualState, isStatic) {
        const styleProp = props.style || {};
        const style = {};
        /**
         * Copy non-Motion Values straight into style
         */
        copyRawValuesOnly(style, styleProp, props);
        Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
        return props.transformValues ? props.transformValues(style) : style;
    }
    function useHTMLProps(props, visualState, isStatic) {
        // The `any` isn't ideal but it is the type of createElement props argument
        const htmlProps = {};
        const style = useStyle(props, visualState, isStatic);
        if (props.drag && props.dragListener !== false) {
            // Disable the ghost element when a user drags
            htmlProps.draggable = false;
            // Disable text selection
            style.userSelect =
                style.WebkitUserSelect =
                    style.WebkitTouchCallout =
                        "none";
            // Disable scrolling on the draggable direction
            style.touchAction =
                props.drag === true
                    ? "none"
                    : `pan-${props.drag === "x" ? "y" : "x"}`;
        }
        htmlProps.style = style;
        return htmlProps;
    }

    const animationProps = [
        "animate",
        "exit",
        "variants",
        "whileHover",
        "whileTap",
        "whileFocus",
        "whileDrag",
        "whileInView",
    ];
    const tapProps = ["whileTap", "onTap", "onTapStart", "onTapCancel"];
    const panProps = ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"];
    const inViewProps = [
        "whileInView",
        "onViewportEnter",
        "onViewportLeave",
        "viewport",
    ];
    /**
     * A list of all valid MotionProps.
     *
     * @privateRemarks
     * This doesn't throw if a `MotionProp` name is missing - it should.
     */
    const validMotionProps = new Set([
        "initial",
        "style",
        "values",
        "variants",
        "transition",
        "transformTemplate",
        "transformValues",
        "custom",
        "inherit",
        "layout",
        "layoutId",
        "layoutDependency",
        "onLayoutAnimationStart",
        "onLayoutAnimationComplete",
        "onLayoutMeasure",
        "onBeforeLayoutMeasure",
        "onAnimationStart",
        "onAnimationComplete",
        "onUpdate",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onMeasureDragConstraints",
        "onDirectionLock",
        "onDragTransitionEnd",
        "drag",
        "dragControls",
        "dragListener",
        "dragConstraints",
        "dragDirectionLock",
        "dragSnapToOrigin",
        "_dragX",
        "_dragY",
        "dragElastic",
        "dragMomentum",
        "dragPropagation",
        "dragTransition",
        "onHoverStart",
        "onHoverEnd",
        "layoutScroll",
        ...inViewProps,
        ...tapProps,
        ...animationProps,
        ...panProps,
    ]);
    /**
     * Check whether a prop name is a valid `MotionProp` key.
     *
     * @param key - Name of the property to check
     * @returns `true` is key is a valid `MotionProp`.
     *
     * @public
     */
    function isValidMotionProp(key) {
        return validMotionProps.has(key);
    }

    let shouldForward = (key) => !isValidMotionProp(key);
    function loadExternalIsValidProp(isValidProp) {
        if (!isValidProp)
            return;
        // Explicitly filter our events
        shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
    }
    /**
     * Emotion and Styled Components both allow users to pass through arbitrary props to their components
     * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
     * of these should be passed to the underlying DOM node.
     *
     * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
     * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
     * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
     * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
     *
     * By making it an optionalDependency we can offer this functionality only in the situations where it's
     * actually required.
     */
    try {
        /**
         * We attempt to import this package but require won't be defined in esm environments, in that case
         * isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
         * in favour of explicit injection.
         */
        loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
    }
    catch (_a) {
        // We don't need to actually do anything here - the fallback is the existing `isPropValid`.
    }
    function filterProps(props, isDom, forwardMotionProps) {
        const filteredProps = {};
        for (const key in props) {
            if (shouldForward(key) ||
                (forwardMotionProps === true && isValidMotionProp(key)) ||
                (!isDom && !isValidMotionProp(key)) ||
                // If trying to use native HTML drag events, forward drag listeners
                (props["draggable"] && key.startsWith("onDrag"))) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    function calcOrigin$1(origin, offset, size) {
        return typeof origin === "string"
            ? origin
            : px.transform(offset + size * origin);
    }
    /**
     * The SVG transform origin defaults are different to CSS and is less intuitive,
     * so we use the measured dimensions of the SVG to reconcile these.
     */
    function calcSVGTransformOrigin(dimensions, originX, originY) {
        const pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
        const pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
        return `${pxOriginX} ${pxOriginY}`;
    }

    const dashKeys = {
        offset: "stroke-dashoffset",
        array: "stroke-dasharray",
    };
    const camelKeys = {
        offset: "strokeDashoffset",
        array: "strokeDasharray",
    };
    /**
     * Build SVG path properties. Uses the path's measured length to convert
     * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
     * and stroke-dasharray attributes.
     *
     * This function is mutative to reduce per-frame GC.
     */
    function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
        // Normalise path length by setting SVG attribute pathLength to 1
        attrs.pathLength = 1;
        // We use dash case when setting attributes directly to the DOM node and camel case
        // when defining props on a React component.
        const keys = useDashCase ? dashKeys : camelKeys;
        // Build the dash offset
        attrs[keys.offset] = px.transform(-offset);
        // Build the dash array
        const pathLength = px.transform(length);
        const pathSpacing = px.transform(spacing);
        attrs[keys.array] = `${pathLength} ${pathSpacing}`;
    }

    /**
     * Build SVG visual attrbutes, like cx and style.transform
     */
    function buildSVGAttrs(state, { attrX, attrY, originX, originY, pathLength, pathSpacing = 1, pathOffset = 0, 
    // This is object creation, which we try to avoid per-frame.
    ...latest }, options, isSVGTag, transformTemplate) {
        buildHTMLStyles(state, latest, options, transformTemplate);
        /**
         * For svg tags we just want to make sure viewBox is animatable and treat all the styles
         * as normal HTML tags.
         */
        if (isSVGTag) {
            if (state.style.viewBox) {
                state.attrs.viewBox = state.style.viewBox;
            }
            return;
        }
        state.attrs = state.style;
        state.style = {};
        const { attrs, style, dimensions } = state;
        /**
         * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
         * and copy it into style.
         */
        if (attrs.transform) {
            if (dimensions)
                style.transform = attrs.transform;
            delete attrs.transform;
        }
        // Parse transformOrigin
        if (dimensions &&
            (originX !== undefined || originY !== undefined || style.transform)) {
            style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
        }
        // Treat x/y not as shortcuts but as actual attributes
        if (attrX !== undefined)
            attrs.x = attrX;
        if (attrY !== undefined)
            attrs.y = attrY;
        // Build SVG path if one has been defined
        if (pathLength !== undefined) {
            buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
        }
    }

    const createSvgRenderState = () => ({
        ...createHtmlRenderState(),
        attrs: {},
    });

    const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

    function useSVGProps(props, visualState, _isStatic, Component) {
        const visualProps = React.useMemo(() => {
            const state = createSvgRenderState();
            buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, isSVGTag(Component), props.transformTemplate);
            return {
                ...state.attrs,
                style: { ...state.style },
            };
        }, [visualState]);
        if (props.style) {
            const rawStyles = {};
            copyRawValuesOnly(rawStyles, props.style, props);
            visualProps.style = { ...rawStyles, ...visualProps.style };
        }
        return visualProps;
    }

    function createUseRender(forwardMotionProps = false) {
        const useRender = (Component, props, projectionId, ref, { latestValues }, isStatic) => {
            const useVisualProps = isSVGComponent(Component)
                ? useSVGProps
                : useHTMLProps;
            const visualProps = useVisualProps(props, latestValues, isStatic, Component);
            const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
            const elementProps = {
                ...filteredProps,
                ...visualProps,
                ref,
            };
            if (projectionId) {
                elementProps["data-projection-id"] = projectionId;
            }
            return React.createElement(Component, elementProps);
        };
        return useRender;
    }

    /**
     * Convert camelCase to dash-case properties.
     */
    const camelToDash = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

    function renderHTML(element, { style, vars }, styleProp, projection) {
        Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
        // Loop over any CSS variables and assign those.
        for (const key in vars) {
            element.style.setProperty(key, vars[key]);
        }
    }

    /**
     * A set of attribute names that are always read/written as camel case.
     */
    const camelCaseAttributes = new Set([
        "baseFrequency",
        "diffuseConstant",
        "kernelMatrix",
        "kernelUnitLength",
        "keySplines",
        "keyTimes",
        "limitingConeAngle",
        "markerHeight",
        "markerWidth",
        "numOctaves",
        "targetX",
        "targetY",
        "surfaceScale",
        "specularConstant",
        "specularExponent",
        "stdDeviation",
        "tableValues",
        "viewBox",
        "gradientTransform",
        "pathLength",
        "startOffset",
        "textLength",
        "lengthAdjust",
    ]);

    function renderSVG(element, renderState, _styleProp, projection) {
        renderHTML(element, renderState, undefined, projection);
        for (const key in renderState.attrs) {
            element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
        }
    }

    function scrapeMotionValuesFromProps$1(props) {
        const { style } = props;
        const newValues = {};
        for (const key in style) {
            if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
                newValues[key] = style[key];
            }
        }
        return newValues;
    }

    function scrapeMotionValuesFromProps(props) {
        const newValues = scrapeMotionValuesFromProps$1(props);
        for (const key in props) {
            if (isMotionValue(props[key])) {
                const targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
                newValues[targetKey] = props[key];
            }
        }
        return newValues;
    }

    function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
        /**
         * If the variant definition is a function, resolve.
         */
        if (typeof definition === "function") {
            definition = definition(custom !== undefined ? custom : props.custom, currentValues, currentVelocity);
        }
        /**
         * If the variant definition is a variant label, or
         * the function returned a variant label, resolve.
         */
        if (typeof definition === "string") {
            definition = props.variants && props.variants[definition];
        }
        /**
         * At this point we've resolved both functions and variant labels,
         * but the resolved variant label might itself have been a function.
         * If so, resolve. This can only have returned a valid target object.
         */
        if (typeof definition === "function") {
            definition = definition(custom !== undefined ? custom : props.custom, currentValues, currentVelocity);
        }
        return definition;
    }

    const isKeyframesTarget = (v) => {
        return Array.isArray(v);
    };

    const isCustomValue = (v) => {
        return Boolean(v && typeof v === "object" && v.mix && v.toValue);
    };
    const resolveFinalValueInKeyframes = (v) => {
        // TODO maybe throw if v.length - 1 is placeholder token?
        return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
    };

    /**
     * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
     *
     * TODO: Remove and move to library
     */
    function resolveMotionValue(value) {
        const unwrappedValue = isMotionValue(value) ? value.get() : value;
        return isCustomValue(unwrappedValue)
            ? unwrappedValue.toValue()
            : unwrappedValue;
    }

    function makeState({ scrapeMotionValuesFromProps, createRenderState, onMount, }, props, context, presenceContext) {
        const state = {
            latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
            renderState: createRenderState(),
        };
        if (onMount) {
            state.mount = (instance) => onMount(props, instance, state);
        }
        return state;
    }
    const makeUseVisualState = (config) => (props, isStatic) => {
        const context = React.useContext(MotionContext);
        const presenceContext = React.useContext(PresenceContext);
        const make = () => makeState(config, props, context, presenceContext);
        return isStatic ? make() : useConstant(make);
    };
    function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
        const values = {};
        const motionValues = scrapeMotionValues(props);
        for (const key in motionValues) {
            values[key] = resolveMotionValue(motionValues[key]);
        }
        let { initial, animate } = props;
        const isControllingVariants$1 = isControllingVariants(props);
        const isVariantNode$1 = isVariantNode(props);
        if (context &&
            isVariantNode$1 &&
            !isControllingVariants$1 &&
            props.inherit !== false) {
            if (initial === undefined)
                initial = context.initial;
            if (animate === undefined)
                animate = context.animate;
        }
        let isInitialAnimationBlocked = presenceContext
            ? presenceContext.initial === false
            : false;
        isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
        const variantToSet = isInitialAnimationBlocked ? animate : initial;
        if (variantToSet &&
            typeof variantToSet !== "boolean" &&
            !isAnimationControls(variantToSet)) {
            const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
            list.forEach((definition) => {
                const resolved = resolveVariantFromProps(props, definition);
                if (!resolved)
                    return;
                const { transitionEnd, transition, ...target } = resolved;
                for (const key in target) {
                    let valueTarget = target[key];
                    if (Array.isArray(valueTarget)) {
                        /**
                         * Take final keyframe if the initial animation is blocked because
                         * we want to initialise at the end of that blocked animation.
                         */
                        const index = isInitialAnimationBlocked
                            ? valueTarget.length - 1
                            : 0;
                        valueTarget = valueTarget[index];
                    }
                    if (valueTarget !== null) {
                        values[key] = valueTarget;
                    }
                }
                for (const key in transitionEnd)
                    values[key] = transitionEnd[key];
            });
        }
        return values;
    }

    const svgMotionConfig = {
        useVisualState: makeUseVisualState({
            scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
            createRenderState: createSvgRenderState,
            onMount: (props, instance, { renderState, latestValues }) => {
                try {
                    renderState.dimensions =
                        typeof instance.getBBox ===
                            "function"
                            ? instance.getBBox()
                            : instance.getBoundingClientRect();
                }
                catch (e) {
                    // Most likely trying to measure an unrendered element under Firefox
                    renderState.dimensions = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    };
                }
                buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, isSVGTag(instance.tagName), props.transformTemplate);
                renderSVG(instance, renderState);
            },
        }),
    };

    const htmlMotionConfig = {
        useVisualState: makeUseVisualState({
            scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
            createRenderState: createHtmlRenderState,
        }),
    };

    function createDomMotionConfig(Component, { forwardMotionProps = false }, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
        const baseConfig = isSVGComponent(Component)
            ? svgMotionConfig
            : htmlMotionConfig;
        return {
            ...baseConfig,
            preloadedFeatures,
            useRender: createUseRender(forwardMotionProps),
            createVisualElement,
            projectionNodeConstructor,
            Component,
        };
    }

    var AnimationType;
    (function (AnimationType) {
        AnimationType["Animate"] = "animate";
        AnimationType["Hover"] = "whileHover";
        AnimationType["Tap"] = "whileTap";
        AnimationType["Drag"] = "whileDrag";
        AnimationType["Focus"] = "whileFocus";
        AnimationType["InView"] = "whileInView";
        AnimationType["Exit"] = "exit";
    })(AnimationType || (AnimationType = {}));

    function addDomEvent(target, eventName, handler, options = { passive: true }) {
        target.addEventListener(eventName, handler, options);
        return () => target.removeEventListener(eventName, handler);
    }
    /**
     * Attaches an event listener directly to the provided DOM element.
     *
     * Bypassing React's event system can be desirable, for instance when attaching non-passive
     * event handlers.
     *
     * ```jsx
     * const ref = useRef(null)
     *
     * useDomEvent(ref, 'wheel', onWheel, { passive: false })
     *
     * return <div ref={ref} />
     * ```
     *
     * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
     * @param eventName - Name of the event you want listen for.
     * @param handler - Function to fire when receiving the event.
     * @param options - Options to pass to `Event.addEventListener`.
     *
     * @public
     */
    function useDomEvent(ref, eventName, handler, options) {
        React.useEffect(() => {
            const element = ref.current;
            if (handler && element) {
                return addDomEvent(element, eventName, handler, options);
            }
        }, [ref, eventName, handler, options]);
    }

    /**
     *
     * @param props
     * @param ref
     * @internal
     */
    function useFocusGesture({ whileFocus, visualElement, }) {
        const { animationState } = visualElement;
        const onFocus = () => {
            animationState && animationState.setActive(AnimationType.Focus, true);
        };
        const onBlur = () => {
            animationState && animationState.setActive(AnimationType.Focus, false);
        };
        useDomEvent(visualElement, "focus", whileFocus ? onFocus : undefined);
        useDomEvent(visualElement, "blur", whileFocus ? onBlur : undefined);
    }

    function isMouseEvent(event) {
        // PointerEvent inherits from MouseEvent so we can't use a straight instanceof check.
        if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
            return !!(event.pointerType === "mouse");
        }
        return event instanceof MouseEvent;
    }
    function isTouchEvent(event) {
        const hasTouches = !!event.touches;
        return hasTouches;
    }

    /**
     * Filters out events not attached to the primary pointer (currently left mouse button)
     * @param eventHandler
     */
    function filterPrimaryPointer(eventHandler) {
        return (event) => {
            const isMouseEvent = event instanceof MouseEvent;
            const isPrimaryPointer = !isMouseEvent ||
                (isMouseEvent && event.button === 0);
            if (isPrimaryPointer) {
                eventHandler(event);
            }
        };
    }
    const defaultPagePoint = { pageX: 0, pageY: 0 };
    function pointFromTouch(e, pointType = "page") {
        const primaryTouch = e.touches[0] || e.changedTouches[0];
        const point = primaryTouch || defaultPagePoint;
        return {
            x: point[pointType + "X"],
            y: point[pointType + "Y"],
        };
    }
    function pointFromMouse(point, pointType = "page") {
        return {
            x: point[pointType + "X"],
            y: point[pointType + "Y"],
        };
    }
    function extractEventInfo(event, pointType = "page") {
        return {
            point: isTouchEvent(event)
                ? pointFromTouch(event, pointType)
                : pointFromMouse(event, pointType),
        };
    }
    const wrapHandler = (handler, shouldFilterPrimaryPointer = false) => {
        const listener = (event) => handler(event, extractEventInfo(event));
        return shouldFilterPrimaryPointer
            ? filterPrimaryPointer(listener)
            : listener;
    };

    // We check for event support via functions in case they've been mocked by a testing suite.
    const supportsPointerEvents = () => isBrowser && window.onpointerdown === null;
    const supportsTouchEvents = () => isBrowser && window.ontouchstart === null;
    const supportsMouseEvents = () => isBrowser && window.onmousedown === null;

    const mouseEventNames = {
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointercancel: "mousecancel",
        pointerover: "mouseover",
        pointerout: "mouseout",
        pointerenter: "mouseenter",
        pointerleave: "mouseleave",
    };
    const touchEventNames = {
        pointerdown: "touchstart",
        pointermove: "touchmove",
        pointerup: "touchend",
        pointercancel: "touchcancel",
    };
    function getPointerEventName(name) {
        if (supportsPointerEvents()) {
            return name;
        }
        else if (supportsTouchEvents()) {
            return touchEventNames[name];
        }
        else if (supportsMouseEvents()) {
            return mouseEventNames[name];
        }
        return name;
    }
    function addPointerEvent(target, eventName, handler, options) {
        return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
    }
    function usePointerEvent(ref, eventName, handler, options) {
        return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
    }

    function createLock(name) {
        let lock = null;
        return () => {
            const openLock = () => {
                lock = null;
            };
            if (lock === null) {
                lock = name;
                return openLock;
            }
            return false;
        };
    }
    const globalHorizontalLock = createLock("dragHorizontal");
    const globalVerticalLock = createLock("dragVertical");
    function getGlobalLock(drag) {
        let lock = false;
        if (drag === "y") {
            lock = globalVerticalLock();
        }
        else if (drag === "x") {
            lock = globalHorizontalLock();
        }
        else {
            const openHorizontal = globalHorizontalLock();
            const openVertical = globalVerticalLock();
            if (openHorizontal && openVertical) {
                lock = () => {
                    openHorizontal();
                    openVertical();
                };
            }
            else {
                // Release the locks because we don't use them
                if (openHorizontal)
                    openHorizontal();
                if (openVertical)
                    openVertical();
            }
        }
        return lock;
    }
    function isDragActive() {
        // Check the gesture lock - if we get it, it means no drag gesture is active
        // and we can safely fire the tap gesture.
        const openGestureLock = getGlobalLock(true);
        if (!openGestureLock)
            return true;
        openGestureLock();
        return false;
    }

    function createHoverEvent(visualElement, isActive, callback) {
        return (event, info) => {
            if (!isMouseEvent(event) || isDragActive())
                return;
            /**
             * Ensure we trigger animations before firing event callback
             */
            if (visualElement.animationState) {
                visualElement.animationState.setActive(AnimationType.Hover, isActive);
            }
            callback && callback(event, info);
        };
    }
    function useHoverGesture({ onHoverStart, onHoverEnd, whileHover, visualElement, }) {
        usePointerEvent(visualElement, "pointerenter", onHoverStart || whileHover
            ? createHoverEvent(visualElement, true, onHoverStart)
            : undefined, { passive: !onHoverStart });
        usePointerEvent(visualElement, "pointerleave", onHoverEnd || whileHover
            ? createHoverEvent(visualElement, false, onHoverEnd)
            : undefined, { passive: !onHoverEnd });
    }

    /**
     * Recursively traverse up the tree to check whether the provided child node
     * is the parent or a descendant of it.
     *
     * @param parent - Element to find
     * @param child - Element to test against parent
     */
    const isNodeOrChild = (parent, child) => {
        if (!child) {
            return false;
        }
        else if (parent === child) {
            return true;
        }
        else {
            return isNodeOrChild(parent, child.parentElement);
        }
    };

    function useUnmountEffect(callback) {
        return React.useEffect(() => () => callback(), []);
    }

    /**
     * Pipe
     * Compose other transformers to run linearily
     * pipe(min(20), max(40))
     * @param  {...functions} transformers
     * @return {function}
     */
    const combineFunctions = (a, b) => (v) => b(a(v));
    const pipe = (...transformers) => transformers.reduce(combineFunctions);

    /**
     * @param handlers -
     * @internal
     */
    function useTapGesture({ onTap, onTapStart, onTapCancel, whileTap, visualElement, }) {
        const hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
        const isPressing = React.useRef(false);
        const cancelPointerEndListeners = React.useRef(null);
        /**
         * Only set listener to passive if there are no external listeners.
         */
        const eventOptions = {
            passive: !(onTapStart || onTap || onTapCancel || onPointerDown),
        };
        function removePointerEndListener() {
            cancelPointerEndListeners.current && cancelPointerEndListeners.current();
            cancelPointerEndListeners.current = null;
        }
        function checkPointerEnd() {
            removePointerEndListener();
            isPressing.current = false;
            visualElement.animationState &&
                visualElement.animationState.setActive(AnimationType.Tap, false);
            return !isDragActive();
        }
        function onPointerUp(event, info) {
            if (!checkPointerEnd())
                return;
            /**
             * We only count this as a tap gesture if the event.target is the same
             * as, or a child of, this component's element
             */
            !isNodeOrChild(visualElement.current, event.target)
                ? onTapCancel && onTapCancel(event, info)
                : onTap && onTap(event, info);
        }
        function onPointerCancel(event, info) {
            if (!checkPointerEnd())
                return;
            onTapCancel && onTapCancel(event, info);
        }
        function onPointerDown(event, info) {
            removePointerEndListener();
            if (isPressing.current)
                return;
            isPressing.current = true;
            cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp, eventOptions), addPointerEvent(window, "pointercancel", onPointerCancel, eventOptions));
            /**
             * Ensure we trigger animations before firing event callback
             */
            visualElement.animationState &&
                visualElement.animationState.setActive(AnimationType.Tap, true);
            onTapStart && onTapStart(event, info);
        }
        usePointerEvent(visualElement, "pointerdown", hasPressListeners ? onPointerDown : undefined, eventOptions);
        useUnmountEffect(removePointerEndListener);
    }

    /**
     * Browser-safe usage of process
     */
    const defaultEnvironment = "production";
    const env = typeof process === "undefined" || process.env === undefined
        ? defaultEnvironment
        : "production" ;

    const warned = new Set();
    function warnOnce(condition, message, element) {
        if (condition || warned.has(message))
            return;
        console.warn(message);
        if (element)
            console.warn(element);
        warned.add(message);
    }

    /**
     * Map an IntersectionHandler callback to an element. We only ever make one handler for one
     * element, so even though these handlers might all be triggered by different
     * observers, we can keep them in the same map.
     */
    const observerCallbacks = new WeakMap();
    /**
     * Multiple observers can be created for multiple element/document roots. Each with
     * different settings. So here we store dictionaries of observers to each root,
     * using serialised settings (threshold/margin) as lookup keys.
     */
    const observers = new WeakMap();
    const fireObserverCallback = (entry) => {
        const callback = observerCallbacks.get(entry.target);
        callback && callback(entry);
    };
    const fireAllObserverCallbacks = (entries) => {
        entries.forEach(fireObserverCallback);
    };
    function initIntersectionObserver({ root, ...options }) {
        const lookupRoot = root || document;
        /**
         * If we don't have an observer lookup map for this root, create one.
         */
        if (!observers.has(lookupRoot)) {
            observers.set(lookupRoot, {});
        }
        const rootObservers = observers.get(lookupRoot);
        const key = JSON.stringify(options);
        /**
         * If we don't have an observer for this combination of root and settings,
         * create one.
         */
        if (!rootObservers[key]) {
            rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
        }
        return rootObservers[key];
    }
    function observeIntersection(element, options, callback) {
        const rootInteresectionObserver = initIntersectionObserver(options);
        observerCallbacks.set(element, callback);
        rootInteresectionObserver.observe(element);
        return () => {
            observerCallbacks.delete(element);
            rootInteresectionObserver.unobserve(element);
        };
    }

    function useViewport({ visualElement, whileInView, onViewportEnter, onViewportLeave, viewport = {}, }) {
        const state = React.useRef({
            hasEnteredView: false,
            isInView: false,
        });
        let shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
        if (viewport.once && state.current.hasEnteredView)
            shouldObserve = false;
        const useObserver = typeof IntersectionObserver === "undefined"
            ? useMissingIntersectionObserver
            : useIntersectionObserver;
        useObserver(shouldObserve, state.current, visualElement, viewport);
    }
    const thresholdNames = {
        some: 0,
        all: 1,
    };
    function useIntersectionObserver(shouldObserve, state, visualElement, { root, margin: rootMargin, amount = "some", once }) {
        React.useEffect(() => {
            if (!shouldObserve || !visualElement.current)
                return;
            const options = {
                root: root === null || root === void 0 ? void 0 : root.current,
                rootMargin,
                threshold: typeof amount === "number" ? amount : thresholdNames[amount],
            };
            const intersectionCallback = (entry) => {
                const { isIntersecting } = entry;
                /**
                 * If there's been no change in the viewport state, early return.
                 */
                if (state.isInView === isIntersecting)
                    return;
                state.isInView = isIntersecting;
                /**
                 * Handle hasEnteredView. If this is only meant to run once, and
                 * element isn't visible, early return. Otherwise set hasEnteredView to true.
                 */
                if (once && !isIntersecting && state.hasEnteredView) {
                    return;
                }
                else if (isIntersecting) {
                    state.hasEnteredView = true;
                }
                if (visualElement.animationState) {
                    visualElement.animationState.setActive(AnimationType.InView, isIntersecting);
                }
                /**
                 * Use the latest committed props rather than the ones in scope
                 * when this observer is created
                 */
                const props = visualElement.getProps();
                const callback = isIntersecting
                    ? props.onViewportEnter
                    : props.onViewportLeave;
                callback && callback(entry);
            };
            return observeIntersection(visualElement.current, options, intersectionCallback);
        }, [shouldObserve, root, rootMargin, amount]);
    }
    /**
     * If IntersectionObserver is missing, we activate inView and fire onViewportEnter
     * on mount. This way, the page will be in the state the author expects users
     * to see it in for everyone.
     */
    function useMissingIntersectionObserver(shouldObserve, state, visualElement, { fallback = true }) {
        React.useEffect(() => {
            if (!shouldObserve || !fallback)
                return;
            if (env !== "production") {
                warnOnce(false, "IntersectionObserver not available on this device. whileInView animations will trigger on mount.");
            }
            /**
             * Fire this in an rAF because, at this point, the animation state
             * won't have flushed for the first time and there's certain logic in
             * there that behaves differently on the initial animation.
             *
             * This hook should be quite rarely called so setting this in an rAF
             * is preferred to changing the behaviour of the animation state.
             */
            requestAnimationFrame(() => {
                state.hasEnteredView = true;
                const { onViewportEnter } = visualElement.getProps();
                onViewportEnter && onViewportEnter(null);
                if (visualElement.animationState) {
                    visualElement.animationState.setActive(AnimationType.InView, true);
                }
            });
        }, [shouldObserve]);
    }

    const makeRenderlessComponent = (hook) => (props) => {
        hook(props);
        return null;
    };

    const gestureAnimations = {
        inView: makeRenderlessComponent(useViewport),
        tap: makeRenderlessComponent(useTapGesture),
        focus: makeRenderlessComponent(useFocusGesture),
        hover: makeRenderlessComponent(useHoverGesture),
    };

    /**
     * When a component is the child of `AnimatePresence`, it can use `usePresence`
     * to access information about whether it's still present in the React tree.
     *
     * ```jsx
     * import { usePresence } from "framer-motion"
     *
     * export const Component = () => {
     *   const [isPresent, safeToRemove] = usePresence()
     *
     *   useEffect(() => {
     *     !isPresent && setTimeout(safeToRemove, 1000)
     *   }, [isPresent])
     *
     *   return <div />
     * }
     * ```
     *
     * If `isPresent` is `false`, it means that a component has been removed the tree, but
     * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
     *
     * @public
     */
    function usePresence() {
        const context = React.useContext(PresenceContext);
        if (context === null)
            return [true, null];
        const { isPresent, onExitComplete, register } = context;
        // It's safe to call the following hooks conditionally (after an early return) because the context will always
        // either be null or non-null for the lifespan of the component.
        // Replace with useId when released in React
        const id = React.useId();
        React.useEffect(() => register(id), []);
        const safeToRemove = () => onExitComplete && onExitComplete(id);
        return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
    }

    function shallowCompare(next, prev) {
        if (!Array.isArray(prev))
            return false;
        const prevLength = prev.length;
        if (prevLength !== next.length)
            return false;
        for (let i = 0; i < prevLength; i++) {
            if (prev[i] !== next[i])
                return false;
        }
        return true;
    }

    /**
     * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
     */
    const isNumericalString = (v) => /^\-?\d*\.?\d+$/.test(v);

    /**
     * Check if the value is a zero value string like "0px" or "0%"
     */
    const isZeroValueString = (v) => /^0[^.\s]+$/.test(v);

    const frameData = {
        delta: 0,
        timestamp: 0,
    };

    /*
      Detect and load appropriate clock setting for the execution environment
     */
    const defaultTimestep = (1 / 60) * 1000;
    const getCurrentTime = typeof performance !== "undefined"
        ? () => performance.now()
        : () => Date.now();
    const onNextFrame = typeof window !== "undefined"
        ? (callback) => window.requestAnimationFrame(callback)
        : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

    function createRenderStep(runNextFrame) {
        /**
         * We create and reuse two arrays, one to queue jobs for the current frame
         * and one for the next. We reuse to avoid triggering GC after x frames.
         */
        let toRun = [];
        let toRunNextFrame = [];
        /**
         *
         */
        let numToRun = 0;
        /**
         * Track whether we're currently processing jobs in this step. This way
         * we can decide whether to schedule new jobs for this frame or next.
         */
        let isProcessing = false;
        let flushNextFrame = false;
        /**
         * A set of processes which were marked keepAlive when scheduled.
         */
        const toKeepAlive = new WeakSet();
        const step = {
            /**
             * Schedule a process to run on the next frame.
             */
            schedule: (callback, keepAlive = false, immediate = false) => {
                const addToCurrentFrame = immediate && isProcessing;
                const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
                if (keepAlive)
                    toKeepAlive.add(callback);
                // If the buffer doesn't already contain this callback, add it
                if (buffer.indexOf(callback) === -1) {
                    buffer.push(callback);
                    // If we're adding it to the currently running buffer, update its measured size
                    if (addToCurrentFrame && isProcessing)
                        numToRun = toRun.length;
                }
                return callback;
            },
            /**
             * Cancel the provided callback from running on the next frame.
             */
            cancel: (callback) => {
                const index = toRunNextFrame.indexOf(callback);
                if (index !== -1)
                    toRunNextFrame.splice(index, 1);
                toKeepAlive.delete(callback);
            },
            /**
             * Execute all schedule callbacks.
             */
            process: (frameData) => {
                /**
                 * If we're already processing we've probably been triggered by a flushSync
                 * inside an existing process. Instead of executing, mark flushNextFrame
                 * as true and ensure we flush the following frame at the end of this one.
                 */
                if (isProcessing) {
                    flushNextFrame = true;
                    return;
                }
                isProcessing = true;
                [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
                // Clear the next frame list
                toRunNextFrame.length = 0;
                // Execute this frame
                numToRun = toRun.length;
                if (numToRun) {
                    for (let i = 0; i < numToRun; i++) {
                        const callback = toRun[i];
                        callback(frameData);
                        if (toKeepAlive.has(callback)) {
                            step.schedule(callback);
                            runNextFrame();
                        }
                    }
                }
                isProcessing = false;
                if (flushNextFrame) {
                    flushNextFrame = false;
                    step.process(frameData);
                }
            },
        };
        return step;
    }

    const maxElapsed = 40;
    let useDefaultElapsed = true;
    let runNextFrame = false;
    let isProcessing = false;
    const stepsOrder = [
        "read",
        "update",
        "preRender",
        "render",
        "postRender",
    ];
    const steps = stepsOrder.reduce((acc, key) => {
        acc[key] = createRenderStep(() => (runNextFrame = true));
        return acc;
    }, {});
    const sync = stepsOrder.reduce((acc, key) => {
        const step = steps[key];
        acc[key] = (process, keepAlive = false, immediate = false) => {
            if (!runNextFrame)
                startLoop();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    const cancelSync = stepsOrder.reduce((acc, key) => {
        acc[key] = steps[key].cancel;
        return acc;
    }, {});
    const flushSync = stepsOrder.reduce((acc, key) => {
        acc[key] = () => steps[key].process(frameData);
        return acc;
    }, {});
    const processStep = (stepId) => steps[stepId].process(frameData);
    const processFrame = (timestamp) => {
        runNextFrame = false;
        frameData.delta = useDefaultElapsed
            ? defaultTimestep
            : Math.max(Math.min(timestamp - frameData.timestamp, maxElapsed), 1);
        frameData.timestamp = timestamp;
        isProcessing = true;
        stepsOrder.forEach(processStep);
        isProcessing = false;
        if (runNextFrame) {
            useDefaultElapsed = false;
            onNextFrame(processFrame);
        }
    };
    const startLoop = () => {
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!isProcessing)
            onNextFrame(processFrame);
    };

    function addUniqueItem(arr, item) {
        if (arr.indexOf(item) === -1)
            arr.push(item);
    }
    function removeItem(arr, item) {
        const index = arr.indexOf(item);
        if (index > -1)
            arr.splice(index, 1);
    }

    class SubscriptionManager {
        constructor() {
            this.subscriptions = [];
        }
        add(handler) {
            addUniqueItem(this.subscriptions, handler);
            return () => removeItem(this.subscriptions, handler);
        }
        notify(a, b, c) {
            const numSubscriptions = this.subscriptions.length;
            if (!numSubscriptions)
                return;
            if (numSubscriptions === 1) {
                /**
                 * If there's only a single handler we can just call it without invoking a loop.
                 */
                this.subscriptions[0](a, b, c);
            }
            else {
                for (let i = 0; i < numSubscriptions; i++) {
                    /**
                     * Check whether the handler exists before firing as it's possible
                     * the subscriptions were modified during this loop running.
                     */
                    const handler = this.subscriptions[i];
                    handler && handler(a, b, c);
                }
            }
        }
        getSize() {
            return this.subscriptions.length;
        }
        clear() {
            this.subscriptions.length = 0;
        }
    }

    /*
      Convert velocity into velocity per second

      @param [number]: Unit per frame
      @param [number]: Frame duration in ms
    */
    function velocityPerSecond(velocity, frameDuration) {
        return frameDuration ? velocity * (1000 / frameDuration) : 0;
    }

    const isFloat = (value) => {
        return !isNaN(parseFloat(value));
    };
    /**
     * `MotionValue` is used to track the state and velocity of motion values.
     *
     * @public
     */
    class MotionValue {
        /**
         * @param init - The initiating value
         * @param config - Optional configuration options
         *
         * -  `transformer`: A function to transform incoming values with.
         *
         * @internal
         */
        constructor(init, options = {}) {
            /**
             * This will be replaced by the build step with the latest version number.
             * When MotionValues are provided to motion components, warn if versions are mixed.
             */
            this.version = "7.10.3";
            /**
             * Duration, in milliseconds, since last updating frame.
             *
             * @internal
             */
            this.timeDelta = 0;
            /**
             * Timestamp of the last time this `MotionValue` was updated.
             *
             * @internal
             */
            this.lastUpdated = 0;
            /**
             * Tracks whether this value can output a velocity. Currently this is only true
             * if the value is numerical, but we might be able to widen the scope here and support
             * other value types.
             *
             * @internal
             */
            this.canTrackVelocity = false;
            /**
             * An object containing a SubscriptionManager for each active event.
             */
            this.events = {};
            this.updateAndNotify = (v, render = true) => {
                this.prev = this.current;
                this.current = v;
                // Update timestamp
                const { delta, timestamp } = frameData;
                if (this.lastUpdated !== timestamp) {
                    this.timeDelta = delta;
                    this.lastUpdated = timestamp;
                    sync.postRender(this.scheduleVelocityCheck);
                }
                // Update update subscribers
                if (this.prev !== this.current && this.events.change) {
                    this.events.change.notify(this.current);
                }
                // Update velocity subscribers
                if (this.events.velocityChange) {
                    this.events.velocityChange.notify(this.getVelocity());
                }
                // Update render subscribers
                if (render && this.events.renderRequest) {
                    this.events.renderRequest.notify(this.current);
                }
            };
            /**
             * Schedule a velocity check for the next frame.
             *
             * This is an instanced and bound function to prevent generating a new
             * function once per frame.
             *
             * @internal
             */
            this.scheduleVelocityCheck = () => sync.postRender(this.velocityCheck);
            /**
             * Updates `prev` with `current` if the value hasn't been updated this frame.
             * This ensures velocity calculations return `0`.
             *
             * This is an instanced and bound function to prevent generating a new
             * function once per frame.
             *
             * @internal
             */
            this.velocityCheck = ({ timestamp }) => {
                if (timestamp !== this.lastUpdated) {
                    this.prev = this.current;
                    if (this.events.velocityChange) {
                        this.events.velocityChange.notify(this.getVelocity());
                    }
                }
            };
            this.hasAnimated = false;
            this.prev = this.current = init;
            this.canTrackVelocity = isFloat(this.current);
            this.owner = options.owner;
        }
        /**
         * Adds a function that will be notified when the `MotionValue` is updated.
         *
         * It returns a function that, when called, will cancel the subscription.
         *
         * When calling `onChange` inside a React component, it should be wrapped with the
         * `useEffect` hook. As it returns an unsubscribe function, this should be returned
         * from the `useEffect` function to ensure you don't add duplicate subscribers..
         *
         * ```jsx
         * export const MyComponent = () => {
         *   const x = useMotionValue(0)
         *   const y = useMotionValue(0)
         *   const opacity = useMotionValue(1)
         *
         *   useEffect(() => {
         *     function updateOpacity() {
         *       const maxXY = Math.max(x.get(), y.get())
         *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
         *       opacity.set(newOpacity)
         *     }
         *
         *     const unsubscribeX = x.on("change", updateOpacity)
         *     const unsubscribeY = y.on("change", updateOpacity)
         *
         *     return () => {
         *       unsubscribeX()
         *       unsubscribeY()
         *     }
         *   }, [])
         *
         *   return <motion.div style={{ x }} />
         * }
         * ```
         *
         * @privateRemarks
         *
         * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
         *
         * ```jsx
         * useOnChange(x, () => {})
         * ```
         *
         * @param subscriber - A function that receives the latest value.
         * @returns A function that, when called, will cancel this subscription.
         *
         * @deprecated
         */
        onChange(subscription) {
            return this.on("change", subscription);
        }
        on(eventName, callback) {
            if (!this.events[eventName]) {
                this.events[eventName] = new SubscriptionManager();
            }
            return this.events[eventName].add(callback);
        }
        clearListeners() {
            for (const eventManagers in this.events) {
                this.events[eventManagers].clear();
            }
        }
        /**
         * Attaches a passive effect to the `MotionValue`.
         *
         * @internal
         */
        attach(passiveEffect) {
            this.passiveEffect = passiveEffect;
        }
        /**
         * Sets the state of the `MotionValue`.
         *
         * @remarks
         *
         * ```jsx
         * const x = useMotionValue(0)
         * x.set(10)
         * ```
         *
         * @param latest - Latest value to set.
         * @param render - Whether to notify render subscribers. Defaults to `true`
         *
         * @public
         */
        set(v, render = true) {
            if (!render || !this.passiveEffect) {
                this.updateAndNotify(v, render);
            }
            else {
                this.passiveEffect(v, this.updateAndNotify);
            }
        }
        setWithVelocity(prev, current, delta) {
            this.set(current);
            this.prev = prev;
            this.timeDelta = delta;
        }
        /**
         * Returns the latest state of `MotionValue`
         *
         * @returns - The latest state of `MotionValue`
         *
         * @public
         */
        get() {
            return this.current;
        }
        /**
         * @public
         */
        getPrevious() {
            return this.prev;
        }
        /**
         * Returns the latest velocity of `MotionValue`
         *
         * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
         *
         * @public
         */
        getVelocity() {
            // This could be isFloat(this.prev) && isFloat(this.current), but that would be wasteful
            return this.canTrackVelocity
                ? // These casts could be avoided if parseFloat would be typed better
                    velocityPerSecond(parseFloat(this.current) -
                        parseFloat(this.prev), this.timeDelta)
                : 0;
        }
        /**
         * Registers a new animation to control this `MotionValue`. Only one
         * animation can drive a `MotionValue` at one time.
         *
         * ```jsx
         * value.start()
         * ```
         *
         * @param animation - A function that starts the provided animation
         *
         * @internal
         */
        start(animation) {
            this.stop();
            return new Promise((resolve) => {
                this.hasAnimated = true;
                this.stopAnimation = animation(resolve);
                if (this.events.animationStart) {
                    this.events.animationStart.notify();
                }
            }).then(() => {
                if (this.events.animationComplete) {
                    this.events.animationComplete.notify();
                }
                this.clearAnimation();
            });
        }
        /**
         * Stop the currently active animation.
         *
         * @public
         */
        stop() {
            if (this.stopAnimation) {
                this.stopAnimation();
                if (this.events.animationCancel) {
                    this.events.animationCancel.notify();
                }
            }
            this.clearAnimation();
        }
        /**
         * Returns `true` if this value is currently animating.
         *
         * @public
         */
        isAnimating() {
            return !!this.stopAnimation;
        }
        clearAnimation() {
            this.stopAnimation = null;
        }
        /**
         * Destroy and clean up subscribers to this `MotionValue`.
         *
         * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
         * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
         * created a `MotionValue` via the `motionValue` function.
         *
         * @public
         */
        destroy() {
            this.clearListeners();
            this.stop();
        }
    }
    function motionValue(init, options) {
        return new MotionValue(init, options);
    }

    /**
     * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
     * but false if a number or multiple colors
     */
    const isColorString = (type, testProp) => (v) => {
        return Boolean((isString(v) && singleColorRegex.test(v) && v.startsWith(type)) ||
            (testProp && Object.prototype.hasOwnProperty.call(v, testProp)));
    };
    const splitColor = (aName, bName, cName) => (v) => {
        if (!isString(v))
            return v;
        const [a, b, c, alpha] = v.match(floatRegex);
        return {
            [aName]: parseFloat(a),
            [bName]: parseFloat(b),
            [cName]: parseFloat(c),
            alpha: alpha !== undefined ? parseFloat(alpha) : 1,
        };
    };

    const clampRgbUnit = (v) => clamp(0, 255, v);
    const rgbUnit = {
        ...number,
        transform: (v) => Math.round(clampRgbUnit(v)),
    };
    const rgba = {
        test: isColorString("rgb", "red"),
        parse: splitColor("red", "green", "blue"),
        transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" +
            rgbUnit.transform(red) +
            ", " +
            rgbUnit.transform(green) +
            ", " +
            rgbUnit.transform(blue) +
            ", " +
            sanitize(alpha.transform(alpha$1)) +
            ")",
    };

    function parseHex(v) {
        let r = "";
        let g = "";
        let b = "";
        let a = "";
        // If we have 6 characters, ie #FF0000
        if (v.length > 5) {
            r = v.substring(1, 3);
            g = v.substring(3, 5);
            b = v.substring(5, 7);
            a = v.substring(7, 9);
            // Or we have 3 characters, ie #F00
        }
        else {
            r = v.substring(1, 2);
            g = v.substring(2, 3);
            b = v.substring(3, 4);
            a = v.substring(4, 5);
            r += r;
            g += g;
            b += b;
            a += a;
        }
        return {
            red: parseInt(r, 16),
            green: parseInt(g, 16),
            blue: parseInt(b, 16),
            alpha: a ? parseInt(a, 16) / 255 : 1,
        };
    }
    const hex = {
        test: isColorString("#"),
        parse: parseHex,
        transform: rgba.transform,
    };

    const hsla = {
        test: isColorString("hsl", "hue"),
        parse: splitColor("hue", "saturation", "lightness"),
        transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
            return ("hsla(" +
                Math.round(hue) +
                ", " +
                percent.transform(sanitize(saturation)) +
                ", " +
                percent.transform(sanitize(lightness)) +
                ", " +
                sanitize(alpha.transform(alpha$1)) +
                ")");
        },
    };

    const color = {
        test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
        parse: (v) => {
            if (rgba.test(v)) {
                return rgba.parse(v);
            }
            else if (hsla.test(v)) {
                return hsla.parse(v);
            }
            else {
                return hex.parse(v);
            }
        },
        transform: (v) => {
            return isString(v)
                ? v
                : v.hasOwnProperty("red")
                    ? rgba.transform(v)
                    : hsla.transform(v);
        },
    };

    const colorToken = "${c}";
    const numberToken = "${n}";
    function test(v) {
        var _a, _b;
        return (isNaN(v) &&
            isString(v) &&
            (((_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) +
                (((_b = v.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) >
                0);
    }
    function analyseComplexValue(v) {
        if (typeof v === "number")
            v = `${v}`;
        const values = [];
        let numColors = 0;
        let numNumbers = 0;
        const colors = v.match(colorRegex);
        if (colors) {
            numColors = colors.length;
            // Strip colors from input so they're not picked up by number regex.
            // There's a better way to combine these regex searches, but its beyond my regex skills
            v = v.replace(colorRegex, colorToken);
            values.push(...colors.map(color.parse));
        }
        const numbers = v.match(floatRegex);
        if (numbers) {
            numNumbers = numbers.length;
            v = v.replace(floatRegex, numberToken);
            values.push(...numbers.map(number.parse));
        }
        return { values, numColors, numNumbers, tokenised: v };
    }
    function parse(v) {
        return analyseComplexValue(v).values;
    }
    function createTransformer(source) {
        const { values, numColors, tokenised } = analyseComplexValue(source);
        const numValues = values.length;
        return (v) => {
            let output = tokenised;
            for (let i = 0; i < numValues; i++) {
                output = output.replace(i < numColors ? colorToken : numberToken, i < numColors
                    ? color.transform(v[i])
                    : sanitize(v[i]));
            }
            return output;
        };
    }
    const convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
    function getAnimatableNone$1(v) {
        const parsed = parse(v);
        const transformer = createTransformer(v);
        return transformer(parsed.map(convertNumbersToZero));
    }
    const complex = { test, parse, createTransformer, getAnimatableNone: getAnimatableNone$1 };

    /**
     * Properties that should default to 1 or 100%
     */
    const maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
    function applyDefaultFilter(v) {
        const [name, value] = v.slice(0, -1).split("(");
        if (name === "drop-shadow")
            return v;
        const [number] = value.match(floatRegex) || [];
        if (!number)
            return v;
        const unit = value.replace(number, "");
        let defaultValue = maxDefaults.has(name) ? 1 : 0;
        if (number !== value)
            defaultValue *= 100;
        return name + "(" + defaultValue + unit + ")";
    }
    const functionRegex = /([a-z-]*)\(.*?\)/g;
    const filter = {
        ...complex,
        getAnimatableNone: (v) => {
            const functions = v.match(functionRegex);
            return functions ? functions.map(applyDefaultFilter).join(" ") : v;
        },
    };

    /**
     * A map of default value types for common values
     */
    const defaultValueTypes = {
        ...numberValueTypes,
        // Color props
        color,
        backgroundColor: color,
        outlineColor: color,
        fill: color,
        stroke: color,
        // Border props
        borderColor: color,
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color,
        filter,
        WebkitFilter: filter,
    };
    /**
     * Gets the default ValueType for the provided value key
     */
    const getDefaultValueType = (key) => defaultValueTypes[key];

    function getAnimatableNone(key, value) {
        var _a;
        let defaultValueType = getDefaultValueType(key);
        if (defaultValueType !== filter)
            defaultValueType = complex;
        // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
        return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
    }

    /**
     * Tests a provided value against a ValueType
     */
    const testValueType = (v) => (type) => type.test(v);

    /**
     * ValueType for "auto"
     */
    const auto = {
        test: (v) => v === "auto",
        parse: (v) => v,
    };

    /**
     * A list of value types commonly used for dimensions
     */
    const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
    /**
     * Tests a dimensional value against the list of dimension ValueTypes
     */
    const findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));

    /**
     * A list of all ValueTypes
     */
    const valueTypes = [...dimensionValueTypes, color, complex];
    /**
     * Tests a value against the list of ValueTypes
     */
    const findValueType = (v) => valueTypes.find(testValueType(v));

    /**
     * Creates an object containing the latest state of every MotionValue on a VisualElement
     */
    function getCurrent(visualElement) {
        const current = {};
        visualElement.values.forEach((value, key) => (current[key] = value.get()));
        return current;
    }
    /**
     * Creates an object containing the latest velocity of every MotionValue on a VisualElement
     */
    function getVelocity$1(visualElement) {
        const velocity = {};
        visualElement.values.forEach((value, key) => (velocity[key] = value.getVelocity()));
        return velocity;
    }
    function resolveVariant(visualElement, definition, custom) {
        const props = visualElement.getProps();
        return resolveVariantFromProps(props, definition, custom !== undefined ? custom : props.custom, getCurrent(visualElement), getVelocity$1(visualElement));
    }

    /**
     * Set VisualElement's MotionValue, creating a new MotionValue for it if
     * it doesn't exist.
     */
    function setMotionValue(visualElement, key, value) {
        if (visualElement.hasValue(key)) {
            visualElement.getValue(key).set(value);
        }
        else {
            visualElement.addValue(key, motionValue(value));
        }
    }
    function setTarget(visualElement, definition) {
        const resolved = resolveVariant(visualElement, definition);
        let { transitionEnd = {}, transition = {}, ...target } = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {};
        target = { ...target, ...transitionEnd };
        for (const key in target) {
            const value = resolveFinalValueInKeyframes(target[key]);
            setMotionValue(visualElement, key, value);
        }
    }
    function checkTargetForNewValues(visualElement, target, origin) {
        var _a, _b;
        const newValueKeys = Object.keys(target).filter((key) => !visualElement.hasValue(key));
        const numNewValues = newValueKeys.length;
        if (!numNewValues)
            return;
        for (let i = 0; i < numNewValues; i++) {
            const key = newValueKeys[i];
            const targetValue = target[key];
            let value = null;
            /**
             * If the target is a series of keyframes, we can use the first value
             * in the array. If this first value is null, we'll still need to read from the DOM.
             */
            if (Array.isArray(targetValue)) {
                value = targetValue[0];
            }
            /**
             * If the target isn't keyframes, or the first keyframe was null, we need to
             * first check if an origin value was explicitly defined in the transition as "from",
             * if not read the value from the DOM. As an absolute fallback, take the defined target value.
             */
            if (value === null) {
                value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
            }
            /**
             * If value is still undefined or null, ignore it. Preferably this would throw,
             * but this was causing issues in Framer.
             */
            if (value === undefined || value === null)
                continue;
            if (typeof value === "string" &&
                (isNumericalString(value) || isZeroValueString(value))) {
                // If this is a number read as a string, ie "0" or "200", convert it to a number
                value = parseFloat(value);
            }
            else if (!findValueType(value) && complex.test(targetValue)) {
                value = getAnimatableNone(key, targetValue);
            }
            visualElement.addValue(key, motionValue(value, { owner: visualElement }));
            if (origin[key] === undefined) {
                origin[key] = value;
            }
            if (value !== null)
                visualElement.setBaseTarget(key, value);
        }
    }
    function getOriginFromTransition(key, transition) {
        if (!transition)
            return;
        const valueTransition = transition[key] || transition["default"] || transition;
        return valueTransition.from;
    }
    function getOrigin(target, transition, visualElement) {
        var _a;
        const origin = {};
        for (const key in target) {
            const transitionOrigin = getOriginFromTransition(key, transition);
            origin[key] =
                transitionOrigin !== undefined
                    ? transitionOrigin
                    : (_a = visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.get();
        }
        return origin;
    }

    function isWillChangeMotionValue(value) {
        return Boolean(isMotionValue(value) && value.add);
    }

    const appearStoreId = (id, value) => `${id}: ${value}`;

    function handoffOptimizedAppearAnimation(id, name) {
        const { MotionAppearAnimations } = window;
        const animationId = appearStoreId(id, transformProps.has(name) ? "transform" : name);
        const animation = MotionAppearAnimations && MotionAppearAnimations.get(animationId);
        if (animation) {
            /**
             * We allow the animation to persist until the next frame:
             *   1. So it continues to play until Framer Motion is ready to render
             *      (avoiding a potential flash of the element's original state)
             *   2. As all independent transforms share a single transform animation, stopping
             *      it synchronously would prevent subsequent transforms from handing off.
             */
            sync.render(() => {
                /**
                 * Animation.cancel() throws so it needs to be wrapped in a try/catch
                 */
                try {
                    animation.cancel();
                    MotionAppearAnimations.delete(animationId);
                }
                catch (e) { }
            });
            return animation.currentTime || 0;
        }
        else {
            return 0;
        }
    }

    const optimizedAppearDataId = "framerAppearId";
    const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

    var warning = function () { };
    var invariant = function () { };

    /**
     * Converts seconds to milliseconds
     *
     * @param seconds - Time in seconds.
     * @return milliseconds - Converted time in milliseconds.
     */
    const secondsToMilliseconds = (seconds) => seconds * 1000;

    const instantAnimationState = {
        current: false,
    };

    // Accepts an easing function and returns a new one that outputs mirrored values for
    // the second half of the animation. Turns easeIn into easeInOut.
    const mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

    // Accepts an easing function and returns a new one that outputs reversed values.
    // Turns easeIn into easeOut.
    const reverseEasing = (easing) => (p) => 1 - easing(1 - p);

    const easeIn = (p) => p * p;
    const easeOut = reverseEasing(easeIn);
    const easeInOut = mirrorEasing(easeIn);

    /*
      Value in range from progress

      Given a lower limit and an upper limit, we return the value within
      that range as expressed by progress (usually a number from 0 to 1)

      So progress = 0.5 would change

      from -------- to

      to

      from ---- to

      E.g. from = 10, to = 20, progress = 0.5 => 15

      @param [number]: Lower limit of range
      @param [number]: Upper limit of range
      @param [number]: The progress between lower and upper limits expressed 0-1
      @return [number]: Value as calculated from progress within range (not limited within range)
    */
    const mix = (from, to, progress) => -progress * from + progress * to + from;

    // Adapted from https://gist.github.com/mjackson/5311256
    function hueToRgb(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    function hslaToRgba({ hue, saturation, lightness, alpha }) {
        hue /= 360;
        saturation /= 100;
        lightness /= 100;
        let red = 0;
        let green = 0;
        let blue = 0;
        if (!saturation) {
            red = green = blue = lightness;
        }
        else {
            const q = lightness < 0.5
                ? lightness * (1 + saturation)
                : lightness + saturation - lightness * saturation;
            const p = 2 * lightness - q;
            red = hueToRgb(p, q, hue + 1 / 3);
            green = hueToRgb(p, q, hue);
            blue = hueToRgb(p, q, hue - 1 / 3);
        }
        return {
            red: Math.round(red * 255),
            green: Math.round(green * 255),
            blue: Math.round(blue * 255),
            alpha,
        };
    }

    // Linear color space blending
    // Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
    // Demonstrated http://codepen.io/osublake/pen/xGVVaN
    const mixLinearColor = (from, to, v) => {
        const fromExpo = from * from;
        return Math.sqrt(Math.max(0, v * (to * to - fromExpo) + fromExpo));
    };
    const colorTypes = [hex, rgba, hsla];
    const getColorType = (v) => colorTypes.find((type) => type.test(v));
    function asRGBA(color) {
        const type = getColorType(color);
        let model = type.parse(color);
        if (type === hsla) {
            // TODO Remove this cast - needed since Framer Motion's stricter typing
            model = hslaToRgba(model);
        }
        return model;
    }
    const mixColor = (from, to) => {
        const fromRGBA = asRGBA(from);
        const toRGBA = asRGBA(to);
        const blended = { ...fromRGBA };
        return (v) => {
            blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
            blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
            blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
            blended.alpha = mix(fromRGBA.alpha, toRGBA.alpha, v);
            return rgba.transform(blended);
        };
    };

    function getMixer(origin, target) {
        if (typeof origin === "number") {
            return (v) => mix(origin, target, v);
        }
        else if (color.test(origin)) {
            return mixColor(origin, target);
        }
        else {
            return mixComplex(origin, target);
        }
    }
    const mixArray = (from, to) => {
        const output = [...from];
        const numValues = output.length;
        const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
        return (v) => {
            for (let i = 0; i < numValues; i++) {
                output[i] = blendValue[i](v);
            }
            return output;
        };
    };
    const mixObject = (origin, target) => {
        const output = { ...origin, ...target };
        const blendValue = {};
        for (const key in output) {
            if (origin[key] !== undefined && target[key] !== undefined) {
                blendValue[key] = getMixer(origin[key], target[key]);
            }
        }
        return (v) => {
            for (const key in blendValue) {
                output[key] = blendValue[key](v);
            }
            return output;
        };
    };
    const mixComplex = (origin, target) => {
        const template = complex.createTransformer(target);
        const originStats = analyseComplexValue(origin);
        const targetStats = analyseComplexValue(target);
        const canInterpolate = originStats.numColors === targetStats.numColors &&
            originStats.numNumbers >= targetStats.numNumbers;
        if (canInterpolate) {
            return pipe(mixArray(originStats.values, targetStats.values), template);
        }
        else {
            return (p) => `${p > 0 ? target : origin}`;
        }
    };

    /*
      Progress within given range

      Given a lower limit and an upper limit, we return the progress
      (expressed as a number 0-1) represented by the given value, and
      limit that progress to within 0-1.

      @param [number]: Lower limit
      @param [number]: Upper limit
      @param [number]: Value to find progress within given range
      @return [number]: Progress of value within range as expressed 0-1
    */
    const progress = (from, to, value) => {
        const toFromDifference = to - from;
        return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
    };

    const mixNumber = (from, to) => (p) => mix(from, to, p);
    function detectMixerFactory(v) {
        if (typeof v === "number") {
            return mixNumber;
        }
        else if (typeof v === "string") {
            if (color.test(v)) {
                return mixColor;
            }
            else {
                return mixComplex;
            }
        }
        else if (Array.isArray(v)) {
            return mixArray;
        }
        else if (typeof v === "object") {
            return mixObject;
        }
        return mixNumber;
    }
    function createMixers(output, ease, customMixer) {
        const mixers = [];
        const mixerFactory = customMixer || detectMixerFactory(output[0]);
        const numMixers = output.length - 1;
        for (let i = 0; i < numMixers; i++) {
            let mixer = mixerFactory(output[i], output[i + 1]);
            if (ease) {
                const easingFunction = Array.isArray(ease) ? ease[i] : ease;
                mixer = pipe(easingFunction, mixer);
            }
            mixers.push(mixer);
        }
        return mixers;
    }
    /**
     * Create a function that maps from a numerical input array to a generic output array.
     *
     * Accepts:
     *   - Numbers
     *   - Colors (hex, hsl, hsla, rgb, rgba)
     *   - Complex (combinations of one or more numbers or strings)
     *
     * ```jsx
     * const mixColor = interpolate([0, 1], ['#fff', '#000'])
     *
     * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
     * ```
     *
     * TODO Revist this approach once we've moved to data models for values,
     * probably not needed to pregenerate mixer functions.
     *
     * @public
     */
    function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
        const inputLength = input.length;
        invariant(inputLength === output.length);
        invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1);
        // If input runs highest -> lowest, reverse both arrays
        if (input[0] > input[inputLength - 1]) {
            input = [...input].reverse();
            output = [...output].reverse();
        }
        const mixers = createMixers(output, ease, mixer);
        const numMixers = mixers.length;
        const interpolator = (v) => {
            let i = 0;
            if (numMixers > 1) {
                for (; i < input.length - 2; i++) {
                    if (v < input[i + 1])
                        break;
                }
            }
            const progressInRange = progress(input[i], input[i + 1], v);
            return mixers[i](progressInRange);
        };
        return isClamp
            ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v))
            : interpolator;
    }

    const noop = (any) => any;

    /*
      Bezier function generator
      This has been modified from Gaëtan Renaudeau's BezierEasing
      https://github.com/gre/bezier-easing/blob/master/src/index.js
      https://github.com/gre/bezier-easing/blob/master/LICENSE
      
      I've removed the newtonRaphsonIterate algo because in benchmarking it
      wasn't noticiably faster than binarySubdivision, indeed removing it
      usually improved times, depending on the curve.
      I also removed the lookup table, as for the added bundle size and loop we're
      only cutting ~4 or so subdivision iterations. I bumped the max iterations up
      to 12 to compensate and this still tended to be faster for no perceivable
      loss in accuracy.
      Usage
        const easeOut = cubicBezier(.17,.67,.83,.67);
        const x = easeOut(0.5); // returns 0.627...
    */
    // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
    const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) *
        t;
    const subdivisionPrecision = 0.0000001;
    const subdivisionMaxIterations = 12;
    function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
        let currentX;
        let currentT;
        let i = 0;
        do {
            currentT = lowerBound + (upperBound - lowerBound) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - x;
            if (currentX > 0.0) {
                upperBound = currentT;
            }
            else {
                lowerBound = currentT;
            }
        } while (Math.abs(currentX) > subdivisionPrecision &&
            ++i < subdivisionMaxIterations);
        return currentT;
    }
    function cubicBezier(mX1, mY1, mX2, mY2) {
        // If this is a linear gradient, return linear easing
        if (mX1 === mY1 && mX2 === mY2)
            return noop;
        const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
        // If animation is at start/end, return t without easing
        return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
    }

    const circIn = (p) => 1 - Math.sin(Math.acos(p));
    const circOut = reverseEasing(circIn);
    const circInOut = mirrorEasing(circOut);

    const backOut = cubicBezier(0.33, 1.53, 0.69, 0.99);
    const backIn = reverseEasing(backOut);
    const backInOut = mirrorEasing(backIn);

    const anticipate = (p) => (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));

    const easingLookup = {
        linear: noop,
        easeIn,
        easeInOut,
        easeOut,
        circIn,
        circInOut,
        circOut,
        backIn,
        backInOut,
        backOut,
        anticipate,
    };
    const easingDefinitionToFunction = (definition) => {
        if (Array.isArray(definition)) {
            // If cubic bezier definition, create bezier curve
            invariant(definition.length === 4);
            const [x1, y1, x2, y2] = definition;
            return cubicBezier(x1, y1, x2, y2);
        }
        else if (typeof definition === "string") {
            return easingLookup[definition];
        }
        return definition;
    };
    const isEasingArray = (ease) => {
        return Array.isArray(ease) && typeof ease[0] !== "number";
    };

    function defaultEasing(values, easing) {
        return values.map(() => easing || easeInOut).splice(0, values.length - 1);
    }
    function defaultOffset(values) {
        const numValues = values.length;
        return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
    }
    function convertOffsetToTimes(offset, duration) {
        return offset.map((o) => o * duration);
    }
    function keyframes({ keyframes: keyframeValues, ease = easeInOut, times, duration = 300, }) {
        keyframeValues = [...keyframeValues];
        const origin = keyframes[0];
        /**
         * Easing functions can be externally defined as strings. Here we convert them
         * into actual functions.
         */
        const easingFunctions = isEasingArray(ease)
            ? ease.map(easingDefinitionToFunction)
            : easingDefinitionToFunction(ease);
        /**
         * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
         * to reduce GC during animation.
         */
        const state = { done: false, value: origin };
        /**
         * Create a times array based on the provided 0-1 offsets
         */
        const absoluteTimes = convertOffsetToTimes(
        // Only use the provided offsets if they're the correct length
        // TODO Maybe we should warn here if there's a length mismatch
        times && times.length === keyframes.length
            ? times
            : defaultOffset(keyframeValues), duration);
        function createInterpolator() {
            return interpolate(absoluteTimes, keyframeValues, {
                ease: Array.isArray(easingFunctions)
                    ? easingFunctions
                    : defaultEasing(keyframeValues, easingFunctions),
            });
        }
        let interpolator = createInterpolator();
        return {
            next: (t) => {
                state.value = interpolator(t);
                state.done = t >= duration;
                return state;
            },
            flipTarget: () => {
                keyframeValues.reverse();
                interpolator = createInterpolator();
            },
        };
    }

    const safeMin = 0.001;
    const minDuration = 0.01;
    const maxDuration = 10.0;
    const minDamping = 0.05;
    const maxDamping = 1;
    function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1, }) {
        let envelope;
        let derivative;
        warning(duration <= maxDuration * 1000);
        let dampingRatio = 1 - bounce;
        /**
         * Restrict dampingRatio and duration to within acceptable ranges.
         */
        dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
        duration = clamp(minDuration, maxDuration, duration / 1000);
        if (dampingRatio < 1) {
            /**
             * Underdamped spring
             */
            envelope = (undampedFreq) => {
                const exponentialDecay = undampedFreq * dampingRatio;
                const delta = exponentialDecay * duration;
                const a = exponentialDecay - velocity;
                const b = calcAngularFreq(undampedFreq, dampingRatio);
                const c = Math.exp(-delta);
                return safeMin - (a / b) * c;
            };
            derivative = (undampedFreq) => {
                const exponentialDecay = undampedFreq * dampingRatio;
                const delta = exponentialDecay * duration;
                const d = delta * velocity + velocity;
                const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
                const f = Math.exp(-delta);
                const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
                const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
                return (factor * ((d - e) * f)) / g;
            };
        }
        else {
            /**
             * Critically-damped spring
             */
            envelope = (undampedFreq) => {
                const a = Math.exp(-undampedFreq * duration);
                const b = (undampedFreq - velocity) * duration + 1;
                return -safeMin + a * b;
            };
            derivative = (undampedFreq) => {
                const a = Math.exp(-undampedFreq * duration);
                const b = (velocity - undampedFreq) * (duration * duration);
                return a * b;
            };
        }
        const initialGuess = 5 / duration;
        const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
        duration = duration * 1000;
        if (isNaN(undampedFreq)) {
            return {
                stiffness: 100,
                damping: 10,
                duration,
            };
        }
        else {
            const stiffness = Math.pow(undampedFreq, 2) * mass;
            return {
                stiffness,
                damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
                duration,
            };
        }
    }
    const rootIterations = 12;
    function approximateRoot(envelope, derivative, initialGuess) {
        let result = initialGuess;
        for (let i = 1; i < rootIterations; i++) {
            result = result - envelope(result) / derivative(result);
        }
        return result;
    }
    function calcAngularFreq(undampedFreq, dampingRatio) {
        return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
    }

    const durationKeys = ["duration", "bounce"];
    const physicsKeys = ["stiffness", "damping", "mass"];
    function isSpringType(options, keys) {
        return keys.some((key) => options[key] !== undefined);
    }
    function getSpringOptions(options) {
        let springOptions = {
            velocity: 0.0,
            stiffness: 100,
            damping: 10,
            mass: 1.0,
            isResolvedFromDuration: false,
            ...options,
        };
        // stiffness/damping/mass overrides duration/bounce
        if (!isSpringType(options, physicsKeys) &&
            isSpringType(options, durationKeys)) {
            const derived = findSpring(options);
            springOptions = {
                ...springOptions,
                ...derived,
                velocity: 0.0,
                mass: 1.0,
            };
            springOptions.isResolvedFromDuration = true;
        }
        return springOptions;
    }
    const velocitySampleDuration = 5;
    /**
     * This is based on the spring implementation of Wobble https://github.com/skevy/wobble
     */
    function spring({ keyframes, restSpeed = 2, restDelta = 0.01, ...options }) {
        let origin = keyframes[0];
        let target = keyframes[keyframes.length - 1];
        /**
         * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
         * to reduce GC during animation.
         */
        const state = { done: false, value: origin };
        const { stiffness, damping, mass, velocity, duration, isResolvedFromDuration, } = getSpringOptions(options);
        let resolveSpring = zero;
        let initialVelocity = velocity ? -(velocity / 1000) : 0.0;
        const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
        function createSpring() {
            const initialDelta = target - origin;
            const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
            /**
             * If we're working within what looks like a 0-1 range, change the default restDelta
             * to 0.01
             */
            if (restDelta === undefined) {
                restDelta = Math.min(Math.abs(target - origin) / 100, 0.4);
            }
            if (dampingRatio < 1) {
                const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
                // Underdamped spring
                resolveSpring = (t) => {
                    const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                    return (target -
                        envelope *
                            (((initialVelocity +
                                dampingRatio * undampedAngularFreq * initialDelta) /
                                angularFreq) *
                                Math.sin(angularFreq * t) +
                                initialDelta * Math.cos(angularFreq * t)));
                };
            }
            else if (dampingRatio === 1) {
                // Critically damped spring
                resolveSpring = (t) => target -
                    Math.exp(-undampedAngularFreq * t) *
                        (initialDelta +
                            (initialVelocity + undampedAngularFreq * initialDelta) *
                                t);
            }
            else {
                // Overdamped spring
                const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
                resolveSpring = (t) => {
                    const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                    // When performing sinh or cosh values can hit Infinity so we cap them here
                    const freqForT = Math.min(dampedAngularFreq * t, 300);
                    return (target -
                        (envelope *
                            ((initialVelocity +
                                dampingRatio * undampedAngularFreq * initialDelta) *
                                Math.sinh(freqForT) +
                                dampedAngularFreq *
                                    initialDelta *
                                    Math.cosh(freqForT))) /
                            dampedAngularFreq);
                };
            }
        }
        createSpring();
        return {
            next: (t) => {
                const current = resolveSpring(t);
                if (!isResolvedFromDuration) {
                    let currentVelocity = initialVelocity;
                    if (t !== 0) {
                        /**
                         * We only need to calculate velocity for under-damped springs
                         * as over- and critically-damped springs can't overshoot, so
                         * checking only for displacement is enough.
                         */
                        if (dampingRatio < 1) {
                            const prevT = Math.max(0, t - velocitySampleDuration);
                            currentVelocity = velocityPerSecond(current - resolveSpring(prevT), t - prevT);
                        }
                        else {
                            currentVelocity = 0;
                        }
                    }
                    const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                    const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
                    state.done =
                        isBelowVelocityThreshold && isBelowDisplacementThreshold;
                }
                else {
                    state.done = t >= duration;
                }
                state.value = state.done ? target : current;
                return state;
            },
            flipTarget: () => {
                initialVelocity = -initialVelocity;
                [origin, target] = [target, origin];
                createSpring();
            },
        };
    }
    spring.needsInterpolation = (a, b) => typeof a === "string" || typeof b === "string";
    const zero = (_t) => 0;

    function decay({ 
    /**
     * The decay animation dynamically calculates an end of the animation
     * based on the initial keyframe, so we only need to define a single keyframe
     * as default.
     */
    keyframes = [0], velocity = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget, }) {
        const origin = keyframes[0];
        /**
         * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
         * to reduce GC during animation.
         */
        const state = { done: false, value: origin };
        let amplitude = power * velocity;
        const ideal = origin + amplitude;
        const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
        /**
         * If the target has changed we need to re-calculate the amplitude, otherwise
         * the animation will start from the wrong position.
         */
        if (target !== ideal)
            amplitude = target - origin;
        return {
            next: (t) => {
                const delta = -amplitude * Math.exp(-t / timeConstant);
                state.done = !(delta > restDelta || delta < -restDelta);
                state.value = state.done ? target : target + delta;
                return state;
            },
            flipTarget: () => { },
        };
    }

    const types = {
        decay,
        keyframes: keyframes,
        tween: keyframes,
        spring,
    };
    function loopElapsed(elapsed, duration, delay = 0) {
        return elapsed - duration - delay;
    }
    function reverseElapsed(elapsed, duration = 0, delay = 0, isForwardPlayback = true) {
        return isForwardPlayback
            ? loopElapsed(duration + -elapsed, duration, delay)
            : duration - (elapsed - duration) + delay;
    }
    function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
        return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
    }
    const framesync = (update) => {
        const passTimestamp = ({ delta }) => update(delta);
        return {
            start: () => sync.update(passTimestamp, true),
            stop: () => cancelSync.update(passTimestamp),
        };
    };
    function animate$1({ duration, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, keyframes, autoplay = true, onPlay, onStop, onComplete, onRepeat, onUpdate, type = "keyframes", ...options }) {
        var _a, _b;
        let driverControls;
        let repeatCount = 0;
        let computedDuration = duration;
        let latest;
        let isComplete = false;
        let isForwardPlayback = true;
        let interpolateFromNumber;
        const animator = types[keyframes.length > 2 ? "keyframes" : type];
        const origin = keyframes[0];
        const target = keyframes[keyframes.length - 1];
        if ((_b = (_a = animator).needsInterpolation) === null || _b === void 0 ? void 0 : _b.call(_a, origin, target)) {
            interpolateFromNumber = interpolate([0, 100], [origin, target], {
                clamp: false,
            });
            keyframes = [0, 100];
        }
        const animation = animator({
            ...options,
            duration,
            keyframes,
        });
        function repeat() {
            repeatCount++;
            if (repeatType === "reverse") {
                isForwardPlayback = repeatCount % 2 === 0;
                elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
            }
            else {
                elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
                if (repeatType === "mirror")
                    animation.flipTarget();
            }
            isComplete = false;
            onRepeat && onRepeat();
        }
        function complete() {
            driverControls.stop();
            onComplete && onComplete();
        }
        function update(delta) {
            if (!isForwardPlayback)
                delta = -delta;
            elapsed += delta;
            if (!isComplete) {
                const state = animation.next(Math.max(0, elapsed));
                latest = state.value;
                if (interpolateFromNumber)
                    latest = interpolateFromNumber(latest);
                isComplete = isForwardPlayback ? state.done : elapsed <= 0;
            }
            onUpdate && onUpdate(latest);
            if (isComplete) {
                if (repeatCount === 0) {
                    computedDuration =
                        computedDuration !== undefined ? computedDuration : elapsed;
                }
                if (repeatCount < repeatMax) {
                    hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
                }
                else {
                    complete();
                }
            }
        }
        function play() {
            onPlay && onPlay();
            driverControls = driver(update);
            driverControls.start();
        }
        autoplay && play();
        return {
            stop: () => {
                onStop && onStop();
                driverControls.stop();
            },
            sample: (t) => {
                return animation.next(Math.max(0, t));
            },
        };
    }

    function isWaapiSupportedEasing(easing) {
        return (!easing || // Default easing
            Array.isArray(easing) || // Bezier curve
            (typeof easing === "string" && supportedWaapiEasing[easing]));
    }
    const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
    const supportedWaapiEasing = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: cubicBezierAsString([0, 0.65, 0.55, 1]),
        circOut: cubicBezierAsString([0.55, 0, 1, 0.45]),
        backIn: cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
        backOut: cubicBezierAsString([0.33, 1.53, 0.69, 0.99]),
    };
    function mapEasingToNativeEasing(easing) {
        if (!easing)
            return undefined;
        return Array.isArray(easing)
            ? cubicBezierAsString(easing)
            : supportedWaapiEasing[easing];
    }

    function animateStyle(element, valueName, keyframes, { delay = 0, duration, repeat = 0, repeatType = "loop", ease, times, } = {}) {
        return element.animate({ [valueName]: keyframes, offset: times }, {
            delay,
            duration,
            easing: mapEasingToNativeEasing(ease),
            fill: "both",
            iterations: repeat + 1,
            direction: repeatType === "reverse" ? "alternate" : "normal",
        });
    }

    /**
     * 10ms is chosen here as it strikes a balance between smooth
     * results (more than one keyframe per frame at 60fps) and
     * keyframe quantity.
     */
    const sampleDelta = 10; //ms
    function createAcceleratedAnimation(value, valueName, { onUpdate, onComplete, ...options }) {
        let { keyframes, duration = 0.3, elapsed = 0, ease } = options;
        /**
         * If this animation needs pre-generated keyframes then generate.
         */
        if (options.type === "spring" || !isWaapiSupportedEasing(options.ease)) {
            const sampleAnimation = animate$1(options);
            let state = { done: false, value: keyframes[0] };
            const pregeneratedKeyframes = [];
            let t = 0;
            while (!state.done) {
                state = sampleAnimation.sample(t);
                pregeneratedKeyframes.push(state.value);
                t += sampleDelta;
            }
            keyframes = pregeneratedKeyframes;
            duration = t - sampleDelta;
            ease = "linear";
        }
        const animation = animateStyle(value.owner.current, valueName, keyframes, {
            ...options,
            delay: -elapsed,
            duration,
            /**
             * This function is currently not called if ease is provided
             * as a function so the cast is safe.
             *
             * However it would be possible for a future refinement to port
             * in easing pregeneration from Motion One for browsers that
             * support the upcoming `linear()` easing function.
             */
            ease: ease,
        });
        /**
         * Prefer the `onfinish` prop as it's more widely supported than
         * the `finished` promise.
         *
         * Here, we synchronously set the provided MotionValue to the end
         * keyframe. If we didn't, when the WAAPI animation is finished it would
         * be removed from the element which would then revert to its old styles.
         */
        animation.onfinish = () => {
            value.set(keyframes[keyframes.length - 1]);
            onComplete && onComplete();
        };
        /**
         * Animation interrupt callback.
         */
        return () => {
            /**
             * WAAPI doesn't natively have any interruption capabilities.
             *
             * Rather than read commited styles back out of the DOM, we can
             * create a renderless JS animation and sample it twice to calculate
             * its current value, "previous" value, and therefore allow
             * Motion to calculate velocity for any subsequent animation.
             */
            const { currentTime } = animation;
            if (currentTime) {
                const sampleAnimation = animate$1(options);
                value.setWithVelocity(sampleAnimation.sample(currentTime - sampleDelta).value, sampleAnimation.sample(currentTime).value, sampleDelta);
            }
            sync.update(() => animation.cancel());
        };
    }

    /**
     * Timeout defined in ms
     */
    function delay(callback, timeout) {
        const start = performance.now();
        const checkElapsed = ({ timestamp }) => {
            const elapsed = timestamp - start;
            if (elapsed >= timeout) {
                cancelSync.read(checkElapsed);
                callback(elapsed - timeout);
            }
        };
        sync.read(checkElapsed, true);
        return () => cancelSync.read(checkElapsed);
    }

    function createInstantAnimation({ keyframes, elapsed, onUpdate, onComplete, }) {
        const setValue = () => {
            onUpdate && onUpdate(keyframes[keyframes.length - 1]);
            onComplete && onComplete();
            return () => { };
        };
        return elapsed ? delay(setValue, -elapsed) : setValue();
    }

    function inertia({ keyframes, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop, }) {
        const origin = keyframes[0];
        let currentAnimation;
        function isOutOfBounds(v) {
            return (min !== undefined && v < min) || (max !== undefined && v > max);
        }
        function findNearestBoundary(v) {
            if (min === undefined)
                return max;
            if (max === undefined)
                return min;
            return Math.abs(min - v) < Math.abs(max - v) ? min : max;
        }
        function startAnimation(options) {
            currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
            currentAnimation = animate$1({
                keyframes: [0, 1],
                velocity: 0,
                ...options,
                driver,
                onUpdate: (v) => {
                    var _a;
                    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
                    (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
                },
                onComplete,
                onStop,
            });
        }
        function startSpring(options) {
            startAnimation({
                type: "spring",
                stiffness: bounceStiffness,
                damping: bounceDamping,
                restDelta,
                ...options,
            });
        }
        if (isOutOfBounds(origin)) {
            // Start the animation with spring if outside the defined boundaries
            startSpring({
                velocity,
                keyframes: [origin, findNearestBoundary(origin)],
            });
        }
        else {
            /**
             * Or if the value is out of bounds, simulate the inertia movement
             * with the decay animation.
             *
             * Pre-calculate the target so we can detect if it's out-of-bounds.
             * If it is, we want to check per frame when to switch to a spring
             * animation
             */
            let target = power * velocity + origin;
            if (typeof modifyTarget !== "undefined")
                target = modifyTarget(target);
            const boundary = findNearestBoundary(target);
            const heading = boundary === min ? -1 : 1;
            let prev;
            let current;
            const checkBoundary = (v) => {
                prev = current;
                current = v;
                velocity = velocityPerSecond(v - prev, frameData.delta);
                if ((heading === 1 && v > boundary) ||
                    (heading === -1 && v < boundary)) {
                    startSpring({ keyframes: [v, boundary], velocity });
                }
            };
            startAnimation({
                type: "decay",
                keyframes: [origin, 0],
                velocity,
                timeConstant,
                power,
                restDelta,
                modifyTarget,
                onUpdate: isOutOfBounds(target) ? checkBoundary : undefined,
            });
        }
        return {
            stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop(),
        };
    }

    const underDampedSpring = () => ({
        type: "spring",
        stiffness: 500,
        damping: 25,
        restSpeed: 10,
    });
    const criticallyDampedSpring = (target) => ({
        type: "spring",
        stiffness: 550,
        damping: target === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10,
    });
    const linearTween = () => ({
        type: "keyframes",
        ease: "linear",
        duration: 0.3,
    });
    const keyframesTransition = {
        type: "keyframes",
        duration: 0.8,
    };
    const defaultTransitions = {
        x: underDampedSpring,
        y: underDampedSpring,
        z: underDampedSpring,
        rotate: underDampedSpring,
        rotateX: underDampedSpring,
        rotateY: underDampedSpring,
        rotateZ: underDampedSpring,
        scaleX: criticallyDampedSpring,
        scaleY: criticallyDampedSpring,
        scale: criticallyDampedSpring,
        opacity: linearTween,
        backgroundColor: linearTween,
        color: linearTween,
        default: criticallyDampedSpring,
    };
    const getDefaultTransition = (valueKey, { keyframes }) => {
        if (keyframes.length > 2) {
            return keyframesTransition;
        }
        else {
            const factory = defaultTransitions[valueKey] || defaultTransitions.default;
            return factory(keyframes[1]);
        }
    };

    /**
     * Check if a value is animatable. Examples:
     *
     * ✅: 100, "100px", "#fff"
     * ❌: "block", "url(2.jpg)"
     * @param value
     *
     * @internal
     */
    const isAnimatable = (key, value) => {
        // If the list of keys tat might be non-animatable grows, replace with Set
        if (key === "zIndex")
            return false;
        // If it's a number or a keyframes array, we can animate it. We might at some point
        // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
        // but for now lets leave it like this for performance reasons
        if (typeof value === "number" || Array.isArray(value))
            return true;
        if (typeof value === "string" && // It's animatable if we have a string
            complex.test(value) && // And it contains numbers and/or colors
            !value.startsWith("url(") // Unless it starts with "url("
        ) {
            return true;
        }
        return false;
    };

    /**
     * Decide whether a transition is defined on a given Transition.
     * This filters out orchestration options and returns true
     * if any options are left.
     */
    function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, ...transition }) {
        return !!Object.keys(transition).length;
    }
    function isZero(value) {
        return (value === 0 ||
            (typeof value === "string" &&
                parseFloat(value) === 0 &&
                value.indexOf(" ") === -1));
    }
    function getZeroUnit(potentialUnitType) {
        return typeof potentialUnitType === "number"
            ? 0
            : getAnimatableNone("", potentialUnitType);
    }
    function getValueTransition(transition, key) {
        return transition[key] || transition["default"] || transition;
    }

    function getKeyframes(value, valueName, target, transition) {
        const isTargetAnimatable = isAnimatable(valueName, target);
        let origin = transition.from !== undefined ? transition.from : value.get();
        if (origin === "none" && isTargetAnimatable && typeof target === "string") {
            /**
             * If we're trying to animate from "none", try and get an animatable version
             * of the target. This could be improved to work both ways.
             */
            origin = getAnimatableNone(valueName, target);
        }
        else if (isZero(origin) && typeof target === "string") {
            origin = getZeroUnit(target);
        }
        else if (!Array.isArray(target) &&
            isZero(target) &&
            typeof origin === "string") {
            target = getZeroUnit(origin);
        }
        /**
         * If the target has been defined as a series of keyframes
         */
        if (Array.isArray(target)) {
            /**
             * Ensure an initial wildcard keyframe is hydrated by the origin.
             * TODO: Support extra wildcard keyframes i.e [1, null, 0]
             */
            if (target[0] === null) {
                target[0] = origin;
            }
            return target;
        }
        else {
            return [origin, target];
        }
    }

    const featureTests = {
        waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
    };
    const results = {};
    const supports = {};
    /**
     * Generate features tests that cache their results.
     */
    for (const key in featureTests) {
        supports[key] = () => {
            if (results[key] === undefined)
                results[key] = featureTests[key]();
            return results[key];
        };
    }

    /**
     * A list of values that can be hardware-accelerated.
     */
    const acceleratedValues = new Set(["opacity"]);
    const createMotionValueAnimation = (valueName, value, target, transition = {}) => {
        return (onComplete) => {
            const valueTransition = getValueTransition(transition, valueName) || {};
            /**
             * Most transition values are currently completely overwritten by value-specific
             * transitions. In the future it'd be nicer to blend these transitions. But for now
             * delay actually does inherit from the root transition if not value-specific.
             */
            const delay = valueTransition.delay || transition.delay || 0;
            /**
             * Elapsed isn't a public transition option but can be passed through from
             * optimized appear effects in milliseconds.
             */
            let { elapsed = 0 } = transition;
            elapsed = elapsed - secondsToMilliseconds(delay);
            const keyframes = getKeyframes(value, valueName, target, valueTransition);
            /**
             * Check if we're able to animate between the start and end keyframes,
             * and throw a warning if we're attempting to animate between one that's
             * animatable and another that isn't.
             */
            const originKeyframe = keyframes[0];
            const targetKeyframe = keyframes[keyframes.length - 1];
            const isOriginAnimatable = isAnimatable(valueName, originKeyframe);
            const isTargetAnimatable = isAnimatable(valueName, targetKeyframe);
            let options = {
                keyframes,
                velocity: value.getVelocity(),
                ...valueTransition,
                elapsed,
                onUpdate: (v) => {
                    value.set(v);
                    valueTransition.onUpdate && valueTransition.onUpdate(v);
                },
                onComplete: () => {
                    onComplete();
                    valueTransition.onComplete && valueTransition.onComplete();
                },
            };
            if (!isOriginAnimatable ||
                !isTargetAnimatable ||
                instantAnimationState.current ||
                valueTransition.type === false) {
                /**
                 * If we can't animate this value, or the global instant animation flag is set,
                 * or this is simply defined as an instant transition, return an instant transition.
                 */
                return createInstantAnimation(options);
            }
            else if (valueTransition.type === "inertia") {
                /**
                 * If this is an inertia animation, we currently don't support pre-generating
                 * keyframes for this as such it must always run on the main thread.
                 */
                const animation = inertia(options);
                return () => animation.stop();
            }
            /**
             * If there's no transition defined for this value, we can generate
             * unqiue transition settings for this value.
             */
            if (!isTransitionDefined(valueTransition)) {
                options = {
                    ...options,
                    ...getDefaultTransition(valueName, options),
                };
            }
            /**
             * Both WAAPI and our internal animation functions use durations
             * as defined by milliseconds, while our external API defines them
             * as seconds.
             */
            if (options.duration) {
                options.duration = secondsToMilliseconds(options.duration);
            }
            if (options.repeatDelay) {
                options.repeatDelay = secondsToMilliseconds(options.repeatDelay);
            }
            const visualElement = value.owner;
            const element = visualElement && visualElement.current;
            const canAccelerateAnimation = supports.waapi() &&
                acceleratedValues.has(valueName) &&
                !options.repeatDelay &&
                options.repeatType !== "mirror" &&
                options.damping !== 0 &&
                visualElement &&
                element instanceof HTMLElement &&
                !visualElement.getProps().onUpdate;
            if (canAccelerateAnimation) {
                /**
                 * If this animation is capable of being run via WAAPI, then do so.
                 */
                return createAcceleratedAnimation(value, valueName, options);
            }
            else {
                /**
                 * Otherwise, fall back to the main thread.
                 */
                const animation = animate$1(options);
                return () => animation.stop();
            }
        };
    };

    function animateVisualElement(visualElement, definition, options = {}) {
        visualElement.notify("AnimationStart", definition);
        let animation;
        if (Array.isArray(definition)) {
            const animations = definition.map((variant) => animateVariant(visualElement, variant, options));
            animation = Promise.all(animations);
        }
        else if (typeof definition === "string") {
            animation = animateVariant(visualElement, definition, options);
        }
        else {
            const resolvedDefinition = typeof definition === "function"
                ? resolveVariant(visualElement, definition, options.custom)
                : definition;
            animation = animateTarget(visualElement, resolvedDefinition, options);
        }
        return animation.then(() => visualElement.notify("AnimationComplete", definition));
    }
    function animateVariant(visualElement, variant, options = {}) {
        var _a;
        const resolved = resolveVariant(visualElement, variant, options.custom);
        let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
        if (options.transitionOverride) {
            transition = options.transitionOverride;
        }
        /**
         * If we have a variant, create a callback that runs it as an animation.
         * Otherwise, we resolve a Promise immediately for a composable no-op.
         */
        const getAnimation = resolved
            ? () => animateTarget(visualElement, resolved, options)
            : () => Promise.resolve();
        /**
         * If we have children, create a callback that runs all their animations.
         * Otherwise, we resolve a Promise immediately for a composable no-op.
         */
        const getChildAnimations = ((_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.size)
            ? (forwardDelay = 0) => {
                const { delayChildren = 0, staggerChildren, staggerDirection, } = transition;
                return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
            }
            : () => Promise.resolve();
        /**
         * If the transition explicitly defines a "when" option, we need to resolve either
         * this animation or all children animations before playing the other.
         */
        const { when } = transition;
        if (when) {
            const [first, last] = when === "beforeChildren"
                ? [getAnimation, getChildAnimations]
                : [getChildAnimations, getAnimation];
            return first().then(last);
        }
        else {
            return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
        }
    }
    /**
     * @internal
     */
    function animateTarget(visualElement, definition, { delay = 0, transitionOverride, type } = {}) {
        var _a;
        let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = visualElement.makeTargetAnimatable(definition);
        const willChange = visualElement.getValue("willChange");
        if (transitionOverride)
            transition = transitionOverride;
        const animations = [];
        const animationTypeState = type && ((_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.getState()[type]);
        for (const key in target) {
            const value = visualElement.getValue(key);
            const valueTarget = target[key];
            if (!value ||
                valueTarget === undefined ||
                (animationTypeState &&
                    shouldBlockAnimation(animationTypeState, key))) {
                continue;
            }
            let valueTransition = { delay, elapsed: 0, ...transition };
            /**
             * Make animation instant if this is a transform prop and we should reduce motion.
             */
            if (visualElement.shouldReduceMotion && transformProps.has(key)) {
                valueTransition = {
                    ...valueTransition,
                    type: false,
                    delay: 0,
                };
            }
            /**
             * If this is the first time a value is being animated, check
             * to see if we're handling off from an existing animation.
             */
            if (!value.hasAnimated) {
                const appearId = visualElement.getProps()[optimizedAppearDataAttribute];
                if (appearId) {
                    valueTransition.elapsed = handoffOptimizedAppearAnimation(appearId, key);
                }
            }
            let animation = value.start(createMotionValueAnimation(key, value, valueTarget, valueTransition));
            if (isWillChangeMotionValue(willChange)) {
                willChange.add(key);
                animation = animation.then(() => willChange.remove(key));
            }
            animations.push(animation);
        }
        return Promise.all(animations).then(() => {
            transitionEnd && setTarget(visualElement, transitionEnd);
        });
    }
    function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
        const animations = [];
        const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
        const generateStaggerDuration = staggerDirection === 1
            ? (i = 0) => i * staggerChildren
            : (i = 0) => maxStaggerDuration - i * staggerChildren;
        Array.from(visualElement.variantChildren)
            .sort(sortByTreeOrder)
            .forEach((child, i) => {
            animations.push(animateVariant(child, variant, {
                ...options,
                delay: delayChildren + generateStaggerDuration(i),
            }).then(() => child.notify("AnimationComplete", variant)));
        });
        return Promise.all(animations);
    }
    function sortByTreeOrder(a, b) {
        return a.sortNodePosition(b);
    }
    /**
     * Decide whether we should block this animation. Previously, we achieved this
     * just by checking whether the key was listed in protectedKeys, but this
     * posed problems if an animation was triggered by afterChildren and protectedKeys
     * had been set to true in the meantime.
     */
    function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
        const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
        needsAnimating[key] = false;
        return shouldBlock;
    }

    const variantPriorityOrder = [
        AnimationType.Animate,
        AnimationType.InView,
        AnimationType.Focus,
        AnimationType.Hover,
        AnimationType.Tap,
        AnimationType.Drag,
        AnimationType.Exit,
    ];
    const reversePriorityOrder = [...variantPriorityOrder].reverse();
    const numAnimationTypes = variantPriorityOrder.length;
    function animateList(visualElement) {
        return (animations) => Promise.all(animations.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
    }
    function createAnimationState(visualElement) {
        let animate = animateList(visualElement);
        const state = createState();
        let isInitialRender = true;
        /**
         * This function will be used to reduce the animation definitions for
         * each active animation type into an object of resolved values for it.
         */
        const buildResolvedTypeValues = (acc, definition) => {
            const resolved = resolveVariant(visualElement, definition);
            if (resolved) {
                const { transition, transitionEnd, ...target } = resolved;
                acc = { ...acc, ...target, ...transitionEnd };
            }
            return acc;
        };
        /**
         * This just allows us to inject mocked animation functions
         * @internal
         */
        function setAnimateFunction(makeAnimator) {
            animate = makeAnimator(visualElement);
        }
        /**
         * When we receive new props, we need to:
         * 1. Create a list of protected keys for each type. This is a directory of
         *    value keys that are currently being "handled" by types of a higher priority
         *    so that whenever an animation is played of a given type, these values are
         *    protected from being animated.
         * 2. Determine if an animation type needs animating.
         * 3. Determine if any values have been removed from a type and figure out
         *    what to animate those to.
         */
        function animateChanges(options, changedActiveType) {
            const props = visualElement.getProps();
            const context = visualElement.getVariantContext(true) || {};
            /**
             * A list of animations that we'll build into as we iterate through the animation
             * types. This will get executed at the end of the function.
             */
            const animations = [];
            /**
             * Keep track of which values have been removed. Then, as we hit lower priority
             * animation types, we can check if they contain removed values and animate to that.
             */
            const removedKeys = new Set();
            /**
             * A dictionary of all encountered keys. This is an object to let us build into and
             * copy it without iteration. Each time we hit an animation type we set its protected
             * keys - the keys its not allowed to animate - to the latest version of this object.
             */
            let encounteredKeys = {};
            /**
             * If a variant has been removed at a given index, and this component is controlling
             * variant animations, we want to ensure lower-priority variants are forced to animate.
             */
            let removedVariantIndex = Infinity;
            /**
             * Iterate through all animation types in reverse priority order. For each, we want to
             * detect which values it's handling and whether or not they've changed (and therefore
             * need to be animated). If any values have been removed, we want to detect those in
             * lower priority props and flag for animation.
             */
            for (let i = 0; i < numAnimationTypes; i++) {
                const type = reversePriorityOrder[i];
                const typeState = state[type];
                const prop = props[type] !== undefined ? props[type] : context[type];
                const propIsVariant = isVariantLabel(prop);
                /**
                 * If this type has *just* changed isActive status, set activeDelta
                 * to that status. Otherwise set to null.
                 */
                const activeDelta = type === changedActiveType ? typeState.isActive : null;
                if (activeDelta === false)
                    removedVariantIndex = i;
                /**
                 * If this prop is an inherited variant, rather than been set directly on the
                 * component itself, we want to make sure we allow the parent to trigger animations.
                 *
                 * TODO: Can probably change this to a !isControllingVariants check
                 */
                let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
                /**
                 *
                 */
                if (isInherited &&
                    isInitialRender &&
                    visualElement.manuallyAnimateOnMount) {
                    isInherited = false;
                }
                /**
                 * Set all encountered keys so far as the protected keys for this type. This will
                 * be any key that has been animated or otherwise handled by active, higher-priortiy types.
                 */
                typeState.protectedKeys = { ...encounteredKeys };
                // Check if we can skip analysing this prop early
                if (
                // If it isn't active and hasn't *just* been set as inactive
                (!typeState.isActive && activeDelta === null) ||
                    // If we didn't and don't have any defined prop for this animation type
                    (!prop && !typeState.prevProp) ||
                    // Or if the prop doesn't define an animation
                    isAnimationControls(prop) ||
                    typeof prop === "boolean") {
                    continue;
                }
                /**
                 * As we go look through the values defined on this type, if we detect
                 * a changed value or a value that was removed in a higher priority, we set
                 * this to true and add this prop to the animation list.
                 */
                const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
                let shouldAnimateType = variantDidChange ||
                    // If we're making this variant active, we want to always make it active
                    (type === changedActiveType &&
                        typeState.isActive &&
                        !isInherited &&
                        propIsVariant) ||
                    // If we removed a higher-priority variant (i is in reverse order)
                    (i > removedVariantIndex && propIsVariant);
                /**
                 * As animations can be set as variant lists, variants or target objects, we
                 * coerce everything to an array if it isn't one already
                 */
                const definitionList = Array.isArray(prop) ? prop : [prop];
                /**
                 * Build an object of all the resolved values. We'll use this in the subsequent
                 * animateChanges calls to determine whether a value has changed.
                 */
                let resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
                if (activeDelta === false)
                    resolvedValues = {};
                /**
                 * Now we need to loop through all the keys in the prev prop and this prop,
                 * and decide:
                 * 1. If the value has changed, and needs animating
                 * 2. If it has been removed, and needs adding to the removedKeys set
                 * 3. If it has been removed in a higher priority type and needs animating
                 * 4. If it hasn't been removed in a higher priority but hasn't changed, and
                 *    needs adding to the type's protectedKeys list.
                 */
                const { prevResolvedValues = {} } = typeState;
                const allKeys = {
                    ...prevResolvedValues,
                    ...resolvedValues,
                };
                const markToAnimate = (key) => {
                    shouldAnimateType = true;
                    removedKeys.delete(key);
                    typeState.needsAnimating[key] = true;
                };
                for (const key in allKeys) {
                    const next = resolvedValues[key];
                    const prev = prevResolvedValues[key];
                    // If we've already handled this we can just skip ahead
                    if (encounteredKeys.hasOwnProperty(key))
                        continue;
                    /**
                     * If the value has changed, we probably want to animate it.
                     */
                    if (next !== prev) {
                        /**
                         * If both values are keyframes, we need to shallow compare them to
                         * detect whether any value has changed. If it has, we animate it.
                         */
                        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
                            if (!shallowCompare(next, prev) || variantDidChange) {
                                markToAnimate(key);
                            }
                            else {
                                /**
                                 * If it hasn't changed, we want to ensure it doesn't animate by
                                 * adding it to the list of protected keys.
                                 */
                                typeState.protectedKeys[key] = true;
                            }
                        }
                        else if (next !== undefined) {
                            // If next is defined and doesn't equal prev, it needs animating
                            markToAnimate(key);
                        }
                        else {
                            // If it's undefined, it's been removed.
                            removedKeys.add(key);
                        }
                    }
                    else if (next !== undefined && removedKeys.has(key)) {
                        /**
                         * If next hasn't changed and it isn't undefined, we want to check if it's
                         * been removed by a higher priority
                         */
                        markToAnimate(key);
                    }
                    else {
                        /**
                         * If it hasn't changed, we add it to the list of protected values
                         * to ensure it doesn't get animated.
                         */
                        typeState.protectedKeys[key] = true;
                    }
                }
                /**
                 * Update the typeState so next time animateChanges is called we can compare the
                 * latest prop and resolvedValues to these.
                 */
                typeState.prevProp = prop;
                typeState.prevResolvedValues = resolvedValues;
                /**
                 *
                 */
                if (typeState.isActive) {
                    encounteredKeys = { ...encounteredKeys, ...resolvedValues };
                }
                if (isInitialRender && visualElement.blockInitialAnimation) {
                    shouldAnimateType = false;
                }
                /**
                 * If this is an inherited prop we want to hard-block animations
                 * TODO: Test as this should probably still handle animations triggered
                 * by removed values?
                 */
                if (shouldAnimateType && !isInherited) {
                    animations.push(...definitionList.map((animation) => ({
                        animation: animation,
                        options: { type, ...options },
                    })));
                }
            }
            /**
             * If there are some removed value that haven't been dealt with,
             * we need to create a new animation that falls back either to the value
             * defined in the style prop, or the last read value.
             */
            if (removedKeys.size) {
                const fallbackAnimation = {};
                removedKeys.forEach((key) => {
                    const fallbackTarget = visualElement.getBaseTarget(key);
                    if (fallbackTarget !== undefined) {
                        fallbackAnimation[key] = fallbackTarget;
                    }
                });
                animations.push({ animation: fallbackAnimation });
            }
            let shouldAnimate = Boolean(animations.length);
            if (isInitialRender &&
                props.initial === false &&
                !visualElement.manuallyAnimateOnMount) {
                shouldAnimate = false;
            }
            isInitialRender = false;
            return shouldAnimate ? animate(animations) : Promise.resolve();
        }
        /**
         * Change whether a certain animation type is active.
         */
        function setActive(type, isActive, options) {
            var _a;
            // If the active state hasn't changed, we can safely do nothing here
            if (state[type].isActive === isActive)
                return Promise.resolve();
            // Propagate active change to children
            (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => { var _a; return (_a = child.animationState) === null || _a === void 0 ? void 0 : _a.setActive(type, isActive); });
            state[type].isActive = isActive;
            const animations = animateChanges(options, type);
            for (const key in state) {
                state[key].protectedKeys = {};
            }
            return animations;
        }
        return {
            animateChanges,
            setActive,
            setAnimateFunction,
            getState: () => state,
        };
    }
    function checkVariantsDidChange(prev, next) {
        if (typeof next === "string") {
            return next !== prev;
        }
        else if (Array.isArray(next)) {
            return !shallowCompare(next, prev);
        }
        return false;
    }
    function createTypeState(isActive = false) {
        return {
            isActive,
            protectedKeys: {},
            needsAnimating: {},
            prevResolvedValues: {},
        };
    }
    function createState() {
        return {
            [AnimationType.Animate]: createTypeState(true),
            [AnimationType.InView]: createTypeState(),
            [AnimationType.Hover]: createTypeState(),
            [AnimationType.Tap]: createTypeState(),
            [AnimationType.Drag]: createTypeState(),
            [AnimationType.Focus]: createTypeState(),
            [AnimationType.Exit]: createTypeState(),
        };
    }

    const animations = {
        animation: makeRenderlessComponent(({ visualElement, animate }) => {
            /**
             * We dynamically generate the AnimationState manager as it contains a reference
             * to the underlying animation library. We only want to load that if we load this,
             * so people can optionally code split it out using the `m` component.
             */
            visualElement.animationState || (visualElement.animationState = createAnimationState(visualElement));
            /**
             * Subscribe any provided AnimationControls to the component's VisualElement
             */
            if (isAnimationControls(animate)) {
                React.useEffect(() => animate.subscribe(visualElement), [animate]);
            }
        }),
        exit: makeRenderlessComponent((props) => {
            const { custom, visualElement } = props;
            const [isPresent, safeToRemove] = usePresence();
            const presenceContext = React.useContext(PresenceContext);
            React.useEffect(() => {
                visualElement.isPresent = isPresent;
                const animation = visualElement.animationState &&
                    visualElement.animationState.setActive(AnimationType.Exit, !isPresent, {
                        custom: (presenceContext && presenceContext.custom) ||
                            custom,
                    });
                if (animation && !isPresent) {
                    animation.then(safeToRemove);
                }
            }, [isPresent]);
        }),
    };

    const distance = (a, b) => Math.abs(a - b);
    function distance2D(a, b) {
        // Multi-dimensional
        const xDelta = distance(a.x, b.x);
        const yDelta = distance(a.y, b.y);
        return Math.sqrt(xDelta ** 2 + yDelta ** 2);
    }

    /**
     * @internal
     */
    class PanSession {
        constructor(event, handlers, { transformPagePoint } = {}) {
            /**
             * @internal
             */
            this.startEvent = null;
            /**
             * @internal
             */
            this.lastMoveEvent = null;
            /**
             * @internal
             */
            this.lastMoveEventInfo = null;
            /**
             * @internal
             */
            this.handlers = {};
            this.updatePoint = () => {
                if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                    return;
                const info = getPanInfo(this.lastMoveEventInfo, this.history);
                const isPanStarted = this.startEvent !== null;
                // Only start panning if the offset is larger than 3 pixels. If we make it
                // any larger than this we'll want to reset the pointer history
                // on the first update to avoid visual snapping to the cursoe.
                const isDistancePastThreshold = distance2D(info.offset, { x: 0, y: 0 }) >= 3;
                if (!isPanStarted && !isDistancePastThreshold)
                    return;
                const { point } = info;
                const { timestamp } = frameData;
                this.history.push({ ...point, timestamp });
                const { onStart, onMove } = this.handlers;
                if (!isPanStarted) {
                    onStart && onStart(this.lastMoveEvent, info);
                    this.startEvent = this.lastMoveEvent;
                }
                onMove && onMove(this.lastMoveEvent, info);
            };
            this.handlePointerMove = (event, info) => {
                this.lastMoveEvent = event;
                this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
                // Because Safari doesn't trigger mouseup events when it's above a `<select>`
                if (isMouseEvent(event) && event.buttons === 0) {
                    this.handlePointerUp(event, info);
                    return;
                }
                // Throttle mouse move event to once per frame
                sync.update(this.updatePoint, true);
            };
            this.handlePointerUp = (event, info) => {
                this.end();
                const { onEnd, onSessionEnd } = this.handlers;
                const panInfo = getPanInfo(transformPoint(info, this.transformPagePoint), this.history);
                if (this.startEvent && onEnd) {
                    onEnd(event, panInfo);
                }
                onSessionEnd && onSessionEnd(event, panInfo);
            };
            // If we have more than one touch, don't start detecting this gesture
            if (isTouchEvent(event) && event.touches.length > 1)
                return;
            this.handlers = handlers;
            this.transformPagePoint = transformPagePoint;
            const info = extractEventInfo(event);
            const initialInfo = transformPoint(info, this.transformPagePoint);
            const { point } = initialInfo;
            const { timestamp } = frameData;
            this.history = [{ ...point, timestamp }];
            const { onSessionStart } = handlers;
            onSessionStart &&
                onSessionStart(event, getPanInfo(initialInfo, this.history));
            this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
        }
        updateHandlers(handlers) {
            this.handlers = handlers;
        }
        end() {
            this.removeListeners && this.removeListeners();
            cancelSync.update(this.updatePoint);
        }
    }
    function transformPoint(info, transformPagePoint) {
        return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
    }
    function subtractPoint(a, b) {
        return { x: a.x - b.x, y: a.y - b.y };
    }
    function getPanInfo({ point }, history) {
        return {
            point,
            delta: subtractPoint(point, lastDevicePoint(history)),
            offset: subtractPoint(point, startDevicePoint(history)),
            velocity: getVelocity(history, 0.1),
        };
    }
    function startDevicePoint(history) {
        return history[0];
    }
    function lastDevicePoint(history) {
        return history[history.length - 1];
    }
    function getVelocity(history, timeDelta) {
        if (history.length < 2) {
            return { x: 0, y: 0 };
        }
        let i = history.length - 1;
        let timestampedPoint = null;
        const lastPoint = lastDevicePoint(history);
        while (i >= 0) {
            timestampedPoint = history[i];
            if (lastPoint.timestamp - timestampedPoint.timestamp >
                secondsToMilliseconds(timeDelta)) {
                break;
            }
            i--;
        }
        if (!timestampedPoint) {
            return { x: 0, y: 0 };
        }
        const time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;
        if (time === 0) {
            return { x: 0, y: 0 };
        }
        const currentVelocity = {
            x: (lastPoint.x - timestampedPoint.x) / time,
            y: (lastPoint.y - timestampedPoint.y) / time,
        };
        if (currentVelocity.x === Infinity) {
            currentVelocity.x = 0;
        }
        if (currentVelocity.y === Infinity) {
            currentVelocity.y = 0;
        }
        return currentVelocity;
    }

    function calcLength(axis) {
        return axis.max - axis.min;
    }
    function isNear(value, target = 0, maxDistance = 0.01) {
        return Math.abs(value - target) <= maxDistance;
    }
    function calcAxisDelta(delta, source, target, origin = 0.5) {
        delta.origin = origin;
        delta.originPoint = mix(source.min, source.max, delta.origin);
        delta.scale = calcLength(target) / calcLength(source);
        if (isNear(delta.scale, 1, 0.0001) || isNaN(delta.scale))
            delta.scale = 1;
        delta.translate =
            mix(target.min, target.max, delta.origin) - delta.originPoint;
        if (isNear(delta.translate) || isNaN(delta.translate))
            delta.translate = 0;
    }
    function calcBoxDelta(delta, source, target, origin) {
        calcAxisDelta(delta.x, source.x, target.x, origin === null || origin === void 0 ? void 0 : origin.originX);
        calcAxisDelta(delta.y, source.y, target.y, origin === null || origin === void 0 ? void 0 : origin.originY);
    }
    function calcRelativeAxis(target, relative, parent) {
        target.min = parent.min + relative.min;
        target.max = target.min + calcLength(relative);
    }
    function calcRelativeBox(target, relative, parent) {
        calcRelativeAxis(target.x, relative.x, parent.x);
        calcRelativeAxis(target.y, relative.y, parent.y);
    }
    function calcRelativeAxisPosition(target, layout, parent) {
        target.min = layout.min - parent.min;
        target.max = target.min + calcLength(layout);
    }
    function calcRelativePosition(target, layout, parent) {
        calcRelativeAxisPosition(target.x, layout.x, parent.x);
        calcRelativeAxisPosition(target.y, layout.y, parent.y);
    }

    /**
     * Apply constraints to a point. These constraints are both physical along an
     * axis, and an elastic factor that determines how much to constrain the point
     * by if it does lie outside the defined parameters.
     */
    function applyConstraints(point, { min, max }, elastic) {
        if (min !== undefined && point < min) {
            // If we have a min point defined, and this is outside of that, constrain
            point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
        }
        else if (max !== undefined && point > max) {
            // If we have a max point defined, and this is outside of that, constrain
            point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
        }
        return point;
    }
    /**
     * Calculate constraints in terms of the viewport when defined relatively to the
     * measured axis. This is measured from the nearest edge, so a max constraint of 200
     * on an axis with a max value of 300 would return a constraint of 500 - axis length
     */
    function calcRelativeAxisConstraints(axis, min, max) {
        return {
            min: min !== undefined ? axis.min + min : undefined,
            max: max !== undefined
                ? axis.max + max - (axis.max - axis.min)
                : undefined,
        };
    }
    /**
     * Calculate constraints in terms of the viewport when
     * defined relatively to the measured bounding box.
     */
    function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
        return {
            x: calcRelativeAxisConstraints(layoutBox.x, left, right),
            y: calcRelativeAxisConstraints(layoutBox.y, top, bottom),
        };
    }
    /**
     * Calculate viewport constraints when defined as another viewport-relative axis
     */
    function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
        let min = constraintsAxis.min - layoutAxis.min;
        let max = constraintsAxis.max - layoutAxis.max;
        // If the constraints axis is actually smaller than the layout axis then we can
        // flip the constraints
        if (constraintsAxis.max - constraintsAxis.min <
            layoutAxis.max - layoutAxis.min) {
            [min, max] = [max, min];
        }
        return { min, max };
    }
    /**
     * Calculate viewport constraints when defined as another viewport-relative box
     */
    function calcViewportConstraints(layoutBox, constraintsBox) {
        return {
            x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
            y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y),
        };
    }
    /**
     * Calculate a transform origin relative to the source axis, between 0-1, that results
     * in an asthetically pleasing scale/transform needed to project from source to target.
     */
    function calcOrigin(source, target) {
        let origin = 0.5;
        const sourceLength = calcLength(source);
        const targetLength = calcLength(target);
        if (targetLength > sourceLength) {
            origin = progress(target.min, target.max - sourceLength, source.min);
        }
        else if (sourceLength > targetLength) {
            origin = progress(source.min, source.max - targetLength, target.min);
        }
        return clamp(0, 1, origin);
    }
    /**
     * Rebase the calculated viewport constraints relative to the layout.min point.
     */
    function rebaseAxisConstraints(layout, constraints) {
        const relativeConstraints = {};
        if (constraints.min !== undefined) {
            relativeConstraints.min = constraints.min - layout.min;
        }
        if (constraints.max !== undefined) {
            relativeConstraints.max = constraints.max - layout.min;
        }
        return relativeConstraints;
    }
    const defaultElastic = 0.35;
    /**
     * Accepts a dragElastic prop and returns resolved elastic values for each axis.
     */
    function resolveDragElastic(dragElastic = defaultElastic) {
        if (dragElastic === false) {
            dragElastic = 0;
        }
        else if (dragElastic === true) {
            dragElastic = defaultElastic;
        }
        return {
            x: resolveAxisElastic(dragElastic, "left", "right"),
            y: resolveAxisElastic(dragElastic, "top", "bottom"),
        };
    }
    function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
        return {
            min: resolvePointElastic(dragElastic, minLabel),
            max: resolvePointElastic(dragElastic, maxLabel),
        };
    }
    function resolvePointElastic(dragElastic, label) {
        return typeof dragElastic === "number"
            ? dragElastic
            : dragElastic[label] || 0;
    }

    const createAxisDelta = () => ({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0,
    });
    const createDelta = () => ({
        x: createAxisDelta(),
        y: createAxisDelta(),
    });
    const createAxis = () => ({ min: 0, max: 0 });
    const createBox = () => ({
        x: createAxis(),
        y: createAxis(),
    });

    function eachAxis(callback) {
        return [callback("x"), callback("y")];
    }

    /**
     * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
     * it's easier to consider each axis individually. This function returns a bounding box
     * as a map of single-axis min/max values.
     */
    function convertBoundingBoxToBox({ top, left, right, bottom, }) {
        return {
            x: { min: left, max: right },
            y: { min: top, max: bottom },
        };
    }
    function convertBoxToBoundingBox({ x, y }) {
        return { top: y.min, right: x.max, bottom: y.max, left: x.min };
    }
    /**
     * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
     * provided by Framer to allow measured points to be corrected for device scaling. This is used
     * when measuring DOM elements and DOM event points.
     */
    function transformBoxPoints(point, transformPoint) {
        if (!transformPoint)
            return point;
        const topLeft = transformPoint({ x: point.left, y: point.top });
        const bottomRight = transformPoint({ x: point.right, y: point.bottom });
        return {
            top: topLeft.y,
            left: topLeft.x,
            bottom: bottomRight.y,
            right: bottomRight.x,
        };
    }

    function isIdentityScale(scale) {
        return scale === undefined || scale === 1;
    }
    function hasScale({ scale, scaleX, scaleY }) {
        return (!isIdentityScale(scale) ||
            !isIdentityScale(scaleX) ||
            !isIdentityScale(scaleY));
    }
    function hasTransform(values) {
        return (hasScale(values) ||
            has2DTranslate(values) ||
            values.z ||
            values.rotate ||
            values.rotateX ||
            values.rotateY);
    }
    function has2DTranslate(values) {
        return is2DTranslate(values.x) || is2DTranslate(values.y);
    }
    function is2DTranslate(value) {
        return value && value !== "0%";
    }

    /**
     * Scales a point based on a factor and an originPoint
     */
    function scalePoint(point, scale, originPoint) {
        const distanceFromOrigin = point - originPoint;
        const scaled = scale * distanceFromOrigin;
        return originPoint + scaled;
    }
    /**
     * Applies a translate/scale delta to a point
     */
    function applyPointDelta(point, translate, scale, originPoint, boxScale) {
        if (boxScale !== undefined) {
            point = scalePoint(point, boxScale, originPoint);
        }
        return scalePoint(point, scale, originPoint) + translate;
    }
    /**
     * Applies a translate/scale delta to an axis
     */
    function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
        axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
        axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
    }
    /**
     * Applies a translate/scale delta to a box
     */
    function applyBoxDelta(box, { x, y }) {
        applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
        applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
    }
    /**
     * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
     * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
     *
     * This is the final nested loop within updateLayoutDelta for future refactoring
     */
    function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
        var _a, _b;
        const treeLength = treePath.length;
        if (!treeLength)
            return;
        // Reset the treeScale
        treeScale.x = treeScale.y = 1;
        let node;
        let delta;
        for (let i = 0; i < treeLength; i++) {
            node = treePath[i];
            delta = node.projectionDelta;
            if (((_b = (_a = node.instance) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.display) === "contents")
                continue;
            if (isSharedTransition &&
                node.options.layoutScroll &&
                node.scroll &&
                node !== node.root) {
                transformBox(box, {
                    x: -node.scroll.offset.x,
                    y: -node.scroll.offset.y,
                });
            }
            if (delta) {
                // Incoporate each ancestor's scale into a culmulative treeScale for this component
                treeScale.x *= delta.x.scale;
                treeScale.y *= delta.y.scale;
                // Apply each ancestor's calculated delta into this component's recorded layout box
                applyBoxDelta(box, delta);
            }
            if (isSharedTransition && hasTransform(node.latestValues)) {
                transformBox(box, node.latestValues);
            }
        }
        /**
         * Snap tree scale back to 1 if it's within a non-perceivable threshold.
         * This will help reduce useless scales getting rendered.
         */
        treeScale.x = snapToDefault(treeScale.x);
        treeScale.y = snapToDefault(treeScale.y);
    }
    function snapToDefault(scale) {
        if (Number.isInteger(scale))
            return scale;
        return scale > 1.0000000000001 || scale < 0.999999999999 ? scale : 1;
    }
    function translateAxis(axis, distance) {
        axis.min = axis.min + distance;
        axis.max = axis.max + distance;
    }
    /**
     * Apply a transform to an axis from the latest resolved motion values.
     * This function basically acts as a bridge between a flat motion value map
     * and applyAxisDelta
     */
    function transformAxis(axis, transforms, [key, scaleKey, originKey]) {
        const axisOrigin = transforms[originKey] !== undefined ? transforms[originKey] : 0.5;
        const originPoint = mix(axis.min, axis.max, axisOrigin);
        // Apply the axis delta to the final axis
        applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
    }
    /**
     * The names of the motion values we want to apply as translation, scale and origin.
     */
    const xKeys$1 = ["x", "scaleX", "originX"];
    const yKeys$1 = ["y", "scaleY", "originY"];
    /**
     * Apply a transform to a box from the latest resolved motion values.
     */
    function transformBox(box, transform) {
        transformAxis(box.x, transform, xKeys$1);
        transformAxis(box.y, transform, yKeys$1);
    }

    function measureViewportBox(instance, transformPoint) {
        return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
    }
    function measurePageBox(element, rootProjectionNode, transformPagePoint) {
        const viewportBox = measureViewportBox(element, transformPagePoint);
        const { scroll } = rootProjectionNode;
        if (scroll) {
            translateAxis(viewportBox.x, scroll.offset.x);
            translateAxis(viewportBox.y, scroll.offset.y);
        }
        return viewportBox;
    }

    const elementDragControls = new WeakMap();
    /**
     *
     */
    // let latestPointerEvent: AnyPointerEvent
    class VisualElementDragControls {
        constructor(visualElement) {
            // This is a reference to the global drag gesture lock, ensuring only one component
            // can "capture" the drag of one or both axes.
            // TODO: Look into moving this into pansession?
            this.openGlobalLock = null;
            this.isDragging = false;
            this.currentDirection = null;
            this.originPoint = { x: 0, y: 0 };
            /**
             * The permitted boundaries of travel, in pixels.
             */
            this.constraints = false;
            this.hasMutatedConstraints = false;
            /**
             * The per-axis resolved elastic values.
             */
            this.elastic = createBox();
            this.visualElement = visualElement;
        }
        start(originEvent, { snapToCursor = false } = {}) {
            /**
             * Don't start dragging if this component is exiting
             */
            if (this.visualElement.isPresent === false)
                return;
            const onSessionStart = (event) => {
                // Stop any animations on both axis values immediately. This allows the user to throw and catch
                // the component.
                this.stopAnimation();
                if (snapToCursor) {
                    this.snapToCursor(extractEventInfo(event, "page").point);
                }
            };
            const onStart = (event, info) => {
                var _a;
                // Attempt to grab the global drag gesture lock - maybe make this part of PanSession
                const { drag, dragPropagation, onDragStart } = this.getProps();
                if (drag && !dragPropagation) {
                    if (this.openGlobalLock)
                        this.openGlobalLock();
                    this.openGlobalLock = getGlobalLock(drag);
                    // If we don 't have the lock, don't start dragging
                    if (!this.openGlobalLock)
                        return;
                }
                this.isDragging = true;
                this.currentDirection = null;
                this.resolveConstraints();
                if (this.visualElement.projection) {
                    this.visualElement.projection.isAnimationBlocked = true;
                    this.visualElement.projection.target = undefined;
                }
                /**
                 * Record gesture origin
                 */
                eachAxis((axis) => {
                    var _a, _b;
                    let current = this.getAxisMotionValue(axis).get() || 0;
                    /**
                     * If the MotionValue is a percentage value convert to px
                     */
                    if (percent.test(current)) {
                        const measuredAxis = (_b = (_a = this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout) === null || _b === void 0 ? void 0 : _b.layoutBox[axis];
                        if (measuredAxis) {
                            const length = calcLength(measuredAxis);
                            current = length * (parseFloat(current) / 100);
                        }
                    }
                    this.originPoint[axis] = current;
                });
                // Fire onDragStart event
                onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
                (_a = this.visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Drag, true);
            };
            const onMove = (event, info) => {
                // latestPointerEvent = event
                const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag, } = this.getProps();
                // If we didn't successfully receive the gesture lock, early return.
                if (!dragPropagation && !this.openGlobalLock)
                    return;
                const { offset } = info;
                // Attempt to detect drag direction if directionLock is true
                if (dragDirectionLock && this.currentDirection === null) {
                    this.currentDirection = getCurrentDirection(offset);
                    // If we've successfully set a direction, notify listener
                    if (this.currentDirection !== null) {
                        onDirectionLock === null || onDirectionLock === void 0 ? void 0 : onDirectionLock(this.currentDirection);
                    }
                    return;
                }
                // Update each point with the latest position
                this.updateAxis("x", info.point, offset);
                this.updateAxis("y", info.point, offset);
                /**
                 * Ideally we would leave the renderer to fire naturally at the end of
                 * this frame but if the element is about to change layout as the result
                 * of a re-render we want to ensure the browser can read the latest
                 * bounding box to ensure the pointer and element don't fall out of sync.
                 */
                this.visualElement.render();
                /**
                 * This must fire after the render call as it might trigger a state
                 * change which itself might trigger a layout update.
                 */
                onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
            };
            const onSessionEnd = (event, info) => this.stop(event, info);
            this.panSession = new PanSession(originEvent, {
                onSessionStart,
                onStart,
                onMove,
                onSessionEnd,
            }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
        }
        stop(event, info) {
            const isDragging = this.isDragging;
            this.cancel();
            if (!isDragging)
                return;
            const { velocity } = info;
            this.startAnimation(velocity);
            const { onDragEnd } = this.getProps();
            onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
        }
        cancel() {
            var _a, _b;
            this.isDragging = false;
            if (this.visualElement.projection) {
                this.visualElement.projection.isAnimationBlocked = false;
            }
            (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
            this.panSession = undefined;
            const { dragPropagation } = this.getProps();
            if (!dragPropagation && this.openGlobalLock) {
                this.openGlobalLock();
                this.openGlobalLock = null;
            }
            (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
        }
        updateAxis(axis, _point, offset) {
            const { drag } = this.getProps();
            // If we're not dragging this axis, do an early return.
            if (!offset || !shouldDrag(axis, drag, this.currentDirection))
                return;
            const axisValue = this.getAxisMotionValue(axis);
            let next = this.originPoint[axis] + offset[axis];
            // Apply constraints
            if (this.constraints && this.constraints[axis]) {
                next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
            }
            axisValue.set(next);
        }
        resolveConstraints() {
            const { dragConstraints, dragElastic } = this.getProps();
            const { layout } = this.visualElement.projection || {};
            const prevConstraints = this.constraints;
            if (dragConstraints && isRefObject(dragConstraints)) {
                if (!this.constraints) {
                    this.constraints = this.resolveRefConstraints();
                }
            }
            else {
                if (dragConstraints && layout) {
                    this.constraints = calcRelativeConstraints(layout.layoutBox, dragConstraints);
                }
                else {
                    this.constraints = false;
                }
            }
            this.elastic = resolveDragElastic(dragElastic);
            /**
             * If we're outputting to external MotionValues, we want to rebase the measured constraints
             * from viewport-relative to component-relative.
             */
            if (prevConstraints !== this.constraints &&
                layout &&
                this.constraints &&
                !this.hasMutatedConstraints) {
                eachAxis((axis) => {
                    if (this.getAxisMotionValue(axis)) {
                        this.constraints[axis] = rebaseAxisConstraints(layout.layoutBox[axis], this.constraints[axis]);
                    }
                });
            }
        }
        resolveRefConstraints() {
            const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
            if (!constraints || !isRefObject(constraints))
                return false;
            const constraintsElement = constraints.current;
            const { projection } = this.visualElement;
            // TODO
            if (!projection || !projection.layout)
                return false;
            const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
            let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
            /**
             * If there's an onMeasureDragConstraints listener we call it and
             * if different constraints are returned, set constraints to that
             */
            if (onMeasureDragConstraints) {
                const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
                this.hasMutatedConstraints = !!userConstraints;
                if (userConstraints) {
                    measuredConstraints = convertBoundingBoxToBox(userConstraints);
                }
            }
            return measuredConstraints;
        }
        startAnimation(velocity) {
            const { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd, } = this.getProps();
            const constraints = this.constraints || {};
            const momentumAnimations = eachAxis((axis) => {
                if (!shouldDrag(axis, drag, this.currentDirection)) {
                    return;
                }
                let transition = (constraints === null || constraints === void 0 ? void 0 : constraints[axis]) || {};
                if (dragSnapToOrigin)
                    transition = { min: 0, max: 0 };
                /**
                 * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
                 * of spring animations so we should look into adding a disable spring option to `inertia`.
                 * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
                 * using the value of `dragElastic`.
                 */
                const bounceStiffness = dragElastic ? 200 : 1000000;
                const bounceDamping = dragElastic ? 40 : 10000000;
                const inertia = {
                    type: "inertia",
                    velocity: dragMomentum ? velocity[axis] : 0,
                    bounceStiffness,
                    bounceDamping,
                    timeConstant: 750,
                    restDelta: 1,
                    restSpeed: 10,
                    ...dragTransition,
                    ...transition,
                };
                // If we're not animating on an externally-provided `MotionValue` we can use the
                // component's animation controls which will handle interactions with whileHover (etc),
                // otherwise we just have to animate the `MotionValue` itself.
                return this.startAxisValueAnimation(axis, inertia);
            });
            // Run all animations and then resolve the new drag constraints.
            return Promise.all(momentumAnimations).then(onDragTransitionEnd);
        }
        startAxisValueAnimation(axis, transition) {
            const axisValue = this.getAxisMotionValue(axis);
            return axisValue.start(createMotionValueAnimation(axis, axisValue, 0, transition));
        }
        stopAnimation() {
            eachAxis((axis) => this.getAxisMotionValue(axis).stop());
        }
        /**
         * Drag works differently depending on which props are provided.
         *
         * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
         * - Otherwise, we apply the delta to the x/y motion values.
         */
        getAxisMotionValue(axis) {
            var _a;
            const dragKey = "_drag" + axis.toUpperCase();
            const externalMotionValue = this.visualElement.getProps()[dragKey];
            return externalMotionValue
                ? externalMotionValue
                : this.visualElement.getValue(axis, ((_a = this.visualElement.getProps().initial) === null || _a === void 0 ? void 0 : _a[axis]) || 0);
        }
        snapToCursor(point) {
            eachAxis((axis) => {
                const { drag } = this.getProps();
                // If we're not dragging this axis, do an early return.
                if (!shouldDrag(axis, drag, this.currentDirection))
                    return;
                const { projection } = this.visualElement;
                const axisValue = this.getAxisMotionValue(axis);
                if (projection && projection.layout) {
                    const { min, max } = projection.layout.layoutBox[axis];
                    axisValue.set(point[axis] - mix(min, max, 0.5));
                }
            });
        }
        /**
         * When the viewport resizes we want to check if the measured constraints
         * have changed and, if so, reposition the element within those new constraints
         * relative to where it was before the resize.
         */
        scalePositionWithinConstraints() {
            var _a;
            if (!this.visualElement.current)
                return;
            const { drag, dragConstraints } = this.getProps();
            const { projection } = this.visualElement;
            if (!isRefObject(dragConstraints) || !projection || !this.constraints)
                return;
            /**
             * Stop current animations as there can be visual glitching if we try to do
             * this mid-animation
             */
            this.stopAnimation();
            /**
             * Record the relative position of the dragged element relative to the
             * constraints box and save as a progress value.
             */
            const boxProgress = { x: 0, y: 0 };
            eachAxis((axis) => {
                const axisValue = this.getAxisMotionValue(axis);
                if (axisValue) {
                    const latest = axisValue.get();
                    boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
                }
            });
            /**
             * Update the layout of this element and resolve the latest drag constraints
             */
            const { transformTemplate } = this.visualElement.getProps();
            this.visualElement.current.style.transform = transformTemplate
                ? transformTemplate({}, "")
                : "none";
            (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
            projection.updateLayout();
            this.resolveConstraints();
            /**
             * For each axis, calculate the current progress of the layout axis
             * within the new constraints.
             */
            eachAxis((axis) => {
                if (!shouldDrag(axis, drag, null))
                    return;
                /**
                 * Calculate a new transform based on the previous box progress
                 */
                const axisValue = this.getAxisMotionValue(axis);
                const { min, max } = this.constraints[axis];
                axisValue.set(mix(min, max, boxProgress[axis]));
            });
        }
        addListeners() {
            var _a;
            if (!this.visualElement.current)
                return;
            elementDragControls.set(this.visualElement, this);
            const element = this.visualElement.current;
            /**
             * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
             */
            const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
                const { drag, dragListener = true } = this.getProps();
                drag && dragListener && this.start(event);
            });
            const measureDragConstraints = () => {
                const { dragConstraints } = this.getProps();
                if (isRefObject(dragConstraints)) {
                    this.constraints = this.resolveRefConstraints();
                }
            };
            const { projection } = this.visualElement;
            const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
            if (projection && !projection.layout) {
                (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
                projection.updateLayout();
            }
            measureDragConstraints();
            /**
             * Attach a window resize listener to scale the draggable target within its defined
             * constraints as the window resizes.
             */
            const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
            /**
             * If the element's layout changes, calculate the delta and apply that to
             * the drag gesture's origin point.
             */
            const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
                if (this.isDragging && hasLayoutChanged) {
                    eachAxis((axis) => {
                        const motionValue = this.getAxisMotionValue(axis);
                        if (!motionValue)
                            return;
                        this.originPoint[axis] += delta[axis].translate;
                        motionValue.set(motionValue.get() + delta[axis].translate);
                    });
                    this.visualElement.render();
                }
            }));
            return () => {
                stopResizeListener();
                stopPointerListener();
                stopMeasureLayoutListener();
                stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
            };
        }
        getProps() {
            const props = this.visualElement.getProps();
            const { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true, } = props;
            return {
                ...props,
                drag,
                dragDirectionLock,
                dragPropagation,
                dragConstraints,
                dragElastic,
                dragMomentum,
            };
        }
    }
    function shouldDrag(direction, drag, currentDirection) {
        return ((drag === true || drag === direction) &&
            (currentDirection === null || currentDirection === direction));
    }
    /**
     * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
     * than the provided threshold, return `null`.
     *
     * @param offset - The x/y offset from origin.
     * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
     */
    function getCurrentDirection(offset, lockThreshold = 10) {
        let direction = null;
        if (Math.abs(offset.y) > lockThreshold) {
            direction = "y";
        }
        else if (Math.abs(offset.x) > lockThreshold) {
            direction = "x";
        }
        return direction;
    }

    /**
     * A hook that allows an element to be dragged.
     *
     * @internal
     */
    function useDrag(props) {
        const { dragControls: groupDragControls, visualElement } = props;
        const dragControls = useConstant(() => new VisualElementDragControls(visualElement));
        // If we've been provided a DragControls for manual control over the drag gesture,
        // subscribe this component to it on mount.
        React.useEffect(() => groupDragControls && groupDragControls.subscribe(dragControls), [dragControls, groupDragControls]);
        // Apply the event listeners to the element
        React.useEffect(() => dragControls.addListeners(), [dragControls]);
    }

    /**
     *
     * @param handlers -
     * @param ref -
     *
     * @privateRemarks
     * Currently this sets new pan gesture functions every render. The memo route has been explored
     * in the past but ultimately we're still creating new functions every render. An optimisation
     * to explore is creating the pan gestures and loading them into a `ref`.
     *
     * @internal
     */
    function usePanGesture({ onPan, onPanStart, onPanEnd, onPanSessionStart, visualElement, }) {
        const hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
        const panSession = React.useRef(null);
        const { transformPagePoint } = React.useContext(MotionConfigContext);
        const handlers = {
            onSessionStart: onPanSessionStart,
            onStart: onPanStart,
            onMove: onPan,
            onEnd: (event, info) => {
                panSession.current = null;
                onPanEnd && onPanEnd(event, info);
            },
        };
        React.useEffect(() => {
            if (panSession.current !== null) {
                panSession.current.updateHandlers(handlers);
            }
        });
        function onPointerDown(event) {
            panSession.current = new PanSession(event, handlers, {
                transformPagePoint,
            });
        }
        usePointerEvent(visualElement, "pointerdown", hasPanEvents && onPointerDown);
        useUnmountEffect(() => panSession.current && panSession.current.end());
    }

    const drag = {
        pan: makeRenderlessComponent(usePanGesture),
        drag: makeRenderlessComponent(useDrag),
    };

    function isCSSVariable(value) {
        return typeof value === "string" && value.startsWith("var(--");
    }
    /**
     * Parse Framer's special CSS variable format into a CSS token and a fallback.
     *
     * ```
     * `var(--foo, #fff)` => [`--foo`, '#fff']
     * ```
     *
     * @param current
     */
    const cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
    function parseCSSVariable(current) {
        const match = cssVariableRegex.exec(current);
        if (!match)
            return [,];
        const [, token, fallback] = match;
        return [token, fallback];
    }
    function getVariableValue(current, element, depth = 1) {
        const [token, fallback] = parseCSSVariable(current);
        // No CSS variable detected
        if (!token)
            return;
        // Attempt to read this CSS variable off the element
        const resolved = window.getComputedStyle(element).getPropertyValue(token);
        if (resolved) {
            return resolved.trim();
        }
        else if (isCSSVariable(fallback)) {
            // The fallback might itself be a CSS variable, in which case we attempt to resolve it too.
            return getVariableValue(fallback, element, depth + 1);
        }
        else {
            return fallback;
        }
    }
    /**
     * Resolve CSS variables from
     *
     * @internal
     */
    function resolveCSSVariables(visualElement, { ...target }, transitionEnd) {
        const element = visualElement.current;
        if (!(element instanceof Element))
            return { target, transitionEnd };
        // If `transitionEnd` isn't `undefined`, clone it. We could clone `target` and `transitionEnd`
        // only if they change but I think this reads clearer and this isn't a performance-critical path.
        if (transitionEnd) {
            transitionEnd = { ...transitionEnd };
        }
        // Go through existing `MotionValue`s and ensure any existing CSS variables are resolved
        visualElement.values.forEach((value) => {
            const current = value.get();
            if (!isCSSVariable(current))
                return;
            const resolved = getVariableValue(current, element);
            if (resolved)
                value.set(resolved);
        });
        // Cycle through every target property and resolve CSS variables. Currently
        // we only read single-var properties like `var(--foo)`, not `calc(var(--foo) + 20px)`
        for (const key in target) {
            const current = target[key];
            if (!isCSSVariable(current))
                continue;
            const resolved = getVariableValue(current, element);
            if (!resolved)
                continue;
            // Clone target if it hasn't already been
            target[key] = resolved;
            // If the user hasn't already set this key on `transitionEnd`, set it to the unresolved
            // CSS variable. This will ensure that after the animation the component will reflect
            // changes in the value of the CSS variable.
            if (transitionEnd && transitionEnd[key] === undefined) {
                transitionEnd[key] = current;
            }
        }
        return { target, transitionEnd };
    }

    const positionalKeys = new Set([
        "width",
        "height",
        "top",
        "left",
        "right",
        "bottom",
        "x",
        "y",
    ]);
    const isPositionalKey = (key) => positionalKeys.has(key);
    const hasPositionalKey = (target) => {
        return Object.keys(target).some(isPositionalKey);
    };
    const setAndResetVelocity = (value, to) => {
        // Looks odd but setting it twice doesn't render, it'll just
        // set both prev and current to the latest value
        value.set(to, false);
        value.set(to);
    };
    const isNumOrPxType = (v) => v === number || v === px;
    var BoundingBoxDimension;
    (function (BoundingBoxDimension) {
        BoundingBoxDimension["width"] = "width";
        BoundingBoxDimension["height"] = "height";
        BoundingBoxDimension["left"] = "left";
        BoundingBoxDimension["right"] = "right";
        BoundingBoxDimension["top"] = "top";
        BoundingBoxDimension["bottom"] = "bottom";
    })(BoundingBoxDimension || (BoundingBoxDimension = {}));
    const getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
    const getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform }) => {
        if (transform === "none" || !transform)
            return 0;
        const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
        if (matrix3d) {
            return getPosFromMatrix(matrix3d[1], pos3);
        }
        else {
            const matrix = transform.match(/^matrix\((.+)\)$/);
            if (matrix) {
                return getPosFromMatrix(matrix[1], pos2);
            }
            else {
                return 0;
            }
        }
    };
    const transformKeys = new Set(["x", "y", "z"]);
    const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
    function removeNonTranslationalTransform(visualElement) {
        const removedTransforms = [];
        nonTranslationalTransformKeys.forEach((key) => {
            const value = visualElement.getValue(key);
            if (value !== undefined) {
                removedTransforms.push([key, value.get()]);
                value.set(key.startsWith("scale") ? 1 : 0);
            }
        });
        // Apply changes to element before measurement
        if (removedTransforms.length)
            visualElement.render();
        return removedTransforms;
    }
    const positionalValues = {
        // Dimensions
        width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
        height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
        top: (_bbox, { top }) => parseFloat(top),
        left: (_bbox, { left }) => parseFloat(left),
        bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
        right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
        // Transform
        x: getTranslateFromMatrix(4, 13),
        y: getTranslateFromMatrix(5, 14),
    };
    const convertChangedValueTypes = (target, visualElement, changedKeys) => {
        const originBbox = visualElement.measureViewportBox();
        const element = visualElement.current;
        const elementComputedStyle = getComputedStyle(element);
        const { display } = elementComputedStyle;
        const origin = {};
        // If the element is currently set to display: "none", make it visible before
        // measuring the target bounding box
        if (display === "none") {
            visualElement.setStaticValue("display", target.display || "block");
        }
        /**
         * Record origins before we render and update styles
         */
        changedKeys.forEach((key) => {
            origin[key] = positionalValues[key](originBbox, elementComputedStyle);
        });
        // Apply the latest values (as set in checkAndConvertChangedValueTypes)
        visualElement.render();
        const targetBbox = visualElement.measureViewportBox();
        changedKeys.forEach((key) => {
            // Restore styles to their **calculated computed style**, not their actual
            // originally set style. This allows us to animate between equivalent pixel units.
            const value = visualElement.getValue(key);
            setAndResetVelocity(value, origin[key]);
            target[key] = positionalValues[key](targetBbox, elementComputedStyle);
        });
        return target;
    };
    const checkAndConvertChangedValueTypes = (visualElement, target, origin = {}, transitionEnd = {}) => {
        target = { ...target };
        transitionEnd = { ...transitionEnd };
        const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
        // We want to remove any transform values that could affect the element's bounding box before
        // it's measured. We'll reapply these later.
        let removedTransformValues = [];
        let hasAttemptedToRemoveTransformValues = false;
        const changedValueTypeKeys = [];
        targetPositionalKeys.forEach((key) => {
            const value = visualElement.getValue(key);
            if (!visualElement.hasValue(key))
                return;
            let from = origin[key];
            let fromType = findDimensionValueType(from);
            const to = target[key];
            let toType;
            // TODO: The current implementation of this basically throws an error
            // if you try and do value conversion via keyframes. There's probably
            // a way of doing this but the performance implications would need greater scrutiny,
            // as it'd be doing multiple resize-remeasure operations.
            if (isKeyframesTarget(to)) {
                const numKeyframes = to.length;
                const fromIndex = to[0] === null ? 1 : 0;
                from = to[fromIndex];
                fromType = findDimensionValueType(from);
                for (let i = fromIndex; i < numKeyframes; i++) {
                    if (!toType) {
                        toType = findDimensionValueType(to[i]);
                    }
                    else {
                        invariant(findDimensionValueType(to[i]) === toType);
                    }
                }
            }
            else {
                toType = findDimensionValueType(to);
            }
            if (fromType !== toType) {
                // If they're both just number or px, convert them both to numbers rather than
                // relying on resize/remeasure to convert (which is wasteful in this situation)
                if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
                    const current = value.get();
                    if (typeof current === "string") {
                        value.set(parseFloat(current));
                    }
                    if (typeof to === "string") {
                        target[key] = parseFloat(to);
                    }
                    else if (Array.isArray(to) && toType === px) {
                        target[key] = to.map(parseFloat);
                    }
                }
                else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) &&
                    (toType === null || toType === void 0 ? void 0 : toType.transform) &&
                    (from === 0 || to === 0)) {
                    // If one or the other value is 0, it's safe to coerce it to the
                    // type of the other without measurement
                    if (from === 0) {
                        value.set(toType.transform(from));
                    }
                    else {
                        target[key] = fromType.transform(to);
                    }
                }
                else {
                    // If we're going to do value conversion via DOM measurements, we first
                    // need to remove non-positional transform values that could affect the bbox measurements.
                    if (!hasAttemptedToRemoveTransformValues) {
                        removedTransformValues =
                            removeNonTranslationalTransform(visualElement);
                        hasAttemptedToRemoveTransformValues = true;
                    }
                    changedValueTypeKeys.push(key);
                    transitionEnd[key] =
                        transitionEnd[key] !== undefined
                            ? transitionEnd[key]
                            : target[key];
                    setAndResetVelocity(value, to);
                }
            }
        });
        if (changedValueTypeKeys.length) {
            const scrollY = changedValueTypeKeys.indexOf("height") >= 0
                ? window.pageYOffset
                : null;
            const convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
            // If we removed transform values, reapply them before the next render
            if (removedTransformValues.length) {
                removedTransformValues.forEach(([key, value]) => {
                    visualElement.getValue(key).set(value);
                });
            }
            // Reapply original values
            visualElement.render();
            // Restore scroll position
            if (isBrowser && scrollY !== null) {
                window.scrollTo({ top: scrollY });
            }
            return { target: convertedTarget, transitionEnd };
        }
        else {
            return { target, transitionEnd };
        }
    };
    /**
     * Convert value types for x/y/width/height/top/left/bottom/right
     *
     * Allows animation between `'auto'` -> `'100%'` or `0` -> `'calc(50% - 10vw)'`
     *
     * @internal
     */
    function unitConversion(visualElement, target, origin, transitionEnd) {
        return hasPositionalKey(target)
            ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd)
            : { target, transitionEnd };
    }

    /**
     * Parse a DOM variant to make it animatable. This involves resolving CSS variables
     * and ensuring animations like "20%" => "calc(50vw)" are performed in pixels.
     */
    const parseDomVariant = (visualElement, target, origin, transitionEnd) => {
        const resolved = resolveCSSVariables(visualElement, target, transitionEnd);
        target = resolved.target;
        transitionEnd = resolved.transitionEnd;
        return unitConversion(visualElement, target, origin, transitionEnd);
    };

    // Does this device prefer reduced motion? Returns `null` server-side.
    const prefersReducedMotion = { current: null };
    const hasReducedMotionListener = { current: false };

    function initPrefersReducedMotion() {
        hasReducedMotionListener.current = true;
        if (!isBrowser)
            return;
        if (window.matchMedia) {
            const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
            const setReducedMotionPreferences = () => (prefersReducedMotion.current = motionMediaQuery.matches);
            motionMediaQuery.addListener(setReducedMotionPreferences);
            setReducedMotionPreferences();
        }
        else {
            prefersReducedMotion.current = false;
        }
    }

    function updateMotionValuesFromProps(element, next, prev) {
        const { willChange } = next;
        for (const key in next) {
            const nextValue = next[key];
            const prevValue = prev[key];
            if (isMotionValue(nextValue)) {
                /**
                 * If this is a motion value found in props or style, we want to add it
                 * to our visual element's motion value map.
                 */
                element.addValue(key, nextValue);
                if (isWillChangeMotionValue(willChange)) {
                    willChange.add(key);
                }
            }
            else if (isMotionValue(prevValue)) {
                /**
                 * If we're swapping from a motion value to a static value,
                 * create a new motion value from that
                 */
                element.addValue(key, motionValue(nextValue, { owner: element }));
                if (isWillChangeMotionValue(willChange)) {
                    willChange.remove(key);
                }
            }
            else if (prevValue !== nextValue) {
                /**
                 * If this is a flat value that has changed, update the motion value
                 * or create one if it doesn't exist. We only want to do this if we're
                 * not handling the value with our animation state.
                 */
                if (element.hasValue(key)) {
                    const existingValue = element.getValue(key);
                    // TODO: Only update values that aren't being animated or even looked at
                    !existingValue.hasAnimated && existingValue.set(nextValue);
                }
                else {
                    const latestValue = element.getStaticValue(key);
                    element.addValue(key, motionValue(latestValue !== undefined ? latestValue : nextValue));
                }
            }
        }
        // Handle removed values
        for (const key in prev) {
            if (next[key] === undefined)
                element.removeValue(key);
        }
        return next;
    }

    const featureNames = Object.keys(featureDefinitions);
    const numFeatures = featureNames.length;
    const propEventHandlers = [
        "AnimationStart",
        "AnimationComplete",
        "Update",
        "Unmount",
        "BeforeLayoutMeasure",
        "LayoutMeasure",
        "LayoutAnimationStart",
        "LayoutAnimationComplete",
    ];
    /**
     * A VisualElement is an imperative abstraction around UI elements such as
     * HTMLElement, SVGElement, Three.Object3D etc.
     */
    class VisualElement {
        constructor({ parent, props, reducedMotionConfig, visualState, }, options = {}) {
            /**
             * A reference to the current underlying Instance, e.g. a HTMLElement
             * or Three.Mesh etc.
             */
            this.current = null;
            /**
             * A set containing references to this VisualElement's children.
             */
            this.children = new Set();
            /**
             * Determine what role this visual element should take in the variant tree.
             */
            this.isVariantNode = false;
            this.isControllingVariants = false;
            /**
             * Decides whether this VisualElement should animate in reduced motion
             * mode.
             *
             * TODO: This is currently set on every individual VisualElement but feels
             * like it could be set globally.
             */
            this.shouldReduceMotion = null;
            /**
             * A map of all motion values attached to this visual element. Motion
             * values are source of truth for any given animated value. A motion
             * value might be provided externally by the component via props.
             */
            this.values = new Map();
            /**
             * Tracks whether this VisualElement's React component is currently present
             * within the defined React tree.
             */
            this.isPresent = true;
            /**
             * A map of every subscription that binds the provided or generated
             * motion values onChange listeners to this visual element.
             */
            this.valueSubscriptions = new Map();
            /**
             * A reference to the previously-provided motion values as returned
             * from scrapeMotionValuesFromProps. We use the keys in here to determine
             * if any motion values need to be removed after props are updated.
             */
            this.prevMotionValues = {};
            /**
             * An object containing a SubscriptionManager for each active event.
             */
            this.events = {};
            /**
             * An object containing an unsubscribe function for each prop event subscription.
             * For example, every "Update" event can have multiple subscribers via
             * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
             */
            this.propEventSubscriptions = {};
            this.notifyUpdate = () => this.notify("Update", this.latestValues);
            this.render = () => {
                if (!this.current)
                    return;
                this.triggerBuild();
                this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
            };
            this.scheduleRender = () => sync.render(this.render, false, true);
            const { latestValues, renderState } = visualState;
            this.latestValues = latestValues;
            this.baseTarget = { ...latestValues };
            this.initialValues = props.initial ? { ...latestValues } : {};
            this.renderState = renderState;
            this.parent = parent;
            this.props = props;
            this.depth = parent ? parent.depth + 1 : 0;
            this.reducedMotionConfig = reducedMotionConfig;
            this.options = options;
            this.isControllingVariants = isControllingVariants(props);
            this.isVariantNode = isVariantNode(props);
            if (this.isVariantNode) {
                this.variantChildren = new Set();
            }
            this.manuallyAnimateOnMount = Boolean(parent && parent.current);
            /**
             * Any motion values that are provided to the element when created
             * aren't yet bound to the element, as this would technically be impure.
             * However, we iterate through the motion values and set them to the
             * initial values for this component.
             *
             * TODO: This is impure and we should look at changing this to run on mount.
             * Doing so will break some tests but this isn't neccessarily a breaking change,
             * more a reflection of the test.
             */
            const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props);
            for (const key in initialMotionValues) {
                const value = initialMotionValues[key];
                if (latestValues[key] !== undefined && isMotionValue(value)) {
                    value.set(latestValues[key], false);
                    if (isWillChangeMotionValue(willChange)) {
                        willChange.add(key);
                    }
                }
            }
        }
        /**
         * This method takes React props and returns found MotionValues. For example, HTML
         * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
         *
         * This isn't an abstract method as it needs calling in the constructor, but it is
         * intended to be one.
         */
        scrapeMotionValuesFromProps(_props) {
            return {};
        }
        mount(instance) {
            var _a;
            this.current = instance;
            if (this.projection) {
                this.projection.mount(instance);
            }
            if (this.parent && this.isVariantNode && !this.isControllingVariants) {
                this.removeFromVariantTree = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.addVariantChild(this);
            }
            this.values.forEach((value, key) => this.bindToMotionValue(key, value));
            if (!hasReducedMotionListener.current) {
                initPrefersReducedMotion();
            }
            this.shouldReduceMotion =
                this.reducedMotionConfig === "never"
                    ? false
                    : this.reducedMotionConfig === "always"
                        ? true
                        : prefersReducedMotion.current;
            if (this.parent)
                this.parent.children.add(this);
            this.setProps(this.props);
        }
        unmount() {
            var _a, _b, _c;
            (_a = this.projection) === null || _a === void 0 ? void 0 : _a.unmount();
            cancelSync.update(this.notifyUpdate);
            cancelSync.render(this.render);
            this.valueSubscriptions.forEach((remove) => remove());
            (_b = this.removeFromVariantTree) === null || _b === void 0 ? void 0 : _b.call(this);
            (_c = this.parent) === null || _c === void 0 ? void 0 : _c.children.delete(this);
            for (const key in this.events) {
                this.events[key].clear();
            }
            this.current = null;
        }
        bindToMotionValue(key, value) {
            const valueIsTransform = transformProps.has(key);
            const removeOnChange = value.on("change", (latestValue) => {
                this.latestValues[key] = latestValue;
                this.props.onUpdate &&
                    sync.update(this.notifyUpdate, false, true);
                if (valueIsTransform && this.projection) {
                    this.projection.isTransformDirty = true;
                }
            });
            const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
            this.valueSubscriptions.set(key, () => {
                removeOnChange();
                removeOnRenderRequest();
            });
        }
        sortNodePosition(other) {
            /**
             * If these nodes aren't even of the same type we can't compare their depth.
             */
            if (!this.current ||
                !this.sortInstanceNodePosition ||
                this.type !== other.type)
                return 0;
            return this.sortInstanceNodePosition(this.current, other.current);
        }
        loadFeatures(renderedProps, isStrict, preloadedFeatures, projectionId, ProjectionNodeConstructor, initialLayoutGroupConfig) {
            const features = [];
            for (let i = 0; i < numFeatures; i++) {
                const name = featureNames[i];
                const { isEnabled, Component } = featureDefinitions[name];
                /**
                 * It might be possible in the future to use this moment to
                 * dynamically request functionality. In initial tests this
                 * was producing a lot of duplication amongst bundles.
                 */
                if (isEnabled(renderedProps) && Component) {
                    features.push(React.createElement(Component, {
                        key: name,
                        ...renderedProps,
                        visualElement: this,
                    }));
                }
            }
            if (!this.projection && ProjectionNodeConstructor) {
                this.projection = new ProjectionNodeConstructor(projectionId, this.latestValues, this.parent && this.parent.projection);
                const { layoutId, layout, drag, dragConstraints, layoutScroll } = renderedProps;
                this.projection.setOptions({
                    layoutId,
                    layout,
                    alwaysMeasureLayout: Boolean(drag) ||
                        (dragConstraints && isRefObject(dragConstraints)),
                    visualElement: this,
                    scheduleRender: () => this.scheduleRender(),
                    /**
                     * TODO: Update options in an effect. This could be tricky as it'll be too late
                     * to update by the time layout animations run.
                     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
                     * ensuring it gets called if there's no potential layout animations.
                     *
                     */
                    animationType: typeof layout === "string" ? layout : "both",
                    initialPromotionConfig: initialLayoutGroupConfig,
                    layoutScroll,
                });
            }
            return features;
        }
        triggerBuild() {
            this.build(this.renderState, this.latestValues, this.options, this.props);
        }
        /**
         * Measure the current viewport box with or without transforms.
         * Only measures axis-aligned boxes, rotate and skew must be manually
         * removed with a re-render to work.
         */
        measureViewportBox() {
            return this.current
                ? this.measureInstanceViewportBox(this.current, this.props)
                : createBox();
        }
        getStaticValue(key) {
            return this.latestValues[key];
        }
        setStaticValue(key, value) {
            this.latestValues[key] = value;
        }
        /**
         * Make a target animatable by Popmotion. For instance, if we're
         * trying to animate width from 100px to 100vw we need to measure 100vw
         * in pixels to determine what we really need to animate to. This is also
         * pluggable to support Framer's custom value types like Color,
         * and CSS variables.
         */
        makeTargetAnimatable(target, canMutate = true) {
            return this.makeTargetAnimatableFromInstance(target, this.props, canMutate);
        }
        /**
         * Update the provided props. Ensure any newly-added motion values are
         * added to our map, old ones removed, and listeners updated.
         */
        setProps(props) {
            if (props.transformTemplate || this.props.transformTemplate) {
                this.scheduleRender();
            }
            this.props = props;
            /**
             * Update prop event handlers ie onAnimationStart, onAnimationComplete
             */
            for (let i = 0; i < propEventHandlers.length; i++) {
                const key = propEventHandlers[i];
                if (this.propEventSubscriptions[key]) {
                    this.propEventSubscriptions[key]();
                    delete this.propEventSubscriptions[key];
                }
                const listener = props["on" + key];
                if (listener) {
                    this.propEventSubscriptions[key] = this.on(key, listener);
                }
            }
            this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props), this.prevMotionValues);
        }
        getProps() {
            return this.props;
        }
        /**
         * Returns the variant definition with a given name.
         */
        getVariant(name) {
            var _a;
            return (_a = this.props.variants) === null || _a === void 0 ? void 0 : _a[name];
        }
        /**
         * Returns the defined default transition on this component.
         */
        getDefaultTransition() {
            return this.props.transition;
        }
        getTransformPagePoint() {
            return this.props.transformPagePoint;
        }
        getClosestVariantNode() {
            var _a;
            return this.isVariantNode ? this : (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getClosestVariantNode();
        }
        getVariantContext(startAtParent = false) {
            var _a, _b;
            if (startAtParent)
                return (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getVariantContext();
            if (!this.isControllingVariants) {
                const context = ((_b = this.parent) === null || _b === void 0 ? void 0 : _b.getVariantContext()) || {};
                if (this.props.initial !== undefined) {
                    context.initial = this.props.initial;
                }
                return context;
            }
            const context = {};
            for (let i = 0; i < numVariantProps; i++) {
                const name = variantProps[i];
                const prop = this.props[name];
                if (isVariantLabel(prop) || prop === false) {
                    context[name] = prop;
                }
            }
            return context;
        }
        /**
         * Add a child visual element to our set of children.
         */
        addVariantChild(child) {
            var _a;
            const closestVariantNode = this.getClosestVariantNode();
            if (closestVariantNode) {
                (_a = closestVariantNode.variantChildren) === null || _a === void 0 ? void 0 : _a.add(child);
                return () => closestVariantNode.variantChildren.delete(child);
            }
        }
        /**
         * Add a motion value and bind it to this visual element.
         */
        addValue(key, value) {
            // Remove existing value if it exists
            if (this.hasValue(key))
                this.removeValue(key);
            this.values.set(key, value);
            this.latestValues[key] = value.get();
            this.bindToMotionValue(key, value);
        }
        /**
         * Remove a motion value and unbind any active subscriptions.
         */
        removeValue(key) {
            var _a;
            this.values.delete(key);
            (_a = this.valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
            this.valueSubscriptions.delete(key);
            delete this.latestValues[key];
            this.removeValueFromRenderState(key, this.renderState);
        }
        /**
         * Check whether we have a motion value for this key
         */
        hasValue(key) {
            return this.values.has(key);
        }
        /**
         * Get a motion value for this key. If called with a default
         * value, we'll create one if none exists.
         */
        getValue(key, defaultValue) {
            if (this.props.values && this.props.values[key]) {
                return this.props.values[key];
            }
            let value = this.values.get(key);
            if (value === undefined && defaultValue !== undefined) {
                value = motionValue(defaultValue, { owner: this });
                this.addValue(key, value);
            }
            return value;
        }
        /**
         * If we're trying to animate to a previously unencountered value,
         * we need to check for it in our state and as a last resort read it
         * directly from the instance (which might have performance implications).
         */
        readValue(key) {
            return this.latestValues[key] !== undefined || !this.current
                ? this.latestValues[key]
                : this.readValueFromInstance(this.current, key, this.options);
        }
        /**
         * Set the base target to later animate back to. This is currently
         * only hydrated on creation and when we first read a value.
         */
        setBaseTarget(key, value) {
            this.baseTarget[key] = value;
        }
        /**
         * Find the base target for a value thats been removed from all animation
         * props.
         */
        getBaseTarget(key) {
            var _a;
            const { initial } = this.props;
            const valueFromInitial = typeof initial === "string" || typeof initial === "object"
                ? (_a = resolveVariantFromProps(this.props, initial)) === null || _a === void 0 ? void 0 : _a[key]
                : undefined;
            /**
             * If this value still exists in the current initial variant, read that.
             */
            if (initial && valueFromInitial !== undefined) {
                return valueFromInitial;
            }
            /**
             * Alternatively, if this VisualElement config has defined a getBaseTarget
             * so we can read the value from an alternative source, try that.
             */
            const target = this.getBaseTargetFromProps(this.props, key);
            if (target !== undefined && !isMotionValue(target))
                return target;
            /**
             * If the value was initially defined on initial, but it doesn't any more,
             * return undefined. Otherwise return the value as initially read from the DOM.
             */
            return this.initialValues[key] !== undefined &&
                valueFromInitial === undefined
                ? undefined
                : this.baseTarget[key];
        }
        on(eventName, callback) {
            if (!this.events[eventName]) {
                this.events[eventName] = new SubscriptionManager();
            }
            return this.events[eventName].add(callback);
        }
        notify(eventName, ...args) {
            var _a;
            (_a = this.events[eventName]) === null || _a === void 0 ? void 0 : _a.notify(...args);
        }
    }
    const variantProps = ["initial", ...variantPriorityOrder];
    const numVariantProps = variantProps.length;

    class DOMVisualElement extends VisualElement {
        sortInstanceNodePosition(a, b) {
            /**
             * compareDocumentPosition returns a bitmask, by using the bitwise &
             * we're returning true if 2 in that bitmask is set to true. 2 is set
             * to true if b preceeds a.
             */
            return a.compareDocumentPosition(b) & 2 ? 1 : -1;
        }
        getBaseTargetFromProps(props, key) {
            var _a;
            return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
        }
        removeValueFromRenderState(key, { vars, style }) {
            delete vars[key];
            delete style[key];
        }
        makeTargetAnimatableFromInstance({ transition, transitionEnd, ...target }, { transformValues }, isMounted) {
            let origin = getOrigin(target, transition || {}, this);
            /**
             * If Framer has provided a function to convert `Color` etc value types, convert them
             */
            if (transformValues) {
                if (transitionEnd)
                    transitionEnd = transformValues(transitionEnd);
                if (target)
                    target = transformValues(target);
                if (origin)
                    origin = transformValues(origin);
            }
            if (isMounted) {
                checkTargetForNewValues(this, target, origin);
                const parsed = parseDomVariant(this, target, origin, transitionEnd);
                transitionEnd = parsed.transitionEnd;
                target = parsed.target;
            }
            return {
                transition,
                transitionEnd,
                ...target,
            };
        }
    }

    function getComputedStyle$1(element) {
        return window.getComputedStyle(element);
    }
    class HTMLVisualElement extends DOMVisualElement {
        readValueFromInstance(instance, key) {
            if (transformProps.has(key)) {
                const defaultType = getDefaultValueType(key);
                return defaultType ? defaultType.default || 0 : 0;
            }
            else {
                const computedStyle = getComputedStyle$1(instance);
                const value = (isCSSVariable$1(key)
                    ? computedStyle.getPropertyValue(key)
                    : computedStyle[key]) || 0;
                return typeof value === "string" ? value.trim() : value;
            }
        }
        measureInstanceViewportBox(instance, { transformPagePoint }) {
            return measureViewportBox(instance, transformPagePoint);
        }
        build(renderState, latestValues, options, props) {
            buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
        }
        scrapeMotionValuesFromProps(props) {
            return scrapeMotionValuesFromProps$1(props);
        }
        renderInstance(instance, renderState, styleProp, projection) {
            renderHTML(instance, renderState, styleProp, projection);
        }
    }

    class SVGVisualElement extends DOMVisualElement {
        constructor() {
            super(...arguments);
            this.isSVGTag = false;
        }
        getBaseTargetFromProps(props, key) {
            return props[key];
        }
        readValueFromInstance(instance, key) {
            var _a;
            if (transformProps.has(key)) {
                return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
            }
            key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
            return instance.getAttribute(key);
        }
        measureInstanceViewportBox() {
            return createBox();
        }
        scrapeMotionValuesFromProps(props) {
            return scrapeMotionValuesFromProps(props);
        }
        build(renderState, latestValues, options, props) {
            buildSVGAttrs(renderState, latestValues, options, this.isSVGTag, props.transformTemplate);
        }
        renderInstance(instance, renderState, styleProp, projection) {
            renderSVG(instance, renderState, styleProp, projection);
        }
        mount(instance) {
            this.isSVGTag = isSVGTag(instance.tagName);
            super.mount(instance);
        }
    }

    const createDomVisualElement = (Component, options) => {
        return isSVGComponent(Component)
            ? new SVGVisualElement(options, { enableHardwareAcceleration: false })
            : new HTMLVisualElement(options, { enableHardwareAcceleration: true });
    };

    function pixelsToPercent(pixels, axis) {
        if (axis.max === axis.min)
            return 0;
        return (pixels / (axis.max - axis.min)) * 100;
    }
    /**
     * We always correct borderRadius as a percentage rather than pixels to reduce paints.
     * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
     * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
     * borderRadius in both states. If we animate between the two in pixels that will trigger
     * a paint each time. If we animate between the two in percentage we'll avoid a paint.
     */
    const correctBorderRadius = {
        correct: (latest, node) => {
            if (!node.target)
                return latest;
            /**
             * If latest is a string, if it's a percentage we can return immediately as it's
             * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
             */
            if (typeof latest === "string") {
                if (px.test(latest)) {
                    latest = parseFloat(latest);
                }
                else {
                    return latest;
                }
            }
            /**
             * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
             * pixel value as a percentage of each axis
             */
            const x = pixelsToPercent(latest, node.target.x);
            const y = pixelsToPercent(latest, node.target.y);
            return `${x}% ${y}%`;
        },
    };

    const varToken = "_$css";
    const correctBoxShadow = {
        correct: (latest, { treeScale, projectionDelta }) => {
            const original = latest;
            /**
             * We need to first strip and store CSS variables from the string.
             */
            const containsCSSVariables = latest.includes("var(");
            const cssVariables = [];
            if (containsCSSVariables) {
                latest = latest.replace(cssVariableRegex, (match) => {
                    cssVariables.push(match);
                    return varToken;
                });
            }
            const shadow = complex.parse(latest);
            // TODO: Doesn't support multiple shadows
            if (shadow.length > 5)
                return original;
            const template = complex.createTransformer(latest);
            const offset = typeof shadow[0] !== "number" ? 1 : 0;
            // Calculate the overall context scale
            const xScale = projectionDelta.x.scale * treeScale.x;
            const yScale = projectionDelta.y.scale * treeScale.y;
            shadow[0 + offset] /= xScale;
            shadow[1 + offset] /= yScale;
            /**
             * Ideally we'd correct x and y scales individually, but because blur and
             * spread apply to both we have to take a scale average and apply that instead.
             * We could potentially improve the outcome of this by incorporating the ratio between
             * the two scales.
             */
            const averageScale = mix(xScale, yScale, 0.5);
            // Blur
            if (typeof shadow[2 + offset] === "number")
                shadow[2 + offset] /= averageScale;
            // Spread
            if (typeof shadow[3 + offset] === "number")
                shadow[3 + offset] /= averageScale;
            let output = template(shadow);
            if (containsCSSVariables) {
                let i = 0;
                output = output.replace(varToken, () => {
                    const cssVariable = cssVariables[i];
                    i++;
                    return cssVariable;
                });
            }
            return output;
        },
    };

    class MeasureLayoutWithContext extends React__default["default"].Component {
        /**
         * This only mounts projection nodes for components that
         * need measuring, we might want to do it for all components
         * in order to incorporate transforms
         */
        componentDidMount() {
            const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
            const { projection } = visualElement;
            addScaleCorrector(defaultScaleCorrectors);
            if (projection) {
                if (layoutGroup.group)
                    layoutGroup.group.add(projection);
                if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
                    switchLayoutGroup.register(projection);
                }
                projection.root.didUpdate();
                projection.addEventListener("animationComplete", () => {
                    this.safeToRemove();
                });
                projection.setOptions({
                    ...projection.options,
                    onExitComplete: () => this.safeToRemove(),
                });
            }
            globalProjectionState.hasEverUpdated = true;
        }
        getSnapshotBeforeUpdate(prevProps) {
            const { layoutDependency, visualElement, drag, isPresent } = this.props;
            const projection = visualElement.projection;
            if (!projection)
                return null;
            /**
             * TODO: We use this data in relegate to determine whether to
             * promote a previous element. There's no guarantee its presence data
             * will have updated by this point - if a bug like this arises it will
             * have to be that we markForRelegation and then find a new lead some other way,
             * perhaps in didUpdate
             */
            projection.isPresent = isPresent;
            if (drag ||
                prevProps.layoutDependency !== layoutDependency ||
                layoutDependency === undefined) {
                projection.willUpdate();
            }
            else {
                this.safeToRemove();
            }
            if (prevProps.isPresent !== isPresent) {
                if (isPresent) {
                    projection.promote();
                }
                else if (!projection.relegate()) {
                    /**
                     * If there's another stack member taking over from this one,
                     * it's in charge of the exit animation and therefore should
                     * be in charge of the safe to remove. Otherwise we call it here.
                     */
                    sync.postRender(() => {
                        var _a;
                        if (!((_a = projection.getStack()) === null || _a === void 0 ? void 0 : _a.members.length)) {
                            this.safeToRemove();
                        }
                    });
                }
            }
            return null;
        }
        componentDidUpdate() {
            const { projection } = this.props.visualElement;
            if (projection) {
                projection.root.didUpdate();
                if (!projection.currentAnimation && projection.isLead()) {
                    this.safeToRemove();
                }
            }
        }
        componentWillUnmount() {
            const { visualElement, layoutGroup, switchLayoutGroup: promoteContext, } = this.props;
            const { projection } = visualElement;
            if (projection) {
                projection.scheduleCheckAfterUnmount();
                if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
                    layoutGroup.group.remove(projection);
                if (promoteContext === null || promoteContext === void 0 ? void 0 : promoteContext.deregister)
                    promoteContext.deregister(projection);
            }
        }
        safeToRemove() {
            const { safeToRemove } = this.props;
            safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove();
        }
        render() {
            return null;
        }
    }
    function MeasureLayout(props) {
        const [isPresent, safeToRemove] = usePresence();
        const layoutGroup = React.useContext(LayoutGroupContext);
        return (React__default["default"].createElement(MeasureLayoutWithContext, { ...props, layoutGroup: layoutGroup, switchLayoutGroup: React.useContext(SwitchLayoutGroupContext), isPresent: isPresent, safeToRemove: safeToRemove }));
    }
    const defaultScaleCorrectors = {
        borderRadius: {
            ...correctBorderRadius,
            applyTo: [
                "borderTopLeftRadius",
                "borderTopRightRadius",
                "borderBottomLeftRadius",
                "borderBottomRightRadius",
            ],
        },
        borderTopLeftRadius: correctBorderRadius,
        borderTopRightRadius: correctBorderRadius,
        borderBottomLeftRadius: correctBorderRadius,
        borderBottomRightRadius: correctBorderRadius,
        boxShadow: correctBoxShadow,
    };

    const layoutFeatures = {
        measureLayout: MeasureLayout,
    };

    /**
     * Animate a single value or a `MotionValue`.
     *
     * The first argument is either a `MotionValue` to animate, or an initial animation value.
     *
     * The second is either a value to animate to, or an array of keyframes to animate through.
     *
     * The third argument can be either tween or spring options, and optional lifecycle methods: `onUpdate`, `onPlay`, `onComplete`, `onRepeat` and `onStop`.
     *
     * Returns `AnimationPlaybackControls`, currently just a `stop` method.
     *
     * ```javascript
     * const x = useMotionValue(0)
     *
     * useEffect(() => {
     *   const controls = animate(x, 100, {
     *     type: "spring",
     *     stiffness: 2000,
     *     onComplete: v => {}
     *   })
     *
     *   return controls.stop
     * })
     * ```
     *
     * @public
     */
    function animate(from, to, transition = {}) {
        const value = isMotionValue(from) ? from : motionValue(from);
        value.start(createMotionValueAnimation("", value, to, transition));
        return {
            stop: () => value.stop(),
            isAnimating: () => value.isAnimating(),
        };
    }

    const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
    const numBorders = borders.length;
    const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
    const isPx = (value) => typeof value === "number" || px.test(value);
    function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
        if (shouldCrossfadeOpacity) {
            target.opacity = mix(0, 
            // TODO Reinstate this if only child
            lead.opacity !== undefined ? lead.opacity : 1, easeCrossfadeIn(progress));
            target.opacityExit = mix(follow.opacity !== undefined ? follow.opacity : 1, 0, easeCrossfadeOut(progress));
        }
        else if (isOnlyMember) {
            target.opacity = mix(follow.opacity !== undefined ? follow.opacity : 1, lead.opacity !== undefined ? lead.opacity : 1, progress);
        }
        /**
         * Mix border radius
         */
        for (let i = 0; i < numBorders; i++) {
            const borderLabel = `border${borders[i]}Radius`;
            let followRadius = getRadius(follow, borderLabel);
            let leadRadius = getRadius(lead, borderLabel);
            if (followRadius === undefined && leadRadius === undefined)
                continue;
            followRadius || (followRadius = 0);
            leadRadius || (leadRadius = 0);
            const canMix = followRadius === 0 ||
                leadRadius === 0 ||
                isPx(followRadius) === isPx(leadRadius);
            if (canMix) {
                target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress), 0);
                if (percent.test(leadRadius) || percent.test(followRadius)) {
                    target[borderLabel] += "%";
                }
            }
            else {
                target[borderLabel] = leadRadius;
            }
        }
        /**
         * Mix rotation
         */
        if (follow.rotate || lead.rotate) {
            target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress);
        }
    }
    function getRadius(values, radiusName) {
        return values[radiusName] !== undefined
            ? values[radiusName]
            : values.borderRadius;
    }
    // /**
    //  * We only want to mix the background color if there's a follow element
    //  * that we're not crossfading opacity between. For instance with switch
    //  * AnimateSharedLayout animations, this helps the illusion of a continuous
    //  * element being animated but also cuts down on the number of paints triggered
    //  * for elements where opacity is doing that work for us.
    //  */
    // if (
    //     !hasFollowElement &&
    //     latestLeadValues.backgroundColor &&
    //     latestFollowValues.backgroundColor
    // ) {
    //     /**
    //      * This isn't ideal performance-wise as mixColor is creating a new function every frame.
    //      * We could probably create a mixer that runs at the start of the animation but
    //      * the idea behind the crossfader is that it runs dynamically between two potentially
    //      * changing targets (ie opacity or borderRadius may be animating independently via variants)
    //      */
    //     leadState.backgroundColor = followState.backgroundColor = mixColor(
    //         latestFollowValues.backgroundColor as string,
    //         latestLeadValues.backgroundColor as string
    //     )(p)
    // }
    const easeCrossfadeIn = compress(0, 0.5, circOut);
    const easeCrossfadeOut = compress(0.5, 0.95, noop);
    function compress(min, max, easing) {
        return (p) => {
            // Could replace ifs with clamp
            if (p < min)
                return 0;
            if (p > max)
                return 1;
            return easing(progress(min, max, p));
        };
    }

    /**
     * Reset an axis to the provided origin box.
     *
     * This is a mutative operation.
     */
    function copyAxisInto(axis, originAxis) {
        axis.min = originAxis.min;
        axis.max = originAxis.max;
    }
    /**
     * Reset a box to the provided origin box.
     *
     * This is a mutative operation.
     */
    function copyBoxInto(box, originBox) {
        copyAxisInto(box.x, originBox.x);
        copyAxisInto(box.y, originBox.y);
    }

    /**
     * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
     */
    function removePointDelta(point, translate, scale, originPoint, boxScale) {
        point -= translate;
        point = scalePoint(point, 1 / scale, originPoint);
        if (boxScale !== undefined) {
            point = scalePoint(point, 1 / boxScale, originPoint);
        }
        return point;
    }
    /**
     * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
     */
    function removeAxisDelta(axis, translate = 0, scale = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
        if (percent.test(translate)) {
            translate = parseFloat(translate);
            const relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
            translate = relativeProgress - sourceAxis.min;
        }
        if (typeof translate !== "number")
            return;
        let originPoint = mix(originAxis.min, originAxis.max, origin);
        if (axis === originAxis)
            originPoint -= translate;
        axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
        axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
    }
    /**
     * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
     * and acts as a bridge between motion values and removeAxisDelta
     */
    function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
        removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
    }
    /**
     * The names of the motion values we want to apply as translation, scale and origin.
     */
    const xKeys = ["x", "scaleX", "originX"];
    const yKeys = ["y", "scaleY", "originY"];
    /**
     * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
     * and acts as a bridge between motion values and removeAxisDelta
     */
    function removeBoxTransforms(box, transforms, originBox, sourceBox) {
        removeAxisTransforms(box.x, transforms, xKeys, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
        removeAxisTransforms(box.y, transforms, yKeys, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
    }

    function isAxisDeltaZero(delta) {
        return delta.translate === 0 && delta.scale === 1;
    }
    function isDeltaZero(delta) {
        return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
    }
    function boxEquals(a, b) {
        return (a.x.min === b.x.min &&
            a.x.max === b.x.max &&
            a.y.min === b.y.min &&
            a.y.max === b.y.max);
    }
    function aspectRatio(box) {
        return calcLength(box.x) / calcLength(box.y);
    }

    class NodeStack {
        constructor() {
            this.members = [];
        }
        add(node) {
            addUniqueItem(this.members, node);
            node.scheduleRender();
        }
        remove(node) {
            removeItem(this.members, node);
            if (node === this.prevLead) {
                this.prevLead = undefined;
            }
            if (node === this.lead) {
                const prevLead = this.members[this.members.length - 1];
                if (prevLead) {
                    this.promote(prevLead);
                }
            }
        }
        relegate(node) {
            const indexOfNode = this.members.findIndex((member) => node === member);
            if (indexOfNode === 0)
                return false;
            /**
             * Find the next projection node that is present
             */
            let prevLead;
            for (let i = indexOfNode; i >= 0; i--) {
                const member = this.members[i];
                if (member.isPresent !== false) {
                    prevLead = member;
                    break;
                }
            }
            if (prevLead) {
                this.promote(prevLead);
                return true;
            }
            else {
                return false;
            }
        }
        promote(node, preserveFollowOpacity) {
            var _a;
            const prevLead = this.lead;
            if (node === prevLead)
                return;
            this.prevLead = prevLead;
            this.lead = node;
            node.show();
            if (prevLead) {
                prevLead.instance && prevLead.scheduleRender();
                node.scheduleRender();
                node.resumeFrom = prevLead;
                if (preserveFollowOpacity) {
                    node.resumeFrom.preserveOpacity = true;
                }
                if (prevLead.snapshot) {
                    node.snapshot = prevLead.snapshot;
                    node.snapshot.latestValues =
                        prevLead.animationValues || prevLead.latestValues;
                }
                if ((_a = node.root) === null || _a === void 0 ? void 0 : _a.isUpdating) {
                    node.isLayoutDirty = true;
                }
                const { crossfade } = node.options;
                if (crossfade === false) {
                    prevLead.hide();
                }
                /**
                 * TODO:
                 *   - Test border radius when previous node was deleted
                 *   - boxShadow mixing
                 *   - Shared between element A in scrolled container and element B (scroll stays the same or changes)
                 *   - Shared between element A in transformed container and element B (transform stays the same or changes)
                 *   - Shared between element A in scrolled page and element B (scroll stays the same or changes)
                 * ---
                 *   - Crossfade opacity of root nodes
                 *   - layoutId changes after animation
                 *   - layoutId changes mid animation
                 */
            }
        }
        exitAnimationComplete() {
            this.members.forEach((node) => {
                var _a, _b, _c, _d, _e;
                (_b = (_a = node.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
                (_e = (_c = node.resumingFrom) === null || _c === void 0 ? void 0 : (_d = _c.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d);
            });
        }
        scheduleRender() {
            this.members.forEach((node) => {
                node.instance && node.scheduleRender(false);
            });
        }
        /**
         * Clear any leads that have been removed this render to prevent them from being
         * used in future animations and to prevent memory leaks
         */
        removeLeadSnapshot() {
            if (this.lead && this.lead.snapshot) {
                this.lead.snapshot = undefined;
            }
        }
    }

    function buildProjectionTransform(delta, treeScale, latestTransform) {
        let transform = "";
        /**
         * The translations we use to calculate are always relative to the viewport coordinate space.
         * But when we apply scales, we also scale the coordinate space of an element and its children.
         * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
         * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
         */
        const xTranslate = delta.x.translate / treeScale.x;
        const yTranslate = delta.y.translate / treeScale.y;
        if (xTranslate || yTranslate) {
            transform = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
        }
        /**
         * Apply scale correction for the tree transform.
         * This will apply scale to the screen-orientated axes.
         */
        if (treeScale.x !== 1 || treeScale.y !== 1) {
            transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
        }
        if (latestTransform) {
            const { rotate, rotateX, rotateY } = latestTransform;
            if (rotate)
                transform += `rotate(${rotate}deg) `;
            if (rotateX)
                transform += `rotateX(${rotateX}deg) `;
            if (rotateY)
                transform += `rotateY(${rotateY}deg) `;
        }
        /**
         * Apply scale to match the size of the element to the size we want it.
         * This will apply scale to the element-orientated axes.
         */
        const elementScaleX = delta.x.scale * treeScale.x;
        const elementScaleY = delta.y.scale * treeScale.y;
        if (elementScaleX !== 1 || elementScaleY !== 1) {
            transform += `scale(${elementScaleX}, ${elementScaleY})`;
        }
        return transform || "none";
    }

    const compareByDepth = (a, b) => a.depth - b.depth;

    class FlatTree {
        constructor() {
            this.children = [];
            this.isDirty = false;
        }
        add(child) {
            addUniqueItem(this.children, child);
            this.isDirty = true;
        }
        remove(child) {
            removeItem(this.children, child);
            this.isDirty = true;
        }
        forEach(callback) {
            this.isDirty && this.children.sort(compareByDepth);
            this.isDirty = false;
            this.children.forEach(callback);
        }
    }

    const transformAxes = ["", "X", "Y", "Z"];
    /**
     * We use 1000 as the animation target as 0-1000 maps better to pixels than 0-1
     * which has a noticeable difference in spring animations
     */
    const animationTarget = 1000;
    let id = 0;
    function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform, }) {
        return class ProjectionNode {
            constructor(elementId, latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
                /**
                 * A unique ID generated for every projection node.
                 */
                this.id = id++;
                /**
                 * An id that represents a unique session instigated by startUpdate.
                 */
                this.animationId = 0;
                /**
                 * A Set containing all this component's children. This is used to iterate
                 * through the children.
                 *
                 * TODO: This could be faster to iterate as a flat array stored on the root node.
                 */
                this.children = new Set();
                /**
                 * Options for the node. We use this to configure what kind of layout animations
                 * we should perform (if any).
                 */
                this.options = {};
                /**
                 * We use this to detect when its safe to shut down part of a projection tree.
                 * We have to keep projecting children for scale correction and relative projection
                 * until all their parents stop performing layout animations.
                 */
                this.isTreeAnimating = false;
                this.isAnimationBlocked = false;
                /**
                 * Flag to true if we think this layout has been changed. We can't always know this,
                 * currently we set it to true every time a component renders, or if it has a layoutDependency
                 * if that has changed between renders. Additionally, components can be grouped by LayoutGroup
                 * and if one node is dirtied, they all are.
                 */
                this.isLayoutDirty = false;
                this.isTransformDirty = false;
                /**
                 * Flag to true if we think the projection calculations for this or any
                 * child might need recalculating as a result of an updated transform or layout animation.
                 */
                this.isProjectionDirty = false;
                /**
                 * Block layout updates for instant layout transitions throughout the tree.
                 */
                this.updateManuallyBlocked = false;
                this.updateBlockedByResize = false;
                /**
                 * Set to true between the start of the first `willUpdate` call and the end of the `didUpdate`
                 * call.
                 */
                this.isUpdating = false;
                /**
                 * If this is an SVG element we currently disable projection transforms
                 */
                this.isSVG = false;
                /**
                 * Flag to true (during promotion) if a node doing an instant layout transition needs to reset
                 * its projection styles.
                 */
                this.needsReset = false;
                /**
                 * Flags whether this node should have its transform reset prior to measuring.
                 */
                this.shouldResetTransform = false;
                /**
                 * An object representing the calculated contextual/accumulated/tree scale.
                 * This will be used to scale calculcated projection transforms, as these are
                 * calculated in screen-space but need to be scaled for elements to layoutly
                 * make it to their calculated destinations.
                 *
                 * TODO: Lazy-init
                 */
                this.treeScale = { x: 1, y: 1 };
                /**
                 *
                 */
                this.eventHandlers = new Map();
                // Note: Currently only running on root node
                this.potentialNodes = new Map();
                this.checkUpdateFailed = () => {
                    if (this.isUpdating) {
                        this.isUpdating = false;
                        this.clearAllSnapshots();
                    }
                };
                /**
                 * This is a multi-step process as shared nodes might be of different depths. Nodes
                 * are sorted by depth order, so we need to resolve the entire tree before moving to
                 * the next step.
                 */
                this.updateProjection = () => {
                    this.nodes.forEach(propagateDirtyNodes);
                    this.nodes.forEach(resolveTargetDelta);
                    this.nodes.forEach(calcProjection);
                };
                this.hasProjected = false;
                this.isVisible = true;
                this.animationProgress = 0;
                /**
                 * Shared layout
                 */
                // TODO Only running on root node
                this.sharedNodes = new Map();
                this.elementId = elementId;
                this.latestValues = latestValues;
                this.root = parent ? parent.root || parent : this;
                this.path = parent ? [...parent.path, parent] : [];
                this.parent = parent;
                this.depth = parent ? parent.depth + 1 : 0;
                elementId && this.root.registerPotentialNode(elementId, this);
                for (let i = 0; i < this.path.length; i++) {
                    this.path[i].shouldResetTransform = true;
                }
                if (this.root === this)
                    this.nodes = new FlatTree();
            }
            addEventListener(name, handler) {
                if (!this.eventHandlers.has(name)) {
                    this.eventHandlers.set(name, new SubscriptionManager());
                }
                return this.eventHandlers.get(name).add(handler);
            }
            notifyListeners(name, ...args) {
                const subscriptionManager = this.eventHandlers.get(name);
                subscriptionManager === null || subscriptionManager === void 0 ? void 0 : subscriptionManager.notify(...args);
            }
            hasListeners(name) {
                return this.eventHandlers.has(name);
            }
            registerPotentialNode(elementId, node) {
                this.potentialNodes.set(elementId, node);
            }
            /**
             * Lifecycles
             */
            mount(instance, isLayoutDirty = false) {
                var _a;
                if (this.instance)
                    return;
                this.isSVG =
                    instance instanceof SVGElement && instance.tagName !== "svg";
                this.instance = instance;
                const { layoutId, layout, visualElement } = this.options;
                if (visualElement && !visualElement.current) {
                    visualElement.mount(instance);
                }
                this.root.nodes.add(this);
                (_a = this.parent) === null || _a === void 0 ? void 0 : _a.children.add(this);
                this.elementId && this.root.potentialNodes.delete(this.elementId);
                if (isLayoutDirty && (layout || layoutId)) {
                    this.isLayoutDirty = true;
                }
                if (attachResizeListener) {
                    let cancelDelay;
                    const resizeUnblockUpdate = () => (this.root.updateBlockedByResize = false);
                    attachResizeListener(instance, () => {
                        this.root.updateBlockedByResize = true;
                        cancelDelay && cancelDelay();
                        cancelDelay = delay(resizeUnblockUpdate, 250);
                        if (globalProjectionState.hasAnimatedSinceResize) {
                            globalProjectionState.hasAnimatedSinceResize = false;
                            this.nodes.forEach(finishAnimation);
                        }
                    });
                }
                if (layoutId) {
                    this.root.registerSharedNode(layoutId, this);
                }
                // Only register the handler if it requires layout animation
                if (this.options.animate !== false &&
                    visualElement &&
                    (layoutId || layout)) {
                    this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout, }) => {
                        var _a, _b, _c, _d, _e;
                        if (this.isTreeAnimationBlocked()) {
                            this.target = undefined;
                            this.relativeTarget = undefined;
                            return;
                        }
                        // TODO: Check here if an animation exists
                        const layoutTransition = (_b = (_a = this.options.transition) !== null && _a !== void 0 ? _a : visualElement.getDefaultTransition()) !== null && _b !== void 0 ? _b : defaultLayoutTransition;
                        const { onLayoutAnimationStart, onLayoutAnimationComplete, } = visualElement.getProps();
                        /**
                         * The target layout of the element might stay the same,
                         * but its position relative to its parent has changed.
                         */
                        const targetChanged = !this.targetLayout ||
                            !boxEquals(this.targetLayout, newLayout) ||
                            hasRelativeTargetChanged;
                        /**
                         * If the layout hasn't seemed to have changed, it might be that the
                         * element is visually in the same place in the document but its position
                         * relative to its parent has indeed changed. So here we check for that.
                         */
                        const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
                        if (((_c = this.resumeFrom) === null || _c === void 0 ? void 0 : _c.instance) ||
                            hasOnlyRelativeTargetChanged ||
                            (hasLayoutChanged &&
                                (targetChanged || !this.currentAnimation))) {
                            if (this.resumeFrom) {
                                this.resumingFrom = this.resumeFrom;
                                this.resumingFrom.resumingFrom = undefined;
                            }
                            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
                            const animationOptions = {
                                ...getValueTransition(layoutTransition, "layout"),
                                onPlay: onLayoutAnimationStart,
                                onComplete: onLayoutAnimationComplete,
                            };
                            if (visualElement.shouldReduceMotion) {
                                animationOptions.delay = 0;
                                animationOptions.type = false;
                            }
                            this.startAnimation(animationOptions);
                        }
                        else {
                            /**
                             * If the layout hasn't changed and we have an animation that hasn't started yet,
                             * finish it immediately. Otherwise it will be animating from a location
                             * that was probably never commited to screen and look like a jumpy box.
                             */
                            if (!hasLayoutChanged &&
                                this.animationProgress === 0) {
                                finishAnimation(this);
                            }
                            this.isLead() && ((_e = (_d = this.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d));
                        }
                        this.targetLayout = newLayout;
                    });
                }
            }
            unmount() {
                var _a, _b;
                this.options.layoutId && this.willUpdate();
                this.root.nodes.remove(this);
                (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.remove(this);
                (_b = this.parent) === null || _b === void 0 ? void 0 : _b.children.delete(this);
                this.instance = undefined;
                cancelSync.preRender(this.updateProjection);
            }
            // only on the root
            blockUpdate() {
                this.updateManuallyBlocked = true;
            }
            unblockUpdate() {
                this.updateManuallyBlocked = false;
            }
            isUpdateBlocked() {
                return this.updateManuallyBlocked || this.updateBlockedByResize;
            }
            isTreeAnimationBlocked() {
                var _a;
                return (this.isAnimationBlocked ||
                    ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimationBlocked()) ||
                    false);
            }
            // Note: currently only running on root node
            startUpdate() {
                var _a;
                if (this.isUpdateBlocked())
                    return;
                this.isUpdating = true;
                (_a = this.nodes) === null || _a === void 0 ? void 0 : _a.forEach(resetRotation);
                this.animationId++;
            }
            willUpdate(shouldNotifyListeners = true) {
                var _a, _b, _c;
                if (this.root.isUpdateBlocked()) {
                    (_b = (_a = this.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
                    return;
                }
                !this.root.isUpdating && this.root.startUpdate();
                if (this.isLayoutDirty)
                    return;
                this.isLayoutDirty = true;
                for (let i = 0; i < this.path.length; i++) {
                    const node = this.path[i];
                    node.shouldResetTransform = true;
                    node.updateScroll("snapshot");
                }
                const { layoutId, layout } = this.options;
                if (layoutId === undefined && !layout)
                    return;
                const transformTemplate = (_c = this.options.visualElement) === null || _c === void 0 ? void 0 : _c.getProps().transformTemplate;
                this.prevTransformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
                this.updateSnapshot();
                shouldNotifyListeners && this.notifyListeners("willUpdate");
            }
            // Note: Currently only running on root node
            didUpdate() {
                const updateWasBlocked = this.isUpdateBlocked();
                // When doing an instant transition, we skip the layout update,
                // but should still clean up the measurements so that the next
                // snapshot could be taken correctly.
                if (updateWasBlocked) {
                    this.unblockUpdate();
                    this.clearAllSnapshots();
                    this.nodes.forEach(clearMeasurements);
                    return;
                }
                if (!this.isUpdating)
                    return;
                this.isUpdating = false;
                /**
                 * Search for and mount newly-added projection elements.
                 *
                 * TODO: Every time a new component is rendered we could search up the tree for
                 * the closest mounted node and query from there rather than document.
                 */
                if (this.potentialNodes.size) {
                    this.potentialNodes.forEach(mountNodeEarly);
                    this.potentialNodes.clear();
                }
                /**
                 * Write
                 */
                this.nodes.forEach(resetTransformStyle);
                /**
                 * Read ==================
                 */
                // Update layout measurements of updated children
                this.nodes.forEach(updateLayout);
                /**
                 * Write
                 */
                // Notify listeners that the layout is updated
                this.nodes.forEach(notifyLayoutUpdate);
                this.clearAllSnapshots();
                // Flush any scheduled updates
                flushSync.update();
                flushSync.preRender();
                flushSync.render();
            }
            clearAllSnapshots() {
                this.nodes.forEach(clearSnapshot);
                this.sharedNodes.forEach(removeLeadSnapshots);
            }
            scheduleUpdateProjection() {
                sync.preRender(this.updateProjection, false, true);
            }
            scheduleCheckAfterUnmount() {
                /**
                 * If the unmounting node is in a layoutGroup and did trigger a willUpdate,
                 * we manually call didUpdate to give a chance to the siblings to animate.
                 * Otherwise, cleanup all snapshots to prevents future nodes from reusing them.
                 */
                sync.postRender(() => {
                    if (this.isLayoutDirty) {
                        this.root.didUpdate();
                    }
                    else {
                        this.root.checkUpdateFailed();
                    }
                });
            }
            /**
             * Update measurements
             */
            updateSnapshot() {
                if (this.snapshot || !this.instance)
                    return;
                this.snapshot = this.measure();
            }
            updateLayout() {
                var _a;
                if (!this.instance)
                    return;
                // TODO: Incorporate into a forwarded scroll offset
                this.updateScroll();
                if (!(this.options.alwaysMeasureLayout && this.isLead()) &&
                    !this.isLayoutDirty) {
                    return;
                }
                /**
                 * When a node is mounted, it simply resumes from the prevLead's
                 * snapshot instead of taking a new one, but the ancestors scroll
                 * might have updated while the prevLead is unmounted. We need to
                 * update the scroll again to make sure the layout we measure is
                 * up to date.
                 */
                if (this.resumeFrom && !this.resumeFrom.instance) {
                    for (let i = 0; i < this.path.length; i++) {
                        const node = this.path[i];
                        node.updateScroll();
                    }
                }
                const prevLayout = this.layout;
                this.layout = this.measure(false);
                this.layoutCorrected = createBox();
                this.isLayoutDirty = false;
                this.projectionDelta = undefined;
                this.notifyListeners("measure", this.layout.layoutBox);
                (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.notify("LayoutMeasure", this.layout.layoutBox, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.layoutBox);
            }
            updateScroll(phase = "measure") {
                let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
                if (this.scroll &&
                    this.scroll.animationId === this.root.animationId &&
                    this.scroll.phase === phase) {
                    needsMeasurement = false;
                }
                if (needsMeasurement) {
                    this.scroll = {
                        animationId: this.root.animationId,
                        phase,
                        isRoot: checkIsScrollRoot(this.instance),
                        offset: measureScroll(this.instance),
                    };
                }
            }
            resetTransform() {
                var _a;
                if (!resetTransform)
                    return;
                const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
                const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
                const transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
                const transformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
                const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
                if (isResetRequested &&
                    (hasProjection ||
                        hasTransform(this.latestValues) ||
                        transformTemplateHasChanged)) {
                    resetTransform(this.instance, transformTemplateValue);
                    this.shouldResetTransform = false;
                    this.scheduleRender();
                }
            }
            measure(removeTransform = true) {
                const pageBox = this.measurePageBox();
                let layoutBox = this.removeElementScroll(pageBox);
                /**
                 * Measurements taken during the pre-render stage
                 * still have transforms applied so we remove them
                 * via calculation.
                 */
                if (removeTransform) {
                    layoutBox = this.removeTransform(layoutBox);
                }
                roundBox(layoutBox);
                return {
                    animationId: this.root.animationId,
                    measuredBox: pageBox,
                    layoutBox,
                    latestValues: {},
                    source: this.id,
                };
            }
            measurePageBox() {
                const { visualElement } = this.options;
                if (!visualElement)
                    return createBox();
                const box = visualElement.measureViewportBox();
                // Remove viewport scroll to give page-relative coordinates
                const { scroll } = this.root;
                if (scroll) {
                    translateAxis(box.x, scroll.offset.x);
                    translateAxis(box.y, scroll.offset.y);
                }
                return box;
            }
            removeElementScroll(box) {
                const boxWithoutScroll = createBox();
                copyBoxInto(boxWithoutScroll, box);
                /**
                 * Performance TODO: Keep a cumulative scroll offset down the tree
                 * rather than loop back up the path.
                 */
                for (let i = 0; i < this.path.length; i++) {
                    const node = this.path[i];
                    const { scroll, options } = node;
                    if (node !== this.root && scroll && options.layoutScroll) {
                        /**
                         * If this is a new scroll root, we want to remove all previous scrolls
                         * from the viewport box.
                         */
                        if (scroll.isRoot) {
                            copyBoxInto(boxWithoutScroll, box);
                            const { scroll: rootScroll } = this.root;
                            /**
                             * Undo the application of page scroll that was originally added
                             * to the measured bounding box.
                             */
                            if (rootScroll) {
                                translateAxis(boxWithoutScroll.x, -rootScroll.offset.x);
                                translateAxis(boxWithoutScroll.y, -rootScroll.offset.y);
                            }
                        }
                        translateAxis(boxWithoutScroll.x, scroll.offset.x);
                        translateAxis(boxWithoutScroll.y, scroll.offset.y);
                    }
                }
                return boxWithoutScroll;
            }
            applyTransform(box, transformOnly = false) {
                const withTransforms = createBox();
                copyBoxInto(withTransforms, box);
                for (let i = 0; i < this.path.length; i++) {
                    const node = this.path[i];
                    if (!transformOnly &&
                        node.options.layoutScroll &&
                        node.scroll &&
                        node !== node.root) {
                        transformBox(withTransforms, {
                            x: -node.scroll.offset.x,
                            y: -node.scroll.offset.y,
                        });
                    }
                    if (!hasTransform(node.latestValues))
                        continue;
                    transformBox(withTransforms, node.latestValues);
                }
                if (hasTransform(this.latestValues)) {
                    transformBox(withTransforms, this.latestValues);
                }
                return withTransforms;
            }
            removeTransform(box) {
                var _a;
                const boxWithoutTransform = createBox();
                copyBoxInto(boxWithoutTransform, box);
                for (let i = 0; i < this.path.length; i++) {
                    const node = this.path[i];
                    if (!node.instance)
                        continue;
                    if (!hasTransform(node.latestValues))
                        continue;
                    hasScale(node.latestValues) && node.updateSnapshot();
                    const sourceBox = createBox();
                    const nodeBox = node.measurePageBox();
                    copyBoxInto(sourceBox, nodeBox);
                    removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a = node.snapshot) === null || _a === void 0 ? void 0 : _a.layoutBox, sourceBox);
                }
                if (hasTransform(this.latestValues)) {
                    removeBoxTransforms(boxWithoutTransform, this.latestValues);
                }
                return boxWithoutTransform;
            }
            /**
             *
             */
            setTargetDelta(delta) {
                this.targetDelta = delta;
                this.isProjectionDirty = true;
                this.root.scheduleUpdateProjection();
            }
            setOptions(options) {
                this.options = {
                    ...this.options,
                    ...options,
                    crossfade: options.crossfade !== undefined ? options.crossfade : true,
                };
            }
            clearMeasurements() {
                this.scroll = undefined;
                this.layout = undefined;
                this.snapshot = undefined;
                this.prevTransformTemplateValue = undefined;
                this.targetDelta = undefined;
                this.target = undefined;
                this.isLayoutDirty = false;
            }
            /**
             * Frame calculations
             */
            resolveTargetDelta() {
                var _a;
                /**
                 * Once the dirty status of nodes has been spread through the tree, we also
                 * need to check if we have a shared node of a different depth that has itself
                 * been dirtied.
                 */
                const lead = this.getLead();
                this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
                this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
                /**
                 * We don't use transform for this step of processing so we don't
                 * need to check whether any nodes have changed transform.
                 */
                if (!this.isProjectionDirty && !this.attemptToResolveRelativeTarget)
                    return;
                const { layout, layoutId } = this.options;
                /**
                 * If we have no layout, we can't perform projection, so early return
                 */
                if (!this.layout || !(layout || layoutId))
                    return;
                /**
                 * If we don't have a targetDelta but do have a layout, we can attempt to resolve
                 * a relativeParent. This will allow a component to perform scale correction
                 * even if no animation has started.
                 */
                // TODO If this is unsuccessful this currently happens every frame
                if (!this.targetDelta && !this.relativeTarget) {
                    // TODO: This is a semi-repetition of further down this function, make DRY
                    const relativeParent = this.getClosestProjectingParent();
                    if (relativeParent && relativeParent.layout) {
                        this.relativeParent = relativeParent;
                        this.relativeTarget = createBox();
                        this.relativeTargetOrigin = createBox();
                        calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
                        copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
                    }
                    else {
                        this.relativeParent = this.relativeTarget = undefined;
                    }
                }
                /**
                 * If we have no relative target or no target delta our target isn't valid
                 * for this frame.
                 */
                if (!this.relativeTarget && !this.targetDelta)
                    return;
                /**
                 * Lazy-init target data structure
                 */
                if (!this.target) {
                    this.target = createBox();
                    this.targetWithTransforms = createBox();
                }
                /**
                 * If we've got a relative box for this component, resolve it into a target relative to the parent.
                 */
                if (this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    ((_a = this.relativeParent) === null || _a === void 0 ? void 0 : _a.target)) {
                    calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
                    /**
                     * If we've only got a targetDelta, resolve it into a target
                     */
                }
                else if (this.targetDelta) {
                    if (Boolean(this.resumingFrom)) {
                        // TODO: This is creating a new object every frame
                        this.target = this.applyTransform(this.layout.layoutBox);
                    }
                    else {
                        copyBoxInto(this.target, this.layout.layoutBox);
                    }
                    applyBoxDelta(this.target, this.targetDelta);
                }
                else {
                    /**
                     * If no target, use own layout as target
                     */
                    copyBoxInto(this.target, this.layout.layoutBox);
                }
                /**
                 * If we've been told to attempt to resolve a relative target, do so.
                 */
                if (this.attemptToResolveRelativeTarget) {
                    this.attemptToResolveRelativeTarget = false;
                    const relativeParent = this.getClosestProjectingParent();
                    if (relativeParent &&
                        Boolean(relativeParent.resumingFrom) ===
                            Boolean(this.resumingFrom) &&
                        !relativeParent.options.layoutScroll &&
                        relativeParent.target) {
                        this.relativeParent = relativeParent;
                        this.relativeTarget = createBox();
                        this.relativeTargetOrigin = createBox();
                        calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
                        copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
                    }
                    else {
                        this.relativeParent = this.relativeTarget = undefined;
                    }
                }
            }
            getClosestProjectingParent() {
                if (!this.parent ||
                    hasScale(this.parent.latestValues) ||
                    has2DTranslate(this.parent.latestValues))
                    return undefined;
                if ((this.parent.relativeTarget || this.parent.targetDelta) &&
                    this.parent.layout) {
                    return this.parent;
                }
                else {
                    return this.parent.getClosestProjectingParent();
                }
            }
            calcProjection() {
                var _a;
                const { isProjectionDirty, isTransformDirty } = this;
                this.isProjectionDirty = this.isTransformDirty = false;
                const lead = this.getLead();
                const isShared = Boolean(this.resumingFrom) || this !== lead;
                let canSkip = true;
                if (isProjectionDirty)
                    canSkip = false;
                if (isShared && isTransformDirty)
                    canSkip = false;
                if (canSkip)
                    return;
                const { layout, layoutId } = this.options;
                /**
                 * If this section of the tree isn't animating we can
                 * delete our target sources for the following frame.
                 */
                this.isTreeAnimating = Boolean(((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimating) ||
                    this.currentAnimation ||
                    this.pendingAnimation);
                if (!this.isTreeAnimating) {
                    this.targetDelta = this.relativeTarget = undefined;
                }
                if (!this.layout || !(layout || layoutId))
                    return;
                /**
                 * Reset the corrected box with the latest values from box, as we're then going
                 * to perform mutative operations on it.
                 */
                copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
                /**
                 * Apply all the parent deltas to this box to produce the corrected box. This
                 * is the layout box, as it will appear on screen as a result of the transforms of its parents.
                 */
                applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
                const { target } = lead;
                if (!target)
                    return;
                if (!this.projectionDelta) {
                    this.projectionDelta = createDelta();
                    this.projectionDeltaWithTransform = createDelta();
                }
                const prevTreeScaleX = this.treeScale.x;
                const prevTreeScaleY = this.treeScale.y;
                const prevProjectionTransform = this.projectionTransform;
                /**
                 * Update the delta between the corrected box and the target box before user-set transforms were applied.
                 * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
                 * for our layout reprojection, but still allow them to be scaled correctly by the user.
                 * It might be that to simplify this we may want to accept that user-set scale is also corrected
                 * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
                 * to allow people to choose whether these styles are corrected based on just the
                 * layout reprojection or the final bounding box.
                 */
                calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
                this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
                if (this.projectionTransform !== prevProjectionTransform ||
                    this.treeScale.x !== prevTreeScaleX ||
                    this.treeScale.y !== prevTreeScaleY) {
                    this.hasProjected = true;
                    this.scheduleRender();
                    this.notifyListeners("projectionUpdate", target);
                }
            }
            hide() {
                this.isVisible = false;
                // TODO: Schedule render
            }
            show() {
                this.isVisible = true;
                // TODO: Schedule render
            }
            scheduleRender(notifyAll = true) {
                var _a, _b, _c;
                (_b = (_a = this.options).scheduleRender) === null || _b === void 0 ? void 0 : _b.call(_a);
                notifyAll && ((_c = this.getStack()) === null || _c === void 0 ? void 0 : _c.scheduleRender());
                if (this.resumingFrom && !this.resumingFrom.instance) {
                    this.resumingFrom = undefined;
                }
            }
            setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
                var _a, _b;
                const snapshot = this.snapshot;
                const snapshotLatestValues = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.latestValues) || {};
                const mixedValues = { ...this.latestValues };
                const targetDelta = createDelta();
                this.relativeTarget = this.relativeTargetOrigin = undefined;
                this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
                const relativeLayout = createBox();
                const isSharedLayoutAnimation = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.source) !== ((_a = this.layout) === null || _a === void 0 ? void 0 : _a.source);
                const isOnlyMember = (((_b = this.getStack()) === null || _b === void 0 ? void 0 : _b.members.length) || 0) <= 1;
                const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation &&
                    !isOnlyMember &&
                    this.options.crossfade === true &&
                    !this.path.some(hasOpacityCrossfade));
                this.animationProgress = 0;
                this.mixTargetDelta = (latest) => {
                    var _a;
                    const progress = latest / 1000;
                    mixAxisDelta(targetDelta.x, delta.x, progress);
                    mixAxisDelta(targetDelta.y, delta.y, progress);
                    this.setTargetDelta(targetDelta);
                    if (this.relativeTarget &&
                        this.relativeTargetOrigin &&
                        this.layout &&
                        ((_a = this.relativeParent) === null || _a === void 0 ? void 0 : _a.layout)) {
                        calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
                        mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress);
                    }
                    if (isSharedLayoutAnimation) {
                        this.animationValues = mixedValues;
                        mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress, shouldCrossfadeOpacity, isOnlyMember);
                    }
                    this.root.scheduleUpdateProjection();
                    this.scheduleRender();
                    this.animationProgress = progress;
                };
                this.mixTargetDelta(0);
            }
            startAnimation(options) {
                var _a, _b;
                this.notifyListeners("animationStart");
                (_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
                if (this.resumingFrom) {
                    (_b = this.resumingFrom.currentAnimation) === null || _b === void 0 ? void 0 : _b.stop();
                }
                if (this.pendingAnimation) {
                    cancelSync.update(this.pendingAnimation);
                    this.pendingAnimation = undefined;
                }
                /**
                 * Start the animation in the next frame to have a frame with progress 0,
                 * where the target is the same as when the animation started, so we can
                 * calculate the relative positions correctly for instant transitions.
                 */
                this.pendingAnimation = sync.update(() => {
                    globalProjectionState.hasAnimatedSinceResize = true;
                    this.currentAnimation = animate(0, animationTarget, {
                        ...options,
                        onUpdate: (latest) => {
                            var _a;
                            this.mixTargetDelta(latest);
                            (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, latest);
                        },
                        onComplete: () => {
                            var _a;
                            (_a = options.onComplete) === null || _a === void 0 ? void 0 : _a.call(options);
                            this.completeAnimation();
                        },
                    });
                    if (this.resumingFrom) {
                        this.resumingFrom.currentAnimation = this.currentAnimation;
                    }
                    this.pendingAnimation = undefined;
                });
            }
            completeAnimation() {
                var _a;
                if (this.resumingFrom) {
                    this.resumingFrom.currentAnimation = undefined;
                    this.resumingFrom.preserveOpacity = undefined;
                }
                (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.exitAnimationComplete();
                this.resumingFrom =
                    this.currentAnimation =
                        this.animationValues =
                            undefined;
                this.notifyListeners("animationComplete");
            }
            finishAnimation() {
                var _a;
                if (this.currentAnimation) {
                    (_a = this.mixTargetDelta) === null || _a === void 0 ? void 0 : _a.call(this, animationTarget);
                    this.currentAnimation.stop();
                }
                this.completeAnimation();
            }
            applyTransformsToTarget() {
                const lead = this.getLead();
                let { targetWithTransforms, target, layout, latestValues } = lead;
                if (!targetWithTransforms || !target || !layout)
                    return;
                /**
                 * If we're only animating position, and this element isn't the lead element,
                 * then instead of projecting into the lead box we instead want to calculate
                 * a new target that aligns the two boxes but maintains the layout shape.
                 */
                if (this !== lead &&
                    this.layout &&
                    layout &&
                    shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
                    target = this.target || createBox();
                    const xLength = calcLength(this.layout.layoutBox.x);
                    target.x.min = lead.target.x.min;
                    target.x.max = target.x.min + xLength;
                    const yLength = calcLength(this.layout.layoutBox.y);
                    target.y.min = lead.target.y.min;
                    target.y.max = target.y.min + yLength;
                }
                copyBoxInto(targetWithTransforms, target);
                /**
                 * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
                 * This is the final box that we will then project into by calculating a transform delta and
                 * applying it to the corrected box.
                 */
                transformBox(targetWithTransforms, latestValues);
                /**
                 * Update the delta between the corrected box and the final target box, after
                 * user-set transforms are applied to it. This will be used by the renderer to
                 * create a transform style that will reproject the element from its layout layout
                 * into the desired bounding box.
                 */
                calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
            }
            registerSharedNode(layoutId, node) {
                var _a, _b, _c;
                if (!this.sharedNodes.has(layoutId)) {
                    this.sharedNodes.set(layoutId, new NodeStack());
                }
                const stack = this.sharedNodes.get(layoutId);
                stack.add(node);
                node.promote({
                    transition: (_a = node.options.initialPromotionConfig) === null || _a === void 0 ? void 0 : _a.transition,
                    preserveFollowOpacity: (_c = (_b = node.options.initialPromotionConfig) === null || _b === void 0 ? void 0 : _b.shouldPreserveFollowOpacity) === null || _c === void 0 ? void 0 : _c.call(_b, node),
                });
            }
            isLead() {
                const stack = this.getStack();
                return stack ? stack.lead === this : true;
            }
            getLead() {
                var _a;
                const { layoutId } = this.options;
                return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
            }
            getPrevLead() {
                var _a;
                const { layoutId } = this.options;
                return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : undefined;
            }
            getStack() {
                const { layoutId } = this.options;
                if (layoutId)
                    return this.root.sharedNodes.get(layoutId);
            }
            promote({ needsReset, transition, preserveFollowOpacity, } = {}) {
                const stack = this.getStack();
                if (stack)
                    stack.promote(this, preserveFollowOpacity);
                if (needsReset) {
                    this.projectionDelta = undefined;
                    this.needsReset = true;
                }
                if (transition)
                    this.setOptions({ transition });
            }
            relegate() {
                const stack = this.getStack();
                if (stack) {
                    return stack.relegate(this);
                }
                else {
                    return false;
                }
            }
            resetRotation() {
                const { visualElement } = this.options;
                if (!visualElement)
                    return;
                // If there's no detected rotation values, we can early return without a forced render.
                let hasRotate = false;
                /**
                 * An unrolled check for rotation values. Most elements don't have any rotation and
                 * skipping the nested loop and new object creation is 50% faster.
                 */
                const { latestValues } = visualElement;
                if (latestValues.rotate ||
                    latestValues.rotateX ||
                    latestValues.rotateY ||
                    latestValues.rotateZ) {
                    hasRotate = true;
                }
                // If there's no rotation values, we don't need to do any more.
                if (!hasRotate)
                    return;
                const resetValues = {};
                // Check the rotate value of all axes and reset to 0
                for (let i = 0; i < transformAxes.length; i++) {
                    const key = "rotate" + transformAxes[i];
                    // Record the rotation and then temporarily set it to 0
                    if (latestValues[key]) {
                        resetValues[key] = latestValues[key];
                        visualElement.setStaticValue(key, 0);
                    }
                }
                // Force a render of this element to apply the transform with all rotations
                // set to 0.
                visualElement === null || visualElement === void 0 ? void 0 : visualElement.render();
                // Put back all the values we reset
                for (const key in resetValues) {
                    visualElement.setStaticValue(key, resetValues[key]);
                }
                // Schedule a render for the next frame. This ensures we won't visually
                // see the element with the reset rotate value applied.
                visualElement.scheduleRender();
            }
            getProjectionStyles(styleProp = {}) {
                var _a, _b, _c;
                // TODO: Return lifecycle-persistent object
                const styles = {};
                if (!this.instance || this.isSVG)
                    return styles;
                if (!this.isVisible) {
                    return { visibility: "hidden" };
                }
                else {
                    styles.visibility = "";
                }
                const transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
                if (this.needsReset) {
                    this.needsReset = false;
                    styles.opacity = "";
                    styles.pointerEvents =
                        resolveMotionValue(styleProp.pointerEvents) || "";
                    styles.transform = transformTemplate
                        ? transformTemplate(this.latestValues, "")
                        : "none";
                    return styles;
                }
                const lead = this.getLead();
                if (!this.projectionDelta || !this.layout || !lead.target) {
                    const emptyStyles = {};
                    if (this.options.layoutId) {
                        emptyStyles.opacity =
                            this.latestValues.opacity !== undefined
                                ? this.latestValues.opacity
                                : 1;
                        emptyStyles.pointerEvents =
                            resolveMotionValue(styleProp.pointerEvents) || "";
                    }
                    if (this.hasProjected && !hasTransform(this.latestValues)) {
                        emptyStyles.transform = transformTemplate
                            ? transformTemplate({}, "")
                            : "none";
                        this.hasProjected = false;
                    }
                    return emptyStyles;
                }
                const valuesToRender = lead.animationValues || lead.latestValues;
                this.applyTransformsToTarget();
                styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
                if (transformTemplate) {
                    styles.transform = transformTemplate(valuesToRender, styles.transform);
                }
                const { x, y } = this.projectionDelta;
                styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
                if (lead.animationValues) {
                    /**
                     * If the lead component is animating, assign this either the entering/leaving
                     * opacity
                     */
                    styles.opacity =
                        lead === this
                            ? (_c = (_b = valuesToRender.opacity) !== null && _b !== void 0 ? _b : this.latestValues.opacity) !== null && _c !== void 0 ? _c : 1
                            : this.preserveOpacity
                                ? this.latestValues.opacity
                                : valuesToRender.opacityExit;
                }
                else {
                    /**
                     * Or we're not animating at all, set the lead component to its layout
                     * opacity and other components to hidden.
                     */
                    styles.opacity =
                        lead === this
                            ? valuesToRender.opacity !== undefined
                                ? valuesToRender.opacity
                                : ""
                            : valuesToRender.opacityExit !== undefined
                                ? valuesToRender.opacityExit
                                : 0;
                }
                /**
                 * Apply scale correction
                 */
                for (const key in scaleCorrectors) {
                    if (valuesToRender[key] === undefined)
                        continue;
                    const { correct, applyTo } = scaleCorrectors[key];
                    const corrected = correct(valuesToRender[key], lead);
                    if (applyTo) {
                        const num = applyTo.length;
                        for (let i = 0; i < num; i++) {
                            styles[applyTo[i]] = corrected;
                        }
                    }
                    else {
                        styles[key] = corrected;
                    }
                }
                /**
                 * Disable pointer events on follow components. This is to ensure
                 * that if a follow component covers a lead component it doesn't block
                 * pointer events on the lead.
                 */
                if (this.options.layoutId) {
                    styles.pointerEvents =
                        lead === this
                            ? resolveMotionValue(styleProp.pointerEvents) || ""
                            : "none";
                }
                return styles;
            }
            clearSnapshot() {
                this.resumeFrom = this.snapshot = undefined;
            }
            // Only run on root
            resetTree() {
                this.root.nodes.forEach((node) => { var _a; return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop(); });
                this.root.nodes.forEach(clearMeasurements);
                this.root.sharedNodes.clear();
            }
        };
    }
    function updateLayout(node) {
        node.updateLayout();
    }
    function notifyLayoutUpdate(node) {
        var _a, _b, _c;
        const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
        if (node.isLead() &&
            node.layout &&
            snapshot &&
            node.hasListeners("didUpdate")) {
            const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
            const { animationType } = node.options;
            const isShared = snapshot.source !== node.layout.source;
            // TODO Maybe we want to also resize the layout snapshot so we don't trigger
            // animations for instance if layout="size" and an element has only changed position
            if (animationType === "size") {
                eachAxis((axis) => {
                    const axisSnapshot = isShared
                        ? snapshot.measuredBox[axis]
                        : snapshot.layoutBox[axis];
                    const length = calcLength(axisSnapshot);
                    axisSnapshot.min = layout[axis].min;
                    axisSnapshot.max = axisSnapshot.min + length;
                });
            }
            else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) {
                eachAxis((axis) => {
                    const axisSnapshot = isShared
                        ? snapshot.measuredBox[axis]
                        : snapshot.layoutBox[axis];
                    const length = calcLength(layout[axis]);
                    axisSnapshot.max = axisSnapshot.min + length;
                });
            }
            const layoutDelta = createDelta();
            calcBoxDelta(layoutDelta, layout, snapshot.layoutBox);
            const visualDelta = createDelta();
            if (isShared) {
                calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
            }
            else {
                calcBoxDelta(visualDelta, layout, snapshot.layoutBox);
            }
            const hasLayoutChanged = !isDeltaZero(layoutDelta);
            let hasRelativeTargetChanged = false;
            if (!node.resumeFrom) {
                const relativeParent = node.getClosestProjectingParent();
                /**
                 * If the relativeParent is itself resuming from a different element then
                 * the relative snapshot is not relavent
                 */
                if (relativeParent && !relativeParent.resumeFrom) {
                    const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
                    if (parentSnapshot && parentLayout) {
                        const relativeSnapshot = createBox();
                        calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
                        const relativeLayout = createBox();
                        calcRelativePosition(relativeLayout, layout, parentLayout.layoutBox);
                        if (!boxEquals(relativeSnapshot, relativeLayout)) {
                            hasRelativeTargetChanged = true;
                        }
                    }
                }
            }
            node.notifyListeners("didUpdate", {
                layout,
                snapshot,
                delta: visualDelta,
                layoutDelta,
                hasLayoutChanged,
                hasRelativeTargetChanged,
            });
        }
        else if (node.isLead()) {
            (_c = (_b = node.options).onExitComplete) === null || _c === void 0 ? void 0 : _c.call(_b);
        }
        /**
         * Clearing transition
         * TODO: Investigate why this transition is being passed in as {type: false } from Framer
         * and why we need it at all
         */
        node.options.transition = undefined;
    }
    function propagateDirtyNodes(node) {
        /**
         * Propagate isProjectionDirty. Nodes are ordered by depth, so if the parent here
         * is dirty we can simply pass this forward.
         */
        node.isProjectionDirty || (node.isProjectionDirty = Boolean(node.parent && node.parent.isProjectionDirty));
        /**
         * Propagate isTransformDirty.
         */
        node.isTransformDirty || (node.isTransformDirty = Boolean(node.parent && node.parent.isTransformDirty));
    }
    function clearSnapshot(node) {
        node.clearSnapshot();
    }
    function clearMeasurements(node) {
        node.clearMeasurements();
    }
    function resetTransformStyle(node) {
        const { visualElement } = node.options;
        if (visualElement === null || visualElement === void 0 ? void 0 : visualElement.getProps().onBeforeLayoutMeasure) {
            visualElement.notify("BeforeLayoutMeasure");
        }
        node.resetTransform();
    }
    function finishAnimation(node) {
        node.finishAnimation();
        node.targetDelta = node.relativeTarget = node.target = undefined;
    }
    function resolveTargetDelta(node) {
        node.resolveTargetDelta();
    }
    function calcProjection(node) {
        node.calcProjection();
    }
    function resetRotation(node) {
        node.resetRotation();
    }
    function removeLeadSnapshots(stack) {
        stack.removeLeadSnapshot();
    }
    function mixAxisDelta(output, delta, p) {
        output.translate = mix(delta.translate, 0, p);
        output.scale = mix(delta.scale, 1, p);
        output.origin = delta.origin;
        output.originPoint = delta.originPoint;
    }
    function mixAxis(output, from, to, p) {
        output.min = mix(from.min, to.min, p);
        output.max = mix(from.max, to.max, p);
    }
    function mixBox(output, from, to, p) {
        mixAxis(output.x, from.x, to.x, p);
        mixAxis(output.y, from.y, to.y, p);
    }
    function hasOpacityCrossfade(node) {
        return (node.animationValues && node.animationValues.opacityExit !== undefined);
    }
    const defaultLayoutTransition = {
        duration: 0.45,
        ease: [0.4, 0, 0.1, 1],
    };
    function mountNodeEarly(node, elementId) {
        /**
         * Rather than searching the DOM from document we can search the
         * path for the deepest mounted ancestor and search from there
         */
        let searchNode = node.root;
        for (let i = node.path.length - 1; i >= 0; i--) {
            if (Boolean(node.path[i].instance)) {
                searchNode = node.path[i];
                break;
            }
        }
        const searchElement = searchNode && searchNode !== node.root ? searchNode.instance : document;
        const element = searchElement.querySelector(`[data-projection-id="${elementId}"]`);
        if (element)
            node.mount(element, true);
    }
    function roundAxis(axis) {
        axis.min = Math.round(axis.min);
        axis.max = Math.round(axis.max);
    }
    function roundBox(box) {
        roundAxis(box.x);
        roundAxis(box.y);
    }
    function shouldAnimatePositionOnly(animationType, snapshot, layout) {
        return (animationType === "position" ||
            (animationType === "preserve-aspect" &&
                !isNear(aspectRatio(snapshot), aspectRatio(layout), 0.2)));
    }

    const DocumentProjectionNode = createProjectionNode({
        attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
        measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop,
        }),
        checkIsScrollRoot: () => true,
    });

    const rootProjectionNode = {
        current: undefined,
    };
    const HTMLProjectionNode = createProjectionNode({
        measureScroll: (instance) => ({
            x: instance.scrollLeft,
            y: instance.scrollTop,
        }),
        defaultParent: () => {
            if (!rootProjectionNode.current) {
                const documentNode = new DocumentProjectionNode(0, {});
                documentNode.mount(window);
                documentNode.setOptions({ layoutScroll: true });
                rootProjectionNode.current = documentNode;
            }
            return rootProjectionNode.current;
        },
        resetTransform: (instance, value) => {
            instance.style.transform = value !== undefined ? value : "none";
        },
        checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed"),
    });

    const featureBundle = {
        ...animations,
        ...gestureAnimations,
        ...drag,
        ...layoutFeatures,
    };
    /**
     * HTML & SVG components, optimised for use with gestures and animation. These can be used as
     * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
     *
     * @public
     */
    const motion = /*@__PURE__*/ createMotionProxy((Component, config) => createDomMotionConfig(Component, config, featureBundle, createDomVisualElement, HTMLProjectionNode));

    const PackDisplayCard = ({ data: e, i, installRef, downloadCallback }) => {
        const { soundPacks, isInstalling } = useGlobalState();
        function checkIfPackInstalled(themeObj) {
            const filteredArr = soundPacks.filter((e) => e.data.name === themeObj.name && e.data.author === themeObj.author);
            if (filteredArr.length > 0) {
                if (filteredArr[0].data.version === themeObj.version) {
                    return "installed";
                }
                else {
                    return "outdated";
                }
            }
            else {
                return "uninstalled";
            }
        }
        const installStatus = checkIfPackInstalled(e);
        return (
        // The outer 2 most divs are the background darkened/blurred image, and everything inside is the text/image/buttons
        window.SP_REACT.createElement(window.SP_REACT.Fragment, null,
            window.SP_REACT.createElement("div", { className: "AudioLoader_PackBrowser_SingleItem_Container1", style: {
                    width: "100%",
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginBottom: "20px",
                } },
                window.SP_REACT.createElement("div", { className: "AudioLoader_PackBrowser_SingleItem_Container2", style: {
                        // Really this could be combined with the above div, its just that in CSSLoader there's 2 here, and I didn't want to merge them because its 1am
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                    } },
                    window.SP_REACT.createElement("div", { 
                        // I'm still using the format of div-with-a-bg-image, because I think that could make it a bit easier to add icons/text in front if we want
                        className: "AudioLoader_PackBrowser_SingleItem_PreviewImageContainer", style: {
                            width: "200px",
                            height: "200px",
                            position: "relative",
                        } },
                        window.SP_REACT.createElement("div", { style: {
                                background: e.music
                                    ? "url(https://i.imgur.com/nISGpci.png)"
                                    : "linear-gradient(150deg, rgba(0, 0, 0, 0) 0%, rgba(118, 118, 118, 0) 0%, rgba(255, 255, 255, 0.2) 32%, rgba(255, 255, 255, 0.2) 35%, rgba(255, 255, 255, 0.2) 38%, rgba(210, 210, 210, 0) 70%, rgba(0, 0, 0, 0) 100%) 0% 0% / cover",
                                position: "absolute",
                                top: "10%",
                                left: "0",
                                width: "80%",
                                height: "80%",
                                backgroundSize: "cover",
                                zIndex: 3,
                                borderRadius: "2px",
                            } }),
                        window.SP_REACT.createElement("div", { style: {
                                backgroundImage: 'url("' + e.preview_image + '")',
                                backgroundColor: "#21323d",
                                position: "absolute",
                                top: "10%",
                                left: "0",
                                width: "80%",
                                height: "80%",
                                backgroundSize: "cover",
                                zIndex: 2,
                                borderRadius: "2px",
                            } }),
                        window.SP_REACT.createElement(motion.div
                        // @ts-ignore - stupid "ref could be null" things here
                        , { 
                            // @ts-ignore - stupid "ref could be null" things here
                            animate: installRef.current === i ? { rotate: 360 } : {}, exit: {}, transition: {
                                // @ts-ignore
                                repeat: installRef.current === i ? Infinity : 0,
                                // @ts-ignore
                                duration: installRef.current === i ? 1.82 : 0.001,
                                ease: "linear",
                            }, style: {
                                backgroundImage: e.music
                                    ? 'url("https://i.imgur.com/V9t3728.png")'
                                    : 'url("https://i.imgur.com/pWm35T0.png")',
                                position: "absolute",
                                top: "12.5%",
                                right: "0",
                                width: "75%",
                                height: "75%",
                                backgroundSize: "cover",
                                zIndex: 1,
                                rotate: 0,
                            } })),
                    window.SP_REACT.createElement("div", { style: {
                            width: "calc(100% - 220px)",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            marginLeft: "1em",
                            justifyContent: "center",
                        } },
                        window.SP_REACT.createElement("span", { className: "AudioLoader_PackBrowser_SingleItem_ThemeName", style: {
                                fontSize: "1.25em",
                                fontWeight: "bold",
                                // This stuff here truncates it if it's too long (prolly not gonna happen on audioloader, just code from cssloader)
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "90%",
                            } }, e.name),
                        window.SP_REACT.createElement("span", { className: "AudioLoader_PackBrowser_SingleItem_AuthorText", style: {
                                marginRight: "auto",
                                fontSize: "1em",
                                // The text shadows are leftover from cssloader, you can experiment with removing them if you want
                                textShadow: "rgb(48, 48, 48) 0px 0 10px",
                            } }, e.author),
                        window.SP_REACT.createElement("span", { className: "AudioLoader_PackBrowser_SingleItem_ThemeTarget", style: {
                                fontSize: "1em",
                                textShadow: "rgb(48, 48, 48) 0px 0 10px",
                            } },
                            e.music ? "Music" : "Sound",
                            " | ",
                            e.version),
                        window.SP_REACT.createElement("span", { className: "AudioLoader_PackBrowser_SingleItem_DescriptionText", style: {
                                fontSize: "13px",
                                textShadow: "rgb(48, 48, 48) 0px 0 10px",
                                color: "#969696",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                display: "-webkit-box",
                            } }, e.description ? (e.description) : (window.SP_REACT.createElement("span", null,
                            window.SP_REACT.createElement("i", { style: { color: "#666" } }, "No description provided.")))),
                        window.SP_REACT.createElement("div", { className: "AudioLoader_PackBrowser_SingleItem_InstallButtonContainer", style: {
                                marginTop: "1em",
                                width: "245px",
                                overflow: "hidden",
                            } },
                            window.SP_REACT.createElement(PanelSectionRow, null,
                                window.SP_REACT.createElement("div", { className: "AudioLoader_PackBrowser_SingleItem_InstallContainer", style: {
                                        // This padding here overrides the default padding put on PanelSectionRow's by Valve
                                        // Before this, I was using negative margin to "shrink" the element, but this is a much better solution
                                        paddingTop: "0px",
                                        paddingBottom: "0px",
                                    } },
                                    window.SP_REACT.createElement(ButtonItem, { bottomSeparator: "none", layout: "below", disabled: isInstalling || installStatus === "installed", onClick: () => {
                                            downloadCallback(e, i);
                                        } },
                                        window.SP_REACT.createElement("span", { className: "AudioLoader_PackBrowser_SingleItem_InstallText" }, installStatus === "outdated"
                                            ? "Update Available"
                                            : installStatus === "uninstalled"
                                                ? "Install"
                                                : "Installed"))))))))));
    };

    const PackBrowserPage = () => {
        const { soundPacks, setSoundPacks, browserPackList, setBrowserPackList, searchFieldValue, setSearchValue, selectedSort, setSort, selectedTarget, setTarget, setInstalling, } = useGlobalState();
        const [backendVersion, setBackendVer] = React.useState(2);
        function reloadBackendVer() {
            resolve(getBackendVersion(), setBackendVer);
            console.log(backendVersion);
        }
        async function fetchPackDb$1() {
            resolve(fetchPackDb(), (response) => {
                if (response.body) {
                    setBrowserPackList(JSON.parse(response.body));
                }
                else {
                    console.log("AudioLoader - Fetching PackDb Failed, no json string was returned by the fetch");
                }
            });
        }
        function fetchLocalPacks() {
            resolve(reloadPacksDir(), () => {
                resolve(getSoundPacks(), (data) => {
                    setSoundPacks(data);
                });
            });
        }
        function reloadPacks() {
            fetchPackDb$1();
            fetchLocalPacks();
        }
        React.useLayoutEffect(() => {
            fetchPackDb$1();
            reloadBackendVer();
        }, []);
        const searchFilter = (e) => {
            // This means only compatible themes will show up, newer ones won't
            if (e.manifest_version > backendVersion) {
                return false;
            }
            // This filter just implements the search stuff
            if (searchFieldValue.length > 0) {
                // Convert the theme and search to lowercase so that it's not case-sensitive
                if (
                // This checks for the theme name
                !e.name.toLowerCase().includes(searchFieldValue.toLowerCase()) &&
                    // This checks for the author name
                    !e.author.toLowerCase().includes(searchFieldValue.toLowerCase()) &&
                    // This checks for the description
                    !e.description.toLowerCase().includes(searchFieldValue.toLowerCase())) {
                    // return false just means it won't show in the list
                    return false;
                }
            }
            return true;
        };
        const sortOptions = React.useMemo(() => [
            { data: 1, label: "Alphabetical (A to Z)" },
            { data: 2, label: "Alphabetical (Z to A)" },
            { data: 3, label: "Last Updated (Newest)" },
            { data: 4, label: "Last Updated (Oldest)" },
        ], []);
        const targetOptions = React.useMemo(() => [
            { data: 1, label: "All" },
            { data: 2, label: "Installed" },
            { data: 3, label: "Music" },
            { data: 4, label: "Sound" },
        ], []);
        function checkIfPackInstalled(themeObj) {
            const filteredArr = soundPacks.filter((e) => e.data.name === themeObj.name && e.data.author === themeObj.author);
            if (filteredArr.length > 0) {
                if (filteredArr[0].data.version === themeObj.version) {
                    return "installed";
                }
                else {
                    return "outdated";
                }
            }
            else {
                return "uninstalled";
            }
        }
        const installRef = React.useRef(-1);
        function downloadCallback(e, i) {
            setInstalling(true);
            installRef.current = i;
            resolve(downloadPack(e.id), () => {
                fetchLocalPacks();
                setInstalling(false);
                if (installRef.current === i)
                    installRef.current = -1;
            });
        }
        return (window.SP_REACT.createElement(window.SP_REACT.Fragment, null,
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(Focusable, { style: { display: "flex", maxWidth: "100%" } },
                    window.SP_REACT.createElement("div", { style: {
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "40%",
                            maxWidth: "40%",
                        } },
                        window.SP_REACT.createElement("span", null, "Sort"),
                        window.SP_REACT.createElement(Dropdown, { menuLabel: "Sort", rgOptions: sortOptions, strDefaultLabel: "Last Updated (Newest)", selectedOption: selectedSort, onChange: (e) => setSort(e.data) })),
                    window.SP_REACT.createElement("div", { style: {
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "40%",
                            maxWidth: "40%",
                            marginLeft: "auto",
                        } },
                        window.SP_REACT.createElement("span", null, "Filter"),
                        window.SP_REACT.createElement(Dropdown, { menuLabel: "Filter", rgOptions: targetOptions, strDefaultLabel: "All", selectedOption: selectedTarget.data, onChange: (e) => setTarget(e) })))),
            window.SP_REACT.createElement("div", { style: { justifyContent: "center", display: "flex" } },
                window.SP_REACT.createElement(Focusable, { style: { display: "flex", alignItems: "center", width: "96%" } },
                    window.SP_REACT.createElement("div", { style: { minWidth: "75%", marginRight: "auto" } },
                        window.SP_REACT.createElement(TextField, { label: "Search", value: searchFieldValue, onChange: (e) => setSearchValue(e.target.value) })),
                    window.SP_REACT.createElement(DialogButton, { onClick: () => {
                            reloadPacks();
                        }, style: {
                            maxWidth: "20%",
                            height: "50%",
                            // marginRight: "auto",
                            // marginLeft: "auto",
                        } },
                        window.SP_REACT.createElement(FaSyncAlt, { style: { transform: "translate(0, 2px)", marginRight: 8 } }),
                        window.SP_REACT.createElement("span", null, "Refresh")))),
            window.SP_REACT.createElement(Focusable, { style: { display: "flex", flexWrap: "wrap" } }, browserPackList
                // searchFilter also includes backend version check
                .filter(searchFilter)
                .filter((e) => {
                if (selectedTarget.label === "All") {
                    return true;
                }
                else if (selectedTarget.label === "Installed") {
                    const strValue = checkIfPackInstalled(e);
                    return strValue === "installed" || strValue === "outdated";
                }
                else if (selectedTarget.label === "Music") {
                    return e.music;
                }
                else {
                    return !e.music;
                }
            })
                .sort((a, b) => {
                // This handles the sort option the user has chosen
                switch (selectedSort) {
                    case 2:
                        // Z-A
                        // localeCompare just sorts alphabetically
                        return b.name.localeCompare(a.name);
                    case 3:
                        // New-Old
                        return (new Date(b.last_changed).valueOf() -
                            new Date(a.last_changed).valueOf());
                    case 4:
                        // Old-New
                        return (new Date(a.last_changed).valueOf() -
                            new Date(b.last_changed).valueOf());
                    default:
                        // This is just A-Z
                        return a.name.localeCompare(b.name);
                }
            })
                .map((e, i) => {
                return (window.SP_REACT.createElement(PackDisplayCard, { data: e, i: i, installRef: installRef, downloadCallback: downloadCallback }));
            }))));
    };

    const UninstallPage = () => {
        const { soundPacks, setSoundPacks, activeSound, setActiveSound, selectedMusic, setSelectedMusic, menuMusic, setMenuMusic, soundVolume, musicVolume, } = useGlobalState();
        const [isUninstalling, setUninstalling] = React.useState(false);
        function fetchLocalPacks() {
            resolve(reloadPacksDir(), () => {
                resolve(getSoundPacks(), (data) => {
                    setSoundPacks(data);
                });
            });
        }
        function handleUninstall(listEntry) {
            setUninstalling(true);
            resolve(deletePack(listEntry.data.name), () => {
                fetchLocalPacks();
                if (activeSound === listEntry.data.name ||
                    selectedMusic === listEntry.data.name) {
                    console.log("Audio Loader - Attempted to uninstall applied sound/music, changing applied packs to Default");
                    if (activeSound === listEntry.data.name)
                        setActiveSound("Default");
                    if (selectedMusic === listEntry.data.name) {
                        setSelectedMusic("None");
                        if (menuMusic !== null) {
                            menuMusic.StopPlayback();
                            setMenuMusic(null);
                        }
                    }
                    const configObj = {
                        selected_pack: activeSound === listEntry.data.name ? "Default" : activeSound,
                        selected_music: selectedMusic === listEntry.data.name ? "None" : activeSound,
                        sound_volume: soundVolume,
                        music_volume: musicVolume,
                    };
                    setConfig(configObj);
                }
                setUninstalling(false);
            });
        }
        if (soundPacks.length === 0) {
            return (window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement("span", null, "No packs installed, find some in the 'Browse Packs' tab.")));
        }
        return (window.SP_REACT.createElement(window.SP_REACT.Fragment, null, soundPacks
            .sort((a, b) => a.data.name.localeCompare(b.data.name))
            .map((e) => (window.SP_REACT.createElement(PanelSectionRow, null,
            window.SP_REACT.createElement(ButtonItem, { label: e.data.name, onClick: () => handleUninstall(e), disabled: isUninstalling },
                window.SP_REACT.createElement(FaTrash, null)))))));
    };

    const Content = ({}) => {
        const { activeSound, gamesRunning, setActiveSound, soundPacks, setSoundPacks, menuMusic, setMenuMusic, selectedMusic, setSelectedMusic, soundVolume, setSoundVolume, musicVolume, setMusicVolume, gainNode, } = useGlobalState();
        const [dummyFuncResult, setDummyResult] = React.useState(false);
        function dummyFuncTest() {
            resolve(dummyFunction(), setDummyResult);
        }
        React.useEffect(() => {
            dummyFuncTest();
        }, []);
        function restartMusicPlayer(newMusic) {
            if (menuMusic !== null) {
                menuMusic.pause();
                menuMusic.currentTime = 0;
                setMenuMusic(null);
            }
            // This makes sure if you are in a game, music doesn't start playing
            if (newMusic !== "None" && gamesRunning.length === 0) {
                const currentPack = soundPacks.find((e) => e.name === newMusic);
                let musicFileName = "menu_music.mp3";
                if (Object.keys(currentPack?.mappings || {}).includes("menu_music.mp3")) {
                    const randIndex = Math.trunc(Math.random() * currentPack?.mappings["menu_music.mp3"].length);
                    musicFileName = currentPack?.mappings["menu_music.mp3"][randIndex];
                }
                const newMenuMusic = new Audio(`/sounds_custom/${currentPack?.path || "error"}/${musicFileName}`);
                newMenuMusic.play();
                newMenuMusic.loop = true;
                newMenuMusic.volume = musicVolume;
                setMenuMusic(newMenuMusic);
            }
        }
        function refetchLocalPacks() {
            resolve(reloadPacksDir(), () => {
                resolve(getSoundPacks(), (data) => {
                    setSoundPacks(data);
                });
            });
        }
        const SoundPackDropdownOptions = React.useMemo(() => {
            return [
                { label: "Default", data: -1 },
                ...soundPacks
                    // Only shows sound packs
                    .filter((e) => !e.data.music)
                    .map((p, index) => ({ label: p.name, data: index }))
                    // TODO: because this sorts after assigning indexes, the sort might make the indexes out of order, make sure this doesn't happen
                    .sort((a, b) => a.label.localeCompare(b.label)),
            ];
        }, [soundPacks]);
        const MusicPackDropdownOptions = React.useMemo(() => {
            return [
                { label: "None", data: -1 },
                ...soundPacks
                    // Only show music packs
                    .filter((e) => e.data.music)
                    .map((p, index) => ({ label: p.name, data: index }))
                    // TODO: because this sorts after assigning indexes, the sort might make the indexes out of order, make sure this doesn't happen
                    .sort((a, b) => a.label.localeCompare(b.label)),
            ];
        }, [soundPacks]);
        if (!dummyFuncResult) {
            return (window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement("span", null, "AudioLoader failed to initialize, try reloading, and if that doesn't work, try restarting your deck.")));
        }
        return (window.SP_REACT.createElement("div", { className: "audioloader_QAM" },
            window.SP_REACT.createElement("style", null, `
        .audioloader_QAM div[class^="gamepaddialog_FieldLabel_"] {
          display: none;
        }
        `),
            window.SP_REACT.createElement(PanelSection, { title: "Packs" },
                window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(DropdownItem, { bottomSeparator: "none", onMenuWillOpen: () => refetchLocalPacks(), menuLabel: "Sound Pack", rgOptions: SoundPackDropdownOptions, selectedOption: 
                        // activeSound now stores a string, this just finds the corresponding option for the label
                        // the "?? -2" is there incase find returns undefined (the currently selected theme was deleted or something)
                        // it NEEDS to be a nullish coalescing operator because 0 needs to be treated as true
                        SoundPackDropdownOptions.find((e) => e.label === activeSound)
                            ?.data ?? -1, onChange: async (option) => {
                            setActiveSound(option.label);
                            const configObj = {
                                selected_pack: option.label,
                                selected_music: selectedMusic,
                                sound_volume: soundVolume,
                                music_volume: musicVolume,
                            };
                            setConfig(configObj);
                        } })),
                window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(SliderField, { bottomSeparator: "standard", label: undefined, value: soundVolume, min: 0, max: 1, step: 0.01, onChange: (value) => {
                            gainNode.gain.setValueAtTime(value, gainNode.context.currentTime + 0.01);
                            // gainNode.gain.value = value;
                            setSoundVolume(value);
                            const configObj = {
                                selected_pack: activeSound,
                                selected_music: selectedMusic,
                                sound_volume: value,
                                music_volume: musicVolume,
                            };
                            setConfig(configObj);
                        }, icon: window.SP_REACT.createElement(FaVolumeUp, null) })),
                window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(DropdownItem, { bottomSeparator: "none", onMenuWillOpen: () => refetchLocalPacks(), menuLabel: "Music Pack", rgOptions: MusicPackDropdownOptions, selectedOption: MusicPackDropdownOptions.find((e) => e.label === selectedMusic)
                            ?.data ?? -1, onChange: async (option) => {
                            setSelectedMusic(option.label);
                            const configObj = {
                                selected_pack: activeSound,
                                selected_music: option.label,
                                sound_volume: soundVolume,
                                music_volume: musicVolume,
                            };
                            setConfig(configObj);
                            restartMusicPlayer(option.label);
                        } })),
                window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(SliderField, { bottomSeparator: "standard", label: undefined, value: musicVolume, min: 0, max: 1, step: 0.01, onChange: (value) => {
                            setMusicVolume(value);
                            menuMusic.volume = value;
                            const configObj = {
                                selected_pack: activeSound,
                                selected_music: selectedMusic,
                                sound_volume: soundVolume,
                                music_volume: value,
                            };
                            setConfig(configObj);
                        }, icon: window.SP_REACT.createElement(FaMusic, { style: { transform: "scale(0.8, 1) translate(-2px, -2px)" } }) }))),
            window.SP_REACT.createElement(PanelSection, { title: "Settings" },
                window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(ButtonItem, { bottomSeparator: "none", layout: "below", onClick: () => {
                            Router.CloseSideMenus();
                            Router.Navigate("/audiopack-manager");
                        } }, "Manage Packs")))));
    };
    const PackManagerRouter = () => {
        const [currentTabRoute, setCurrentTabRoute] = React.useState("browser");
        return (window.SP_REACT.createElement("div", { style: {
                marginTop: "40px",
                height: "calc(100% - 40px)",
                background: "#0005",
            } },
            window.SP_REACT.createElement(Tabs, { activeTab: currentTabRoute, 
                // @ts-ignore
                onShowTab: (tabID) => {
                    setCurrentTabRoute(tabID);
                }, tabs: [
                    {
                        title: "Browse",
                        content: window.SP_REACT.createElement(PackBrowserPage, null),
                        id: "browser",
                    },
                    {
                        title: "Uninstall",
                        content: window.SP_REACT.createElement(UninstallPage, null),
                        id: "uninstall",
                    },
                    {
                        title: "About",
                        content: window.SP_REACT.createElement(AboutPage, null),
                        id: "about",
                    },
                ] })));
    };
    var index = definePlugin((serverApi) => {
        setServer(serverApi);
        const state = new GlobalState();
        let menuMusic = null;
        // Big thanks to AA and Mintexists for help finding this
        const soundVolumePatchInstance = afterPatch(AudioParent.m_GamepadUIAudioStore.m_AudioPlaybackManager.__proto__, "GetActiveDestination", function (_, ret) {
            const { soundVolume } = state.getPublicState();
            // @ts-ignore
            const gainNode = new GainNode(this.context, { gain: soundVolume });
            gainNode.connect(ret);
            try {
                state.setGainNode(gainNode);
            }
            catch (e) {
                console.log(e);
            }
            return gainNode;
        });
        state.setVolumePatchInstance(soundVolumePatchInstance);
        // The sound effect intercept/player
        // Needs to be stored in globalstate in order to unpatch
        const patchInstance = beforePatch(AudioParent.GamepadUIAudio.m_AudioPlaybackManager.__proto__, "PlayAudioURL", (args) => {
            // Since this isn't in a react component, this uses the getter function of the globalState instead of just the react variables
            // It does the same thing
            const { soundPacks, activeSound } = state.getPublicState();
            let newSoundURL = "";
            switch (activeSound) {
                case "Default":
                    newSoundURL = args[0];
                    break;
                default:
                    const soundName = args[0].slice(8);
                    const currentPack = soundPacks.find((e) => e.name === activeSound);
                    // Ignore check
                    if (currentPack?.ignore.includes(soundName)) {
                        newSoundURL = args[0];
                        break;
                    }
                    // Mapping check
                    if (Object.keys(currentPack?.mappings || {}).includes(soundName)) {
                        const randIndex = Math.trunc(Math.random() * currentPack?.mappings[soundName].length);
                        const mappedFileName = currentPack?.mappings[soundName][randIndex];
                        newSoundURL = `/sounds_custom/${currentPack?.path || "/error"}/${mappedFileName}`;
                        break;
                    }
                    // Default path-replacing behavior
                    newSoundURL = args[0].replace("sounds/", `sounds_custom/${currentPack?.path || "/error"}/`);
                    break;
            }
            args[0] = newSoundURL;
            return [newSoundURL];
        });
        state.setSoundPatchInstance(patchInstance);
        resolve(getSoundPacks(), (packs) => {
            state.setSoundPacks(packs);
            // This is nested in here so that all data has loaded before it attempts to find audio paths
            resolve(getConfig(), (data) => {
                // This sets the config data in globalState
                state.setActiveSound(data?.selected_pack || "Default");
                const configSelectedMusic = data?.selected_music || "None";
                state.setSelectedMusic(configSelectedMusic);
                const configSoundVolume = data?.sound_volume ?? 1;
                state.setSoundVolume(configSoundVolume);
                const configMusicVolume = data?.music_volume ?? 0.5;
                state.setMusicVolume(configMusicVolume);
                // Plays menu music initially
                // TODO: Add check if game is currently running
                if (configSelectedMusic !== "None") {
                    const { soundPacks } = state.getPublicState();
                    const currentPack = soundPacks.find((e) => e.name === configSelectedMusic);
                    let musicFileName = "menu_music.mp3";
                    if (Object.keys(currentPack?.mappings || {}).includes("menu_music.mp3")) {
                        const randIndex = Math.trunc(Math.random() * currentPack?.mappings["menu_music.mp3"].length);
                        musicFileName = currentPack?.mappings["menu_music.mp3"][randIndex];
                    }
                    menuMusic = new Audio(`/sounds_custom/${currentPack?.path || "error"}/${musicFileName}`);
                    menuMusic.play();
                    menuMusic.loop = true;
                    menuMusic.volume = configMusicVolume;
                    console.log("play and loop ran", menuMusic);
                    state.setMenuMusic(menuMusic);
                }
            });
        });
        const AppStateRegistrar = 
        // SteamClient is something exposed by the SP tab of SteamUI, it's not a decky-frontend-lib thingy, but you can still call it normally
        // Refer to the SteamClient.d.ts or just console.log(SteamClient) to see all of it's methods
        SteamClient.GameSessions.RegisterForAppLifetimeNotifications((update) => {
            const { soundPacks, menuMusic, selectedMusic, gamesRunning, musicVolume, } = state.getPublicState();
            if (selectedMusic !== "None") {
                if (update.bRunning) {
                    // Because gamesRunning is in globalState, array methods like push and splice don't work
                    state.setGamesRunning([...gamesRunning, update.unAppID]);
                    if (menuMusic != null) {
                        menuMusic.pause();
                        menuMusic.currentTime = 0;
                        state.setMenuMusic(null);
                    }
                }
                else {
                    state.setGamesRunning(gamesRunning.filter((e) => e !== update.unAppID));
                    // I'm re-using the filter here because I don't believe the getPublicState() method will update the values if they are changed
                    if (gamesRunning.filter((e) => e !== update.unAppID).length === 0) {
                        const currentMusic = soundPacks.find((e) => e.name === selectedMusic);
                        let musicFileName = "menu_music.mp3";
                        if (Object.keys(currentMusic?.mappings || {}).includes("menu_music.mp3")) {
                            const randIndex = Math.trunc(Math.random() *
                                currentMusic?.mappings["menu_music.mp3"].length);
                            musicFileName =
                                currentMusic?.mappings["menu_music.mp3"][randIndex];
                        }
                        const newMenuMusic = new Audio(`/sounds_custom/${currentMusic?.path || "error"}/${musicFileName}`);
                        newMenuMusic.play();
                        newMenuMusic.loop = true;
                        newMenuMusic.volume = musicVolume;
                        // Update menuMusic in globalState after every change so that it reflects the changes the next time it checks
                        state.setMenuMusic(newMenuMusic);
                    }
                }
            }
        });
        serverApi.routerHook.addRoute("/audiopack-manager", () => (window.SP_REACT.createElement(GlobalStateContextProvider, { globalStateClass: state },
            window.SP_REACT.createElement(PackManagerRouter, null))));
        return {
            title: window.SP_REACT.createElement("div", { className: staticClasses.Title }, "Audio Loader"),
            content: (window.SP_REACT.createElement(GlobalStateContextProvider, { globalStateClass: state },
                window.SP_REACT.createElement(Content, { serverAPI: serverApi }))),
            icon: window.SP_REACT.createElement(RiFolderMusicFill, null),
            onDismount: () => {
                const { menuMusic, soundPatchInstance, volumePatchInstance } = state.getPublicState();
                if (menuMusic != null) {
                    menuMusic.pause();
                    menuMusic.currentTime = 0;
                    state.setMenuMusic(null);
                }
                soundPatchInstance.unpatch();
                volumePatchInstance.unpatch();
                AppStateRegistrar.unregister();
            },
        };
    });

    return index;

})(SP_REACT);
