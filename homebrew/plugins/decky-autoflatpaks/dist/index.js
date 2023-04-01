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
    const findModule$1 = (filter) => {
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
    findModule$1((m) => {
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

    const Dropdown = Object.values(CommonUIModule).find((mod) => mod?.prototype?.SetSelectedOption && mod?.prototype?.BuildMenu);
    Object.values(CommonUIModule).find((mod) => mod?.toString()?.includes('"dropDownControlRef","description"'));

    const Focusable = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.render?.toString()?.includes('["flow-children","onActivate","onCancel","focusClassName",'))
                return m[prop];
        }
    });

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
    /**
     * Finds the SP window, since it is a render target as of 10-19-2022's beta
     */
    function findSP() {
        // old (SP as host)
        if (document.title == 'SP')
            return window;
        // new (SP as popup)
        const focusNav = getFocusNavController();
        const context = focusNav.m_ActiveContext || focusNav.m_LastActiveContext;
        return context.m_rgGamepadNavigationTrees.find((x) => x.m_ID == 'root_1_').Root.Element.ownerDocument
            .defaultView;
    }
    /**
     * Gets the correct FocusNavController, as the Feb 22 2023 beta has two for some reason.
     */
    function getFocusNavController() {
        return window.GamepadNavTree?.m_context?.m_controller || window.FocusNavController;
    }

    const showModalRaw = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (typeof m[prop] === 'function' &&
                m[prop].toString().includes('props.bDisableBackgroundDismiss') &&
                !m[prop]?.prototype?.Cancel) {
                return m[prop];
            }
        }
    });
    const oldShowModalRaw = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (typeof m[prop] === 'function' && m[prop].toString().includes('bHideMainWindowForPopouts:!0')) {
                return m[prop];
            }
        }
    });
    const showModal = (modal, parent, props = {
        strTitle: 'Decky Dialog',
        bHideMainWindowForPopouts: false,
    }) => {
        if (showModalRaw) {
            return showModalRaw(modal, parent || findSP(), props.strTitle, props, undefined, {
                bHideActions: props.bHideActionIcons,
            });
        }
        else if (oldShowModalRaw) {
            return oldShowModalRaw(modal, parent || findSP(), props);
        }
        else {
            throw new Error('[DFL:Modals]: Cannot find showModal function');
        }
    };
    const ConfirmModal = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (!m[prop]?.prototype?.OK && m[prop]?.prototype?.Cancel && m[prop]?.prototype?.render) {
                return m[prop];
            }
        }
    });
    // new as of december 2022 on beta
    const ModalRoot = (Object.values(findModule$1((m) => {
        if (typeof m !== 'object')
            return false;
        for (let prop in m) {
            if (m[prop]?.m_mapModalManager && Object.values(m)?.find((x) => x?.type)) {
                return true;
            }
        }
        return false;
    }) || {})?.find((x) => x?.type?.toString()?.includes('((function(){')) ||
        // before december 2022 beta
        Object.values(findModule$1((m) => {
            if (typeof m !== 'object')
                return false;
            for (let prop in m) {
                if (m[prop]?.toString()?.includes('"ModalManager","DialogWrapper"')) {
                    return true;
                }
            }
            return false;
        }) || {})?.find((x) => x?.type?.toString()?.includes('((function(){')) ||
        // old
        findModuleChild((m) => {
            if (typeof m !== 'object')
                return undefined;
            for (let prop in m) {
                if (m[prop]?.prototype?.OK && m[prop]?.prototype?.Cancel && m[prop]?.prototype?.render) {
                    return m[prop];
                }
            }
        }));

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

    const quickAccessMenuClasses = findModule$1((mod) => typeof mod === 'object' && mod?.Title?.includes('quickaccessmenu'));
    /**
     * @depreciated please use quickAccessMenuClasses instead
     */
    const staticClasses = quickAccessMenuClasses;
    findModule$1((mod) => typeof mod === 'object' && mod?.ScrollPanel?.includes('scrollpanel'));
    findModule$1((mod) => typeof mod === 'object' && mod?.GamepadDialogContent?.includes('gamepaddialog'));
    findModule$1((mod) => typeof mod === 'object' && mod?.PanelSection?.includes('quickaccesscontrols'));
    findModule$1((mod) => typeof mod === 'object' && mod?.OOBEUpdateStatusContainer?.includes('updaterfield'));
    findModule$1((mod) => typeof mod === 'object' && mod?.Container?.includes('appdetailsplaysection'));
    findModule$1((mod) => typeof mod === 'object' && mod?.SliderControlPanelGroup?.includes('gamepadslider'));
    findModule$1((mod) => typeof mod === 'object' && mod?.TopCapsule?.includes('sharedappdetailsheader'));
    findModule$1((mod) => typeof mod === 'object' && mod?.HeaderLoaded?.includes('appdetails_'));

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
        const oldTabsModule = findModule$1((m) => {
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

    const Toggle = Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('.ToggleOff)'));

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
    function FaArrowDown (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"}}]})(props);
    }function FaArrowRight (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"}}]})(props);
    }function FaArrowUp (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"}}]})(props);
    }function FaBoxOpen (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"}}]})(props);
    }function FaBox (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z"}}]})(props);
    }function FaDownload (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"}}]})(props);
    }function FaEllipsisH (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"}}]})(props);
    }function FaEyeSlash (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"}}]})(props);
    }function FaEye (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"}}]})(props);
    }function FaRedoAlt (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"}}]})(props);
    }function FaSyncAlt (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"}}]})(props);
    }function FaTrashAlt (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"}}]})(props);
    }

    var events;
    (function (events) {
        class AppStateEvent extends Event {
            constructor(appState, eventInitDict) {
                super(AppStateEvent.eType, eventInitDict);
                this.appState = appState;
            }
        }
        AppStateEvent.eType = 'AppStateEvent';
        events.AppStateEvent = AppStateEvent;
        class BatteryStateEvent extends Event {
            constructor(batteryState, eventInitDict) {
                super(BatteryStateEvent.eType, eventInitDict);
                this.batteryState = batteryState;
            }
        }
        BatteryStateEvent.eType = 'BatteryStateEvent';
        events.BatteryStateEvent = BatteryStateEvent;
        class PackageListEvent extends Event {
            constructor(packageList, eventInitDict) {
                super(PackageListEvent.eType, eventInitDict);
                this.packageList = packageList;
            }
        }
        PackageListEvent.eType = 'PackageListEvent';
        events.PackageListEvent = PackageListEvent;
        class PackageInfoEvent extends Event {
            constructor(packageInfo, eventInitDict) {
                super(packageInfo.ref, eventInitDict);
                this.eType = packageInfo.ref;
                this.packageInfo = packageInfo;
            }
        }
        events.PackageInfoEvent = PackageInfoEvent;
        class UpdateListEvent extends Event {
            constructor(updateList, eventInitDict) {
                super(UpdateListEvent.eType, eventInitDict);
                this.updateList = updateList;
            }
        }
        UpdateListEvent.eType = 'UpdateListEvent';
        events.UpdateListEvent = UpdateListEvent;
        class QueueProgressEvent extends Event {
            constructor(queueItem, queueLength, queueProgress, eventInitDict) {
                super(QueueProgressEvent.eType, eventInitDict);
                this.queueItem = queueItem;
                this.queueLength = queueLength;
                this.queueProgress = queueProgress;
            }
        }
        QueueProgressEvent.eType = 'QueueProgressEvent';
        events.QueueProgressEvent = QueueProgressEvent;
        class QueueCompletionEvent extends Event {
            constructor(queue, queueLength, queueRetCode, eventInitDict) {
                super(QueueCompletionEvent.eType, eventInitDict);
                this.queue = queue;
                this.queueLength = queueLength;
                this.queueRetCode = queueRetCode;
            }
        }
        QueueCompletionEvent.eType = 'QueueCompletionEvent';
        events.QueueCompletionEvent = QueueCompletionEvent;
    })(events || (events = {}));

    class Settings {
        static async loadFromLocalStorage() {
            var returncode = true;
            let settings = '[AutoFlatpaks] Loaded settings from storage';
            for (let key in this) {
                try {
                    if (typeof this[key] == "boolean")
                        this[key] = (await Backend.getSetting(key, this[key]));
                    else if (typeof this[key] == "number")
                        this[key] = (await Backend.getSetting(key, this[key]));
                    else if (typeof this[key] == "string")
                        this[key] = (await Backend.getSetting(key, this[key]));
                    else if (this[key] instanceof Date)
                        this[key] = new Date((await Backend.getSetting(key, this[key])).toString());
                    settings += `\n\t${key}: ${this[key]}`;
                }
                catch (error) {
                    returncode = false;
                    console.debug('[AutoFlatpaks] Failed to load setting: ', key);
                }
            }
            console.debug(settings);
            return returncode;
        }
        static async saveToLocalStorage() {
            let promises = Object.keys(this).map(key => {
                return Backend.setSetting(key, this[key]);
            });
            Promise.all(promises).then(async () => {
                await Backend.commitSettings();
            });
        }
        static async saveLastCheckTimestamp() {
            await Backend.setSetting('lastCheckTimestamp', this.lastCheckTimestamp);
            await Backend.commitSettings();
        }
    }
    Settings.showToast = true;
    Settings.playSound = true;
    Settings.checkOnBootEnabled = true;
    Settings.unattendedUpgradesEnabled = false;
    Settings.aggressiveEnabled = false;
    Settings.updateInterval = 720;
    Settings.lastCheckTimestamp = new Date();
    Settings.appDataLocation = '/home';

    var appStates;
    (function (appStates) {
        appStates[appStates["initializing"] = 0] = "initializing";
        appStates[appStates["failedInitialize"] = 1] = "failedInitialize";
        appStates[appStates["idle"] = 2] = "idle";
        appStates[appStates["checkingForUpdates"] = 3] = "checkingForUpdates";
        appStates[appStates["buildingPackageList"] = 4] = "buildingPackageList";
        appStates[appStates["processingQueue"] = 5] = "processingQueue";
        appStates[appStates["repairingPackages"] = 6] = "repairingPackages";
        appStates[appStates["migratingAppData"] = 7] = "migratingAppData";
    })(appStates || (appStates = {}));
    class Backend {
        //#region Backend class interactions
        static initBackend(server) {
            // Basically a constructor/pseudo-context
            this.setServer(server);
            this.appState = {
                initialized: false,
                state: appStates.initializing
            };
            this.eventBus = new EventTarget();
            this.packageList = [];
            this.updateList = [];
            this.queue = [];
            this.queueLength = 0;
            this.queueProgress = 0;
            this.intervalID = setInterval(() => {
                // @ts-ignore
                let currentState = window.SystemPowerStore.batteryState;
                if (currentState != this.pseudoBatteryState)
                    this.setBatteryStateChange(currentState);
            }, 1000);
        }
        static onDismount() {
            clearInterval(this.intervalID);
        }
        static setBatteryStateChange(batteryState) {
            this.pseudoBatteryState = batteryState;
            this.eventBus.dispatchEvent(new events.BatteryStateEvent(this.pseudoBatteryState));
        }
        static setServer(server) { this.serverAPI = server; }
        static getServer() { return this.serverAPI; }
        static setAppState(state) {
            this.appState.state = state;
            this.eventBus.dispatchEvent(new events.AppStateEvent(this.appState.state));
        }
        static getAppState() { return this.appState.state; }
        static getPL() { return this.packageList; }
        static setPL(packageList) {
            this.packageList = packageList;
            this.eventBus.dispatchEvent(new events.PackageListEvent(this.packageList));
        }
        static getPLPackage(pkgref) {
            return this.packageList.find(plitem => plitem.ref == pkgref);
        }
        static setPLPackage(pkgref, metadata) {
            let idx = this.packageList.findIndex(plitem => plitem.ref == pkgref);
            this.packageList[idx] = { ...this.packageList[idx], ...metadata };
            this.eventBus.dispatchEvent(new events.PackageInfoEvent(this.packageList[idx]));
        }
        static getUpdateList() { return this.updateList; }
        static setUpdateList(updateList) {
            if (updateList.length == 0) {
                this.updateList = [];
            }
            else if ('op' in updateList[0]) {
                this.updateList = updateList.map((item) => item.application);
            }
            else if ('updateable' in updateList[0]) {
                this.updateList = updateList.filter(item => item.updateable && !item.masked && !item.parentMasked).map(item => item.application);
            }
            this.eventBus.dispatchEvent(new events.UpdateListEvent(this.updateList));
        }
        static getQueue() { return this.queue; }
        static setQueue(queue) { this.queue = queue; }
        static getQueueLength() { return this.queueLength; }
        static setQueueLength() { this.queueLength = Backend.getQueue().length; }
        static getQueueProgress() { return (this.queueLength - this.queueProgress + 1); } // Offset by one to show current number instead of previous
        static setQueueProgress(currentQueueLength) { this.queueProgress = currentQueueLength; }
        static setAppInitialized(state) { this.appState.initialized = state; }
        static getAppInitialized() { return this.appState.initialized; }
        static async bridge(functionName, namedArgs) {
            namedArgs = (namedArgs) ? namedArgs : {};
            let output = await this.serverAPI.callPluginMethod(functionName, namedArgs);
            console.debug('[AutoFlatpaks] bridge - ', functionName, ': ', namedArgs, ' output: ', output);
            return output.result;
        }
        //#endregion
        //#region Settings interactions
        static async getSetting(key, defaults) {
            let proc = await this.bridge("settings_getSetting", { key, defaults });
            return proc.output;
        }
        static async setSetting(key, value) {
            let proc = await this.bridge("settings_setSetting", { key, value });
            return proc.output;
        }
        static async commitSettings() {
            let proc = await this.bridge("settings_commit");
            return proc.output;
        }
        //#endregion
        //#region Queue interactions
        static async queueAction(queueData) {
            if (this.getAppState() != appStates.idle)
                return false;
            this.queue.push(queueData);
            return true;
        }
        static async dequeueAction(queueData, processQueue) {
            if (this.getAppState() != appStates.idle && !processQueue)
                return false;
            this.queue = this.queue.filter(item => !(item.action == queueData.action && item.packageRef == queueData.packageRef));
            return true;
        }
        static async ProcessQueue() {
            if (this.getAppState() != appStates.idle)
                return false;
            this.setAppState(appStates.processingQueue);
            let returncode = true;
            this.setQueueLength();
            let queueCopy = this.getQueue();
            let queueLength = this.getQueueLength();
            let queueRetCode = [];
            for (let item of this.queue) {
                console.debug("[AutoFlatpaks] Processing Queue Item: ", item);
                let retcode = true;
                this.setQueueProgress(this.queue.length);
                this.eventBus.dispatchEvent(new events.QueueProgressEvent(item, queueLength, this.getQueueProgress()));
                // Run await action: mask/unmask, install/uninstall, update
                if (item.action == 'mask') {
                    retcode = await this.MaskPackage(item.packageRef);
                }
                if (item.action == 'unmask') {
                    retcode = await this.UnMaskPackage(item.packageRef);
                }
                if (item.action == 'install') {
                    retcode = await this.InstallPackage(item.packageRef, item.extraParameters?.appdataDestination);
                }
                if (item.action == 'uninstall' && item.extraParameters?.removeUnused) {
                    retcode = await this.UnInstallPackage(item.packageRef, item.extraParameters.removeUnused);
                }
                else if (item.action == 'uninstall') {
                    retcode = await this.UnInstallPackage(item.packageRef);
                }
                if (item.action == 'update') {
                    retcode = await this.UpdatePackage(item.packageRef);
                }
                if (item.action == 'datamigration') {
                    retcode = await this.MigrateAppData(item.packageRef, item.extraParameters?.appdataSource, item.extraParameters?.appdataDestination);
                }
                if (!retcode)
                    returncode = false;
                queueRetCode.push({ queueData: item, retcode: retcode });
                await this.dequeueAction(item, true);
            }
            if (queueLength) {
                this.getUpdatePackageList(true);
                this.eventBus.dispatchEvent(new events.QueueCompletionEvent(queueCopy, queueLength, queueRetCode));
                console.debug("[AutoFlatpaks] Queue Complete: ", queueRetCode);
            }
            this.setAppState(appStates.idle);
            return returncode;
        }
        //#endregion
        //#region Flatpak getInfo interactions
        static async getPackageList(localOnly) {
            if (this.getAppState() == appStates.buildingPackageList)
                return undefined;
            this.setAppState(appStates.buildingPackageList);
            let output = [];
            await Promise.all([this.getRemotePackageList(), this.getRemotePackageList(true), this.getLocalPackageList(), this.getMaskList()]).then((value) => {
                let rpl = value[0] || [];
                let upl = value[1] || [];
                let lpl = value[2];
                let mpl = value[3];
                // Add local packages & updateable data to list
                output = lpl.map(lplitem => {
                    let default_metadata = {
                        installed: true,
                        updateable: false,
                        masked: false
                    };
                    let idx = upl.findIndex(uplitem => uplitem.ref == lplitem.ref);
                    if (idx < 0)
                        return { ...lplitem, ...default_metadata };
                    let uplitem = upl[idx];
                    let upl_metadata = {
                        commit: uplitem.commit,
                        download_size: uplitem.download_size,
                        updateable: (uplitem.commit != lplitem.active) ? true : false
                    };
                    return { ...lplitem, ...default_metadata, ...upl_metadata };
                });
                //console.log('PL (LPL+U): ', output)
                // Add remote packages not in list
                if (!localOnly && rpl) {
                    let rplitems = rpl.filter((rplitem) => !lpl.map((lplitem) => lplitem.ref).includes(rplitem.ref));
                    for (let rplitem of rplitems) {
                        output.push({ ...rplitem, installed: false, updateable: false, masked: false });
                    }
                    //console.log('PL (LPL+U+RPL): ', output)
                }
                // Add mask data to list
                output.map((item) => {
                    if (mpl.includes(item.ref)) {
                        item.masked = true;
                    }
                    if (item.parent && mpl.includes(item.parent)) {
                        item.parentMasked = true;
                    }
                    return item;
                });
                //console.log('PL (LPL+U+RPL+MPL): ', output)
            });
            this.setPL(output);
            this.setUpdateList(output);
            this.setAppState(appStates.idle);
            return output;
        }
        static async getLocalPackageList() {
            let proc = await this.bridge("getLocalPackageList");
            return proc.output;
        }
        static async getRemotePackageList(updateOnly) {
            let proc = await this.bridge("getRemotePackageList", { updateOnly: updateOnly });
            return proc.output;
        }
        static async getMaskList() {
            let proc = await this.bridge("getMaskList");
            return proc.output;
        }
        static async getUnusedPackageList() {
            let proc = await this.bridge("getUnusedPackageList");
            return proc.output;
        }
        static async getRunningPackageList() {
            let proc = await this.bridge("getRunningPackageList");
            return proc.output;
        }
        static async getUpdatePackageList(internal) {
            if (!internal)
                this.setAppState(appStates.checkingForUpdates);
            let proc = await this.bridge("getUpdatePackageList");
            this.setUpdateList(proc.output);
            if (!internal)
                this.setAppState(appStates.idle);
            return proc.output;
        }
        static async getPackageCount() {
            let packages = await this.getUpdatePackageList();
            if (!packages)
                return undefined;
            let package_count = packages.length;
            return package_count;
        }
        static async getPackageHistory() {
            let proc = await this.bridge("getPackageHistory");
            return proc.output;
        }
        //#endregion
        //#region Flatpak Action interactions
        static async MaskPackage(pkgref) {
            let proc = await this.bridge("MaskPackage", { pkgref: pkgref });
            if (proc.returncode != 0)
                return false;
            this.setPLPackage(pkgref, { masked: true });
            // Update child package masked information
            this.packageList.filter(item => item.parent == pkgref).forEach(item => this.setPLPackage(item.ref, { parentMasked: true }));
            return true;
        }
        static async UnMaskPackage(pkgref) {
            let proc = await this.bridge("UnMaskPackage", { pkgref: pkgref });
            if (proc.returncode != 0)
                return false;
            this.setPLPackage(pkgref, { masked: false });
            // Update child package masked information
            this.packageList.filter(item => item.parent == pkgref).forEach(item => this.setPLPackage(item.ref, { parentMasked: false }));
            return true;
        }
        static async InstallPackage(pkgref, appDataDevice) {
            appDataDevice = await this.sanitizeHomeDevice(appDataDevice);
            let proc = await this.bridge("InstallPackage", { pkgref: pkgref, appDataDevice: appDataDevice });
            if (proc.returncode != 0)
                return false;
            this.setPLPackage(pkgref, { installed: true });
            return true;
        }
        static async UnInstallPackage(pkgref, removeUnused = false) {
            let proc = await this.bridge("UnInstallPackage", { pkgref: pkgref, removeUnused: removeUnused });
            if (proc.returncode != 0)
                return false;
            this.setPLPackage(pkgref, { installed: false });
            return true;
        }
        static async UpdatePackage(pkgref) {
            let flatpakMetadata = this.getPLPackage(pkgref);
            if (flatpakMetadata?.masked) {
                await this.UnMaskPackage(pkgref);
            }
            let proc = await this.bridge("UpdatePackage", { pkgref: pkgref });
            if (flatpakMetadata?.masked) {
                await this.MaskPackage(pkgref);
            }
            if (proc.returncode != 0)
                return false;
            this.setPLPackage(pkgref, { updateable: false });
            return true;
        }
        static async UpdateAllPackages() {
            if (this.getAppState() != appStates.idle)
                return false;
            let returncode = await this.UpdateOrUnusedPackages(this.getUpdatePackageList());
            return returncode;
        }
        static async MigrateAppData(pkgref, appDataSource, appDataDevice) {
            appDataSource = await this.sanitizeHomeDevice(appDataSource);
            appDataDevice = await this.sanitizeHomeDevice(appDataDevice);
            let proc = await this.bridge("migrateAppData", { pkgref: pkgref, appDataSource: appDataSource, appDataDevice: appDataDevice });
            if (proc.returncode != 0)
                return false;
            return true;
        }
        //#endregion
        //#region Helper Functions
        static async sanitizeHomeDevice(destinationDevice) {
            let logText = `[AutoFlatpaks] Sanitize device: ${destinationDevice} => `;
            // Convert /home => DefaultHome
            if (!destinationDevice) {
                destinationDevice = Settings.appDataLocation;
            }
            let installFolders = await SteamClient.InstallFolder.GetInstallFolders();
            let homeInstallFolder = installFolders.find(installFolder => installFolder.nFolderIndex == 0);
            if (homeInstallFolder?.strDriveName == destinationDevice) {
                destinationDevice = 'DefaultHome';
            }
            console.log(logText + destinationDevice);
            return destinationDevice;
        }
        static async getAppDataDirectoryList(appDataDevice) {
            appDataDevice = await this.sanitizeHomeDevice(appDataDevice);
            let proc = await this.bridge("getAppDataDirectoryList", { appDataDevice: appDataDevice });
            return proc.output;
        }
        //#endregion
        //#region Advanced Functions
        static async getRunningPackages() {
            let result = [];
            let runningList = await Backend.getRunningPackageList();
            if (runningList.length == 0)
                return result;
            let localPackageList = await Backend.getLocalPackageList();
            result = runningList.map(item => {
                let application = item.application;
                if (localPackageList.length > 0) {
                    let app = localPackageList.find(LPLItem => LPLItem.application == item.application && LPLItem.branch == item.branch && LPLItem.arch == item.arch);
                    if (app)
                        application = app.name;
                }
                return application;
            });
            result = [...new Set(result)];
            return result;
        }
        static async RemoveUnusedPackages() {
            if (this.getAppState() != appStates.idle)
                return false;
            let returncode = await this.UpdateOrUnusedPackages(this.getUnusedPackageList());
            return returncode;
        }
        static async UpdateOrUnusedPackages(promise) {
            let returncode = true;
            let upl = await promise;
            if (!upl.length)
                return returncode;
            if (!this.packageList.length)
                await this.getPackageList();
            let rpl = this.packageList;
            let liveFPMQueue = [...this.queue];
            if (liveFPMQueue)
                this.setQueue([]);
            for (let uplitem of upl) {
                let idx = rpl.findIndex(rplitem => rplitem.application == uplitem.application && rplitem.branch == uplitem.branch && (('remote' in uplitem && rplitem.origin == uplitem.remote) || !('remote' in uplitem)));
                let pkgAction = '';
                let extraParameters = {};
                if (['i', 'u'].includes(uplitem.op)) {
                    pkgAction = 'update';
                }
                if (uplitem.op == 'r') {
                    pkgAction = 'uninstall';
                    extraParameters['removeUnused'] = true;
                }
                if (!pkgAction) {
                    console.debug(`[AutoFlatpaks] ${rpl[idx].ref} Unknown op: ${uplitem.op}`);
                    continue;
                }
                this.queueAction({ action: pkgAction, packageRef: rpl[idx].ref, extraParameters: extraParameters });
            }
            returncode = await this.ProcessQueue();
            if (liveFPMQueue)
                this.setQueue(liveFPMQueue);
            return returncode;
        }
        static async MigrateAllAppData(source, destination) {
            let returncode = true;
            if (this.getAppState() != appStates.idle)
                return false;
            let liveFPMQueue = [...this.queue];
            if (liveFPMQueue)
                this.setQueue([]);
            let packages = await this.getAppDataDirectoryList(source);
            for (let idx in packages) {
                this.queueAction({ action: "datamigration", packageRef: packages[idx], extraParameters: { appdataSource: source, appdataDestination: destination } });
            }
            returncode = await this.ProcessQueue();
            if (liveFPMQueue)
                this.setQueue(liveFPMQueue);
            return returncode;
        }
        static async RepairPackages(dryrun) {
            if (this.getAppState() != appStates.idle)
                return false;
            this.setAppState(appStates.repairingPackages);
            if (!dryrun)
                dryrun = false;
            let returncode = await this.bridge("RepairPackages", { dryrun: dryrun });
            this.setAppState(appStates.idle);
            return returncode;
        }
    }

    //#region Find SteamOS modules
    const findModule = (property) => {
        return findModuleChild((m) => {
            if (typeof m !== "object")
                return undefined;
            for (let prop in m) {
                try {
                    if (m[prop][property])
                        return m[prop];
                }
                catch {
                    return undefined;
                }
            }
        });
    };
    const NavSoundMap = findModule("ToastMisc");
    //#endregion
    class SteamUtils {
        //#region Notification Wrapper
        static async notify(title, message, showToast, playSound, sound, duration) {
            if (sound === undefined)
                sound = NavSoundMap?.ToastMisc; // Not important, could pass the actual number instead (6)
            if (playSound === undefined)
                playSound = Settings.playSound;
            if (showToast === undefined)
                showToast = Settings.showToast;
            let toastData = {
                title: title,
                body: message,
                duration: duration,
                sound: sound,
                playSound: playSound,
                showToast: showToast
            };
            Backend.getServer().toaster.toast(toastData);
        }
    }
    class SteamCssVariables {
    }
    SteamCssVariables.basicuiHeaderHeight = "var(--basicui-header-height)"; // 0px
    SteamCssVariables.stickyHeaderBackgroundOpacity = "var(--sticky-header-background-opacity)"; // 0
    SteamCssVariables.gamepadPageContentMaxWidth = "var(--gamepad-page-content-max-width)"; // 1100px
    SteamCssVariables.scrollFadeSize = "var(--scroll-fade-size)"; // 20px
    SteamCssVariables.virtualmenuAccent = "var(--virtualmenu-accent)"; // #1a9fff
    SteamCssVariables.virtualmenuBg = "var(--virtualmenu-bg)"; // #1f1f1f
    SteamCssVariables.virtualmenuBgHover = "var(--virtualmenu-bg-hover)"; // #103753
    SteamCssVariables.virtualmenuFg = "var(--virtualmenu-fg)"; // #ffffff
    SteamCssVariables.virtualmenutouchkeyIconWidth = "var(--virtualmenutouchkey-icon-width)"; // 100%
    SteamCssVariables.virtualmenutouchkeyIconHeight = "var(--virtualmenutouchkey-icon-height)"; // 100%
    SteamCssVariables.virtualmenupointerX = "var(--virtualmenupointer-x)"; // 0%
    SteamCssVariables.virtualmenupointerY = "var(--virtualmenupointer-y)"; // 0%
    SteamCssVariables.virtualmenupointerColor = "var(--virtualmenupointer-color)"; // #1a9fff
    SteamCssVariables.virtualmenutouchkeyMidpointX = "var(--virtualmenutouchkey-midpoint-x)"; // 0%
    SteamCssVariables.virtualmenutouchkeyMidpointY = "var(--virtualmenutouchkey-midpoint-y)"; // 0%
    SteamCssVariables.virtualmenutouchkeyDescriptionWidth = "var(--virtualmenutouchkey-description-width)"; // 0px
    SteamCssVariables.touchmenuiconFg = "var(--touchmenuicon-fg)"; // #b8bcbf
    SteamCssVariables.touchmenuiconBg = "var(--touchmenuicon-bg)"; // #1f1f1f
    SteamCssVariables.touchmenuiconScale = "var(--touchmenuicon-scale)"; // 1
    SteamCssVariables.indentLevel = "var(--indent-level)"; // 0
    SteamCssVariables.fieldNegativeHorizontalMargin = "var(--field-negative-horizontal-margin)"; // 0px
    SteamCssVariables.fieldRowChildrenSpacing = "var(--field-row-children-spacing)"; // 0px
    SteamCssVariables.mainTextColor = "var(--main-text-color)"; // #dbe2e6
    SteamCssVariables.mainLightBlueBackground = "var(--main-light-blue-background)"; // #93b3c8
    SteamCssVariables.mainTextOnLightBlue = "var(--main-text-on-light-blue)"; // #d1d1d1
    SteamCssVariables.mainTopImageBg = "var(--main-top-image-bg)"; // #1f2126
    SteamCssVariables.mainEditorBgColor = "var(--main-editor-bg-color)"; // #363a43
    SteamCssVariables.mainEditorTextColor = "var(--main-editor-text-color)"; // #e6e7e8
    SteamCssVariables.mainEditorInputBgColor = "var(--main-editor-input-bg-color)"; // #30333b
    SteamCssVariables.mainEditorSectionTitleColor = "var(--main-editor-section-title-color)"; // #a3a3a3
    SteamCssVariables.gpSystemLightestGrey = "var(--gpSystemLightestGrey)"; // #DCDEDF
    SteamCssVariables.gpSystemLighterGrey = "var(--gpSystemLighterGrey)"; // #B8BCBF
    SteamCssVariables.gpSystemLightGrey = "var(--gpSystemLightGrey)"; // #8B929A
    SteamCssVariables.gpSystemGrey = "var(--gpSystemGrey)"; // #67707B
    SteamCssVariables.gpSystemDarkGrey = "var(--gpSystemDarkGrey)"; // #3D4450
    SteamCssVariables.gpSystemDarkerGrey = "var(--gpSystemDarkerGrey)"; // #23262E
    SteamCssVariables.gpSystemDarkestGrey = "var(--gpSystemDarkestGrey)"; // #0E141B
    SteamCssVariables.gpStoreLightestGrey = "var(--gpStoreLightestGrey)"; // #CCD8E3
    SteamCssVariables.gpStoreLighterGrey = "var(--gpStoreLighterGrey)"; // #A7BACC
    SteamCssVariables.gpStoreLightGrey = "var(--gpStoreLightGrey)"; // #7C8EA3
    SteamCssVariables.gpStoreGrey = "var(--gpStoreGrey)"; // #4e697d
    SteamCssVariables.gpStoreDarkGrey = "var(--gpStoreDarkGrey)"; // #2A475E
    SteamCssVariables.gpStoreDarkerGrey = "var(--gpStoreDarkerGrey)"; // #1B2838
    SteamCssVariables.gpStoreDarkestGrey = "var(--gpStoreDarkestGrey)"; // #000F18
    SteamCssVariables.gpGradientStoreBackground = "var(--gpGradient-StoreBackground)"; // linear-gradient(180deg, var(--gpStoreDarkGrey) 0%, var(--gpStoreDarkerGrey) 80%)
    SteamCssVariables.gpGradientLibraryBackground = "var(--gpGradient-LibraryBackground)"; // radial-gradient(farthest-corner at 40px 40px,#3D4450 0%, #23262E 80%)
    SteamCssVariables.gpColorBlue = "var(--gpColor-Blue)"; // #1A9FFF
    SteamCssVariables.gpColorBlueHi = "var(--gpColor-BlueHi)"; // #00BBFF
    SteamCssVariables.gpColorGreen = "var(--gpColor-Green)"; // #5ba32b
    SteamCssVariables.gpColorGreenHi = "var(--gpColor-GreenHi)"; // #59BF40
    SteamCssVariables.gpColorOrange = "var(--gpColor-Orange)"; // #E35E1C
    SteamCssVariables.gpColorRed = "var(--gpColor-Red)"; // #D94126
    SteamCssVariables.gpColorRedHi = "var(--gpColor-RedHi)"; // #EE563B
    SteamCssVariables.gpColorDustyBlue = "var(--gpColor-DustyBlue)"; // #417a9b
    SteamCssVariables.gpColorLightBlue = "var(--gpColor-LightBlue)"; // #B3DFFF
    SteamCssVariables.gpColorYellow = "var(--gpColor-Yellow)"; // #FFC82C
    SteamCssVariables.gpColorChalkyBlue = "var(--gpColor-ChalkyBlue)"; // #66C0F4
    SteamCssVariables.gpBackgroundLightSofter = "var(--gpBackground-LightSofter)"; // #6998bb24
    SteamCssVariables.gpBackgroundLightSoft = "var(--gpBackground-LightSoft)"; // #3b5a7280
    SteamCssVariables.gpBackgroundLightMedium = "var(--gpBackground-LightMedium)"; // #678BA670
    SteamCssVariables.gpBackgroundLightHard = "var(--gpBackground-LightHard)"; // #93B8D480
    SteamCssVariables.gpBackgroundLightHarder = "var(--gpBackground-LightHarder)"; // #aacce6a6
    SteamCssVariables.gpBackgroundDarkSofter = "var(--gpBackground-DarkSofter)"; // #0e141b33
    SteamCssVariables.gpBackgroundDarkSoft = "var(--gpBackground-DarkSoft)"; // #0e141b66
    SteamCssVariables.gpBackgroundDarkMedium = "var(--gpBackground-DarkMedium)"; // #0e141b99
    SteamCssVariables.gpBackgroundDarkHard = "var(--gpBackground-DarkHard)"; // #0e141bcc
    SteamCssVariables.gpBackgroundNeutralLightSofter = "var(--gpBackground-Neutral-LightSofter)"; // #ebf6ff1a
    SteamCssVariables.gpBackgroundNeutralLightSoft = "var(--gpBackground-Neutral-LightSoft)"; // #ebf6ff33
    SteamCssVariables.gpBackgroundNeutralLightMedium = "var(--gpBackground-Neutral-LightMedium)"; // #ebf6ff4d
    SteamCssVariables.gpBackgroundNeutralLightHard = "var(--gpBackground-Neutral-LightHard)"; // #ebf6ff66
    SteamCssVariables.gpBackgroundNeutralLightHarder = "var(--gpBackground-Neutral-LightHarder)"; // #ebf6ff80
    SteamCssVariables.gpCornerSmall = "var(--gpCorner-Small)"; // 1px
    SteamCssVariables.gpCornerMedium = "var(--gpCorner-Medium)"; // 2px
    SteamCssVariables.gpCornerLarge = "var(--gpCorner-Large)"; // 3px
    SteamCssVariables.gpSpaceGutter = "var(--gpSpace-Gutter)"; // 24px
    SteamCssVariables.gpSpaceGap = "var(--gpSpace-Gap)"; // 12px
    SteamCssVariables.gpNavWidth = "var(--gpNavWidth)"; // 240px
    SteamCssVariables.gpPaymentsNavWidth = "var(--gpPaymentsNavWidth)"; // 340px
    SteamCssVariables.gpDselectWidth = "var(--gpDselectWidth)"; // 340px
    SteamCssVariables.gpSidePanelWidth = "var(--gpSidePanelWidth)"; // 340px
    SteamCssVariables.gpGiftingPanelWidth = "var(--gpGiftingPanelWidth)"; // 280px
    SteamCssVariables.gpCommunityRightPanelWidth = "var(--gpCommunityRightPanelWidth)"; // 320px
    SteamCssVariables.gpVerticalResponsivePaddingSmall = "var(--gpVerticalResponsivePadding-Small)"; // calc( (100vw - 854px) / 60 )
    SteamCssVariables.gpVerticalResponsivePaddingMedium = "var(--gpVerticalResponsivePadding-Medium)"; // calc( (100vw - 854px) / 20 )
    SteamCssVariables.gpVerticalResponsivePaddingLarge = "var(--gpVerticalResponsivePadding-Large)"; // calc( (100vw - 854px) / 12 )
    SteamCssVariables.gpScreenWidth = "var(--screen-width)"; // 100vw
    SteamCssVariables.gpWidth6colcap = "var(--gpWidth-6colcap)"; // calc((var(--screen-width) - (5 * var(--gpSpace-Gap)) - (2 * var(--gpSpace-Gutter))) / 6)
    SteamCssVariables.gpWidth5colcap = "var(--gpWidth-5colcap)"; // calc((var(--screen-width) - (4 * var(--gpSpace-Gap)) - (2 * var(--gpSpace-Gutter))) / 5)
    SteamCssVariables.gpWidth4colcap = "var(--gpWidth-4colcap)"; // calc((var(--screen-width) - (3 * var(--gpSpace-Gap)) - (2 * var(--gpSpace-Gutter))) / 4)
    SteamCssVariables.gpWidth3colcap = "var(--gpWidth-3colcap)"; // calc((var(--screen-width) - (2 * var(--gpSpace-Gap)) - (2 * var(--gpSpace-Gutter))) / 3)
    SteamCssVariables.gpWidth2colcap = "var(--gpWidth-2colcap)"; // calc((var(--screen-width) - (1 * var(--gpSpace-Gap)) - (2 * var(--gpSpace-Gutter))) / 2)
    SteamCssVariables.gpWidth1colcap = "var(--gpWidth-1colcap)"; // calc((var(--screen-width) - (2 * var(--gpSpace-Gutter))))
    SteamCssVariables.gpStoreMenuHeight = "var(--gpStoreMenuHeight)"; // 58px
    SteamCssVariables.gpShadowSmall = "var(--gpShadow-Small)"; // 0px 2px 2px 0px #0000003D
    SteamCssVariables.gpShadowMedium = "var(--gpShadow-Medium)"; // 0px 3px 6px 0px #0000003D
    SteamCssVariables.gpShadowLarge = "var(--gpShadow-Large)"; // 0px 12px 16px 0px #0000003D
    SteamCssVariables.gpShadowXLarge = "var(--gpShadow-XLarge)"; // 0px 24px 32px 0px #0000003D
    SteamCssVariables.gpTextHeadingLarge = "var(--gpText-HeadingLarge)"; // normal 700 26px/1.4 "Motiva Sans", Arial, Sans-serif
    SteamCssVariables.gpTextHeadingMedium = "var(--gpText-HeadingMedium)"; // normal 700 22px/1.4 "Motiva Sans", Arial, Sans-serif
    SteamCssVariables.gpTextHeadingSmall = "var(--gpText-HeadingSmall)"; // normal 700 18px/1.4 "Motiva Sans", Arial, Sans-serif
    SteamCssVariables.gpTextBodyLarge = "var(--gpText-BodyLarge)"; // normal 400 16px/1.4 "Motiva Sans", Arial, Sans-serif
    SteamCssVariables.gpTextBodyMedium = "var(--gpText-BodyMedium)"; // normal 400 14px/1.4 "Motiva Sans", Arial, Sans-serif
    SteamCssVariables.gpTextBodySmall = "var(--gpText-BodySmall)"; // normal 400 12px/1.4 "Motiva Sans", Arial, Sans-serif
    // Custom shared CSS
    SteamCssVariables.customTransparent = "#fff0"; // Transparent
    SteamCssVariables.customStatusGreen = "#0b6f4c";
    SteamCssVariables.customStatusYellow = "#9c8f40";
    SteamCssVariables.customStatusRed = "#7a0a0a";
    SteamCssVariables.customSpinnerBgColor = "#0c1519";

    // THIS FILE IS AUTO GENERATED
    function SiGithub (props) {
      return GenIcon({"tag":"svg","attr":{"role":"img","viewBox":"0 0 24 24"},"child":[{"tag":"title","attr":{},"child":[]},{"tag":"path","attr":{"d":"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}}]})(props);
    }function SiKofi (props) {
      return GenIcon({"tag":"svg","attr":{"role":"img","viewBox":"0 0 24 24"},"child":[{"tag":"title","attr":{},"child":[]},{"tag":"path","attr":{"d":"M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"}}]})(props);
    }

    const ScrollPanel = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.render
                ?.toString()
                ?.includes('["onOKButton","onCancelButton","navRef","focusable"]'))
                return m[prop];
        }
    });

    const AboutScrollPanel = {
        height: "95%",
        minHeight: "95%",
        margin: "0px",
        borderRadius: SteamCssVariables.gpCornerLarge,
        display: "flex",
        justifyContent: "center",
        backgroundColor: SteamCssVariables.gpBackgroundLightSofter
    };
    const AboutContainer = {
        margin: "20px 20px 0px 20px",
        paddingBottom: "15px",
        flexDirection: "column",
        minWidth: "95%",
        display: "flex"
    };
    const AboutPage = () => {
        const scrollView = React.useRef(null);
        return (window.SP_REACT.createElement(ScrollPanel, { style: AboutScrollPanel, focusable: true, autoFocus: false, noFocusRing: true, onClick: () => scrollView.current?.focus(), onOKButton: () => scrollView.current?.focus(), onButtonDown: (e) => {
                if (e.detail.button == 10)
                    scrollView.current?.focus();
            } },
            window.SP_REACT.createElement(Focusable, { style: AboutContainer, 
                // @ts-ignore
                focusableIfNoChildren: true, noFocusRing: true, ref: scrollView },
                window.SP_REACT.createElement("div", null,
                    window.SP_REACT.createElement("h3", { style: { margin: "0px" } }, "Browse Page Navigation"),
                    window.SP_REACT.createElement("p", null,
                        "The browse page houses a filter-able list of packages with button toggles and a single refresh button at the top. Each package row can be interacted with in a couple of ways:",
                        window.SP_REACT.createElement("ul", null,
                            window.SP_REACT.createElement("li", null, "Pressing Y: Brings up the options menu where filtering and sorting options are available"),
                            window.SP_REACT.createElement("li", null, "Pressing X: Applies the queued actions to the console (package updates/installs/removals/etc)"),
                            window.SP_REACT.createElement("li", null, "Pressing A on a package: Brings up a window with extra package information and description"),
                            window.SP_REACT.createElement("li", null,
                                window.SP_REACT.createElement(FaEye, null),
                                " / ",
                                window.SP_REACT.createElement(FaEyeSlash, null),
                                ": Queues an action to mask or unmask the selected package"),
                            window.SP_REACT.createElement("li", null,
                                window.SP_REACT.createElement(FaSyncAlt, null),
                                ": Queues an action to update the selected package"),
                            window.SP_REACT.createElement("li", null,
                                window.SP_REACT.createElement(FaDownload, null),
                                " / ",
                                window.SP_REACT.createElement(FaTrashAlt, null),
                                ": Queues an action to install or uninstall the selected package"))),
                    window.SP_REACT.createElement("h3", null, "Installing Packages from Flathub"),
                    window.SP_REACT.createElement("p", null,
                        "Package installation/browsing (from flathub) is available by using the options menu and changing the status filter to either ",
                        window.SP_REACT.createElement("b", null, "All"),
                        " OR ",
                        window.SP_REACT.createElement("b", null, "Not Installed"),
                        ". While it is not required to have other filters, it is recommended to set any other desired filters first before setting the status filter to either option for a more seamless experience as all filters are applied instantly (except search) and will have a small momentary performance hit while re-filtering the full list."),
                    window.SP_REACT.createElement("h3", null, "Filters"),
                    window.SP_REACT.createElement("p", null,
                        "There is a small set of filters available to help users find the packages they want to manage that is divided into 4 main categories:",
                        window.SP_REACT.createElement("ul", null,
                            window.SP_REACT.createElement("li", null, "Search: A searchbar with literal search (no fuzzy/relative searching)"),
                            window.SP_REACT.createElement("li", null, "Type: All types, Applications, Runtimes"),
                            window.SP_REACT.createElement("li", null, "Status: All statuses, Installed, Not Installed, Queued, Updateable"),
                            window.SP_REACT.createElement("li", null, "Mask: All, Masked, Unmasked"))),
                    window.SP_REACT.createElement("h3", null, "Masking Packages"),
                    window.SP_REACT.createElement("p", null, "Masking packages will prevent AutoFlatpaks from automatically updating/notifying about updates for the masked package as well as some of the dependencies (locale/debug packages). This allows users to keep a specific package version of applications without negatively impacting the user experience while auto-updating other packages and the masks WILL CARRY OVER to Discover as well."),
                    window.SP_REACT.createElement("h3", null, "QAM Navigation"),
                    window.SP_REACT.createElement("p", null,
                        "The QAM panel menu houses the settings for notifications and automatic updates available for flatpaks and consists of 5 main elements:",
                        window.SP_REACT.createElement("ul", null,
                            window.SP_REACT.createElement("li", null,
                                "An auto-hiding status bar showing various app states, including:",
                                window.SP_REACT.createElement("ul", null,
                                    window.SP_REACT.createElement("li", null, "queue progress"),
                                    window.SP_REACT.createElement("li", null, "checking for updates"),
                                    window.SP_REACT.createElement("li", null, "repairing packages"),
                                    window.SP_REACT.createElement("li", null, "available updates (clickable)"))),
                            window.SP_REACT.createElement("li", null, "A button bar to access the package manager, check for updates, and manually update all packages"),
                            window.SP_REACT.createElement("li", null, "Settings for the interval of time to wait between automatic package checks"),
                            window.SP_REACT.createElement("li", null, "Settings to check for updates on boot and automatically install available package updates"),
                            window.SP_REACT.createElement("li", null, "Settings for notifications: Toast Only, Sound Only, Toast+Sound, or No Notification"))),
                    window.SP_REACT.createElement("h3", null, "Advanced Page"),
                    window.SP_REACT.createElement("p", null,
                        "The Advanced page houses more complex and/or system altering functions that can be used to maintain and manage more intricate flatpak setups.",
                        window.SP_REACT.createElement("ul", null,
                            window.SP_REACT.createElement("li", null,
                                "Aggressive Package Filtering: Hide packages on the Browse page that are irrelevant to most users, consisting of packages containing:",
                                window.SP_REACT.createElement("ul", null,
                                    window.SP_REACT.createElement("li", null, "BaseApp"),
                                    window.SP_REACT.createElement("li", null, "BaseExtension"),
                                    window.SP_REACT.createElement("li", null, "Debug"),
                                    window.SP_REACT.createElement("li", null, "Sources"),
                                    window.SP_REACT.createElement("li", null, "EoL (End of Life)"))),
                            window.SP_REACT.createElement("li", null, "Default AppData Location: The default location where autoflatpak-installed flatpaks will place their appdata"),
                            window.SP_REACT.createElement("li", null, "Migrate AppData: Moving flatpak appdata from one location to another"),
                            window.SP_REACT.createElement("li", null, "Clean Unused Packages: List and remove packages as determined by the \"flatpak remove --unused\" command"),
                            window.SP_REACT.createElement("li", null, "Repair Broken Packages: A proxy button to run the \"flatpak repair\" command"))),
                    window.SP_REACT.createElement("h3", null, "AppData Locations"),
                    window.SP_REACT.createElement("p", null, "The AppData locations are per mounted device as exposed by SteamOS. By default, the standard location of flatpak appdata is available in the \"~/.var/app\" folder. In order to accomplish separate AppData install locations, symlinks leading to the actual location of each application's AppData is created on install (via AutoFlatpaks) as well as during AppData migration. These symlinks will not be removed on plugin removal and must either be reverted via AutoFlatpaks prior to plugin removal or manually reverted, BUT removing AutoFlatpaks will not cause any breakages to anything currently configured."),
                    window.SP_REACT.createElement("h3", null, "Social Media"),
                    window.SP_REACT.createElement("ul", null,
                        window.SP_REACT.createElement("li", null,
                            window.SP_REACT.createElement(SiGithub, null),
                            " ",
                            window.SP_REACT.createElement("a", { href: "https://github.com/jurassicplayer" }, "github.com/jurassicplayer")),
                        window.SP_REACT.createElement("li", null,
                            window.SP_REACT.createElement(SiKofi, null),
                            " ",
                            window.SP_REACT.createElement("a", { href: "https://ko-fi.com/jurassicplayer" }, "ko-fi.com/jurassicplayer"))),
                    window.SP_REACT.createElement("br", null),
                    window.SP_REACT.createElement("h2", null, "Work In Progress"),
                    window.SP_REACT.createElement("p", null,
                        "While AutoFlatpaks isn't intended to be a fully featured flatpak manager/store, it may end up being close, or even seen as one by some standards.",
                        window.SP_REACT.createElement("br", null),
                        "The final UI and features are not set in stone, and may be expanded upon/removed. The notes left in WIP pages are merely notes and ideas so I won't forget.",
                        window.SP_REACT.createElement("br", null),
                        window.SP_REACT.createElement("br", null),
                        "This area will be a place to see information about the project including:",
                        window.SP_REACT.createElement("br", null)),
                    window.SP_REACT.createElement("ul", null,
                        window.SP_REACT.createElement("li", null, "List of things I intend to fix/add/remove")),
                    window.SP_REACT.createElement("ul", null,
                        window.SP_REACT.createElement("li", null, "Convert FlatpakInfo modal to router page"),
                        window.SP_REACT.createElement("li", null, "Add AppData migration to FlatpakInfo"),
                        window.SP_REACT.createElement("li", null, "Flatseal-like permissions manager"),
                        window.SP_REACT.createElement("li", null, "Visual glitching, more info on discord forum post (?)"),
                        window.SP_REACT.createElement("li", null, "Persist highlighted button while scrolling package list (?)"),
                        window.SP_REACT.createElement("li", null, "Add check for network connectivity before continuing intervalcheck (?)"),
                        window.SP_REACT.createElement("li", null, "Add remaining space check"),
                        window.SP_REACT.createElement("li", null, "Move logger into Advanced tab (?)"),
                        window.SP_REACT.createElement("li", null, "Move QAM settings to Advanced tab (?)"),
                        window.SP_REACT.createElement("li", null, "Filter Search refinement (regex, fuzzy?)"),
                        window.SP_REACT.createElement("li", null, "A How-To page with functionality explained in bite-sized chunks"),
                        window.SP_REACT.createElement("li", null, "Add to Steam (?)"),
                        window.SP_REACT.createElement("li", null, "Remove minutes option"),
                        window.SP_REACT.createElement("li", null, "Revise settings backend to reduce calls to python backend"),
                        window.SP_REACT.createElement("li", null, "Backend persistent browse filter/sort options (?)"),
                        window.SP_REACT.createElement("li", null, "Filter advanced mask refinement (?)"),
                        window.SP_REACT.createElement("li", null, "Flathub API integration (x)"),
                        window.SP_REACT.createElement("li", null, "List of masks from flatpak mask (x)"),
                        window.SP_REACT.createElement("li", null, "List of pins from flatpak pin (x)"))))));
    };

    const StatusBarBase$1 = {
        background: SteamCssVariables.customStatusRed,
        borderRadius: SteamCssVariables.gpCornerMedium,
        padding: "10px 10px 10px 20px"
    };
    const StatusBarCSS$1 = {
        Default: {
            display: "none"
        },
        Warning: {
            ...StatusBarBase$1,
            background: SteamCssVariables.customStatusRed
        }
    };
    const AdvancedStatusBar = (props) => {
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const showStatusBar = props.statusBar;
        const onAppStateChange = (e) => {
            let event = e;
            setAppState(event.appState);
        };
        React.useEffect(() => {
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        let StatusText = "";
        let CSS = StatusBarCSS$1.Default;
        if (appState == appStates.repairingPackages) {
            StatusText = "[Performing Action] Repairing packages...";
            CSS = StatusBarCSS$1.Warning;
        }
        else if (appState == appStates.migratingAppData) {
            StatusText = "[Performing Action] Moving application data...";
            CSS = StatusBarCSS$1.Warning;
        }
        else if (showStatusBar) {
            StatusText = "[Error] Please close any running flatpaks before proceeding.";
            CSS = StatusBarCSS$1.Warning;
        }
        return (window.SP_REACT.createElement(Focusable, null, appState != appStates.idle || showStatusBar
            ? window.SP_REACT.createElement(Focusable, { style: CSS }, StatusText)
            : null));
    };

    const RowContainer = {
        display: "flex",
        flexDirection: "row",
        minHeight: "3em"
    };
    const LabelContainer = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        flexGrow: 1
    };
    const ButtonStyle = {
        margin: "4px",
        width: "auto",
        minWidth: "70px"
    };
    const LabelButton = (props) => {
        return (window.SP_REACT.createElement(Focusable, { style: RowContainer },
            window.SP_REACT.createElement("div", { style: LabelContainer },
                window.SP_REACT.createElement("div", { className: staticClasses.Text }, props.label),
                window.SP_REACT.createElement("div", { className: staticClasses.Label }, props.description)),
            window.SP_REACT.createElement(DialogButton, { ...props, style: { ...ButtonStyle, ...props.style } }, props.children)));
    };
    const LabelToggle = (props) => {
        return (window.SP_REACT.createElement(Focusable, { style: RowContainer },
            window.SP_REACT.createElement("div", { style: LabelContainer },
                window.SP_REACT.createElement("div", { className: staticClasses.Text }, props.label),
                window.SP_REACT.createElement("div", { className: staticClasses.Label }, props.description)),
            window.SP_REACT.createElement("div", { style: { margin: "auto" } },
                window.SP_REACT.createElement(Toggle, { ...props }))));
    };

    const AggressiveFilter = () => {
        const [aggressiveEnabled, setAggressiveEnabled] = React.useState(Settings.aggressiveEnabled);
        React.useEffect(() => {
            if (Settings.aggressiveEnabled != aggressiveEnabled) {
                Settings.aggressiveEnabled = aggressiveEnabled;
                Settings.saveToLocalStorage();
            }
        }, [aggressiveEnabled]);
        return (window.SP_REACT.createElement(LabelToggle, { label: "Aggressive Package Filtering", description: "Filter out BaseApp, BaseExtension, Debug, Sources, and EoL packages", value: aggressiveEnabled, onChange: (aggressiveEnabled) => {
                setAggressiveEnabled(aggressiveEnabled);
            } }));
    };

    const FallbackModalContainer = {
        maxHeight: "45vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
        marginBottom: "40px",
        overflow: "hidden"
    };
    const FallbackModalContent = {
        backgroundColor: SteamCssVariables.gpBackgroundLightSofter,
        borderRadius: SteamCssVariables.gpCornerLarge,
        height: "fit-content",
        width: "70%",
        padding: "20px"
    };

    const FallbackModal = (props) => {
        const closeModal = () => {
            if (props.onCancel)
                props.onCancel();
            if (props.closeModal)
                props.closeModal();
        };
        if (ModalRoot != undefined) {
            return (window.SP_REACT.createElement(ConfirmModal
            // ModalRootProps
            , { 
                // ModalRootProps
                onCancel: props.onCancel, closeModal: props.closeModal, onOK: props.onOK, onEscKeypress: props.onEscKeypress, className: props.className, modalClassName: props.modalClassName, bAllowFullSize: props.bAllowFullSize, bDestructiveWarning: props.bDestructiveWarning, bDisableBackgroundDismiss: props.bDisableBackgroundDismiss, bHideCloseIcon: props.bHideCloseIcon, bOKDisabled: props.bOKDisabled, bCancelDisabled: props.bCancelDisabled, 
                // ConfirmModalProps
                onMiddleButton: props.onMiddleButton, strTitle: props.strTitle, strDescription: props.strDescription, strOKButtonText: props.strOKButtonText, strCancelButtonText: props.strCancelButtonText, strMiddleButtonText: props.strMiddleButtonText, bAlertDialog: props.bAlertDialog, bMiddleDisabled: props.bMiddleDisabled }, props.children));
        }
        else {
            return (window.SP_REACT.createElement(Focusable, { className: "modal", style: FallbackModalContainer, onCancel: closeModal, onClick: e => {
                    if (!e.currentTarget.classList.contains("gpfocuswithin")) {
                        closeModal();
                    }
                } },
                window.SP_REACT.createElement(Focusable, { style: FallbackModalContent }, props.children)));
        }
    };

    const RunningPackagesModal = (props) => {
        return (window.SP_REACT.createElement(FallbackModal, { bDestructiveWarning: true, strTitle: 'Error: Running Packages Detected', strDescription: 'This procedure is possibly destructive and it is recommended to close any currently running flatpaks before and while performing this action to prevent any possible issues.', bAlertDialog: true, closeModal: () => {
                if (props.closeModal) {
                    props.closeModal();
                }
            } },
            window.SP_REACT.createElement("br", null),
            "List of running packages:",
            window.SP_REACT.createElement("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    margin: "0px 30px 0px 30px"
                } }, props.runningPackages.sort((a, b) => a.localeCompare(b)).map((item) => window.SP_REACT.createElement("div", null, item)))));
    };

    const AppDataDirectory = () => {
        const [componentInit, setComponentInit] = React.useState(false);
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const [selectedInstallFolder, setSelectedInstallFolder] = React.useState(Settings.appDataLocation);
        const [installFolders, setInstallFolders] = React.useState([]);
        const onAppStateChange = (e) => { setAppState(e.appState); };
        React.useEffect(() => {
            if (!componentInit)
                return;
            if (Settings.appDataLocation != selectedInstallFolder) {
                Settings.appDataLocation = selectedInstallFolder;
                Settings.saveToLocalStorage();
            }
        }, [selectedInstallFolder]);
        React.useEffect(() => {
            SteamClient.InstallFolder.GetInstallFolders().then((installFolders) => {
                setInstallFolders(installFolders);
                setComponentInit(true);
            });
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
            setComponentInit(false);
        }, []);
        return (window.SP_REACT.createElement(Focusable, { style: RowContainer },
            window.SP_REACT.createElement("div", { style: LabelContainer },
                window.SP_REACT.createElement("div", { className: staticClasses.Text }, "Default AppData Location"),
                window.SP_REACT.createElement("div", { className: staticClasses.Label }, "Change the default location of flatpak app data")),
            window.SP_REACT.createElement("div", { style: { width: "35%", margin: "auto" } },
                window.SP_REACT.createElement(Dropdown, { disabled: appState != appStates.idle, selectedOption: selectedInstallFolder, onChange: (e) => { setSelectedInstallFolder(e.data); }, rgOptions: installFolders.map(installFolder => {
                        let folderLabel = installFolder.strUserLabel ? installFolder.strUserLabel : installFolder.strDriveName;
                        return { label: folderLabel, data: installFolder.strDriveName };
                    }) }))));
    };
    const AppDataMigrationModal = (props) => {
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const onAppStateChange = (e) => { setAppState(e.appState); };
        const closeModal = () => {
            if (props.closeModal) {
                props.closeModal();
            }
        };
        React.useEffect(() => {
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        return (window.SP_REACT.createElement(FallbackModal, { bDestructiveWarning: true, strTitle: 'Migrate Flatpak AppData Directory', strDescription: 'WARNING: This procedure WILL overwrite on file conflicts with files from the source directory and symlink the target directory to "~/.var/app". This process may take several minutes to complete depending on the amount of data to migrate.', bOKDisabled: appState != appStates.idle, strOKButtonText: 'Migrate', onOK: () => {
                MigrateAllAppData(props.selectedSourceFolder, props.selectedDestinationFolder);
                closeModal();
            }, closeModal: closeModal }));
    };
    const MigrateAllAppData = async (sourceInstall, destinationInstall) => {
        console.log(`MigrateAllAppData: ${sourceInstall} => ${destinationInstall}`);
        await Backend.MigrateAllAppData(sourceInstall, destinationInstall);
    };
    const AppDataMigration = (props) => {
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const [selectedSourceFolder, setSelectedSourceFolder] = React.useState(Settings.appDataLocation);
        const [selectedDestinationFolder, setSelectedDestinationFolder] = React.useState(Settings.appDataLocation);
        const [installFolders, setInstallFolders] = React.useState([]);
        const [componentInit, setComponentInit] = React.useState(false);
        const onAppStateChange = (e) => { setAppState(e.appState); };
        React.useEffect(() => {
            SteamClient.InstallFolder.GetInstallFolders().then((installFolders) => {
                setInstallFolders(installFolders);
                setComponentInit(true);
            });
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
            setComponentInit(false);
        }, []);
        return (window.SP_REACT.createElement(Focusable, { style: RowContainer },
            window.SP_REACT.createElement("div", { style: LabelContainer },
                window.SP_REACT.createElement("div", { className: staticClasses.Text }, "Migrate AppData"),
                window.SP_REACT.createElement("div", { className: staticClasses.Label }, "Migrate all flatpak app data from one location to another. USE AT YOUR OWN RISK"),
                window.SP_REACT.createElement("div", { style: RowContainer },
                    window.SP_REACT.createElement("div", { style: { width: "45%", margin: "auto" } },
                        window.SP_REACT.createElement(Dropdown, { disabled: appState != appStates.idle, selectedOption: selectedSourceFolder, onChange: (e) => { setSelectedSourceFolder(e.data); }, rgOptions: installFolders.map(installFolder => {
                                let folderLabel = installFolder.strUserLabel ? installFolder.strUserLabel : installFolder.strDriveName;
                                return { label: folderLabel, data: installFolder.strDriveName };
                            }) })),
                    window.SP_REACT.createElement("div", { style: { padding: "0% 2% 0% 2%", margin: "auto" } },
                        window.SP_REACT.createElement(FaArrowRight, null)),
                    window.SP_REACT.createElement("div", { style: { width: "45%", margin: "auto" } },
                        window.SP_REACT.createElement(Dropdown, { disabled: appState != appStates.idle, selectedOption: selectedDestinationFolder, onChange: (e) => { setSelectedDestinationFolder(e.data); }, rgOptions: installFolders.map(installFolder => {
                                let folderLabel = installFolder.strUserLabel ? installFolder.strUserLabel : installFolder.strDriveName;
                                return { label: folderLabel, data: installFolder.strDriveName };
                            }) })),
                    window.SP_REACT.createElement(DialogButton, { style: ButtonStyle, disabled: selectedSourceFolder == selectedDestinationFolder || !componentInit || appState != appStates.idle, onClick: () => {
                            props.setShowStatusBar(false);
                            Backend.getRunningPackages().then((runningPackages) => {
                                if (runningPackages.length > 0) {
                                    props.setShowStatusBar(true);
                                    showModal(window.SP_REACT.createElement(RunningPackagesModal, { runningPackages: runningPackages }));
                                }
                                else {
                                    showModal(window.SP_REACT.createElement(AppDataMigrationModal, { selectedSourceFolder: selectedSourceFolder, selectedDestinationFolder: selectedDestinationFolder }));
                                }
                            });
                        } },
                        window.SP_REACT.createElement(FaEllipsisH, null))))));
    };

    const flatpakRepair = async (dryrun) => {
        let output = await Backend.RepairPackages(dryrun);
        console.log(dryrun ? 'Repair (dryrun): ' : 'Repair: ', output);
    };
    const RepairPackagesModal = (props) => {
        const closeModal = () => {
            if (props.closeModal) {
                props.closeModal();
            }
        };
        return (window.SP_REACT.createElement(FallbackModal, { bDestructiveWarning: true, strTitle: 'Repair Broken Packages', strDescription: 'This process may take several minutes to complete and have no indication of progress beyond the status bar denoting that the process is either still running or complete. Refer to the flatpak-repair man page for more information on what this process entails.', strOKButtonText: 'DryRun', strMiddleButtonText: 'Run', onOK: () => {
                flatpakRepair(true);
                closeModal();
            }, onMiddleButton: () => {
                flatpakRepair();
                closeModal();
            }, closeModal: closeModal }));
    };
    const RepairPackages = (props) => {
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const onAppStateChange = (e) => { setAppState(e.appState); };
        React.useEffect(() => {
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        return (window.SP_REACT.createElement(LabelButton, { label: "Repair Broken Packages", description: "Repair a flatpak installation by pruning and reinstalling invalid objects", disabled: appState != appStates.idle, onClick: () => {
                props.setShowStatusBar(false);
                Backend.getRunningPackages().then((runningPackages) => {
                    if (runningPackages.length > 0) {
                        props.setShowStatusBar(true);
                        showModal(window.SP_REACT.createElement(RunningPackagesModal, { runningPackages: runningPackages }));
                    }
                    else {
                        showModal(window.SP_REACT.createElement(RepairPackagesModal, null));
                    }
                });
            } },
            window.SP_REACT.createElement(FaEllipsisH, null)));
    };

    const onRemoveUnusedPackages = () => {
        Backend.RemoveUnusedPackages();
    };
    const UnusedListScrollPanel = {
        maxHeight: "45vh",
        borderRadius: SteamCssVariables.gpCornerLarge,
        backgroundColor: SteamCssVariables.gpBackgroundLightSofter
    };
    const UnusedPackagesModal = (props) => {
        const scrollView = React.useRef(null);
        const [scrollViewReady, setScrollViewReady] = React.useState(false);
        const [unusedPackageList, setUnusedPackageList] = React.useState([]);
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const onAppStateChange = (e) => { setAppState(e.appState); };
        const onQueueCompletion = () => getUnusedPackageList();
        const getUnusedPackageList = async () => {
            setScrollViewReady(false);
            let unusedPackageList = await Backend.getUnusedPackageList();
            setUnusedPackageList(unusedPackageList);
            setScrollViewReady(true);
        };
        const closeModal = () => {
            if (props.closeModal) {
                props.closeModal();
            }
        };
        React.useEffect(() => {
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
            Backend.eventBus.addEventListener(events.QueueCompletionEvent.eType, onQueueCompletion);
            getUnusedPackageList();
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
            Backend.eventBus.removeEventListener(events.QueueCompletionEvent.eType, onQueueCompletion);
        }, []);
        return (window.SP_REACT.createElement(FallbackModal, { bAllowFullSize: true, bDisableBackgroundDismiss: false, bHideCloseIcon: false, strTitle: 'Unused Packages', closeModal: closeModal, bOKDisabled: !(appState == appStates.idle && unusedPackageList.length > 0), strOKButtonText: 'Remove Packages', onOK: () => onRemoveUnusedPackages() },
            window.SP_REACT.createElement(ScrollPanel, { style: UnusedListScrollPanel, focusable: true, autoFocus: true, noFocusRing: !scrollViewReady }, scrollViewReady
                ? window.SP_REACT.createElement(Focusable, { style: {
                        margin: "10px"
                    }, 
                    // @ts-ignore
                    focusableIfNoChildren: true, noFocusRing: true, ref: scrollView }, unusedPackageList.map((item) => window.SP_REACT.createElement("div", null,
                    item.application,
                    " ",
                    item.branch)))
                : window.SP_REACT.createElement("div", { style: { height: "2em" } }, "Searching for unused packages..."))));
    };
    const UnusedPackages = () => {
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const onAppStateChange = (e) => { setAppState(e.appState); };
        React.useEffect(() => {
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        return (window.SP_REACT.createElement(LabelButton, { label: "Clean Unused Packages", description: "List and uninstall all orphaned/unused packages no longer required by any package", disabled: appState != appStates.idle, onClick: () => { showModal(window.SP_REACT.createElement(UnusedPackagesModal, null)); } },
            window.SP_REACT.createElement(FaEllipsisH, null)));
    };

    const Separator = () => {
        return (window.SP_REACT.createElement("hr", { style: {
                height: "0.5px",
                margin: "2px 0px 2px 0px",
                borderWidth: "0px",
                background: SteamCssVariables.gpBackgroundNeutralLightSoft
            } }));
    };
    const SectionStyle = {
        width: "95%",
        margin: "auto"
    };
    const AdvancedPage = () => {
        const [showStatusBar, setShowStatusBar] = React.useState(false);
        return (window.SP_REACT.createElement(Focusable, null,
            window.SP_REACT.createElement(AdvancedStatusBar, { statusBar: showStatusBar }),
            window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, "Settings"),
            window.SP_REACT.createElement(Focusable, { style: SectionStyle },
                window.SP_REACT.createElement(AggressiveFilter, null),
                window.SP_REACT.createElement(Separator, null),
                window.SP_REACT.createElement(AppDataDirectory, null),
                window.SP_REACT.createElement(Separator, null)),
            window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, "System Maintenance"),
            window.SP_REACT.createElement(Focusable, { style: SectionStyle },
                window.SP_REACT.createElement(AppDataMigration, { setShowStatusBar: setShowStatusBar }),
                window.SP_REACT.createElement(Separator, null),
                window.SP_REACT.createElement(UnusedPackages, null),
                window.SP_REACT.createElement(Separator, null),
                window.SP_REACT.createElement(RepairPackages, { setShowStatusBar: setShowStatusBar }),
                window.SP_REACT.createElement(Separator, null))));
    };

    const OptionRowContainer = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "2px"
    };
    const OptionRowLabel = {
        padding: "0px"
    };
    const DropdownContainer = {
        minWidth: "45%"
    };

    const OptionsModal = (props) => {
        const [search, setSearch] = React.useState(props.selectedOptions.filterSearch);
        const [currentOptions, setCurrentOptions] = React.useState(props.selectedOptions);
        const updateSelectedOptions = (options) => {
            let newOptions = {
                ...currentOptions,
            };
            if (search != currentOptions.filterSearch)
                newOptions = { ...newOptions, filterSearch: search };
            if (options.filterType)
                newOptions = { ...newOptions, filterType: options.filterType };
            if (options.filterStatus)
                newOptions = { ...newOptions, filterStatus: options.filterStatus };
            if (options.filterMask)
                newOptions = { ...newOptions, filterMask: options.filterMask };
            if (options.sortOrder)
                newOptions = { ...newOptions, sortOrder: options.sortOrder };
            if (newOptions.filterSearch != currentOptions.filterSearch
                || newOptions.filterType != currentOptions.filterType
                || newOptions.filterStatus != currentOptions.filterStatus
                || newOptions.filterMask != currentOptions.filterMask
                || newOptions.sortOrder != currentOptions.sortOrder) {
                setCurrentOptions(newOptions);
                props.setSelectedOptions(newOptions);
            }
        };
        return (window.SP_REACT.createElement(FallbackModal, { bAllowFullSize: false, bAlertDialog: true, strTitle: 'List Options', closeModal: () => {
                updateSelectedOptions({});
                if (props.closeModal) {
                    props.closeModal();
                }
            } },
            window.SP_REACT.createElement(Focusable, null,
                window.SP_REACT.createElement("div", { style: OptionRowContainer },
                    window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle, style: OptionRowLabel }, "Filter: Search"),
                    window.SP_REACT.createElement(Focusable, { style: { minWidth: "75%" } },
                        window.SP_REACT.createElement(TextField, { style: { borderRadius: "2px" }, bShowClearAction: true, bAlwaysShowClearAction: true, contentEditable: true, onChange: (e) => { setSearch(e.currentTarget.value); }, defaultValue: props.selectedOptions.filterSearch }))),
                window.SP_REACT.createElement("div", { style: OptionRowContainer },
                    window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle, style: OptionRowLabel }, "Filter: Type"),
                    window.SP_REACT.createElement(Focusable, { style: DropdownContainer },
                        window.SP_REACT.createElement(Dropdown, { selectedOption: props.selectedOptions.filterType, onChange: (e) => { updateSelectedOptions({ filterType: e.data }); }, rgOptions: [
                                { label: 'All', data: 'all' },
                                { label: 'App', data: 'app' },
                                { label: 'Runtime', data: 'runtime' }
                            ] }))),
                window.SP_REACT.createElement("div", { style: OptionRowContainer },
                    window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle, style: OptionRowLabel }, "Filter: Status"),
                    window.SP_REACT.createElement(Focusable, { style: DropdownContainer },
                        window.SP_REACT.createElement(Dropdown, { selectedOption: props.selectedOptions.filterStatus, onChange: (e) => { updateSelectedOptions({ filterStatus: e.data }); }, rgOptions: [
                                { label: 'All', data: 'all' },
                                { label: 'Installed', data: 'installed' },
                                { label: 'Not Installed', data: 'notinstalled' },
                                { label: 'Queued', data: 'queued' },
                                { label: 'Updateable', data: 'updateable' },
                            ] }))),
                window.SP_REACT.createElement("div", { style: OptionRowContainer },
                    window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle, style: OptionRowLabel }, "Filter: Mask"),
                    window.SP_REACT.createElement(Focusable, { style: DropdownContainer },
                        window.SP_REACT.createElement(Dropdown, { selectedOption: props.selectedOptions.filterMask, onChange: (e) => { updateSelectedOptions({ filterMask: e.data }); }, rgOptions: [
                                { label: 'All', data: 'all' },
                                { label: 'Masked', data: 'masked' },
                                { label: 'Unmasked', data: 'unmasked' },
                            ] }))),
                window.SP_REACT.createElement("div", { style: OptionRowContainer },
                    window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle, style: OptionRowLabel }, "Sort Order"),
                    window.SP_REACT.createElement(Focusable, { style: DropdownContainer },
                        window.SP_REACT.createElement(Dropdown, { selectedOption: props.selectedOptions.sortOrder, onChange: (e) => { updateSelectedOptions({ sortOrder: e.data }); }, rgOptions: [
                                { label: 'Alphabetical (A to Z))', data: 'a2z' },
                                { label: 'Alphabetical (Z to A)', data: 'z2a' },
                                { label: 'Size (Largest)', data: 'slarge' },
                                { label: 'Size (Smallest)', data: 'ssmall' },
                            ] }))))));
    };

    const observerMap = new Map();
    const RootIds = new WeakMap();
    let rootId = 0;
    let unsupportedValue = undefined;
    /**
     * Generate a unique ID for the root element
     * @param root
     */

    function getRootId(root) {
      if (!root) return '0';
      if (RootIds.has(root)) return RootIds.get(root);
      rootId += 1;
      RootIds.set(root, rootId.toString());
      return RootIds.get(root);
    }
    /**
     * Convert the options to a string Id, based on the values.
     * Ensures we can reuse the same observer when observing elements with the same options.
     * @param options
     */


    function optionsToId(options) {
      return Object.keys(options).sort().filter(key => options[key] !== undefined).map(key => {
        return `${key}_${key === 'root' ? getRootId(options.root) : options[key]}`;
      }).toString();
    }

    function createObserver(options) {
      // Create a unique ID for this observer instance, based on the root, root margin and threshold.
      let id = optionsToId(options);
      let instance = observerMap.get(id);

      if (!instance) {
        // Create a map of elements this observer is going to observe. Each element has a list of callbacks that should be triggered, once it comes into view.
        const elements = new Map();
        let thresholds;
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            var _elements$get;

            // While it would be nice if you could just look at isIntersecting to determine if the component is inside the viewport, browsers can't agree on how to use it.
            // -Firefox ignores `threshold` when considering `isIntersecting`, so it will never be false again if `threshold` is > 0
            const inView = entry.isIntersecting && thresholds.some(threshold => entry.intersectionRatio >= threshold); // @ts-ignore support IntersectionObserver v2

            if (options.trackVisibility && typeof entry.isVisible === 'undefined') {
              // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
              // @ts-ignore
              entry.isVisible = inView;
            }

            (_elements$get = elements.get(entry.target)) == null ? void 0 : _elements$get.forEach(callback => {
              callback(inView, entry);
            });
          });
        }, options); // Ensure we have a valid thresholds array. If not, use the threshold from the options

        thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
        instance = {
          id,
          observer,
          elements
        };
        observerMap.set(id, instance);
      }

      return instance;
    }
    /**
     * @param element - DOM Element to observe
     * @param callback - Callback function to trigger when intersection status changes
     * @param options - Intersection Observer options
     * @param fallbackInView - Fallback inView value.
     * @return Function - Cleanup function that should be triggered to unregister the observer
     */


    function observe(element, callback, options = {}, fallbackInView = unsupportedValue) {
      if (typeof window.IntersectionObserver === 'undefined' && fallbackInView !== undefined) {
        const bounds = element.getBoundingClientRect();
        callback(fallbackInView, {
          isIntersecting: fallbackInView,
          target: element,
          intersectionRatio: typeof options.threshold === 'number' ? options.threshold : 0,
          time: 0,
          boundingClientRect: bounds,
          intersectionRect: bounds,
          rootBounds: bounds
        });
        return () => {// Nothing to cleanup
        };
      } // An observer with the same options can be reused, so lets use this fact


      const {
        id,
        observer,
        elements
      } = createObserver(options); // Register the callback listener for this element

      let callbacks = elements.get(element) || [];

      if (!elements.has(element)) {
        elements.set(element, callbacks);
      }

      callbacks.push(callback);
      observer.observe(element);
      return function unobserve() {
        // Remove the callback from the callback list
        callbacks.splice(callbacks.indexOf(callback), 1);

        if (callbacks.length === 0) {
          // No more callback exists for element, so destroy it
          elements.delete(element);
          observer.unobserve(element);
        }

        if (elements.size === 0) {
          // No more elements are being observer by this instance, so destroy it
          observer.disconnect();
          observerMap.delete(id);
        }
      };
    }

    /**
     * React Hooks make it easy to monitor the `inView` state of your components. Call
     * the `useInView` hook with the (optional) [options](#options) you need. It will
     * return an array containing a `ref`, the `inView` status and the current
     * [`entry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).
     * Assign the `ref` to the DOM element you want to monitor, and the hook will
     * report the status.
     *
     * @example
     * ```jsx
     * import React from 'react';
     * import { useInView } from 'react-intersection-observer';
     *
     * const Component = () => {
     *   const { ref, inView, entry } = useInView({
     *       threshold: 0,
     *   });
     *
     *   return (
     *     <div ref={ref}>
     *       <h2>{`Header inside viewport ${inView}.`}</h2>
     *     </div>
     *   );
     * };
     * ```
     */

    function useInView({
      threshold,
      delay,
      trackVisibility,
      rootMargin,
      root,
      triggerOnce,
      skip,
      initialInView,
      fallbackInView,
      onChange
    } = {}) {
      var _state$entry;

      const [ref, setRef] = React__namespace.useState(null);
      const callback = React__namespace.useRef();
      const [state, setState] = React__namespace.useState({
        inView: !!initialInView,
        entry: undefined
      }); // Store the onChange callback in a `ref`, so we can access the latest instance
      // inside the `useEffect`, but without triggering a rerender.

      callback.current = onChange;
      React__namespace.useEffect(() => {
        // Ensure we have node ref, and that we shouldn't skip observing
        if (skip || !ref) return;
        let unobserve;
        unobserve = observe(ref, (inView, entry) => {
          setState({
            inView,
            entry
          });
          if (callback.current) callback.current(inView, entry);

          if (entry.isIntersecting && triggerOnce && unobserve) {
            // If it should only trigger once, unobserve the element after it's inView
            unobserve();
            unobserve = undefined;
          }
        }, {
          root,
          rootMargin,
          threshold,
          // @ts-ignore
          trackVisibility,
          // @ts-ignore
          delay
        }, fallbackInView);
        return () => {
          if (unobserve) {
            unobserve();
          }
        };
      }, // We break the rule here, because we aren't including the actual `threshold` variable
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [// If the threshold is an array, convert it to a string, so it won't change between renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Array.isArray(threshold) ? threshold.toString() : threshold, ref, root, rootMargin, triggerOnce, skip, trackVisibility, fallbackInView, delay]);
      const entryTarget = (_state$entry = state.entry) == null ? void 0 : _state$entry.target;
      React__namespace.useEffect(() => {
        if (!ref && entryTarget && !triggerOnce && !skip) {
          // If we don't have a node ref, then reset the state (unless the hook is set to only `triggerOnce` or `skip`)
          // This ensures we correctly reflect the current state - If you aren't observing anything, then nothing is inView
          setState({
            inView: !!initialInView,
            entry: undefined
          });
        }
      }, [ref, entryTarget, triggerOnce, skip, initialInView]);
      const result = [setRef, state.inView, state.entry]; // Support object destructuring, by adding the specific values.

      result.ref = result[0];
      result.inView = result[1];
      result.entry = result[2];
      return result;
    }

    const CardBase = {
        borderRadius: SteamCssVariables.gpCornerLarge,
        display: "flex",
        justifyContent: "space-between",
        minHeight: "3em",
        maxHeight: "3em",
        margin: "2px",
        padding: "5px 10px"
    };
    const Card = {
        focus: {
            ...CardBase,
            backgroundColor: SteamCssVariables.gpStoreDarkGrey
        },
        blur: {
            ...CardBase,
            backgroundColor: SteamCssVariables.mainEditorInputBgColor
        }
    };

    const CardInfo = {
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "100%"
        },
        base: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "scroll",
            whiteSpace: "nowrap",
            padding: "0px",
            color: SteamCssVariables.mainTextColor,
            backgroundColor: SteamCssVariables.customTransparent
        }
    };
    const CardButtonBase = {
        minWidth: '60px',
        maxWidth: "0px",
        margin: "2px",
        padding: "10px 10px"
    };
    const CardButton = {
        maskToggled: {
            ...CardButtonBase,
            backgroundColor: SteamCssVariables.customStatusYellow
        },
        mask: {
            ...CardButtonBase
        },
        install: {
            ...CardButtonBase
        },
        installToggled: {
            ...CardButtonBase,
            backgroundColor: SteamCssVariables.customStatusGreen
        },
        uninstall: {
            ...CardButtonBase
        },
        uninstallToggled: {
            ...CardButtonBase,
            backgroundColor: SteamCssVariables.customStatusRed
        },
        update: {
            ...CardButtonBase
        }
    };

    const ToggleButton = ({ ...props }) => {
        if (props.toggledCSS == undefined)
            props.toggledCSS = CardButton.mask;
        if (props.untoggledCSS == undefined)
            props.untoggledCSS = CardButton.mask;
        return (window.SP_REACT.createElement(DialogButton, { ...props, onClick: e => {
                props.value = !props.value;
                props.onClick?.(e);
            }, style: props.value ? props.toggledCSS : props.untoggledCSS }, props.children));
    };

    const FlatpakInfoModal = (props) => {
        return (window.SP_REACT.createElement(FallbackModal, { bAllowFullSize: false, bAlertDialog: true, closeModal: () => { if (props.closeModal)
                props.closeModal(); } },
            window.SP_REACT.createElement(Focusable, null,
                window.SP_REACT.createElement("div", { style: { display: "flex", flexDirection: "row", justifyContent: "space-between" } },
                    window.SP_REACT.createElement("div", null,
                        "Name: ",
                        props.data.name),
                    window.SP_REACT.createElement("div", null,
                        "Installed Size: ",
                        props.data.installed_size)),
                window.SP_REACT.createElement("div", null,
                    "Reference: ",
                    props.data.ref),
                window.SP_REACT.createElement("div", null,
                    "Description: ",
                    props.data.description))));
    };
    const FlatpakCardInfo = (props) => {
        const [packageInfo, setPackageInfo] = React.useState(props.data);
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const [maskToggled, setMaskToggled] = React.useState(false);
        const [updateToggled, setUpdateToggled] = React.useState(false);
        const [installToggled, setInstallToggled] = React.useState(false);
        const restoreToggles = () => {
            setMaskToggled(Backend.getQueue().filter(item => item.packageRef == packageInfo.ref && (item.action.includes('mask') || item.action.includes('unmask'))).length > 0 || false);
            setUpdateToggled(Backend.getQueue().filter(item => item.packageRef == packageInfo.ref && (item.action.includes('update') || item.action.includes('update'))).length > 0 || false);
            setInstallToggled(Backend.getQueue().filter(item => item.packageRef == packageInfo.ref && (item.action.includes('install') || item.action.includes('uninstall'))).length > 0 || false);
        };
        const resetToggles = () => {
            setMaskToggled(false);
            setUpdateToggled(false);
            setInstallToggled(false);
        };
        const onPackageInfoChange = (e) => {
            setPackageInfo(e.packageInfo);
            resetToggles();
        };
        const onAppStateChange = (e) => { setAppState(e.appState); };
        const queueActions = {
            mask: { action: 'mask', packageRef: packageInfo.ref },
            unmask: { action: 'unmask', packageRef: packageInfo.ref },
            update: { action: 'update', packageRef: packageInfo.ref },
            install: { action: 'install', packageRef: packageInfo.ref },
            uninstall: { action: 'uninstall', packageRef: packageInfo.ref }
        };
        React.useEffect(() => {
            restoreToggles();
            // Register listeners
            Backend.eventBus.addEventListener(packageInfo.ref, onPackageInfoChange);
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => () => {
            // Unregister listeners
            Backend.eventBus.removeEventListener(packageInfo.ref, onPackageInfoChange);
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        return (window.SP_REACT.createElement(Focusable, { style: CardInfo.container },
            window.SP_REACT.createElement(DialogButton, { style: CardInfo.base, onOKActionDescription: 'PkgInfo', onClick: () => showModal(window.SP_REACT.createElement(FlatpakInfoModal, { data: packageInfo })) },
                window.SP_REACT.createElement("div", null, packageInfo.name),
                window.SP_REACT.createElement("div", null, packageInfo.description)),
            window.SP_REACT.createElement(Focusable, { style: { display: "inline-flex" }, "flow-children": "horizontal" },
                window.SP_REACT.createElement(ToggleButton, { toggledCSS: CardButton.maskToggled, disabled: appState != appStates.idle, value: maskToggled, onOKActionDescription: maskToggled ? 'Dequeue' : 'Enqueue', onClick: () => {
                        if (appState != appStates.idle)
                            return;
                        setMaskToggled(!maskToggled);
                        maskToggled
                            ? Backend.dequeueAction(packageInfo.masked ? queueActions.unmask : queueActions.mask)
                            : Backend.queueAction(packageInfo.masked ? queueActions.unmask : queueActions.mask);
                    } }, packageInfo.masked ? window.SP_REACT.createElement(FaEyeSlash, null) : window.SP_REACT.createElement(FaEye, null)),
                packageInfo.updateable
                    ? window.SP_REACT.createElement(ToggleButton, { toggledCSS: CardButton.installToggled, disabled: installToggled || appState != appStates.idle, value: updateToggled, onOKActionDescription: updateToggled ? 'Dequeue' : 'Enqueue', onClick: () => {
                            if (appState != appStates.idle)
                                return;
                            setUpdateToggled(!updateToggled);
                            updateToggled
                                ? Backend.dequeueAction(queueActions.update)
                                : Backend.queueAction(queueActions.update);
                        } },
                        window.SP_REACT.createElement(FaSyncAlt, null))
                    : null,
                window.SP_REACT.createElement(ToggleButton, { toggledCSS: packageInfo.installed ? CardButton.uninstallToggled : CardButton.installToggled, disabled: updateToggled || appState != appStates.idle, value: installToggled, onOKActionDescription: installToggled ? 'Dequeue' : 'Enqueue', onClick: () => {
                        if (appState != appStates.idle)
                            return;
                        setInstallToggled(!installToggled);
                        installToggled
                            ? Backend.dequeueAction(packageInfo.installed ? queueActions.uninstall : queueActions.install)
                            : Backend.queueAction(packageInfo.installed ? queueActions.uninstall : queueActions.install);
                    } }, packageInfo.installed ? window.SP_REACT.createElement(FaTrashAlt, null) : window.SP_REACT.createElement(FaDownload, null)))));
    };

    const FlatpakCard = (props) => {
        const { ref, inView } = useInView({
            triggerOnce: true,
            rootMargin: '700px 0px 700px'
        });
        const [focus, setFocus] = React.useState(false);
        return (window.SP_REACT.createElement("div", { ref: ref, style: focus ? Card.focus : Card.blur, onFocus: () => setFocus(true), onBlur: () => setFocus(false) }, inView
            ? window.SP_REACT.createElement(FlatpakCardInfo, { data: props.data, focus: focus })
            : null));
    };

    const BrowsePageContainer = {
        display: "flex",
        justifyContent: "center",
        minHeight: "100%"
    };
    const PackageListContainer = {
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
        minWidth: "100%",
        overflow: "scroll"
    };
    const RefreshButton = {
        borderRadius: SteamCssVariables.gpCornerLarge,
        maxWidth: "99.5%",
        margin: "2px"
    };

    const BrowsePage = () => {
        const aggressiveEnabled = React.useState(Settings.aggressiveEnabled);
        const [browseReady, setBrowseReady] = React.useState(false);
        const [packageList, setPackageList] = React.useState(Backend.getPL());
        const [selectedOptions, setSelectedOptions] = React.useState({
            filterSearch: '',
            filterType: 'app',
            filterStatus: 'installed',
            filterMask: 'all',
            sortOrder: 'a2z'
        });
        const refreshBrowse = async (softRefresh) => {
            setBrowseReady(false);
            if (softRefresh) {
                console.debug('[AutoFlatpaks] Soft Refresh');
                setPackageList(Backend.getPL());
                setTimeout(() => setBrowseReady(true), 50);
            }
            else {
                console.debug('[AutoFlatpaks] Hard Refresh');
                await Backend.getPackageList().then((packageList) => {
                    if (packageList == undefined)
                        return;
                    setPackageList(packageList);
                    setBrowseReady(true);
                });
            }
        };
        const onQueueCompletion = () => { }; //refreshBrowse(true) }
        const applyFilters = () => {
            let filteredList = packageList;
            if (aggressiveEnabled) {
                filteredList = filteredList
                    /*  Filter out packages that look unimportant? Aggressive filtering  */
                    .filter(data => !data.application.includes('.BaseApp'))
                    .filter(data => !data.application.includes('.BaseExtension'))
                    .filter(data => !data.application.includes('.Sources'))
                    .filter(data => !data.application.includes('.Debug'))
                    .filter(data => data.options == undefined || !data.options.includes('eol='));
            }
            filteredList = filteredList
                .filter(data => {
                if (selectedOptions.filterSearch.length == 0)
                    return true;
                if (data.name.includes(selectedOptions.filterSearch) || data.description.includes(selectedOptions.filterSearch) || data.ref.includes(selectedOptions.filterSearch) || data.origin.includes(selectedOptions.filterSearch))
                    return true;
                return false;
            })
                .filter(data => selectedOptions.filterType == 'all' || data.packagetype == selectedOptions.filterType)
                .filter(data => selectedOptions.filterMask == 'all' || (selectedOptions.filterMask == 'masked' && (data.parentMasked || data.masked)) || (selectedOptions.filterMask == 'unmasked' && (!data.parentMasked && !data.masked)))
                .filter(data => {
                if (selectedOptions.filterStatus == 'all')
                    return true;
                if (selectedOptions.filterStatus == 'installed' && data.installed)
                    return true;
                if (selectedOptions.filterStatus == 'notinstalled' && !data.installed)
                    return true;
                if (selectedOptions.filterStatus == 'updateable' && data.updateable)
                    return true;
                if (selectedOptions.filterStatus == 'queued' && Backend.getQueue().map(item => item.packageRef).includes(data.ref))
                    return true;
                return false;
            })
                .sort((a, b) => {
                if (selectedOptions.sortOrder == 'z2a')
                    return b.name.localeCompare(a.name);
                if (selectedOptions.sortOrder == 'slarge' || selectedOptions.sortOrder == 'ssmall') {
                    var aSize = a.installed_size.split(" ");
                    var bSize = b.installed_size.split(" ");
                    if (selectedOptions.filterStatus == 'uninstalled') {
                        if (a.download_size && b.download_size) {
                            aSize = a.download_size.split(" ");
                            bSize = b.download_size.split(" ");
                        }
                    }
                    var sizeRatio = {
                        bytes: 1,
                        kB: 1024,
                        MB: 1048576,
                        GB: 1073741824,
                        TB: 1099511627776,
                        PB: 1125899906842624 //pebibyte
                    };
                    var aBytes = Number(aSize[0]) * sizeRatio[aSize[1]];
                    var bBytes = Number(bSize[0]) * sizeRatio[bSize[1]];
                    if (isNaN(aBytes) || isNaN(bBytes))
                        console.warn('[AutoFlatpaks] Failed size conversion: ', aSize, bSize);
                    if (selectedOptions.sortOrder == 'ssmall') {
                        return aBytes - bBytes;
                    }
                    return bBytes - aBytes;
                }
                // Default to a2z if no other sorting set
                return a.name.localeCompare(b.name);
            });
            let filteredListElements = filteredList.map(data => {
                return (window.SP_REACT.createElement(FlatpakCard, { data: data }));
            });
            return filteredListElements;
        };
        const memoizedPackageList = React.useMemo(() => applyFilters(), [packageList, selectedOptions.filterSearch, selectedOptions.filterType, selectedOptions.filterStatus, selectedOptions.filterMask, selectedOptions.sortOrder]);
        React.useEffect(() => {
            Backend.eventBus.addEventListener(events.QueueCompletionEvent.eType, onQueueCompletion);
            refreshBrowse(Backend.getPL().length > 0);
        }, []);
        React.useEffect(() => { if (browseReady) {
            refreshBrowse(true);
        } }, [selectedOptions]);
        React.useEffect(() => () => { Backend.eventBus.removeEventListener(events.QueueCompletionEvent.eType, onQueueCompletion); }, []);
        return (window.SP_REACT.createElement(Focusable, { style: BrowsePageContainer, onOptionsButton: () => { showModal(window.SP_REACT.createElement(OptionsModal, { selectedOptions: selectedOptions, setSelectedOptions: setSelectedOptions })); }, onOptionsActionDescription: "Options", onSecondaryButton: () => Backend.ProcessQueue(), onSecondaryActionDescription: "Apply Queue" }, browseReady
            ? window.SP_REACT.createElement(Focusable, { style: PackageListContainer },
                window.SP_REACT.createElement(DialogButton, { style: RefreshButton, onOKActionDescription: "Refresh", onClick: () => refreshBrowse() },
                    window.SP_REACT.createElement(FaRedoAlt, null)),
                memoizedPackageList)
            : window.SP_REACT.createElement("div", { style: { alignItems: "center" } },
                window.SP_REACT.createElement(SteamSpinner, null))));
    };

    const LogEntry = (props) => {
        const { ref, inView } = useInView({ rootMargin: '100px 100px' });
        const entryTimestamp = new Date(props.entry.__REALTIME_TIMESTAMP / 1000);
        const date = entryTimestamp.toLocaleDateString().toString().split('/', 2).map(digit => digit.padStart(2, '0')).join('/');
        const time = entryTimestamp.toLocaleTimeString().padStart(11, '0');
        return (window.SP_REACT.createElement("div", { ref: ref, style: { minHeight: "0.85em" } }, inView
            ? window.SP_REACT.createElement("div", { style: { fontSize: "0.85em" } },
                date,
                " - ",
                time,
                ": ",
                props.entry.MESSAGE.split('system: ')[1])
            : null));
    };

    const HistoryScrollPanelBase = {
        height: "95%",
        minHeight: "95%",
        margin: "0px",
        borderRadius: SteamCssVariables.gpCornerLarge,
        display: "flex",
        justifyContent: "center"
    };
    const HistoryReadyScrollPanel = {
        ...HistoryScrollPanelBase,
        backgroundColor: SteamCssVariables.gpBackgroundLightSofter
    };
    const HistoryNotReadyScrollPanel = {
        ...HistoryScrollPanelBase,
        backgroundColor: SteamCssVariables.customSpinnerBgColor
    };
    const HistoryLogContainer = {
        margin: "20px 20px 0px 20px",
        paddingBottom: "15px",
        display: "flex",
        flexDirection: "column",
        minWidth: "95%"
    };

    const LoggerPage = () => {
        const scrollView = React.useRef(null);
        const [history, setHistory] = React.useState([]);
        const [historyReady, setHistoryReady] = React.useState(false);
        const refreshHistory = () => {
            setHistoryReady(false);
            Backend.getPackageHistory().then((history) => setHistory(history)).then(() => setHistoryReady(true));
        };
        React.useEffect(() => {
            refreshHistory();
            Backend.eventBus.addEventListener(events.QueueProgressEvent.eType, refreshHistory);
        }, []);
        React.useEffect(() => () => { Backend.eventBus.removeEventListener(events.QueueProgressEvent.eType, refreshHistory); }, []);
        return (window.SP_REACT.createElement(ScrollPanel, { style: historyReady ? HistoryReadyScrollPanel : HistoryNotReadyScrollPanel, focusable: true, autoFocus: false, noFocusRing: true, onClick: () => scrollView.current?.focus(), onOKButton: () => scrollView.current?.focus(), onButtonDown: (e) => {
                if (e.detail.button == 10)
                    scrollView.current?.focus();
            } },
            window.SP_REACT.createElement(Focusable, { style: HistoryLogContainer, 
                // @ts-ignore
                focusableIfNoChildren: true, noFocusRing: true, ref: scrollView }, historyReady
                ? history
                    .filter((entry) => entry.MESSAGE.includes('system:'))
                    .map(entry => {
                    return (window.SP_REACT.createElement(LogEntry, { entry: entry }));
                })
                : window.SP_REACT.createElement("div", { style: { minHeight: "100%" } },
                    window.SP_REACT.createElement(SteamSpinner, null)))));
    };

    const FlatpakManager = () => {
        const [currentTabRoute, setCurrentTabRoute] = React.useState("browser");
        return (window.SP_REACT.createElement(Focusable, { style: { minWidth: "100%", minHeight: "100%" } },
            window.SP_REACT.createElement("div", { style: {
                    marginTop: "40px",
                    height: "calc(100% - 40px)",
                    background: SteamCssVariables.customSpinnerBgColor
                } },
                window.SP_REACT.createElement(Tabs, { activeTab: currentTabRoute, onShowTab: (tabID) => {
                        setCurrentTabRoute(tabID);
                    }, tabs: [
                        {
                            title: "Browse",
                            content: window.SP_REACT.createElement(BrowsePage, null),
                            id: "browser",
                        },
                        {
                            title: "Logger",
                            content: window.SP_REACT.createElement(LoggerPage, null),
                            id: "logger",
                        },
                        {
                            title: "Advanced",
                            content: window.SP_REACT.createElement(AdvancedPage, null),
                            id: "advanced",
                        },
                        {
                            title: "About",
                            content: window.SP_REACT.createElement(AboutPage, null),
                            id: "about",
                        }
                    ] }))));
    };

    function Spinner(props) {
        return (window.SP_REACT.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "2px" }, "flow-children": "horizontal" },
            window.SP_REACT.createElement("div", null, props.label),
            window.SP_REACT.createElement("div", null, props.value),
            window.SP_REACT.createElement(Focusable, { style: { maxHeight: "25px", display: "inline-flex" }, "flow-children": "horizontal" },
                window.SP_REACT.createElement(DialogButton, { style: { minWidth: '0', maxWidth: "0px", padding: "10px 16px", marginRight: "1px" }, onClick: props.onClickUp },
                    window.SP_REACT.createElement(FaArrowUp, { style: { verticalAlign: "top", marginTop: "-5px", marginLeft: "-8px" } })),
                window.SP_REACT.createElement(DialogButton, { style: { minWidth: '0', maxWidth: "0px", padding: "10px 16px", marginLeft: "1px" }, onClick: props.onClickDown },
                    window.SP_REACT.createElement(FaArrowDown, { style: { verticalAlign: "top", marginTop: "-5px", marginLeft: "-8px" } })))));
    }

    const NotificationsContainer = {
        padding: "0px"
    };
    const NotificationsText = {
        display: "flex",
        justifyContent: "space-around",
        padding: "0px"
    };
    const NotificationsToggle = {
        display: "flex",
        justifyContent: "space-around"
    };

    function NotificationToggles() {
        const [componentReady, setComponentReady] = React.useState(false);
        const [showToast, setShowToast] = React.useState(Settings.showToast);
        const [playSound, setPlaySound] = React.useState(Settings.playSound);
        const onNotificationToggle = (showToast) => { setShowToast(showToast); };
        const onSoundToggle = (playSound) => { setPlaySound(playSound); };
        React.useEffect(() => {
            setComponentReady(true);
        }, []);
        React.useEffect(() => {
            if (!componentReady)
                return;
            if (Settings.playSound != playSound)
                Settings.playSound = playSound;
            if (Settings.showToast != showToast)
                Settings.showToast = showToast;
            Settings.saveToLocalStorage();
        }, [showToast, playSound]);
        return (window.SP_REACT.createElement("div", { style: NotificationsContainer },
            window.SP_REACT.createElement("div", { style: NotificationsText, "flow-children": "horizontal" },
                window.SP_REACT.createElement("div", null, "Toast"),
                window.SP_REACT.createElement("div", null, "Sound")),
            window.SP_REACT.createElement(Focusable, { style: NotificationsToggle, "flow-children": "horizontal" },
                window.SP_REACT.createElement(Toggle, { value: showToast, onChange: onNotificationToggle }),
                window.SP_REACT.createElement(Toggle, { value: playSound, onChange: onSoundToggle }))));
    }

    const FlatpakManagerButtons = {
        minWidth: "0",
        padding: "10px 0px",
        margin: "1px"
    };

    const StatusBarBase = {
        color: SteamCssVariables.mainTextColor,
        fontSize: "13px",
        overflow: "hidden",
        whiteSpace: "nowrap"
    };
    const StatusBarCSS = {
        Default: {
            display: "none"
        },
        HiddenButton: {
            padding: "0px",
            background: "#fff0",
            color: "unset"
        },
        HiddenButtonHover: {
            padding: "0px",
            background: "#fff2",
            color: "unset"
        },
        CheckForUpdates: {
            ...StatusBarBase,
            backgroundColor: SteamCssVariables.customStatusGreen
        },
        ProcessingQueue: {
            ...StatusBarBase,
            backgroundColor: SteamCssVariables.customStatusRed
        }
    };

    const UpdateListScrollPanel = {
        maxHeight: "45vh",
        borderRadius: SteamCssVariables.gpCornerLarge,
        backgroundColor: SteamCssVariables.gpBackgroundLightSofter
    };
    const UpdateablePackagesModal = (props) => {
        const scrollView = React.useRef(null);
        const [updateList, setUpdateList] = React.useState(Backend.getUpdateList());
        const onUpdateList = (e) => {
            let event = e;
            setUpdateList(event.updateList);
        };
        const closeModal = () => {
            if (props.closeModal) {
                props.closeModal();
            }
        };
        React.useEffect(() => {
            // Register listener
            Backend.eventBus.addEventListener(events.UpdateListEvent.eType, onUpdateList);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.UpdateListEvent.eType, onUpdateList);
        }, []);
        return (window.SP_REACT.createElement(FallbackModal, { bAllowFullSize: true, bDisableBackgroundDismiss: false, bHideCloseIcon: false, strTitle: "Available Updates", bAlertDialog: true, closeModal: closeModal },
            window.SP_REACT.createElement(ScrollPanel, { style: UpdateListScrollPanel, focusable: true, autoFocus: true, onClick: () => scrollView.current?.focus(), onOKButton: () => scrollView.current?.focus(), onCancelButton: closeModal, onButtonDown: (e) => {
                    if (e.detail.button == 9 || e.detail.button == 10)
                        scrollView.current?.focus();
                } },
                window.SP_REACT.createElement(Focusable, { style: {
                        margin: "10px"
                    }, 
                    // @ts-ignore
                    focusableIfNoChildren: true, noFocusRing: true, onCancel: closeModal, ref: scrollView }, updateList.map((item) => window.SP_REACT.createElement("div", null, item))))));
    };

    const StatusBar = () => {
        const onAppStateChange = (e) => {
            let event = e;
            setAppState(event.appState);
        };
        const onUpdateList = (e) => {
            let event = e;
            setUpdateList(event.updateList);
        };
        const onQueueProgress = (e) => {
            let event = e;
            setQueueProgress({
                currentItem: event.queueItem,
                queueProgress: event.queueProgress,
                queueLength: event.queueLength
            });
        };
        const onQueueCompletion = () => {
            setQueueProgress({
                currentItem: undefined,
                queueProgress: undefined,
                queueLength: undefined
            });
        };
        const [updateList, setUpdateList] = React.useState(Backend.getUpdateList());
        const [appState, setAppState] = React.useState(Backend.getAppState());
        const [ShowUpdateList, setShowUpdateList] = React.useState(appState == appStates.idle && updateList.length > 0);
        const [hover, setHover] = React.useState(false);
        const [queueProgress, setQueueProgress] = React.useState({
            currentItem: Backend.getQueue()[0],
            queueProgress: Backend.getQueueProgress(),
            queueLength: Backend.getQueueLength()
        });
        React.useEffect(() => {
            setShowUpdateList(appState == appStates.idle && updateList.length > 0);
        }, [appState, updateList]);
        React.useEffect(() => {
            // Register listener
            Backend.eventBus.addEventListener(events.UpdateListEvent.eType, onUpdateList);
            Backend.eventBus.addEventListener(events.QueueProgressEvent.eType, onQueueProgress);
            Backend.eventBus.addEventListener(events.QueueCompletionEvent.eType, onQueueCompletion);
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.UpdateListEvent.eType, onUpdateList);
            Backend.eventBus.removeEventListener(events.QueueProgressEvent.eType, onQueueProgress);
            Backend.eventBus.removeEventListener(events.QueueCompletionEvent.eType, onQueueCompletion);
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        let StatusText = "";
        let CSS = StatusBarCSS.Default;
        if (ShowUpdateList) {
            StatusText = `${updateList.length} update${updateList.length > 1 ? 's' : ''} available`;
            CSS = StatusBarCSS.CheckForUpdates;
        }
        else if (appState == appStates.checkingForUpdates) {
            StatusText = "Checking for updates...";
            CSS = StatusBarCSS.CheckForUpdates;
        }
        else if (appState == appStates.buildingPackageList) {
            StatusText = "Updating package list...";
            CSS = StatusBarCSS.CheckForUpdates;
        }
        else if (appState == appStates.processingQueue) {
            StatusText = "Processing queue...";
            CSS = StatusBarCSS.ProcessingQueue;
            if (queueProgress.currentItem && queueProgress.queueLength && queueProgress.queueProgress)
                StatusText = `(${queueProgress.queueProgress}/${queueProgress.queueLength}) ${queueProgress.currentItem.action} ${queueProgress.currentItem.packageRef}...`;
        }
        else if (appState == appStates.repairingPackages) {
            StatusText = "Repairing packages...";
            CSS = StatusBarCSS.ProcessingQueue;
        }
        else if (appState == appStates.migratingAppData) {
            StatusText = "Moving application data...";
            CSS = StatusBarCSS.ProcessingQueue;
        }
        return (window.SP_REACT.createElement(PanelSectionRow, null, appState != appStates.idle || ShowUpdateList
            ? window.SP_REACT.createElement("div", { style: CSS }, ShowUpdateList
                ? window.SP_REACT.createElement(DialogButton, { onGamepadFocus: () => setHover(true), onGamepadBlur: () => setHover(false), onOKActionDescription: "Updates", onClick: () => { showModal(window.SP_REACT.createElement(UpdateablePackagesModal, null)); }, style: hover ? StatusBarCSS.HiddenButtonHover : StatusBarCSS.HiddenButton, disabled: !ShowUpdateList }, StatusText)
                : window.SP_REACT.createElement("div", null, StatusText))
            : null));
    };

    const QAMPanel = () => {
        //#region Helper Functions
        const splitMinutes = (interval) => {
            const days = Math.floor(interval / (24 * 60));
            const hours = Math.floor((interval % (24 * 60)) / 60);
            const minutes = Math.floor((interval % (24 * 60)) % 60);
            return ({ 'd': days, 'h': hours, 'm': minutes });
        };
        //#endregion
        //#region Variables
        const [QAMReady, setQAMReady] = React.useState(false);
        const [appState, setAppState] = React.useState(Backend.getAppState());
        var splitTime = splitMinutes(Settings.updateInterval);
        const [dayDuration, setDayDuration] = React.useState(splitTime.d);
        const [hourDuration, setHourDuration] = React.useState(splitTime.h);
        const [minuteDuration, setMinuteDuration] = React.useState(splitTime.m);
        const [checkOnBootEnabled, setCheckOnBootEnabled] = React.useState(Settings.checkOnBootEnabled);
        const [unattendedUpgradesEnabled, setUnattendedUpgradesEnabled] = React.useState(Settings.unattendedUpgradesEnabled);
        const [interval, setIntervalTime] = React.useState(Settings.updateInterval);
        //#endregion
        //#region Input Functions
        const onOpenFlatpakManager = async () => {
            Router.CloseSideMenus();
            Router.Navigate("/flatpak-manager");
        };
        const onCheckForUpdates = async () => {
            var package_count = await Backend.getPackageCount();
            if (package_count != undefined)
                SteamUtils.notify('AutoFlatpaks', `${package_count} updates available`);
        };
        const onUpdateAllPackages = async () => {
            await Backend.UpdateAllPackages();
            Settings.lastCheckTimestamp = new Date();
            await Settings.saveLastCheckTimestamp();
        };
        const onAppStateChange = (e) => { setAppState(e.appState); };
        const onDaySpinnerUp = () => { setDayDuration(dayDuration + 1); };
        const onDaySpinnerDown = () => { if (dayDuration)
            setDayDuration(dayDuration - 1); };
        const onHrsSpinnerUp = () => { if (hourDuration < 24)
            setHourDuration(hourDuration + 1); };
        const onHrsSpinnerDown = () => { if (hourDuration)
            setHourDuration(hourDuration - 1); };
        const onMinSpinnerUp = () => { if (minuteDuration < 60)
            setMinuteDuration(minuteDuration + 1); };
        const onMinSpinnerDown = () => { if (minuteDuration)
            setMinuteDuration(minuteDuration - 1); };
        //#endregion
        //#region Effects
        React.useEffect(() => {
            // Register listener
            Backend.eventBus.addEventListener(events.AppStateEvent.eType, onAppStateChange);
            setQAMReady(true);
        }, []);
        React.useEffect(() => () => {
            Backend.eventBus.removeEventListener(events.AppStateEvent.eType, onAppStateChange);
        }, []);
        React.useEffect(() => {
            if (!QAMReady)
                return;
            setIntervalTime((dayDuration * 24 * 60) + (hourDuration * 60) + minuteDuration);
        }, [dayDuration, hourDuration, minuteDuration]);
        React.useEffect(() => {
            if (!QAMReady)
                return;
            if (Settings.checkOnBootEnabled != checkOnBootEnabled)
                Settings.checkOnBootEnabled = checkOnBootEnabled;
            if (Settings.unattendedUpgradesEnabled != unattendedUpgradesEnabled)
                Settings.unattendedUpgradesEnabled = unattendedUpgradesEnabled;
            if (Settings.updateInterval != interval)
                Settings.updateInterval = interval;
            Settings.saveToLocalStorage();
        }, [checkOnBootEnabled, unattendedUpgradesEnabled, interval]);
        //#endregion
        //#region Layout
        return (window.SP_REACT.createElement(PanelSection, null,
            window.SP_REACT.createElement(StatusBar, null),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(Focusable, { style: { display: "flex" }, "flow-children": "horizontal" },
                    window.SP_REACT.createElement(DialogButton, { style: FlatpakManagerButtons, onClick: onOpenFlatpakManager, onOKActionDescription: 'Manage Packages' },
                        window.SP_REACT.createElement(FaBoxOpen, null)),
                    window.SP_REACT.createElement(DialogButton, { style: FlatpakManagerButtons, disabled: appState != appStates.idle, onClick: onCheckForUpdates, onOKActionDescription: 'Check Updates\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' },
                        window.SP_REACT.createElement(FaRedoAlt, null)),
                    window.SP_REACT.createElement(DialogButton, { style: FlatpakManagerButtons, disabled: appState != appStates.idle, onClick: onUpdateAllPackages, onOKActionDescription: 'Update Packages\u00A0\u00A0' },
                        window.SP_REACT.createElement(FaDownload, null)))),
            window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, "Update Interval"),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement("div", { style: { display: "none" } }),
                window.SP_REACT.createElement(Spinner, { label: "DAY", value: dayDuration, onClickUp: onDaySpinnerUp, onClickDown: onDaySpinnerDown }),
                window.SP_REACT.createElement(Spinner, { label: "HRS", value: hourDuration, onClickUp: onHrsSpinnerUp, onClickDown: onHrsSpinnerDown }),
                window.SP_REACT.createElement(Spinner, { label: "MIN", value: minuteDuration, onClickUp: onMinSpinnerUp, onClickDown: onMinSpinnerDown })),
            window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, "Settings"),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(ToggleField, { label: "Check on Boot", checked: checkOnBootEnabled, onChange: (checkOnBootEnabled) => {
                        setCheckOnBootEnabled(checkOnBootEnabled);
                    } })),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(ToggleField, { label: "Unattended Upgrades", checked: unattendedUpgradesEnabled, onChange: (unattendedUpgradesEnabled) => {
                        setUnattendedUpgradesEnabled(unattendedUpgradesEnabled);
                    } })),
            window.SP_REACT.createElement("div", { className: staticClasses.PanelSectionTitle }, "Notifications"),
            window.SP_REACT.createElement(PanelSectionRow, null,
                window.SP_REACT.createElement(NotificationToggles, null))));
        //#endregion
    };

    const initPlugin = async () => {
        var settings = await Settings.loadFromLocalStorage();
        if (!settings) {
            SteamUtils.notify('AutoFlatpaks', 'Failed to load setting, skipping check for sanity');
            Backend.setAppState(appStates.failedInitialize);
            return;
        }
        checkOnBoot();
        Backend.setAppInitialized(true);
        Backend.setAppState(appStates.idle);
    };
    const checkOnBoot = () => {
        // Apply check on boot setting
        if (Settings.checkOnBootEnabled) {
            var date = new Date();
            date.setMinutes(date.getMinutes() - Settings.updateInterval);
            Settings.lastCheckTimestamp = date;
        }
    };
    const UpdateAllPackages = async () => {
        await Backend.UpdateAllPackages();
    };
    const onQueueCompletion = (e) => {
        let queueRetCode = e.queueRetCode;
        let successes = 0;
        let failures = [];
        queueRetCode.map(item => {
            if (item.retcode)
                successes += 1;
            else
                failures.push(item);
        });
        let notificationText = `${successes}/${queueRetCode.length} packages modified`;
        if (failures.length > 0)
            console.warn('[AutoFlatpaks] Failed:', failures);
        SteamUtils.notify('AutoFlatpaks', notificationText);
    };
    const IntervalCheck = async () => {
        if (!Backend.getAppInitialized())
            return;
        // check if network connected
        let currentTime = new Date();
        if (!((currentTime.getTime() - Settings.lastCheckTimestamp.getTime()) / 1000 / 60 > Settings.updateInterval))
            return;
        // Time to check for updates
        Settings.lastCheckTimestamp = currentTime;
        let package_count = await Backend.getPackageCount();
        await Settings.saveLastCheckTimestamp();
        if (!package_count)
            return;
        if (Settings.unattendedUpgradesEnabled) {
            SteamUtils.notify('AutoFlatpaks', `Updating ${package_count} packages...`);
            UpdateAllPackages();
        }
        else {
            SteamUtils.notify('AutoFlatpaks', `${package_count} updates available`);
        }
    };
    var index = definePlugin((serverApi) => {
        Backend.initBackend(serverApi);
        serverApi.routerHook.addRoute("/flatpak-manager", FlatpakManager);
        initPlugin();
        Backend.eventBus.addEventListener(events.BatteryStateEvent.eType, IntervalCheck);
        Backend.eventBus.addEventListener(events.QueueCompletionEvent.eType, onQueueCompletion);
        return {
            title: window.SP_REACT.createElement("div", { className: staticClasses.Title }, "AutoFlatpaks"),
            content: window.SP_REACT.createElement(QAMPanel, null),
            icon: window.SP_REACT.createElement(FaBox, null),
            onDismount: () => {
                serverApi.routerHook.removeRoute('/flatpak-manager');
                Backend.eventBus.removeEventListener(events.BatteryStateEvent.eType, IntervalCheck);
                Backend.eventBus.removeEventListener(events.QueueCompletionEvent.eType, onQueueCompletion);
                Backend.onDismount();
            }
        };
    });

    return index;

})(SP_REACT);
